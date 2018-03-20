import { takeLatest, put } from 'redux-saga/effects';
import { GET_CHALLENGES,SOLVE_CHALLENGE_REQUESTING, GET_ASKED_CHALLENGES, GET_SOLVED_CHALLENGES } from './constants';
import { setChallenges,setSolveChallengeResult,setAskedChallenges,setSolvedChallenges, solveChallenge} from './actions';

import { handleApiErrors } from '../../../../lib/api-errors';

let REACT_APP_API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';
const GET_CHALLENGES_URL = `${REACT_APP_API_URL}/user/getChallenges`;
const SOLVE_CHALLENGE_URL = `${REACT_APP_API_URL}/user/solveChallenge`;
const GET_ASKED_CHALLENGES_URL=`${REACT_APP_API_URL}/user/askedChallenges`;
const GET_SOLVED_CHALLENGES_URL=`${REACT_APP_API_URL}/user/solvedChallenges`;

export function* solveChallengeApi({ challengeId, selectedChoice }) {
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
        yield put(setSolveChallengeResult(result));
}
export function* fetchChallengesApi({ userId }) {
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
export function* fetchAskedChallengesApi({ userId }) {
    const askedChallenges = yield fetch(GET_ASKED_CHALLENGES_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId })
    })
        .then(handleApiErrors)
        .then(response => response.json())
        .catch((errors) => { throw errors })
    if (askedChallenges) {
        yield put(setAskedChallenges(askedChallenges));
    }
}
export function* fetchSolvedChallengesApi({ userId }) {
    const solvedChallenges = yield fetch(GET_SOLVED_CHALLENGES_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId })
    })
        .then(handleApiErrors)
        .then(response => response.json())
        .catch((errors) => { throw errors })
    if (solvedChallenges) {
        yield put(setSolvedChallenges(solvedChallenges));
    }
}


export default function* challengeWatcher() {
    yield takeLatest(GET_CHALLENGES, fetchChallengesApi);
    yield takeLatest(SOLVE_CHALLENGE_REQUESTING, solveChallengeApi);
    yield takeLatest(GET_ASKED_CHALLENGES,fetchAskedChallengesApi);
    yield takeLatest(GET_SOLVED_CHALLENGES,fetchSolvedChallengesApi);
}