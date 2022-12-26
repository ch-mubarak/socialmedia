import "./NavBar.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import Home from "../../img/home.png";
import bell from "../../img/noti.png";
import Chat from "../../img/comment.png";
import { getNotifications } from "../../actions/UserAction";
import useComponentVisible from "../../hooks/useComponentVisible";
import Notifications from "../Notifications/Notifications";

const NavBar = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { notifications } = useSelector((state) => state.userReducer);
  const { dropdownRef, isComponentVisible, setIsComponentVisible } =
    useComponentVisible(false);

  useEffect(() => {
    dispatch(getNotifications());
  }, [location]);
  return (
    <div className="navIcons">
      <Link to="/home">
        <img src={Home} alt="Home" />
      </Link>
      {/* <UilSetting /> */}
      <div className="notification">
        <img
          src={bell}
          alt="notification"
          onClick={() => setIsComponentVisible(true)}
        />
        {notifications.length > 0 && <span>{notifications.length}</span>}
        {isComponentVisible && notifications.length > 0 && (
          <Notifications ref={dropdownRef} notifications={notifications} />
        )}
      </div>
      <Link to="/chat">
        <img src={Chat} alt="comment" />
      </Link>
    </div>
  );
};

export default NavBar;
