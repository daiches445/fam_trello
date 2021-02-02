import {React,Component} from 'react'
import CloseIcon from '@material-ui/icons/Close';
import { withRouter } from 'react-router-dom';
import { TextField, Grid } from '@material-ui/core';
class FCAddNote extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            
        }
     
    }
    
    
    render() {
        return (
            <div className='container'  style={{ flexDirection: 'column', borderRadius: '60px', justifyContent: 'flex-start', backgroundColor: 'pink', width: '50vw', height: '70vh', position: 'absolute', left: '25%', display: 'flex' }}>
            <Grid  style={{ justifyContent: 'center' }} container>
                <Grid container>
                    <Grid item xs="11"><h2>Add Note</h2></Grid>
                    <Grid item> 
                     <CloseIcon onClick={this.props.exitFunc}  style={{ }} fontSize='large' />
                    </Grid>

                </Grid>

                <Grid container >
                    <Grid item>
                        <TextField label="zxc" />
                    </Grid>
                </Grid>
            </Grid>
            <input ref={this.some}/>
        </div>
        )
    }
}

export default withRouter(FCAddNote)