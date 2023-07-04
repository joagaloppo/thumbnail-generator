import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';

const useAuth = () => {
  const [cookies] = useCookies(['access_token']);
  const [isAuth, setIsAuth] = useState(!!cookies.access_token);

  useEffect(() => {
    setIsAuth(!!cookies.access_token);
  }, [cookies.access_token, cookies]);

  return isAuth;
};

export default useAuth;
