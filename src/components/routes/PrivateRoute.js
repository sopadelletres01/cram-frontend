import { useContext } from 'react';
import { AuthContext } from './../context/auth.context';
import { useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';

function PrivateRoute(props) {
  const { isLoggedIn, loading } = useAuth();
  const navigate = useNavigate();

  // If the authentication is still loading ⏳
  if (loading) return <p>Loading ...</p>;

  // If the user is not logged in ❌
  if (!isLoggedIn) return navigate('/');

  // If the user is logged in ✅
  return props.children;
}

export default PrivateRoute;
