"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, Suspense } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { useRouter } from "next/navigation";
const Nav = () => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);
  const [toggle, setToggle] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const setProvider = async () => {
      const response = await getProviders();
      setProviders(response);
    };
    setProvider();
  }, []);

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-1 flex-center">
        <Image
          src="/assets/icons/promptIC.png"
          width={60}
          height={60}
          alt="PromptGen logo"
          className="object-contain"
        />
        <p className="text-2xl font-bold">PromptGen</p>
      </Link>

      {/* Desktop menu */}
      <Suspense fallback={<p>Loading...</p>}>
        <div className="sm:flex hidden items-center gap-4">
          {session?.user ? (
            <div className="flex gap-3 md:gap-5">
              <Link className="black_btn text-lg" href="/create_post">
                Create Post
              </Link>
              <button
                className="outline_btn text-lg"
                onClick={() => {
                  signOut();
                  router.push("/");
                }}
                type="button"
              >
                Sign out
              </button>
              <Link className="" href={`/profile?id=${session?.user.id}`}>
                <Image
                  src={session?.user.image}
                  height={36}
                  width={36}
                  className="rounded-full"
                  alt="profile"
                  title="Profile"
                />
              </Link>
            </div>
          ) : (
            <>
              {providers &&
                Object.values(providers).map((item) => (
                  <button
                    type="button"
                    onClick={() => signIn(item.id)}
                    key={item.name}
                    className="black_btn text-lg"
                  >
                    Sign In
                  </button>
                ))}
            </>
          )}
        </div>
      </Suspense>

      {/* mobile navigation */}
      <Suspense fallback={<p>Loading...</p>}>
        <div className="sm:hidden flex relative gap-4 items-center">
          {session?.user ? (
            <div className="flex">
              <Image
                src={session?.user.image}
                height={36}
                width={36}
                className="rounded-full"
                alt="profile"
                title="Profile"
                onClick={() => setToggle((prev) => !prev)}
              />
              {toggle && (
                <div className="dropdown">
                  <Link
                    href={`/profile?id=${session?.user.id}`}
                    className="dropdown_link"
                    onClick={() => setToggle(false)}
                  >
                    My Profile
                  </Link>
                  <Link
                    href="/create_post"
                    className="dropdown_link"
                    onClick={() => setToggle(false)}
                  >
                    Create Post
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      signOut();
                      setToggle(false);
                    }}
                    className="black_btn"
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              {providers &&
                Object.values(providers).map((item) => (
                  <button
                    type="button"
                    onClick={() => signIn(item.id)}
                    key={item.name}
                    className="black_btn"
                  >
                    Sign In
                  </button>
                ))}
            </>
          )}
        </div>
      </Suspense>
    </nav>
  );
};

export default Nav;
