import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import SadFace from "../../assets/svg/sad-face.svg";
import { PageRoutes } from "../../types/pageRoutes";

import "./NoContent.css";

const NoContent = ({ redirect }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (redirect) navigate(PageRoutes.NO_CONTENT);
  }, [redirect]);

  return (
    <div className="home-page">
      <h2 className="no-content-title">404 - Page not found</h2>
      <div className="no-content-container" >
        <img src={SadFace} alt="sad face" className="sad-face" />
      </div>
    </div>
  );
};
export default NoContent;
