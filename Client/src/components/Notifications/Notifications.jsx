import React from "react";
import "./Notifications.css";
import { UilTrashAlt } from "@iconscout/react-unicons";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { clearNotifications } from "../../actions/UserAction";
import { Link } from "react-router-dom";
const serverImages = process.env.REACT_APP_PUBLIC_IMAGES;

const Notifications = React.forwardRef(({ notifications }, ref) => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.authReducer.authData.user._id);
  const handleClearNotification = () => {
    dispatch(clearNotifications(userId));
  };

  return (
    <div ref={ref} className="notification-list">
      {notifications.map((notification) => {
        return (
          <div key={notification.id} className="notification-item">
            <Link to={notification.link}>
              <img src={`${serverImages}/${notification.profilePicture}`} />
            </Link>
            <div>
              <h2>{notification.title}</h2>
              <p>{notification.message}</p>
              <p>{moment(notification.time).fromNow()}</p>
            </div>
          </div>
        );
      })}
      <div className="notification-clear" onClick={handleClearNotification}>
        <UilTrashAlt />
      </div>
    </div>
  );
});

export default Notifications;
