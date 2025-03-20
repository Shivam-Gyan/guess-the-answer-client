import { Link } from "react-router-dom"
import {AnimationWrapper} from '../common'




const UserNavigationPanel = () => {

    // let {userAuth:{username},setUserAuth}=useContext(UserContext);

    const signOutUser=()=>{
        console.log.log("signing out")
        // removeSession("user")
        // setUserAuth({access_token:null})
    }

    const username = "username";


    return (
        <AnimationWrapper
            className="absolute right-0 z-50"
            transition={{ duration: 0.2 }}
        >

            <div className="bg-white absolute right-0 border border-gray-300 w-56 overflow-hidden duration-200">

                <Link to={'/editor'} className=" flex gap-2 link md:hidden pl-5 py-3">
                    <i className="fi fi-rr-file-edit"></i>
                    <p>write</p>
                </Link>

                <Link to={`/dashboard/profile`} className="link pl-5 py-3">
                   Profile
                </Link>

                <Link to={`/dashboard/profile`} className="link pl-5 py-3">
                   Dashboard
                </Link>

                <Link to={`/settings/edit-profile`} className="link pl-5 py-3">
                   Setting
                </Link>

                <span className="absolute border-t border-gray-300 w-[100%]">
                </span>

                <button 
                onClick={signOutUser}
                className="text-left  p-4 hover:bg-gray-border-gray-300 w-full pl-5 py-2  "
                >
                    <h1 className=" font-semibold text-lg mb-1 ">Sign Out</h1>
                    <p className="text-[#6B6B6B] border-gray-300">@{username}</p>
                </button>

            </div>

        </AnimationWrapper>
    )
}

export default UserNavigationPanel;