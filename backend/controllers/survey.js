import PostForm from '../models/PostForm.js';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const data = require('../data.json');
import {check, validationResult} from "express-validator"


export const getSurveyData = (req, res) => {
    try {
        res.status(200).send(data)
        
    } catch (error) {
        res.status(500).send({
            "errors": [
            {
            "title": "Internal Server Error",
            "detail": "Something went wrong. We're working on it!"
            }
            ]
            })
        
    }
   
}

export const createSurvey = async (req, res) => {

    const errors = validationResult(req.body);
    if(!errors.isEmpty()){
        return res.status(422).json({
            "errors": [
            {
            "source": { "pointer": "data/attributes/answers/film" },
            "detail": "The value is required"
            },
            {
            "source": { "pointer": "data/attributes/answers/review" },
            "detail": "The value is required"
            }
            ]
            })
       
    }


  
    const { id } = req.params;
    const type = req.body.data.type
    const answers = req.body.data.attributes.answers
    
    const newPostForm = new PostForm({data, type, answers})
    
    

try {
    await newPostForm.save()
    res.status(201).json(newPostForm)
    console.log(newPostForm)

    
} catch (error) {
    res.status(500).json({
        "errors": [
        {
        "title": "Internal Server Error",
        "detail": "Something went wrong. We're working on it!"
        }
        ]
        }
        )
} 
}



export const getCreatedSurvey = async (req, res) => {
    const { id } = req.params;
    
    try {
    const surveyData = await PostForm.find({id});
        res.status(200).json(surveyData);
       
    } catch (error) {
        res.status(500).json( {
            "errors": [
            {
            "title": "Internal Server Error",
            "detail": "Something went wrong. We're working on it!"
            }
            ]
            } );
    }

}