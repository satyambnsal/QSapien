import User from '../models/User';
import Token from '../models/Token';
import logger from 'winston';

exports.confirm_account = (req, res) => {
    Token.findOne({ token: req.query.code }, function (err, token) {
        if (!token) {
            logger.info('unable to find valid token');
            res.status(400).send({ type: 'not-verified', msg: 'We were unable to find a valid token. Your token my have expired.' });
        }

        User.findOne({ _id: token.userId }, function (err, user) {
            if (!user) {
                logger.info('unable to find valid user for provided token');
                res.status(400).send({ msg: 'We were unable to find a user for this token.' });
            }
            if (user.isVerified) {
                logger.info('This user has already been verified');
                res.status(400).send({ type: 'already-verified', msg: 'This user has already been verified.' });
            }
            else{
                user.isVerified = true;
                user.save(function (err) {
                    if (err) {
                        logger.info('error occured while updating user activation status');
                        res.status(500).send({ msg: err.message });
                    }
                    else{
                        logger.info('user account has been verified successfully');
                        res.status(200).send("The account has been verified. Please log in.");
                    }
                });
            }
        });
    });
}