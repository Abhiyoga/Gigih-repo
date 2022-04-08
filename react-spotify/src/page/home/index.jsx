import React from 'react'
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="App flex flex-col min-h-screen">
        <h1>
            Welcome
        </h1>
        <div className='text-xs bg-black py-3 text-white'>
            You'll Need to Log In First
            <Link to="/create-playlist">
                Log In
            </Link>
        </div>
    </div>
  );
}

export default Home; 