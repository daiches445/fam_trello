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
      fam_index: 0,
      user_index: undefined,
      users: [
        { username: 'guy1',name:'guy the first' ,age:'18', password: '1234', fam_id: 'COHEN121' },
        { username: 'avi2',name :'avi' ,age:'17', password: '1234', fam_id: 'COHEN121' }
      ],
      family: [{
        ID: 'COHEN121',
        name: 'Cohen',
        members:[
          {username:'guy1',name:'guy',age:'13',role:'son'},
          {username:'avi2',name:'avi',age:'18',role:'son'}
        ],
        //we can just go over family and check name not username whats the odds families will have 2 persons with the same name?
        notes: [
          { title: 'Wash the dishes',created:'1-2-2020', text: 'wah the dishes please!',tagged:[{username:'avi2',name:"avi"}]},
          { title: 'Cut the grass',created:'2-2-2020', text: 'Cut the grass please guys',tagged:[{username:'avi2',name:"avi"},{username:'guy1',name:"avi"}]},
          { title: 'Clean your room',created:'3-2-2020', text: 'clean your room!',tagged:[{username:'guy1',name:"guy"}]},
          { title: 'Fix the gutters!',created:'4-2-2020', text: 'urgent!',tagged:[{username:'guy1',name:"guy"}]}
        ],
        finished_notes:[ { title: 'hello' ,created:'1-2-2020', text: 'Take the dog for a walk',tagged:[{username:'guy1',name:"guy"}]}]
      }
      ]
    }
  }

  catchNoteToAdd = (note) => {
    let families = this.state.family
    let family = families[this.state.fam_index]
    family.notes.push(note)
    families[this.state.fam_index] = family
    console.log(family);
    this.setState({family:families})
    console.log(this.state.family[0].notes)

  }

  catchUserToRegister = (user) => {
    let usersArray = this.state.users
    let family = this.state.family
    
    let famIndex = this.state.family.findIndex(fam=>fam.ID === user.fam_id)
    family[famIndex].members.push(user)
    usersArray.push({ username: user.username,name:user.name, password: user.password, fam_id: user.fam_id })
   
    this.setState({ users: usersArray ,family:family})
  }

  AddFamily = (fam)=>{
    let famArr = this.state.family;
    famArr.push({
      ID:fam.ID,
      name:fam.name,
      members:[],
      notes:[{title:'Welcome to FamTrello',text:'take out the trash!',tagged:[fam.members[0].username]}]
      ,finished_notes:[]
    })
     
    this.setState({family:famArr})
  }

 catchNoteToDelete=(index)=>{

    let families = this.state.family
    let current_family = families[this.state.fam_index]
    current_family.notes.splice(index,1)
    console.log(current_family);
    families[this.state.fam_index] = current_family
    this.setState({family:families})

  }

  SetCurrentUser=(user)=>{
    let user_index = this.state.users.findIndex(u => u.username === user.username)
    let fam_index = this.state.family.findIndex( f=> f.ID === this.state.users[user_index].fam_id)
    console.log(this.state.users[user_index]);

    this.setState({user_index:user_index,fam_index:fam_index})

  }

  InitUserNotes=()=>{
    console.log(this.state);
    let user_notes = this.state.data.family.notes
    return user_notes;
  }

  catchNoteToEdit=(note)=>{
    let families = this.state.family
    let family = families[this.state.fam_index]
    console.log(note)
    let noteIndex = family.notes.findIndex(n=>n.created === note.created)
    // noteIndex = noteIndex.filter(note1=>note1 !== "")
    
    console.log(noteIndex)
    family.notes[noteIndex] = note
    
    families[this.state.fam_index] = family
    console.log(family);
    this.setState({family:families})

  }

  catchFinishedNote=(index)=>{
    let families = this.state.family
    let family = this.state.family[this.state.fam_index]
    console.log(families[this.state.fam_index])

      family.finished_notes.push(family.notes.splice(index,1)[0])
      families[this.state.fam_index] = family
      console.log(families[this.state.fam_index])
      this.setState({family:families})

  }

  LogOut=()=>{
    this.setState({user_index:undefined})
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
        <Route path = '/CCBoard'  render={()=><Board Logout={this.LogOut} moveNoteToFinished={this.catchFinishedNote} deleteTask = {this.catchNoteToDelete} editNote={this.catchNoteToEdit} sendNote = {this.catchNoteToAdd} data = {this.state} InitUserNotes = {this.InitUserNotes}></Board>}></Route>
      </Switch>
        </div>
      </div>
    )
  }
}

export default withRouter(App);
