import React, { useRef, useState, useEffect } from 'react'
import { createQuizNavLink, UserNavLink } from '../utils/requiredData.js'
import { Link, NavLink } from 'react-router-dom'
import AnimationWrapper from '../common/page.animation.jsx';
import { FormSection } from '../components'

const QuizCreatorPage = () => {

  const [activeLink, setActiveLink] = useState('Create Quiz');
  const [showSideNav, setShowSideNav] = useState(false);

  let activeTabLine = useRef();
  let sideBarIconTab = useRef();
  let pageStateTab = useRef();

  const changePageState = (e) => {

    let { offsetWidth, offsetLeft } = e.target;

    activeTabLine.current.style.width = offsetWidth + "px";
    activeTabLine.current.style.left = offsetLeft + "px";

    if (e.target == sideBarIconTab.current) {
      setShowSideNav(true)
    } else {
      setShowSideNav(false)
    }
  }



  useEffect(() => {
    setShowSideNav(false)
    if (pageStateTab.current) {
      pageStateTab.current.click();
    }
  }, [activeLink])


  return (
    // <div className='block mx-auto'>
    <div className='w-full relative h-cover flex md:flex-row flex-col  items-center justify-center bg-[#F3F3F3]'>

      {/* left side navigation panel  h-[calc(100vh-80px)]*/}
      <nav className='w-44 hidden h-[85vh] py-10 md:flex flex-col items-between justify-start h-calc(100vh - 80px) border-r-2 border-gray-200 '>

        <h1 className='mt-4 mb-1 text-gray-400  pl-2 text-lg line-clamp-1' >Quizboard</h1>
        <div className='h-[1px] bg-gray-200 mb-4' />

        <ul>
          {createQuizNavLink.map((link) => (
            <li onClick={() => setActiveLink(link.name)} key={link.name} className={`py-3 pl-2 pr-6 cursor-pointer flex justify-start gap-4 text-gray-500 hover:text-slate-700 items-center duration-100 ${activeLink == link.name ? 'bg-slate-200 border-r-[3px] text-slate-800 border-slate-500' : 'b'}`}>
              <span className='text-xl '><i className={`fi fi-${link.icon}`}></i></span> <span className='text-sm font-normal'>{link.name}</span>
            </li>
          ))}
        </ul>

        <h1 className='mt-6 mb-1 text-gray-400 text-lg line-clamp-1 pl-2' >Userboard</h1>
        <div className='h-[1px] bg-gray-200 mb-4' />
        <ul>
          {UserNavLink.map((link) => (
            <Link to={link.path} onClick={() => setActiveLink(link.name)} key={link.name} className={`py-3 pl-2 pr-6 cursor-pointer flex justify-start gap-4 text-gray-500 hover:text-slate-700 items-center duration-100 ${activeLink == link.name ? 'bg-slate-200 border-r-[3px] text-slate-800 border-slate-500' : 'b'}`}>
              <span className='text-xl '><i className={`fi fi-${link.icon}`}></i></span> <span className='text-sm font-normal'>{link.name}</span>
            </Link>
          ))}
        </ul>
      </nav>

      {/* menu button fucntionality */}

      <div className="md:hidden bg-[#F3F3F3] w-full z-30 absolute top-0 left-0 py-1 flex flex-nowrap overflow-x-auto">
        <button ref={sideBarIconTab} onClick={changePageState} className="p-5 capitalize ">
          <i className='fi fi-br-bars-staggered pointer-events-none'></i>
        </button>
        <button ref={pageStateTab} onClick={changePageState} className="p-5 capitalize ">
          {activeLink}
        </button>
        <hr ref={activeTabLine} className="absolute bottom-3 duration-500" />
      </div>


      {
        showSideNav ?

          <AnimationWrapper>
            <nav className=' absolute top-12 left-4 w-[calc(100vw-50px)]  self-start pl-4 pr-auto md:hidden h-[85vh] py-10 flex flex-col items-between justify-start  border-gray-200 '>

              <h1 className='mt-8 mb-1 text-gray-400  pl-2 text-lg line-clamp-1' >Quizboard</h1>
              <div className='h-[1px] bg-gray-200 mb-4' />

              <ul>
                {createQuizNavLink.map((link) => (
                  <li onClick={() => setActiveLink(link.name)} key={link.name} className={`py-3 max-w-[70vh] pl-2 pr-6 cursor-pointer flex justify-start gap-4 text-gray-500 hover:text-slate-700 items-center duration-100 ${activeLink == link.name ? 'bg-slate-200 border-r-[3px] text-slate-800 border-slate-500' : 'b'}`}>
                    <span className='text-xl '><i className={`fi fi-${link.icon}`}></i></span> <span className='text-sm font-normal'>{link.name}</span>
                  </li>
                ))}
              </ul>

              <h1 className='mt-6 mb-1 text-gray-400 text-lg line-clamp-1 pl-2' >Userboard</h1>
              <div className='h-[1px] bg-gray-200 mb-4' />
              <ul>
                {UserNavLink.map((link) => (
                  <Link to={link.path} onClick={() => setActiveLink(link.name)} key={link.name} className={`py-3 pl-2 w-[100%] pr-6 cursor-pointer flex justify-start gap-4 text-gray-500 hover:text-slate-700 items-center duration-100 ${activeLink == link.name ? 'bg-slate-200 border-r-[3px] text-slate-800 border-slate-500' : 'b'}`}>
                    <span className='text-xl '><i className={`fi fi-${link.icon}`}></i></span> <span className='text-sm font-normal'>{link.name}</span>
                  </Link>
                ))}
              </ul>
            </nav>

            {/* w-[80%] lg:w-[70%] xl:w-[60%] */}
          </AnimationWrapper> :<AnimationWrapper>
          <section className=' w-full  h-[calc(100vh-80px)] sm:w-3/4 lg:w-fit flex items-center justify-start md:justify-center'>
            <FormSection ActiveTab={activeLink} />
          </section></AnimationWrapper>


      }




      {/* form section */}

      {/* <section className='w-1/2  bg-red-200 flex items-start justify-start'>



      </section> */}
    {/* </div> */}
    </div>
  )
}

export default QuizCreatorPage;