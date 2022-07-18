import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <>
      <h1 className="bg-warning">Error 404: NotFound</h1>
    <Link to={"/"}>Click here to go to home...</Link>
    </>
  );
};

export default NotFound;