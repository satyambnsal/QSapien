import React, { Component } from 'react';
import { Card, List, Avatar} from 'antd';

class Leaderboard extends Component {
    state = {
        data: []
    }
    componentWillMount() {
        this.setState({ data: this.props.leaderboard })
    }
    componentWillReceiveProps(props) {
        if (props.leaderboard && this.state.data.length === 0) {
            this.setState({ data: props.leaderboard })
        }
    }

    render() {
        return (
            <Card title="Leaderboard" className='leaderboard-card'>
                <List
                    bordered
                    dataSource={this.state.data}
                    renderItem={item => (<List.Item className='leaderboard-user'>
                        <div className='user-rank'>
                            {item.rank}
                        </div>
                        <div className='user-profile'>
                            <Avatar src={item.profile_image_url} />
                        </div>
                        <div className='user-name'>
                            {item.name}
                        </div>
                        <div className='credit-points'>
                            {item.credit_points}
                        </div>
                    </List.Item>
                    )}
                />
            </Card>
        )
    }
}

export default Leaderboard;