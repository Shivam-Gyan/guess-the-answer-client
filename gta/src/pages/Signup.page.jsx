import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { InputBox, OtpComponent } from '../components';
import signupImage from '../images/signup-image.png'
import { AnimationWrapper } from '../common'
import { toast } from 'react-hot-toast';
import userServices from '../configs/database/user.services';

const SignupPage = () => {

    const [termsCondition, setTermsCondition] = useState(false);
    const [otpVerification, setOtpVerification] = useState(false);
    const [error, setError] = useState(null);
    const [emailVerfied, setEmailVerfied] = useState("");

    const navigate = useNavigate();

    const handleFormSubmit = async (e) => {

        e.preventDefault();
        const formdata = new FormData(e.target);
        const name = formdata.get('name');
        const email = formdata.get('email');
        const password = formdata.get('password');

        if (!name || !email || !password) {
            toast.error('Please fill all the fields');
            return;
        }

        if (!termsCondition) {
            toast.error('Please accept terms and condition')
            return;
        }

        try {
            const response = await userServices.registerUser({ name, email, password, user_type: "User" });

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            // Assuming the response contains user data
            console.log('User data from backend:', response.data);
            localStorage.setItem('user', JSON.stringify(response.data.token));
            setEmailVerfied(email);
            setOtpVerification(true);
        } catch (error) {
            if (Array.isArray(error.response?.data?.message)) {
                setError(error.response.data.message);
                console.error('Error during signup:', error.response.data);
            } else if (error) {
                toast.error(error.message || 'An unexpected error occurred.');
            }
            else {
                toast.error(error.response?.data?.message || 'An unexpected error occurred.');
                console.error('Error during signup:', error);
            }
        }

    }

    const handleCompletedOTP = async (otp) => {

        try {
            const response = await toast.promise(
                userServices.otpVerify({ otp, email: emailVerfied }),
                {
                    loading: 'verifying otp...',
                    success: 'email verified successfully',
                    error: 'Invalid OTP. Please try again'
                }
            );

            console.log('OTP verification response:', response);

            navigate('/')
        } catch (error) {
            if (error.response.data.message) {
                toast.error(error.response.data.message);
            } else {

                toast.error(error.message || 'An unexpected error occurred.');
                console.log(error);
            }
        }
    }

    return (

        <AnimationWrapper>
            <div className="flex relative px-1 md:px-0 justify-center items-center min-h-screen bg-gray-100">
                <div className="bg-white relative rounded-3xl shadow-xl flex items-center justify-between px-2 max-w-4xl overflow-hidden ">

                    {/* background circles*/}
                    <div className=" absolute w-16 opacity-50 h-16 rounded-full bg-amber-500 -top-1 -left-6 z-20"></div>
                    <div className=" absolute w-24 opacity-50 h-24 rounded-full bg-amber-500 -bottom-12 right-5  z-20 "></div>

                    {/* left side */}


                    <div className="w-1/2 bg-amber-400 ml-6 hidden lg:flex rounded-3xl overflow-hidden items-center justify-center">
                        <img className=" w-full h-full bg-contain " src={signupImage} alt="" />
                    </div>



                    {/* right Side - signup Form */}

                    {otpVerification ?

                        // otp verification
                        <AnimationWrapper>
                            <OtpComponent count={6} onOTPComplete={handleCompletedOTP} />
                        </AnimationWrapper> :

                        // signup form
                        <div className="left max-w-xl px-2 md:px-5 py-6 z-10 ">


                            {/* header */}
                            <div className="headers flex flex-col items-center justify-center my-5">
                                <p className="text-slate-800 w-fit font-semibold tracking-normal text-xl">Join the Fastest Growing</p>
                                <p className="text-slate-800 w-fit font-semibold tracking-normal text-xl"><span className="text-amber-500">GTA</span> Community</p>
                            </div>

                            {/* social handle login buttons */}
                            <div className="social-buttons flex gap-4">
                                <button
                                    className="cursor-pointer hover:border-amber-500  flex items-center justify-center w-fit py-1 px-2 border-[1px] border-slate-200 rounded-full  text-white"
                                >
                                    <img className="w-8 h-8 bg-center" src="https://www.pngmart.com/files/22/Google-PNG-File.png" alt="" />
                                    <span className="text-slate-400 text-xs font-light">Sign up with Google</span>
                                </button>
                                <button
                                    className="cursor-pointer hover:border-amber-500 flex items-center justify-center w-fit py-1 px-2 border-[1px] border-slate-200 rounded-full  text-white"
                                >
                                    <img className="w-8 h-8 bg-center" src="https://static.vecteezy.com/system/resources/previews/018/930/698/original/facebook-logo-facebook-icon-transparent-free-png.png" alt="" />
                                    <span className="text-slate-400 text-xs font-light">Sign up with Facebook</span>
                                </button>
                            </div>

                            {/* classical login */}
                            <div className="classical-login my-10">

                                <form onSubmit={(e) => handleFormSubmit(e)} >
                                    <div className=" hover:border-amber-500 focus:border-amber-500 relative border-[1px] py-1 flex items-center px-4 border-slate-200 rounded-lg mb-6">
                                        <span className="absolute text-md font-light text-slate-400 bg-white px-2 left-3 -top-4">Name</span>
                                        <InputBox name='name' type='text' id='name' placeholder='fullname' icon="fi-rr-user" />

                                    </div>
                                    <div className=" hover:border-amber-500 focus:border-amber-500 relative border-[1px] py-1 flex items-center px-4 border-slate-200 rounded-lg mb-6">
                                        <span className="absolute text-md font-light text-slate-400 bg-white px-2 left-3 -top-4">Email</span>
                                        <InputBox name='email' type='text' id='email' placeholder='email' icon="fi-rr-envelope" />

                                    </div>
                                    <div className=" w-full hover:border-amber-500 focus:border-amber-500 relative border-[1px] py-1 flex items-center px-4 border-slate-200 rounded-lg mb-6">
                                        <span className="absolute text-md font-light text-slate-400 bg-white px-2 left-3 -top-4">Password</span>
                                        <InputBox name='password' type='password' id='password' placeholder='password' />
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center justify-start gap-2 ml-2" >
                                            <span onClick={() => setTermsCondition(prev => !prev)} type="checkbox" className="w-4 h-4 cursor-pointer border-[1px] border-slate-200 bg-blue-50 focus:border-amber-500 flex items-center ">{termsCondition ? <i className="fi fi-rr-check text-amber-600 "></i> : ""}</span>
                                            <span className="text-sm font-light text-slate-500">Accept Terms and Condition</span>
                                        </div>
                                        <button type="submit" className="cursor-pointer py-2 px-6 border-[1px] bg-slate-50 text-slate-600 font-light uppercase text-sm border-slate-400  hover:border-amber-500 rounded-full ">Sign up</button>
                                    </div>
                                </form>

                                {error &&
                                    <div className="text-red-500 text-xs  mt-1">{error.map((item, idx) => {
                                        return <p key={idx} >{item}</p>
                                    })}</div>
                                }

                            </div>

                            {/* already have an account  */}
                            <div className=" w-full text-center font-light text-slate-500 text-sm mt-5">
                                Already have an account? <Link to='/login' className="text-amber-500 font-medium bg-blend-lighten cursor-pointer">Sign in</Link>
                            </div>

                        </div>}

                </div>

                {/* footer */}
                <div className="absolute bottom-3 w-full text-center font-light text-slate-500 text-sm mt-10">
                    &copy; 2025 GTA. All rights reserved.
                </div>
            </div>
        </AnimationWrapper>
    );
}

export default SignupPage;