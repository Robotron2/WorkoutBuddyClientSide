import { useAuthContext } from "./useAuthContext"
import { useWorkoutsContext } from "./useWorkoutsContext"

const useLogout = () => {
	const { dispatch } = useAuthContext()
	const { dispatch: workoutsDispatch } = useWorkoutsContext()
	const logout = () => {
		localStorage.removeItem("user") //remove userToken from LS
		dispatch({ type: "LOGOUT" }) // dispatch logout action
		workoutsDispatch({ type: "SET_WORKOUTS", payload: null })
	}
	return { logout }
}

export default useLogout
