import ShopDetailForm from "../../shop/ShopDetailForm";
import "./ShopContainer.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const ShopContainer = (props) => {
    const user = useSelector(state => state.user);
    const navigate = useNavigate();
    const appData = useSelector(state => state.appData);
    return (
        <div className="shopContainer" >
            {
                !user.shop && (
                    <div className="shopNammerContainer">
                        <h1>
                            {appData.shop_page ? appData.shop_page.header_one : ""}
                        </h1>
                    </div>
                )
            }
            <ShopDetailForm />
            {
                user.shop && (
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }} >
                        <span style={{ fontSize: "48px" }} > 👉</span>   <button
                            type="submit"
                            className="btn btn-warning"
                            onClick={() => { navigate("/home/product") }}
                        >आगे बढ़े</button>
                    </div>
                )
            }
        </div>
    )
}

export default ShopContainer;