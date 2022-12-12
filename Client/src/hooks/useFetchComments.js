import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
const token = localStorage.getItem("token");
const useFetchComments = (postId) => {
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    setError(false);
    axios({
      method: "GET",
      url: `/comment/${postId}`,
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        setComments(response.data);
        setLoading(false);
        setError(false);
      })
      .catch((err) => {
        if (err.response.data.expired) {
          return dispatch({ type: "LOGOUT" });
        }
        console.log(err);
        setError(true);
      });
  }, []);

  return { loading, error, setComments, comments };
};

export default useFetchComments;
