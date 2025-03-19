import React, { useRef, useState } from 'react'

const OtpComponent = ({ count, onOTPComplete }) => {

    const [otps, setOtps] = useState([])
    const [masking, setMasking] = useState(new Array(count).fill(""))
    const inputRefs = useRef([])

    const handleClick = (index) => {
        return (event) => {
            event.target.setSelectionRange(1, 1);
        }
    }

    const handlePaste = (index) => {
        return (event) => {
            // TODO: manage it for index > 0
            const pastedData = event.clipboardData.getData("Text").slice(0, count);
            if (!isNaN(pastedData)) {
                setOtps(pastedData.split(""));
                setMasking(pastedData.split("").fill("*"));
            }
        };
    }


    const handleKeyUp = (index) => {

        return (event) => {
            const key = event.key;
            let oldOtps = [...otps];
            let maskingCopy = [...masking];

            // ifkey is ArrowRight

            if (key == 'ArrowRight') {
                moveFocusToRight(index, oldOtps);
                return;
            }

            // if key is ArrowLeft
            if (key == 'ArrowLeft') {
                moveFocusToLeft(index);
                return;
            }


            // if key is backspace move focus to left
            if (key == 'Backspace') {
                oldOtps[index] = "";
                maskingCopy[index] = ""
                moveFocusToLeft(index);

                setOtps(oldOtps);
                setMasking(maskingCopy);
                return;
            }

            // if key not a number return
            if (isNaN(key)) return;

            // set the value of otp
            oldOtps[index] = key;
            maskingCopy[index] = "*";
            setMasking(maskingCopy);
            setOtps(oldOtps);

            // move focus to next input
            moveFocusToRight(index);

            // send otp to parent component

            // const otpToSend = oldOtps.join("");

            // if (otpToSend.length == count) {
            //     onOTPComplete(otpToSend);
            // }

        }
    }

    const moveFocusToRight = (index, oldOtps) => {

        if (inputRefs.current[index + 1]) {
            if (oldOtps) {

                const tempArray = [...otps];
                const trimedArray = tempArray.fill("*", 0, index);

                // find the index of empty box
                const emptyIndex = trimedArray.indexOf("");
                inputRefs.current[emptyIndex]?.focus();

            } else {
                inputRefs.current[index + 1]?.focus();
            }
        }

    }
    const moveFocusToLeft = (index) => {

        if (inputRefs.current[index - 1]) {
            inputRefs.current[index - 1]?.focus();
        }
    }

    const ConfirmOTPSubmition = () => {
        const otpToSend = otps.join("");

        if (otpToSend.length == count) {
            onOTPComplete(otpToSend);
        }
    }


    return (
        <div className='flex w-full gap-5 flex-col items-center justify-center'>
            <div>
            {
                new Array(count).fill("").map((_, index) => (
                    <input
                        ref={(iRef) => inputRefs.current[index] = iRef} //iRef means input reference
                        key={index}
                        onChange={(event) => {
                            const selectedData = event.target.value;
                            if (selectedData.length === count) {
                              if (!isNaN(selectedData)) {
                                setOtps(selectedData.split(""));
                                setMasking(selectedData.split("").fill("*"));
                              }
                            }
                          }}
                        onPaste={handlePaste(index)}
                        inputMode="numeric"
                        autoComplete='one-time-code'
                        onClick={handleClick(index)}
                        className="w-8 h-8 text-center border-[1px] border-slate-300 focus:border-amber-500 hover:border-amber-500 outline-none rounded-lg text-lg font-semibold mx-1"
                        type="text"
                        onKeyUp={handleKeyUp(index)}
                        value={masking[index] ?? ""}

                    />
                ))
            }
            </div>
            <button onClick={ConfirmOTPSubmition} className='w-fit cursor-pointer py-2 px-6 border-[1px] bg-slate-50 text-slate-600 font-light uppercase text-sm border-slate-400 hover:border-amber-500 rounded-full'>Confirm OTP</button>
        </div>
    )
}

export default OtpComponent;