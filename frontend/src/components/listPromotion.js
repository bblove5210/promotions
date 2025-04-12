import React, { useState } from "react";
import "./listPromotion.css";

const ListPromotions = () => {
  // State to keep track of the chosen search criterion
  const [criterion, setCriterion] = useState("none");
  // State for the query value for the chosen criterion
  const [queryValue, setQueryValue] = useState("");
  // State to store fetched promotions
  const [promotions, setPromotions] = useState([]);
  // State for errors
  const [error, setError] = useState("");

  const handleCriterionChange = (e) => {
    setCriterion(e.target.value);
    setQueryValue(""); // Reset query value when changing criterion
  };

  const handleQueryChange = (e) => {
    setQueryValue(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setPromotions([]);

    // Build the URL based on selected criterion
    let url = "http://127.0.0.1:8080/promotions";
    if (criterion !== "none" && queryValue.trim() !== "") {
      let paramName = "";
      switch (criterion) {
        case "name":
          paramName = "name";
          break;
        case "validity":
          paramName = "validity";
          break;
        case "category":
          paramName = "category";
          break;
        case "start_date":
          paramName = "start_date";
          break;
        case "end_date":
          paramName = "end_date";
          break;
        case "product_id":
          paramName = "product_id";
          break;
        default:
          break;
      }
      url += `?${paramName}=${encodeURIComponent(queryValue)}`;
    }

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || "Error fetching promotions");
      }

      const data = await response.json();
      setPromotions(data);
    } catch (err) {
      setError(err.message || "An error occurred while fetching promotions.");
    }
  };

  return (
    <div className="list-promotions-container">
      <h2>List Promotions</h2>
      <form onSubmit={handleSubmit} className="list-promotions-form">
        <label htmlFor="search-criterion">
          Select Search Parameter (Only one allowed):
        </label>
        <select
          id="search-criterion"
          value={criterion}
          onChange={handleCriterionChange}
        >
          <option value="none">None (Get All)</option>
          <option value="name">Name</option>
          <option value="validity">Validity</option>
          <option value="category">Category</option>
          <option value="start_date">Start Date</option>
          <option value="end_date">End Date</option>
          <option value="product_id">Product ID</option>
        </select>
        {criterion !== "none" && (
          <div className="input-wrapper">
            {criterion === "validity" ? (
              <>
                <label htmlFor="queryInput">Select Validity:</label>
                <select
                  id="queryInput"
                  value={queryValue}
                  onChange={handleQueryChange}
                >
                  <option value="">--Select--</option>
                  <option value="true">True</option>
                  <option value="false">False</option>
                </select>
              </>
            ) : (
              <>
                {criterion === "start_date" || criterion === "end_date" ? (
                  <>
                    <label htmlFor="queryInput">
                      Enter {criterion.replace("_", " ").toUpperCase()}:
                    </label>
                    <input
                      type="date"
                      id="queryInput"
                      value={queryValue}
                      onChange={handleQueryChange}
                    />
                  </>
                ) : (
                  <>
                    <label htmlFor="queryInput">
                      Enter {criterion.replace("_", " ").toUpperCase()}:
                    </label>
                    {criterion === "product_id" ? (
                      <input
                        type="number"
                        id="queryInput"
                        value={queryValue}
                        onChange={handleQueryChange}
                      />
                    ) : (
                      <input
                        type="text"
                        id="queryInput"
                        value={queryValue}
                        onChange={handleQueryChange}
                      />
                    )}
                  </>
                )}
              </>
            )}
          </div>
        )}
        <button type="submit" className="submit-btn">
          Search Promotions
        </button>
      </form>
      {error && <div className="error-message">{error}</div>}
      {promotions && promotions.length > 0 && (
        <div className="promotions-list">
          <h3>Promotion Results:</h3>
          <ul>
            {promotions.map((promo) => (
              <li key={promo.id}>
                <strong>ID:</strong> {promo.id} | <strong>Name:</strong> {promo.name} |{" "}
                <strong>Category:</strong> {promo.category} | <strong>Discount X:</strong>{" "}
                {promo.discount_x} | <strong>Discount Y:</strong> {promo.discount_y} |{" "}
                <strong>Product ID:</strong> {promo.product_id} | <strong>Description:</strong>{" "}
                {promo.description} | <strong>Validity:</strong> {promo.validity ? "True" : "False"} |{" "}
                <strong>Start Date:</strong> {promo.start_date} | <strong>End Date:</strong>{" "}
                {promo.end_date}
              </li>
            ))}
          </ul>
        </div>
      )}
      {promotions && promotions.length === 0 && !error && (
        <div className="no-results">No promotions found.</div>
      )}
    </div>
  );
};

export default ListPromotions;
