import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import InputField from "../ui/elements/form/InputField";
import CustomButton from "../ui/elements/form/CustomButton";
import { AuthActionCreator } from "../../redux/actions/auth.actions";
import { useDispatch, useSelector } from "react-redux";
import store from "../../redux/stores/global.store";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authError = useSelector((state: RootState) => state.auth.error);
  console.log("Auth Error ......", authError);
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<SignInFormData>();

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    dispatch(AuthActionCreator.loginRequest(data));
  });

  useEffect(() => {
    const handleRedirect = () => {
      navigate("/");
    };

    const unsubscribe = store.subscribe(() => {
      const isAuthenticated = store.getState().auth.isAuthenticated;
      if (isAuthenticated) {
        handleRedirect();
      }
    });

    return () => {
      unsubscribe();
    };
  }, [navigate]);

  useEffect(() => {
    if (authError) {
      toast.error(authError, {
        className:
          "bg-teal-300 text-black font-serif font-medium border border-teal-500 shadow-md p-4 rounded-md",
        bodyClassName: "text-black",
        progressClassName: "bg-teal-600",
      });
    }
  }, [authError]);

  return (
    <div className="w-full flex justify-center">
      {/* {authError && (
        <div className="text-red-600 font-bold text-center mb-4">
          {authError.error}
        </div>
      )} */}
      <form
        className="w-full max-w-md bg-white shadow-md rounded-lg px-8 py-6"
        onSubmit={onSubmit}
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Sign In
        </h2>

        <div className="mb-4">
          <InputField
            name="email"
            label="Email"
            type="email"
            rules={{ required: "Email is Required" }}
            control={control}
            errors={errors}
          />
        </div>
        <div className="mb-4">
          <InputField
            name="password"
            label="Password"
            type="password"
            rules={{
              required: "Password is Required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            }}
            control={control}
            errors={errors}
          />
        </div>
        <div className="flex justify-center">
          <CustomButton type="submit" buttonTitle="Sign In" />
        </div>
      </form>
    </div>
  );
};

export default SignIn;
