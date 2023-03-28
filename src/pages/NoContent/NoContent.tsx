import SadFace from "../../assets/svg/sad-face.svg";

import "./NoContent.css";

const NoContent = () => {
  return (
    <div className="home-page">
      <h2 className="no-content-title">404 - Page not found</h2>
      <div className="no-content-container">
        <img src={SadFace} alt="sad face" className="sad-face" />
      </div>
    </div>
  );
};
export default NoContent;
