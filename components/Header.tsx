import Image from "next/image";

function Header() {
  return (
    <header>
      <Image
        src="/trello.svg"
        alt="Trello Logo"
        width={300}
        height={100}
        className="w-44 md:w-56 pb-10 md:pb-0 object-contain"
      />

      <div>
        {/* Search Box */}
        {/* Avatar */}
      </div>
    </header>
  );
}

export default Header;
