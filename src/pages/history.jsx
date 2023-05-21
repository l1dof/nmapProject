import React, { useState, useEffect } from 'react';
import axios from 'axios';

const History = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/requests');
      setRequests(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch requests:', error);
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">History</h1>
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        requests.map((request) => (
          <div key={request._id} className="bg-gray-200 p-4 mb-4">
            <p className="mb-2">
              <span className="font-bold">Options:</span> {request.options}
            </p>
            <p className="mb-2">
              <span className="font-bold">IP Address:</span> {request.ipAddress}
            </p>
            <p className="mb-2">
              <span className="font-bold">Output:</span> {request.output}
            </p>
            <p className="mb-2">
              <span className="font-bold">Created At:</span> {request.createdAt}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default History;

