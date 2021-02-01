import './App.css';
import Login_Page from './components/Login_Page';
import Register from './components/FCRegister'
import Board from './components/CCBoard';
import { Switch,Route, withRouter } from 'react-router-dom'
import { Component } from 'react';

class App extends Component() {
  constructor(props) {
    super(props)
    this.state = {
       users:[
        {username:'guy1',password:'1234',fam_id:'COHEN121'},
        {username:'guy2',password:'1234',fam_id:'COHEN333'}
       ],
       family:[{
        ID:'COHEN121',
        name:'cohen',
        notes:[{title:'hello',text:'asdad'}]
          }
       ]
    }
  }
  

  render(){
  return (
    <div className="app_container">
      <h1>FamTrello</h1>
      <Switch>
        <Route exact path="/" render={()=><Login_Page data = {this.state}  ></Login_Page>}></Route>
        <Route path = "/FCRegister" render={()=><Register users = {this.state.users}></Register>}></Route>
        <Route path = '/CCBoard' render={()=><Board></Board>}></Route>
      </Switch>

    </div>
  )
 }
}

export default withRouter(App);
