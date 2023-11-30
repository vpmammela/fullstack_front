import { ReactNode, useEffect, useState } from 'react';
import useAuthStore from '../stores/auth';
import { useNavigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {

  const { account, isAuth } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate()

  useEffect(() => {

    if(!isAuth) {
      account().then(() => {
        console.log("Kirjautuminen voimassa")
        setIsLoading(false)
      }).catch(() => {
        setIsLoading(false)
        navigate("/login")
      })
    }
    else {
      setIsLoading(false)
    }

  }, [])

  return <>
    {isLoading ? <p>ladataan...</p> : children}
  </>;
}