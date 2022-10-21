import { useEffect, useState } from "react"
import axios from "axios";
import { base_url } from "../../appConstants";
import "./ProductForm.css"
const ShopDetailForm = (props) => {
    const { action, clickedProduct } = props;
    const [state, setState] = useState({
        _id: null,
        product_name: "Select Product Name",
        price: "",
        unit: "Kg",
        category: ""
    });
    const [productMasterArray, setProductMasterArray] = useState([]);
    useEffect(() => {
        const token = localStorage.getItem("token");
        axios.get(`${base_url}productMaster/getProductMaster`, {
            headers: {
                token
            }
        }).then(function (response) {
            const {
                productMaster } = response.data.data
            setProductMasterArray(productMaster);

        }).catch(function (error) {
            console.log(error);
        });
        if (action === "edit") {
            const { _id, product_name, price, unit, category } = clickedProduct;
            setState({ _id, product_name, price, unit, category })
        }
    }, [])
    const onSubmit = () => {
        const token = localStorage.getItem("token");
        const {
            _id,
            product_name,
            price,
            unit,
            category
        } = state;
        if (action === "edit") {
            axios.put(`${base_url}product/${_id}`, {
                product_name,
                price,
                unit,
                category
            }, {
                headers: {
                    token
                }
            }).then(function (response) {
                console.log(response);
                props.onCancel();
                props.setRefresh(prevState => !prevState);

            }).catch(function (error) {
                console.log(error);
            });
        } else if (action === "create") {
            axios.post(`${base_url}product`, {
                product_name,
                price,
                unit,
                category
            }, {
                headers: {
                    token
                }
            }).then(function (response) {
                console.log(response);
                props.onCancel();
                props.setRefresh(prevState => !prevState);

            }).catch(function (error) {
                console.log(error);
            });
        }
    }

    const onInputChange = (e) => {
        if (e.target.name === "product_name") {
            const [productObj] = productMasterArray.filter(p => p.product_name === e.target.value);
            const { category } = productObj;
            console.log(productObj)
            setState(state => ({ ...state, category, [e.target.name]: e.target.value }))
        } else {
            setState(state => ({ ...state, [e.target.name]: e.target.value }))
        }
    }
    return (
        <div className="productFormContainer" >
            <div className="mb-3 btn-container">
                <legend>Product Details</legend>
                <button
                    type="submit"
                    className="btn btn-warning"
                    onClick={props.onCancel}
                >Cancel</button>
            </div>
            <fieldset
            >
                <div className="mb-3">
                    <label
                        for="product_name"
                        className="form-label"
                    >Product Name</label>
                    <select
                        type="text"
                        className="form-control"
                        id="product_name"
                        name="product_name"
                        value={state.product_name}
                        onChange={onInputChange}
                    >
                        <option value={state.product_name}>{state.product_name}</option>
                        {
                            productMasterArray.length > 0 && productMasterArray.map(p => {
                                return <option value={p.product_name}>{p.product_name}</option>
                            })
                        }
                    </select>
                </div>

                <div className="mb-3">
                    <label for="price" className="form-label">Price</label>
                    <input
                        type="number"
                        className="form-control"
                        id="price"
                        name="price"
                        value={state.price}
                        onChange={onInputChange}
                    ></input>
                </div>

                <div className="mb-3">
                    <label
                        for="product_name"
                        className="form-label"
                    >Unit</label>
                    <select
                        type="text"
                        className="form-control"
                        id="unit"
                        name="unit"
                        value={state.unit}
                        onChange={onInputChange}
                    >
                        <option value="Kg">Kg</option>
                        <option value="Pice">Pice</option>
                    </select>
                </div>

                <div className="mb-3 btn-container">
                    <button
                        type="submit"
                        className="btn btn-primary"
                        onClick={onSubmit}
                    >Save</button>
                </div>
            </fieldset>
        </div>
    )
}

export default ShopDetailForm