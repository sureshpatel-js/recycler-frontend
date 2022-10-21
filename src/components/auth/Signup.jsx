import { useState, useEffect } from "react";
import axios from "axios";
import "./Signup.css";
import { base_url } from "../../appConstants";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import { useDispatch } from "react-redux/es/exports";
import { saveUserData } from "./../../redux/user/userActions";
import { useNavigate } from "react-router-dom";
const Signup = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [state, setState] = useState({
        first_name: "",
        last_name: "",
        phone_number: "",
        otp: "",
        password: "",
        confirm_password: ""
    })
    const [error, setError] = useState({
        first_name: false,
        last_name: false,
        phone_number: false,
        phone_number_length: false,
        otp: false,
        password: false,
        confirm_password: false,
        pssword_not_equal: false
    })
    const [enterOtp, setEnterOtp] = useState(false);
    const [signUpSuccess, setSigUpSuccess] = useState(false);
    useEffect(() => {

    }, [])
    const verifyPhoneNumber = () => {
        const { first_name, last_name, phone_number } = state;
        if (first_name === "") {
            setError(prevState => ({ ...prevState, first_name: true }));
            return;
        } else if (last_name === "") {
            setError(prevState => ({ ...prevState, last_name: true }));
            return;
        } else if (phone_number === "") {
            setError(prevState => ({ ...prevState, phone_number: true }));
            return
        } else if (phone_number.length < 10) {
            setError(prevState => ({ ...prevState, phone_number_length: true }));
            return
        }
        axios.post(`${base_url}user/adminSignUp`, {
            first_name,
            last_name,
            phone_number
        }).then(function (response) {
            console.log(response.data.data);
            const { message } = response.data.data;
            setEnterOtp(true);
            NotificationManager.success(message, 'Success', 3000);
        }).catch(function (error) {
            console.log(error.response.data);
            const { message } = error.response.data;
            NotificationManager.info(message, 'Info', 3000);

        });
    }
    const onSubmit = () => {
        const { password, confirm_password, otp, phone_number } = state;
        if (otp === "") {
            setError(prevState => ({ ...prevState, otp: true }));
            return
        } else if (password === "") {
            setError(prevState => ({ ...prevState, password: true }));
            return;
        } else if (confirm_password === "") {
            setError(prevState => ({ ...prevState, confirm_password: true }));
            return;
        } else if (password !== confirm_password) {
            NotificationManager.info("Password and Confirm Password must be same.", 'Info', 3000);
            setError(prevState => ({ ...prevState, pssword_not_equal: true }));
            setTimeout(() => {
                setError(prevState => ({ ...prevState, pssword_not_equal: false }));
            }, 3000)
            return;
        }
        axios.post(`${base_url}auth/setpassword`, {
            password,
            otp,
            phone_number
        }).then(function (response) {
            console.log(response.data.data);
            const { message, token, user } = response.data.data;
            console.log(token, user)
            localStorage.setItem("token", token);
            dispatch(saveUserData(user));
            // NotificationManager.success(message, 'Success', 3000);
            setSigUpSuccess(true);
            setTimeout(() => {
                navigate("/home/shop");
            }, 2000)
        }).catch(function (error) {
            console.log(error.response.data);
            const { message } = error.response.data;
            NotificationManager.info(message, 'Info', 3000);
        });
    }
    const onInputChange = (e) => {
        setState(state => ({ ...state, [e.target.name]: e.target.value }))
        setError(prevState => ({ ...prevState, [e.target.name]: false }))
        if (e.target.name === "phone_number") {
            setError(prevState => ({ ...prevState, "phone_number_length": false }))
        }
        // if (state.password === state.confirm_password) {
        //     setError(prevState => ({ ...prevState, pssword_not_equal: false }))

        // }
    }
    const login = () => {
        navigate("/login")
    }
    return (
        <>
            {
                !signUpSuccess && (
                    <div className="signupContainer" >
                        <div className="mb-3 btn-container">
                            <legend>Signup</legend>
                        </div>

                        <div className="mb-3">
                            <label for="first_name" className="form-label">First Name( नाम )</label>
                            <input
                                type="text"
                                className="form-control"
                                id="first_name"
                                name="first_name"
                                value={state.first_name}
                                onChange={onInputChange}
                                disabled={enterOtp}
                            ></input>
                            {
                                error.first_name && <div className="errorContainer" >Required.( अपना नाम दर्ज करें। )</div>
                            }
                        </div>
                        <div className="mb-3">
                            <label for="last_name" className="form-label">Last Name( उपनाम )</label>
                            <input
                                type="text"
                                className="form-control"
                                id="last_name"
                                name="last_name"
                                value={state.last_name}
                                onChange={onInputChange}
                                disabled={enterOtp}
                            ></input>
                            {
                                error.last_name && <div className="errorContainer" >Required.( कृपया अपना उपनाम दर्ज करें। )</div>
                            }
                        </div>
                        <div className="mb-3">
                            <label for="phone_number" className="form-label">Phone Number( फ़ोन नंबर )</label>
                            <input
                                type="number"
                                className="form-control"
                                id="phone_number"
                                name="phone_number"
                                value={state.phone_number}
                                onChange={onInputChange}
                                disabled={enterOtp}
                            ></input>
                            {
                                error.phone_number && <div className="errorContainer" >Required.( कृपया अपना फोन नंबर प्रदान करें। )</div>
                            }
                            {
                                error.phone_number_length && <div className="errorContainer" >Please enter valid phone number.( आपने फ़ोन नंबर गलत दर्ज किया है। )</div>
                            }
                        </div>
                        <div className="mb-3 btn-container">
                            <button
                                type="submit"
                                className="btn btn-warning"
                                onClick={verifyPhoneNumber}
                                disabled={enterOtp}
                            >Verify Phone Number</button>
                        </div>
                        {
                            enterOtp && (
                                <div className="mb-3">
                                    <label for="otp" className="form-label">Enter OTP( ओटीपी )</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="otp"
                                        name="otp"
                                        value={state.otp}
                                        onChange={onInputChange}
                                    ></input>
                                    {
                                        error.otp && <div className="errorContainer" >Required.( कृपया ओटीपी दर्ज करें। )</div>
                                    }
                                </div>
                            )
                        }
                        {
                            enterOtp && (
                                <div className="mb-3">
                                    <label for="password" className="form-label">Password.( पासवर्ड )</label>
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
                                        error.pssword_not_equal && <div className="errorContainer" >दोनों में पासवर्ड एक जैसा होना चाहिए।</div>
                                    }
                                </div>
                            )
                        }
                        {
                            enterOtp && (
                                <div className="mb-3">
                                    <label for="confirm_password" className="form-label">Confirm Password.( पासवर्ड की पुष्टि कीजिये। )</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="confirm_password"
                                        name="confirm_password"
                                        value={state.confirm_password}
                                        onChange={onInputChange}
                                    ></input>
                                    {
                                        error.confirm_password && <div className="errorContainer" >Required.( अपना पासवर्ड दोबारा दर्ज करें। )</div>
                                    }
                                    {
                                        error.pssword_not_equal && <div className="errorContainer" >दोनों में पासवर्ड एक जैसा होना चाहिए।</div>
                                    }

                                </div>
                            )
                        }


                        <div className="mb-3 btn-container">
                            <button
                                type="submit"
                                className="btn btn-secondary"
                                onClick={login}
                            >Login</button>
                            {
                                enterOtp && (
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                        onClick={onSubmit}
                                    >Submit</button>
                                )
                            }

                        </div>
                        <NotificationContainer />
                    </div>
                )
            }
            {
                signUpSuccess && (<div className="signUpSuccessContainer" >
                    <i style={{ fontSize: 48 }} class="bi bi-check2-circle"></i>
                    <h1>Account created Successfully.</h1>
                </div>)
            }

        </>
    )
}

export default Signup;