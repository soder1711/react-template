import {useEffect, useState} from 'react';
import MediaRow from '../components/MediaRow.jsx';
import {fetchData} from '../utils/fetchData.js';

const Home = () => {
  const [mediaArray, setMediaArray] = useState([]);

  useEffect(() => {
    const getMedia = async () => {
      try {
        const media = await fetchData(
          import.meta.env.VITE_MEDIA_API + '/media',
        );

        const mediaWithUsers = await Promise.all(
          media.map(async (item) => {
            const userResult = await fetchData(
              import.meta.env.VITE_AUTH_API + '/user/' + item.user_id,
            );

            return {...item, username: userResult.username};
          }),
        );


        setMediaArray(mediaWithUsers);
      } catch (error) {
        console.error('getMedia failed:', error);
      }
    };
    getMedia();
  }, []);

  return (
    <>
      <h2>My Media</h2>
      <table>
        <thead>
        <tr>
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
        <tbody>
        {mediaArray.map((item) => (
          <MediaRow key={item.media_id} item={item} />
        ))}
        </tbody>
      </table>
    </>
  );
};

export default Home;
