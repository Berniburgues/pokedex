import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';

const PokedexLayout = () => {
  const { removeUser } = useContext(UserContext);
  return (
    <>
      <header className="bg-gradient-to-b from-black to-slate-900">
        <div>
          <img
            src="/PokedexHome.png"
            alt="pokedex"
            className="mx-auto mb-10 w-11/12 sm:w-3/4"
          />
        </div>
        <div className="flex justify-center">
          <button
            className="w-1/8 md:w-auto h-10 px-2 py-2 bg-red-600 text-white text-base font-semibold rounded-lg shadow-md hover:bg-red-500 focus:outline-none focus:bg-red-500 mb-5 mt-2"
            onClick={removeUser}
          >
            Log out
          </button>
        </div>
        <Outlet />
      </header>
      <footer>
        <div>
          <img
            src="/Footer.png"
            alt="footer"
            className="w-screen max-h-screen object-cover lg:h-20"
          />
        </div>
      </footer>
    </>
  );
};

export default PokedexLayout;
