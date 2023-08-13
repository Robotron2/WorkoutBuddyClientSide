import axios from "axios"
import { useState } from "react"

const WorkoutForm = () => {
	const [title, setTitle] = useState("")
	const [load, setLoad] = useState("")
	const [reps, setReps] = useState("")
	const [error, setError] = useState(null)

	const handleSubmit = async (e) => {
		e.preventDefault()

		const workout = { title, load, reps }

		const response = await axios.post("http://localhost:4000/api/workouts", workout)

		if (response.statusText != "OK") {
			setError(response.error)
		}

		if (response.statusText == "OK") {
			console.log(response)
			setTitle("")
			setLoad("")
			setReps("")
			setError(null)
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
