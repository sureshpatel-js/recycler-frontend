import { useEffect } from "react";
import { useState } from "react";
import "./ContactUserContainer.css";
import axios from "axios";
import { base_url } from "../../../../../../appConstants";
const ContactUserContainer = (props) => {
    const { _id } = props.user;
    const [contactObj, setContactObj] = useState({
        _id: "",
        contact_user: []
    });
    const [formData, setFormData] = useState({
        contact_channel: "",
        message: "",
        next_connect_date_with_user: ""
    })
    const [error, setError] = useState({
        contact_channel: false,
        message: false,
    })

    const token = localStorage.getItem("token");
    useEffect(() => {
        axios.get(`${base_url}user/contactUser/${_id}`, {
            headers: {
                token
            }
        })
            .then(function (response) {
                console.log(response)
                const { contactUser } = response.data.data;
                console.log(contactUser)
                if (contactUser.contact_user) {
                    setContactObj({
                        _id: contactUser._id,
                        contact_user: contactUser.contact_user
                    })
                }
            }).catch(function (error) {
                console.log(error);
            })
    }, [])

    const onInputChange = (e) => {
        setFormData(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
        setError(prevState => ({ ...prevState, [e.target.name]: false }))
    }

    const submit = () => {
        console.log(formData)
        const { contact_channel,
            message,
            next_connect_date_with_user } = formData;
        if (contact_channel === "") {
            setError(prevState => ({ ...prevState, contact_channel: true }));
            return;
        } else if (message === "") {
            setError(prevState => ({ ...prevState, message: true }));
            return;
        }

        axios.post(`${base_url}user/contactUser/${_id}`, { ...formData }, {
            headers: {
                token
            }
        }).then(function (response) {
            console.log(response)
            const { contactUser } = response.data.data;
            console.log(contactUser)
            if (contactUser.contact_user) {
                setContactObj({
                    _id: contactUser._id,
                    contact_user: contactUser.contact_user
                })
            }
            setFormData({
                contact_channel: "1",
                message: "",
                next_connect_date_with_user: ""
            })
        }).catch(function (error) {
            console.log(error);
        })


    }

    const { contact_user } = contactObj;

    const ContactIcon = (value) => {
        return (
            <>
                {
                    value === "1" && <i class="bi bi-telephone"></i>

                }
                {
                    value === "2" && <i class="bi bi-chat-left-text"></i>

                }
                {
                    value === "3" && <i class="bi bi-whatsapp"></i>
                }
                {
                    value === "4" && <i class="bi bi-megaphone"></i>
                }
            </>
        )
    }

    return (
        <div className="contactUserContainer" >
            <div className="contactedInfoContainer">
                {
                    contact_user.length > 0 && contact_user.map(info => {
                        //  if (!props.value) return (<div>Not yet.</div>)
                        const date = new Date(info.created_at).toLocaleDateString();
                        const time = new Date(info.created_at).toLocaleTimeString();
                        const dateArray = date.split("/");
                        return (
                            <div className="info" >
                                <div>

                                    <span>{dateArray[1]}-{dateArray[0]}-{dateArray[2]}</span>
                                    <span style={{ color: "gray", marginLeft: "5px", fontSize: "12px" }} ><i>{time}</i> </span>

                                </div>
                                <div>
                                    <span style={{ marginRight: "8px" }} >{ContactIcon(info.contact_channel)}</span>
                                    {info.message}
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <div className="contactFormContainer" >
                <div className="inputContainer" >
                    <select style={{width:"100%"}} onChange={onInputChange} value={formData.contact_channel} name="contact_channel" >
                        <option value="">Please select.</option>
                        <option value="1">call</option>
                        <option value="2">message</option>
                        <option value="3">whatsapp</option>
                        <option value="4">other</option>
                    </select>
                    {
                        error.contact_channel && <div className="errorContainer" >Required.</div>
                    }
                </div>
                <div className="inputContainer" >
                    <textarea style={{width:"100%"}} onChange={onInputChange} name="message" value={formData.message} type="text" ></textarea >
                    {
                        error.message && <div className="errorContainer" >Required.</div>
                    }
                </div>
                <div className="inputContainer" >
                    <div> <span >Connect On</span> <input onChange={onInputChange} name="next_connect_date_with_user" type="date" value={formData.next_connect_date_with_user} ></input></div>
                </div>
                <button onClick={submit} >submit</button>

            </div>
        </div>
    )
}

export default ContactUserContainer;