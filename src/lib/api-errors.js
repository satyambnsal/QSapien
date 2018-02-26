export function handleApiErrors(response){
    console.log("======response=======");
    console.log(JSON.stringify(response));
    if(!response.ok)throw Error(response.message)
    return response;
}