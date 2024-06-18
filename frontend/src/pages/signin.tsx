import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
export type SignInProps = {
  email: string;
  password: string;
};

function Signin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { showToast } = useAppContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInProps>();

  const mutation = useMutation(apiClient.sigin, {
    onSuccess: async function () {
      showToast({
        message: "Login Successfully",
        type: "SUCCESS",
      });
      await queryClient.invalidateQueries("validateToken");

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
      <h2 className="heading"> Sign In</h2>
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
      <span className="flex justify-between items-center gap-10">
        <span className="text-sm">
          Not Registerd ?
          <Link className=" ml-2 underline" to="/register">
            Create an account here{" "}
          </Link>
        </span>
        <button
          type="submit"
          className="bg-blue-600 text-100 text-white p-2 font-bold hover:bg-blue-500 text-xl"
        >
          Sign In
        </button>
      </span>
    </form>
  );
}

export default Signin;
