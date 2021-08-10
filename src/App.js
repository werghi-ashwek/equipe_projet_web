import React from 'react'
import Login from './Components/Login/Login'
import MainTemp from './Components/Login/MainTemp'
import { BrowserRouter as Switch, Route } from "react-router-dom";
import MainRouter from './Components/Template/MainRouter';
function App() {
  return (
    <div>
        <Switch>
            <Route path="/" exact render={(props) => <Login/>} />
            <Route path="/main"  render={(props) => <MainTemp/>} />
            </Switch>
    </div>
    
  )

}

export default App
