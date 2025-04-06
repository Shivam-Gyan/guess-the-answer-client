import React, { useState, useCallback } from 'react';
import { DropDownOptions, Tag } from './index';
import { toast } from 'react-hot-toast';


const QuestionCard = ({ setQuestions, questions, currentQuestionIndex, nextButtonClicked }) => {

    const currentQuestion = questions[currentQuestionIndex];

    const [showQuestionTypeOption, setShowQuestionTypeOption] = useState(false);
    const [showPointsTypeOption, setShowPointsTypeOption] = useState(false);

    const updateQuestion = useCallback((field, value) => {
        setQuestions(prev => {
            const updated = [...prev];
            updated[currentQuestionIndex] = {
                ...updated[currentQuestionIndex],
                [field]: value,
            };
            return updated;
        });
    }, [currentQuestionIndex, setQuestions]);

    const updateTags = useCallback((newTags) => {
        setQuestions(prev => {
            const updated = [...prev];
            updated[currentQuestionIndex] = {
                ...updated[currentQuestionIndex],
                options: newTags,
            };
            return updated;
        });
    }, [currentQuestionIndex, setQuestions]);

    const handleTagInput = useCallback((e) => {
        if (e.key === 'Enter' || e.keyCode === 188) {
            e.preventDefault();
            const tag = e.target.value.trim();

            if (!tag) return;
            if (currentQuestion.options.length >= 10) {
                toast.error("Reached your tag limit (10)");
                return;
            }
            if (!currentQuestion.options.includes(tag)) {
                updateTags([...currentQuestion.options, tag]);
                e.target.value = '';
            } else {
                toast.error("Tag already included");
            }
        }
    }, [currentQuestion.options, updateTags]);



    return (
        <>
            {/* question text and type */}
            <div className='w-full flex lg:flex-row flex-col px-4 gap-4 justify-center items-start'>
                <div className='w-full lg:w-[60%]'>
                    <p className="text-[15px] text-gray-500 mb-2 mt-2"><span className='text-red-500'>* </span>Question Text</p>
                    <textarea
                        // maxLength={characterLimit}
                        // defaultValue={"Writ"}
                        placeholder='Write your question here...'
                        className="h-28  resize-none text-gray-600 leading-7 placeholder:text-sm input-box pl-4"
                        value={currentQuestion.question}
                        onChange={(e) => updateQuestion("question", e.target.value)}
                    />
                </div>

                <div className='lg:mt-10 flex flex-col gap-3 w-full lg:w-[40%] '>

                    <div className=' relative w-full'>

                        {/* option of question type */}
                        <DropDownOptions
                            setShowTypeOption={setShowQuestionTypeOption}
                            showTypeOption={showQuestionTypeOption}
                            options={["Input", "MCQ", "Boolean"]}
                            Type={currentQuestion.questionType}
                            setType={(val) => updateQuestion("questionType", val)}
                            DropDownOptionsFor={"Select question type"}
                        />
                    </div>

                    <div className=' relative w-full'>
                        {/* option of points*/}
                        <DropDownOptions
                            setShowTypeOption={setShowPointsTypeOption}
                            showTypeOption={showPointsTypeOption}
                            options={["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]}
                            Type={currentQuestion.points}
                            setType={(val) => updateQuestion("points", val)}
                            DropDownOptionsFor={"Select points"}
                        />
                    </div>

                </div>
            </div>

            {/*hint and correct answer  */}
            <div className='w-full mt-4 lg:mt-2 flex lg:flex-row flex-col px-4 gap-4 justify-center items-start'>

                {/* correct answer */}
                <div className='w-full'>
                    <p className="text-sm text-gray-500 mb-2 capitalize"><span className='text-red-500'>* </span>Correct answer</p>
                    <input
                        type="text"
                        placeholder="correct answer"
                        className="input-box placeholder:text-sm"
                        onChange={(e) => updateQuestion("correct_answer", e.target.value)}
                        value={currentQuestion.correct_answer}
                    />
                </div>

                {/* hint for question */}
                <div className='w-full'>
                    <p className="text-sm text-gray-500 mb-2">Hint</p>
                    <input
                        type="text"
                        placeholder="correct answer"
                        className="input-box placeholder:text-sm"
                        value={currentQuestion.hint}
                        onChange={(e) => updateQuestion("hint", e.target.value)}
                    />
                </div>
            </div>

            {/* options field */}

            <div className='w-full px-4 py-4'>
                <div className="relative input-box pl-2 py-2 pb-4">
                    <input
                        type="text"
                        placeholder="MCQ options for question"
                        className="sticky input-box bg-gray-50 placeholder:text-sm focus:bg-gray-50 top-0 left-0 pl-4 mb-3"
                        disabled={currentQuestion.questionType !== "MCQ"}
                        onKeyDown={handleTagInput}
                    />
                    {currentQuestion.options.map((tag, index) => (
                        <Tag key={index} tag={tag} tagIndex={index} />
                    ))}
                </div>
            </div>
        </>
    )
}

export default QuestionCard





// const QuestionCard = React.memo(({ questions, setQuestions, currentQuestionIndex }) => {
//   const currentQuestion = questions[currentQuestionIndex];

//   const [showQuestionTypeOption, setShowQuestionTypeOption] = useState(false);
//   const [showPointsTypeOption, setShowPointsTypeOption] = useState(false);

//   const updateQuestion = useCallback((field, value) => {
//     setQuestions(prev => {
//       const updated = [...prev];
//       updated[currentQuestionIndex] = {
//         ...updated[currentQuestionIndex],
//         [field]: value,
//       };
//       return updated;
//     });
//   }, [currentQuestionIndex, setQuestions]);

//   const updateTags = useCallback((newTags) => {
//     setQuestions(prev => {
//       const updated = [...prev];
//       updated[currentQuestionIndex] = {
//         ...updated[currentQuestionIndex],
//         options: newTags,
//       };
//       return updated;
//     });
//   }, [currentQuestionIndex, setQuestions]);

//   const handleTagInput = useCallback((e) => {
//     if (e.key === 'Enter' || e.keyCode === 188) {
//       e.preventDefault();
//       const tag = e.target.value.trim();

//       if (!tag) return;
//       if (currentQuestion.options.length >= 10) {
//         toast.error("Reached your tag limit (10)");
//         return;
//       }
//       if (!currentQuestion.options.includes(tag)) {
//         updateTags([...currentQuestion.options, tag]);
//         e.target.value = '';
//       } else {
//         toast.error("Tag already included");
//       }
//     }
//   }, [currentQuestion.options, updateTags]);

//   return (
//     <>
//       {/* Question and dropdown */}
//       <div className='w-full flex lg:flex-row flex-col px-4 gap-4 justify-center items-start'>
//         <form className='w-full lg:w-[60%]'>
//           <p className="text-[15px] text-gray-500 mb-2 mt-2">
//             <span className='text-red-500'>* </span>Question Text
//           </p>
//           <textarea
//             placeholder='Write your question here...'
//             className="h-28 resize-none text-gray-600 leading-7 placeholder:text-sm input-box pl-4"
//             value={currentQuestion.question}
//             onChange={(e) => updateQuestion("question", e.target.value)}
//           />
//         </form>

//         <div className='lg:mt-10 flex flex-col gap-3 w-full lg:w-[40%]'>
//           <DropDownOptions
//             setShowTypeOption={setShowQuestionTypeOption}
//             showTypeOption={showQuestionTypeOption}
//             options={["Input", "MCQ", "Boolean"]}
//             Type={currentQuestion.questionType}
//             setType={(val) => updateQuestion("questionType", val)}
//             DropDownOptionsFor={"Select question type"}
//           />

//           <DropDownOptions
//             setShowTypeOption={setShowPointsTypeOption}
//             showTypeOption={showPointsTypeOption}
//             options={["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]}
//             Type={currentQuestion.points}
//             setType={(val) => updateQuestion("points", val)}
//             DropDownOptionsFor={"Select points"}
//           />
//         </div>
//       </div>

//       {/* Hint and answer */}
//       <div className='w-full mt-4 lg:mt-2 flex lg:flex-row flex-col px-4 gap-4 justify-center items-start'>
//         <div className='w-full'>
//           <p className="text-sm text-gray-500 mb-2 capitalize">
//             <span className='text-red-500'>* </span>Correct answer
//           </p>
//           <input
//             type="text"
//             placeholder="correct answer"
//             className="input-box placeholder:text-sm"
//             value={currentQuestion.correct_answer}
//             onChange={(e) => updateQuestion("correct_answer", e.target.value)}
//           />
//         </div>
//         <div className='w-full'>
//           <p className="text-sm text-gray-500 mb-2">Hint</p>
//           <input
//             type="text"
//             placeholder="Hint for question"
//             className="input-box placeholder:text-sm"
//             value={currentQuestion.hint}
//             onChange={(e) => updateQuestion("hint", e.target.value)}
//           />
//         </div>
//       </div>

//       {/* MCQ options */}
//       <div className='w-full px-4 py-4'>
//         <div className="relative input-box pl-2 py-2 pb-4">
//           <input
//             type="text"
//             placeholder="MCQ options for question"
//             className="sticky input-box bg-gray-50 placeholder:text-sm focus:bg-gray-50 top-0 left-0 pl-4 mb-3"
//             disabled={currentQuestion.questionType !== "MCQ"}
//             onKeyDown={handleTagInput}
//           />
//           {currentQuestion.options.map((tag, index) => (
//             <Tag key={index} tag={tag} tagIndex={index} />
//           ))}
//         </div>
//       </div>
//     </>
//   );
// });

// export default QuestionCard;
