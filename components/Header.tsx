import Image from "next/image";
import { MagnifyingGlassIcon, UserCircleIcon } from "@heroicons/react/20/solid";

function Header() {
  return (
    <header>
      <div className="flex flex-col md:flex-row items-center p-5 bg-blue-400/10 rounded-b-l">
        <Image
          src="/Trello_logo.png"
          alt="Trello Logo"
          width={150}
          height={50}
          className="w-44 md:w-56 pb-10 md:pb-0"
        />

        <div className="flex items-center space-x-4 flex-1 justify-end w-full">
          {/* Search Box */}
          <form className="flex items-center space-x-4 bg-white rounded-md p-2 shadow-md flex-1 md:flex-initial">
            <MagnifyingGlassIcon className="h-6 w-6 text-gray-500" />
            <input
              type="text"
              placeholder="Search"
              className="flex-1 outline-none p-2"
            />
            <button hidden>Search</button>
          </form>
          {/* Avatar */}
          <UserCircleIcon className="h-16 w-16 text-blue-500" />
        </div>
      </div>
    </header>
  );
}

export default Header;
