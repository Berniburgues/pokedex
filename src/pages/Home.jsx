import { React, useState, useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import { Navigate } from 'react-router-dom';

const Home = () => {
  const [nameValue, setNameValue] = useState('');
  const [nameError, setNameError] = useState(null);
  const { user, saveUser } = useContext(UserContext);

  const handleChange = (e) => {
    const newNameValue = e.target.value;

    setNameValue(newNameValue);
    if (newNameValue === '') setNameError('Name is required');
    else if (!/^[A-Z][a-z]{1,}(?: [a-z]+)*$/.test(newNameValue))
      setNameError(
        'Enter a name with only letters and spaces, at least 2 letters long, and with the first letter capitalized',
      );
    else setNameError(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nameError) {
      saveUser(nameValue);
    }
  };

  return (
    <div className="h-screen bg-gradient-to-b from-slate-800 to-black flex flex-col justify-center">
      <header>
        <div className="text-center">
          <img
            src="/PokedexHome.png"
            alt="Pokedex"
            className="mx-auto mb-10 w-11/12 sm:w-3/4"
          />
          <h1 className="text-red-600 text-4xl sm:text-6xl font-semibold mb-1">
            ¡Hello Trainer!
          </h1>

          <p className="text-white text-lg sm:text-xl mb-6 italic">
            Type your name to start
          </p>
          <form
            onSubmit={handleSubmit}
            className="flex flex-row justify-center items-center gap-1"
          >
            <input
              type="text"
              className="border border-white p-2 w-1/2 sm:w-2/5 md:w-1/3 lg:w-1/4 xl:w-1/5 rounded-md text-black font-medium"
              value={nameValue}
              onChange={handleChange}
              placeholder="Your name..."
            />
            <button
              type="submit"
              className="p-2 px-5 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-md"
              disabled={!nameValue || nameError}
            >
              Start!
            </button>
          </form>
          <div className="h-5">
            {nameError && (
              <p className="text-red-600 text-center text-xs bottom-0 w-full">
                {nameError}
              </p>
            )}
          </div>
        </div>
        {user && <Navigate to="/pokedex" replace />}
      </header>
      <footer className="fixed bottom-0 w-screen">
        <img
          src="./Footer.png"
          alt="footer"
          className="w-screen max-h-screen object-cover lg:h-20"
        />
      </footer>
    </div>
  );
};

export default Home;
