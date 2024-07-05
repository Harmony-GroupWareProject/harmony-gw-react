import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Tree from 'rc-tree';
import 'rc-tree/assets/index.css';

// 조직도(+사원) 보여주는 페이지
export default function OrgChart() {
    const [orgList, setOrgList] = useState([]);
    const [empList, setEmpList] = useState([]);
    const [treeData, setTreeData] = useState([]);

    

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
                setOrgList(data.orgList);
                setEmpList(data.empList);
            } catch (error) {
                console.error('Error fetching org data:', error);
            }
        };

        fetchOrgEmpData();
    }, []);

    useEffect(() => {
        const buildTreeData = (orgList, empList) => {
            const orgMap = {};

            orgList.forEach(org => {
                orgMap[org.orgCd] = { title: org.orgName, key: org.orgCd, children: [] };
            });

            empList.forEach(emp => {
                const org = orgMap[emp.orgCd];
                if (org) {
                    // Corrected the template string usage
                    org.children.push({ title: `${emp.empName} (${emp.position})`, key: emp.empNo });
                }
            });

            const treeData = [];
            orgList.forEach(org => {
                if (org.upperOrgCd) {
                    orgMap[org.upperOrgCd].children.push(orgMap[org.orgCd]);
                } else {
                    treeData.push(orgMap[org.orgCd]);
                }
            });

            return treeData;
        };

        setTreeData(buildTreeData(orgList, empList));
    }, [orgList, empList]);

    return (
        <div style={{ margin: '20px' }}>
            <Tree treeData={treeData} defaultExpandAll />
        </div>
    );
};
