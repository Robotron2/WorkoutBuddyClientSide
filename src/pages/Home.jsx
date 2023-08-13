import { useEffect, useState } from "react"
import axios from "axios"
import WorkoutDetails from "../components/WorkoutDetails"

const Home = () => {
	const [workouts, setWorkouts] = useState(null)

	useEffect(() => {
		const fetchWorkout = async () => {
			// const response = await fetch("/api/workouts")

			const response = await axios.get("http://localhost:4000/api/workouts")
			const data = response.data
			// const json = await response.json()
			console.log(response)

			if (response.statusText) {
				setWorkouts(data)
			}
		}

		fetchWorkout()
	}, [])

	return (
		<div className="home">
			<div className="workouts">
				{workouts &&
					workouts.map((workout) => {
						return <WorkoutDetails key={workout._id} workout={workout} />
					})}
			</div>
		</div>
	)
}

export default Home
