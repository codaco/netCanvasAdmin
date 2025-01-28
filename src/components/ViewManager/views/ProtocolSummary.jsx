import React, { useEffect, useState } from 'react';
import ProtocolSummary from '@/lib/ProtocolSummary/ProtocolSummary';
import ProtocolSummaryErrorBoundary from '../../Errors/ProtocolSummaryErrorBoundary';

const ProtocolSummaryView = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    document.documentElement.classList.add('print');

    return () => {
      document.documentElement.classList.remove('print');
    };
  });

  useEffect(() => {
    // ipcRenderer.once('SUMMARY_DATA', (event, _data) => {
    //   setData(_data);
    // });
    console.log('SUMMARY_DATA', data);
  }, []);

  return (
    <ProtocolSummaryErrorBoundary>
      <ProtocolSummary data={data} />
    </ProtocolSummaryErrorBoundary>
  );
};

export default ProtocolSummaryView;
