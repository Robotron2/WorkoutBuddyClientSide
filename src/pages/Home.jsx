import { useEffect } from "react"
import axios from "axios"
import WorkoutDetails from "../components/WorkoutDetails"
import WorkoutForm from "../components/WorkoutForm"
import { useWorkoutsContext } from "../hooks/useWorkoutsContext.jsx"
import { useAuthContext } from "../hooks/useAuthContext"

const Home = () => {
	const { workouts, dispatch } = useWorkoutsContext()
	const { user } = useAuthContext()

	useEffect(() => {
		const fetchWorkout = async () => {
			// const response = await fetch("/api/workouts")

			const response = await axios.get("http://localhost:4000/api/workouts", { headers: { Authorization: `Bearer ${user.token}` } })
			const data = response.data

			if (response.statusText == "OK") {
				dispatch({ type: "SET_WORKOUTS", payload: data })
			}
		}

		if (user) {
			fetchWorkout()
		}
	}, [dispatch, user])
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
