import React, { useState } from "react";
import "./createPromotion.css"; // Import styling

const CreatePromotion = () => {
  // Set up local state for form fields
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    discount_x: "",
    discount_y: "",
    product_id: "",
    description: "",
    validity: false,
    start_date: "",
    end_date: ""
  });

  // State for error and success messages
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Update state when form fields change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    // For checkboxes use the "checked" property; for others use "value"
    const fieldValue = type === "checkbox" ? checked : value;
    setFormData({ ...formData, [name]: fieldValue });
  };

  // Handle form submission and call the API
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset messages
    setError("");
    setSuccess("");

    // Basic front-end validation for required fields
    if (!formData.name || !formData.product_id || !formData.description) {
      setError("Please fill all required fields: name, product ID, and description.");
      return;
    }

    // Validate number fields
    if (formData.discount_x && isNaN(parseInt(formData.discount_x, 10))) {
      setError("Discount X must be an integer.");
      return;
    }
    if (formData.discount_y && isNaN(parseInt(formData.discount_y, 10))) {
      setError("Discount Y must be an integer.");
      return;
    }
    if (isNaN(parseInt(formData.product_id, 10))) {
      setError("Product ID must be an integer.");
      return;
    }

    // Validate dates: if both start_date and end_date are provided,
    // ensure that end_date is not before start_date.
    if (formData.start_date && formData.end_date) {
      if (new Date(formData.end_date) < new Date(formData.start_date)) {
        setError("End date cannot be before start date.");
        return;
      }
    }

    // Format the data payload, converting types as necessary
    const payload = {
      name: formData.name,
      ...(formData.category && { category: formData.category }),
      ...(formData.discount_x && { discount_x: parseInt(formData.discount_x, 10) }),
      ...(formData.discount_y && { discount_y: parseInt(formData.discount_y, 10) }),
      product_id: parseInt(formData.product_id, 10),
      description: formData.description,
      validity: formData.validity,
      ...(formData.start_date && { start_date: formData.start_date }),
      ...(formData.end_date && { end_date: formData.end_date })
    };

    try {
      const response = await fetch("http://127.0.0.1:8080/promotions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error submitting promotion.");
      }

      // If response is successful
      setSuccess("Promotion created successfully!");
      // Optionally clear the form
      setFormData({
        name: "",
        category: "",
        discount_x: "",
        discount_y: "",
        product_id: "",
        description: "",
        validity: false,
        start_date: "",
        end_date: ""
      });
    } catch (err) {
      setError(err.message || "An error occurred.");
    }
  };

  return (
    <div className="create-promotion-container">
      <h2>Create Promotion</h2>
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
      <form onSubmit={handleSubmit} className="promotion-form">
        {/* Promotion Name */}
        <label htmlFor="name">
          Promotion Name <span className="required">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Enter promotion name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        {/* Category */}
        <label htmlFor="category">Category</label>
        <select id="category" name="category" value={formData.category} onChange={handleChange}>
          <option value="">Select a category</option>
          <option value="percentage_discount_x">Percentage Discount X</option>
          <option value="buy_x_get_y_free">Buy X Get Y Free</option>
          <option value="spend_x_save_y">Spend X Save Y</option>
        </select>


        {/* Discount X */}
        <label htmlFor="discount_x">Discount X (integer)</label>
        <input
          type="number"
          id="discount_x"
          name="discount_x"
          placeholder="Enter discount X"
          value={formData.discount_x}
          onChange={handleChange}
        />

        {/* Discount Y */}
        <label htmlFor="discount_y">Discount Y (integer, optional)</label>
        <input
          type="number"
          id="discount_y"
          name="discount_y"
          placeholder="Enter discount Y"
          value={formData.discount_y}
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
          placeholder="Enter product id"
          value={formData.product_id}
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
          placeholder="Enter promotion description"
          value={formData.description}
          onChange={handleChange}
          required
        />

        {/* Validity */}
        <label htmlFor="validity">
          <input
            type="checkbox"
            id="validity"
            name="validity"
            checked={formData.validity}
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
          value={formData.start_date}
          onChange={handleChange}
        />

        {/* End Date */}
        <label htmlFor="end_date">End Date</label>
        <input
          type="date"
          id="end_date"
          name="end_date"
          value={formData.end_date}
          onChange={handleChange}
        />

        {/* Submit Button */}
        <button type="submit" className="submit-btn">
          Create Promotion
        </button>
      </form>
    </div>
  );
};

export default CreatePromotion;
