import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux/es/exports";
import "./Header.css";
const Header = (props) => {
    const user = useSelector(state => state.user);
    const [toggle, setToggle] = useState(false);
    const onToggle = () => {
        setToggle(prevState => !prevState);
    }
    let timeout;
    const onChange = (e) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            props.setPincode(e.target.value);
        }, 1000)

    }
    return (
        <>
            <div className="headerContainer" >
                <div>
                    <div onClick={onToggle} >
                        {
                            toggle ? <i style={{ fontSize: "48px" }} className="bi bi-x"></i> : <i style={{ fontSize: "48px" }} className="bi bi-list"></i>
                        }
                    </div>
                </div>
                <div className="search">
                    <input
                        type="number"
                        className="form-control"
                        id="pincode"
                        name="pincode"
                        placeholder="Your pincode."
                        onChange={onChange}
                    >
                    </input>
                    {/* <div className="searchIcon" >
                    <i class="bi bi-search"></i>
                </div> */}
                </div>

            </div>
            {
                toggle && <div className="headerElementContainer">
                    <Link onClick={onToggle} to={"/signup"} >Create Account</Link>
                    <Link onClick={onToggle} to={"/login"} >Login</Link>
                </div>
            }
        </>
    )
}
export default Header;