import React, { useEffect, useRef } from "react";
import "./ProfileCard.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getUserDetails, updateProfile } from "../../actions/UserAction";
import { UilPen } from "@iconscout/react-unicons";
import { uploadImage } from "../../actions/UploadAction";


const ProfileCard = ({ location }) => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const { userPosts } = useSelector((state) => state.postReducer);
  const {userDetails} = useSelector((state) => state.userReducer);
  const params = useParams();
  const dispatch = useDispatch();
  const coverRef = useRef();
  const profileRef = useRef();

  let isUser = false;
  if (!params.id || params.id === user._id) {
    isUser = true;
  }
  useEffect(() => {
    console.log("profile card");
    if (params.id && params.id !== user._id) {
      const userId = params.id;
      dispatch(getUserDetails(userId));
    }
  }, [dispatch, params.id, user._id]);
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

  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  const serverStatic = process.env.REACT_APP_STATIC_FOLDER;

  return (
    <div className="profileCard">
      {(params.id === user._id || location === "home") && (
        <div className="editPen" onClick={() => coverRef.current.click()}>
          <UilPen />
        </div>
      )}
      <div className="profileImages">
        {isUser && (
          <img
            src={
              user?.coverPicture
                ? `${serverPublic}/${user.coverPicture}`
                : `${serverStatic}/cover.jpg`
            }
            alt=""
          />
        )}
        {!isUser && (
          <img
            src={
              userDetails?.coverPicture
                ? `${serverPublic}/${userDetails.coverPicture}`
                : `${serverStatic}/cover.jpg`
            }
            alt=""
          />
        )}
        {isUser && (
          <img
            src={
              user?.profilePicture
                ? `${serverPublic}/${user.profilePicture}`
                : `${serverStatic}/profile.jpg`
            }
            alt=""
            onClick={() => profileRef.current.click()}
          />
        )}
        {!isUser && (
          <img
            src={
              userDetails?.profilePicture
                ? `${serverPublic}/${userDetails.profilePicture}`
                : `${serverStatic}/profile.jpg`
            }
            alt=""
          />
        )}
      </div>
      <div className="profileName">
        <span>
          {isUser ? user.firstName : userDetails?.firstName}{" "}
          {isUser ? user.lastName : userDetails?.lastName}
        </span>
        <span>{isUser ? user.about : userDetails?.about}</span>
      </div>
      <div className="followStatus">
        <hr />
        <div>
          <div className="follow">
            <span>
              {isUser
                ? user?.following?.length
                : userDetails?.following?.length}
            </span>
            <span>Following</span>
          </div>
          <div className="vl"></div>
          <div className="follow">
            <span>
              {isUser
                ? user?.followers?.length
                : userDetails?.followers?.length}
            </span>
            <span>Followers</span>
          </div>

          {location === "profile" && (
            <>
              <div className="vl"></div>
              <div className="follow">
                <span>{userPosts?.length}</span>
                <span>Posts</span>
              </div>
            </>
          )}
        </div>
        <hr />
      </div>
      {isUser && (
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
      )}
      {location === "home" && (
        <span>
          <Link to={`/profile/${user._id}`}>My Profile</Link>
        </span>
      )}
    </div>
  );
};

export default ProfileCard;
