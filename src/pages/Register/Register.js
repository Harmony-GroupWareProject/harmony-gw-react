  import React, { useState, useEffect } from 'react';
  import axios from 'axios';
  import Modal from 'react-modal';
  import '../css/Register.css'; // 스타일 파일 임포트

  Modal.setAppElement('#root');

  
  const Register = () => {
    const [orgList, setOrgList] = useState([]);

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
              setOrgList(data.orgList); // 조직 리스트
          } catch (error) {
              console.error('Error fetching org data:', error);
          }
      };

      fetchOrgEmpData();
    }, []);


    const initialState = {
      empNo: '',
      password: '',
      empName: '',
      orgCd: '',
      phoneNum: '',
      email: '',
      position: '',
      hireDate: '',
      role: ''
    };

    const [employee, setEmployee] = useState(initialState);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    
    // useEffect(() => {
    //   console.log('employee state:', employee);
    // }, [employee]);
    
    const handleChange = (e) => {
      const { name, value } = e.target;
      setEmployee({
        ...employee,
        [name]: value
      });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      setModalIsOpen(true);
    };

    const confirmRegistration = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error('Error: No token found in localStorage');
        setModalIsOpen(false);
        return;
      }

      try {
        const response = await axios.post('http://localhost:9000/register', employee, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        console.log('Employee saved successfully:', response.data);
        setEmployee(initialState); // 데이터 초기화
        setModalIsOpen(false);
      } catch (error) {
        console.error('There was an error saving the employee!', error.response.data);
        setModalIsOpen(false);
        alert(error.response.data);
      }
    };

    const closeModal = () => {
      setModalIsOpen(false);
      setEmployee(initialState); // 데이터 초기화
    };

    return (
      <div className="register">
        <h2>직원 등록</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>사원번호</label>
            <input
              type="text"
              name="empNo"
              value={employee.empNo}
              onChange={handleChange}
              placeholder="사원번호 입력"
              required
            />
          </div>
          <div className="form-group">
            <label>비밀번호</label>
            <input
              type="password"
              name="password"
              value={employee.password}
              onChange={handleChange}
              placeholder="비밀번호 입력"
              required
            />
          </div>
          <div className="form-group">
            <label>사원명</label>
            <input
              type="text"
              name="empName"
              value={employee.empName}
              onChange={handleChange}
              placeholder="사원명 입력"
              required
            />
          </div>
          <div className="form-group" id='selectBox'>
            <label>부서코드</label>
            <select name='orgCd' value={employee.orgCd} onChange={handleChange} required>
              <option value="" disabled>선택하세요</option>
              {orgList.map(org => (
                <option key={org.orgCd} value={org.orgCd}>{org.orgName}</option>
              ))} 
            </select>
          </div>
          <div className="form-group">
            <label>폰번호</label>
            <input
              type="text"
              name="phoneNum"
              value={employee.phoneNum}
              onChange={handleChange}
              placeholder="폰번호 입력"
              required
            />
          </div>
          <div className="form-group">
            <label>이메일</label>
            <input
              type="email"
              name="email"
              value={employee.email}
              onChange={handleChange}
              placeholder="이메일 입력"
              required
            />
          </div>
          <div className="form-group">
            <label>직책</label>
            <input
              type="text"
              name="position"
              value={employee.position}
              onChange={handleChange}
              placeholder="직책 입력"
              required
            />
          </div>
          <div className="form-group">
            <label>고용일자</label>
            <input
              type="date"
              name="hireDate"
              value={employee.hireDate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group" id='selectBox'>
            <label>권한 설정</label>
            <select name='role' value={employee.role} onChange={handleChange} required>
              <option value="" disabled></option>
              <option value="USER">유저</option>
              <option value="ADMIN">관리자</option>
            </select>
          </div>

          <button type="submit">등록</button>
        </form>

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Confirmation Modal"
          className="modal"
          overlayClassName="overlay"
        >
          <h2>등록하시겠습니까?</h2>
          <button onClick={confirmRegistration}>확인</button>
          <button onClick={closeModal}>취소</button>
        </Modal>
      </div>
    );
  };

  export default Register;
