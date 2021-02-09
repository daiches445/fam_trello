import { Box, Grid, GridList, GridListTile, GridListTileBar, IconButton, Paper, Divider, Button } from '@material-ui/core';
import PostAddIcon from '@material-ui/icons/PostAdd';
import React, { Component } from 'react'
import FCAddNote from './FCAddNote';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AlertDialog from './AlertDialog'
import AlertDialogSlide from './AlertDialog';
export default class Board extends Component {
    constructor(props) {
        super(props)

        this.state = {
            Families: [{ familyName: 'TATCHER', familyTickets: [{ title: 'throw garbage', description: 'throw the garbage kfar hassidim', memberTaged: [] }], familyMembers: [{ memberId: 111, name: 'nir' }, { memberId: 222, name: 'naama' }, { memberId: 333, name: 'amir' }] },
            { familyName: 'DAICHES', familyTickets: [{ title: 'throw garbage', description: 'throw the garbage givat ada', memberTaged: [] }], familyMembers: [{ memberId: 444, name: 'ely' }, { memberId: 555, name: 'ella' }, { memberId: 666, name: 'tal' }] }
            ],
            currentFamily: 'DAICHES',
            currentMember: 'tal1',
            addNoteDisplay: '',
            options: [
                'Edit',
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
    getNoteToAdd = (note) => {
        this.props.sendNote(note)
    }
    openOrCloseAddNote = () => {
        this.state.addNoteDisplay === '' ? this.setState({ addNoteDisplay: <FCAddNote sendNote={this.getNoteToAdd} exitFunc={this.openOrCloseAddNote} />, board_z_index: -1 }) : this.setState({ addNoteDisplay: '', board_z_index: 0 })
    }

    setAnchorEl = (data) => {
        this.setState({ anchorEl: data })

    }

    handleClick = async (event) => {
        this.setAnchorEl(event.currentTarget);
        console.log(event);
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
                this.props.deleteTask(this.props.family.notes[this.state.currentTasksIndex])
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
                {this.state.addNoteDisplay}
                <Paper style={{ zIndex: this.state.board_z_index }}>

                    <Grid container direction='column' spacing='' >
                        <Grid container alignItems='center'>
                            <Grid item xs='2'>
                                <IconButton onClick={this.openOrCloseAddNote} >
                                    <PostAddIcon color='primary' style={{ fontSize: '100' }}></PostAddIcon>
                                </IconButton>
                            </Grid>
                            <Grid item xs='9' style={{ alignSelf: 'center', margin: '0px' }}> <h1 style={{ alignSelf: 'center', margin: '0px' }}>welcome,{this.state.currentMember}</h1></Grid>
                        </Grid>

                        <Grid container direction='row' >
                            <Grid item xs="2"><h2>tasks</h2></Grid>
                            <Grid container direction='row' xs='9'>
                                <div className='tasks_bar' >
                                    {
                                        this.props.family.notes.length === 0 ? "NO TASKS":
                                        this.props.family.notes.map((note, index) => (
                                            <li className='task'>
                                                <Grid container >
                                                    <Grid item xs={10}><h3 id={note.title} >{note.title}</h3>
                                                    </Grid>
                                                    <Grid item xs={2}>
                                                        <IconButton
                                                            className='info_dots_btn'
                                                            aria-label="more"
                                                            aria-controls="long-menu"
                                                            aria-haspopup="true"

                                                        >
                                                            <MoreVertIcon id={index}
                                                                onClick={this.handleClick} />
                                                        </IconButton>
                                                    </Grid>
                                                </Grid>
                                                <p style={{ padding: '1px' }}>{note.text}</p>
                                                <Button>aa</Button>
                                            </li>
                                        )

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
                                            <AlertDialog handleClose = {()=>this.setState({open:false})} name="Info" info={this.props.family.notes[this.state.currentTasksIndex] === undefined ? "" : this.props.family.notes[this.state.currentTasksIndex]}></AlertDialog>
                                        </MenuItem>
                                    </Menu>
                                </div>
                            </Grid>
                        </Grid>
                        <Divider></Divider>

                        <Grid container direction='row'> {/* third line ,tasks */}
                            <Grid item xs="2"><h2>my tasks</h2></Grid>
                            <Grid container direction='row' xs='9'> {/* tasks container*/}
                                {/*map function*/}
                                <div className='tasks_bar' >
                                    <li className='task'><h3>title</h3>task</li>
                                    <li className='task'><h3>title</h3>task</li>
                                    <li className='task'><h3>title</h3>task</li>
                                    <li className='task'><h3>title</h3>task</li>
                                    <li className='task'><h3>title</h3>task</li>
                                    <li className='task'><h3>title</h3>task</li>
                                    <li className='task'><h3>title</h3>task</li>
                                    <li className='task'><h3>title</h3>task</li>
                                </div>
                            </Grid>
                        </Grid>
                        <Grid container direction='row'>
                            <Grid item xs="2"><h2>finished tasks</h2></Grid>
                            <Grid container direction='row' xs='9'> {/* tasks container*/}
                                {/*map function*/}
                                <div className='tasks_bar' >
                                    <li className='task'>task</li>
                                    <li className='task'>task</li>

                                </div>
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