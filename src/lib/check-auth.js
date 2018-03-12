import { setClient } from "../components/Client/actions";

export function checkPortalAuthorization({ dispatch, getState }) {
    console.log('inside check portal authorization');
    const client = getState().client;
    console.log('--------------client----------' + JSON.stringify(client));
    if (client && client.token) {
        return true;
    }
    else if (checkAuthorization(dispatch))
        return true;
    else
        return false;
}

export function checkAuthorization(dispatch) {
    console.log('inside check authorization');
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
        console.log('inside stored token if condition');
        const token = JSON.parse(storedToken);
        const createdDate = new Date(token.created);
        const created = Math.round(createdDate.getTime() / 1000);
        const ttl = 60 * 60 * 24;
        const expiry = created + ttl;
        if (created > expiry)
            return false;
        dispatch(setClient(token))
        return true;
    }
    return false;
}