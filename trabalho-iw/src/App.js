import './App.css';
import Navbar from "./components/Navbar";
import Home from "./Pages/Home";
import Share from "./Pages/Share";
import Recipes from "./Pages/Recipes";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar/>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/Share" component={Share} />
          <Route path="/Recipes" component={Recipes} />
          <Route path="/Signup" component={Signup} />
          <Route path="/Login" component={Login} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;