import React, { useRef, useState } from 'react'
import { Tag } from './index.js'
import { AnimationWrapper } from '../common';

const QuizFormat = {
  quiz_type: "Quiz",
  quiz_title: "Title of Quiz",
  quiz_description: "Description of Quiz",
  tags: []
}

const FormSection = ({ ActiveTab }) => {

  const [updatedProfileImg, setUpdatedProfileImg] = useState("https://t3.ftcdn.net/jpg/04/67/10/02/360_F_467100228_IB9BaE1WU8pHRgDruKi2WhcHpMQtrTYK.jpg")

  const [quizData, setQuizData] = useState(QuizFormat);
  const [showTypeOption, setShowTypeOption] = useState(false);

  let profileImgRef = useRef();


  let characterLimit = 300;
  let tagLimit = 10;

  const handleImagePreview = (e) => {

    e.preventDefault()
    console.log(e.target.files[0])

    let profileImg = e.target.files[0]

    profileImgRef.current.src = URL.createObjectURL(profileImg)
    console.log(profileImgRef.current.src)
    setUpdatedProfileImg(profileImgRef.current.src)


  }
  const handleProfileImgUplaod = (e) => {
    e.preventDefault()
    console.log("Profile Image Uploaded")
  }

  const handlePublishClick = (e) => {
    e.preventDefault()
    console.log(quizData)
    setQuizData(QuizFormat)
  }

  return (
    <section className='relative h-full w-full overflow-y-auto ' style={{ scrollbarWidth: "none" }}>
      <div className=' flex mt-[74px] justify-end md:justify-between w-full '>
        <h1 className='ml-8  text-lg hidden md:block font-normal  text-gray-600'>{ActiveTab}</h1>
        <button onClick={() => setShowTypeOption(prev => !prev)} className='outline-none flex gap-2 text-gray-600 mr-8 md:mr-0'>
          <span>Quiz Type</span>
          <span className=' pt-1 flex items-center'><i className={`fi fi-br-angle-small-${showTypeOption ? "up" : "down"} text-lg`}></i></span>
        </button>
      </div>
      <div className='px-8 mb-10 md:mt-0 flex md:flex-row flex-col gap-5'>

        {/* option selector */}
        {
          showTypeOption &&
          <div className='absolute z-20 right-[20px] md:-right-2 top-[112px] '>
            <AnimationWrapper transition={{ duration: 0.4 }}>
              <div className="relative flex flex-col items-center justify-center w-28">
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

        {/* upload banner to Quiz*/}
        <div className="flex flex-col items-center justify-center md:justify-start mb-5 mt-8">
          <label htmlFor="uploadImg" id="profileImgLabel"
            className="relative block w-full md:w-56 h-auto md:h-44 bg-gray-300 rounded-md overflow-hidden">
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
            className="cursor-pointer py-2 px-6  bg-slate-700 text-white font-normal uppercase text-sm  hover:border-amber-500 rounded-lg w-full mt-5 "
          >Upload</button>
        </div>

        <div>
          <form className="flex flex-col gap-4">
            <div className="lg:pl-8">

              <p className="text-[15px] text-gray-500 mb-2 mt-2">Quiz Title</p>
              <input
                type="text"
                placeholder="Blog Title"
                className="input-box"
                defaultValue={quizData.quiz_title}
                onChange={(e) => {
                  setQuizData({ ...quizData, quiz_title: e.target.value })
                }}
              />
              <p className="text-[15px] text-gray-500 mb-2 mt-9">Short description about your Quiz </p>

              <textarea

                maxLength={characterLimit}
                defaultValue={quizData.quiz_description}
                className="h-40  resize-none leading-7 input-box pl-4"
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
              <p className="my-1 text-gray-400 text-[13px] text-right">{characterLimit - quizData.quiz_description.length} charcters left</p>

              <p
                className="mb-2 text-[15px] text-gray-500 mt-2"
              >
                Topics-(Helps in searching and ranking your Quiz)</p>


              <div className="relative input-box pl-2 py-2 pb-4">
                <input
                  type="text"
                  placeholder="Topic like- science, history etc"
                  className="sticky input-box bg-white placeholder:text-[15px] focus:bg-gray-50 top-0 left-0 pl-4 mb-3"
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
              <p className="mt-4 text-gray-400 text-sm text-right">{tagLimit - quizData.tags.length} Tags left</p>

              <button
                className="mt-2 py-2 px-5 bg-slate-700 text-white font-normal uppercase text-sm border-slate-400 hover:border-amber-500 rounded-md w-fit"
                onClick={handlePublishClick}
              >
                Publish
              </button>

            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default FormSection;