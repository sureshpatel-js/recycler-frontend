import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { base_url } from "../../appConstants"
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import axios from "axios";
import "./ShopDetailForm.css";
import { useDispatch } from "react-redux";
import { saveUserData } from "../../redux/user/userActions";
const ShopDetailForm = (props) => {
    const dispatch = useDispatch();
    const [edit, setEdit] = useState(false);
    const user = useSelector(state => state.user);
    const [state, setState] = useState({
        _id: "",
        shop_name: "",
        phone_number: "",
        address_line_one: "",
        address_line_two: "",
        address_line_three: "",
        address_line_four: ""
    })
    const [error, setError] = useState({
        _id: false,
        shop_name: false,
        phone_number: false,
        address_line_one: false,
        address_line_two: false,
        address_line_three: false,
        address_line_four: false
    })
    useEffect(() => {
        const token = localStorage.getItem("token");
        axios.get(`${base_url}shop/getMyShop`, {
            headers: {
                token
            }
        }).then(function (response) {
            const {
                _id,
                shop_name,
                phone_number,
                address_line_one,
                address_line_two,
                address_line_three,
                address_line_four } = response.data.data.shop
            setState({
                _id,
                shop_name,
                phone_number,
                address_line_one,
                address_line_two,
                address_line_three,
                address_line_four
            })
            if (!_id) {
                setEdit(false)
            } else if (_id) {
                setEdit(true)
            }
        }).catch(function (error) {
            console.log(error);
        });

        //api call
    }, [])
    const onSave = () => {
        const token = localStorage.getItem("token");
        const {
            _id,
            shop_name,
            phone_number,
            address_line_one,
            address_line_two,
            address_line_three,
            address_line_four
        } = state;
        if (_id === "") {
            // setError(prevState => ({ ...prevState, shop_name: true }));
            return;
        } else if (shop_name === "") {
            setError(prevState => ({ ...prevState, shop_name: true }));
            return;
        } else if (phone_number === "") {
            console.log(phone_number)
            setError(prevState => ({ ...prevState, phone_number: true }));
            return;
        } else if (address_line_one === "") {
            setError(prevState => ({ ...prevState, address_line_one: true }));
            return;
        } else if (address_line_two === "") {
            setError(prevState => ({ ...prevState, address_line_two: true }));
            return;
        } else if (address_line_three === "") {
            setError(prevState => ({ ...prevState, address_line_three: true }));
            return;
        } else if (address_line_four === "") {
            setError(prevState => ({ ...prevState, address_line_four: true }));
            return;
        }


        axios.put(`${base_url}shop/${_id}`, {
            shop_name,
            phone_number,
            address_line_one,
            address_line_two,
            address_line_three,
            address_line_four
        }, {
            headers: {
                token
            }
        }).then(function (response) {
            console.log();
            const {
                _id,
                shop_name,
                phone_number,
                address_line_one,
                address_line_two,
                address_line_three,
                address_line_four } = response.data.data.shop
            setState({
                _id,
                shop_name,
                phone_number,
                address_line_one,
                address_line_two,
                address_line_three,
                address_line_four
            });
            if (_id) {
                setEdit(true)
            }
            NotificationManager.success('Shop data updated successfully.', 'Success', 3000);
        })
            .catch(function (error) {
                NotificationManager.error('Error, please try again later.', 'Error', 3000);
                console.log(error);
            });

    }
    const onCreate = () => {
        const token = localStorage.getItem("token");
        const {
            shop_name,
            phone_number,
            address_line_one,
            address_line_two,
            address_line_three,
            address_line_four
        } = state;
        if (shop_name === "") {
            setError(prevState => ({ ...prevState, shop_name: true }));
            return;
        } else if (phone_number === "") {
            console.log(phone_number)
            setError(prevState => ({ ...prevState, phone_number: true }));
            return;
        } else if (address_line_one === "") {
            setError(prevState => ({ ...prevState, address_line_one: true }));
            return;
        } else if (address_line_two === "") {
            setError(prevState => ({ ...prevState, address_line_two: true }));
            return;
        } else if (address_line_three === "") {
            setError(prevState => ({ ...prevState, address_line_three: true }));
            return;
        } else if (address_line_four === "") {
            setError(prevState => ({ ...prevState, address_line_four: true }));
            return;
        }
        axios.post(`${base_url}shop`, {
            shop_name,
            phone_number,
            address_line_one,
            address_line_two,
            address_line_three,
            address_line_four
        }, {
            headers: {
                token
            }
        }).then(function (response) {
            const {
                _id,
                shop_name,
                phone_number,
                address_line_one,
                address_line_two,
                address_line_three,
                address_line_four } = response.data.data.shop
            setState({
                _id,
                shop_name,
                phone_number,
                address_line_one,
                address_line_two,
                address_line_three,
                address_line_four
            });
            NotificationManager.success('Shop created successfully.', 'Success', 3000);
            axios.get(`${base_url}user`, {
                headers: {
                    token
                }
            }).then(function (response) {
                const { user } = response.data.data;
                dispatch(saveUserData(user));
            }).catch(function (error) {
                console.log(error);
                NotificationManager.error('Please refresh the page.', 'Success', 3000);
            });
            if (_id) {
                setEdit(true)
            }
        }).catch(function (error) {
            NotificationManager.error('Error, please try again later.', 'Error', 3000);

            console.log(error);
        });
    }

    const onInputChange = (e) => {
        setState(state => ({ ...state, [e.target.name]: e.target.value }))
        setError(prevState => ({ ...prevState, [e.target.name]: false }))
    }
    return (
        <div className="formContainer" >
            {
                state._id && (<div className="mb-3 btn-container">
                    <legend>Shop Details</legend>
                    <button
                        type="submit"
                        className="btn btn-warning"
                        onClick={() => { setEdit(false) }}
                    >Edit</button>
                </div>)
            }
            <fieldset
                disabled={edit}
            >
                <div className="mb-3">
                    <label for="shop_name" className="form-label">Shop Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="shop_name"
                        name="shop_name"
                        value={state.shop_name}
                        onChange={onInputChange}
                    ></input>
                    {
                        error.shop_name && <div className="errorContainer" >Required.</div>
                    }

                </div>
                <div className="mb-3">
                    <label for="phone_number" className="form-label">Contact No</label>
                    <input
                        type="text"
                        className="form-control"
                        id="phone_number"
                        name="phone_number"
                        value={state.phone_number}
                        onChange={onInputChange}
                    ></input>
                    {
                        error.phone_number && <div className="errorContainer" >Required.</div>
                    }
                </div>
                <div className="mb-3">
                    <label for="address_line_one" className="form-label">Shop no and building</label>
                    <input
                        type="text"
                        className="form-control"
                        id="address_line_one"
                        name="address_line_one"
                        value={state.address_line_one}
                        onChange={onInputChange}
                    ></input>
                    {
                        error.address_line_one && <div className="errorContainer" >Required.</div>
                    }
                </div>
                <div className="mb-3">
                    <label for="address_line_two" className="form-label">Area or Road</label>
                    <input
                        type="text"
                        className="form-control"
                        id="address_line_two"
                        name='address_line_two'
                        value={state.address_line_two}
                        onChange={onInputChange}
                    ></input>
                    {
                        error.address_line_two && <div className="errorContainer" >Required.</div>
                    }
                </div>
                <div className="mb-3">
                    <label for="address_line_three" className="form-label">Landmark</label>
                    <input
                        type="text"
                        className="form-control"
                        id="address_line_three"
                        name="address_line_three"
                        value={state.address_line_three}
                        onChange={onInputChange}
                    ></input>
                    {
                        error.address_line_three && <div className="errorContainer" >Required.</div>
                    }
                </div>
                <div className="mb-3">
                    <label for="address_line_four" className="form-label">Pincode</label>
                    <input
                        type="text"
                        className="form-control"
                        id="address_line_four"
                        name="address_line_four"
                        value={state.address_line_four}
                        onChange={onInputChange}
                    ></input>
                    {
                        error.address_line_four && <div className="errorContainer" >Required.</div>
                    }
                </div>
                {
                    !state._id && (
                        <div className="mb-3 btn-container">
                            <button
                                type="submit"
                                className="btn btn-primary"
                                onClick={onCreate}
                            >Create</button>
                        </div>
                    )
                }
                {
                    state._id && (
                        <div className="mb-3 btn-container">
                            <button
                                type="submit"
                                className="btn btn-primary"
                                onClick={onSave}
                            >Save</button>
                        </div>
                    )
                }

            </fieldset>
            <NotificationContainer />
        </div>
    )
}

export default ShopDetailForm