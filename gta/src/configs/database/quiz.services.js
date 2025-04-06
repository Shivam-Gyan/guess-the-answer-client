import axios from 'axios';

const URL=import.meta.env.VITE_SERVER_URL;


const QuizServices = {
    uploadQuizBanner:async(image)=>{
        return await axios.post(URL+'quiz/quiz-banner', {image}, {
            headers: {
                'Content-Type': 'multipart/form-data'
                // 'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
    },  
    
    createQuiz:async(quizData)=>{
        return await axios.post(URL+'quiz/create-quiz', quizData, {
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
    }
    ,
    addQuestionsToQuiz:async(questions)=>{
        return await axios.post(URL+'quiz/addquestions', questions, {
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
    }
}

export default QuizServices;