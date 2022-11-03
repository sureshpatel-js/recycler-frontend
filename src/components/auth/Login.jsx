import { useState, useEffect } from "react";
import axios from "axios";
import "./Login.css";
import { useNavigate, Link } from "react-router-dom";
import { base_url } from "../../appConstants";
import { useSelector, useDispatch } from "react-redux/es/exports";
import { saveUserData } from "./../../redux/user/userActions";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { saveAppData } from "../../redux/appData/appDataActions";
import Loader from "../commonComponent/Loader/Loader";
const Login = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const [state, setState] = useState({
        phone_number: null,
        password: null
    })
    const [error, setError] = useState({
        phone_number: false,
        password: false,
        phone_number_length: false,
        invalid_password: false,
        user_not_exist: false
    })
    const [loader, setLoader] = useState(false);
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token && user.user_type === "ADMIN") {
            navigate("/home/shop");
        } else if (token && user.user_type === "APP_ADMIN") {
            navigate("/home/admin")
        }
    }, [])
    const onSubmit = () => {
        const { phone_number, password } = state
        if (phone_number === "") {
            setError(prevState => ({ ...prevState, phone_number: true }));
            return
        } else if (phone_number.length < 10) {
            setError(prevState => ({ ...prevState, phone_number_length: true }));
            return
        } else if (password === "") {
            setError(prevState => ({ ...prevState, password: true }));
            return
        }
        setLoader(true);
        axios.post(`${base_url}auth/login`, state)
            .then(function (response) {
                const { token, user } = response.data.data;
                localStorage.setItem("token", token);
                dispatch(saveUserData(user));
                setLoader(false);
                const { user_type } = user;
                if (user_type === "ADMIN") {
                    navigate("/home/shop");
                } else if (user_type === "APP_ADMIN") {
                    navigate("/home/admin");
                }
            })
            .catch(function (error) {
                console.log(error);
                const { message, errorCode } = error.response.data

                setLoader(false);
                NotificationManager.error(message, 'Error', 3000);
                if (errorCode === "0011") {
                    setError(prevState => ({ ...prevState, invalid_password: true }));
                    setTimeout(() => {
                        setError(prevState => ({ ...prevState, invalid_password: false }));
                    }, 3000)
                } else if (errorCode === "0012") {
                    setError(prevState => ({ ...prevState, user_not_exist: true }));
                    setTimeout(() => {
                        setError(prevState => ({ ...prevState, user_not_exist: false }));
                    }, 3000)
                }
            });
    }

    const onInputChange = (e) => {
        setState(state => ({ ...state, [e.target.name]: e.target.value }));
        setError(prevState => ({ ...prevState, [e.target.name]: false }));
        if (e.target.name === "phone_number") {
            setError(prevState => ({ ...prevState, "phone_number_length": false }))
        }
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
                {
                    error.phone_number && <div className="errorContainer" >Required.( कृपया अपना फोन नंबर प्रदान करें। )</div>
                }
                {
                    error.phone_number_length && <div className="errorContainer" >Please enter valid phone number.( फोन नंबर 10 अंकों का होना चाहिए। )</div>
                }
                {
                    error.user_not_exist && <div className="errorContainer" >( आपने गलत फ़ोन नंबर दर्ज किया है। )</div>
                }
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
                {
                    error.password && <div className="errorContainer" >Required.( अपना पासवर्ड दर्ज करें। )</div>
                }
                {
                    error.invalid_password && <div className="errorContainer" >( आपने गलत पासवर्ड डाला है। )</div>
                }
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
            {
                loader && (<div className='loaderContainer' >
                    <Loader />
                </div>)
            }
            <NotificationContainer />
        </div>
    )
}

export default Login;