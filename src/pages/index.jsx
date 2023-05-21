import React, { useState } from 'react';
import axios from 'axios';

const Index = () => {
  const [ipAddress, setIpAddress] = useState('');
  const [options, setOptions] = useState('');
  const [output, setOutput] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/', {
        ip: ipAddress,
        options: options
      });
      setOutput(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Nmap !!!</h1>
      <a className="text-blue-500 underline mb-4" href="/history">History</a>
      <a className="text-blue-500 underline mb-4 ml-4" href="/details">Details</a>
      <form onSubmit={handleSubmit} className="mb-4">
        <label className="block mb-2">
          <span className="text-gray-700">IP Address:</span>
          <input
            type="text"
            value={ipAddress}
            onChange={(e) => setIpAddress(e.target.value)}
            className="border border-gray-300 rounded-md p-2 mt-1 w-full"
          />
        </label>
        <label className="block mb-2">
          <span className="text-gray-700">Options:</span>
          <input
            type="text"
            value={options}
            onChange={(e) => setOptions(e.target.value)}
            className="border border-gray-300 rounded-md p-2 mt-1 w-full"
          />
        </label>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Run Nmap
        </button>
      </form>
      <pre className="bg-gray-200 p-4">{output}</pre>
    </div>
  );
};

export default Index;


