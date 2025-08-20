import { Link } from "react-router-dom";
import Search from "./Search";

const MainCategories = () => {
  return (
    <div className="hidden md:flex bg-white text-black rounded-3xl xl:rounded-full p-4 shadow-lg items-center justify-center gap-8">
      {/* links */}
      <div className="flex-1 flex items-center justify-between flex-wrap">
        <Link
          to="/posts"
          className="acpBlue text-white rounded-full px-4 py-2"
        >
          All Posts
        </Link>
        <Link
          to="/posts?cat=Health"
          className="hover:bg-blue-50 rounded-full px-4 py-2"
        >
          Health
        </Link>
        <Link
          to="/posts?cat=Fitness"
          className="hover:bg-blue-50 rounded-full px-4 py-2"
        >
          Fitness
        </Link>
        <Link
          to="/posts?cat=Rehab"
          className="hover:bg-blue-50 rounded-full px-4 py-2"
        >
          Rehab
        </Link>
        <Link
          to="/posts?cat=Performance"
          className="hover:bg-blue-50 rounded-full px-4 py-2"
        >
          Performance
        </Link>
        <Link
          to="/posts?cat=Mindset"
          className="hover:bg-blue-50 rounded-full px-4 py-2"
        >
          Mindest
        </Link>
      </div>
      <span className="text-xl font-medium">|</span>
      {/* search */}
      <Search/>
    </div>
  );
};

export default MainCategories;
