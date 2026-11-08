import LoginForm from '../components/LoginForm.jsx';
import RegisterForm from '../components/RegisterForm.jsx';
import {useState} from 'react';

const Login = () => {
  const [form, setForm] = useState('login');
  return (
    <>
      {form === 'login' ? <LoginForm /> : <RegisterForm />}
      <button onClick={() => setForm(form === 'login' ? 'register' : 'login')}>
        {form === 'login' ? 'No account yet? Register' : 'Already registered? Login'}
      </button>
    </>
  );
};

export default Login;
