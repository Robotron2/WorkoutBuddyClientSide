import { useContext } from "react"
import { WorkoutContext } from "../context/WorkoutContext"

export const useWorkoutsContext = () => {
	const context = useContext(WorkoutContext)
	if (!context) {
		throw Error("You're outside the scope of WorkoutCOntextProvider")
	}

	return context
}
