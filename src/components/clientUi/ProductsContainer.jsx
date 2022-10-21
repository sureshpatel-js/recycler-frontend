import { useState } from "react";
import { useEffect } from "react";
import "./ProductsContainer.css"
import axios from "axios";
import { base_url } from "../../appConstants";
const ProductsContainer = (props) => {
    const { currentShopId } = props;
    const [productArray, setProductArray] = useState([])
    useEffect(() => {
        const token = localStorage.getItem("token");
        axios.get(`${base_url}product/getProductByShopId/${currentShopId}`, {
            headers: {
                token
            }
        }).then(function (response) {

            const { products } = response.data.data;
            setProductArray(products);
        }).catch(function (error) {
            console.log(error);
        });
    }, [])
    return (
        <div className="productsContainer" >
            <div className="backBtn"
                onClick={props.toggleProductsContainer}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-arrow-left-circle" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z" />
                </svg>
            </div>
            <div className="productsContainerScrollBox" >
                {
                    productArray.length > 0 && productArray.map(p => {
                        return (
                            <>
                                <div className="categoryHeader" >
                                    {
                                        p.category
                                    }
                                </div>
                                <div className="categoryBox" >
                                    {
                                        p.products_array.length > 0 && p.products_array.map(product => {
                                            return (

                                                <div className="productDetails" >
                                                    <h1>{product.product_name}</h1>
                                                    <h3>{product.price }/{product.unit}</h3>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </>
                        )
                    })
                }

            </div>
        </div>
    )
}

export default ProductsContainer;