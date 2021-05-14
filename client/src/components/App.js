import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Index from "./home/home";
import About from "./about/about";

function App() {
  return (
    <Router>
      <div>
        <Link to="/about">About</Link>
        <Switch>
          <Route path="/about" component={About} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
