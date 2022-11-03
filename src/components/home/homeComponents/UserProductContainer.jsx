import { useState } from "react"
import "./UserProductContainer.css"
import ProductForm from "../../product/ProductForm";
import { useEffect } from "react";
import { base_url } from "./../../../appConstants";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const UserProductContainer = (props) => {
    const [popUp, setPopUp] = useState(false);
    const [action, setAction] = useState(null);
    const [refresh, setRefresh] = useState(true);
    const [clickedProduct, setClickedProduct] = useState(null);
    const [productsArray, setProductsArray] = useState([])
    const appData = useSelector(state => state.appData.appData);
    const navigate = useNavigate()
    useEffect(() => {
        const token = localStorage.getItem("token");
        axios.get(`${base_url}product/getMyProducts`, {
            headers: {
                token
            }
        }).then(function (response) {
            console.log(response.data.data);
            const { products } = response.data.data;
            setProductsArray(products);
        }).catch(function (error) {
            console.log(error);
        });
    }, [refresh])
    const onClick = (e, productObj) => {
        setPopUp(true);
        setAction(e);
        setClickedProduct(productObj);
    }
    const onCancel = () => {
        setPopUp(false);
        setAction(null);
    }
    return (
        <div className="userProductContainer" >

            <div className="userProductContainerHeader" >
                <div className="mb-3 btn-container">
                    <div className="btnContainer" >
                        {productsArray.length === 0 && (
                            <h3 style={{ color: "#00e676" }} >{appData.product_page ? appData.product_page.header_one : ""}</h3>
                        )}
                        <button
                            type="submit"
                            className="btn btn-warning"
                            onClick={() => onClick("create", null)}
                        >Create</button>
                    </div>

                </div>
            </div>

            {
                popUp && <div className="popUp"  >
                    <ProductForm setRefresh={setRefresh} onCancel={onCancel} action={action} clickedProduct={clickedProduct} />
                </div>
            }
            {
                productsArray.length > 0 && <div className="userProductScrollBox" >
                    {
                        productsArray.length > 0 && productsArray.map(product => {
                            return (

                                <div className="userProduct" >
                                    <div className="userProductDetailContainer">
                                        <h3>{product.product_name}</h3> <h5>{product.price}/{product.unit}</h5>
                                    </div>
                                    <button
                                        type="submit"
                                        className="btn btn-warning"
                                        onClick={() => onClick("edit", product)}
                                    >Edit</button>
                                </div>

                            )
                        })
                    }
                </div>
            }
            {
                productsArray.length > 0 && (
                    <div style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        paddingLeft: "20px",
                        paddingRight: "20px"
                    }} >
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "20px" }} >
                            <button
                                type="submit"
                                className="btn btn-secondary"
                                onClick={() => { navigate("/home/shop") }}
                            >पिचे</button>  <span style={{ fontSize: "24px" }} > 👈</span>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "20px" }} >
                            <span style={{ fontSize: "24px" }} > 👉</span>   <button
                                type="submit"
                                className="btn btn-warning"
                            // onClick={() => { navigate("/home/product") }}
                            >आगे बढ़े</button>
                        </div>

                    </div>
                )
            }

        </div>
    )
}

export default UserProductContainer