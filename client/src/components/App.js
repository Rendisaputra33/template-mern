import React, { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Index from "./home/home";
import About from "./about/about";
import Login from "./RegisterLogin/index";

function App() {
  const [greet, setGreet] = useState("");

  useEffect(() => {
    axios
      .get("/api/hello")
      .then((res) => setGreet(res.data.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <Router>
      <div>
        {greet}
        <Switch>
          <Route path="/" exact={true} component={Index} />
          <Route path="/about" component={About} />
          <Route path="/login" component={Login} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
