import React, { useState } from "react";
import "./deletePromotion.css";

const DeletePromotion = () => {
  // State for the promotion id input used for fetching
  const [searchId, setSearchId] = useState("");
  // State to store fetched promotion details
  const [promotion, setPromotion] = useState(null);
  // State for messages
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Function to fetch the promotion details by id
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
        headers: { "Content-Type": "application/json" }
      });
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || "Promotion not found.");
      }
      const data = await response.json();
      setPromotion(data);
    } catch (err) {
      setError(err.message || "An error occurred while fetching the promotion.");
    }
  };

  // Function to delete the fetched promotion
  const deletePromotion = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!promotion) {
      setError("No promotion loaded to delete.");
      return;
    }
    try {
      const response = await fetch(`http://127.0.0.1:8080/promotions/${promotion.id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
      });
      if (!response.ok) {
        throw new Error("Failed to delete the promotion.");
      }
      // On successful deletion, clear the promotion state and set success message
      setSuccess("Promotion deleted successfully!");
      setPromotion(null);
      setSearchId("");
    } catch (err) {
      setError(err.message || "An error occurred while deleting the promotion.");
    }
  };

  return (
    <div className="delete-promotion-container">
      <h2>Delete Promotion</h2>
      <form onSubmit={fetchPromotion} className="promotion-search-form">
        <label htmlFor="searchId">
          Enter Promotion ID <span className="required">*</span>
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
      {promotion && (
        <div className="promotion-details">
          <h3>Promotion Details</h3>
          <ul>
            <li>
              <strong>ID:</strong> {promotion.id}
            </li>
            <li>
              <strong>Name:</strong> {promotion.name}
            </li>
            <li>
              <strong>Category:</strong> {promotion.category}
            </li>
            <li>
              <strong>Discount X:</strong> {promotion.discount_x}
            </li>
            <li>
              <strong>Discount Y:</strong> {promotion.discount_y}
            </li>
            <li>
              <strong>Product ID:</strong> {promotion.product_id}
            </li>
            <li>
              <strong>Description:</strong> {promotion.description}
            </li>
            <li>
              <strong>Validity:</strong> {promotion.validity ? "True" : "False"}
            </li>
            <li>
              <strong>Start Date:</strong> {promotion.start_date}
            </li>
            <li>
              <strong>End Date:</strong> {promotion.end_date}
            </li>
          </ul>
          <button onClick={deletePromotion} className="delete-btn">
            Delete Promotion
          </button>
        </div>
      )}
      {success && <div className="success-message">{success}</div>}
    </div>
  );
};

export default DeletePromotion;
