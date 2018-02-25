import { setClient } from "../components/Client/actions";

export function checkIndexAuthorization({ dispatch }) {
    console.log("==========inside check index auth==========");
    if (checkPortalAuthorization(dispatch)) {
        return true;
    }
    return false;
}

export function checkPortalAuthorization({ dispatch,getState}) {
    console.log("=======dispatch=======");
    console.log(dispatch);
    console.log("============inside check portal auth===========");
        const client = getState().client;
        if (client && client.token)
            return true;
        if (checkAuthorization(dispatch))
            return true;
            return false;
    }
export function checkAuthorization(dispatch) {
    console.log("============inside check auth========");
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
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