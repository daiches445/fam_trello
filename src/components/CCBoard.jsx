import { Grid, IconButton, Paper } from '@material-ui/core';
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
                <Paper>
                    <Grid container direction='column' spacing=''>
                        <Grid container alignItems='center'> {/* top line ,add btn ,welcome user */}
                            <Grid item xs='3'>
                                <IconButton >
                                    <PostAddIcon color ='primary' fontSize ='large'></PostAddIcon>
                                </IconButton>
                            </Grid>
                            <Grid item xs='9' style={{alignSelf:'center'}}> welcome,user</Grid>
                        </Grid>
                        
                        <Grid container direction = 'row' > {/* second line ,tasks */}
                            <Grid item xs="3"> tasks</Grid>
                            <Grid container direction='row' xs = '9' style={{overflow:'hidden' ,flexWrap:'nowrap', minHeight:'min-content'}}> {/* tasks container*/}
                                {/*map function*/}
                                <Grid item xs='9'>task</Grid>
                                <Grid item xs='9'>task</Grid>
                                <Grid item xs='3'>task</Grid>
                                <Grid item xs='3'>task</Grid>
                                <Grid item xs='3'>task</Grid>
                                <Grid item xs='3'>task</Grid>
                                <Grid item xs='3'>task</Grid>
                                <Grid item xs='3'>task</Grid>
                                <Grid item xs='3'>task</Grid>
                            </Grid>
                        </Grid>
                        <Grid container direction = 'row'> {/* third line ,tasks */}
                            <Grid item xs="3"> my tasks</Grid>
                            <Grid container direction='row' xs = '9'> {/* tasks container*/}
                                {/*map function*/}
                                <Grid item xs='3'>my task</Grid>
                                <Grid item xs='3'>my task</Grid>
                                <Grid item xs='3'>my task</Grid>
                            </Grid>
                        </Grid>
                        <Grid container direction = 'row'> {/* forth line ,tasks */}
                            <Grid item xs="3">etc. tasks</Grid>
                            <Grid container direction='row' xs = '9'> {/* tasks container*/}
                                {/*map function*/}
                                <Grid item xs='3'>task</Grid>
                                <Grid item xs='3'>task</Grid>
                                <Grid item xs='3'>task</Grid>
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