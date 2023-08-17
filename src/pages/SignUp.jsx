import axios from "axios"
import { useState } from "react"
import { useAuthContext } from "../hooks/useAuthContext"

const SignUp = () => {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")

	const [error, setError] = useState(null)
	const [isLoading, setIsLoading] = useState(null)
	const [clearError, setClearError] = useState(true)
	const { dispatch } = useAuthContext()

	const handleSubmit = async (e) => {
		e.preventDefault()
		setIsLoading(true)
		const userDetails = { email, password }
		try {
			const response = await axios.post("http://localhost:4000/api/user/signup", userDetails)
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
		setEmail("")
		setPassword("")
	}

	return (
		<>
			<form className="signup" onSubmit={handleSubmit}>
				<h3>Sign Up</h3>
				<label>Email:</label>
				<input
					type="email"
					onChange={(e) => {
						setEmail(e.target.value)
					}}
					value={email}
				/>
				<label>Password:</label>
				<input
					type="password"
					onChange={(e) => {
						setPassword(e.target.value)
					}}
					value={password}
				/>
				{/* <button>Sign Up</button> */}
				<button disabled={isLoading}>Sign Up</button>
				{clearError && error && <div className="error">{error}</div>}
			</form>
		</>
	)
}

export default SignUp
