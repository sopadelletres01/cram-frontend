import { useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';

function PrivateRoute({ roleRestricted, ...props }) {
  const { isLoggedIn, loading, user } = useAuth();
  const navigate = useNavigate();

  useEffect(()=>{
    // If the user is already logged in, redirect him to home page
      if (!isLoggedIn) navigate('/');
    // If the route is role-restricted and the user is not admin
      if (roleRestricted && !user.isAdmin) navigate('/');
    },[])



  // If the user is logged in ✅
  return props.children;
}

export default PrivateRoute;
