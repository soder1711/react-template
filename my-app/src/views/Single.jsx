import {useLocation, useNavigate} from 'react-router';
import Likes from "../components/Likes.jsx";

const Single = () => {
  const {state} = useLocation();
  const navigate = useNavigate();

  if (!state?.item) {
    return (
      <>
        <h3>No media selected</h3>
        <button onClick={() => navigate('/')}>Back to home</button>
      </>
    );
  }

  const item = state.item;
  const isVideo = item.media_type.startsWith('video');

  return (
    <>
      {isVideo ? (
        <video src={item.filename} controls />
      ) : (
        <img src={item.filename} alt={item.title} />
      )}
      <h3>{item.title}</h3>
      <p>Owner: {item.username}</p>
      <p>{item.description}</p>
      <p>{new Date(item.created_at).toLocaleString('fi-FI')}</p>
      <Likes mediaId={item.media_id} />
      <button onClick={() => navigate(-1)}>Go back</button>
    </>
  );
};

export default Single;
