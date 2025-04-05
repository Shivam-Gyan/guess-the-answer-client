import React,{useState} from 'react'
import { DropDownOptions, Tag } from './index.js'
import { toast } from 'react-hot-toast';


const QuestionCard = ({ setQuestion, question }) => {

    const [showQuestionTypeOption, setShowQuestionTypeOption] = useState(false);
    const [showPointsTypeOption, setShowPointsTypeOption] = useState(false);
    const [questionType, setQuestionType] = useState("");
    const [points, setPoints] = useState("");


    const [tags, setTags] = useState([]);



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
                        onChange={(e) => {
                            setQuestion([...question, { ...question[0], question: e.target.value }])
                        }}

                        onKeyDown={(e) => {
                            // enter button on keyboard has keyCode==13
                            if (e.keyCode == 13) {
                                e.preventDefault();
                            }
                        }}
                    />
                </div>

                <div className='lg:mt-10 flex flex-col gap-3 w-full lg:w-[40%] '>

                    <div className=' relative w-full'>

                        {/* option of question type */}
                        <DropDownOptions
                            setShowTypeOption={setShowQuestionTypeOption}
                            showTypeOption={showQuestionTypeOption}
                            options={["Input", "MCQ", "Boolean"]}
                            Type={questionType}
                            setType={setQuestionType}
                            DropDownOptionsFor={"Select question type"}
                        />
                    </div>

                    <div className=' relative w-full'>
                        {/* option of points*/}
                        <DropDownOptions
                            setShowTypeOption={setShowPointsTypeOption}
                            showTypeOption={showPointsTypeOption}
                            options={["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]}
                            Type={points}
                            setType={setPoints}
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
                    />
                </div>

                {/* hint for question */}
                <div className='w-full'>
                    <p className="text-sm text-gray-500 mb-2">Hint</p>
                    <input
                        type="text"
                        placeholder="Hint for question"
                        className="input-box placeholder:text-sm"
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
                        disabled={questionType == "MCQ" ? false : true}
                        onKeyDown={(e) => {

                            if (e.keyCode == 13 || e.keyCode == 188) {
                                e.preventDefault()
                                let tag = e.target.value

                                if (tags.length < 10) {
                                    if (!tags.includes(tag) && tag.length) {
                                        setTags([...tags, tag])
                                    } else {
                                        toast.error("Tag already included")
                                    }
                                } else {
                                    toast.error("Reached your tag limit " + (10))
                                }
                            }
                        }}
                    />

                    {tags?.map((tag, index) => {
                        return <Tag key={index} tagIndex={index} tag={tag} />
                    })}
                </div>
            </div>
        </>
    )
}

export default QuestionCard