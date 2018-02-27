import React, { Component } from 'react';
import '../../stylesheets/style.css'
import TopHeader from './TopHeader';
import {connect} from 'react-redux';
import {unsetClient} from '../Client/actions';
 export default class Portal extends Component {
    constructor(props) {
        super(props);
        console.log("====props===="+this.props);        
    }

    render() {
        return (
            <TopHeader unsetClient={this.props.unsetClient}/>
        )
    }
}
// let mapStateToProps=(state)=>{
//     return {}
// }
// let mapDispathToProps=(dispatch)=>{
//     return{
//         unsetClient:()=>{
//             dispatch(unsetClient())
//         }
//     }
// }
// Portal=connect(mapStateToProps,mapDispathToProps)(Portal);
// export default Portal;