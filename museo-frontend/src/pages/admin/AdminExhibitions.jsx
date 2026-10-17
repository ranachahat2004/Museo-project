import { useEffect, useState } from "react";

import {
  getExhibitions,
  createExhibition,
  updateExhibition,
  deleteExhibition
} from "../../services/exhibitionService";

import {
  getCategories
} from "../../services/categoryService";


function AdminExhibitions() {

  const [exhibitions, setExhibitions] =
    useState([]);

  const [categories, setCategories] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  const [editingId, setEditingId] =
    useState(null);


  const [formData, setFormData] =
    useState({
      title: "",
      description: "",
      image: "",
      location: "",
      startDate: "",
      endDate: "",
      category: ""
    });


  const loadData = async () => {

    try {

      setLoading(true);

      const [
        exhibitionResponse,
        categoryResponse
      ] = await Promise.all([
        getExhibitions(),
        getCategories()
      ]);

      setExhibitions(
        exhibitionResponse.exhibitions
      );

      setCategories(
        categoryResponse.categories
      );

    } catch (error) {

      console.error(
        "Admin Exhibition Error:",
        error
      );

      setError(
        error.response?.data?.message ||
        "Failed to load exhibition data."
      );

    } finally {

      setLoading(false);

    }

  };


  useEffect(() => {
    loadData();
  }, []);


  const handleChange = (e) => {

    const {
      name,
      value
    } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });

  };


  const resetForm = () => {

    setFormData({
      title: "",
      description: "",
      image: "",
      location: "",
      startDate: "",
      endDate: "",
      category: ""
    });

    setEditingId(null);

  };


  const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");
    setSuccess("");


    if (
      !formData.title ||
      !formData.description ||
      !formData.startDate ||
      !formData.endDate ||
      !formData.category
    ) {

      setError(
        "Please fill all required fields."
      );

      return;

    }


    if (
      new Date(formData.endDate) <
      new Date(formData.startDate)
    ) {

      setError(
        "End date cannot be before start date."
      );

      return;

    }


    try {

      setSaving(true);


      if (editingId) {

        await updateExhibition(
          editingId,
          formData
        );

        setSuccess(
          "Exhibition updated successfully."
        );

      } else {

        await createExhibition(
          formData
        );

        setSuccess(
          "Exhibition created successfully."
        );

      }


      resetForm();

      await loadData();

    } catch (error) {

      console.error(
        "Save Exhibition Error:",
        error
      );

      setError(
        error.response?.data?.message ||
        "Failed to save exhibition."
      );

    } finally {

      setSaving(false);

    }

  };


  const handleEdit = (
    exhibition
  ) => {

    setEditingId(
      exhibition._id
    );

    setFormData({
      title: exhibition.title,
      description:
        exhibition.description,
      image:
        exhibition.image || "",
      location:
        exhibition.location || "",
      startDate:
        exhibition.startDate
          ?.split("T")[0],
      endDate:
        exhibition.endDate
          ?.split("T")[0],
      category:
        exhibition.category?._id || ""
    });

    setError("");
    setSuccess("");

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  };


  const handleDelete = async (
    id
  ) => {

    const confirmed =
      window.confirm(
        "Are you sure you want to delete this exhibition?"
      );

    if (!confirmed) {
      return;
    }


    try {

      setError("");
      setSuccess("");

      await deleteExhibition(id);

      setSuccess(
        "Exhibition deleted successfully."
      );

      await loadData();

    } catch (error) {

      console.error(
        "Delete Exhibition Error:",
        error
      );

      setError(
        error.response?.data?.message ||
        "Failed to delete exhibition."
      );

    }

  };


  return (
    <div className="bg-light min-vh-100">

      <div className="container py-5">

        <div className="mb-4">

          <p className="text-muted mb-1">
            ADMIN PANEL
          </p>

          <h1 className="fw-bold">
            Manage Exhibitions
          </h1>

          <p className="text-muted">
            Create exhibitions and connect
            them with museum categories.
          </p>

        </div>


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

          <div className="col-lg-5">

            <div className="card border-0 shadow-sm rounded-4">

              <div className="card-body p-4">

                <h4 className="fw-bold mb-4">

                  {editingId
                    ? "Edit Exhibition"
                    : "Add Exhibition"}

                </h4>


                <form
                  onSubmit={handleSubmit}
                >

                  <div className="mb-3">

                    <label className="form-label">
                      Exhibition Title *
                    </label>

                    <input
                      type="text"
                      name="title"
                      className="form-control"
                      value={
                        formData.title
                      }
                      onChange={
                        handleChange
                      }
                      placeholder="Enter title"
                    />

                  </div>


                  <div className="mb-3">

                    <label className="form-label">
                      Description *
                    </label>

                    <textarea
                      name="description"
                      className="form-control"
                      rows="4"
                      value={
                        formData.description
                      }
                      onChange={
                        handleChange
                      }
                      placeholder="Enter description"
                    />

                  </div>


                  <div className="mb-3">

                    <label className="form-label">
                      Category *
                    </label>

                    <select
                      name="category"
                      className="form-select"
                      value={
                        formData.category
                      }
                      onChange={
                        handleChange
                      }
                    >

                      <option value="">
                        Select Category
                      </option>

                      {categories.map(
                        (category) => (

                          <option
                            key={
                              category._id
                            }
                            value={
                              category._id
                            }
                          >
                            {
                              category.name
                            }
                          </option>

                        )
                      )}

                    </select>

                  </div>


                  <div className="mb-3">

                    <label className="form-label">
                      Location
                    </label>

                    <input
                      type="text"
                      name="location"
                      className="form-control"
                      value={
                        formData.location
                      }
                      onChange={
                        handleChange
                      }
                      placeholder="Museum Hall A"
                    />

                  </div>


                  <div className="row">

                    <div className="col-md-6 mb-3">

                      <label className="form-label">
                        Start Date *
                      </label>

                      <input
                        type="date"
                        name="startDate"
                        className="form-control"
                        value={
                          formData.startDate
                        }
                        onChange={
                          handleChange
                        }
                      />

                    </div>


                    <div className="col-md-6 mb-3">

                      <label className="form-label">
                        End Date *
                      </label>

                      <input
                        type="date"
                        name="endDate"
                        className="form-control"
                        value={
                          formData.endDate
                        }
                        onChange={
                          handleChange
                        }
                      />

                    </div>

                  </div>


                  <div className="mb-4">

                    <label className="form-label">
                      Image URL
                    </label>

                    <input
                      type="text"
                      name="image"
                      className="form-control"
                      value={
                        formData.image
                      }
                      onChange={
                        handleChange
                      }
                      placeholder="https://..."
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
                        ? "Update Exhibition"
                        : "Add Exhibition"}

                    </button>


                    {editingId && (

                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={
                          resetForm
                        }
                      >
                        Cancel
                      </button>

                    )}

                  </div>

                </form>

              </div>

            </div>

          </div>


          {/* LIST */}

          <div className="col-lg-7">

            <div className="card border-0 shadow-sm rounded-4">

              <div className="card-body p-4">

                <div className="d-flex justify-content-between align-items-center mb-4">

                  <h4 className="fw-bold mb-0">
                    Exhibitions
                  </h4>

                  <span className="badge bg-dark">
                    {
                      exhibitions.length
                    }
                  </span>

                </div>


                {loading ? (

                  <div className="text-center py-5">

                    <div className="spinner-border" />

                    <p className="text-muted mt-3">
                      Loading...
                    </p>

                  </div>

                ) : exhibitions.length === 0 ? (

                  <div className="text-center py-5">

                    <h5>
                      No exhibitions yet
                    </h5>

                    <p className="text-muted">
                      Create your first exhibition.
                    </p>

                  </div>

                ) : (

                  <div className="row g-3">

                    {exhibitions.map(
                      (exhibition) => (

                        <div
                          className="col-12"
                          key={
                            exhibition._id
                          }
                        >

                          <div className="card border">

                            <div className="card-body">

                              <div className="d-flex justify-content-between">

                                <div>

                                  <span className="badge bg-secondary mb-2">
                                    {
                                      exhibition
                                        .category
                                        ?.name
                                    }
                                  </span>

                                  <h5 className="fw-bold">
                                    {
                                      exhibition.title
                                    }
                                  </h5>

                                </div>

                              </div>


                              <p className="text-muted small">
                                {
                                  exhibition.description
                                }
                              </p>


                              <p className="small mb-2">

                                <strong>
                                  Dates:
                                </strong>{" "}

                                {new Date(
                                  exhibition.startDate
                                ).toLocaleDateString()}

                                {" - "}

                                {new Date(
                                  exhibition.endDate
                                ).toLocaleDateString()}

                              </p>


                              {exhibition.location && (

                                <p className="small text-muted">
                                  Location:{" "}
                                  {
                                    exhibition.location
                                  }
                                </p>

                              )}


                              <div className="d-flex gap-2">

                                <button
                                  className="btn btn-sm btn-outline-dark"
                                  onClick={() =>
                                    handleEdit(
                                      exhibition
                                    )
                                  }
                                >
                                  Edit
                                </button>


                                <button
                                  className="btn btn-sm btn-outline-danger"
                                  onClick={() =>
                                    handleDelete(
                                      exhibition._id
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

export default AdminExhibitions;