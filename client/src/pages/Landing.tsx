import axios from 'axios';
import React, { useState } from 'react';
import Cookies from 'js-cookie';

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
      <form
        className="mx-auto flex w-full max-w-2xl flex-col items-center justify-center gap-4"
        onSubmit={(e) => handleLogin(e)}
      >
        <input
          className="w-full rounded-sm border border-gray-300 p-4 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-gray-300"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="w-full rounded-sm border border-gray-300 p-4 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-gray-300"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="w-full rounded-sm border border-gray-300 p-4 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-gray-300"
          type="submit"
        >
          Login
        </button>
      </form>
    </section>
  );
};

export default Landing;
