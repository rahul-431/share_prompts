const layout = ({ children }) => {
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient">Create Post</span>
      </h1>

      <p className="desc text-left max-w-md">
        Create and share amazing prompts and tools, and let your imagination run
        wild with any AI-powered platform
      </p>
      {children}
    </section>
  );
};

export default layout;
