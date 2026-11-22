import LoginForm from '../components/LoginForm.jsx';
import RegisterForm from '../components/RegisterForm.jsx';
import {useState} from 'react';

const Login = () => {
  const [form, setForm] = useState('login');
  return (
    <>
      {form === 'login' ? <LoginForm /> : <RegisterForm />}
      <button
        className="mb-8 rounded-full bg-slate-200 px-4 py-2 text-blue-800 transition-colors hover:bg-slate-300"
        onClick={() => setForm(form === 'login' ? 'register' : 'login')}>
        {form === 'login' ? 'No account yet? Register' : 'Already registered? Login'}
      </button>
    </>
  );
};

export default Login;
