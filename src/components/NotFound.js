import { Link } from "react-router-dom";
import Error404 from "./svgs/Error404";
import notFound from "./notFound.scss"
const NotFound = () => {  
  
  return (
    <>
      <Link
        to="/home"
      >
        <div class="containerError">
          <div class="row">
            <div class="col-sm-12 col-md-12 mt-5 mb-5">
              <Error404/>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default NotFound;
