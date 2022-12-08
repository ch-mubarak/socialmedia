import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
const token = localStorage.getItem("token");
export default function useFetchPosts(id, isTimeline, skip) {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.authReducer.authData.user._id);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    dispatch({type:'RESET_POSTS'})
  }, [id, isTimeline]);

  const url = isTimeline ? `/post/${userId}/timeline` : `/post/user/${id}`;

  useEffect(() => {
    setLoading(true);
    setError(false);
    let cancel;
    axios({
      method: "GET",
      url: url,
      params: { skip: skip },
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        dispatch({ type: "FETCH_POSTS", payload: response.data.posts });
        setHasMore(response.data.posts.length > 0);
        setLoading(false);
      })
      .catch((err) => {
        if (axios.isCancel(err)) return;
        if (err?.response?.data?.expired) {
          console.log(err);
          localStorage.clear();
          dispatch({ type: "LOGOUT" });
        }
        setError(true);
      });

    //cleanup function
    return () => cancel();
  }, [id, skip, isTimeline]);

  return { loading, error, hasMore };
}
