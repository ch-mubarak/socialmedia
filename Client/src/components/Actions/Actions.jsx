import React from "react";
import {
  UilEditAlt,
  UilTrashAlt,
  UilExclamationOctagon,
} from "@iconscout/react-unicons";
import "./Actions.css";
import { useDispatch, useSelector } from "react-redux";
import { deletePost } from "../../actions/PostAction";
const Actions = ({ postId, userId }) => {
  const currentUserId = useSelector(
    (state) => state.authReducer.authData.user._id
  );
  const dispatch = useDispatch();
  const handleDelete = () => {
    console.log("deleting");
    dispatch(deletePost(postId));
  };
  return (
    <div className="actions">
      <ul>
        {currentUserId === userId && (
          <li>
            <UilEditAlt /> Edit
          </li>
        )}
        {currentUserId === userId && (
          <li onClick={handleDelete}>
            <UilTrashAlt /> Delete
          </li>
        )}
        <li>
          <UilExclamationOctagon />
          Report
        </li>
      </ul>
    </div>
  );
};

export default Actions;
