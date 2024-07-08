import React from 'react';
import FullCalendarF from '../Schedule/FullCalendarF'
import Approval from '../Approval/Approval'
import OrgChart from '../OrganizationChart/OrgChart'
import '../css/ContentArea.css';
import DocAddPage from '../Approval/DocTemplate/DocAddPage';
import Register from '../Register/Register';

function MainContentArea({ activeMenu }) {
  const renderContent = () => {
    switch(activeMenu) {
      case 'organization':
        return <OrgChart />;
      case 'schedule':
        return <FullCalendarF/>;
      case 'approval':
        return <Approval />;
      case 'register':
        return <Register/>;
      // default:
      //   return <orgChart />;
    }
  };

  return (
    <div className="content-area">
      {renderContent()}
    </div>
  );
}

export default MainContentArea;