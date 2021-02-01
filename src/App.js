import './App.css';
import Login_Page from './components/Login_Page';
import Register from './components/FCRegister'
import Board from './components/CCBoard';
import { Switch,Route, withRouter } from 'react-router-dom'

function App() {
  return (
    <div className="app_container">
      <h1>FamTrello</h1>
      <Switch>
        <Route exact path="/" render={()=><Login_Page></Login_Page>}></Route>
        <Route path = "/FCRegister" render={()=><Register></Register>}></Route>
        <Route path = '/CCBoard' render={()=><Board></Board>}></Route>
      </Switch>

    </div>
  );
}

export default withRouter(App);
