import React from 'react';
import FullCalendarF from '../Schedule/FullCalendarF'
import Approval from '../Approval/Approval'
import OrgChart from '../OrganizationChart/OrgChart'
import '../css/ContentArea.css';
import Register from '../Register/Register';
import EmployeeLists from '../Register/EmployeeLists';
import styled from 'styled-components';

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
        return <RegisterForm>
                  <Register/>
                  <EmployeeLists />
               </RegisterForm>;
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

export const RegisterForm=styled.div`
  display: flex;
  flex-direction: row;
  margin: 10px;
`
