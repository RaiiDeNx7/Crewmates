import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="page home">
      <h1>Welcome to Crewmate Manager 🚀</h1>
      <p>Create and view your crewmates below:</p>
      <div className="links">
        <Link to="/create">Create a new Crewmate</Link>
        <Link to="/gallery">View Gallery</Link>
      </div>
    </div>
  )
}
