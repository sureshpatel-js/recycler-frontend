import "./AdminContainer.css";
import AdminRight from "./AdminRight";
import AdminLeft from "./AdminLeft";
import UserTable from "./adminComponents/userTable/UserTable";
const AdminContainer = (props) => {
    return (
        <div className="adminContainer" >
            <AdminLeft>
                Left
            </AdminLeft>
            <AdminRight>
                <UserTable />
            </AdminRight>
        </div>
    )
}

export default AdminContainer;