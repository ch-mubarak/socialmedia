import React, { useEffect, useRef } from "react";
import "./ProfileCard.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getUserDetails } from "../../actions/UserAction";
import { UilPen } from "@iconscout/react-unicons";
import { uploadImage } from "../../actions/UploadAction";
import { updateProfile } from "../../actions/AuthAction";

const ProfileCard = ({ location }) => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const { myPosts } = useSelector((state) => state.postReducer);
  const userPosts = useSelector((state) => state.userReducer.posts);
  const userDetails = useSelector((state) => state.userReducer.details);
  const params = useParams();
  const dispatch = useDispatch();
  const coverRef = useRef();
  const profileRef = useRef();

  useEffect(() => {
    if (params.id) {
      const userId = params.id;
      dispatch(getUserDetails(userId));
    }
  }, [dispatch, params.id]);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const img = e.target.files[0];
      const name = e.target.name;
      const data = new FormData();
      const fileName = Date.now() + img.name;
      data.append("name", fileName);
      data.append("file", img);
      const userDetails = {
        [name]: fileName,
      };
      try {
        dispatch(uploadImage(data));
        dispatch(updateProfile(user._id, userDetails));
      } catch (err) {
        console.log(err);
      }
    }
  };

  const currentPosts = params.id ? userPosts : myPosts;
  const currentUser = params.id ? userDetails : user;
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <div className="profileCard">
      {currentUser._id === user._id && (
        <div className="editPen" onClick={() => coverRef.current.click()}>
          <UilPen />
        </div>
      )}
      <div className="profileImages">
        <img
          src={
            currentUser?.coverPicture
              ? `${serverPublic}/${currentUser.coverPicture}`
              : `${serverPublic}/cover.jpg`
          }
          alt=""
        />
        <img
          src={
            currentUser?.profilePicture
              ? `${serverPublic}/${currentUser.profilePicture}`
              : `${serverPublic}/profile.jpg`
          }
          alt=""
          onClick={() => {
            if (currentUser._id === user._id) {
              return profileRef.current.click();
            }
          }}
        />
      </div>
      <div className="profileName">
        <span>
          {currentUser?.firstName} {currentUser?.lastName}
        </span>
        {!params.id && (
          <span>{user?.about ? user.about : "Write about yourself"}</span>
        )}
        {params.id && <span>{userDetails?.about}</span>}
      </div>
      <div className="followStatus">
        <hr />
        <div>
          <div className="follow">
            <span>{currentUser?.following?.length}</span>
            <span>Following</span>
          </div>
          <div className="vl"></div>
          <div className="follow">
            <span>{currentUser?.followers?.length}</span>
            <span>Followers</span>
          </div>

          {location === "profile" && (
            <>
              <div className="vl"></div>
              <div className="follow">
                <span>{currentPosts?.length}</span>
                <span>Posts</span>
              </div>
            </>
          )}
        </div>
        <hr />
      </div>
      <div style={{ display: "none" }}>
        <input
          type="file"
          name="profilePicture"
          ref={profileRef}
          onChange={handleImageChange}
        />
        <input
          type="file"
          name="coverPicture"
          ref={coverRef}
          onChange={handleImageChange}
        />
      </div>
      {location === "home" && (
        <span>
          <Link to="/profile">My Profile</Link>
        </span>
      )}
    </div>
  );
};

export default ProfileCard;
