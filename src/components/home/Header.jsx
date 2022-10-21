import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Header.css"
const Header = (props) => {
    const navigate = useNavigate();
    const user = useSelector(state => state.user);
    const [toggle, setToggle] = useState(false);
    const onToggle = () => {
        setToggle(prevState => !prevState);
    }
    const shopIconClicked = () => {
        navigate("/")
    }
    const logOut = () => {
        localStorage.clear("token");
        navigate("/login");
    }
    return (
        <>
            <div className="authHeader" >
                <div className="authHeaderLeft" >
                    <div onClick={onToggle} >
                        {
                            toggle ? <i style={{ fontSize: "48px" }} className="bi bi-x"></i> : <i style={{ fontSize: "48px" }} className="bi bi-list"></i>
                        }
                    </div>
                    <div onClick={shopIconClicked} className="shopIcon" ><i class="bi bi-shop"></i></div>

                </div>
                <div className="authHeaderRight" >
                    <button onClick={() => logOut()} type="button" class="btn btn-outline-primary btn-sm">LogOut</button>
                </div>
            </div>
            {
                toggle && <div className="headerElementContainer">
                    {user.user_type === "ADMIN" && <Link onClick={onToggle} to={"/home/shop"} > Shop</Link>}
                    {user.user_type === "ADMIN" && <Link onClick={onToggle} to={"/home/product"} > Products</Link>}
                    {user.user_type === "ADMIN" && <Link to={"/home/shop"} > Dashboard</Link>}
                    {user.user_type === "APP_ADMIN" && <Link onClick={onToggle} to={"/home/admin"} >Admin </Link>}
                </div>
            }
        </>
    )
}

export default Header;