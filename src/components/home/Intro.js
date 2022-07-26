import React from "react";
import Waves from "../svgs/Waves";

function Intro() {
  return (
    <div className="introWrapper">
        <div className="introText">
            <h1>
                Cram Events
            </h1>
            <p>
                Gestiona tus eventos y promueve el comercio local accediendo a grandes promociones
            </p>
        </div>
        <Waves/>
    </div>
  );
}

export default Intro;
