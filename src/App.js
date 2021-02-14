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
      user_index: 0,
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
          { title: 'hello1',created:'1-2-2020', text: 'asdad1',tagged:[{uesrname:'avi2',name:"avi"}]},
          { title: 'hello2',created:'1-2-2020', text: 'asdad2',tagged:[{uesrname:'avi2',name:"avi"}]},
          { title: 'hello3',created:'1-2-2020', text: 'asdad3',tagged:[{uesrname:'guy1',name:"guy"}]},
          { title: 'hello4',created:'1-2-2020', text: 'asdad4',tagged:[{uesrname:'guy1',name:"guy"}]}
        ],
        finished_notes:[ { title: 'hello' ,created:'1-2-2020', text: 'asdad1',tagged:[{username:'guy1'}]}]
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
    usersArray.push({ username: user.user_name,name:user.name, password: user.password, fam_id: user.fam_id })
    this.setState({ users: usersArray })
  }

  AddFamily = (fam)=>{
    let famArr = this.state.family;
    famArr.push({
      ID:fam.ID,
      name:fam.name,
      members:fam.members,
      notes:[{title:'Welcome to FamTrello',text:'take out the trash!',tagged:[fam.members[0].username]}]})

    this.setState({family:famArr})
  }

 catchNoteToDelete=(note)=>{
   console.log(note);
  let families = this.state.family
  let family = families[this.state.fam_index]
  family.notes = family.notes.filter(singleNote=>singleNote.created != note.created)
  families[this.state.fam_index] = family
  console.log(family);
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
    console.log(note.id)
    let noteIndex = family.notes.map((noteTemp,index)=>noteTemp.created === note.id ? index : "" )
    noteIndex = noteIndex.filter(note1=>note1 !== "")
    
    console.log(noteIndex)
    family.notes[noteIndex[0]] = note
    
    families[this.state.fam_index] = family
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
        <Route path = '/CCBoard'  render={()=><Board deleteTask = {this.catchNoteToDelete} editNote={this.catchNoteToEdit} sendNote = {this.catchNoteToAdd} data = {this.state} InitUserNotes = {this.InitUserNotes}></Board>}></Route>
      </Switch>
        </div>
      </div>
    )
  }
}

export default withRouter(App);
