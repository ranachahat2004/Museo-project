import dotenv from "dotenv";
import mongoose from "mongoose";

import Category from "./models/Category.js";
import Exhibition from "./models/Exhibition.js";
import Artifact from "./models/Artifact.js";
import Timeline from "./models/Timeline.js";

dotenv.config();

const seedData = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected for seeding.");

    // ==========================================
    // 1. CREATE CATEGORIES
    // ==========================================

    const categoryData = [
      {
        name: "Archaeology",
        slug: "archaeology",
        description:
          "Discover ancient civilizations and archaeological discoveries.",
        image:
          "https://images.unsplash.com/photo-1603565816030-6b389eeb23cb?auto=format&fit=crop&w=900&q=80",
        isActive: true,
      },
      {
        name: "Royal Heritage",
        slug: "royal-heritage",
        description:
          "Explore royal traditions, historic kingdoms, and cultural heritage.",
        image:
          "https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?auto=format&fit=crop&w=900&q=80",
        isActive: true,
      },
      {
        name: "Coins and Currency",
        slug: "coins-and-currency",
        description:
          "Explore coins and currency from different historical periods.",
        image:
          "https://images.unsplash.com/photo-1605792657660-596af9009e82?auto=format&fit=crop&w=900&q=80",
        isActive: true,
      },
      {
        name: "Art and Sculpture",
        slug: "art-and-sculpture",
        description:
          "Discover traditional artwork, sculptures, and artistic traditions.",
        image:
          "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=900&q=80",
        isActive: true,
      },
    ];

    const categories = [];

    for (const item of categoryData) {
      const category = await Category.findOneAndUpdate(
        { slug: item.slug },
        { $set: item },
        {
          new: true,
          upsert: true,
          runValidators: true,
        }
      );

      categories.push(category);
    }

    console.log("Categories created:", categories.length);

    const archaeologyCategory = categories.find(
      (item) => item.slug === "archaeology"
    );

    const royalCategory = categories.find(
      (item) => item.slug === "royal-heritage"
    );

    const coinsCategory = categories.find(
      (item) => item.slug === "coins-and-currency"
    );

    const artCategory = categories.find(
      (item) => item.slug === "art-and-sculpture"
    );

    // ==========================================
    // 2. CREATE EXHIBITIONS
    // ==========================================

    const exhibitionData = [
      {
        title: "Echoes of the Indus Valley",
        slug: "echoes-of-the-indus-valley",
        description:
          "Explore the remarkable urban civilization of the Indus Valley through archaeological discoveries, pottery, seals, and objects that offer insights into ancient life.",
        shortDescription:
          "Discover the cities, crafts, and everyday life of an ancient civilization.",
        image:
          "https://images.unsplash.com/photo-1564399579883-451a5d44ec08?auto=format&fit=crop&w=1200&q=80",
        coverImage:
          "https://images.unsplash.com/photo-1564399579883-451a5d44ec08?auto=format&fit=crop&w=1200&q=80",
        period: "c. 2600–1900 BCE",
        location: "Indus Valley",
        category: archaeologyCategory._id,
        status: "ongoing",
        featured: true,
        isActive: true,
      },
      {
        title: "The Legacy of Indian Royalty",
        slug: "legacy-of-indian-royalty",
        description:
          "Explore the cultural legacy of Indian kingdoms through historic architecture, royal craftsmanship, decorative arts, and courtly traditions.",
        shortDescription:
          "Discover the artistic traditions and cultural legacy of Indian kingdoms.",
        image:
          "https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?auto=format&fit=crop&w=1200&q=80",
        coverImage:
          "https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?auto=format&fit=crop&w=1200&q=80",
        period: "Medieval to Early Modern India",
        location: "India",
        category: royalCategory._id,
        status: "ongoing",
        featured: true,
        isActive: true,
      },
      {
        title: "Stories Written in Coins",
        slug: "stories-written-in-coins",
        description:
          "Discover how historical coins reveal information about trade, rulers, symbols, economies, and connections between civilizations.",
        shortDescription:
          "Explore history through the coins used by past civilizations.",
        image:
          "https://images.unsplash.com/photo-1605792657660-596af9009e82?auto=format&fit=crop&w=1200&q=80",
        coverImage:
          "https://images.unsplash.com/photo-1605792657660-596af9009e82?auto=format&fit=crop&w=1200&q=80",
        period: "Ancient to Modern Periods",
        location: "South Asia",
        category: coinsCategory._id,
        status: "ongoing",
        featured: true,
        isActive: true,
      },
      {
        title: "The Language of Sculpture",
        slug: "language-of-sculpture",
        description:
          "Explore the techniques, materials, and cultural meanings behind sculptures and traditional visual arts.",
        shortDescription:
          "Discover the stories expressed through historic sculptures and art.",
        image:
          "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=1200&q=80",
        coverImage:
          "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=1200&q=80",
        period: "Ancient to Modern Periods",
        location: "India",
        category: artCategory._id,
        status: "ongoing",
        featured: true,
        isActive: true,
      },
    ];

    const exhibitions = [];

    for (const item of exhibitionData) {
      const exhibition = await Exhibition.findOneAndUpdate(
        { slug: item.slug },
        { $set: item },
        {
          new: true,
          upsert: true,
          runValidators: true,
        }
      );

      exhibitions.push(exhibition);
    }

    console.log("Exhibitions created:", exhibitions.length);

    // ==========================================
    // 3. CREATE ARTIFACTS
    // ==========================================

    const artifactData = [
      {
        title: "Ancient Terracotta Pottery",
        slug: "ancient-terracotta-pottery",
        description:
          "Terracotta pottery provides valuable evidence about the everyday life, craft traditions, storage practices, and artistic skills of ancient communities.",
        shortDescription:
          "Explore the craftsmanship and everyday uses of ancient pottery.",
        image:
          "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=1000&q=80",
        images: [],
        period: "Ancient Period",
        origin: "South Asia",
        material: "Terracotta",
        dimensions: "Not specified",
        category: archaeologyCategory._id,
        exhibition: exhibitions[0]._id,
        featured: true,
        isActive: true,
      },
      {
        title: "Symbols of Royal Heritage",
        slug: "symbols-of-royal-heritage",
        description:
          "Royal objects and decorative arts provide insights into the traditions, artistic styles, and ceremonial practices of historic courts.",
        shortDescription:
          "Discover the craftsmanship associated with historic royal traditions.",
        image:
          "https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?auto=format&fit=crop&w=1000&q=80",
        images: [],
        period: "Medieval and Early Modern Periods",
        origin: "India",
        material: "Varies by object",
        dimensions: "Varies by object",
        category: royalCategory._id,
        exhibition: exhibitions[1]._id,
        featured: true,
        isActive: true,
      },
      {
        title: "Historical Coin Collection",
        slug: "historical-coin-collection",
        description:
          "Coins can reveal information about historical rulers, trade networks, monetary systems, inscriptions, and artistic symbols.",
        shortDescription:
          "Explore what historical coins can tell us about the past.",
        image:
          "https://images.unsplash.com/photo-1605792657660-596af9009e82?auto=format&fit=crop&w=1000&q=80",
        images: [],
        period: "Various Historical Periods",
        origin: "South Asia",
        material: "Varies by coin",
        dimensions: "Varies by coin",
        category: coinsCategory._id,
        exhibition: exhibitions[2]._id,
        featured: true,
        isActive: true,
      },
      {
        title: "Traditional Art and Painting",
        slug: "traditional-art-and-painting",
        description:
          "Traditional art reflects the materials, techniques, visual languages, and cultural traditions of the communities that produced it.",
        shortDescription:
          "Discover traditional artistic techniques and visual storytelling.",
        image:
          "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=1000&q=80",
        images: [],
        period: "Various Historical Periods",
        origin: "India",
        material: "Varies by artwork",
        dimensions: "Varies by artwork",
        category: artCategory._id,
        exhibition: exhibitions[3]._id,
        featured: true,
        isActive: true,
      },
    ];

    let artifactsCount = 0;

    for (const item of artifactData) {
      await Artifact.findOneAndUpdate(
        { slug: item.slug },
        { $set: item },
        {
          new: true,
          upsert: true,
          runValidators: true,
        }
      );

      artifactsCount++;
    }

    console.log("Artifacts created:", artifactsCount);

    // ==========================================
    // 4. CREATE TIMELINE EVENTS
    // ==========================================

    const timelineData = [
      {
        title: "Rise of the Indus Valley Civilization",
        year: "c. 2600 BCE",
        description:
          "Major urban centers of the Indus Valley Civilization developed with organized streets, drainage systems, specialized crafts, and long-distance trade.",
        image: "",
        period: "Bronze Age",
        location: "Indus Valley",
        category: archaeologyCategory._id,
        order: 1,
        isActive: true,
      },
      {
        title: "The Maurya Empire",
        year: "c. 322 BCE",
        description:
          "The Maurya Empire became one of the major political powers in ancient South Asia. Ashoka is especially remembered for inscriptions and the promotion of Buddhist values.",
        image: "",
        period: "Ancient India",
        location: "South Asia",
        category: archaeologyCategory._id,
        order: 2,
        isActive: true,
      },
      {
        title: "Growth of Medieval Indian Kingdoms",
        year: "Medieval Period",
        description:
          "Regional kingdoms developed distinctive traditions in architecture, sculpture, painting, literature, and craftsmanship.",
        image: "",
        period: "Medieval India",
        location: "India",
        category: royalCategory._id,
        order: 3,
        isActive: true,
      },
      {
        title: "Development of Mughal Art",
        year: "16th–18th Century",
        description:
          "Mughal-period artistic traditions included illustrated manuscripts, miniature painting, architecture, decorative objects, and detailed craftsmanship.",
        image: "",
        period: "Early Modern India",
        location: "Indian Subcontinent",
        category: artCategory._id,
        order: 4,
        isActive: true,
      },
    ];

    for (const item of timelineData) {
      await Timeline.findOneAndUpdate(
        {
          title: item.title,
          year: item.year,
        },
        {
          $set: item,
        },
        {
          new: true,
          upsert: true,
          runValidators: true,
        }
      );
    }

    console.log(
      "Timeline events created:",
      timelineData.length
    );

    console.log("\nMUSEO seed completed successfully!");

  } catch (error) {
    console.error("Seed Error:", error);

    process.exitCode = 1;

  } finally {
    await mongoose.disconnect();
    console.log("MongoDB connection closed.");
  }
};

seedData();