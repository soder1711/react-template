import useForm from '../hooks/formHooks.js';
import {useUser} from '../hooks/apiHooks.js';

const RegisterForm = () => {
  const {postUser} = useUser();

  const initValues = {
    username: '',
    password: '',
    email: '',
  };

  const doRegister = async () => {
    try {
      const result = await postUser(inputs);
      console.log('register result:', result);
    } catch (error) {
      console.error('register failed:', error.message);
    }
  };

  const {inputs, handleInputChange, handleSubmit} = useForm(
    doRegister,
    initValues,
  );

  return (
    <div className="mx-auto p-8">
      <h1 className="text-3xl font-bold text-blue-800">Register</h1>
      <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4">
        <div>
          <label htmlFor="reguser" className="block font-bold text-blue-800">Username</label>
          <input
            name="username"
            type="text"
            id="reguser"
            value={inputs.username}
            onChange={handleInputChange}
            autoComplete="username"
            className="mt-1 rounded-full border-2 border-blue-800 bg-white px-4 py-2 focus:outline-none focus:border-emerald-600"
          />
        </div>
        <div>
          <label htmlFor="regpassword" className="block font-bold text-blue-800">Password</label>
          <input
            name="password"
            type="password"
            id="regpassword"
            value={inputs.password}
            onChange={handleInputChange}
            autoComplete="new-password"
            className="mt-1 rounded-full border-2 border-blue-800 bg-white px-4 py-2 focus:outline-none focus:border-emerald-600"
          />
        </div>
        <div>
          <label htmlFor="regemail" className="block font-bold text-blue-800">Email</label>
          <input
            name="email"
            type="email"
            id="regemail"
            value={inputs.email}
            onChange={handleInputChange}
            autoComplete="email"
            className="mt-1 rounded-full border-2 border-blue-800 bg-white px-4 py-2 focus:outline-none focus:border-emerald-600"
          />
        </div>
        <button type="submit" className="mx-140 mt-5 rounded-full bg-emerald-600 px-4 py-2 text-white transition-colors hover:bg-emerald-500">Register</button>
      </form>
    </div>
  );
};

export default RegisterForm;
