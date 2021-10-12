import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  
    type: String, 
    questionId: String,
    answers: [
        {
            questionId: String,
            answer: String
        },
        {
            questionId: String,
            answer: Number
        }
    ]
}
)




const PostForm = mongoose.model("PostForm", postSchema);

export default PostForm;