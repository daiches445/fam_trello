import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import { Paper } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { withRouter } from 'react-router-dom';



class Login_Page extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: "",
            password: "",
            error_username: "",
            error_password: "",
        }

    }

    chgDtl = (e) => {
        switch (e.target.name) {
            case "username":
                this.setState({ username: e.target.value,error_username:'' })
                break;
            case "password":
                this.setState({ password: e.target.value ,error_password:''})
                break;
            default:
                break;
        }

    }
    handleClick = async (c) => {
        await console.log(c.target.id)
        switch (c.target.id) {
            case "btn-login":
                alert(this.state.username)
                break;

            default:
                break;
        }
    }
    signInClick = () => {
        let currentUser = this.props.data.users.find(user => user.username === this.state.username)
        if (currentUser === undefined) {
            this.setState({error_username:'Invalid username'})
        }
        else if(currentUser.password === this.state.password){
            this.props.SetCurrentUser(currentUser)
            this.props.history.push('/CCBoard')
        }
        else
            this.setState({error_password:'incorrect password'})

    }
    render() {
        return (
            <div className='container'>
                <Paper style={{ width: '30%' }}>
                    <Grid container direction='column' spacing='3' alignItems='center'>
                        <Grid item xs={9}><h2>Welcome to,<span> FamTrello&emsp;</span> </h2></Grid>
                        <Grid item xs='12'><p >Hi,There! welcome to FamTrello.</p></Grid>
                        <Grid item xs='7' justify='center'>
                            <Grid container direction='column' justify="center" alignItems='center' spacing='1'>
                                <Grid item xs="12" >
                                    <h3 style={{ fontSize: '3ch' }}>Login</h3>
                                </Grid>
                                <Grid item xs='12' spacing="0" >
                                    <TextField
                                        onChange={this.chgDtl}
                                        id="outlined-basic"
                                        label="Username"
                                        variant="outlined"
                                        name="username"
                                        error={this.state.error_username}
                                        helperText ={this.state.error_username} />
                                </Grid>
                                <Grid item xs='12' spacing="1">
                                    <TextField
                                        onChange={this.chgDtl}
                                        id="outlined-basic"
                                        label="Password"
                                        type='Password'
                                        variant="outlined"
                                        name="password"
                                        error={this.state.error_password} 
                                        helperText ={this.state.error_password}/>
                                </Grid>
                            </Grid>
                            <Grid item xs='12'>
                                <Grid container direction = 'column' justify="center" alignItems='center' spacing='4' >
                                    <Grid item >
                                        <Button onClick={this.signInClick} variant='contained' color="primary">Sign in</Button>
                                    </Grid>
                                    <Grid item >
                                        <Button onClick={() => this.props.history.push('/FCRegister')}>havent got a familiy yet?</Button>
                                    </Grid>
                                </Grid>
                            </Grid>

                        </Grid>



                    </Grid>

                </Paper>

            </div>
        )
    }
}
export default withRouter(Login_Page)