import axios from "axios"
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"

/* eslint-disable react/prop-types */
const WorkoutDetails = ({ workout }) => {
	const { dispatch } = useWorkoutsContext()
	const handleClick = async () => {
		const response = await axios.delete(`http://localhost:4000/api/workouts/${workout._id}`)
		const data = response.data
		if (response.statusText == "OK") {
			dispatch({ type: "DELETE_WORKOUT", payload: data.workout })
			console.log(response)
		}
	}
	return (
		<>
			<div className="workout-details">
				<h4>{workout.title}</h4>
				<p>
					<strong>Load (kg): </strong>
					{workout.load}
				</p>
				<p>
					<strong>Reps:</strong> {workout.reps}
				</p>
				<p>{workout.createdAt}</p>
				<span onClick={handleClick}>Delete</span>
			</div>
		</>
	)
}

export default WorkoutDetails
