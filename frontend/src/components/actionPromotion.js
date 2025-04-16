import React, { useState } from "react";
import "./actionPromotion.css";

const ActionPromotion = () => {
  // State to store the promotion id for fetching
  const [searchId, setSearchId] = useState("");
  // State to hold fetched promotion details
  const [promotion, setPromotion] = useState(null);
  // States for messages
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch the promotion details by ID
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
        headers: { "Content-Type": "application/json" },
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

  // Send action to update validity (PUT for valid, DELETE for invalid)
  const changeValidity = async (setValid) => {
    setError("");
    setSuccess("");
    if (!promotion) {
      setError("No promotion loaded to update validity.");
      return;
    }
    try {
      const method = setValid ? "PUT" : "DELETE";
      const response = await fetch(
        `http://127.0.0.1:8080/promotions/${promotion.id}/valid`,
        {
          method,
          headers: { "Content-Type": "application/json" },
        }
      );
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(
          errData.message || "Error updating promotion validity."
        );
      }
      const updatedPromotion = await response.json();
      setPromotion(updatedPromotion);
      setSuccess(
        `Promotion has been ${setValid ? "validated" : "invalidated"} successfully!`
      );
    } catch (err) {
      setError(err.message || "An error occurred while updating validity.");
    }
  };

  return (
    <div className="action-promotion-container">
      <h2>Change Promotion Validity</h2>
      {/* Form for fetching a promotion */}
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
              <strong>Description:</strong> {promotion.description}
            </li>
            <li>
              <strong>Current Validity:</strong>{" "}
              {promotion.validity ? "Valid" : "Invalid"}
            </li>
          </ul>
          <div className="action-buttons">
            <button
              onClick={() => changeValidity(true)}
              className="validate-btn"
            >
              Validate Promotion
            </button>
            <button
              onClick={() => changeValidity(false)}
              className="invalidate-btn"
            >
              Invalidate Promotion
            </button>
          </div>
        </div>
      )}
      {success && <div className="success-message">{success}</div>}
    </div>
  );
};

export default ActionPromotion;
