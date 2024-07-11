import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/EmployeeLists.css'; // 스타일 파일 임포트

const EmployeeLists = () => {
  const [empList, setEmpList] = useState([]);
  const [orgMap, setOrgMap] = useState({});

  // DB에서 데이터 받아오기
  useEffect(() => {
    const fetchOrgEmpData = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get('http://localhost:9000/orgEmpList', {
          headers: {
            Authorization: token
          }
        });
        const data = response.data;  // Fixed to remove unnecessary await
        setEmpList(data.empList);

        // orgList 데이터를 매핑하여 orgMap 생성
        const orgMapping = {};
        data.orgList.forEach(org => {
          orgMapping[org.orgCd] = org.orgName;
        });
        setOrgMap(orgMapping);
      } catch (error) {
        console.error('Error fetching employeeLists data:', error);
      }
    };

    fetchOrgEmpData();
  }, []);

  return (
    <div className="employee-list">
      <h2>직원 목록</h2>
      <table>
        <thead>
          <tr>
            <th>사원번호</th>
            <th>사원명</th>
            <th>소속 부서</th>
            <th>폰번호</th>
            <th>직위</th>
            <th>이메일</th>
            <th>고용일자</th>
            <th>권한 구분</th>
          </tr>
        </thead>
        <tbody>
          {empList.map(employee => (
            <tr key={employee.empNo}>
              <td>{employee.empNo}</td>
              <td>{employee.empName}</td>
              <td>{orgMap[employee.orgCd] || employee.orgCd}</td>
              <td>{employee.phoneNum}</td>
              <td>{employee.position}</td>
              <td>{employee.email}</td>
              <td>{employee.hireDate}</td>
              <td>{employee.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeLists;
