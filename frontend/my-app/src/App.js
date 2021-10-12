import React, { useEffect} from "react"
import { useDispatch } from "react-redux";
import { getData} from "./actions/survey";
import Form from "./Form";
import './index.css'
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import SuccessPage from "./SuccessPage";




function App() {
  
  const dispatch = useDispatch();

  useEffect(() => {

      dispatch(getData());
      
      
  }, [dispatch])
  

  return (
    <>
    <Router>
      <Switch>
      <Route exact path="/" component={Form}/>
      <Route path="/successpage" component={SuccessPage} />
    </Switch>
    </Router>
    </>
  )
 
}

export default App;
