"use client";

import { RenderNYCGraph } from "../app/components/RenderNYCGraph";
import { RenderChicagoGraph } from "../app/components/RenderChicagoGraph"

const Home = () => {
  return (
    <>
      <div className="flex items-center justify-center">
        <h1></h1>
        <RenderChicagoGraph />
      </div>
    </>
  )
};

export default Home;

