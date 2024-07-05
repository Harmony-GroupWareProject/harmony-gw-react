import React from 'react';
import FullCalendarF from './FullCalendarF'
import Approval from './Approval'
import OrgChart from './OrgChart'
import './css/ContentArea.css';
import DocAddPage from './DocAddPage';

function ContentArea({ activeMenu }) {
  const renderContent = () => {
    switch(activeMenu) {
      case 'organization':
        return <OrgChart />;
      case 'schedule':
        return <FullCalendarF/>;
      case 'approval':
        return <Approval />;
      case 'aprtemplate':
        return <DocAddPage/>;
      default:
        return <orgChart />;
    }
  };

  return (
    <div className="content-area">
      {renderContent()}
    </div>
  );
}

export default ContentArea;