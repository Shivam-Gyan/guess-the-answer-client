import axios from 'axios';

const URL=import.meta.env.VITE_SERVER_URL;

const userServices = {

    registerUser: async (data) => { 
        return await axios.post(URL+'user/register', data)
    },
    loginUser: async (data) => {
        return await axios.post(URL+'user/login', data)
    },
    otpVerify: async (data) => {
        return await axios.post(URL+'user/otp-verify', data)
    },
}

export default userServices;