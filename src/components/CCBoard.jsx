import { Grid, IconButton, Paper, Divider, Button } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import PostAddIcon from '@material-ui/icons/PostAdd';
import React, { Component } from 'react'
import FCAddNote from './FCAddNote';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AlertDialog from './AlertDialog'
import AlertDialogSlide from './AlertDialog';
import FCAddNoteDialog from './AddNoteDialog'
import EditAlertDialog from './EditAlertDialog'


export default class Board extends Component {
    constructor(props) {
        super(props)

        this.state = {
            currentFamily: this.props.data.family[this.props.data.fam_index],
            currentMember: this.props.data.users[this.props.data.user_index],
            user_notes: this.props.InitUserNotes,
            addNoteDisplay: '',
            options: [
                'Delete',
                // 'Info',
            ],
            anchorEl: '',
            open: false,
            currentTasksID: '',
            finishedTaskID: '',
            board_z_index: 0,
            btnDisabled: true

        }


        var ITEM_HEIGHT = 48;
        this.taskRef = React.createRef();
    }

    GetUserNotes = (notes) => {
        console.log(notes)
        let user_notes = [];
        notes.forEach(note => {
            note.tagged.forEach(t => {
                if (t.username === this.state.currentMember.username)
                    user_notes.push(note)
            })
        });
        return user_notes;
    }

    getNoteToAdd = (note) => {
        this.props.sendNote(note)
    }

    getNoteToEdit = (note) => {
        this.props.editNote(note)
    }

    openOrCloseAddNote = () => {
        this.state.addNoteDisplay === '' ? this.setState({ addNoteDisplay: <FCAddNoteDialog members={this.state.currentFamily.members} sendNote={this.getNoteToAdd} exitFunc={this.openOrCloseAddNote} />, board_z_index: -1 }) : this.setState({ addNoteDisplay: '', board_z_index: 0 })
    }

    setAnchorEl = (data) => {
        this.setState({ anchorEl: data })
    }

    handleClick = (event) => {
        let btnDis;
        if (event.target.id === 'history') {
            btnDis = true
        }
        else
            btnDis = false

        this.setAnchorEl(event.currentTarget);
        console.log(event.target.dataset.index);
        let index = this.state.currentFamily.notes.findIndex(n => n.created == event.target.id)
        this.setState({ currentTasksID: event.target.id, open: !this.state.open, currentTaskIndex: index, btnDisabled: btnDis, finishedTaskID: event.target.dataset.index })

    };

    handleClose = (e) => {

        this.setAnchorEl(null);
        let index = this.state.currentFamily.notes.findIndex(n => n.created == this.state.currentTasksID)
        console.log(index);
        console.log(this.state.currentTasksID);
        console.log(e.target.innerText);

        if (e.target.innerText === 'DELETE') {

            this.props.deleteTask(index)
        }
        this.setState({ open: false })
    }

    GetInfo = () => {

        // if(this.state.finishedTaskID !== undefined){
        //    console.log("fin")
        //     return(<AlertDialog handleClose={() => this.setState({ open: false })} name="Info" info={this.state.currentFamily.finished_notes[this.state.finishedTaskID]}></AlertDialog> ) 
        // }
        // else
        //     return (<AlertDialog handleClose={() => this.setState({ open: false })} name="Info" info={ this.state.currentFamily.notes[this.state.currentTaskIndex] === undefined ? "" : this.state.currentFamily.notes[this.state.currentTaskIndex]}></AlertDialog>  )

    }

