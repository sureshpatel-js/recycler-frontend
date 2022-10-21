import "./UserTable.css";
import GridComponent from "../../../Grids/GridComponent/GridComponent";
import { useEffect } from "react";
import { useState } from "react";
import { base_url } from "../../../../appConstants";
import axios from "axios";
import ContactUserContainer from "./userTableComponents/contactUser/ContactUserContainer";
const UserTable = (props) => {
    const [gridHeight, setGridHeight] = useState();
    const [users, setUsers] = useState([])
    useEffect(() => {
        const token = localStorage.getItem("token");
        axios.get(`${base_url}user/getUsersForAdmin`, {
            headers: {
                token
            }
        }).then(function (response) {
            const { users } = response.data.data
            setUsers(users)
            console.log(users)
        }).catch(function (error) {
            console.log(error);
        });
    }, [])


    useEffect(() => {
        const height = window.innerHeight;
        const netHeight = height - (40 + 40);
        setGridHeight(netHeight);
    }, [])
    window.addEventListener("resize", () => {
        const height = window.innerHeight;
        const netHeight = height - (40 + 40);
        setGridHeight(netHeight);
    })


    const phoneNumberVerifiedComponent = props => {
        return (<>
            {props.value ? <span style={{ color: "#66bb6a" }} >Yes</span> : <span style={{ color: "#ef5350" }}>No</span>}
        </>)
    }

    const shopVerifiedComponent = props => {
        return (<div>
            {props.value ? <span style={{ color: "#66bb6a" }} >Yes</span> : <span style={{ color: "#ef5350" }}>No</span>}
        </div>)
    }
    const dateComponent = props => {
    
        if (!props.value) return (<div>Not yet.</div>)
        const date = new Date(props.value).toLocaleDateString();
        const time = new Date(props.value).toLocaleTimeString();
        const dateArray = date.split("/");
        return (
            <div>
                <span>{dateArray[1]}-{dateArray[0]}-{dateArray[2]}</span>
                <span style={{ color: "gray", marginLeft: "5px", fontSize: "12px" }} ><i>{time}</i> </span>
            </div>
        )
    }

    const ContactUser = (props) => {
        const user = props.data;
        const [toggle, setToggle] = useState(false);
        const toggleButton = () => {
            setToggle(state => !state);
        }
        return (
            <div>
                <button onClick={toggleButton} >View</button>
                {toggle && <ContactUserContainer user={user} />}
            </div>
        )
    }

    const headerArray = [
        { headerName: "Registered Date", field: 'created_at', cellComponent: dateComponent, width: 180 },
        { headerName: "First Name", field: 'first_name', width: 80 },
        { headerName: "Last Name", field: "last_name", width: 80 },
        { headerName: "Phone Number", field: "phone_number", width: 120 },
        { headerName: "Phone No. Verified?", field: "phone_number_verified", cellComponent: phoneNumberVerifiedComponent, width: 120 },
        { headerName: "Shop Created?", field: "shop", cellComponent: shopVerifiedComponent, width: 120 },
        { headerName: "Last Login Date", field: 'last_login_at', cellComponent: dateComponent, width: 180 },
        { headerName: "Contact User", field: "", cellComponent: ContactUser, width: 400 },
    ]
    return (
        <div className="userTableContainer" >
            <GridComponent
                headerArray={headerArray}
                rowArray={users}
                tableHeight={gridHeight}
            />
            {/* <div className="userTablePopp" >
                <ContactUserContainer />
            </div> */}
        </div>
    )
}

export default UserTable;