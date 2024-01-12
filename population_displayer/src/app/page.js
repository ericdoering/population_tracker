"use client";

import { RenderNYCGraph } from "../app/components/RenderNYCGraph";
import { RenderChicagoGraph } from "../app/components/RenderChicagoGraph"
import { RenderSanFranciscoGraph } from "./components/RenderSanFranciscoGraph";

const Home = () => {
  return (
    <>
      <div>
        <div>
          <div>
            {/* <RenderNYCGraph /> */}
            {/* <RenderChicagoGraph /> */}
            <RenderSanFranciscoGraph />
          </div>
        </div>
      </div>
    </>
  )
};

export default Home;

