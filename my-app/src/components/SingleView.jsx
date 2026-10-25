import PropTypes from 'prop-types';

const SingleView = (props) => {
  const {item, setSelectedItem} = props;
  const isVideo = item.media_type.startsWith('video');
  return <dialog open={item !== null}>
    {isVideo ? (
      <video src={item.filename} controls />
    ) : (
      <img src={item.filename} alt={item.title} />
    )}
    <h3>{item.title}</h3>
    <p>{item.description}</p>
    <p>{new Date(item.created_at).toLocaleString('fi-FI')}</p>
    <button onClick={() => setSelectedItem(null)}>Close</button>
  </dialog>
};

SingleView.propTypes = {
  item: PropTypes.object.isRequired,
  setSelectedItem: PropTypes.func.isRequired,
};

export default SingleView;
