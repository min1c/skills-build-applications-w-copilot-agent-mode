import { useEffect, useState } from 'react'

import { fetchCollection } from './apiUtils'

function Workouts({ apiBaseUrl }) {
  const [state, setState] = useState({ loading: true, error: '', items: [], total: 0 })

  useEffect(() => {
    let ignore = false

    async function loadWorkouts() {
      try {
        const data = await fetchCollection(`${apiBaseUrl}/workouts/`)
        if (!ignore) {
          setState({ loading: false, error: '', ...data })
        }
      } catch (error) {
        if (!ignore) {
          setState({ loading: false, error: error.message, items: [], total: 0 })
        }
      }
    }

    loadWorkouts()
    return () => {
      ignore = true
    }
  }, [apiBaseUrl])

  if (state.loading) return <p className="status">Loading workouts...</p>
  if (state.error) return <p className="status status-error">{state.error}</p>

  return (
    <section>
      <h2>Workouts</h2>
      <p className="meta">Workout plans: {state.total}</p>
      <div className="card-grid">
        {state.items.map((workout) => (
          <article className="data-card" key={workout._id ?? workout.title}>
            <h3>{workout.title}</h3>
            <p>Category: {workout.category}</p>
            <p>Difficulty: {workout.difficulty}</p>
            <p>Estimated time: {workout.estimatedMinutes} min</p>
            <p>{workout.coachTip}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Workouts
