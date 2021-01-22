import React, { Component } from 'react'

export default class Board extends Component {
    constructor(props) {
        super(props)

        this.state = {
            Families: [{ familyName: 'TATCHER', familyTickets: [{ title: 'throw garbage', description: 'throw the garbage kfar hassidim', memberTaged: [] }], familyMembers: [{ memberId: 111, name: 'nir' }, { memberId: 222, name: 'naama' }, { memberId: 333, name: 'amir' }] },
            { familyName: 'DAICHES', familyTickets: [{ title: 'throw garbage', description: 'throw the garbage givat ada', memberTaged: [] }], familyMembers: [{ memberId: 444, name: 'ely' }, { memberId: 555, name: 'ella' }, { memberId: 666, name: 'tal' }] }
            ],
            currentFamily:'DAICHES',
            currentMember:'tal'
            

        }
    }

    render() {
        return (
            <div>
                <p>Current member: {this.state.currentMember} - {this.state.currentFamily}</p>
                <p>Family Tickets: {this.state.currentFamily}</p>
                <div>{this.state.Families.find(family=>family.familyName === this.state.currentFamily).familyTickets === undefined ? 'NO FAMILY':
                this.state.Families.find(family=>family.familyName === this.state.currentFamily).familyTickets.map((ticket,index)=><p>{index} - {ticket.title}</p>)}</div>
            </div>
        )
    }
}
