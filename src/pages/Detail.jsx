import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '../supabaseClient'

export default function Detail() {
  const { id } = useParams()
  const [crewmate, setCrewmate] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    async function load() {
      const { data, error } = await supabase
        .from('crewmates')
        .select('*')
        .eq('id', id)
        .single()
      if (error) return console.error(error)
      setCrewmate(data)
    }
    load()
  }, [id])

  if (!crewmate) return <div className="page">Loading...</div>

  return (
    <div className="page detail">
      <h2>{crewmate.name}</h2>
      <div>Category: {crewmate.category}</div>
      <div>Color: {crewmate.color}</div>
      <div>Speed: {crewmate.speed} mph</div>
      <div>Created: {new Date(crewmate.created_at).toLocaleString()}</div>

      <h3>Attributes</h3>
      <ul>
        {crewmate.attributes &&
          Object.entries(crewmate.attributes).map(([k, v]) => (
            <li key={k}>
              {k}: {String(v)}
            </li>
          ))}
      </ul>

      <div className="detail-actions">
        <button onClick={() => navigate(`/edit/${crewmate.id}`)}>Edit</button>
        <button onClick={() => navigate('/gallery')}>Back to Gallery</button>
      </div>
    </div>
  )
}


