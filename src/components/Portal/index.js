import React, { Component } from 'react';
import '../../stylesheets/style.css'
import TopHeader from './TopHeader';
export default class Portal extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <TopHeader />
        )
    }
}