import MediaRow from '../components/MediaRow.jsx';
import {useMedia} from '../hooks/apiHooks.js';

const Home = () => {
  const {mediaArray} = useMedia();

  return (
    <>
      <h2 className="text-4xl font-bold text-blue-800">My Media</h2>
      <table className="mx-5">
        <thead>
        <tr className="text-3xl font-bold text-blue-800">
          <th>Thumbnail</th>
          <th>Title</th>
          <th>Description</th>
          <th>Created</th>
          <th>Size</th>
          <th>Type</th>
          <th>Owner</th>
          <th>Actions</th>
        </tr>
        </thead>
        <tbody className="text-blue-800">
        {mediaArray.map((item) => (
          <MediaRow key={item.media_id} item={item} />
        ))}
        </tbody>
      </table>
    </>
  );
};

export default Home;
