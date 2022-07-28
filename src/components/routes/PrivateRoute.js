import { useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';
import { useGlobalState } from '../context/GlobalContext';

function PrivateRoute({ roleRestricted, ...props }) {
  const { isLoggedIn, loading, user, isAdmin } = useAuth();
  const { setError } = useGlobalState();
  const navigate = useNavigate();

  useEffect(()=>{
    // If the user is already logged in, redirect him to home page
    try{
      if (!isLoggedIn) return navigate('/login');
      // Rolerestricted route
      if(roleRestricted){
        // User logged in but is not admin
        if(!isAdmin) return navigate('/home')
      }
    }catch(e) {
      setError(e);
    }
    },[])



  // If the user is logged in ✅
  return props.children;
}

export default PrivateRoute;
