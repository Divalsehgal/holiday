import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";
export type RegisterFormProps = {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
};

function Register() {
  const navigate = useNavigate();
  const { showToast } = useAppContext();

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormProps>();

  const mutation = useMutation(apiClient.register, {
    onSuccess: function () {
      showToast({
        message: "Registration Successfully",
        type: "SUCCESS",
      });
      navigate("/");
    },
    onError: function (error: Error) {
      showToast({
        message: error.message,
        type: "ERROR",
      });
    },
  });
  const handleSubmitHandler = handleSubmit((data) => {
    mutation.mutate(data);
    // on calling mutate from mutation instance it gon na call register function
  });
  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmitHandler}>
      <h2 className="text-3xl font-bold">Create An Account</h2>
      <div className="flex flex-col md:flex-row gap-5">
        <label
          htmlFor="firstName"
          className="text-gray-700 font-bold text-sm flex-1"
        >
          First Name
          <input
            type="text"
            id="firstName"
            className="rounded border w-full py-1 px-2 font-normal"
            {...register("firstName", { required: "This field is required" })}
          />
          {errors?.firstName && (
            <span className="text-red-500">{errors?.firstName.message}</span>
          )}
        </label>
        <label
          htmlFor="lastName"
          className="text-gray-700 font-bold text-sm flex-1"
        >
          Last Name
          <input
            type="text"
            id="lastName"
            className="rounded border w-full py-1 px-2 font-normal"
            {...register("lastName", { required: "This field is required" })}
          />
          {errors?.lastName && (
            <span className="text-red-500">{errors?.lastName.message}</span>
          )}
        </label>
      </div>
      <label htmlFor="email" className="text-gray-700 font-bold text-sm flex-1">
        Email
        <input
          type="email"
          id="email"
          className="rounded border w-full py-1 px-2 font-normal"
          {...register("email", { required: "This field is required" })}
        />
        {errors?.email && (
          <span className="text-red-500">{errors?.email.message}</span>
        )}
      </label>

      <label
        htmlFor="password"
        className="text-gray-700 font-bold text-sm flex-1"
      >
        Password
        <input
          type="password"
          id="password"
          className="rounded border w-full py-1 px-2 font-normal"
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters long",
            },
          })}
        />
        {errors?.password && (
          <span className="text-red-500">{errors?.password.message}</span>
        )}
      </label>

      <label
        htmlFor="confirm-password"
        className="text-gray-700 font-bold text-sm flex-1"
      >
        Confirm Password
        <input
          type="password"
          id="confirm-password"
          className="rounded border w-full py-1 px-2 font-normal"
          {...register("password", {
            validate: (val) => {
              if (!val) {
                return "This field is required";
              } else if (watch("password") !== val) {
                return "Your passwords  did not match";
              }
            },
          })}
        />
        {errors?.confirmPassword && (
          <span className="text-red-500">
            {errors?.confirmPassword.message}
          </span>
        )}
      </label>
      <span>
        <button
          type="submit"
          className="bg-blue-600 text-100 text-white p-2 font-bold hover:bg-blue-500 text-xl"
        >
          Create Account
        </button>
      </span>
    </form>
  );
}

export default Register;
