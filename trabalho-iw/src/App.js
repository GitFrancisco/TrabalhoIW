import './App.css';
import Navbar from "./components/Navbar";
import Home from "./Pages/Home";
import Share from "./Pages/Share";
import Recipes from "./Pages/Recipes";
import AdminDashboard from "./Pages/AdminDashboard";
import about from "./Pages/about";
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
          <Route path="/Dashboard" component={AdminDashboard} />
          <Route path="/about" component={about} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;