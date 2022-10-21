import './App.css';
import { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import ShopDetailForm from './components/shop/ShopDetailForm';
import ProductForm from "./components/product/ProductForm"
import UserProductContainer from './components/home/homeComponents/UserProductContainer';
import ClientUi from "./components/clientUi/ClientUi";
import Home from "./components/home/Home"
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import ShopContainer from './components/home/homeComponents/ShopContainer';
import AdminContainer from './components/admin/AdminContainer';
import LoginComponent from './components/auth/LoginComponent';
import SignupComponent from './components/auth/SignupComponent';
import { saveUserData } from "./redux/user/userActions";
import { saveAppData } from "./redux/appData/appDataActions"
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import 'react-notifications/lib/notifications.css';
import { base_url } from './appConstants';
function App() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const dispatch = useDispatch()
  useEffect(() => {

    axios.get(`${base_url}appData`)
      .then(function (response) {
        const { appData } = response.data.data;
        dispatch(saveAppData(appData[0]));
      }).catch(function (error) {
        console.log(error);
      });
    if (!token) {
      return;
    }
    axios.get(`${base_url}user`, {
      headers: {
        token
      }
    }).then(function (response) {
      const { user } = response.data.data;
      dispatch(saveUserData(user));
    }).catch(function (error) {
      console.log(error);
    });

  }, [])
  return (
    <div className="App">
      <Routes>
        <Route path='signup' element={<SignupComponent />} />
        <Route path='login' element={<LoginComponent />} />
        {/* <Route path='shopdetails' element={<ShopDetailForm />} />
        <Route path='productdetails' element={<ProductForm />} /> */}
        <Route path='/' element={<ClientUi />} ></Route>
        <Route path='home' element={<Home />} >
          <Route path='shop' element={<ShopContainer />} ></Route>
          <Route path='product' element={<UserProductContainer />} ></Route>
          <Route path='admin' element={<AdminContainer />} ></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
