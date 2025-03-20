import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../images/logo.png'
import {UserNavigationPanel} from './index'

const Navbar = () => {

    const [searchBoxVisibility, setSearchBoxVisibility] = useState(false);
    const [navPanel, setNavPanel] = useState(false);

    const handleSearch = (e) => {
        if (e.key === 'Enter') {
            console.log('searching...')
            console.log(e.target.value)
        }
    }

    const access_token = true;
    const new_notification = true;


    return (


        <nav className=" navbar z-50">

            <Link to={'/'} className='flex-none w-10'>
                <img className='w-full' src={Logo} alt="" />
            </Link>

            <div
                className={`absolute w-full md:w-auto  left-0 py-4 px-[5vw] top-full mt-0.5 border-b border-gray-200 md:border-0  md:block md:relative md:inset-0 md:p-0 md:show ${searchBoxVisibility ? 'hide' : 'show'}`}
            >
                <input
                    type="text"
                    onKeyDown={handleSearch}
                    onBlur={() => {
                        setSearchBoxVisibility(false)
                    }}
                    placeholder='Search'
                    className='w-full focus:outline-amber-500 bg-[#F3F3F3] md:w-auto text-[#6B6B6B] p-3 py-[10px] md:pl-12  pl-6 pr-[12%] md:pr-6 rounded-full placeholder:text-[#6B6B6B]' />

                <i className='fi fi-rr-category font-bold absolute right-[10%] font-[inter] md:pointer-events-none md:left-5 top-1/2 mt-1 -translate-y-1/2 text-lg text-[#6B6B6B]'></i>
            </div>

            <div className='flex items-center gap-3 md:gap-6 ml-auto'>

                <button
                    onClick={() => setSearchBoxVisibility(prev => !prev)}
                    className={`md:hidden w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center `}
                >
                    <i className='fi fi-rr-search text-xl text-[#6B6B6B] mt-1'></i>
                </button>


                <Link to={'/quiz'} className='hidden md:flex gap-2 link'>
                    <i className='fi fi-rr-pen-nib'></i>
                    <p className='text-[#6B6B6B]'>Quiz</p>
                </Link>


                {
                    access_token ?
                        <>
                            <Link to={"/dashboard/notifications"}>
                                <button className=' w-12 h-12 rounded-full bg-grey relative hover:bg-black/10'>
                                    <i className='fi fi-rr-bell text-xl block mt-1'></i>
                                    {new_notification ? <span className='absolute w-[10px] h-[10px] bg-red-500 rounded-full top-2 right-2'></span> : ""}
                                </button>
                            </Link>

                            <div
                                className='relative'
                                onClick={() => setNavPanel(prev => !prev)}
                                onBlur={() => {
                                    setTimeout(() => {
                                        setNavPanel(false)
                                    }, 200)
                                }}
                            >
                                <button className='w-12 h-12 bg-gray-200 rounded-full mt-1 ' >
                                    <img src={"https://res.cloudinary.com/dglwzejwk/image/upload/v1742380084/pngtree-irresistible-game-character-concept-for-your-creative-project-generative-ai-png-image_11919869-removebg-preview_nrbzoc.png"} alt="" className='w-full h-full object-cover rounded-full' />
                                </button>

                                {navPanel ?
                                    <UserNavigationPanel /> : ""
                                }

                            </div>

                        </>
                        :
                        <>
                            <Link to={'/login'} className='focus:outline-amber-500 border-[1px] border-gray-100 hover:border-amber-500 w-24 text-center rounded-full  font-normal text-sm bg-gray-200 py-2 '>
                                Sign In
                            </Link>
                            <Link to={'/register'} className='focus:outline-amber-500 border-[1px] border-gray-100 hover:border-slate-500 w-24 text-center rounded-full text-white font-normal text-sm bg-amber-500 py-2 hidden md:block'>
                                Sign Up
                            </Link>
                        </>
                }
            </div>


        </nav>
    )
}

export default Navbar