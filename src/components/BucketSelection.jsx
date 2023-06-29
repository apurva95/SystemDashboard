import React, { useState } from 'react';

const BucketsSelection = ({ onSearch, uniqueId }) => {
  const [selectedLevels, setSelectedLevels] = useState([]);
  const [selectedIntervals, setSelectedIntervals] = useState([]);

  const handleLevelChange = (level) => {
    const updatedLevels = selectedLevels.includes(level)
      ? selectedLevels.filter((l) => l !== level)
      : [...selectedLevels, level];

    setSelectedLevels(updatedLevels);
    onSearch({ selectedLevels: updatedLevels, selectedIntervals, registrationId: uniqueId });
  };

  const handleIntervalChange = (interval) => {
    const updatedIntervals = selectedIntervals.includes(interval)
      ? selectedIntervals.filter((i) => i !== interval)
      : [...selectedIntervals, interval];

    setSelectedIntervals(updatedIntervals);
    onSearch({ selectedLevels, selectedIntervals: updatedIntervals });
  };

  const generateTimeIntervals = () => {
    const intervals = [];
    const startTime = new Date();
    startTime.setHours(0, 0, 0, 0);
  
    for (let i = 0; i < 12; i++) {
      const intervalStart = new Date(startTime.getTime() + i * 2 * 60 * 60 * 1000);
      const intervalEnd = new Date(intervalStart.getTime() + 2 * 60 * 60 * 1000);
      const intervalLabel = `${formatTime(intervalStart)} - ${formatTime(intervalEnd)}`;
      const intervalValue = `${formatTime(intervalStart)} - ${formatTime(intervalEnd)}`.toString();
  
      intervals.push({
        label: intervalLabel,
        value: intervalValue,
      });
    }
  
    return intervals;
  };
  
  const formatTime = (date) => {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const timeIntervals = generateTimeIntervals();

  return (
    <div>
      <h3>Time Range:</h3>
      {timeIntervals.map((interval) => (
        <label key={interval.value}>
          <input
            type="checkbox"
            checked={selectedIntervals.includes(interval.value)}
            onChange={() => handleIntervalChange(interval.value)}
          />
          {interval.label}
        </label>
      ))}

      <h3>Level:</h3>
      <label>
        <input
          type="checkbox"
          checked={selectedLevels.includes('Information')}
          onChange={() => handleLevelChange('Information')}
        />
        Information
      </label>
      <label>
        <input
          type="checkbox"
          checked={selectedLevels.includes('Warning')}
          onChange={() => handleLevelChange('Warning')}
        />
        Warning
      </label>
      <label>
        <input
          type="checkbox"
          checked={selectedLevels.includes('Error')}
          onChange={() => handleLevelChange('Error')}
        />
        Error
      </label>
      <label>
        <input
          type="checkbox"
          checked={selectedLevels.includes('Debug')}
          onChange={() => handleLevelChange('Debug')}
        />
        Debug
      </label>
      <label>
        <input
          type="checkbox"
          checked={selectedLevels.includes('Critical')}
          onChange={() => handleLevelChange('Critical')}
        />
        Critical
      </label>
    </div>
  );
};

export default BucketsSelection;
