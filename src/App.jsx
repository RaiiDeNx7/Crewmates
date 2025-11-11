import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import CreateCrewmate from './pages/CreateCrewmate'
import Gallery from './pages/Gallery'
import Detail from './pages/Detail'
import EditCrewmate from './pages/EditCrewmate'

export default function App() {
  return (
    <div className="app">
      <aside className="sidebar">
        <nav>
          <Link to="/">Home</Link>
          <Link to="/create">Create a Crewmate</Link>
          <Link to="/gallery">Crewmate Gallery</Link>
        </nav>
      </aside>

      <main className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreateCrewmate />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/crewmate/:id" element={<Detail />} />
          <Route path="/edit/:id" element={<EditCrewmate />} />
        </Routes>
      </main>
    </div>
  )
}
