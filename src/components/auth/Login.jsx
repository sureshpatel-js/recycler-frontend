import { useState, useEffect } from "react";
import axios from "axios";
import "./Login.css";
import { useNavigate, Link } from "react-router-dom";
import { base_url } from "../../appConstants";
import { useSelector, useDispatch } from "react-redux/es/exports";
import { saveUserData } from "./../../redux/user/userActions";
import { NotificationContainer, NotificationManager } from 'react-notifications';

const Login = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const [state, setState] = useState({
        phone_number: null,
        password: null
    })
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token && user.user_type === "ADMIN") {
            navigate("/home/shop");
        } else if (token && user.user_type === "APP_ADMIN") {
            navigate("/home/admin")
        }
    }, [])
    const onSubmit = () => {
        axios.post(`${base_url}auth/login`, state)
            .then(function (response) {
                const { token, user } = response.data.data;
                localStorage.setItem("token", token);
                dispatch(saveUserData(user));
                const { user_type } = user;
                if (user_type === "ADMIN") {
                    navigate("/home/shop");
                } else if (user_type === "APP_ADMIN") {
                    navigate("/home/admin");
                }
            })
            .catch(function (error) {
                console.log(error);
                NotificationManager.error(error.response.data.message, 'Error', 3000);
            });
    }

    const onInputChange = (e) => {
        setState(state => ({ ...state, [e.target.name]: e.target.value }))
    }

    const signUp = () => {
        navigate("/signup")
    }
    return (
        <div className="loginContainer" >
            <div className="mb-3 btn-container">
                <legend>Login</legend>
            </div>

            <div className="mb-3">
                <label for="phone_number" className="form-label">Phone Number</label>
                <input
                    type="number"
                    className="form-control"
                    id="phone_number"
                    name="phone_number"
                    value={state.phone_number}
                    onChange={onInputChange}
                ></input>
            </div>
            <div className="mb-3">
                <label for="password" className="form-label">Password</label>
                <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={state.password}
                    onChange={onInputChange}
                ></input>
            </div>
            <div className="mb-3 btn-container">
                <button
                    type="submit"
                    className="btn btn-secondary"
                    onClick={signUp}
                >Sign Up</button>
                <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={onSubmit}
                >Login</button>
            </div>
            <NotificationContainer />
        </div>
    )
}

export default Login;