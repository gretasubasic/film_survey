export default (survey = {}, action) => {
    switch (action.type) {
      case "FETCH_DATA":
        return action.payload;
      
      case "CREATE_SURVEY":
        return {...survey, data: action.payload};

        default:
            return survey;
      
       
    }
    
  };