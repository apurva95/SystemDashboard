import React, { useState } from 'react';
import { Alert, Space } from 'antd'
import BucketSelection from './BucketSelection';

function SearchLogs({uniqueId, logOnLoad}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [logs, setLogs] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await fetch(`/api/searchLogs?searchTerm=${searchTerm}&uniqueId=${uniqueId}`);;
      const logsData = await response.json();
      setLogs(logsData);
      debugger;
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearchBucket = async (requestData) => {
    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });
      if (response.ok) {
        const data = await response.json();
        setLogs(data);
      } else {
        console.error('Search request failed.');
      }
    } catch (error) {
      console.error('Error occurred during search request.', error);
    }
  };

  return (
    <div>
      <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      <button onClick={handleSearch}>Search</button>
      <BucketSelection onSearch={handleSearchBucket} uniqueId={uniqueId} />
      {logs.length > 0 ? (
              logs.map((log) => (
                // <div
                //   className={`alert ${
                //     log.type === 'error' ? 'error' : 'warning'
                //   }`}
                // >
                //   {log.message}
                // </div>
                <Space direction="vertical" style={{ width: '100%' }}>
                  <Alert message={log.message} type={log.level}/>
                </Space>
              ))
            ) : (
              <div className="no-data">No Data</div>
            )}
    </div>
  );
}

export default SearchLogs;