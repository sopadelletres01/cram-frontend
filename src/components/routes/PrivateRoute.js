import { useContext } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';

function PrivateRoute({ roleRestricted, ...props }) {
  const { isLoggedIn, loading, user } = useAuth();
  const navigate = useNavigate();

  // If the authentication is still loading ⏳
  if (loading) return <p>Loading ...</p>;

  // If the user is not logged in ❌
  if (!isLoggedIn) return navigate('/');

  // If the route is role-restricted and the user is not admin
  if (roleRestricted && !user.isAdmin) return navigate('/');

  // If the user is logged in ✅
  return props.children;
}

export default PrivateRoute;
