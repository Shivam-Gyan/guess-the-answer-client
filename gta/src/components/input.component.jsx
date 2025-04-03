
import { useState } from "react";

const InputBox = ({ name, type, id, placeholder, value, icon, disabled = false }) => {

    const [passwordVisible, setPasswordVissible] = useState(false)
    return (
        <>
            <div className="relative w-full">
                <input
                    name={name}
                    placeholder={placeholder}
                    type={
                        type == "password" ? passwordVisible ? "text" : "password" : type
                    }
                    id={id}
                    style={{
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "inherit",
                        transition: "background-color 5000s ease-in-out 0s",
                    }}
                    defaultValue={value}
                    className="w-full autofill:bg-transparent py-2 px-1 focus:outline-none text-sm bg-white focus:bg-white  placeholder:text-slate-400 placeholder:font-light"
                    disabled={disabled}
                />
                <i className={`fi ${icon} absolute top-2 left-auto right-0 text-slate-500`}></i>

                {
                    type == "password" &&

                    <i className={`fi fi-rr-eye${!passwordVisible ? " text-slate-500" : "-crossed text-amber-500"} absolute top-2 left-auto right-0  cursor-pointer text-xl`}
                        onClick={() => setPasswordVissible(prev => !prev)}
                    ></i>
                }

            </div>
        </>
    )
}

export default InputBox;