import React from "react";
import "./Notifications.css";
import { UilTrashAlt } from "@iconscout/react-unicons";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { clearNotifications } from "../../actions/UserAction";
const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

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
            <img src={`${serverPublic}/${notification.profilePicture}`} />
            <div>
              <h2>{notification.title}</h2>
              <p>{notification.message}</p>
              <p>{moment(notification.time).fromNow()}</p>
            </div>
          </div>
        );
      })}
      <button
        className="button button-notification"
        onClick={handleClearNotification}
      >
        <UilTrashAlt /> clear
      </button>
    </div>
  );
});

export default Notifications;
