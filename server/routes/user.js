let express = require('express');
let router = express.Router();
let winston = require('winston');
import {
    user_login_post, user_signup_post, public_contacts_post, add_to_friend_list,
    friend_list_get, user_file_upload, get_user_post
} from '../controller/userController';
import { get_challenges_post, solve_challenge_post } from '../controller/challengeController';

router.post('/login', user_login_post);
router.post('/signup', user_signup_post);

router.post('/publicContacts', public_contacts_post);
router.post('/addToFriendList', add_to_friend_list)
router.post('/getFriendList', friend_list_get)
router.post('/fileupload', user_file_upload);
router.post('/getUser', get_user_post);
router.post('/getChallenges',get_challenges_post)
router.post('/solveChallenge',solve_challenge_post);
router.get('/check', (req, res) => {
res.json({ message: 'server is up and running' });
})

module.exports = router;