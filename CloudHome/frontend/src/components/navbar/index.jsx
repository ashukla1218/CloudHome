import "./styles.css";
import { useDispatch } from "react-redux";
import { appLogout } from "../../store/slices/authSlice";
import logo from '../../pages/logo.png';

const Navbar = () => {
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(appLogout());
    };

    return (
        <div className="navbar-container">
            <div className="navbar-left-items">
            <img src={logo} alt="Storify Logo" className="navbar-logo" />
                {/* <h3></h3> */}
            </div>
            <div className="navbar-right-items">
                <button onClick={handleLogout}>Logout</button>
            </div>
        </div>
    );
};

export default Navbar;

