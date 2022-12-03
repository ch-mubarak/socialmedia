import React, { useState, useRef } from "react";
import "./PostShare.css";
import ProfileImage from "../../img/profileImg.jpg";
import {
  UilScenery,
  UilPlayCircle,
  UilLocationPoint,
  UilSchedule,
  UilTimes,
} from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import { uploadImage } from "../../actions/UploadAction";
import { createPost } from "../../actions/PostAction";

const PostShare = () => {
  const [image, setImage] = useState(null);
  const [postDescription, setPostDescription] = useState("");
  const { user } = useSelector((state) => state.authReducer.authData);
  const loading = useSelector((state) => state.postReducer.loading);
  const dispatch = useDispatch();
  const imageRef = useRef();
  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImage(img);
    }
  };
  const reset = () => {
    setImage(null);
    setPostDescription("");
  };
  const handlePostSubmit = (event) => {
    event.preventDefault();
    const newPost = {
      userId: user._id,
      description: postDescription,
    };
    if (image) {
      const data = new FormData();
      const fileName = Date.now() + image.name;
      data.append("name", fileName);
      data.append("file", image);
      newPost.image = fileName;
      try {
        dispatch(uploadImage(data));
      } catch (err) {
        console.log(err);
      }
    }
    dispatch(createPost(newPost));
    reset();
  };
  return (
    <>
    <form onSubmit={handlePostSubmit}>
      <div className="postShare">
        <img src={ProfileImage} alt="" />
        <div>
          <input
            value={postDescription}
            onChange={(e) => setPostDescription(e.target.value)}
            required
            type="text"
            placeholder="What's happening"
          />
          <div className="postOptions">
            <div
              className="option"
              style={{ color: "var(--photo)" }}
              onClick={() => imageRef.current.click()}
            >
              <UilScenery />
              Photo
            </div>
            <div className="option" style={{ color: "var(--video)" }}>
              <UilPlayCircle />
              Video
            </div>
            <div className="option" style={{ color: "var(--location)" }}>
              <UilLocationPoint />
              Location
            </div>
            <div className="option" style={{ color: "var(--schedule)" }}>
              <UilSchedule />
              Schedule
            </div>
            {(postDescription.trim() || image) && (
              <button className="button ps-button" disabled={loading}>
                {loading ? "Uploading..." : "Share"}
              </button>
            )}
            <div style={{ display: "none" }}>
              <input
                type="file"
                name="newImage"
                ref={imageRef}
                onChange={handleImageChange}
              />
            </div>
          </div>
          {image && (
            <div className="previewImage">
              <UilTimes onClick={() => setImage(null)} />
              <img src={URL.createObjectURL(image)} alt="" />
            </div>
          )}
        </div>
      </div>
    </form>
    <div className="spinner"></div>
    </>
  );
};

export default PostShare;
