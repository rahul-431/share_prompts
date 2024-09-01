import ToolCard from "./ToolCard";

const ToolCardList = ({ handleTagClick, data }) => {
  return (
    <div className="my-8 flex flex-col w-full gap-4" id="tools">
      <h1 className="text-xl font-normal text-left">Latest shared AI Tools</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 justify-around gap-6 w-full">
        {data.map((post) => (
          <ToolCard
            key={post._id}
            post={post}
            handleTagClick={handleTagClick}
          />
        ))}
      </div>
    </div>
  );
};

export default ToolCardList;
