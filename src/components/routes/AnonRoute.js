import { useContext } from 'react';
import { AuthContext } from './../context/auth.context';
import { useNavigate } from 'react-router';

function AnonRoute(props) {
  const { isLoggedIn, loading } = useAuth();
  const navigate = useNavigate();
  // If the authentication is still loading ⏳
  if (loading) return <p>Loading ...</p>;

  // If the user is already logged in, redirect him to home page
  if (isLoggedIn) return navigate('/');

  // If the user is not logged in yet, allow him to see the page
  return props.children;
}

export default AnonRoute;
