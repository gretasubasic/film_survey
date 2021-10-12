import axios from "axios";


const url = "https://survey-festival.herokuapp.com/api/v1/survey";




export const fetchData = () => axios.get(url)

