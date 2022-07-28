import { useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';
import { useGlobalState } from '../context/GlobalContext';

function PrivateRoute({ roleRestricted, ...props }) {
  const { isLoggedIn, loading, user } = useAuth();
  const { setError } = useGlobalState();
  const navigate = useNavigate();

  useEffect(()=>{
    // If the user is already logged in, redirect him to home page
    try{
      if (!isLoggedIn) navigate('/login');
      // If the route is role-restricted and the user is not admin
      if (roleRestricted && !user?.isAdmin) navigate('/user');
    }catch(e) {
      setError(e);
    }
    },[])



  // If the user is logged in ✅
  return props.children;
}

export default PrivateRoute;
