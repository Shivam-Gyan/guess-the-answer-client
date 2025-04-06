import React from 'react'
import { AnimationWrapper } from '../common';


const DropDownOptions = ({ setShowTypeOption, showTypeOption,DropDownOptionsFor, currentQuestionIndex,setType, options, Type }) => {


    return (
        <>

            <button onBlur={() =>
                setTimeout(() => {
                    setShowTypeOption(false)
                }, 300)
            } onClick={() => setShowTypeOption(prev => !prev)} className='outline-none w-full flex justify-between input-box gap-2 text-gray-600 mr-8 md:mr-0'>
                <span className='text-sm mt-2'>{Type || DropDownOptionsFor}</span>
                <span className=' pt-1 flex items-center'><i className={`fi fi-br-angle-small-${showTypeOption ? "up" : "down"} text-lg`}></i></span>
            </button>

            {/* question type options rendering */}
            {
                showTypeOption &&
                <div className='absolute w-full z-20 right-0 top-[60px] '>
                    <AnimationWrapper transition={{ duration: 0.4 }}>
                        <div

                            className="relative w-full flex flex-col items-center justify-center ">
                            <div

                                className='h-5 w-5 bg-slate-200  rotate-[45deg] absolute -top-2 left-12'></div>
                            {
                                options.map((type, index) => (
                                    <button
                                        key={index}
                                        onClick={(e) => {
                                            setType(e.target.innerText);
                                            // console.log()
                                            setShowTypeOption(false);
                                        }}
                                        className='px-3 p-2 pb-2 text-center bg-slate-200 text-slate-800 text-sm w-full cursor-pointer'>{type}</button>
                                ))
                            }

                        </div>
                    </AnimationWrapper>
                </div>
            }
        </>
    )
}

export default DropDownOptions