const initialState = {
    data: {
        id: "",
        title: "",
        genre: "",
        numberInStock: "",
        dailyRentalRate: ""
      }
}

const reducer = (state=initialState, action) => {
    if (action.type === 'SUBMITFORM')
    return {
        
    };
};

export default reducer;