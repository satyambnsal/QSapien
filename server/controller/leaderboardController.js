import User from '../models/User';
import logger from 'winston';
logger.level = 'debug';
const compareFunction = (userA, userB) => {
    logger.info('userA::',JSON.stringify(userA));
    logger.info('user B::',JSON.stringify(userB));
    if (userA.credit_points > userB.credit_points)
        return -1;
    else
        return 1;
}
exports.leaderboard_get = (req, res) => {
    let content = [];

    User.find({}).then(users => {
        let filteredUsers = users.map((result) => {
            let name = result.last_name ? (result.first_name + ' ' + result.last_name) : result.first_name;
            name = name.trim();
            return {
                _id: result._id,
                credit_points: result.credit_points,
                profile_image_url: result.profile_image_url,
                name
            }
        })
    return filteredUsers.sort(compareFunction);
    }).then(values => (values.map((value, index) => {
        let rank = index + 1;
        return { ...value, rank }
    }))).then(response => {
        console.log('response', response);
        res.status(200).json(response);
    }).catch(error => {
        logger.info('error occured while fetching leaderboard content');
        logger.debug('error occured::', error);
        res.status(500).json({ message: 'error occured while fetching leaderboard content' });
    })
}