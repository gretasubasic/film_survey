import React, { useState } from "react";
import axios from "axios"
import { useSelector } from "react-redux";
import ReactHtmlParser from 'react-html-parser';
import { useDispatch } from "react-redux";
import { Wrapper } from "./style";
import { useHistory } from "react-router";





const Form = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const surveyData = useSelector((state) => state.survey)
    const [textData, setTextData] = useState("");
    const [value, setValue ] = useState(null);
    const [error, setError] = useState(
        {
        answerError: "", inputError: ""
    });


    const title = surveyData.title
    const questions = surveyData.questions
    const description = surveyData.description
    const id = surveyData.id


    const validate = () => {
        if(textData.length < 4){
            setError({...error, answerError: "please enter the valid name of movie"})
        }
        if(value === Number){
            setError({...error, inputError: "Please rate the movie"})
        }

    }

    const submitForm = (e) => {
        e.preventDefault();
        
      
        const postSurvey = (surveyInfo) => async (dispatch) => {
            const url = "https://survey-festival.herokuapp.com/api/v1/survey/${id}/answers"
            try {
            const { data } = await axios.post(url, surveyInfo)
            dispatch({type: "CREATE_SURVEY", payload: data})
            history.push("/successpage")
        
            } catch (error) {
                console.log(error)
                
            }
        
        }
        dispatch(postSurvey({ "data": {
            "type": "surveyAnswers",
            "attributes": {
            "answers": [
            {
            "questionId": "film",
            "answer": textData
            },
            {
            "questionId":"review" ,
            "answer": value
            }]
            }
            }
            }))
            
    }



    return (
        <Wrapper>
        <form className="form" onSubmit={submitForm}> 
            <h1>{title}</h1>
            <div className="survey-description">{ ReactHtmlParser(description) }</div>
            <div>
           {questions?.map((question, index) => {
           const {label, questionType, questionId, required} = question; 

           return <div key={index} className="questions"><h3>{label}</h3>
           {questionType === "rating" ? 
          <section className="rate-input" id={questionId}>
              <div>{error.inputError}</div>
          <label>1<input type="radio" name="answer" required={required} value={1} onClick={(e) => setValue(e.target.value)}></input></label>
          <label>2<input type="radio" name="answer" required={required} value={2} onClick={(e) => setValue(e.target.value)}></input></label>
          <label>3<input type="radio" name="answer" required={required} value={3} onClick={(e) => setValue(e.target.value)}></input></label>
          <label>4<input type="radio" name="answer" required={required} value={4} onClick={(e) => setValue(e.target.value)}></input></label>
          <label>5<input type="radio" name="answer" required={required} value={5} onClick={(e) => setValue(e.target.value)}></input></label>
          </section> 
          : 
          <section id={questionId}>
          <label htmlFor="input">
              <div>{error.answerError}</div>
            <input name="answer" className="write-input" 
            placeholder="write your input" onChange={(e) => setTextData(e.target.value)} required={required}></input></label>
          </section>
            }
            
           </div>
           }
           )}

        <button className="btn">Submit Form</button>
          
       </div>
        </form>
        </Wrapper>
    
    )
}

export default Form
