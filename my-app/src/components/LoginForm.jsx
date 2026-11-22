import useForm from '../hooks/formHooks.js';
import {useUserContext} from '../hooks/contextHooks';

const LoginForm = () => {
  const {handleLogin} = useUserContext();


  const initValues = {
    username: '',
    password: '',
  };

  const doLogin = async () => {
    console.log(inputs);
    // TODO: add login functionalities here
    try {
      await handleLogin(inputs);
    } catch (error) {
      console.error('login failed:', error.message);
    }
  };

  const {inputs, handleInputChange, handleSubmit} = useForm(doLogin, initValues);

  console.log(inputs);
  return (
    <div className="mx-auto max-w-80 p-8">
      <h1 className="text-3xl font-bold text-blue-800">Login</h1>
      <form onSubmit={ handleSubmit } className="mt-4 flex flex-col gap-4">
        <div>
          <label htmlFor="loginuser" className="block font-bold text-blue-800">Username</label>
          <input
            name="username"
            type="text"
            id="loginuser"
            onChange={ handleInputChange }
            autoComplete="username"
            className="w-full mt-1 rounded-full border-2 border-blue-800 bg-white px-4 py-2 focus:outline-none focus:border-emerald-600"
          />
        </div>
        <div>
          <label htmlFor="loginpassword" className="block font-bold text-blue-800">Password</label>
          <input
            name="password"
            type="password"
            id="loginpassword"
            onChange={ handleInputChange }
            autoComplete="current-password"
            className="w-full mt-1 rounded-full border-2 border-blue-800 bg-white px-4 py-2 focus:outline-none focus:border-emerald-600"
          />
        </div>
        <button type="submit" className="mt-5 rounded-full bg-emerald-600 px-4 py-2 text-white transition-colors hover:bg-emerald-500">Login</button>
      </form>
    </div>
  );
};

export default LoginForm
