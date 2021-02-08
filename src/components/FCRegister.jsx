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
            l_name: '',
            family_ID: "",
            family_name: "",
            fam_det_dsp: "flex",
            fam_crt_dsp: 'none',
            create_family: false,
            error_username: '',
            error_pass: '',
            error_repass: '',
            error_f_name: '',
            error_fam_ID: ''
        }
    }

    GotFamiliy = (e) => {
        if (this.state.create_family)
            this.setState({ create_family: false, fam_crt_dsp: 'none', fam_det_dsp: "flex", })
        else
            this.setState({ create_family: true, fam_crt_dsp: 'flex', fam_det_dsp: "none", })
    }

    SetVAl = (e) => {
        let val = e.target.value;
        let name = e.target.name;
        console.log(e);
        switch (name) {
            case 'username':
                this.setState({ user_name: val ,error_username:''})
                break;
            case 'password':
                if (val.length < 4) {
                    this.setState({ error_pass: 'password to short' })
                }
                else
                    this.setState({ password: val, error_pass: '' })
                break;
            case 're_pass':
                this.setState({ re_pass: val })
                break;
            case 'f_name':
                this.setState({ f_name: val })
                break;
            case 'l_name':
                this.setState({ l_name: val })
                break;
            case 'family_ID':
                this.setState({ family_ID: val ,error_fam_ID:''})
                break;
            case 'family_name':
                this.setState({ family_name: val })
                break;

        }
    }

    Register = () => {
        if (this.state.password.length < 4)
            return

        if (this.state.password !== this.state.re_pass) {
            this.setState({ error_repass: 'passwords dont match' })
            return
        }
        else
            this.setState({ error_repass: '' })

        if (this.state.family_name === '') {
            this.setState({ error_f_name: 'must enter a name' })
            return
        }
        else
            this.setState({ error_f_name: '' })



        let currentFamily = this.props.app_data.family.find(fam => fam.ID === this.state.family_ID)
        let currentUser = this.props.app_data.users.find(user => user.username === this.state.user_name)

        if(currentUser === undefined){
            if(this.state.create_family){
                if(currentFamily === undefined){
                    let fam = {ID:this.state.family_ID,name:this.state.family_name}
                    this.props.AddFamily(fam)
                }
                else{
                    this.setState({error_fam_ID:'Taken!'})
                    return
                }
            }
            else{
                if(currentFamily === undefined){
                    this.setState({error_fam_ID:'Not found,start a new family or insert valid ID'})
                    return
                }
                else{}
            }
            
        }
        else
            this.setState({error_username:'invalid user name'})

    }

    render() {
        return (
            <div className="container">
                {console.log(this.state.got_fam)}
                <Paper>
                    <Grid container align = 'center' direction='column' spacing='3' alignItems='flex-start'>
                        <Grid item >
                            <h1>Register</h1></Grid>
                        <Grid item xs='6' alignItems='center'>
                            <TextField helperText={this.state.error_username} error={this.state.error_username} name="username" id="filled-basic" label="User Name" variant="outlined" onChange={this.SetVAl} />

                        </Grid>
                        <Divider></Divider>
                        <Grid item spacing='1'>
                            <Grid container spacing='1'>
                                <Grid item xs='6'>
                                    <TextField helperText={this.state.error_pass} error={this.state.error_pass} name="password" id="outlined-basic" type='Password' label="password" variant="outlined" onChange={this.SetVAl} /></Grid>
                                <Grid item xs='6'>
                                    <TextField helperText={this.state.error_repass} error={this.state.error_repass} name="re_pass" id="outlined-basic" type='Password' label="ReEnter Password" variant="outlined" onChange={this.SetVAl} />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Grid container spacing='1'>
                                <Grid item xs='6'>
                                    <TextField name="f_name" id="outlined-basic" label="Name" variant="outlined" onChange={this.SetVAl} />
                                </Grid>
                                <Grid item xs='6'>
                                    <TextField name="l_name" id="outlined-basic" label="Family name" variant="outlined" onChange={this.SetVAl} />
                                </Grid>
                            </Grid>
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
                        <Grid item style={{ display: this.state.fam_det_dsp, flexDirection: 'column' }}>
                            <Grid container>
                                <Grid item >
                                    <label htmlFor="">Enter Your family ID</label>
                                </Grid>
                                <Grid item >
                                    <TextField name="family_ID" id="outlined-basic" label="Family ID" variant="outlined" onChange={this.SetVAl} />
                                </Grid>
                            </Grid>

                        </Grid>
                        <Grid item style={{ display: this.state.fam_crt_dsp }}>
                            <Grid container spacing='1'>
                                <Grid item xs='12'>
                                    <label htmlFor="">Add Your Family</label>
                                </Grid>
                                <Grid item xs='5' style={{ display: this.state.fam_crt_dsp }}>
                                    <TextField error={this.state.error_fam_ID} name="family_ID" id="outlined-basic" label="Family ID" variant="outlined" helperText={'Suggested :' + this.state.l_name + ' etc.'} />
                                </Grid>
                                <Grid item xs='5'>
                                    <TextField name="family_name" id="outlined-basic" Value={this.state.f_name} label="Family name" variant="outlined" />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Divider></Divider>
                        <Grid item>
                            <Button onClick={this.Register} color='primary' style={{ marginBottom: '3vh' }}>Register</Button>
                        </Grid>
                        <Divider></Divider>

                    </Grid>
                </Paper>
            </div>
        )

    }


}
export default withRouter(Register)
