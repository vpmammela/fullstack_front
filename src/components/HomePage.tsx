import { Link } from "react-router-dom";

export const HomePage = () => {
  return (
    <div className="w-screen bg-slate-400 flex items-center justify-center">
      HOME
    </div>
  );
};

export const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4 text-white">
      <Link to="/" className="mr-4">Home</Link>
      <Link to="/reviews/1" className="mr-4">Review Info</Link>
      <Link to="/continuous" className="mr-4">Continuous Review</Link>
      <Link to="/semester" className="mr-4">Semester Review</Link>
      {/* Add more links when needed OR delete this later if no use*/}
    </nav>
  );
};