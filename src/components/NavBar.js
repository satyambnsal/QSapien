import React, { Component } from 'react';

class NavBar extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="container-fluid " id="first-container">
                <nav className="navbar navbar-inverse">
                    <div className="nav-header">
                        <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#mynavbar">
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                    </div>
                    <div className="collapse navbar-collapse" id="mynavbar">
                    <NavMenu links={this.props.links} />
                    </div>
                </nav>
            </div>
        )
    }
}

class NavMenu extends Component {
    render() {
        var links = this.props.links.map(function (link,i) {
            if (link.dropdown) {
                return (
                    <NavLinkDropdown links={link.links} text={link.text} active={link.active} index={i}/>
                );
            }
            else {
                return (
                    <NavLink linkTo={link.linkTo} text={link.text} active={link.active} index={i}/>
                );
            }
        });
        return (
            <ul className="nav navbar-nav navbar-right">
                {links}
            </ul>
        );
    }
}
class NavLinkDropdown extends Component {
    render() {
        var active = false;
        var links = this.props.links.map(function (link,i) {
            if (link.active) {
                active = true;
            }
            return (
                <NavLink linkTo={link.linkTo} text={link.text} active={link.active} index={i}/>
            );
        });
        return (
            <li className={"dropdown " + (active ? "active" : "")} key={this.props.index}>
                <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="dalse">
                    {this.props.text}
                </a>
                <ul className="dropdown-menu">
                    {links}
                </ul>
            </li>
        );
    }
};
class NavLink extends Component {
    render() {
        return (
            <li className={(this.props.active) ? "active" : ""} key={this.props.index}>
                <a href={this.props.linkTo}>{this.props.text}</a>
            </li>
        );
    };
}
export default NavBar;