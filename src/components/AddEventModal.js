import React from "react";
import Modal from "react-modal";

const AddEventModal = ({
  isOpen,
  onRequestClose,
  selectedDateRange,
  newEventTitle,
  setNewEventTitle,
  newStartTime,
  setNewStartTime,
  newEndTime,
  setNewEndTime,
  newAllDay,
  setNewAllDay,
  handleAddButton
}) => (
  <Modal
    isOpen={isOpen}
    onRequestClose={onRequestClose}
    contentLabel="Add Event"
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
    <h2>일정 추가</h2>
    {selectedDateRange.start === selectedDateRange.end ? (
      <p>날짜: {selectedDateRange.start}</p>
    ) : (
      <p>
        날짜: {selectedDateRange.start} - {selectedDateRange.end}
      </p>
    )}
    <label htmlFor="allday">하루종일</label>
    <input type="checkbox" id="allday" checked={newAllDay} 
      onChange={(e) => {setNewAllDay(e.target.checked);}} />
    <br/>
    <input
      type="text"
      placeholder="일정 제목"
      value={newEventTitle}
      onChange={(e) => setNewEventTitle(e.target.value)}
    /><br/>
    {!newAllDay && (
      <>
        <input
          type="time"
          value={newStartTime}
          onChange={(e) => setNewStartTime(e.target.value)}
        />
        <input
          type="time"
          value={newEndTime}
          onChange={(e) => setNewEndTime(e.target.value)}
        />
      </>
    )}
    <br/>
    <button onClick={handleAddButton}>추가</button>
    <button onClick={onRequestClose}>취소</button>
  </Modal>
);

export default AddEventModal;
