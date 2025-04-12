import React, { useState } from "react";
import "./queryPromotionId.css";

const QueryPromotionId = () => {
  const [promotionId, setPromotionId] = useState("");
  const [error, setError] = useState("");
  const [promotion, setPromotion] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset previous messages and results
    setError("");
    setPromotion(null);

    // Validate promotion id (ensure it's a number)
    const id = parseInt(promotionId, 10);
    if (isNaN(id)) {
      setError("Please enter a valid promotion ID.");
      return;
    }

    try {
      const response = await fetch(`http://127.0.0.1:8080/promotions/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (!response.ok) {
        // Try to extract the error message from the response
        const errorData = await response.json();
        throw new Error(errorData.message || "Promotion not found.");
      }

      const data = await response.json();
      setPromotion(data);
    } catch (err) {
      setError(err.message || "An error occurred while fetching the promotion.");
    }
  };

  return (
    <div className="query-promotion-container">
      <h2>Query Promotion</h2>
      <form onSubmit={handleSubmit} className="query-promotion-form">
        <label htmlFor="promotionId">
          Promotion ID <span className="required">*</span>
        </label>
        <input
          type="number"
          id="promotionId"
          name="promotionId"
          placeholder="Enter promotion ID"
          value={promotionId}
          onChange={(e) => setPromotionId(e.target.value)}
          required
        />
        <button type="submit" className="submit-btn">
          Search Promotion
        </button>
      </form>
      {error && <div className="error-message">{error}</div>}
      {promotion && (
        <div className="promotion-result">
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
        </div>
      )}
    </div>
  );
};

export default QueryPromotionId;
