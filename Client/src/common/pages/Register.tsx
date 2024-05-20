import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import InputField from "../ui/elements/form/InputField";
import CustomButton from "../ui/elements/form/CustomButton";
import { useDispatch } from "react-redux";
import { AuthActionCreator } from "../../redux/actions/auth.actions";
import store from "../../redux/stores/global.store";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    control,
    watch,
    handleSubmit,
    formState: { errors },
    // setError
  } = useForm<RegisterFormData>();

  // setError("firstName", {
  //   message: "djskds"
  // })

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    dispatch(AuthActionCreator.registerRequest(data));
  });

  useEffect(() => {
    const handleRedirect = () => {
      navigate("/sign-in");
    };

    const unsubscribe = store.subscribe(() => {
      const isAuthenticated = store.getState().auth.isAuthenticated;
      if (!isAuthenticated) {
        handleRedirect();
      }
    });

    return () => {
      unsubscribe();
    };
  }, [navigate]);

  return (
    <div className="w-full flex justify-center">
      <form
        className="w-full max-w-md bg-white shadow-md rounded-lg px-8 py-6"
        onSubmit={onSubmit}
      >
        <h2 className="text-4xl font-semibold text-center text-teal-700 mb-8 pb-2 font-serif">
          Create an Account
        </h2>
        <div className="mb-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <InputField
                name="firstName"
                label="First Name"
                type="text"
                rules={{ required: "First Name is Required" }}
                control={control}
                errors={errors}
              />
            </div>
            <div>
              <InputField
                name="lastName"
                label="Last Name"
                type="text"
                rules={{ required: "Last Name is Required" }}
                control={control}
                errors={errors}
              />
            </div>
          </div>
        </div>
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
        <div className="mb-6">
          <InputField
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            rules={{
              validate: (val) => {
                if (!val) {
                  return "This Field is required";
                } else if (watch("password") !== val) {
                  return "Your Passwords do not match";
                }
              },
            }}
            control={control}
            errors={errors}
          />
        </div>
        <div className="flex justify-center">
          <CustomButton type="submit" buttonTitle="Create Account" />
        </div>
      </form>
    </div>
  );
};

export default Register;
