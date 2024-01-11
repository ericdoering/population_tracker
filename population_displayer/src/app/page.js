"use client";

import { RenderNYCGraph } from "../app/components/RenderNYCGraph";
import { RenderChicagoGraph } from "../app/components/RenderChicagoGraph"
import { RenderSanFranciscoGraph } from "./components/RenderSanFranciscoGraph";

const Home = () => {
  return (
    <>
      <div className="flex items-center justify-center">
        <RenderSanFranciscoGraph />
      </div>
    </>
  )
};

export default Home;

