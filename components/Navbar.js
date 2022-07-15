import Image from "next/image";
import Link from "next/link";
import logo from "../public/unsplashDemo.png";
import SearchIcon from "@mui/icons-material/Search";

const Navbar = () => {
  const menu = [
    ["Editional | Home", "/"],
    ["Current Events", "/search/current-events"],
    ["Wallpaper", "/search/wallpapers"],
    ["3D Renders", "/search/3d-renders"],
    ["Textures & Patterns", "/search/textures-patterns"],
    ["Experimental", "/search/experimental"],
    ["Architecture", "/search/architecture"],
    ["Nature", "/search/nature"],
    ["Fashion", "/search/fashion"],
    ["Film", "/search/film"],
  ];

  return (
    <>
      <nav className="">
        <div className="flex ml-1 ">
          <Image src={logo} height={60} width={60} />
          <label className="relative block flex items-center w-80">
            <span className="sr-only">Search</span>
            <span className="absolute flex items-center ml-1">
            <SearchIcon />
            </span>
            <input
              className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder="Search for anything..."
              type="text"
              name="search"
            />
          </label>
        </div>
        <div className="flex items-center">
          {menu.map(([title, url]) => (
            <Link href={url} key={title}>
              <a className="rounded-lg px-3 py-2 text-slate-700 font-medium hover:bg-slate-100 hover:text-slate-900">
                {title}
              </a>
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
