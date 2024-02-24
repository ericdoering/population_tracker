"use client";

export function About({onClose}) {

    const handleOkClick = () => {
        onClose();
      };

  return (
    <div className="about-bg">
        <div>
            <div className="items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                <div className="flex flex-col justify-between p-8 leading-normal text-center">
                    <h5 className="mb-4 text-2xl font-bold tracking-widest subpixel-antialiased text-gray-900 dark:text-white">Population Plotter 👥</h5>
                        <p className="mb-8 font-normal text-gray-700 dark:text-gray-400">
                        Population Plotter is the definitive data visualization resource for urban population data. 
                        It gathers and analyzes the most up-to-date population data from major U.S. cities, 
                        presenting it in a clean, readable, and engaging format. In addition to its intuitive display, 
                        Population Plotter possesses a powerful inbuilt AI Analytics feature that dynamically summarizes population 
                        and cultural trends specific to each city, providing users with comprehensive insights. 
                        Population Plotter is a unique and cutting edge tool to help professionals get the most
                        from their population data.
                        </p>
                    <button className="p-2 bg-green-700 hover:bg-green-500 rounded-md" onClick={handleOkClick}>OK</button>
                </div>
            </div>
        </div>
    </div>
  );
}   
