import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { CATEGORY_OPTIONS, ATTRIBUTE_OPTIONS } from "../constants";

export default function EditCrewmate() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [speed, setSpeed] = useState("");
  const [color, setColor] = useState("");
  const [loading, setLoading] = useState(true);

  // Load existing crewmate data
  useEffect(() => {
    async function loadCrewmate() {
      const { data, error } = await supabase
        .from("crewmates")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error(error);
        alert("Error loading crewmate");
      } else {
        setName(data.name);
        setCategory(data.category);
        setSpeed(data.speed);
        setColor(data.color);
      }
      setLoading(false);
    }

    loadCrewmate();
  }, [id]);

  // Update crewmate
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error } = await supabase
      .from("crewmates")
      .update({
        name,
        category,
        speed,
        color,
      })
      .eq("id", id);

    if (error) {
      alert("Failed to update crewmate: " + error.message);
    } else {
      alert("Crewmate updated!");
      navigate("/gallery");
    }
  };

  if (loading) return <div className="page">Loading...</div>;

  return (
    <div className="page">
      <h1>Edit Crewmate</h1>

      <form onSubmit={handleSubmit} className="form">
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label>Category:</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="">Select...</option>
          {CATEGORY_OPTIONS.map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </select>

        <label>Speed:</label>
        <select
          value={speed}
          onChange={(e) => setSpeed(e.target.value)}
          disabled={!category}
        >
          <option value="">Select...</option>
          {ATTRIBUTE_OPTIONS[category]?.speeds.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>

        <label>Color:</label>
        <select
          value={color}
          onChange={(e) => setColor(e.target.value)}
          disabled={!category}
        >
          <option value="">Select...</option>
          {ATTRIBUTE_OPTIONS[category]?.colors.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>

        <div className="form-actions">
          <button type="submit">Save Changes</button>
          <button type="button" onClick={() => navigate("/gallery")}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
