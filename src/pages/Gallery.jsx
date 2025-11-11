// src/pages/Gallery.jsx
import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import CrewmateCard from "../components/CrewmateCard";

export default function Gallery() {
  const [crewmates, setCrewmates] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadCrewmates() {
    const { data, error } = await supabase
      .from("crewmates")
      .select("*")
      .order("created_at", { ascending: false });


    if (error) {
      console.error("Error loading crewmates:", error);
    } else {
      setCrewmates(data);
    }
    setLoading(false);
  }

  useEffect(() => {
    loadCrewmates();
  }, []);

  async function handleDeleted() {
    await loadCrewmates(); // refresh after delete
  }

  if (loading) return <div className="page">Loading...</div>;

  return (
    <div className="page gallery">
      <h1>Crewmate Gallery</h1>
      {crewmates.length === 0 ? (
        <p>No crewmates yet. Try creating one!</p>
      ) : (
        <div className="gallery-grid">
          {crewmates.map((c) => (
            <CrewmateCard key={c.id} crewmate={c} onDeleted={handleDeleted} />
          ))}
        </div>
      )}
    </div>
  );
}
