import { Grid, IconButton, Paper, Divider, Button } from '@material-ui/core';
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
            currentTasksIndex: 0,
            board_z_index: 0

        }


        var ITEM_HEIGHT = 48;
        this.taskRef = React.createRef();
    }

    GetUserNotes = (notes) => {
        let user_notes = [];
        notes.forEach(note => {
            if (note.tagged.includes(this.state.currentMember.username))
                user_notes.push(note)
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

    handleClick = async (event) => {
        this.setAnchorEl(event.currentTarget);
        this.setState({ open: !this.state.open })
        await this.setState({ currentTasksIndex: event.target.id })

        console.log(this.state.currentTasksIndex);
    };

    handleClose = (e) => {
        console.log(e.target.title)
        console.log(this.taskRef.current);
        this.setAnchorEl(null);
        this.setState({ open: false, currentTasksIndex: 0 })

        switch (e.target.id) {
            case 'Delete':
                this.props.deleteTask(this.state.currentFamily.notes[this.state.currentTasksIndex])
                break;
            case 'Info':

                break;
            default:
                break;
        }

    }


    render() {
        return (
            <div className='container' >
                {console.log(this.state.currentFamily)}
                <Paper style={{ zIndex: this.state.board_z_index }}>
                    <Grid container direction='column' spacing={3}>

                        <Grid item >
                            <Grid container className='border_bottom'>

                                <Grid item xs='2' justify='center' align='center'>

                                    <FCAddNoteDialog members={this.state.currentFamily.members} sendNote={this.getNoteToAdd} exitFunc={this.openOrCloseAddNote} />
                                </Grid>
                                <Grid item xs='9' style={{ alignSelf: 'center', margin: '0px' }}>
                                    <h1 style={{ alignSelf: 'center', margin: '0px', borderLeft: '2px solid black', paddingLeft: '1%' }}>welcome</h1></Grid>
                            </Grid>
                        </Grid>

                        <Grid item xs={12}>
                            <Grid container direction='row' >
                                <Grid item xs="2" align='center'><h2>my notes</h2></Grid>
                                <Grid container direction='row' xs='9'>
                                    <div className='tasks_bar' >
                                        {console.log(this.state.currentFamily)}
                                        {this.state.currentFamily.notes.forEach((n,index)=>{
                                           n.tagged.map((u)=>{
                                              
                                           })
                                        })}
                                        {this.state.currentFamily.notes.map((n, index) =>
                                            n.tagged.includes(this.state.currentFamily.username) === false ? "" :
                                                <li key={index} className='task'>

                                                    <Grid container >
                                                        <Grid item xs={10}>
                                                            <h3 id={n.title} >{n.title}</h3>
                                                        </Grid>
                                                        <Grid item xs={2}>
                                                            <IconButton
                                                                className='info_dots_btn'
                                                                aria-label="more"
                                                                aria-controls="long-menu"
                                                                aria-haspopup="true">
                                                                <MoreVertIcon id={index} onClick={this.handleClick} />
                                                            </IconButton>
                                                        </Grid>
                                                        <Grid item className='text'>
                                                            <p style={{ backgroundColor: 'red', color: 'red' }} style={{ padding: '1px' }}>{n.text}</p>
                                                        </Grid>
                                                    </Grid>

                                                </li>
                                        )


                                        }
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
                                            }}
                                        >
                                            {this.state.options.map((option) => (
                                                <MenuItem key={option} id={option} onClick={this.handleClose}>

                                                    {option}
                                                </MenuItem>

                                            ))}
                                            <MenuItem>
                                                <AlertDialog handleClose={() => this.setState({ open: false })} name="Info" info={this.state.currentFamily.notes[this.state.currentTasksIndex] === undefined ? "" : this.state.currentFamily.notes[this.state.currentTasksIndex]}></AlertDialog>
                                            </MenuItem>
                                            <MenuItem>
                                                <EditAlertDialog note={this.state.currentFamily.notes[this.state.currentTasksIndex]} sendNote={this.getNoteToAdd} getNoteToEdit1={this.getNoteToEdit} exitFunc={this.openOrCloseAddNote} family={this.state.currentFamily} />
                                            </MenuItem>
                                        </Menu>
                                    </div>
                                </Grid>
                            </Grid>
                        </Grid>


                        <Divider></Divider>

                        <Grid item xs={12}>
                            <Grid container direction='row' > {/* third line ,tasks */}
                                <Grid item xs="2" align='center'><h2>family notes</h2></Grid>
                                <Grid container direction='row' xs='9'> {/* tasks container*/}
                                    {/*map function*/}
                                    <div className='tasks_bar' >
                                        {this.state.currentFamily.notes.map((n, index) => {
                                            return (
                                                <li key={index} className='task'>
                                                    <Grid container >
                                                        <Grid item xs={10}><h3 id={n.title} >{n.title}</h3></Grid>
                                                        <Grid item xs={2}>
                                                            <IconButton
                                                                className='info_dots_btn'
                                                                aria-label="more"
                                                                aria-controls="long-menu"
                                                                aria-haspopup="true">
                                                                <MoreVertIcon id={index} onClick={this.handleClick} />
                                                            </IconButton>
                                                        </Grid>
                                                        <Grid item>
                                                            <p className='text' style={{ padding: '1px' }}>{n.text}</p>
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

                        <Grid item xs={12}>
                            <Grid container direction='row'>
                                <Grid item xs="2" align='center'><h2>history</h2></Grid>
                                <Grid container direction='row' xs='9'> {/* tasks container*/}
                                    {/*map function*/}
                                    <div className='tasks_bar' >
                                        <li className='task'>task</li>
                                        <li className='task'>task</li>
                                    </div>
                                </Grid>
                            </Grid>
                        </Grid>


                    </Grid>
                </Paper>

            </div >
        )
    }
}
{/* <p>Current member: {this.state.currentMember} - {this.state.currentFamily}</p>
<p>Family Tickets: {this.state.currentFamily}</p>
<div>{this.state.Families.find(family=>family.familyName === this.state.currentFamily).familyTickets === undefined ? 'NO FAMILY':
this.state.Families.find(family=>family.familyName === this.state.currentFamily).familyTickets.map((ticket,index)=><p>{index} - {ticket.title}</p>)}</div> */}