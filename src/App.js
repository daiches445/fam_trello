import './App.css';
import Login_Page from './components/Login_Page';
import Register from './components/FCRegister'
import Board from './components/CCBoard';
import { Switch,Route } from 'react-router-dom'


function App() {
  return (
    <div className="App">
     <h1>FamTrello</h1>
      <div className ="app_container" > 
      
      <Switch>
        <Route exact path="/" render={()=><Login_Page></Login_Page>}></Route>
        <Route path = "/FCRegister" render={()=><Register></Register>}></Route>
      </Switch>
      </div>
    </div>
  );
}

export default App;
