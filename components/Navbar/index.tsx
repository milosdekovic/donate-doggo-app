import Link from "next/link";
import DonationCart from "../Cart";

const Navbar = () => {
  return (
    <nav className="flex bg-[#242424] sticky top-0 z-10 justify-between p-5 font-semibold text-white shadow-md">
      <div className="flex justify-between mx-auto w-full max-w-5xl">
        <Link href={"/"}>
          <h1 className="lg:text-3xl text-2xl">Donate Doggo</h1>
        </Link>
        <DonationCart />
      </div>
    </nav>
  );
};

export default Navbar;
