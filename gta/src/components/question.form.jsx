import React, { useState } from 'react'
import { AnimationWrapper } from '../common';
import { DropDownOptions, QuestionCard, Tag } from './index.js'
import { toast } from 'react-hot-toast';

let questionFormat = [
  {
    question: "question",
    questionType: "",
    hint: "No hint",
    options: [],
    correctAnswer: "answer of question",
    points: "",
  }
]

const QuestionForm = ({ ActiveTab }) => {

  const [question, setQuestion] = useState(questionFormat);


  return (
    <div className='overflow-y-auto h-full w-full' style={{ scrollbarWidth: "none" }}>
      <div className='w-ful h-full lg:h-[70vh] px-0 md:px-2 mt-[65px] flex flex-col justify-start md:items-center'>
        {/* header  */}
        <div className='w-full  flex justify-center gap-4 items-center'>
          <h1 className='text-slate-400 text-lg font-medium'>Question number</h1>
          <span className='text-slate-400 text-lg font-medium'>{"2/10"}</span>
        </div>

        {/* question container */}

        <div className='w-full flex flex-col gap-2 mt-4'>

          <QuestionCard setQuestion={setQuestion} question={question} />

        </div>

        {/* button */}
        <div className='w-full flex justify-between items-center mt-4 px-4'>
          <button className=' px-4 py-2 rounded-md bg-slate-700 text-white cursor-pointer hover:bg-slate-800 text-sm font-medium'>Prev</button>
          <button className=' px-4 py-2 rounded-md bg-slate-700 text-white cursor-pointer hover:bg-slate-800 text-sm font-medium'>Next</button>
        </div>
      </div>
    </div>
  )
}

export default QuestionForm;