import { useEffect, useState } from 'react'

import { fetchCollection } from './apiUtils'

function Users({ apiBaseUrl }) {
  const [state, setState] = useState({ loading: true, error: '', items: [], total: 0 })

  useEffect(() => {
    let ignore = false

    async function loadUsers() {
      try {
        const data = await fetchCollection(`${apiBaseUrl}/users/`)
        if (!ignore) {
          setState({ loading: false, error: '', ...data })
        }
      } catch (error) {
        if (!ignore) {
          setState({ loading: false, error: error.message, items: [], total: 0 })
        }
      }
    }

    loadUsers()
    return () => {
      ignore = true
    }
  }, [apiBaseUrl])

  if (state.loading) return <p className="status">Loading users...</p>
  if (state.error) return <p className="status status-error">{state.error}</p>

  return (
    <section>
      <h2>Users</h2>
      <p className="meta">Total users: {state.total}</p>
      <div className="card-grid">
        {state.items.map((user) => (
          <article className="data-card" key={user._id ?? user.username}>
            <h3>{user.fullName ?? user.username}</h3>
            <p>@{user.username}</p>
            <p>{user.email}</p>
            <p>Level: {user.fitnessLevel}</p>
            <p>Team: {user.teamId?.name ?? 'Unassigned'}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Users
