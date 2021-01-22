import React, { Component } from 'react'
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
                <h2>login</h2>
                <TextField name="username" onChange={this.chgDtl} id="outlined-basic" label="User Name" variant="outlined" />
                <br />
                <TextField name="password" id="outlined-basic" type='Password' label="Password" variant="outlined" />
                <br />
                <Button name="btn-login" id="btn-login" onClick={() => { alert(this.state.username) }} variant="contained" color="primary">LOGIN</Button>
                <br />
                <Button variant="contained" color="primary" onClick={() => { this.props.history.push('/FCRegister') }}>Regiester</Button>
            </div>
        )
    }
}
export default withRouter(Login_Page)