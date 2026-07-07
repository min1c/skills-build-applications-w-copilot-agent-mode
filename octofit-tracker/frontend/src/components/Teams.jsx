import { useEffect, useState } from 'react'

import { fetchCollection } from './apiUtils'

function Teams() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME
  const teamsEndpoint = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/teams/`
    : 'http://localhost:8000/api/teams/'

  const [state, setState] = useState({ loading: true, error: '', items: [], total: 0 })

  useEffect(() => {
    let ignore = false

    async function loadTeams() {
      try {
        const data = await fetchCollection(teamsEndpoint)
        if (!ignore) {
          setState({ loading: false, error: '', ...data })
        }
      } catch (error) {
        if (!ignore) {
          setState({ loading: false, error: error.message, items: [], total: 0 })
        }
      }
    }

    loadTeams()
    return () => {
      ignore = true
    }
  }, [teamsEndpoint])

  if (state.loading) return <p className="status">Loading teams...</p>
  if (state.error) return <p className="status status-error">{state.error}</p>

  return (
    <section>
      <h2>Teams</h2>
      <p className="meta">Active teams: {state.total}</p>
      <div className="card-grid">
        {state.items.map((team) => (
          <article className="data-card" key={team._id ?? team.name}>
            <h3>{team.name}</h3>
            <p>{team.city}</p>
            <p>{team.motto}</p>
            <p>Challenge points: {team.challengePoints}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Teams
