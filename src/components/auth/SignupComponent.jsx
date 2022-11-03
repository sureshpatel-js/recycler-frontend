import Signup from "./Signup";
import "./SignupComponent.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const SignupComponent = (props) => {
    const navigate = useNavigate();
    const appData = useSelector(state => state.appData.appData)
    const shopIconClicked = () => {
        navigate("/")
    }
    return (
        <div className="signupComponent" >
            <div className="signupComponentHeader" >
                <div onClick={shopIconClicked} className="shopIcon" ><i class="bi bi-shop"></i></div>
                <h1>BhangarWala Online</h1>
            </div>
            <div className="signupComponentWrap" >
                <div className="signupPageBanner" >
                    <h1>
                        {appData.signup_page ? appData.signup_page.header_one : ""}
                    </h1>
                    <h2>
                        {appData.signup_page ? appData.signup_page.header_two : ""}
                    </h2>
                </div>
                <Signup />
            </div>
        </div>
    )
}

export default SignupComponent;