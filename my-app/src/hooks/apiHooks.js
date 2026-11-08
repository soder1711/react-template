// TODO: add necessary imports
import {useEffect, useState} from "react";
import {fetchData} from "../utils/fetchData.js";

const useMedia = () => {
  const [mediaArray, setMediaArray] = useState([]);
  console.log("All env:" + import.meta.env)
  useEffect(() => {
    const getMedia = async () => {
      try {
        const media = await fetchData(
          import.meta.env.VITE_MEDIA_API + '/media',
        );

        const mediaWithUsers = await Promise.all(
          media.map(async (item) => {
            const userResult = await fetchData(
              import.meta.env.VITE_AUTH_API + '/users/' + item.user_id,
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
  return {mediaArray};
};

export {useMedia};
