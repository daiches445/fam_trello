import { React, Component } from 'react'
import CloseIcon from '@material-ui/icons/Close';
import { withRouter } from 'react-router-dom';
import { TextField, Grid, Paper } from '@material-ui/core';
import Button from '@material-ui/core/Button';



class FCAddNote extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tite: '',
            context: '',
            start_date: '',
            due_date: '',
            text: '',
            usersTaged: '',
            usersVisibility: 'hidden'
            , date: new Date()
        }
        this.DateObj = new Date()

    }

    Try = () => {
        this.state.usersVisibility === 'hidden' ? this.setState({ usersVisibility: 'visible' }) : this.setState({ usersVisibility: 'hidden' })
    }


    // componentDidMount(){
    //     let todaysDate = this.DateObj.getFullYear()+"-"+(this.DateObj.getMonth()+10)+"-"+(this.DateObj.getDay()+10)
    //     this.setState({date:todaysDate})
    // }
    inputSelected = (e) => {

        let userTagedString = this.state.usersTaged
        if (userTagedString.includes(e.target.id)) {
            userTagedString = userTagedString.replace(e.target.id, '')

        }
        else
            userTagedString += e.target.id + ' '
        this.setState({ usersTaged: userTagedString })
    }

    chgDtl = (e) => {
        switch (e.target.name) {
            case "title":
                this.setState({ title: e.target.value })
                break;
            case "start_date":
                this.setState({ start_date: e.target.value })
                break;
            case "due_date":
                this.setState({ due_date: e.target.value })
                break;
            case "text":
                this.setState({ text: e.target.value })
                break;
            default:
                break;
        }
    }
    handleClick = () => {
        this.props.sendNote(this.state)
        this.props.exitFunc()
    }
    render() {
        return (
            <div className='container-nir' style={{ borderRadius: '60px', justifyContent: 'flex-start', width: '50vw', height: '70vh', position: 'absolute', left: '25%', display: 'flex', marginTop: '1.5%' }}>
                <Paper elevation={3}>
                    <Grid container alignItems='center' spacing='12'  >
                        <Grid container >
                            <Grid item xs="11"><h2>Add Note</h2></Grid>
                            <Grid item xs = '1'>
                                <Button>
                                    <CloseIcon onClick={this.props.exitFunc} fontSize='large' />
                                </Button>
                                
                            </Grid>
                        </Grid>

                        <Grid container direction='column' spacing='1' >
                            <Grid item xs='12' align='center'>
                                <TextField onChange={this.chgDtl} name="title" />
                            </Grid>

                            <Grid item>
                                <TextField
                                    name="start_date"
                                    label="Start Date"
                                    type="date"
                                    defaultValue="0001-01-01" />
                                {console.log(this.state.date.getDay())}
                            </Grid>
                            <Grid item>
                                <TextField
                                    name="due_date"
                                    label="Due Date" type="date"
                                    defaultValue="0001-01-01" />

                            </Grid>
                            <div onClick={this.Try}>+</div>
                            <div>{this.state.usersTaged === '' ? "NO USERS TAGGED" : this.state.usersTaged}</div>
                            <div style={{ visibility: this.state.usersVisibility }}>
                                <div style={{ display: 'flex', flexDirection: 'row' }}>
                                    <label htmlFor="">Ely</label>
                                    <input onChange={this.inputSelected} type="checkbox" name="" id="Ely" />
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'row' }}>
                                    <label htmlFor="">Nir</label>
                                    <input onChange={this.inputSelected} type="checkbox" name="" id="Nir" />
                                </div>

                            </div>
                            <Grid xs="5" item>
                                <TextField
                                    name="text"
                                    id="outlined-multiline-static"
                                    label="Description"
                                    multiline
                                    rows={4}
                                    defaultValue="..."
                                    variant="outlined"
                                    onChange={this.chgDtl}
                                />
                            </Grid>

                        </Grid>

                        <Button onClick={this.handleClick} variant="contained">ADD NOTE</Button>
                    </Grid>
                </Paper>
            </div>
        )
    }
}

export default withRouter(FCAddNote)