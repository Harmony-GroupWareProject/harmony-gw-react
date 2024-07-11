import React from 'react';
import '../css/NoticeDetail.css';

const NoticeDetail = ({ notice, setActiveMenu }) => {
  if (!notice) {
    notice = {
      id: 0,
      title: '기본 공지사항 제목',
      content: '여기에 공지사항 내용이 들어갑니다.',
      empNo: '0000',
      date: '2022-01-01',
    };
  }

  const handleEdit = () => {
    // 글 수정 기능 구현
    alert('글 수정 기능은 아직 구현되지 않았습니다.');
  };

  const handleDelete = () => {
    // 글 삭제 기능 구현
    alert('글 삭제 기능은 아직 구현되지 않았습니다.');
  };

  const handleCreate = () => {
    // 새 글 작성 기능 구현
    alert('새 글 작성 기능은 아직 구현되지 않았습니다.');
  };

  return (
    <div className="notice-detail">
      <table className="detail-table">
        <tbody>
          <tr>
            <th>번호</th>
            <td>{notice.id}</td>
          </tr>
          <tr>
            <th>제목</th>
            <td>{notice.title}</td>
          </tr>
          <tr>
            <th>등록일</th>
            <td>{new Date(notice.date).toLocaleDateString()}</td>
          </tr>
          <tr>
            <th>내용</th>
            <td>{notice.content}</td>
          </tr>
        </tbody>
      </table>
      <div className="button-group">
        <button className="btn" onClick={handleCreate}>새 글 작성</button>
        <button className="btn" onClick={handleEdit}>글 수정</button>
        <button className="btn" onClick={handleDelete}>글 삭제</button>
        <button className="btn" onClick={() => setActiveMenu('noticeList')}>목록으로</button>
      </div>
    </div>
  );
};

export default NoticeDetail;
