import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Details = () => {
  const [loading, setLoading] = useState(true);
  const [request, setRequest] = useState(null);

  useEffect(() => {
    const fetchLastRequest = async () => {
      try {
        const response = await axios.get('/api/requests/last');
        setRequest(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching last request:', error);
        setLoading(false);
      }
    };

    fetchLastRequest();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      {loading ? (
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      ) : request ? (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Details</h2>
          <div>
            <p className="font-medium">Options:</p>
            <p>{request.options}</p>
          </div>
          <div>
            <p className="font-medium">IP Address:</p>
            <p>{request.ipAddress}</p>
          </div>
          <div>
            <p className="font-medium">Output:</p>
            <p>{request.output}</p>
          </div>
          <div>
            <p className="font-medium">Created At:</p>
            <p>{request.createdAt}</p>
          </div>
        </div>
      ) : (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Details</h2>
          <p>No data available</p>
        </div>
      )}
    </div>
  );
};

export default Details;
