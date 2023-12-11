import React, { useEffect, useRef } from 'react';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

interface ReportData {
  items: [
    {
      id: number;
      note: string;
      inspectionform_id: number;
      createdAt: string;
      value: number;
      title: string;
      inspectionform: {
        createdAt: string;
        user_id: number;
        inspectiontarget_id: number;
        id: number;
        closedAt: string;
        environment_id: number;
        inspectiontype_id: number;
      };
    }
  ];
}
type GroupType = 
  {
  id: number;
  note: string;
  inspectionform_id: number;
  createdAt: string;
  value: number;
  title: string;
  inspectionform: {
    createdAt: string;
    user_id: number;
    inspectiontarget_id: number;
    id: number;
    closedAt: string;
    environment_id: number;
    inspectiontype_id: number;
  };
}


const ChartRaport = ({ reports }: { reports: ReportData }) => {
  const chartRef = useRef<any | null>(null);
    
  useEffect(() => {
    dataparsing()
    const createChart = () => {
      if (chartRef.current) {
        const ctx = chartRef.current.getContext('2d')!;
        if (ctx) {
          const chartInstance = new Chart(ctx, {
            type: 'bar',
            data: {
              labels: ['Puutteellinen', 'Sitoutunut', 'Edelläkävijä', 'ei sovellettavissa'],
              datasets: [
                {
                  label: 'kappale määrä',
                  backgroundColor: 'rgba(75,192,192,0.4)',
                  borderColor: 'rgba(75,192,192,1)',
                  borderWidth: 1,
                  hoverBackgroundColor: 'rgba(75,192,192,0.6)',
                  hoverBorderColor: 'rgba(75,192,192,1)',
                  data: dataparsing()
                },
              ],
            },
            options: {
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
              maintainAspectRatio: true,
              responsive: true,
              // @ts-ignore
              width: 400,
              height: 2000,
            },
          });

          // Save the chart instance to the ref
          chartRef.current.chartInstance = chartInstance;
        }
      }
    };

    // Destroy the previous chart if there is one
    if (chartRef.current?.chartInstance) {
      chartRef.current.chartInstance.destroy();
    }

    // Create a new chart
    createChart();

    // Return the cleanup function
    return () => {
      if (chartRef.current?.chartInstance) {
        chartRef.current.chartInstance.destroy();
      }
    };
  }, [reports]);


  console.log(reports)
  //Muokataan report
  const dataparsing = () => {
    if (reports && Array.isArray(reports.items)) {
      const counts = reports.items.reduce((acc:any, group:any) => {
        const value = group.value;
        acc[value] = (acc[value] || 0) + 1;
        return acc;
      }, { 1: 0, 2: 0, 3: 0 }); // Initialize counters to zero
      
     
      return [counts[1], counts[2], counts[3]];
    } else {
      console.error("Error: 'reports' is not in the expected format");
    }
  };

  return <canvas ref={chartRef} />;
};

export default ChartRaport;
