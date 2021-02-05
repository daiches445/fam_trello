import { React, Component } from 'react'
import CloseIcon from '@material-ui/icons/Close';
import { withRouter } from 'react-router-dom';
import { TextField, Grid } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';

class FCAddNote extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tite: '',
            context: '',
            usersTaged: '',
            usersVisibility:'hidden'
        }

    }

    Try=()=>{
this.state.usersVisibility === 'hidden' ? this.setState({usersVisibility:'visible'}) : this.setState({usersVisibility:'hidden'})
    }

    inputSelected=(e)=>{
        
     let userTagedString = this.state.usersTaged
     if(userTagedString.includes(e.target.id)){
        userTagedString = userTagedString.replace(e.target.id,'')
     }
     else
     userTagedString+= e.target.id + ' '
     this.setState({usersTaged:userTagedString})
    }
    render() {
        return (
            <div className='container' style={{ flexDirection: 'column', borderRadius: '60px', justifyContent: 'flex-start', backgroundColor: 'pink', width: '50vw', height: '70vh', position: 'absolute', left: '25%', display: 'flex' }}>
                <Grid style={{ justifyContent: 'center',height:'70%' }} container>
                    <Grid container >
                        <Grid item xs="11"><h2>Add Note</h2></Grid>
                        <Grid item>
                            <CloseIcon onClick={this.props.exitFunc} style={{}} fontSize='large' />
                        </Grid>

                    </Grid>

                    <Grid  container direction='column' style={{height:'100%',display:'flex',flexDirection:'column'}} >
                        <Grid  item>
                            <TextField  label="Title" />
                            
                        </Grid>
                        <Grid  item>
                            <TextField  label="Start Date" />
                            
                        </Grid>
                        <Grid  item>
                            <TextField  label="Due Date" />
                            
                        </Grid>
                    <div onClick={this.Try}>+</div>
                    <div>{this.state.usersTaged === '' ? "NO USERS TAGGED":this.state.usersTaged}</div>
                  <div  style={{visibility:this.state.usersVisibility}}>
                  <div style={{display:'flex',flexDirection:'row'}}>
                       <label htmlFor="">Ely</label>
                        <input onChange={this.inputSelected} type="checkbox" name="" id="Ely"/> 
                       </div>
                       <div style={{display:'flex',flexDirection:'row'}}>
                       <label htmlFor="">Nir</label>
                        <input onChange={this.inputSelected} type="checkbox" name="" id="Nir"/> 
                       </div>

                  </div>
                        <Grid xs="5" item>
                        <TextField 
                                id="outlined-multiline-static"
                                label="Description"
                                multiline
                                rows={4}
                                defaultValue="..."
                                variant="outlined"
                            />
                    </Grid>
                    
                </Grid>
                    </Grid>
           
        </div>
        )
    }
}

export default withRouter(FCAddNote)