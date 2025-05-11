export const Picture = () => {
  return (
    <div className=" h-[400px]">
      <div className="absolute -z-10 top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 h-[362px] w-[482px] bg-[linear-gradient(to_right,#FFFFFF_1px,transparent_1px),linear-gradient(to_bottom,#FFFFFF_1px,transparent_1px)] bg-[size:60px_60px]" />
      <img
        className="absolute -z-10 top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2"
        width={200}
        height={200}
        src="snake.svg"
      />
    </div>
  );
};
