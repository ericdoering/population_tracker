"use client";

import { RenderNYCGraph } from "../app/components/RenderNYCGraph";
import { RenderChicagoGraph } from "../app/components/RenderChicagoGraph"
import { RenderSanFranciscoGraph } from "./components/RenderSanFranciscoGraph";

const Home = () => {
  return (
    <>
      <div>
      <div className="fixed top-20 left-40 transform -translate-x-1/2 text-center">
        <button className="bg-blue-900 block mb-8 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-md shadow-2xl shadow-black">New York City, NY</button>
        <button className="bg-blue-900 block mb-8 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-md shadow-2xl shadow-black">Chicago, IL</button>
        <button className="bg-blue-900 block mb-8 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-md shadow-2xl shadow-black">San Francisco, CA</button>
      <div>
            <RenderNYCGraph />
            {/* <RenderChicagoGraph /> */}
            {/* <RenderSanFranciscoGraph /> */}
          </div>
        </div>
      </div>
    </>
  )
};

export default Home;

