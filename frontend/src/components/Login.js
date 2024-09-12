import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import "../css/login.css";

const Login = () => {
	const navigate = useNavigate();

	const handleSuccess = async (response) => {
		console.log("Login Response:", response);

		try {
			const decoded = jwtDecode(response.credential);
			// Proceed with sending the data to the backend
			const { data } = await axios.post("http://localhost:5000/api/login", {
				googleId: decoded.sub, 
				name: decoded.name,
				email: decoded.email,
			});
			navigate("/home", { state: { user: data } });
		} catch (error) {
			console.error("Error saving user to the database:", error);
		}
	};

	const handleError = (error) => {
		console.error("Login Failed:", error);
	};

	return (
		<div className="login-container">
			<div className="overlay"></div> 
			<div className="content-wrapper">
				<h1>Create Your Daily Tasks with Taskly</h1>
				<p>
					<b>Stay organized</b> and boost your <b>productivity</b> with our
					easy-to-use task manager.
				</p>
				<p>Sign in to get started and manage your tasks efficiently.</p>
				<GoogleLogin
					onSuccess={handleSuccess}
					onError={handleError}
					text="Sign in with Google"
					className="google-button"
				/>
				<p className="footer-text">
					<i>
						"Success is the sum of small efforts, repeated day in and day out."
						– Robert Collier
					</i>
				</p>
			</div>
		</div>
	);
};

export default Login;
