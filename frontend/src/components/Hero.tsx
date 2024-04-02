
type Props = {};

function Hero({}: Props) {
  return (
    <div className="bg-blue-800 pb-16">
      <div className="container mx-auto flex flex-col gap-2">
        <h1 className="text-5xl font-bold text-white">Find your next stay</h1>
        <p className="text-2xl text-white">
          Search for low prices on hotels for your dream location...
        </p>
      </div>
    </div>
  );
}

export default Hero;
