/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react"
import axios from "axios"
import WorkoutDetails from "../components/WorkoutDetails"
import WorkoutForm from "../components/WorkoutForm"
import { useWorkoutsContext } from "../hooks/useWorkoutsContext.jsx"

const Home = () => {
	const { workouts, dispatch } = useWorkoutsContext()

	useEffect(() => {
		const fetchWorkout = async () => {
			// const response = await fetch("/api/workouts")

			const response = await axios.get("http://localhost:4000/api/workouts")
			const data = response.data

			if (response.statusText == "OK") {
				dispatch({ type: "SET_WORKOUTS", payload: data })
			}
		}

		fetchWorkout()
	}, [])
	// console.log(workouts)

	return (
		<div className="home">
			<div className="workouts">
				{workouts &&
					workouts.map((workout) => {
						return <WorkoutDetails key={workout._id} workout={workout} />
					})}
			</div>
			<WorkoutForm />
		</div>
	)
}

export default Home
