import "./ClientUi.css"
import Body from "./Body";
import Header from "./Header";
import ProductsContainer from "./ProductsContainer";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { base_url } from "../../appConstants";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
const ClientUi = (props) => {
    const [toggle, setToggle] = useState(false);
    const [shopsArray, setShopsArray] = useState([]);
    const [pincode, setPincode] = useState(null);
    const [currentShopId, setCurrentShopId] = useState(null);

    const toggleProductsContainer = (id) => {
        setCurrentShopId(id)
        setToggle(e => !e);
    }

    useEffect(() => {
        const token = localStorage.getItem("token");
        axios.post(`${base_url}shop/getFilteredShops`, {
            address_line_four: pincode
        }, {
            headers: {
                token
            }
        }).then(function (response) {
            const { shops } = response.data.data;
            setShopsArray(shops);
            if (shops.length === 0) {
                NotificationManager.info(`There is no shop available at pincode: ${pincode}`, "Not found", 3000);
            }
        }).catch(function (error) {
            console.log(error);
        });
    }, [pincode])

    return (
        <div className="homeContainer" >
            <fieldset disabled={toggle} >
                <Header setPincode={setPincode} />
            </fieldset>

            <Body shopsArray={shopsArray} toggleProductsContainer={toggleProductsContainer} />
            {
                toggle && <div className="productDetailsPopUp" >
                    <ProductsContainer
                        currentShopId={currentShopId}
                        toggleProductsContainer={toggleProductsContainer}
                    />
                </div>
            }
            <NotificationContainer />
        </div>
    )
}

export default ClientUi