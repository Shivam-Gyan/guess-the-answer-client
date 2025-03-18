import React, { useState } from "react";

import { InputBox } from "../components";

const LoginPage = () => {

    const [remeberme, setRemeberme] = useState(false)
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white relative rounded-3xl shadow-xl flex items-center justify-between px-2 max-w-4xl z-10 ">

                    <div className=" absolute w-16 h-16 rounded-full bg-amber-500 -top-1 -left-5 z-[-1]"></div>
                    <div className=" absolute w-24 h-24 rounded-full bg-amber-500 -bottom-12 right-7 z-[-1]"></div>

                {/* Left Side - Login Form */}

                <div className="left  max-w-xl px-5 py-10 z-10 ">


                    {/* header */}
                    <div className="headers flex flex-col items-center justify-center my-5">
                        <p className="text-slate-800 w-fit font-semibold tracking-normal text-2xl">Welcome back to the</p>
                        <p className="text-slate-800 w-fit font-semibold tracking-normal text-2xl"><span className="text-amber-500">GTA</span> Community</p>
                    </div>

                    {/* social handle login buttons */}
                    <div className="social-buttons flex gap-4">
                        <button
                            className="cursor-pointer hover:border-amber-500  flex items-center justify-center w-fit py-1 px-3 border-[1px] border-slate-200 rounded-full  text-white"
                        >
                            <img className="w-8 h-8 bg-center" src="https://www.pngmart.com/files/22/Google-PNG-File.png" alt="" />
                            <span className="text-slate-400 text-xs font-light">Sign in with Google</span>
                        </button>
                        <button
                            className="cursor-pointer hover:border-amber-500 flex items-center justify-center w-fit py-1 px-3 border-[1px] border-slate-200 rounded-full  text-white"
                        >
                            <img className="w-8 h-8 bg-center" src="https://static.vecteezy.com/system/resources/previews/018/930/698/original/facebook-logo-facebook-icon-transparent-free-png.png" alt="" />
                            <span className="text-slate-400 text-xs font-light">Sign in with Facebook</span>
                        </button>
                    </div>

                    {/* classical login */}
                    <div className="classical-login my-10">

                        <form >
                            <div className="input-box hover:border-amber-500 focus:border-amber-500 relative border-[1px] py-2 flex items-center px-4 border-slate-200 rounded-2xl mb-4">
                                <span className="absolute text-md font-light text-slate-400 bg-white px-2 left-3 -top-3">email</span>
                                <InputBox name='email' type='text' id='email' placeholder='email' icon="fi-rr-envelope" />
                                
                            </div>
                            <div className="input-box w-full hover:border-amber-500 focus:border-amber-500 relative border-[1px] py-2 flex items-center px-4 border-slate-200 rounded-2xl mb-4">
                                <span className="absolute text-md font-light text-slate-400 bg-white px-2 left-3 -top-3">password</span>
                                <InputBox name='password' type='password' id='password' placeholder='password' />
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center justify-start gap-2 ml-2" >
                                    <span onClick={()=>setRemeberme(prev=>!prev)} type="checkbox" className="w-4 h-4 cursor-pointer border-[1px] border-slate-200 bg-blue-50 focus:border-amber-500 flex items-center ">{remeberme?<i className="fi fi-rr-check text-amber-600 "></i>:""}</span>
                                    <span className="text-sm font-light text-slate-500">Remember me</span>
                                </div>
                                <button className="cursor-pointer py-2 px-6 border-[1px] bg-slate-50 text-slate-600 font-light uppercase text-sm border-slate-400 hover:border-amber-500 rounded-full ">Sign in</button>
                            </div>
                        </form>

                    </div>

                    {/* already have an account  */}
                    <div className=" w-full text-center font-light text-slate-500 text-sm mt-5">
                        Don't have an account? <span className="text-amber-500 cursor-pointer">Sign up</span>
                    </div>

                </div>


                {/* right side */}


                <div className="w-1/2 bg-amber-400 mr-6 hidden lg:flex rounded-3xl overflow-hidden items-center justify-center">
                    <img className=" w-full h-full bg-contain " src="https://www.nicepng.com/png/full/106-1067393_game-character-png.png" alt="" />
                </div>

            </div>
        </div>
    );
};

export default LoginPage;
