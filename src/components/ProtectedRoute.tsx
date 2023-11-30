import { ReactNode, useEffect, useState } from 'react';
import useAuthStore from '../stores/auth';
import { useNavigate } from 'react-router-dom';

interface ProtectedRouteProps {
  noRedirect?: boolean;
  children: ReactNode;
}

export default function ProtectedRoute({ noRedirect = false, children }: ProtectedRouteProps)  {

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
        if(!noRedirect) {
          navigate("/login")
        }
      })
    }
    else {
      setIsLoading(false)
    }

  }, [isAuth])

  return <>
    {isLoading ? <p>ladataan...</p> : children}
  </>;
}