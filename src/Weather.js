function Weather() {
  return (
    <div className="w-full">
      <div className="w-3/5 mx-auto mt-14">
        <h1 className="text-6xl mx-auto text-center">
          So...
          <br /> How is the Weather?
        </h1>
        <p className="text-2xl text-center mt-10">
          The ultimate website that provides exact weather to talk about when
          you got nothing else to talk about
        </p>
      </div>

      <form className="h-8 border-box w-3/5 mx-auto mt-10 flex">
        <input
          className="w-4/5 mr-auto"
          placeholder="Enter desired location"
        ></input>
        <button className="bg-white w-1/6">search</button>
      </form>
      <div className=""></div>
    </div>
  );
}

export default Weather;