    render() {
        return (
            <div className='container' >

                <Paper style={{ zIndex: this.state.board_z_index }}>
                    <Grid container direction='column' spacing={7} >

                        <Grid item style={{paddingBottom:'0px'}} >
                            <Grid container className='border_bottom'>

                                <Grid item xs='2' justify='center' align='center'>

                                    <FCAddNoteDialog members={this.state.currentFamily.members} sendNote={this.getNoteToAdd} exitFunc={this.openOrCloseAddNote} />
                                </Grid>
                                <Grid item xs='9' style={{ alignSelf: 'center', margin: '0px' }}>
                                    <h1 style={{ alignSelf: 'center', margin: '0px', borderLeft: '2px solid black', paddingLeft: '1%' }}>welcome, {this.state.currentMember.username}</h1></Grid>
                            </Grid>
                        </Grid>

                        <Grid item xs={12}>
                            <Grid container direction='row' >
                                <Grid item xs="2" align='center'><h2>my notes</h2></Grid>
                                <Grid container direction='row' xs='10' style={{ borderLeft: 'solid black 1px',overflowY:'hidden' }}>
                                    <div className='tasks_bar' >
                                        {(this.GetUserNotes(this.state.currentFamily.notes)).map((n, index) =>
                                            <li key={index} className='task'>
                                                <Grid container >
                                                    <Grid item xs={11}><h3 id={n.title} style={{ borderBottom: 'solid black 1px',overflowY:'hidden' }} >{n.title}</h3></Grid>
                                                    <Grid item xs={1}>
                                                        <IconButton
                                                            className='info_dots_btn'
                                                            aria-label="more"
                                                            aria-controls="long-menu"
                                                            aria-haspopup="true">
                                                            <MoreVertIcon id={n.created} onClick={this.handleClick} />
                                                        </IconButton>
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <p className='text'>{n.text}</p>
                                                    </Grid>
                                                    <Grid item>
                                                        <Grid container alignItems='center' spacing={1}>
                                                            <Grid item xs={11} >
                                                                <p className="h2_font">{n.tagged.map((user, index) => index === 0 ? user.name : ', ' + user.name )}</p>
                                                            </Grid>
                                                            <Grid item xs={1}>
                                                                <Button onClick={() => this.props.moveNoteToFinished(this.state.currentTaskIndex !== undefined ? this.state.currentTaskIndex : 0)}>
                                                                    <CheckIcon style={{color:'#3ab3ea'}}></CheckIcon>
                                                                </Button>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>

                                            </li>
                                        )}

                                        <Menu
                                            id="long-menu"
                                            anchorEl={this.state.anchorEl}
                                            keepMounted
                                            open={this.state.open}
                                            onClose={this.handleClose}
                                            PaperProps={{
                                                style: {
                                                    maxHeight: this.ITEM_HEIGHT * 4.5,
                                                    width: '20ch',
                                                },
                                            }}>
                                            <MenuItem>
                                                <Button disabled={this.state.btnDisabled} color="primary" id='delete' onClick={this.handleClose} >delete</Button>
                                            </MenuItem>
                                            <MenuItem>
                                                {this.state.finishedTaskID === undefined ? <AlertDialog handleClose={() => this.setState({ open: false })} name="Info" info={this.state.currentFamily.notes[this.state.currentTaskIndex] === undefined ? "" : this.state.currentFamily.notes[this.state.currentTaskIndex]}></AlertDialog>


                                                    : <AlertDialog handleClose={() => this.setState({ open: false })} name="Info" info={this.state.currentFamily.finished_notes[this.state.finishedTaskID] === undefined ? '' : this.state.currentFamily.finished_notes[this.state.finishedTaskID]}></AlertDialog>}
                                            </MenuItem>
                                            <MenuItem>
                                                <EditAlertDialog disabled1={this.state.btnDisabled} note={this.state.currentFamily.notes[this.state.currentTaskIndex !== undefined ? this.state.currentTaskIndex : 0]} sendNote={this.getNoteToAdd} getNoteToEdit1={this.getNoteToEdit} exitFunc={this.openOrCloseAddNote} family={this.state.currentFamily} />
                                            </MenuItem>
                                        </Menu>
                                    </div>
                                </Grid>
                            </Grid>
                        </Grid>


                        <Divider></Divider>

                        <Grid item xs={12} >
                            <Grid container direction='row' > {/* third line ,tasks */}
                                <Grid item xs="2" align='center'><h2>family notes</h2></Grid>
                                <Grid container direction='row' xs='10' style={{ borderLeft: 'solid black 1px' }}> {/* tasks container*/}
                                    {/*map function*/}
                                    <div className='tasks_bar' >
                                        {this.state.currentFamily.notes.map((n, index) => {
                                            return (
                                                <li key={index} className='task'>
                                                    <Grid container >
                                                        <Grid item xs={10}><h3 id={n.title} style={{ borderBottom: 'solid black 1px' }} >{n.title}</h3></Grid>
                                                        <Grid item xs={2}>
                                                            <IconButton
                                                                className='info_dots_btn'
                                                                aria-label="more"
                                                                aria-controls="long-menu"
                                                                aria-haspopup="true">
                                                                <MoreVertIcon id={n.created} onClick={this.handleClick} />
                                                            </IconButton>
                                                        </Grid>
                                                        <Grid item xs={12}>
                                                        <p className='text'>{n.text}</p>
                                                    </Grid>
                                                    <Grid item>
                                                        <Grid container alignItems='center' spacing={1}>
                                                            <Grid item xs={11} >
                                                                <p className="h2_font">{n.tagged.map((user, index) => index === 0 ? user.name : ', ' + user.name)}</p>
                                                            </Grid>
                                                            <Grid item xs={1}>
                                                                <Button onClick={() => this.props.moveNoteToFinished(this.state.currentTaskIndex !== undefined ? this.state.currentTaskIndex : 0)}>
                                                                    <CheckIcon style={{color:'#3ab3ea'}}></CheckIcon>
                                                                </Button>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>

                                                </li>)
                                        })}
                                    </div>
                                </Grid>
                            </Grid>
                        </Grid>



                        <Divider></Divider>

                        <Grid item xs={12} style={{marginBottom:'3%'}}>
                            <Grid container direction='row'>
                                <Grid item xs="2" align='center'><h2>history</h2></Grid>
                                <Grid container direction='row' xs='9' style={{ borderLeft: 'solid black 1px' }} > {/* tasks container*/}
                                    <div className='tasks_bar' >
                                        {this.state.currentFamily.finished_notes.map((n, index) => {

                                            return (
                                                <li key={index} className='task'>
                                                    <Grid container >
                                                        <Grid item xs={10}><h3 id={n.title} style={{ borderBottom: 'solid black 1px' }} >{n.title}</h3></Grid>
                                                        <Grid item xs={2}>
                                                            <IconButton
                                                                className='info_dots_btn'
                                                                aria-label="more"
                                                                aria-controls="long-menu"
                                                                aria-haspopup="true">
                                                                <MoreVertIcon id="history" data-index={index} onClick={this.handleClick} />
                                                            </IconButton>
                                                        </Grid>
                                                        <Grid item xs={12}>
                                                            <p className='text' style={{ padding: '1px' }}>{n.text}</p>
                                                        </Grid>
                                                        <Grid item>
                                                            <p>{n.tagged.map(user => user.name)}</p>
                                                        </Grid>
                                                    </Grid>

                                                </li>)
                                        })}
                                    </div>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Divider></Divider>


                    </Grid>
                </Paper>

            </div >
        )
    }
}
