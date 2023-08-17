import axios from "axios"
import { useState } from "react"
import { useAuthContext } from "../hooks/useAuthContext"

export const useLogin = () => {
	const [error, setError] = useState(null)
	const [isLoading, setIsLoading] = useState(null)
	const [clearError, setClearError] = useState(true)
	const { dispatch } = useAuthContext()

	const login = async (email, password) => {
		setIsLoading(true)
		setError(null)
		try {
			const response = await axios.post("http://localhost:4000/api/user/login", { email, password })
			if (response.statusText == "OK") {
				setIsLoading(false)

				//save the token to localstorage
				localStorage.setItem("user", JSON.stringify(response.data))

				//update the authcontext
				dispatch({ type: "LOGIN", payload: response.data })
				setIsLoading(false)
			}
		} catch (error) {
			const errorMessage = error.response.data.error

			setIsLoading(false)
			setError(errorMessage)
			setTimeout(() => {
				setClearError(false)
			}, 1000)
			setClearError(true)
		}
	}

	return { login, isLoading, error, clearError }
}
