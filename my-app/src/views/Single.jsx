import {useLocation, useNavigate} from 'react-router';
import Likes from "../components/Likes.jsx";

const Single = () => {
  const {state} = useLocation();
  const navigate = useNavigate();

  if (!state?.item) {
    return (
      <div className="p-8">
        <h3 className="text-2xl text-blue-800">No media selected</h3>
        <button
          className="mt-4 rounded-full bg-emerald-600 px-4 py-2 text-white transition-colors hover:bg-emerald-500"
          onClick={() => navigate('/')}>Back to home</button>
      </div>
    );
  }

  const item = state.item;
  const isVideo = item.media_type.startsWith('video');

  return (
    <div className="mx-auto max-w-3xl p-8">
      {isVideo ? (
        <video src={item.filename} controls className="mx-auto rounded-xl"/>
      ) : (
        <img src={item.filename} alt={item.title} className="mx-auto rounded-xl"/>
      )}
      <h3 className="mt-4 text-2xl font-bold text-blue-800">{item.title}</h3>
      <p className="text-blue-800">Owner: {item.username}</p>
      <p className="text-blue-800">{item.description}</p>
      <p className="text-blue-800">{new Date(item.created_at).toLocaleString('fi-FI')}</p>
      <Likes mediaId={item.media_id} />
      <button
        className="mt-4 rounded-full bg-emerald-600 px-4 py-2 text-white transition-colors hover:bg-emerald-500 mx-3"
        onClick={() => navigate(-1)}>Go back</button>
    </div>
  );
};

export default Single;
