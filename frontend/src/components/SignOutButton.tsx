import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";

function SignOutButton() {
  const queryClient = useQueryClient();

  const { showToast } = useAppContext();

  const mutation = useMutation(apiClient.logout, {
    onSuccess: async  ()=> {
      await queryClient.invalidateQueries("validateToken");
      showToast({
        message: "Logout Successfully",
        type: "SUCCESS",
      });
    },
    onError: function (error: Error) {
      showToast({
        message: error.message,
        type: "ERROR",
      });
    },
  });

  const logoutHandler = () => {
    mutation.mutate();
  };

  return (
    <button
      onClick={logoutHandler}
      className="text-blue-600 px-3 py-1 font-bold bg-white hover:bg-gray-100"
    >
      Sign out
    </button>
  );
}

export default SignOutButton;
