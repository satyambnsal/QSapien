import { takeLatest, put } from 'redux-saga/effects';
import { GET_CHALLENGES, SOLVE_CHALLENGE } from './constants';
import { setChallenges } from './actions';

import { handleApiErrors } from '../../../../lib/api-errors';

let REACT_APP_API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';
const GET_CHALLENGES_URL = `${REACT_APP_API_URL}/user/getChallenges`;
const SOLVE_CHALLENGE_URL = `${REACT_APP_API_URL}/user/solveChallenge`;

export function* solveChallengeApi({ challengeId, selectedChoice }) {
    console.log('solve challenge api entry point');
    const result = yield fetch(SOLVE_CHALLENGE_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ challengeId, selectedChoice })
    }).then(handleApiErrors)
        .then(response => response.json())
        .catch((errors) => {

        });
    console.log('result::', result);
}
export function* fetchChallengesApi({ userId }) {
    console.log('fetch challenges api entry point');
    const challenges = yield fetch(GET_CHALLENGES_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId })
    })
        .then(handleApiErrors)
        .then(response => response.json())
        .catch((errors) => { throw errors })
    if (challenges) {
        yield put(setChallenges(challenges));
    }
}
export default function* challengeWatcher() {
    yield takeLatest(GET_CHALLENGES, fetchChallengesApi);
    yield takeLatest(SOLVE_CHALLENGE, solveChallengeApi);
}