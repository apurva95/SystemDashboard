import React, { useState } from 'react';
import { Alert, Space } from 'antd'

function SearchLogs({uniqueId, logOnLoad}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [logs, setLogs] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await fetch(`https://localhost:7135/api/searchLogs?searchTerm=${searchTerm}&uniqueId=${uniqueId}`);;
      const logsData = await response.json();
      setLogs(logsData);
      debugger;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      <button onClick={handleSearch}>Search</button>
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