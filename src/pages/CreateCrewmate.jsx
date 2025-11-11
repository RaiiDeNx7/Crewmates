import { useState } from "react";
import { supabase } from "../supabaseClient";
import { CATEGORY_OPTIONS, ATTRIBUTE_OPTIONS } from "../constants";

export default function CreateCrewmate() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [speed, setSpeed] = useState("");
  const [color, setColor] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error } = await supabase.from("crewmates").insert([
      { name, category, speed, color },
    ]);

    if (error) alert("Failed to create crewmate: " + error.message);
    else {
      alert("Crewmate created!");
      window.location.href = "/gallery";
    }
  };

  return (
    <div className="page">
      <h1>Create a Crewmate</h1>
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

        <button type="submit">Create Crewmate</button>
      </form>
    </div>
  );
}
