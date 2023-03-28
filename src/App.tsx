import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import NoContent from "./pages/NoContent/NoContent";
import TicTacToe from "./pages/TicTacToe/TicTacToe";
import TimeMachine from "./pages/TimeMachine/TimeMachine";
import { PageRoutes } from "./types/pageRoutes";

import "./App.css";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path={PageRoutes.HOME}
          element={<Home />}
          errorElement={<NoContent />}
        />
        <Route path={PageRoutes.TIMEMACHINE} element={<TimeMachine />} />
        <Route path={PageRoutes.TICTACTOE} element={<TicTacToe />} />
        <Route path={PageRoutes.NO_CONTENT} element={<NoContent />} />
        <Route path="*" element={<NoContent />} />
      </Routes>
    </Router>
  );
};

export default App;
