/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const date = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const dp = [25, 26, 24, 30, 38, 33, 30];

const mg = [33, 26, 20, 21, 26, 30, 32];

const celsius = [33, 30, 25, 36, 31, 30, 32];

const water = [27, 32, 25, 36, 31, 30, 28];

const options = {
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      grid: {
        display: false,
      },
    },
  },
  interaction: {
    intersect: false,
  },
  plugins: {
    htmlLegend: {
      // ID of the container to put the legend in
      containerID: 'legend-container',
    },
    legend: {
      display: false,
    },
  },
};

interface ChartProps {
  loRaData: any;
  dataLabel: string;
}

// const getOrCreateLegendList = (chart: any, id: any) => {
//   const legendContainer = document.getElementById(id);
//   let listContainer = legendContainer?.querySelector('ul');

//   if (!listContainer) {
//     listContainer = document.createElement('ul');
//     listContainer.style.display = 'flex';
//     listContainer.style.flexDirection = 'row';
//     listContainer.style.margin = '0';
//     listContainer.style.padding = '0';

//     legendContainer?.appendChild(listContainer);
//   }

//   return listContainer;
// };

// const htmlLegendPlugin = {
//   id: 'htmlLegend',
//   afterUpdate(chart: any, args: any, options: any) {
//     const ul = getOrCreateLegendList(chart, options.containerID);

//     // Remove old legend items
//     while (ul.firstChild) {
//       ul.firstChild.remove();
//     }

//     // Reuse the built-in legendItems generator
//     const items = chart.options.plugins.legend.labels.generateLabels(chart);

//     items.forEach((item: any) => {
//       const li = document.createElement('li');
//       li.style.alignItems = 'center';
//       li.style.cursor = 'pointer';
//       li.style.display = 'flex';
//       li.style.flexDirection = 'row';
//       li.style.marginLeft = '10px';

//       li.onclick = () => {
//         const { type } = chart.config;
//         if (type === 'pie' || type === 'doughnut') {
//           // Pie and doughnut charts only have a single dataset and visibility is per item
//           chart.toggleDataVisibility(item.index);
//         } else {
//           chart.setDatasetVisibility(item.datasetIndex, !chart.isDatasetVisible(item.datasetIndex));
//         }
//         chart.update();
//       };

//       // Color box
//       const boxSpan = document.createElement('span');
//       boxSpan.style.background = item.fillStyle;
//       boxSpan.style.borderColor = item.strokeStyle;
//       boxSpan.style.borderWidth = item.lineWidth + 'px';
//       boxSpan.style.display = 'inline-block';
//       boxSpan.style.height = '20px';
//       boxSpan.style.marginRight = '10px';
//       boxSpan.style.width = '20px';

//       // Text
//       const textContainer = document.createElement('p');
//       textContainer.style.color = item.fontColor;
//       textContainer.style.margin = '0';
//       textContainer.style.padding = '0';
//       textContainer.style.textDecoration = item.hidden ? 'line-through' : '';

//       const text = document.createTextNode(item.text);
//       textContainer.appendChild(text);

//       li.appendChild(boxSpan);
//       li.appendChild(textContainer);
//       ul.appendChild(li);
//     });
//   },
// };

const LineChart: React.FC<ChartProps> = (props) => {
  const { loRaData, dataLabel } = props;
  const [chartData, setChartData] = useState({
    labels: date,
    datasets: [
      {
        // label: dataLabel,
        label: 'Temperature-S-2',
        data: dp,
        fill: false,
        // backgroundColor: 'rgba(83,92,232,0.2)',
        borderColor: '#535CE8',
      },
      {
        label: 'Temperature-S-3',
        data: mg,
        borderColor: '#FFD5C3',
      },
      {
        label: 'Temperature-S-4',
        data: celsius,
        borderColor: '#F84B01',
      },
      {
        label: 'Temperature-S-5',
        data: water,
        borderColor: '#59DBDD',
      },
    ],
  });

  // useEffect(() => {
  //   setChartData({
  //     labels: date,
  //     datasets: [
  //       {
  //         label: dataLabel,
  //         data: loRaData,
  //         fill: true,
  //         // backgroundColor: 'rgba(83,92,232,0.2)',
  //         borderColor: '#535CE8',
  //       },
  //       // {
  //       //   label: 'label2',
  //       //   data: data2,
  //       // },
  //     ],
  //   });
  // }, [loRaData]);

  return (
    <div>
      <Line
        data={chartData}
        options={options}
        //  plugins={[htmlLegendPlugin]}
      />
      <div id="label-container"></div>
    </div>
  );
};

export default LineChart;
