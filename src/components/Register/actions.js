import {REGISTER_REQUESTING} from './constants';

export const registerRequesting=function(register_fields){
    console.log("=========register fields=========");
    console.log(register_fields);
    return{
        type:REGISTER_REQUESTING,
        register_fields
    }
};