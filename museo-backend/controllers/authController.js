import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";

import User from "../models/User.js";
import sendEmail from "../utils/sendEmail.js";

// Generate JWT token
const generateToken = (userId, role) => {
  return jwt.sign(
    { userId, role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

// Safe user response
const formatUser = (user) => ({
  id: user._id,
  firstName: user.firstName,
  lastName: user.lastName,
  email: user.email,
  role: user.role,
  isEmailVerified: user.isEmailVerified,
  exhibitorStatus: user.exhibitorStatus,
});

// Password validation
const validatePassword = (password) => {
  return (
    typeof password === "string" &&
    password.length >= 8 &&
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /[0-9]/.test(password) &&
    /[^A-Za-z0-9]/.test(password)
  );
};

// ================================
// REGISTER USER / EXHIBITOR
// ================================

export const registerUser = async (req, res) => {
  try {
    let {
      firstName,
      lastName,
      email,
      password,
      role,
      exhibitorApplicationReason,
    } = req.body;

    // Required field validation
    if (
      !firstName?.trim() ||
      !lastName?.trim() ||
      !email?.trim() ||
      !password
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields.",
      });
    }

    firstName = firstName.trim();
    lastName = lastName.trim();
    email = email.trim().toLowerCase();

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address.",
      });
    }

    // Strong password validation
    if (!validatePassword(password)) {
      return res.status(400).json({
        success: false,
        message:
          "Password must contain at least 8 characters, uppercase, lowercase, a number, and a special character.",
      });
    }

    // Public registration cannot create admin accounts
    if (role && !["user", "exhibitor"].includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Invalid registration role.",
      });
    }

    const selectedRole = role || "user";

    // Existing email check
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "An account with this email already exists.",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Generate secure verification token
    const rawToken = crypto.randomBytes(32).toString("hex");

    const hashedVerificationToken = crypto
      .createHash("sha256")
      .update(rawToken)
      .digest("hex");

    const verificationExpires = new Date(
      Date.now() + 30 * 60 * 1000
    );

    // Create account
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role: selectedRole,

      isEmailVerified: false,

      emailVerificationToken: hashedVerificationToken,

      emailVerificationExpires: verificationExpires,

      exhibitorStatus:
        selectedRole === "exhibitor"
          ? "pending"
          : "not_applicable",

      exhibitorApplicationReason:
        selectedRole === "exhibitor"
          ? String(exhibitorApplicationReason || "").trim()
          : "",
    });

    // Verification URL
    const verificationUrl =
      `${process.env.CLIENT_URL}/verify-email?token=${rawToken}`;

    const emailHtml = `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;padding:24px;">
        <h2 style="color:#b78342;">Welcome to MUSEO!</h2>

        <p>Hello ${firstName},</p>

        <p>
          Thank you for registering with MUSEO.
          Please verify your email address to activate your account.
        </p>

        <a
          href="${verificationUrl}"
          style="
            display:inline-block;
            padding:12px 24px;
            background:#b78342;
            color:#ffffff;
            text-decoration:none;
            border-radius:6px;
          "
        >
          Verify Email
        </a>

        <p>This verification link expires in 30 minutes.</p>

        <p>If you did not create this account, please ignore this email.</p>
      </div>
    `;

    try {
      await sendEmail({
        to: email,
        subject: "Verify your MUSEO account",
        html: emailHtml,
      });
    } catch (emailError) {
      // Remove the account if email could not be sent,
      // so the user can retry registration.
      await User.deleteOne({ _id: user._id });

      console.error("Verification email error:", emailError);

      return res.status(500).json({
        success: false,
        message:
          "We could not send the verification email. Please check the email configuration and try again.",
      });
    }

    // Do not issue a login token yet
    return res.status(201).json({
      success: true,
      message:
        "Registration successful. Please check your email and verify your account within 30 minutes.",
      email: user.email,
    });
  } catch (error) {
    console.error("Register Error:", error);

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "An account with this email already exists.",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Server error during registration.",
    });
  }
};

// ================================
// VERIFY EMAIL
// ================================

export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.query;

    if (!token || typeof token !== "string") {
      return res.status(400).json({
        success: false,
        message: "Verification token is missing or invalid.",
      });
    }

    const hashedToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    const user = await User.findOne({
      emailVerificationToken: hashedToken,
      emailVerificationExpires: { $gt: new Date() },
    }).select("+emailVerificationToken +emailVerificationExpires");

    if (!user) {
      return res.status(400).json({
        success: false,
        message:
          "Verification link is invalid or expired. Please register again or request a new verification email.",
      });
    }

    user.isEmailVerified = true;
    user.emailVerificationToken = null;
    user.emailVerificationExpires = null;

    await user.save();

    return res.status(200).json({
      success: true,
      message:
        "Email verified successfully. You can now log in.",
    });
  } catch (error) {
    console.error("Verify Email Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error during email verification.",
    });
  }
};

// ================================
// LOGIN USER
// ================================

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      !email?.trim() ||
      !password
    ) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
    }

    const user = await User.findOne({
      email: email.trim().toLowerCase(),
    }).select("+password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        message: "Your account has been deactivated.",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    // Require verified email before login
    if (!user.isEmailVerified) {
      return res.status(403).json({
        success: false,
        code: "EMAIL_NOT_VERIFIED",
        message:
          "Please verify your email before logging in.",
      });
    }

    // Admin login continues through the existing admin account.
    // Exhibitors must also be approved before accessing exhibitor features.

    const token = generateToken(
      user._id.toString(),
      user.role
    );

    return res.status(200).json({
      success: true,
      message: "Login successful.",
      token,
      user: formatUser(user),
    });
  } catch (error) {
    console.error("Login Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error during login.",
    });
  }
};