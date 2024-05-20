/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import OtpInput from "react-otp-input";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthActionCreator } from "../../redux/actions/auth.actions";
import store from "../../redux/stores/global.store";

const OtpVerification: React.FC = () => {
  const [otp, setOtp] = useState("");
  const [isRehydrated, setIsRehydrated] = useState(false);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleChange = (otpValue: string) => {
    if (!isNaN(Number(otpValue))) {
      setOtp(otpValue);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    dispatch(AuthActionCreator.otpVerificationRequest({ otp }));
  };

  useEffect(() => {
    const handleRedirect = () => {
      navigate("/");
    };

    const unsubscribe = store.subscribe(() => {
      const state = store.getState();
      const isOtpVerified = store.getState().auth.isOtpVerified;

      if (!isRehydrated && state._persist?.rehydrated) {
        setIsRehydrated(true);
        return;
      }

      if(isRehydrated){
        if (isOtpVerified) {
          handleRedirect();
        } 
        else {
          toast.error("Invalid OTP. Please Try Again.", {
            className:
              "bg-teal-300 text-black font-serif font-medium border border-teal-500 shadow-md p-4 rounded-md",
            bodyClassName: "text-black",
            progressClassName: "bg-teal-600",
          });
        }
        setIsRehydrated(false);
      }
      
    });

    return () => {
      unsubscribe();
    };
  }, [navigate, isRehydrated]);

  // if(check){
  //   setTimeout(()=>{
  //     if (isOtpVerified) {
  //       console.log('OTP verified successfully');
  //         navigate("/");
  //     } else {
  //       toast.error("Invalid OTP. Please Try Again.", {
  //         className:
  //           "bg-teal-300 text-black font-serif font-medium border border-teal-500 shadow-md p-4 rounded-md",
  //         bodyClassName: "text-black",
  //         progressClassName: "bg-teal-600",
  //       })
  //     }
  //   },1000);
  // }

  const renderInput = (inputProps: any) => (
    <input
      {...inputProps}
      className="otp-input text-black text-center border rounded-lg px-4 py-2 m-2 focus:outline-none focus:border-blue-500"
    />
  );

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4">OTP Verification</h1>
      <form
        onSubmit={handleSubmit}
        className="flex items-center justify-center"
      >
        <OtpInput
          value={otp}
          onChange={handleChange}
          numInputs={6}
          shouldAutoFocus
          containerStyle="otp-container flex justify-center"
          inputStyle="otp-input text-center border rounded-lg px-4 py-2 m-2 focus:outline-none focus:border-blue-500"
          renderInput={renderInput}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg ml-4"
        >
          Verify OTP
        </button>
      </form>
    </div>
  );
};

export default OtpVerification;
