import React from 'react';
import palm1Image from '../assets/palm1.png';
import palm2Image from '../assets/palm2.png';

const Home = () => {
  return (
    <div className="flex justify-between">
      <img src={palm1Image} alt="Palm 1" className="w-1/4 h-auto pt-20  -mb-96" />
      <div>
        <h1 className="text-center mt-80 text-6xl font-bold  bg-gradient-to-l from-teal-200 to-slate-100 bg-clip-text text-transparent pr-2">Welcome to my Portfolio</h1>
        <p className="mt-4">To see what skills i might have please go to signup</p>
        <p>enjoy</p>
      </div>
      <img src={palm2Image} alt="Palm 1" className="w-1/4 h-auto pt-20  -mb-96"
      />
    </div>
  );
};

export default Home;
