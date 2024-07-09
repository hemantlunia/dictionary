import React, { useState } from 'react';
import axios from 'axios';

const Search = () => {
  const [input, setInput] = useState('');
  const [definition1, setDefinition1] = useState('');
  const [definition12, setDefinition12] = useState('');
  const [audio, setAudio] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${input}`);
        const data = await response.data;
        setDefinition1(data[0].meanings[0].definitions[0].definition);
        setDefinition12(data[0].meanings[1].definitions[0].definition);
        setAudio(data[0].phonetics[1].audio);
        setInput('');
    } catch (error) {
        console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-red-400 to-pink-300 py-10 px-4">
      <form onSubmit={handleSearch} className="w-full max-w-md flex items-center mb-8 shadow-lg rounded-lg overflow-hidden">
        <input
          type="text"
          className="w-full p-4 text-lg rounded-l-lg outline-none border border-r-0 border-gray-300"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Search for a word..."
        />
        <button type="submit" className="bg-[black] text-white p-4 rounded-r-lg hover:bg-[navy] transition duration-300">
          Search
        </button>
      </form>

      {definition1 && <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Definition : - </h2>
        <p className="text-gray-700 mb-4">{definition1 || "Not Found"}</p>
        <br className='border' />
        <h2 className="text-2xl font-semibold mb-4">Definition : - </h2>
        <p className="text-gray-700 mb-4">{definition12 || "Not Found"}</p>
        
          {audio && <div className="mt-4">
            <audio src={audio} controls className="w-full">
              Your browser does not support the audio element.
            </audio>
          </div>}
        
      </div>}
    </div>
  );
};

export default Search;
