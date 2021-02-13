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
      data:'',
      users: [
        { username: 'guy1', password: '1234', fam_id: 'COHEN121' },
        { username: 'guy2', password: '1234', fam_id: 'COHEN121' }
      ],
      family: [{
        ID: 'COHEN121',
        name: 'cohen',

        notes: [
          { id:0, title: 'hello', text: 'asdad'},
          {id:1, title: 'hello2', text: 'asdad2'},
          {id:2,title: 'hello3', text: 'asdad3'},
          {id:3, title: 'hello4', text: 'asdad4'}
        ]
      }
      ]
    }
  }
  catchNoteToAdd = (note) => {
    let families = this.state.family
    let family = families[0]
    note.id = family.notes[family.notes.length-1].id+1
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
 catchNoteToDelete=(note)=>{
  let families = this.state.family
  let family = families[0]
  family.notes = family.notes.filter(singleNote=>singleNote.title != note.title)
  families[0] = family
  console.log(family);
  this.setState({family:families})
  }

  SetCurrentUser=(user)=>{
    let data = {user:user,family:this.state.family.find( f => f.ID === user.fam_id)}
    console.log(data);
    this.setState({data:data})
  }


  catchNoteToEdit=(note)=>{
    let families = this.state.family
    let family = families[0]
    console.log(note.id)
    let noteIndex = family.notes.map((noteTemp,index)=>noteTemp.id === note.id ? index : "" )
    noteIndex = noteIndex.filter(note1=>note1 !== "")
    
    console.log(noteIndex)
    family.notes[noteIndex[0]] = note
    
    families[0] = family
    console.log(family);
    this.setState({family:families})

  }


  render(){
  return (
    <div style={{width:'100%',height:'100%'}}>
      <header>
         <h1>FamTrello</h1>
      </header>
        <div className="app_container">
      <Switch>
        <Route exact path="/"  render={()=><Login_Page data = {this.state}  SetCurrentUser={this.SetCurrentUser}></Login_Page>}></Route>
        <Route path = "/FCRegister" render={()=><Register AddFamily={this.AddFamily} sendUserToRegister={this.catchUserToRegister} app_data = {this.state}></Register>}></Route>
        <Route path = '/CCBoard'  render={()=><Board deleteTask = {this.catchNoteToDelete} editNote={this.catchNoteToEdit} sendNote = {this.catchNoteToAdd} data = {this.state.data} ></Board>}></Route>
      </Switch>
        </div>
      </div>
    )
  }
}

export default withRouter(App);
