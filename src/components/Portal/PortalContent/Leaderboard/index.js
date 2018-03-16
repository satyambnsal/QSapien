import React, { Component } from 'react';
import { Card, List,Avatar} from 'antd';

class Leaderboard extends Component {
    state = {
        data: []
    }
    componentDidUpdate() {
        // if (this.props.publicContacts&&this.state.data.length===0) {
        //     this.setState({ data: this.props.publicContacts })
        // }
    }
    componentWillReceiveProps(props){
        if (props.publicContacts&&this.state.data.length===0) {
            this.setState({ data:props.publicContacts })
        }        
    }

    render() {
        console.log('leaderboard props',this.props.publicContacts);
        return (
            <Card title="Leaderboard" className='leaderboard-card'>
                <List
                    bordered
                    dataSource={this.state.data}
                    renderItem={item => (<List.Item>
                        <Avatar src={item.profile_image_url}/>{item.name}
                        </List.Item>)}
                />
            </Card>
        )
    }
}

export default Leaderboard;