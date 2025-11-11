// src/components/CrewmateCard.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

export default function CrewmateCard({ crewmate, onDeleted }) {
  const navigate = useNavigate();

  async function handleDelete() {
    if (!confirm("Delete this crewmate?")) return;
    const { error } = await supabase
      .from("crewmates")
      .delete()
      .eq("id", crewmate.id);

    if (error) return alert(error.message);
    if (onDeleted) onDeleted();
  }

  // 🧠 Choose a different image or emoji per category
  const getAvatar = (category) => {
    switch (category?.toLowerCase()) {
      case "engineer":
        return "🧑‍🔧";
      case "medic":
        return "🧑‍⚕️";
      case "pilot":
        return "🧑‍✈️";
      default:
        return "👨‍🚀";
    }
  };

  return (
    <div className="card">
      <Link to={`/crewmate/${crewmate.id}`} className="card-body">
        <div className="avatar">{getAvatar(crewmate.category)}</div>
        <h3>{crewmate.name}</h3>
        <div>Category: {crewmate.category}</div>
        <div>Color: {crewmate.color}</div>
        <div>Speed: {crewmate.speed} mph</div>
      </Link>

      <div className="card-actions">
        <button onClick={() => navigate(`/edit/${crewmate.id}`)}>Edit</button>
        <button onClick={handleDelete} className="danger">
          Delete
        </button>
      </div>
    </div>
  );
}
