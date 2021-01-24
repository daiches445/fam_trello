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
            password: ""
        }
    }

    chgDtl = (e) => {
        switch (e.target.name) {
            case "username":
                this.setState({ username: e.target.value })
                break;
            case "password":
                this.setState({ password: e.target.value })
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
    render() {
        return (
            <div className='container'>
                <Paper elevation={3}>
                    <Grid container direction='column' spacing='2'>
                        <Grid item ><h2>Welcome to,<span>FamTrello</span></h2></Grid>
                        <Grid item xs='12'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut expedita quia eius modi in! Voluptatibus inventore non corporis numquam corrupti velit culpa porro possimus ratione animi commodi ducimus, ipsa et?</Grid>
                        <Grid item xs="6" spacing='1'>
                            <h3>Login</h3>
                        </Grid>
                        <Grid item sm="6" spacing="0" >
                            <TextField
                                id="outlined-basic"
                                label="Username"
                                variant="outlined"
                                name="Username" /></Grid>
                        <Grid item sm="6" spacing="1">
                            <TextField
                                id="outlined-basic"
                                label="Password"
                                variant="outlined"
                                name="password" />
                        </Grid>
                        <Grid container spacing ='10'>
                            <Grid item>
                                <Button color="primary">Sign in</Button>
                            </Grid>
                            <Grid item spacing='3'>
                                <Button>havent got a familiy yet?</Button>
                            </Grid>

                        </Grid>

                    </Grid>

                </Paper>

            </div>
        )
    }
}
export default withRouter(Login_Page)