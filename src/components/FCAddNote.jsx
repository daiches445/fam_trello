import { React, Component } from 'react'
import CloseIcon from '@material-ui/icons/Close';
import { withRouter } from 'react-router-dom';
import { TextField, Grid } from '@material-ui/core';
class FCAddNote extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tite: '',
            context: '',
            usersTaged: ''
        }

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

                    <Grid container style={{display:'flex',flexDirection:'column'}} >
                        <Grid xs="2" item>
                            <TextField  label="Title" />
                            
                        </Grid>
                        <Grid xs="3" style={{height:"10%"}} item>
                            
                            
                        </Grid>
                        <Grid xs="5" item>
                        <TextField 
                                id="outlined-multiline-static"
                                label="Multiline"
                                multiline
                                rows={4}
                                defaultValue="Default Value"
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