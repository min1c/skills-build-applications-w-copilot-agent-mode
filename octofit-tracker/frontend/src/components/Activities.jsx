import { useEffect, useState } from 'react'

import { fetchCollection } from './apiUtils'

function Activities() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME
  const activitiesEndpoint = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/activities/`
    : 'http://localhost:8000/api/activities/'

  const [state, setState] = useState({ loading: true, error: '', items: [], total: 0 })

  useEffect(() => {
    let ignore = false

    async function loadActivities() {
      try {
        const data = await fetchCollection(activitiesEndpoint)
        if (!ignore) {
          setState({ loading: false, error: '', ...data })
        }
      } catch (error) {
        if (!ignore) {
          setState({ loading: false, error: error.message, items: [], total: 0 })
        }
      }
    }

    loadActivities()
    return () => {
      ignore = true
    }
  }, [activitiesEndpoint])

  if (state.loading) return <p className="status">Loading activities...</p>
  if (state.error) return <p className="status status-error">{state.error}</p>

  return (
    <section>
      <h2>Activities</h2>
      <p className="meta">Recent activity entries: {state.total}</p>
      <div className="card-grid">
        {state.items.map((activity) => (
          <article className="data-card" key={activity._id ?? `${activity.activityType}-${activity.completedAt}`}>
            <h3>{activity.activityType}</h3>
            <p>User: {activity.userId?.fullName ?? activity.userId?.username ?? 'Unknown'}</p>
            <p>Duration: {activity.durationMinutes} min</p>
            <p>Calories: {activity.caloriesBurned}</p>
            <p>Completed: {new Date(activity.completedAt).toLocaleString()}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Activities
