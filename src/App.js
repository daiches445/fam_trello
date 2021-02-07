import './App.css';
import Login_Page from './components/Login_Page';
import Register from './components/FCRegister'
import Board from './components/CCBoard';
import { Switch, Route, withRouter } from 'react-router-dom'
import { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      users: [
        { username: 'guy1', password: '1234', fam_id: 'COHEN121' },
        { username: 'guy2', password: '1234', fam_id: 'COHEN333' }
      ],
      family: [{
        ID: 'COHEN121',
        name: 'cohen',
        notes: [{ title: 'hello', text: 'asdad' },
        { title: 'hello2', text: 'asdad2' },
        { title: 'hello3', text: 'asdad3' },
        {
          title: 'hello4', text: 'asdad4'
        }
        ]
      }
      ]
    }
  }
  catchNoteToAdd = (note) => {
    let families = this.state.family
    let family = families[0]
    family.notes.push(note)
    families[0] = family
    console.log(family);
    this.setState({family:families})


  }
  catchUserToRegister = (user) => {
    let usersArray = this.state.users
    usersArray.push({ username: user.user_name, password: user.password, fam_id: user.family_ID })
    this.setState({ users: usersArray })
  }

  AddFamily = (fam)=>{
    let famArr = this.state.family;
    famArr.push({ID:fam.ID,name:fam.name,notes:[{title:'Welcome to FamTrello',text:'take out the trash!'}]})
    this.setState({family:famArr})
  }
  render(){
  return (
    <div className="app_container">
      <h1>FamTrello</h1>
      <Switch>
        <Route exact path="/"  render={()=><Login_Page data = {this.state}  ></Login_Page>}></Route>
        <Route path = "/FCRegister" render={()=><Register AddFamily={this.AddFamily} sendUserToRegister={this.catchUserToRegister} app_data = {this.state}></Register>}></Route>
        <Route path = '/CCBoard'  render={()=><Board family = {this.state.family[0]}></Board>}></Route>
      </Switch>

      </div>
    )
  }
}

export default withRouter(App);
