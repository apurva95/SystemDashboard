import React, { useState, useEffect, useCallback } from 'react';

const SearchScreen = ({ onUniqueIdChange }) => {
    const [uniqueId, setUniqueId] = useState('');
    const [isValid, setIsValid] = useState(false);
  
    const handleSearch = async () => {
      const response = await fetch(`/api/checkUniqueId?uniqueId=${uniqueId}`);
      const data = await response.json();
      setIsValid(data.exists);
      if (data.exists) {
        onUniqueIdChange(uniqueId);
      }
    };
  
    return (
      <div>
        <input
          type="text"
          value={uniqueId}
          onChange={(e) => setUniqueId(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
        {isValid && <div>Valid ID, redirect to the second screen</div>}
      </div>
    );
  };
  
  export default SearchScreen;