import React from 'react'
import CloseIcon from '@material-ui/icons/Close';

import { TextField, Grid } from '@material-ui/core';
export default function FCAddNote(props) {
    return (
        <div style={{ flexDirection: 'column', borderRadius: '60px', justifyContent: 'flex-start', backgroundColor: 'pink', width: '50vw', height: '70vh', position: 'absolute', left: '25%', display: props.addNoteDisplay }}>
            <Grid style={{ justifyContent: 'center' }} container>
                <Grid container>
                    <Grid item xs="11"><h2>Add Note</h2></Grid>
                    <Grid item> 
                     <CloseIcon style={{ }} fontSize='large' />
                    </Grid>

                </Grid>

                <Grid container >
                    <Grid item>
                        <TextField label="zxc" />
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}
