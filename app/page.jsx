import Feed from "@components/Feed";
import React from "react";

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center orange_gradient">
        Create and Manage
        <br className="max-md:hidden" />
        <span className="text-center text-black"> your homework and activities</span>
      </h1>
      <p className="desc text-center">
        add requiered priority to complete each task
      </p>
      <Feed/>
    </section>
  );
};

export default Home;
