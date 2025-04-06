import React, { useState, useCallback } from 'react';
import { QuestionCard } from './index.js';
import { toast } from 'react-hot-toast';
import QuizServices from '../configs/database/quiz.services.js';

const QuestionForm = React.memo(({ ActiveTab, setActiveTab, quizData, setQuizData }) => {
  const [questions, setQuestions] = useState(
    Array(quizData.noOfQuestions).fill().map(() => ({
      question: "",
      questionType: "",
      points: "",
      options: [],
      hint: "",
      correct_answer: ""
    }))
  );

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const handleNextClickEvent = useCallback(async () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      return;
    }

    console.log("Final Questions:", questions);
    await QuizServices.addQuestionsToQuiz(questions).then(res => {
      toast.success("All questions saved!");
      console.log(res.data)
    }).catch(err => {
      console.log(err)
    })


  }, [currentQuestionIndex, questions]);

  const handlePrevClickEvent = useCallback(() => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  }, [currentQuestionIndex]);

  return (
    <div className='overflow-y-auto h-full w-full' style={{ scrollbarWidth: "none" }}>
      <div className='w-full h-full lg:h-[70vh] px-0 md:px-2 mt-[65px] flex flex-col justify-start md:items-center'>
        <div className='w-full flex justify-center gap-4 items-center'>
          <h1 className='text-slate-400 text-lg font-medium'>Question number</h1>
          <span className='text-slate-400 text-lg font-medium'>
            {currentQuestionIndex + 1}/{quizData.noOfQuestions}
          </span>
        </div>

        <div className='w-full flex flex-col gap-2 mt-4'>
          <QuestionCard
            questions={questions}
            setQuestions={setQuestions}
            currentQuestionIndex={currentQuestionIndex}
          />
        </div>

        <div className='w-full flex justify-between items-center mt-4 px-4'>
          <button
            onClick={handlePrevClickEvent}
            className='px-4 py-2 rounded-md bg-slate-700 text-white cursor-pointer hover:bg-slate-800 text-sm font-medium'>
            Prev
          </button>
          <button
            onClick={handleNextClickEvent}
            className='px-4 py-2 rounded-md bg-slate-700 text-white cursor-pointer hover:bg-slate-800 text-sm font-medium'>
            Next
          </button>
        </div>
      </div>
    </div>
  );
});

export default QuestionForm;
