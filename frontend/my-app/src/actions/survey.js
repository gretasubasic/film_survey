import * as api from "../api"



export const getData = () => async (dispatch) => {
    
    try {
      
        const {data} = await api.fetchData()
        const title = data.data?.attributes.title
        const description = data.data?.attributes.description
        const questions = data.data.attributes.questions
        const id = data.data.id

        dispatch({type: "FETCH_DATA", payload: {id: id, title: title, description: description, questions: questions} })

        
    } catch (error) {
        console.log(error)
    }
} 




