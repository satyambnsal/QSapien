import { takeLatest, call, put } from 'redux-saga/effects';
import { GET_CHALLENGES } from './constants';
import { setChallenges } from './actions';

import { handleApiErrors } from '../../../../lib/api-errors';

let REACT_APP_API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';
const GET_CHALLENGES_URL = `${REACT_APP_API_URL}/user/getChallenges`;

export function* fetchChallengesApi({userId}) {
    console.log('--------user-id:: fetch challenge api' + userId);
    const challenges = yield fetch(GET_CHALLENGES_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId })
    })
        .then(handleApiErrors)
        .then(response => response.json())
        .then(json => json)
        .catch((errors) => { throw errors })
    console.log('received challenges');
    console.table(challenges);
    if (challenges) {
        yield put(setChallenges(challenges));
    }
}
export default function* challengeWatcher() {
    yield takeLatest(GET_CHALLENGES, fetchChallengesApi);
}