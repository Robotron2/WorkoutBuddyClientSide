import axios from "axios"
import { useState } from "react"
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
import { useAuthContext } from "../hooks/useAuthContext"

const WorkoutForm = () => {
	const { user } = useAuthContext()
	const { dispatch } = useWorkoutsContext()
	const [title, setTitle] = useState("")
	const [load, setLoad] = useState("")
	const [reps, setReps] = useState("")
	const [error, setError] = useState(null)

	const handleSubmit = async (e) => {
		e.preventDefault()

		if (!user) {
			setError("You must be logged in")
			return
		}

		const workout = { title, load, reps }

		const response = await axios.post("http://localhost:4000/api/workouts", workout, { headers: { Authorization: `Bearer ${user.token}` } })

		if (response.statusText != "OK") {
			setError(response.error)
		}

		if (response.statusText == "OK") {
			// console.log(response)
			setTitle("")
			setLoad("")
			setReps("")
			setError(null)
			dispatch({ type: "CREATE_WORKOUT", payload: response.data })
		}
	}

	return (
		<>
			<form className="create" onSubmit={handleSubmit}>
				<h3>Add a New Workout</h3>

				<label>Exercise title:</label>
				<input type="text" onChange={(e) => setTitle(e.target.value)} value={title} required />

				<label>Load (in kg)</label>
				<input type="number" onChange={(e) => setLoad(e.target.value)} value={load} required />

				<label>Reps:</label>
				<input type="number" onChange={(e) => setReps(e.target.value)} value={reps} required />

				<button>Add workout</button>

				{error && <div className="error">{error}</div>}
			</form>
		</>
	)
}

export default WorkoutForm
