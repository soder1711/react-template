import {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {useUserContext} from '../hooks/contextHooks';
import {useLike} from '../hooks/apiHooks';

const Likes = ({mediaId}) => {
  const {user} = useUserContext();
  const {getLikeCountByMediaId, getLikeByUser, postLike, deleteLike} = useLike();

  const [likeCount, setLikeCount] = useState(0);
  const [userLike, setUserLike] = useState(null);

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const countResult = await getLikeCountByMediaId(mediaId);
        setLikeCount(countResult.count);

        if (user) {
          const token = localStorage.getItem('token');
          const likeResult = await getLikeByUser(mediaId, token);
          setUserLike(likeResult);
        }
      } catch (error) {
        console.log('fetchLikes:', error.message);
      }
    };
    fetchLikes();
  }, [user, mediaId]);

  const handleLikeClick = async () => {
    const token = localStorage.getItem('token');
    try {
      if (userLike) {
        await deleteLike(userLike.like_id, token);
        setUserLike(null);
        setLikeCount((count) => count - 1);
      } else {
        await postLike(mediaId, token);
        const likeResult = await getLikeByUser(mediaId, token);
        setUserLike(likeResult);
        setLikeCount((count) => count + 1);
      }
    } catch (error) {
      console.error('handleLikeClick failed:', error.message);
    }
  };

  const likedClasses = 'bg-rose-500 hover:bg-rose-400';
  const notLikedClasses = 'bg-emerald-600 hover:bg-emerald-500';
  const baseClasses = 'mt-2 inline-block rounded-full px-4 py-2 text-white transition-colors';

  return (
    <button
      onClick={handleLikeClick}
      disabled={!user}
      className={
        (userLike ? likedClasses : notLikedClasses) +
        ' ' +
        baseClasses +
        (user ? '' : ' cursor-not-allowed opacity-50')
      }
    >
      ♥ {likeCount}
    </button>
  );

};

Likes.propTypes = {
  mediaId: PropTypes.number.isRequired,
};

export default Likes;
