import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Movie from "./components/Movie";
import Detail from "./routes/Detail";
import Home from "./routes/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path={`${process.PUBLIC_URL}/movie/:id`}
          element={<Detail />}
        ></Route>
        <Route path={`${process.PUBLIC_URL}/`} element={<Home />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
