import { useEffect, useState } from "react";

import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory
} from "../../services/categoryService";

function AdminCategories() {
  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: ""
  });


  // LOAD CATEGORIES
  const loadCategories = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getCategories();

      setCategories(response.categories || []);

    } catch (error) {
      console.error("Category Error:", error);

      setError(
        error.response?.data?.message ||
        "Failed to load categories."
      );
    } finally {
      setLoading(false);
    }
  };


  // LOAD DATA WHEN PAGE OPENS
  useEffect(() => {
    loadCategories();
  }, []);


  // HANDLE INPUT
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });
  };


  // RESET FORM
  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      image: ""
    });

    setEditingId(null);
    setError("");
  };


  // CREATE / UPDATE
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!formData.name.trim()) {
      setError("Category name is required.");
      return;
    }

    if (!formData.description.trim()) {
      setError("Category description is required.");
      return;
    }

    try {
      setSaving(true);

      if (editingId) {
        await updateCategory(
          editingId,
          formData
        );

        setSuccess(
          "Category updated successfully."
        );
      } else {
        await createCategory(formData);

        setSuccess(
          "Category created successfully."
        );
      }

      resetForm();

      await loadCategories();

    } catch (error) {
      console.error(
        "Save Category Error:",
        error
      );

      setError(
        error.response?.data?.message ||
        "Failed to save category."
      );
    } finally {
      setSaving(false);
    }
  };


  // EDIT
  const handleEdit = (category) => {
    setEditingId(category._id);

    setFormData({
      name: category.name || "",
      description: category.description || "",
      image: category.image || ""
    });

    setError("");
    setSuccess("");

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };


  // DELETE
  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this category?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");
      setSuccess("");

      await deleteCategory(id);

      setSuccess(
        "Category deleted successfully."
      );

      await loadCategories();

    } catch (error) {
      console.error(
        "Delete Category Error:",
        error
      );

      setError(
        error.response?.data?.message ||
        "Failed to delete category."
      );
    }
  };


  return (
    <div className="bg-light min-vh-100">

      <div className="container py-5">

        {/* PAGE HEADER */}

        <div className="mb-4">

          <p className="text-muted mb-1">
            MUSEO ADMIN PANEL
          </p>

          <h1 className="fw-bold">
            Manage Categories
          </h1>

          <p className="text-muted">
            Create, update and manage museum
            collections.
          </p>

        </div>


        {/* ERROR */}

        {error && (
          <div
            className="alert alert-danger alert-dismissible fade show"
            role="alert"
          >
            {error}

            <button
              type="button"
              className="btn-close"
              onClick={() => setError("")}
            />
          </div>
        )}


        {/* SUCCESS */}

        {success && (
          <div
            className="alert alert-success alert-dismissible fade show"
            role="alert"
          >
            {success}

            <button
              type="button"
              className="btn-close"
              onClick={() => setSuccess("")}
            />
          </div>
        )}


        <div className="row g-4">

          {/* =========================
              CATEGORY FORM
          ========================== */}

          <div className="col-lg-4">

            <div className="card border-0 shadow-sm rounded-4">

              <div className="card-body p-4">

                <h4 className="fw-bold mb-4">

                  {editingId
                    ? "Edit Category"
                    : "Add Category"}

                </h4>


                <form onSubmit={handleSubmit}>

                  {/* NAME */}

                  <div className="mb-3">

                    <label
                      htmlFor="name"
                      className="form-label fw-semibold"
                    >
                      Category Name
                    </label>

                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="form-control"
                      placeholder="e.g. Ancient History"
                      value={formData.name}
                      onChange={handleChange}
                    />

                  </div>


                  {/* DESCRIPTION */}

                  <div className="mb-3">

                    <label
                      htmlFor="description"
                      className="form-label fw-semibold"
                    >
                      Description
                    </label>

                    <textarea
                      id="description"
                      name="description"
                      className="form-control"
                      rows="4"
                      placeholder="Enter category description"
                      value={formData.description}
                      onChange={handleChange}
                    />

                  </div>


                  {/* IMAGE */}

                  <div className="mb-4">

                    <label
                      htmlFor="image"
                      className="form-label fw-semibold"
                    >
                      Image URL
                    </label>

                    <input
                      type="text"
                      id="image"
                      name="image"
                      className="form-control"
                      placeholder="https://example.com/image.jpg"
                      value={formData.image}
                      onChange={handleChange}
                    />

                    <small className="text-muted">
                      Optional
                    </small>

                  </div>


                  {/* BUTTONS */}

                  <div className="d-flex gap-2">

                    <button
                      type="submit"
                      className="btn btn-dark flex-grow-1"
                      disabled={saving}
                    >

                      {saving
                        ? "Saving..."
                        : editingId
                        ? "Update Category"
                        : "Add Category"}

                    </button>


                    {editingId && (

                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={resetForm}
                      >
                        Cancel
                      </button>

                    )}

                  </div>

                </form>

              </div>

            </div>

          </div>


          {/* =========================
              CATEGORY LIST
          ========================== */}

          <div className="col-lg-8">

            <div className="card border-0 shadow-sm rounded-4">

              <div className="card-body p-4">

                {/* LIST HEADER */}

                <div className="d-flex justify-content-between align-items-center mb-4">

                  <div>

                    <h4 className="fw-bold mb-1">
                      Categories
                    </h4>

                    <p className="text-muted mb-0">
                      All active museum categories
                    </p>

                  </div>

                  <span className="badge bg-dark rounded-pill px-3 py-2">
                    {categories.length}
                  </span>

                </div>


                {/* LOADING */}

                {loading && (

                  <div className="text-center py-5">

                    <div
                      className="spinner-border"
                      role="status"
                    />

                    <p className="text-muted mt-3 mb-0">
                      Loading categories...
                    </p>

                  </div>

                )}


                {/* EMPTY */}

                {!loading &&
                  categories.length === 0 && (

                    <div className="text-center py-5">

                      <h5 className="fw-bold">
                        No Categories Yet
                      </h5>

                      <p className="text-muted">
                        Add your first museum
                        category using the form.
                      </p>

                    </div>

                  )}


                {/* CATEGORY CARDS */}

                {!loading &&
                  categories.length > 0 && (

                    <div className="row g-3">

                      {categories.map(
                        (category) => (

                          <div
                            className="col-md-6"
                            key={category._id}
                          >

                            <div className="card h-100 border shadow-sm">

                              {/* IMAGE */}

                              {category.image ? (

                                <img
                                  src={category.image}
                                  alt={category.name}
                                  className="card-img-top"
                                  style={{
                                    height: "160px",
                                    objectFit: "cover"
                                  }}
                                />

                              ) : (

                                <div
                                  className="bg-dark text-white d-flex align-items-center justify-content-center"
                                  style={{
                                    height: "160px"
                                  }}
                                >
                                  MUSEO
                                </div>

                              )}


                              {/* CONTENT */}

                              <div className="card-body">

                                <h5 className="fw-bold">
                                  {category.name}
                                </h5>

                                <p className="text-muted small">
                                  {category.description}
                                </p>


                                {/* BUTTONS */}

                                <div className="d-flex gap-2 mt-3">

                                  <button
                                    type="button"
                                    className="btn btn-sm btn-outline-dark"
                                    onClick={() =>
                                      handleEdit(
                                        category
                                      )
                                    }
                                  >
                                    Edit
                                  </button>


                                  <button
                                    type="button"
                                    className="btn btn-sm btn-outline-danger"
                                    onClick={() =>
                                      handleDelete(
                                        category._id
                                      )
                                    }
                                  >
                                    Delete
                                  </button>

                                </div>

                              </div>

                            </div>

                          </div>

                        )
                      )}

                    </div>

                  )}

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default AdminCategories;

