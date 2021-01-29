import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { withRouter } from 'react-router-dom';
import Switch from '@material-ui/core/Switch';
import '../App.css'
import { Divider, Grid, Paper } from '@material-ui/core';

class Register extends Component {

    constructor(props) {
        super(props)

        this.state = {
            user_name: "",
            password: "",
            re_pass: "",
            family_ID: "",
            family_name: "",
            fam_det_dsp: "flex",
            fam_crt_dsp: 'none',
            got_fam: false

        }
    }

    GotFamiliy = (e) => {
        if (this.state.got_fam)
            this.setState({ got_fam: false, fam_crt_dsp: 'none', fam_det_dsp: "flex", })
        else
            this.setState({ got_fam: true, fam_crt_dsp: 'flex', fam_det_dsp: "none", })
    }
    render() {
        return (
            <div className="container">
                <Paper>

                    <Grid container direction='column' spacing='3' alignItems='center'>
                        <Grid item >
                            <h1>Register</h1></Grid>
                        <Grid item>
                            <TextField name="username" id="outlined-basic" label="User Name" variant="outlined" /></Grid>
                        <Grid item>
                            <TextField name="password" id="outlined-basic" type='Password' label="Password" variant="outlined" /></Grid>
                        <Grid item>
                            <TextField name="re_pass" id="outlined-basic" type='Password' label="ReEnter Password" variant="outlined" />
                        </Grid>

                        <Grid item>
                            <Grid container  >
                                <Grid item xs='9' style={{ padding: '10px' }}>
                                    <label htmlFor="">Create A family?</label>
                                </Grid>
                                <Grid item xs='3' >
                                    <Switch

                                        checked={this.state.got_fam}
                                        onChange={this.GotFamiliy}
                                        name="checkedA"
                                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item className="fam" style={{ display: this.state.fam_det_dsp, flexDirection: 'column' }}>
                            <label htmlFor="">Enter Your family ID</label>
                            <TextField name="family_ID" id="outlined-basic" label="Family ID" variant="outlined" />
                            <br />
                        </Grid>
                        <Grid item className="fam" style={{ display: this.state.fam_crt_dsp, flexDirection: 'column' }}>
                            <label htmlFor="">Create Your new family</label>
                            <TextField name="family_ID" id="outlined-basic" label="Family ID" variant="outlined" />
                            <br />
                            <TextField name="family_name" id="outlined-basic" label="Family name" variant="outlined" />
                        </Grid>
                        <Divider></Divider>
                        <Grid item>
                            <Button color='primary' style={{ marginBottom: '3vh' }}>Register</Button>
                        </Grid>
                        <Divider></Divider>

                    </Grid>
                </Paper>
            </div>
        )

    }


}
export default withRouter(Register)
