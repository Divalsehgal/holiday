import { Link } from "react-router-dom";

type Props = {};

function Header({}: Props) {
  return (
    <div className="bg-blue-800 py-6">
      <div className="container mx-auto flex justify-between items-center ">
          <span className="text-white font-bold tracking-tight text-3xl">
            <Link to="/">Holidays</Link>
          </span>
  
          <span className="flex space-x-2">
            <Link
              to="/sign-in"
              className="flex bg-white items-center text-blue-600 px-3 font-bold hover:bg-gray-100"
            >
              Sign In
            </Link>
          </span>
      </div>
    </div>
  );
}

export default Header;
