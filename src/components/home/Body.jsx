
import { Outlet } from "react-router-dom";
import "./Body.css";
const Body = (props) => {
    return (
        <div className="authBody" >
            <Outlet />
        </div>
    )
}

export default Body;