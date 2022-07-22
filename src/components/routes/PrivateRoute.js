import { useContext } from 'react';
import { AuthContext } from './../context/auth.context';
import { useNavigate } from 'react-router';

function PrivateRoute(props) {
	const { isLoggedIn, loading } = useContext(AuthContext);
    const navigate = useNavigate()

	// If the authentication is still loading ⏳
	if (loading) return <p>Loading ...</p>;

	// If the user is not logged in ❌
	if (!isLoggedIn) return navigate("/");

	// If the user is logged in ✅
	return props.children;
}

export default PrivateRoute;
