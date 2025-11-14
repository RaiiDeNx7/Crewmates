import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="page home">
      <div className="hero">
        <h1>Crewmate Manager 🚀</h1>
        <p className="subtext">
          Build your crew, customize them, and manage your intergalactic team!
        </p>

        <div className="cta-buttons">
          <Link to="/create" className="btn primary">
            Create a New Crewmate
          </Link>
          <Link to="/gallery" className="btn secondary">
            View Gallery
          </Link>
        </div>
      </div>
    </div>
  );
}
