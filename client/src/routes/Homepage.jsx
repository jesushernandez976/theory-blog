import { Link } from "react-router-dom";
import MainCategories from "../components/MainCategories";
import FeaturedPosts from "../components/FeaturedPosts";
import PostList from "../components/PostList";
import Button2 from "../components/Button2";

const Homepage = () => {
  return (
    <div className="mt-4 flex flex-col gap-4">
      {/* BREADCRUMB */}

      {/* INTRODUCTION */}
      <div className="flex items-center justify-between">
        {/* titles */}
        <div className="">
          <h1 className=" titleAcp text-2xl md:text-5xl lg:text-6xl pt-5 pb-2">
            FORM THEORY BLOG
          </h1>
          <p className="mt-8 text-white text-md md:text-xl pb-4">
            Here, we dive into everything related to chiropractic care, injury
            rehab, athletic performance, mobility, wellness, and recovery.
            Whether you are an athlete, recovering from an injury, or simply
            looking to improve your movement and feel your best, this blog is
            your go-to space for insights, tips, and expert advice from our team
            at the facility.
          </p>
        </div>
        {/* animated button */}
        <Link to="write" className="hidden md:block relative pt-20">
          <Button2 />
        </Link>
      </div>
      {/* CATEGORIES */}
      <MainCategories />
      {/* FEATURED POSTS */}
      <FeaturedPosts />
      {/* POST LIST */}
      <div className="">
        <h1 className="my-8 text-2xl text-white">Recent Posts</h1>
        <PostList />
      </div>
    </div>
  );
};

export default Homepage;
