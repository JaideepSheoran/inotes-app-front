const reducer = (state, action)=>{
    if(action.type === 'USER'){
        console.log("TRUE");
        return action.payload;
    }
    return state;
}

export default reducer;