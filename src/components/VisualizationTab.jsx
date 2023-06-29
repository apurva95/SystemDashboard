import React, { useEffect, useState } from 'react';
import { Pie, G2, Histogram } from '@ant-design/plots';

const VisualizationTab = ({uniqueId}) => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetchLogs();
  }, []);

  const { registerTheme } = G2;
  registerTheme('custom-theme', {
    colors10: [
      '#025DF4',
      '#DB6BCF',
      '#2498D1',
      '#BBBDE6',
      '#4045B2',
      '#21A97A',
      '#FF745A',
      '#007E99',
      '#FFA8A8',
      '#2391FF',
    ],
    colors20: [
      '#025DF4',
      '#DB6BCF',
      '#2498D1',
      '#BBBDE6',
      '#4045B2',
      '#21A97A',
      '#FF745A',
      '#007E99',
      '#FFA8A8',
      '#2391FF',
      '#FFC328',
      '#A0DC2C',
      '#946DFF',
      '#626681',
      '#EB4185',
      '#CD8150',
      '#36BCCB',
      '#327039',
      '#803488',
      '#83BC99',
    ],
  });
  const data = [
    {
      type: '分类一',
      value: 27,
    },
    {
      type: '分类二',
      value: 25,
    },
    {
      type: '分类三',
      value: 18,
    },
    {
      type: '分类四',
      value: 15,
    },
    {
      type: '分类五',
      value: 10,
    },
    {
      type: '其他',
      value: 5,
    },
  ];
  const config = {
    appendPadding: 10,
    data,
    angleField: 'value',
    colorField: 'type',
    radius: 0.8,
    label: {
      type: 'inner',
      offset: '-10%',
      content: '{percentage}',
    },
    interactions: [
      {
        type: 'element-active',
      },
    ],
    theme: 'custom-theme',
  };

  const fetchLogs = async () => {
    try {
      const response = await fetch(`https://localhost:7135/api/visualisationLogs?uniqueId=${uniqueId}`);
      const data = await response.json();
      debugger;
      setLogs(data);
    } catch (error) {
      console.error('Error fetching logs:', error);
    }
  };

  const extractLogLevels = () => {
    const levels = logs.map((log) => log.Level);
    return [...new Set(levels)];
  };

  const countLogsByLevel = (level) => {
    return logs.filter((log) => log.Level === level).length;
  };

  const generateChartData = () => {
    const logLevels = extractLogLevels();
    const data = {
      labels: logLevels,
      datasets: [
        {
          label: 'Number of Messages',
          data: logLevels.map((level) => countLogsByLevel(level)),
          backgroundColor: [
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 99, 132, 0.6)',
            'rgba(255, 205, 86, 0.6)',
          ],
        },
      ],
    };
    return data;
  };

  return (
    <div>
      <Pie {...config} />;
      <div>
        <h3>Bar Chart</h3>
           {/* <Bar data={generateChartData()} /> */}
         </div>
         {/* <div>
           <h3>Pie Chart</h3>
           <Pie data={generateChartData()} />
         </div>
         <div>
           <h3>Line Chart</h3>
           <Line data={generateChartData()} />
         </div> */}
       </div>
     );
   };

   export default VisualizationTab;