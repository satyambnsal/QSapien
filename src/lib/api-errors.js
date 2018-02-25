export function handleApiErrors(response){
    if(!response.ok)throw Error(response.message)
    return response;
}