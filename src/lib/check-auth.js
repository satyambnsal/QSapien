import {setClient} from "../components/Client/actions";
//import logger from 'winston';
export function checkIndexAuthorization({ dispatch }) {
  //  logger.info('check index authorization entry point');
    if (checkPortalAuthorization(dispatch)) {
        return true;
    }
    return false;
}

export function checkPortalAuthorization({ dispatch,getState}) {
   // logger.info('check portal authorization method entry point');
   // logger.debug('dispatch object::'+JSON.stringify(dispatch));
   console.log('inside check portal authorization');
        const client = getState().client;
        if (client && client.token)
            return true;
        if (checkAuthorization(dispatch))
            return true;
            return false;
    }
export function checkAuthorization(dispatch) {
   // logger.info('check authorization method entry point');
   console.log('inside check authorization');
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