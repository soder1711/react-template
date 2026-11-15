import {useUserContext} from '../hooks/contextHooks';

const Logout = () => {
  const {handleLogout} = useUserContext();

  return (
    <div>
      <h1>Logout</h1>
      <button onClick={() => handleLogout()}>Logout</button>
    </div>
  );
};

export default Logout;
