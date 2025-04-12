import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import CreatePromotion from "./components/createPromotion";
import QueryPromotionId from "./components/queryPromotionId";
import ListPromotions from "./components/listPromotion";
import UpdatePromotion from "./components/updatePromotion";
import DeletePromotion from "./components/deletePromotion";
import ActionPromotion from "./components/actionPromotion";

function Home() {
  return (
    <div
      style={{
        padding: "20px",
        textAlign: "center",
        backgroundColor: "#121212",
        color: "#e0e0e0",
        minHeight: "100vh",
      }}
    >
      <h1>Welcome to the Promotions App</h1>
      <p>This is the landing page. Use the links below to navigate.</p>
      <div style={{ marginTop: "20px" }}>
        <Link
          to="/create-promotion"
          style={{
            fontSize: "18px",
            textDecoration: "underline",
            marginRight: "15px",
            color: "#4caf50",
          }}
        >
          Create Promotion
        </Link>
        <Link
          to="/query-promotion"
          style={{
            fontSize: "18px",
            textDecoration: "underline",
            marginRight: "15px",
            color: "#4caf50",
          }}
        >
          Query Promotion
        </Link>
        <Link
          to="/list-promotions"
          style={{
            fontSize: "18px",
            textDecoration: "underline",
            marginRight: "15px",
            color: "#4caf50",
          }}
        >
          List Promotions
        </Link>
        <Link
          to="/update-promotion"
          style={{
            fontSize: "18px",
            textDecoration: "underline",
            marginRight: "15px",
            color: "#4caf50",
          }}
        >
          Update Promotion
        </Link>
        <Link
          to="/delete-promotion"
          style={{
            fontSize: "18px",
            textDecoration: "underline",
            marginRight: "15px",
            color: "#4caf50",
          }}
        >
          Delete Promotion
        </Link>
        <Link
          to="/action-promotion"
          style={{
            fontSize: "18px",
            textDecoration: "underline",
            color: "#4caf50",
          }}
        >
          Action Promotion
        </Link>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/create-promotion" element={<CreatePromotion />} />
        <Route path="/query-promotion" element={<QueryPromotionId />} />
        <Route path="/list-promotions" element={<ListPromotions />} />
        <Route path="/update-promotion" element={<UpdatePromotion />} />
        <Route path="/delete-promotion" element={<DeletePromotion />} />
        <Route path="/action-promotion" element={<ActionPromotion />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
