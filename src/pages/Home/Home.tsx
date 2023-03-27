import { Link } from "react-router-dom";

import TicTacToeImg from "../../assets/img/Tic Tac Toe.png";
import TimeMachineImg from "../../assets/img/Time Machine.png";
import { PageRoutes } from "../../types/pageRoutes";

import "./Home.css";

const Home = () => {
  return (
    <main className="home-page">
      <div className="container">
        <div className="home-title">
          <h2>Time Traveler Games</h2>
        </div>
        <div className="home-content">
          <Link to={PageRoutes.TIMEMACHINE} className="game-container scale">
            <h3 className="game-title">Time Machine</h3>
            <img className="game-img" src={TimeMachineImg} alt="time machine" />
          </Link>
          <Link to={PageRoutes.TICTACTOE} className="game-container scale">
            <h3 className="game-title">Tic Tac Toe</h3>
            <img className="game-img" src={TicTacToeImg} alt="tic tac toe" />
          </Link>
        </div>
      </div>
    </main>
  );
};
export default Home;
