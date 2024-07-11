import React, { useState, useEffect } from 'react';
import '../css/NoticeList.css';
import axios from "axios";
// const initialNotices = [
//   {
//     noticeIdx: 1,
//     empNo: '1001',
//     title: '공지사항 안내입니다. 이용해주셔서 감사합니다',
//     content: '여기에 공지사항 내용이 들어갑니다.',
//     createDate: '2017-06-15',
//   },
//   {
//     noticeIdx: 2,
//     title: '공지사항 안내입니다. 이용해주셔서 감사합니다',
//     content: '여기에 공지사항 내용이 들어갑니다.아아았!!',
//     empNo: '1002',
//     createDate: '2017-06-15',
//   },
//   {
//     noticeIdx: 3,
//     title: '[공지사항] 개인정보 처리방침 변경안내처리방침',
//     content: '테스트',
//     empNo: '1003',
//     createDate: '2017-07-13',
//   },
// ];

// DB에서 데이터 가져와서 변수에 저장


const NoticeList = ({setActiveMenu}) => {
  const [notices, setNotices] = useState([]);
  const [form, setForm] = useState({ title: '', content: '', empNo: '' });
  const [editing, setEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchNoticeList = async () => {
        const token = localStorage.getItem("token");
        const empNo = localStorage.getItem("empNo");
        try {
          const response = await axios.get(`http://localhost:9000/notice/list`, {
            headers: {
              'Authorization': token
            }
          });
  
          setNotices(response.data.content);
          // setNotices();
        } catch (error) {
          console.error('Error fetching noticeList data !!!!:', error);
        }
      };
      
      fetchNoticeList();
    }, []);
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.prnoticeDefault();
    if (editing) {
      setNotices(
        notices.map((notice) =>
          notice.noticeIdx === form.noticeIdx ? { ...form, createDate: notice.createDate } : notice
        )
      );
    } else {
      setNotices([
        ...notices,
        { ...form, noticeIdx: notices.length + 1, createDate: new Date().toISOString().split('T')[0] },
      ]);
    }
    setForm({ title: '', content: '', empNo: '' });
    setEditing(false);
  };

  const handleEdit = (notice) => {
    setForm(notice);
    setEditing(true);
  };

  const handleDelete = (noticeIdx) => {
    setNotices(notices.filter((notice) => notice.noticeIdx !== noticeIdx));
  };

  const filteredNotices = notices.filter((notice) =>
    notice.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="App">
      <section className="notice">
        <div className="page-title">
          <div className="container">
            <h3>공지사항</h3>
          </div>
        </div>

        <div id="board-search">
          <div className="container">
            <div className="search-window">
              <form>
                <div className="search-wrap">
                  <label htmlFor="search" className="blind">공지사항 내용 검색</label>
                  <input
                    id="search"
                    type="search"
                    placeholder="검색어를 입력해주세요."
                    value={searchTerm}
                    onChange={handleSearch}
                  />
                  <button type="submit" className="btn btn-dark">검색</button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div id="board-list">
          <div className="container">
            <table className="board-table">
              <thead>
                <tr>
                  <th scope="col" className="th-num">번호</th>
                  <th scope="col" className="th-title">제목</th>
                  <th scope="col" className="th-date">등록일</th>
                </tr>
              </thead>
              <tbody>
                {filteredNotices.map((notice, index) => (
                  <tr key={notice.noticeIdx}>
                    <td>{index + 1}</td>
                    <th>
                      <a onClick={() => setActiveMenu('noticedetail')}>{notice.title}</a>
                      <p>{notice.content}</p>
                    </th>
                    <td>{new Date(notice.createDate).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <button onClick={() => setActiveMenu('noticedetail')}>상세보기페이지</button>
    </div>
  );
};

export default NoticeList;
