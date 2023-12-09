import './App.css';
import Navbar from "./components/Navbar";
import Home from "./Pages/Home";
import Share from "./Pages/Share";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar/>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/Share" component={Share} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;