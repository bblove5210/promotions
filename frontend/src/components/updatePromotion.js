import React, { useState } from "react";
import "./updatePromotion.css";

const UpdatePromotion = () => {
  // State for the promotion ID search field
  const [searchId, setSearchId] = useState("");
  // State for the fetched promotion details; default fields set to empty values
  const [promotion, setPromotion] = useState(null);
  // State for status messages
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Update form state when fields change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    // For checkbox, use its checked property; otherwise, the value
    const fieldValue = type === "checkbox" ? checked : value;
    setPromotion({ ...promotion, [name]: fieldValue });
  };

  // Fetch the promotion by ID (GET request)
  const fetchPromotion = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setPromotion(null);

    const id = parseInt(searchId, 10);
    if (isNaN(id)) {
      setError("Please enter a valid promotion ID.");
      return;
    }

    try {
      const response = await fetch(`http://127.0.0.1:8080/promotions/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Promotion not found.");
      }

      const data = await response.json();
      setPromotion(data);
      setError("");
    } catch (err) {
      setError(err.message || "An error occurred while fetching the promotion.");
    }
  };

  // Submit the updated promotion (PUT request)
  const handleUpdate = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!promotion) {
      setError("No promotion loaded to update.");
      return;
    }

    // Remove promotion id from payload if present, because the id is not updatable in the form.
    const { id, ...updateData } = promotion;

    try {
      const response = await fetch(`http://127.0.0.1:8080/promotions/${promotion.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error updating the promotion.");
      }

      const updatedPromotion = await response.json();
      setPromotion(updatedPromotion);
      setSuccess("Promotion updated successfully!");
    } catch (err) {
      setError(err.message || "An error occurred while updating the promotion.");
    }
  };

  return (
    <div className="update-promotion-container">
      <h2>Update Promotion</h2>
      {/* Section for fetching a promotion */}
      <form onSubmit={fetchPromotion} className="promotion-search-form">
        <label htmlFor="searchId">
          Enter Promotion ID to Fetch <span className="required">*</span>
        </label>
        <input
          type="number"
          id="searchId"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          placeholder="Promotion ID"
          required
        />
        <button type="submit" className="fetch-btn">
          Fetch Promotion
        </button>
      </form>
      
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
      
      {/* Only display the update form if a promotion is loaded */}
      {promotion && (
        <form onSubmit={handleUpdate} className="promotion-update-form">
          {/* Display promotion id (read-only) */}
          <label htmlFor="id">Promotion ID</label>
          <input type="number" id="id" name="id" value={promotion.id} disabled />

          {/* Promotion Name */}
          <label htmlFor="name">
            Promotion Name <span className="required">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={promotion.name || ""}
            onChange={handleChange}
            required
          />

          {/* Category */}
          <label htmlFor="category">Category</label>
          <input
            type="text"
            id="category"
            name="category"
            value={promotion.category || ""}
            onChange={handleChange}
          />

          {/* Discount X */}
          <label htmlFor="discount_x">Discount X (integer)</label>
          <input
            type="number"
            id="discount_x"
            name="discount_x"
            value={promotion.discount_x || ""}
            onChange={handleChange}
          />

          {/* Discount Y */}
          <label htmlFor="discount_y">Discount Y (integer, optional)</label>
          <input
            type="number"
            id="discount_y"
            name="discount_y"
            value={promotion.discount_y || ""}
            onChange={handleChange}
          />

          {/* Product ID */}
          <label htmlFor="product_id">
            Product ID (integer) <span className="required">*</span>
          </label>
          <input
            type="number"
            id="product_id"
            name="product_id"
            value={promotion.product_id || ""}
            onChange={handleChange}
            required
          />

          {/* Description */}
          <label htmlFor="description">
            Description <span className="required">*</span>
          </label>
          <textarea
            id="description"
            name="description"
            value={promotion.description || ""}
            onChange={handleChange}
            required
          />

          {/* Validity */}
          <label htmlFor="validity">
            <input
              type="checkbox"
              id="validity"
              name="validity"
              checked={promotion.validity || false}
              onChange={handleChange}
            />
            Is Promotion Valid?
          </label>

          {/* Start Date */}
          <label htmlFor="start_date">Start Date</label>
          <input
            type="date"
            id="start_date"
            name="start_date"
            value={promotion.start_date ? promotion.start_date.slice(0, 10) : ""}
            onChange={handleChange}
          />

          {/* End Date */}
          <label htmlFor="end_date">End Date</label>
          <input
            type="date"
            id="end_date"
            name="end_date"
            value={promotion.end_date ? promotion.end_date.slice(0, 10) : ""}
            onChange={handleChange}
          />

          <button type="submit" className="update-btn">
            Update Promotion
          </button>
        </form>
      )}
    </div>
  );
};

export default UpdatePromotion;
