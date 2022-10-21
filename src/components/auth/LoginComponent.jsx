import Login from "./Login";
import "./LoginComponent.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const LoginComponent = (props) => {
    const navigate = useNavigate();
    const appData = useSelector(state => state.appData);
    console.log(appData)
    const shopIconClicked = () => {
        navigate("/")
    }
    return (
        <div className="loginComponent" >
            <div className="loginComponentHeader" >
                <div onClick={shopIconClicked} className="shopIcon" ><i class="bi bi-shop"></i></div>
                <h1>BhangarWala Online</h1>
            </div>
            <div className="loginComponentWrap" >
                <div className="loginPageBanner" >
                    <h1>
                        {appData.login_page ? appData.login_page.header_one : ""}
                    </h1>
                </div>
                <Login />
            </div>
        </div>
    )
}

export default LoginComponent;