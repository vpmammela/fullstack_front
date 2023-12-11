import React, { useEffect, useRef } from 'react';
import { Bar } from 'react-chartjs-2';

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

const ChartRaport = (reports: { reports: ReportData }) => {
    console.log(reports)

  return (
    <div>
        <text>Teksitus</text>
    </div>
  )
};

export default ChartRaport;