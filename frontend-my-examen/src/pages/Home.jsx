import React from 'react';
import palm1Image from '../assets/palm1.png';
import palm2Image from '../assets/palm2.png';

const Home = () => {
  return (
    <div className="flex sm:justify-between">
      <img src={palm1Image} alt="Palm 1" className="h-0 w-auto sm:w-1/4 sm:h-auto sm:pt-20  md:mb-0 " />
      <div>
        <h1 className="text-center mt-10 sm:mt-80 text-6xl font-bold  bg-gradient-to-l from-teal-200 to-slate-100 bg-clip-text text-transparent pr-2">Welcome to my Portfolio</h1>
        <p className="mt-4">To see what skills i have, Signup and login</p>
        <p>enjoy</p>
      </div>
      <img src={palm2Image} alt="Palm 1" className="h-0 w-auto sm:w-1/4 sm:h-auto sm:pt-20  md:mb-0 "
      />
    </div>
  );
};

export default Home;
