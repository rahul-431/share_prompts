import Link from "next/link";

const Footer = () => {
  return (
    <div className="w-full flex sm:flex-row flex-col gap-2 justify-between py-2 items-center mt-5 mb-2">
      <p className="text-lg">@Copyright 2024 All Rights are reserved</p>
      <p className="text-lg">
        Developed by{" "}
        <Link
          target="_blank"
          href="https://rahulmijar.vercel.app/#/projects"
          className="blue_gradient"
        >
          Rahul Mijar
        </Link>
      </p>
    </div>
  );
};

export default Footer;
