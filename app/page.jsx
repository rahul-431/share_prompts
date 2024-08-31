import Feed from "@/components/Feed";
import { Suspense } from "react";

const Home = () => {
  return (
    <section className="flex flex-col flex-center w-full">
      <h1 className="head_text text-center">
        Discover & Share <br className="max-md:hidden" />{" "}
        <span className="orange_gradient text-center">
          AI-Powered Prompts and Tools
        </span>
      </h1>
      <p className="desc text-center">
        PromptGen is an open-source AI prompting tool for modern world to
        discover, create and share creative propmts
      </p>
      <Suspense fallback={<p>Loading...</p>}>
        <Feed />
      </Suspense>
    </section>
  );
};

export default Home;
