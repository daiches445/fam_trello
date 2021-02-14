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
            name: '',
            family_ID: "",
            family_name: "",

            fam_det_dsp: "flex",
            fam_crt_dsp: 'none',
            create_family: false,

            error_username: '',
            error_pass: '',
            error_repass: '',
            error_name: '',
            error_family_name:'',
            error_fam_ID: '',
            form_disabled:true
        }
    }

    GotFamiliy = (e) => {
        if (this.state.create_family)
            this.setState({ create_family: false, fam_crt_dsp: 'none', fam_det_dsp: "flex", error_fam_ID:''})
        else
            this.setState({ create_family: true, fam_crt_dsp: 'flex', fam_det_dsp: "none", error_fam_ID:''})
    }

    SetVAl = (e) => {
        let val = e.target.value;
        let name = e.target.name;
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
            case 'name':
                this.setState({ name: val })
                break;
            case 'family_name':
                this.setState({ family_name: val })
                break;
            case 'family_ID':
                this.setState({ family_ID: val ,error_fam_ID:''})
                break;


        }
        this.EnableForm()
    }

    EnableForm = ()=>{
        let fields_arr = [this.state.family_ID,this.state.family_name,this.state.name,this.state.password,this.state.re_pass,this.state.user_name]
        if(fields_arr.findIndex((e) => e === '' ) !== -1)
            return;
        this.setState({form_disabled:false})
    }

    Register = () => {

        if(this.state.user_name.length < 2){
            this.setState({error_username:'invalid user'})
            return
        }

        if (this.state.password.length < 4){
            this.setState({error_pass:'must enter a pass'})
            return
        }
            

        if (this.state.password !== this.state.re_pass) {
            this.setState({ error_repass: 'passwords dont match' })
            return
        }
        else
            this.setState({ error_repass: '' })

        if (this.state.family_name === '') {
            this.setState({ error_family_name: 'must enter a name' })
            return
        }
        else
            this.setState({ error_family_name: '' })



        let currentFamily = this.props.app_data.family.find(fam => fam.ID === this.state.family_ID)
        let currentUser = this.props.app_data.users.find(user => user.username === this.state.user_name)

        if(currentUser === undefined){
            let user = {username: this.state.user_name,name:this.state.name, password: this.state.password, fam_id: this.state.family_ID }
            if(this.state.create_family){
                if(currentFamily === undefined){
                    let fam = {ID:this.state.family_ID, name:this.state.family_name,members:[{username:this.state.user_name,name:this.state.name}]}
                    this.props.AddFamily(fam)
                    this.props.sendUserToRegister(user)
                    alert('Hi,'+this.state.name+' Welcome to the family.' )
                    this.props.history.push('/')
                }
                else{
                    this.setState({error_fam_ID:'Taken!'})
                    return
                }
            }
            else{
                if(currentFamily === undefined){
                    this.setState({error_fam_ID:'start a new family or insert valid ID'})
                    return
                }
                else{
                    alert('Hi,'+this.state.name+' Welcome to the family.' )
                    this.props.sendUserToRegister(user)
                    this.props.history.push('/')


                }
            }
            
        }
        else
            this.setState({error_username:'invalid user name'})

    }



    render() {
        
        return (
            <div className="container">
                <Paper elevation='6' style={{width:'30%'}}>
                    <Grid container  direction='column' spacing='3' alignItems='center'>
                        <Grid item >
                            <h2 style={{fontSize:'4ch'}}>Register</h2></Grid>
                        <Grid item xs='12'>
                            <TextField required  helperText={this.state.error_username} error={this.state.error_username} name="username" id="filled-basic" label="User Name" variant="outlined" onChange={this.SetVAl} />
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
                                    <TextField error={this.state.e} name="name" id="outlined-basic" label="Name" variant="outlined" onChange={this.SetVAl} />
                                </Grid>
                                <Grid item xs='6'>
                                    <TextField name="family_name" id="outlined-basic" label="Family name" variant="outlined" onChange={this.SetVAl} />
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item xs = '12'>
                            <Grid container direction='row' alignItems='center' >
                                <Grid item style={{ padding: '10px' }}>
                                    <h2 htmlFor="">Create A family?</h2>
                                </Grid>
                                <Grid item xs = '2'>
                                    <Switch
                                        checked={this.state.got_fam}
                                        onChange={this.GotFamiliy}
                                        name="checkedA"
                                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs='12' style={{ display: this.state.fam_det_dsp, flexDirection: 'column' }}>
                            <Grid container direction='column' alignItems='center' spacing ='2'>
                                <Grid item >
                                    <label htmlFor="">Enter Your family ID</label>
                                </Grid>
                                <Grid item >
                                    <TextField error={this.state.error_fam_ID} helperText={this.state.error_fam_ID} name="family_ID"  id="outlined-basic" label="Family ID" variant="outlined" onChange={this.SetVAl} />
                                </Grid>
                            </Grid>

                        </Grid>
                        <Grid item  style={{ display: this.state.fam_crt_dsp }}>
                            <Grid container direction = 'row' alignContent='center' justify="center" spacing ='2'>
                                <Grid item align='center' justify='center' xs='12'>
                                    <label htmlFor="">Add Your Family</label>
                                </Grid>
                                <Grid item >
                                    <TextField  error={this.state.error_fam_ID} name="family_ID" id="outlined-basic" label="Family ID" variant="outlined" helperText={this.state.error_fam_ID === ''?'Suggested :' +' \' ' + this.state.family_name +'\'+' + ' some number.':this.state.error_fam_ID} onChange={this.SetVAl}/>
                                </Grid>
                                <Grid item>
                                    <TextField noWarp defaultValue={this.state.family_name} Value={this.state.family_name} name="famCreate_fam_name" id="outlined-basic"  label="Family name" variant="outlined" onChange={this.SetVAl}/>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Divider></Divider>
                        <Grid item>
                            <Button disabled = {this.state.form_disabled} onClick={this.Register} color='primary' style={{ marginBottom: '3vh' }}>Register</Button>
                        </Grid>
                        <Divider></Divider>

                    </Grid>
                </Paper>
            </div>
        )

    }


}
export default withRouter(Register)
