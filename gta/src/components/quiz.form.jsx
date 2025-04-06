
import React, { useState, useCallback, memo } from 'react';
import { Tag } from './index.js';
import { AnimationWrapper } from '../common';
import { toast } from 'react-hot-toast';
import QuizServices from '../configs/database/quiz.services.js';

const characterLimit = 300;
const tagLimit = 10;

const FormSection = ({ ActiveTab, setActiveTab, quizData, setQuizData }) => {
  const [updatedQuizBannerImg, setUpdatedQuizBannerImg] = useState(null);
  const [bannerPreview, setBannerPreview] = useState(null);
  const [showTypeOption, setShowTypeOption] = useState(false);

  const handleImagePreview = useCallback((e) => {
    e.preventDefault();
    const profileImg = e.target.files[0];
    setUpdatedQuizBannerImg(profileImg);
    setBannerPreview(URL.createObjectURL(profileImg));
  }, []);

  const handleProfileImgUplaod = useCallback(async (e) => {
    e.preventDefault();
    if (!updatedQuizBannerImg) {
      return toast.error("Please upload an image");
    }

    e.target.setAttribute("disabled", true);
    const uploadingToast = toast.loading("Uploading...");

    try {
      const res = await QuizServices.uploadQuizBanner(updatedQuizBannerImg);
      setUpdatedQuizBannerImg(res.data.image_url);
      setQuizData(prev => ({ ...prev, quizBanner: res.data.image_url }));
      toast.success(res.data.message);
    } catch (error) {
      console.log(error);
      toast.error("Failed to upload image");
    } finally {
      toast.dismiss(uploadingToast);
      e.target.removeAttribute("disabled");
    }
  }, [updatedQuizBannerImg, setQuizData]);

  const handlePublishClick = useCallback(async (e) => {
    e.preventDefault();

    if (!quizData.quiz_title || !quizData.quiz_description || !quizData.noOfQuestions || !quizData.tags.length || !updatedQuizBannerImg || typeof updatedQuizBannerImg !== 'string') {
      return toast.error("Please fill all the fields and ensure the image is uploaded correctly");
    }

    try {
      const res = await QuizServices.createQuiz(quizData);
      toast.success(res.data.message);
      setActiveTab("Add Questions");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Error creating quiz");
    }
  }, [quizData, updatedQuizBannerImg, setActiveTab]);

  const handleTypeSelect = useCallback((type) => {
    setQuizData(prev => ({ ...prev, quiz_type: type }));
    setShowTypeOption(false);
  }, [setQuizData]);

  const handleTagInput = useCallback((e) => {
    if (e.keyCode === 13 || e.keyCode === 188) {
      e.preventDefault();
      const tag = e.target.value.trim();

      if (quizData.tags.length >= tagLimit) return toast.error(`Reached tag limit of ${tagLimit}`);
      if (!tag || quizData.tags.includes(tag)) return toast.error("Tag already included or empty");

      setQuizData(prev => ({ ...prev, tags: [...prev.tags, tag] }));
      e.target.value = '';
    }
  }, [quizData.tags, setQuizData]);

  const handleQuestionCountChange = useCallback((e) => {
    const value = Math.max(5, parseInt(e.target.value, 10));
    setQuizData(prev => ({ ...prev, noOfQuestions: value }));
  }, [setQuizData]);

  const handleTitleChange = useCallback((e) => {
    setQuizData(prev => ({ ...prev, quiz_title: e.target.value }));
  }, [setQuizData]);

  const handleDescriptionChange = useCallback((e) => {
    setQuizData(prev => ({ ...prev, quiz_description: e.target.value }));
  }, [setQuizData]);

  return (
    <section className='relative h-full w-full overflow-y-auto' style={{ scrollbarWidth: "none" }}>
      <div className='flex mt-[74px] md:mt-[65px] justify-end md:justify-between w-full'>
        <h1 className='ml-6 text-lg hidden md:block font-medium text-gray-500'>{ActiveTab}</h1>
        <button
          onBlur={() => setTimeout(() => setShowTypeOption(false), 300)}
          onClick={() => setShowTypeOption(prev => !prev)}
          className='outline-none bg-gray-200 flex gap-2 mb-0 md:mb-2 px-2 py-1 border border-gray-100 rounded-md text-sm text-slate-500 w-fit'
        >
          <span>{quizData.quiz_type || "Quiz Type"}</span>
          <span className='-mb-1'>
            <i className={`fi fi-br-angle-small-${showTypeOption ? "up" : "down"} text-lg`} />
          </span>
        </button>

        {showTypeOption && (
          <div className='absolute z-20 right-0 md:-right-4 top-[118px] md:top-[112px]'>
            <AnimationWrapper transition={{ duration: 0.4 }}>
              <div className="relative flex flex-col items-center justify-center w-28">
                <div className='h-5 w-5 bg-slate-200 rotate-[45deg] absolute -top-2 left-12' />
                {["Form", "Quiz"].map((type, i) => (
                  <button
                    key={i}
                    onClick={() => handleTypeSelect(type)}
                    className='px-3 p-2 pb-1 text-center bg-slate-200 text-slate-800 text-sm w-full cursor-pointer'
                  >
                    {type}
                  </button>
                ))}
              </div>
            </AnimationWrapper>
          </div>
        )}
      </div>

      <div className='px-5  mb-10 md:mt-0 flex flex-col gap-4 lg:gap-0'>

        {/* quiz banner and deatils  */}
        <div className='flex max-md:flex-col flex-row justify-between gap-4 items-center w-full mt-4 md:mt-0'>
          {/* Image Upload */}
          <div className="flex max-md:w-full  flex-col md:items-start items-center justify-center md:justify-start mb-5">
            <p className="text-sm text-gray-500 mb-1 ml-2">
              <span className='text-red-500'>*</span> Quiz Cover Image
            </p>

            <label htmlFor="uploadImg" id="profileImgLabel"
              className="relative block w-full md:w-56 max-md:aspect-video max-md:max-h-[30vh] bg-gray-300 rounded-md overflow-hidden">
              <div
                className="w-full aspect-video  h-full text-white absolute top-0 left-0 flex items-center gap-3 justify-center bg-black/30 opacity-0 hover:opacity-100 cursor-pointer">
                <span className='bg-slate-800/30 h-16 w-16 rounded-full flex items-center justify-center'><i className="fi fi-rr-add-image text-2xl mt-1"></i>
                </span>
              </div>
              {/* ref={profileImgRef} */}
              <img src={quizData?.quizBanner.length > 0 ? quizData?.quizBanner : bannerPreview} alt="" className='w-full md:w-56 h-auto md:h-44' />

            </label>
            <input onChange={handleImagePreview} type="file" accept=".jpg,.png,.jpeg" hidden id="uploadImg" />
            <button onClick={handleProfileImgUplaod} className="py-2 mt-4 bg-slate-700 hover:bg-slate-800 text-white text-sm rounded-lg w-full">Upload</button>
          </div>

          {/* Title and Description */}
          <div className='w-full'>
            <p className="text-sm text-gray-500 mb-1"><span className='text-red-500'>*</span> Quiz Title</p>
            <input
              type="text"
              placeholder="Quiz Title"
              defaultValue={quizData.quiz_title}
              onChange={handleTitleChange}
              className="input-box text-gray-600 placeholder:text-sm mb-2 text-sm"
            />
            <p className="text-sm text-gray-500 mb-1 mt-3"><span className='text-red-500'>*</span> Short description about your Quiz</p>
            <textarea
              className="h-36 text-gray-600 text-sm resize-none leading-7 input-box pl-4"
              defaultValue={quizData.quiz_description}
              maxLength={characterLimit}
              onChange={handleDescriptionChange}
              onKeyDown={(e) => e.keyCode === 13 && e.preventDefault()}
            />
            <p className="text-gray-400 text-[13px] text-right">{characterLimit - quizData.quiz_description.length} characters left</p>
          </div>
        </div>

        {/* Tags and Question Count */}
        <div className='px-2 h-full md:mt-2'>
          <div className='flex flex-col md:flex-row gap-3 justify-between'>
            <div className='w-full'>
              <p className="text-xs text-gray-500"><span className='text-red-500'>*</span> Topics (Helps in searching and ranking your Quiz)</p>
              <div className="input-box pl-2 py-2 pb-4">
                <input
                  type="text"
                  placeholder="Topic like - science, history etc"
                  className="input-box bg-white placeholder:text-sm focus:bg-gray-50 pl-4 mb-3"
                  onKeyDown={handleTagInput}
                />
                {quizData.tags.map((tag, i) => <Tag key={i} tagIndex={i} tag={tag} />)}
              </div>
              <p className="text-gray-400 text-sm text-right mr-2">{tagLimit - quizData.tags.length} Tags left</p>
            </div>

            <div className='w-full md:w-36'>
              <p className="text-gray-400 text-sm mr-2"><span className='text-red-500'>*</span> Questions <span className='md:hidden'>(Min 5)</span></p>
              <input
                type="number"
                min={5}
                max={20}
                placeholder="5"
                onChange={handleQuestionCountChange}
                className="input-box placeholder:text-sm text-sm"
              />
              <p className='hidden md:block text-gray-400 text-sm'>(Min 5 questions)</p>
            </div>
          </div>

          <button
            onClick={handlePublishClick}
            className="mt-2 py-2 px-5 bg-slate-700 hover:bg-slate-600 text-white text-sm rounded-md"
          >
            Publish
          </button>
        </div>
      </div>
    </section>
  );
};

export default memo(FormSection);
