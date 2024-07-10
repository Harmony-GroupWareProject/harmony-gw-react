import React, { useEffect, useState } from 'react';
import { FaFolder, FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // axios 가져오기

export default function OrgChart() {
  const [orgList, setOrgList] = useState([]);
  const [empList, setEmpList] = useState([]);
  const [treeData, setTreeData] = useState([]);
  const [expandedNodes, setExpandedNodes] = useState({});
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate(); // useNavigate 훅 사용

  useEffect(() => {
    const fetchOrgEmpData = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get('http://localhost:9000/orgEmpList', {
          headers: {
            Authorization: token
          }
        });
        const data = response.data;
        setOrgList(data.orgList); // 조직 리스트
        setEmpList(data.empList); // 사원 리스트
        setLoading(false); // 데이터를 성공적으로 가져온 후 로딩 상태를 false로 설정
      } catch (error) {
        console.error('Error fetching org data:', error);
        setLoading(false); // 에러가 발생해도 로딩 상태를 false로 설정
      }
    };
    fetchOrgEmpData();
  }, []);

  useEffect(() => {
    const buildTreeData = (orgList, empList) => {
      const orgMap = {};

      orgList.forEach(org => {
        orgMap[org.orgCd] = {
          title: org.orgName,
          key: org.orgCd,
          children: [],
          isOrg: true,
        };
      });

      empList.forEach(emp => {
        const org = orgMap[emp.orgCd];
        if (org) {
          org.children.push({
            title: `${emp.empName} (${emp.position})`,
            key: emp.empNo,
            isOrg: false,
            empData: { ...emp, orgName: org.title },
          });
        }
      });

      const treeData = [];
      const initialExpandedNodes = {};

      orgList.forEach(org => {
        initialExpandedNodes[org.orgCd] = true; // Set all nodes as expanded
        if (org.upperOrgCd) {
          orgMap[org.upperOrgCd].children.push(orgMap[org.orgCd]);
        } else {
          treeData.push(orgMap[org.orgCd]);
        }
      });

      setExpandedNodes(initialExpandedNodes);
      setTreeData(treeData);
    };

    if (orgList.length > 0 && empList.length > 0) {
      buildTreeData(orgList, empList);
    }
  }, [orgList, empList]);

  const toggleNode = key => {
    setExpandedNodes(prevState => ({ ...prevState, [key]: !prevState[key] }));
  };

  const likeSearch = (obj, query) => {
    for (let key in obj) {
      if (typeof obj[key] === 'string' && obj[key].includes(query)) {
        return true;
      }
    }
    return false;
  };

  const filterTree = (nodes, query) => {
    return nodes
      .map(node => {
        if (node.isOrg) {
          const filteredChildren = filterTree(node.children, query);
          if (filteredChildren.length > 0 || node.title.includes(query)) {
            return { ...node, children: filteredChildren };
          }
        } else if (
          node.title.includes(query) ||
          likeSearch(node.empData, query)
        ) {
          return node;
        }
        return null;
      })
      .filter(node => node !== null);
  };

  const renderTree = (nodes, level = 0) => {
    return nodes.map(node => (
      <div
        key={node.key}
        style={{ paddingLeft: level * 20 }}
      >
        <div
          onClick={() =>
            node.isOrg
              ? toggleNode(node.key)
              : navigate('/empdetail', { state: { empData: node.empData } })
          }
          style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', padding: '5px 0' }}
        >
          {node.isOrg ? (
            <FaFolder style={{ color: 'orange', marginRight: 8 }} />
          ) : (
            <FaUser style={{ color: '#1cd6d9', marginRight: 8 }} />
          )}
          <span>{node.title}</span>
        </div>
        {node.children &&
          node.children.length > 0 &&
          expandedNodes[node.key] &&
          renderTree(node.children, level + 1)}
      </div>
    ));
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div className="spinner" style={{ color: 'orange' }}>Loading...</div>
      </div>
    );
  }

  const filteredTreeData = filterTree(treeData, search);

  return (
    <div style={{ padding: 20 }}>
      <input
        type="text"
        placeholder="이름/아이디/부서/직위/전화"
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{ padding: 10, marginBottom: 20, width: '100%' }}
      />
      <div>{renderTree(filteredTreeData)}</div>
    </div>
  );
}
