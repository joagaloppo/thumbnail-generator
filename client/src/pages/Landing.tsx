import axios from 'axios';
import React, { useState } from 'react';
import Cookies from 'js-cookie';
import SignUp from '../components/SignUp';
import SignIn from '../components/SignIn';

interface LandingProps {
  children?: React.ReactNode;
}

const Landing: React.FC<LandingProps> = () => {
  const [username, setUsername] = useState('example');
  const [password, setPassword] = useState('example');

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, { userId: username, password });
      console.log(response.data.token);
      console.log(response.data.user);
      Cookies.set('access_token', response.data.token);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="min-h-[calc(100svh_-_148px)] px-4 py-8 lg:min-h-[calc(100svh_-_164px)]">
      <div className="mx-auto flex w-full max-w-md justify-center gap-2">
        <SignUp />
        <SignIn />
      </div>
    </section>
  );
};

export default Landing;
