import {Link, useNavigate} from 'react-router';
import PropTypes from 'prop-types';
import {useUserContext} from '../hooks/contextHooks';
import {useMediaRow} from '../hooks/apiHooks';

const MediaRow = ({item}  ) => {
  const {user} = useUserContext();
  const canModify = user && (user.user_id === item.user_id || user.role === 'admin');
  const {deleteMedia, modifyMedia} = useMediaRow();
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      await deleteMedia(item.media_id, token);
      console.log('delete ok', item);
      navigate(0);
    } catch (error) {
      console.error('delete failed:', error.message);
    }
  };

  const handleModify = async () => {
    try {
      const token = localStorage.getItem('token');
      const inputs = {title: item.title, description: item.description};
      await modifyMedia(item.media_id, inputs, token);
      console.log('modify ok', item);
      navigate(0);
    } catch (error) {
      console.error('modify failed:', error.message);
    }
  };

  return (
    // TODO: move <tr> element in foreach from Home.jsx here
    <tr>
      <td>
        <img src={item.thumbnail} alt={item.title} />
      </td>
      <td>{item.title}</td>
      <td>{item.description}</td>
      <td>{new Date(item.created_at).toLocaleString('fi-FI')}</td>
      <td>{item.filesize}</td>
      <td>{item.media_type}</td>
      <td>
        <Link to="/single" state={{item}} className="inline-block rounded-full bg-emerald-600 px-4 py-2 text-white transition-colors hover:bg-emerald-500">View</Link>
      </td>
      <td>{item.username}</td>
      <td>
        {canModify && (
          <>
            <div className="*:rounded-full *:bg-emerald-600 *:px-4 *:py-2 *:text-white *:transition-colors *:my-2">
              <button
                className="hover:bg-emerald-500"
                onClick={handleModify}
              >
                Modify
              </button>
              <button
                className="hover:bg-emerald-500"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </>
        )}
      </td>
    </tr>
  );
};

MediaRow.propTypes = {
  item: PropTypes.shape({
    media_id: PropTypes.number.isRequired,
    user_id: PropTypes.number.isRequired,
    filename: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    filesize: PropTypes.number.isRequired,
    media_type: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    created_at: PropTypes.string.isRequired,
    username: PropTypes.string,
  }).isRequired,
};

export default MediaRow;
