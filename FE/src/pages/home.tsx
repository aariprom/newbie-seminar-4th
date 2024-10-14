import React from "react";
import { useNavigate }  from "react-router-dom";
import "./css/home.css";

const HomePage = (props: {}) => {
    
    const navigate = useNavigate();

    return (
      <div className={"home"}>
        <div className={"link-wrapper"}>
          <div className={"link-options"}>
            <div className={"page-link"} onClick={ () => navigate("/arithmetic") }>
              <div className={"page-subtitle"}>Do simple calculation</div>
              <div className={"page-title"}>Arithmetics</div>
            </div>
          </div>
        </div>
      </div>
    )
  };
  
  export default HomePage;