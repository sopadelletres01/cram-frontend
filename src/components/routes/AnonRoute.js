import { useNavigate } from 'react-router';
import { useGlobalState } from '../context/GlobalContext';
import { useAuth } from '../context/AuthContext';

function AnonRoute(props) {
  const { isLoggedIn } = useAuth();
  const { loading } = useGlobalState();
  const navigate = useNavigate();
  // If the authentication is still loading ⏳
  if (loading) return <p>Loading ...</p>;

  // If the user is already logged in, redirect him to home page
  if (isLoggedIn) return navigate('/');

  // If the user is not logged in yet, allow him to see the page
  return props.children;
}


export default AnonRoute;
