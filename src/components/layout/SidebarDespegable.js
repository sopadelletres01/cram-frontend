import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";

function SidebarDespegable({ show, setShow }) {
  const domeNode = useRef();
//   const [sidebarClicked, setSidebarClicked] = useState(false);
//   const btn = document.getElementById("showSidebarBtn");
//   const updateState = (event) => {
//     console.log("updateState");
//     //   console.log(event.target)
//     if (buttonClicked) {
//       setShow(!show);
//       return;
//     }
//     if (domeNode.current.contains(event.target)) {
//       setSidebarClicked(true);
//       return;
//     } else {
//       setSidebarClicked(false);
//       setShow(!show);
//     }
//   };
//   useEffect(() => {
//     document.addEventListener("mousedown", updateState);
//     return () => {
//       document.removeEventListener("mousedown", updateState);
//     };
//   }, []);
  return (
    <>
        <div className={`sidebar ${show ? 'active' : ''}`} ref={domeNode}>
          <Link className="sidebar__link" to="/user/profile">
            <FaUser />
            <span>Profile</span>
          </Link>
          {/* link que abrace a un emoticotono narajna  y a las letras */}
        </div>
    </>
  );
}

export default SidebarDespegable;
