import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { withRouter } from 'react-router-dom';
import Switch from '@material-ui/core/Switch';
import '../App.css'

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
            this.setState({ got_fam: false, fam_crt_dsp: 'none',fam_det_dsp: "flex", })
        else
            this.setState({ got_fam: true, fam_crt_dsp: 'flex',fam_det_dsp: "none", })
    }
    render() {
        return (
            <div className="container">
                <h2>Register</h2>
                <TextField name="username" id="outlined-basic" label="User Name" variant="outlined" />
                <br />
                <TextField name="password" id="outlined-basic" type='Password' label="Password" variant="outlined" />
                <br />
                <TextField name="re_pass" id="outlined-basic" type='Password' label="ReEnter Password" variant="outlined" />
                <br />
                <div style={{display:'flex',flexDirection:'row',alignItems:'baseline' ,justifyContent:"space-between"}}>
                    <label htmlFor="">Create A family?</label>
                    <Switch
                        checked={this.state.got_fam}
                        onChange={this.GotFamiliy}
                        name="checkedA"
                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                    />

                </div>
                <div className="fam" style={{ display: this.state.fam_det_dsp,flexDirection:'column' }}>
                    <label htmlFor="">Enter Your family ID</label>
                    <TextField name="family_ID" id="outlined-basic" label="Family ID" variant="outlined" />
                    <br />
                </div>
                <div className="fam" style={{ display: this.state.fam_crt_dsp ,flexDirection:'column'}}>
                    <label htmlFor="">Create Your new family</label>
                    <TextField name="family_ID" id="outlined-basic" label="Family ID" variant="outlined" />
                    <br />
                    <TextField name="family_name" id="outlined-basic" label="Family name" variant="outlined" />
                </div>
                <Button>Register</Button>


            </div>
        )

    }


}
export default withRouter(Register)
