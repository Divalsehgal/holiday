import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";

type Props = {};

function Header({}: Props) {
  const { isLoggedIn } = useAppContext();
  return (
    <div className="bg-blue-800 py-6">
      <div className="container mx-auto flex justify-between items-center ">
        <span className="text-white font-bold tracking-tight text-3xl">
          <Link to="/">Holidays</Link>
        </span>

        <span className="flex space-x-2">
          {isLoggedIn ? (
            <>
              <Link
                to="/my-booking"
                className="flex bg-white items-center text-blue-600 px-3 font-bold hover:bg-gray-100"
              >
                My Bookings
              </Link>
              <Link
                to="/my-hotels"
                className="flex bg-white items-center text-blue-600 px-3 font-bold hover:bg-gray-100"
              >
                My hotels
              </Link>
              <button>Sign out</button>
            </>
          ) : (
            <Link
              to="/sign-in"
              className="flex bg-white items-center text-blue-600 px-3 font-bold hover:bg-gray-100"
            >
              Sign In
            </Link>
          )}
        </span>
      </div>
    </div>
  );
}

export default Header;
