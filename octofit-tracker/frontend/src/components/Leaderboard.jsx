import { useEffect, useState } from 'react'

import { fetchCollection } from './apiUtils'

function Leaderboard() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME
  const leaderboardEndpoint = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/leaderboard/`
    : 'http://localhost:8000/api/leaderboard/'

  const [state, setState] = useState({ loading: true, error: '', items: [], total: 0 })

  useEffect(() => {
    let ignore = false

    async function loadLeaderboard() {
      try {
        const data = await fetchCollection(leaderboardEndpoint)
        if (!ignore) {
          setState({ loading: false, error: '', ...data })
        }
      } catch (error) {
        if (!ignore) {
          setState({ loading: false, error: error.message, items: [], total: 0 })
        }
      }
    }

    loadLeaderboard()
    return () => {
      ignore = true
    }
  }, [leaderboardEndpoint])

  if (state.loading) return <p className="status">Loading leaderboard...</p>
  if (state.error) return <p className="status status-error">{state.error}</p>

  return (
    <section>
      <h2>Leaderboard</h2>
      <p className="meta">Rankings loaded: {state.total}</p>
      <div className="card-grid">
        {state.items.map((entry) => (
          <article className="data-card" key={entry._id ?? `${entry.rank}-${entry.userId?.username}`}>
            <h3>#{entry.rank}</h3>
            <p>{entry.userId?.fullName ?? entry.userId?.username}</p>
            <p>Team: {entry.teamId?.name ?? 'Independent'}</p>
            <p>Score: {entry.score}</p>
            <p>Streak: {entry.streakDays} days</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Leaderboard
