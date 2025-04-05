import React, { useRef, useState } from 'react'
import { Tag } from './index.js'
import { AnimationWrapper } from '../common';

const QuizFormat = {
  quiz_type: "",
  quiz_title: "Title of Quiz",
  quiz_description: "Description of Quiz",
  tags: [],
  questions:5
}

const FormSection = ({ ActiveTab }) => {

  const [updatedProfileImg, setUpdatedProfileImg] = useState("https://t3.ftcdn.net/jpg/04/67/10/02/360_F_467100228_IB9BaE1WU8pHRgDruKi2WhcHpMQtrTYK.jpg")

  const [quizData, setQuizData] = useState(QuizFormat);
  const [showTypeOption, setShowTypeOption] = useState(false);

  let profileImgRef = useRef();


  let characterLimit = 300;
  let tagLimit = 10;


  // handle image preview
  const handleImagePreview = (e) => {
    e.preventDefault()
    let profileImg = e.target.files[0]
    profileImgRef.current.src = URL.createObjectURL(profileImg)
    setUpdatedProfileImg(profileImgRef.current.src)
  }

  // upload image to server
  const handleProfileImgUplaod = (e) => {
    e.preventDefault()
    console.log("Profile Image Uploaded")
  }

  // publish quiz
  const handlePublishClick = (e) => {
    e.preventDefault()
    console.log(quizData)
    setQuizData(QuizFormat)
  }

  return (

    <section className='relative h-full w-full overflow-y-auto ' style={{ scrollbarWidth: "none" }}>
      <div className=' flex mt-[74px] md:mt-[65px] justify-end md:justify-between w-full  '>
        <h1 className='ml-6  text-lg hidden md:block font-medium   text-gray-500'>{ActiveTab}</h1>
        <button onBlur={() => setTimeout(() => setShowTypeOption(false), 300)} onClick={() => setShowTypeOption(prev => !prev)} className='outline-none bg-gray-200 flex gap-2 mb-0 md:mb-2 px-2 py-1 border-[1px] border-gray-100 rounded-md text-sm text-slate-500 w-fit '>
          <span className='text-sm'>{quizData.quiz_type || "Quiz Type"}</span>
          <span className='-mb-1'><i className={`fi fi-br-angle-small-${showTypeOption ? "up" : "down"} text-lg`}></i></span>
        </button>

        {
          showTypeOption &&
          <div className='absolute z-20 right-0 md:-right-4 top-[118px] md:top-[112px]'>
            <AnimationWrapper transition={{ duration: 0.4 }}>
              <div
                className="relative flex flex-col items-center justify-center w-28">
                <div className='h-5 w-5 bg-slate-200  rotate-[45deg] absolute -top-2 left-12'></div>
                <button
                  onClick={(e) => {
                    setQuizData({ ...quizData, quiz_type: e.target.innerText });
                    setShowTypeOption(false);
                  }}
                  className='px-3 p-2 pb-1 text-center bg-slate-200 text-slate-800 text-sm w-full cursor-pointer'>Form</button>
                <button
                  onClick={(e) => {
                    setQuizData({ ...quizData, quiz_type: e.target.innerText });
                    setShowTypeOption(false);
                  }}
                  className='px-3 p-2 pb-1 text-center bg-slate-200 text-slate-800 text-sm w-full  cursor-pointer'>Quiz</button>
              </div>
            </AnimationWrapper>
          </div>
        }

      </div>



      <div className='px-5  mb-10 md:mt-0 flex flex-col gap-4 lg:gap-0'>

        {/* quiz banner and deatils  */}
        <div className='flex max-md:flex-col flex-row justify-between gap-4 items-center w-full mt-4 md:mt-0'>

          {/* upload banner to Quiz*/}
          <div className="flex flex-col md:items-start items-center justify-center md:justify-start mb-5">
            <p className="text-sm text-gray-500 mb-1 ml-2 "><span className='text-red-500'>*</span> Quiz Cover Image</p>
            <label htmlFor="uploadImg" id="profileImgLabel"
              className="relative block w-full md:w-56 h-auto bg-gray-300 rounded-md overflow-hidden">
              <div
                className="w-full h-full text-white absolute top-0 left-0 flex items-center gap-3 
                                justify-center bg-black/30 opacity-0 hover:opacity-100 cursor-pointer"><span className='bg-slate-800/30 h-16 w-16 rounded-full flex items-center justify-center'><i className="fi fi-br-plus mt-1"></i></span></div>

              <img ref={profileImgRef} src={updatedProfileImg} alt="" className='w-full md:w-56 h-auto md:h-44' />

            </label>
            <input
              onChange={handleImagePreview}
              type="file"
              accept=".jpg,.png,.jpeg"
              hidden id="uploadImg" />

            <button
              onClick={handleProfileImgUplaod}
              className="cursor-pointer py-2  bg-slate-700 hover:bg-slate-800 text-white font-normal uppercase text-sm  hover:border-amber-500 rounded-lg w-full mt-4 "
            >Upload</button>
          </div>

          {/* quiz title and description */}
          <div className='w-full '>
            <p className="text-sm text-gray-500 mb-1"><span className='text-red-500'>*</span> Quiz Title</p>
            <input
              type="text"
              placeholder="Quiz Title"
              className="input-box text-gray-600 placeholder:text-sm mb-2 text-sm"
              defaultValue={quizData.quiz_title}
              onChange={(e) => {
                setQuizData({ ...quizData, quiz_title: e.target.value })
              }}
            />
            <p className="text-sm text-gray-500 mb-1 mt-3"><span className='text-red-500'>*</span> Short description about your Quiz </p>

            <textarea

              maxLength={characterLimit}
              defaultValue={quizData.quiz_description}
              className="h-36 text-gray-600 text-sm resize-none leading-7 input-box pl-4"
              onChange={(e) => {
                setQuizData({ ...quizData, quiz_description: e.target.value })
              }}

              onKeyDown={(e) => {
                // enter button on keyboard has keyCode==13
                if (e.keyCode == 13) {
                  e.preventDefault();
                }
              }}
            >

            </textarea>
            <p className="mt-1 text-gray-400 text-[13px] text-right">{characterLimit - quizData.quiz_description.length} charcters left</p>
          </div>
        </div>

        {/* tags and question number */}
        <div className='w-full px-2 h-full md:mt-2 mt-0'>

          <div className='w-full flex gap-3 flex-col md:flex-row justify-between items-start'>

            {/* tags fields */}
            <div className='w-full'>

              <p
                className="mb-1 text-xs text-gray-500 mt-1"
              >
                <span className='text-red-500'>* </span>Topics-(Helps in searching and ranking your Quiz)

              </p>


              <div className="relative input-box pl-2 py-2 pb-4">
                <input
                  type="text"
                  placeholder="Topic like- science, history etc"
                  className="sticky input-box bg-white placeholder:text-sm focus:bg-gray-50 top-0 left-0 pl-4 mb-3"
                  onKeyDown={(e) => {

                    if (e.keyCode == 13 || e.keyCode == 188) {
                      e.preventDefault()
                      let tag = e.target.value

                      if (quizData.tags.length < tagLimit) {
                        if (!quizData.tags.includes(tag) && tag.length) {
                          setQuizData({ ...quizData, tags: [...quizData.tags, tag] })
                        } else {
                          toast.error("Tag already included")
                        }
                      } else {
                        toast.error("Reached your tag limit " + (tagLimit))
                      }
                    }
                  }}
                />

                {quizData.tags.map((tag, index) => {
                  return <Tag key={index} tagIndex={index} tag={tag} />
                })}
              </div>
              <p className="mt-1 text-gray-400 text-sm text-right mr-2">{tagLimit - quizData.tags.length} Tags left</p>
            </div>

            {/* input number of question */}

            <div className=' w-full md:w-36 flex flex-col items-start justify-start mt-1 lg:w-36 '>
              <p className="mt-1 text-gray-400 flex gap-1 text-sm text-right mr-2"><span className='text-red-500'>* </span>Questions <span className='md:hidden block text-sm ml-1'>(Min 5 questions)</span></p>
              <input
                min={5}
                max={20}
                type="number"
                placeholder="5"
                className="input-box placeholder:text-sm mb-2 text-sm"
                onChange={(e) => {
                  const value = Math.max(5, e.target.value);
                  setQuizData({ ...quizData, questions: value });
                }}
              />
              <p className='hidden md:block text-gray-400 text-sm self-end'>(Min 5 questions)</p>
            </div>
          </div>

          <button
            className="mt-2 py-2 px-5 cursor-pointer hover:bg-slate-600 bg-slate-700 text-white font-normal uppercase text-sm border-slate-400 hover:border-amber-500 rounded-md w-fit"
            onClick={handlePublishClick}
          >
            Publish
          </button>

        </div>
      </div>
    </section>
  )
}

export default FormSection;