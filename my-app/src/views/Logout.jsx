import {useUserContext} from '../hooks/contextHooks';

const Logout = () => {
  const {handleLogout} = useUserContext();

  return (
    <div className="mx-auto p-8">
      <h1 className="text-3xl font-bold text-blue-800">Logout</h1>
      <button
        onClick={() => handleLogout()}
        className="mt-4 rounded-full bg-emerald-600 px-4 py-2 text-white transition-colors hover:bg-emerald-500"
      >Logout</button>
    </div>
  );
};

export default Logout;
