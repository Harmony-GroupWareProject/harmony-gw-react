import React from "react";
import Modal from "react-modal";

const EditEventModal = ({
  isOpen,
  onRequestClose,
  selectedEvent,
  newEventTitle,
  setNewEventTitle,
  newStartDate,
  setNewStartDate,
  newStartTime,
  setNewStartTime,
  newEndDate,
  setNewEndDate,
  newEndTime,
  setNewEndTime,
  newAllDay,
  setNewAllDay,
  handleUpdateButton,
  handleDeleteButton
}) => (
  <Modal
    isOpen={isOpen}
    onRequestClose={onRequestClose}
    contentLabel="Edit Event"
    shouldCloseOnOverlayClick={false}
    style={{
      content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        zIndex: 1000,
      },
      overlay: {
        backgroundColor: "rgba(0, 0, 0, 0.75)",
        zIndex: 999,
      },
    }}
  >
    <h2>일정 수정</h2>
    <input type="date" value={newStartDate} onChange={(e) => setNewStartDate(e.target.value)} />&nbsp;&nbsp;
    <input type="date" value={newEndDate} onChange={(e) => setNewEndDate(e.target.value)}/>
    <br/>
    <input
      type="time"
      value={newStartTime}
      onInput={(e) => setNewStartTime(e.target.value)}
    />
    <input
      type="time"
      value={newEndTime}
      onInput={(e) => setNewEndTime(e.target.value)}
    />
    <br/>
    <input
      type="text"
      placeholder="일정 제목"
      value={newEventTitle}
      onChange={(e) => setNewEventTitle(e.target.value)}
    />
    <button onClick={handleUpdateButton}>수정</button>
    <button onClick={handleDeleteButton}>삭제</button>
    <button onClick={onRequestClose}>취소</button>
  </Modal>
);

export default EditEventModal;
