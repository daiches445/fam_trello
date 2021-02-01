import { Box, Grid, GridList, GridListTile, GridListTileBar, IconButton, Paper, Divider } from '@material-ui/core';
import PostAddIcon from '@material-ui/icons/PostAdd';
import React, { Component } from 'react'


export default class Board extends Component {
    constructor(props) {
        super(props)

        this.state = {
            Families: [{ familyName: 'TATCHER', familyTickets: [{ title: 'throw garbage', description: 'throw the garbage kfar hassidim', memberTaged: [] }], familyMembers: [{ memberId: 111, name: 'nir' }, { memberId: 222, name: 'naama' }, { memberId: 333, name: 'amir' }] },
            { familyName: 'DAICHES', familyTickets: [{ title: 'throw garbage', description: 'throw the garbage givat ada', memberTaged: [] }], familyMembers: [{ memberId: 444, name: 'ely' }, { memberId: 555, name: 'ella' }, { memberId: 666, name: 'tal' }] }
            ],
            currentFamily: 'DAICHES',
            currentMember: 'tal'


        }
    }

    render() {
        return (
            <div className='container'>
                <Paper className='board'>
                    <Grid container direction='column' spacing='' >
                        <Grid container alignItems='center'> {/* top line ,add btn ,welcome user */}
                            <Grid item xs='2'>
                                <IconButton >
                                    <PostAddIcon color='primary' style={{ fontSize: '50' }}></PostAddIcon>
                                </IconButton>
                            </Grid>
                            <Grid item xs='9' style={{ alignSelf: 'center' }}> <h1>welcome,user1</h1></Grid>
                        </Grid>

                        <Grid container direction='row' > {/* second line ,tasks */}
                            <Grid item xs="2"><h2>tasks</h2></Grid>
                            <Grid item xs='9'>

                                <div className='tasks_bar' >
                                    { console.log(this.props)}
                                    {
                                   
                                    this.props.family.notes.map((note, index) => 
                                        
                                        <li className='task'><h3>{note.title}</h3>{note.text}</li>

                                    )}
                                    {/* <li className='task'><h3>title</h3>task</li>
                                    <li className='task'><h3>title</h3>task</li>
                                    <li className='task'><h3>title</h3>task</li>
                                    <li className='task'><h3>title</h3>task</li>
                                    <li className='task'><h3>title</h3>task</li>
                                    <li className='task'><h3>title</h3>task</li>
                                    <li className='task'><h3>title</h3>task</li>
                                    <li className='task'><h3>title</h3>task</li> */}
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
                        <Grid container direction='row'> {/* forth line ,tasks */}
                            <Grid item xs="2"><h2>etc. tasks</h2></Grid>
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

            </div>
        )
    }
}
{/* <p>Current member: {this.state.currentMember} - {this.state.currentFamily}</p>
<p>Family Tickets: {this.state.currentFamily}</p>
<div>{this.state.Families.find(family=>family.familyName === this.state.currentFamily).familyTickets === undefined ? 'NO FAMILY':
this.state.Families.find(family=>family.familyName === this.state.currentFamily).familyTickets.map((ticket,index)=><p>{index} - {ticket.title}</p>)}</div> */}