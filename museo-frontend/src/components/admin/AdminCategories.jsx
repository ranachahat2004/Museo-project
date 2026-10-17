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


  const loadCategories = async () => {
    try {
      setLoading(true);

      const response = await getCategories();

      setCategories(response.categories);

    } catch (error) {
      console.error("Category Error:", error);

      setError(
        error.response?.data?.message ||
        "Failed to load categories"
      );
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    loadCategories();
  }, []);


  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });
  };


  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      image: ""
    });

    setEditingId(null);
    setError("");
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!formData.name || !formData.description) {
      setError(
        "Name and description are required."
      );

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


  const handleEdit = (category) => {
    setEditingId(category._id);

    setFormData({
      name: category.name,
      description: category.description,
      image: category.image || ""
    });

    setError("");
    setSuccess("");

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };


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

        {/* HEADER */}

        <div className="mb-4">

          <p className="text-muted mb-1">
            ADMIN PANEL
          </p>

          <h1 className="fw-bold">
            Manage Categories
          </h1>

          <p className="text-muted">
            Create and manage museum collections.
          </p>

        </div>


        {/* ALERTS */}

        {error && (
          <div className="alert alert-danger">
            {error}
          </div>
        )}

        {success && (
          <div className="alert alert-success">
            {success}
          </div>
        )}


        <div className="row g-4">

          {/* FORM */}

          <div className="col-lg-4">

            <div className="card border-0 shadow-sm rounded-4">

              <div className="card-body p-4">

                <h4 className="fw-bold mb-4">
                  {editingId
                    ? "Edit Category"
                    : "Add Category"}
                </h4>


                <form onSubmit={handleSubmit}>

                  <div className="mb-3">

                    <label className="form-label">
                      Category Name
                    </label>

                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      placeholder="e.g. Ancient History"
                      value={formData.name}
                      onChange={handleChange}
                    />

                  </div>


                  <div className="mb-3">

                    <label className="form-label">
                      Description
                    </label>

                    <textarea
                      name="description"
                      className="form-control"
                      rows="4"
                      placeholder="Enter category description"
                      value={formData.description}
                      onChange={handleChange}
                    />

                  </div>


                  <div className="mb-4">

                    <label className="form-label">
                      Image URL
                    </label>

                    <input
                      type="text"
                      name="image"
                      className="form-control"
                      placeholder="https://..."
                      value={formData.image}
                      onChange={handleChange}
                    />

                  </div>


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


          {/* CATEGORY LIST */}

          <div className="col-lg-8">

            <div className="card border-0 shadow-sm rounded-4">

              <div className="card-body p-4">

                <div className="d-flex justify-content-between align-items-center mb-4">

                  <h4 className="fw-bold mb-0">
                    Categories
                  </h4>

                  <span className="badge bg-dark">
                    {categories.length}
                  </span>

                </div>


                {loading ? (

                  <div className="text-center py-5">

                    <div className="spinner-border" />

                    <p className="text-muted mt-3">
                      Loading categories...
                    </p>

                  </div>

                ) : categories.length === 0 ? (

                  <div className="text-center py-5">

                    <h5>
                      No categories yet
                    </h5>

                    <p className="text-muted">
                      Add your first museum category.
                    </p>

                  </div>

                ) : (

                  <div className="row g-3">

                    {categories.map(
                      (category) => (

                        <div
                          className="col-md-6"
                          key={category._id}
                        >

                          <div className="card h-100 border">

                            {category.image && (
                              <img
                                src={category.image}
                                alt={category.name}
                                className="card-img-top"
                                style={{
                                  height: "150px",
                                  objectFit: "cover"
                                }}
                              />
                            )}


                            <div className="card-body">

                              <h5 className="fw-bold">
                                {category.name}
                              </h5>

                              <p className="text-muted small">
                                {category.description}
                              </p>


                              <div className="d-flex gap-2">

                                <button
                                  className="btn btn-sm btn-outline-dark"
                                  onClick={() =>
                                    handleEdit(category)
                                  }
                                >
                                  Edit
                                </button>


                                <button
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