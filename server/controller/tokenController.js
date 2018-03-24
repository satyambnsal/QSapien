import User from '../models/User';
import Token from '../models/Token';
import logger from 'winston';
import crypto from 'crypto';
import sendEmail from '../utils/mailHandler';
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
            else {
                user.isVerified = true;
                user.save(function (err) {
                    if (err) {
                        logger.info('error occured while updating user activation status');
                        res.status(500).send({ msg: err.message });
                    }
                    else {
                        logger.info('user account has been verified successfully');
                        res.status(200).send("The account has been verified. Please log in.");
                    }
                });
            }
        });
    });
}
exports.resend_token_post = (req, res) => {
    console.log('request body::',req.body)
    if (req.body.email_id) {
        User.findOne({ email_id: req.body.email_id }, (err, user) => {
            if (err) {
                logger.info('error occured while fetching user details from email id');
                res.status(500).json({ success: false, message: 'error occured while fetching user details from email id' })
            }
            else if (!user) {
                logger.info('user with specified email id does not exist');
                res.status(404).json({ success: false, message: 'user with specified email id does not exist' });
            }
            else if (user.isVerified == true) {
                logger.info('user with specified email id is already verified');
                res.status(409).json({ success: false, message: 'user with specified email id is already verified' });
            }
            else {
                const confirm_token = new Token({ userId: user._id, token: crypto.randomBytes(16).toString('hex') });
                confirm_token.save((err, token_save_result) => {
                    if (err) {
                        logger.info('error occured while saving confirmation token');
                        res.status(500).json({ message: 'error occured while saving confirmation token' });
                    }
                    else {
                        sendEmail(req, token_save_result.token, (err, result) => {
                            if (err) {
                                logger.info('error occured while sending account activation email');
                                res.status(500).json({ success: false, message: 'error occured while sending activation mail.contact administrator' });
                            }
                            else {
                                logger.info('account activation email sent successfully');
                                res.status(200).json({ success: true, message: 'account verification mail has been sent successfully' });
                            }
                        });

                    }
                })
            }
        })
    }
    else {
        logger.info('email id is required to resend account activation token');
        res.status(400).json({ success: false, message: 'email id is required to resend account activation token' });
    }
}