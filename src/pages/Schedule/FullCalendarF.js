import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import resourceTimeGridPlugin from "@fullcalendar/resource-timegrid";
import Modal from "react-modal"; // React Modal import
import axios from "axios";
import EditEventModal from "../../components/Schedule/EditEventModal";
import AddEventModal from "../../components/Schedule/AddEventModal";

// Modal의 root element를 지정합니다. 여기서는 'root'로 지정합니다.
Modal.setAppElement("#root");

const FullCalendarF = () => {

  const calendarComponentRef = useRef(null);

  const [events, setEvents] = useState([]);

  // DB에서 데이터 가져와서 변수에 저장
  useEffect(() => {
    const fetchScheduleList = async () => {
        const token = localStorage.getItem("token");
        try {
            const response = await axios.get('http://localhost:9000/scheduleList', {
                headers: {
                    'Authorization': token
                }
            });
            const data = response.data.map(event => ({
              id: event.scheduleIdx,
              title: event.title,
              start: event.start,
              end: event.end,
              allDay: event.allDay
          }));
          console.log(data);
          setEvents(data);
          } catch (error) {
            console.error('Error fetching schedule data !!!!:', error);
        }
    };

    fetchScheduleList();
  }, []);

  // 이벤트를 서버에 저장하는 함수(1개)
  const saveEventsToServer = async (newEvent) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error('Error: No token found in localStorage');
      return;
    }
    try {
      const response = await axios.post('http://localhost:9000/scheduleSave', JSON.stringify(newEvent), {
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json' // Content-Type 설정
        }
      });
      if (response.data) {
        console.log('Event saved to server successfully');
        return response.data;
      } else {
        console.log('Failed to save event to server');
      }
    } catch (error) {
      console.error('Error saving events to server:', error);
    }
  };

  // 일정 업데이트 함수
  const updateEventOnServer = async (updatedEvent) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error('Error: No token found in localStorage');
      return;
    }
    try {
      console.log("dd",updatedEvent);

      const response = await axios.put(`http://localhost:9000/scheduleUpdate`, JSON.stringify(updatedEvent), {
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json'
        }
      });
      if (response.data === true) {
        console.log('Event updated on server successfully');
      } else {
        console.log('Failed to update event on server');
      }
    } catch (error) {
      console.error('Error updating event on server:', error);
    }
  };


  // 일정 삭제 함수
  const deleteEventToServer = async (schidx) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error('Error: No token found in localStorage');
      return;
    }
    try {
      console.log("schduleidx번호",schidx);

      const response = await axios.delete(`http://localhost:9000/scheduleDelete`, {
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json'
        },
        data: schidx 
      });
      if (response.data === true) {
        console.log('Event delete on server successfully');
      } else {
        console.log('Failed to delete event on server');
      }
    } catch (error) {
      console.error('Error deleting event on server:', error);
    }
  };

  // modal 열기 위한 상태 저장
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); 

  const eventObj = {
        title: "",
        startStr: "0000-00-00T00:00:00",
        endStr: "0000-00-00T00:00:00",
        allDay: false, // 이벤트가 하루 종일인지 여부를 지정합니다.
  }

  // 클릭했을때 선택/클릭 된 데이터를 저장
  const [selectedDateRange, setSelectedDateRange] = useState({ start: "", end: "" });
  const [selectedEvent, setSelectedEvent] = useState(eventObj);
  
  // 새 일정 추가시 값 저장 위한 변수들
  const [newEventTitle, setNewEventTitle] = useState("");
  const [newStartDate, setNewStartDate] = useState("");
  const [newStartTime, setNewStartTime] = useState("00:00");
  const [newEndDate, setNewEndDate] = useState("");
  const [newEndTime, setNewEndTime] = useState("00:00");
  const [newAllDay, setNewAllDay] = useState(false);

  //수정시 필요한 scheduleIdx 변수
  const [scheduleIdx, setScheduleIdx] = useState(0);

  // 날짜 클릭(하루만 선택시) 호출 함수
  const handleDateClick = (arg) => {
    setSelectedDateRange({ start: arg.dateStr, end: arg.dateStr });
    setIsAddModalOpen(true);
  };

  // 범위 선택(여러 날짜 선택시) 호출 함수
  const handleSelectedDates = (info) => {
    const endDate = new Date(info.endStr);
    endDate.setDate(endDate.getDate() -1);
    const adjustedEndDate = endDate.toISOString().split('T')[0];
    setSelectedDateRange({ start: info.startStr, end: adjustedEndDate });
    setIsAddModalOpen(true);
  };

  // 일정 '없는거' 클릭 (Modal 창1) Open/Close상태-> 닫기값으로 설정하는 함수
  const handleModalClose = () => {
    setIsAddModalOpen(false);
    setNewEventTitle("");
    setNewStartTime("00:00");
    setNewEndTime("00:00");
    setNewAllDay(false);
  };

  // 일정 '있는거' 클릭 (Modal 창2) Open/Close상태 -> 닫기값으로 설정하는 함수
  const handleModalClose2 = () => {
    setIsEditModalOpen(false);
    setNewEventTitle("");
    setNewStartTime("00:00:00");
    setNewEndTime("00:00:00");
  };

  // modal에서 '추가' 버튼 클릭시 호출시킬 함수.
  const handleAddButton = async () => {
    if (newEventTitle) {
      const newEvent = {
        title: newEventTitle,
        start: `${selectedDateRange.start}T${newStartTime}`,
        end: `${selectedDateRange.end}T${newEndTime}`,
        allDay: newAllDay,
      };
      const data = await saveEventsToServer(newEvent);
      const saveEvent = {
        id: data.scheduleIdx,
        title: data.title,
        start: data.start,
        end: data.end,
        allDay: data.allDay
    };

      console.log(saveEvent);
      setEvents((prevEvents) => [...prevEvents, saveEvent]);
      handleModalClose();
    }
  };

  // 이미 일정이 있는 날짜를 클릭했을시 호출 함수
  const handleEventClick = (e) => {
    const endStr = e.event.endStr || e.event.startStr;
    console.log(e.event.id);
    setScheduleIdx(e.event.id);
    setNewEventTitle(e.event.title);
    setNewStartDate(e.event.startStr.split('T')[0]);
    setNewStartTime(new Date(e.event.start).toISOString().split('T')[1].substring(0, 8));
    setNewEndDate(endStr.split('T')[0]);
    setNewEndTime(new Date(e.event.end || e.event.start).toISOString().split('T')[1].substring(0, 8));
    setNewAllDay(e.event.allDay);
    
    setSelectedEvent({
      scheduleIdx: e.event.id,
      title: e.event.title,
      startStr: e.event.startStr,
      endStr: endStr,
      allDay: e.event.allDay
    });
    console.log("event",e.event);
    console.log("id",e.event.id);
    console.log(endStr);
    console.log(newEndTime);
    setIsEditModalOpen(true);
  };

  // 모달에서 '수정' 버튼 클릭 시 호출시킬 함수
  const handleUpdateButton = () => {
    console.log(scheduleIdx);
    console.log("dddd",newEndDate);
    console.log(newEventTitle);
    console.log(newStartDate);
    console.log(newStartTime);
    if (newEventTitle) {
      const startTime = newStartTime || '00:00'
      const endTime = newEndTime || '00:00'
      const updatedEvent = {
        scheduleIdx: scheduleIdx,
        title: newEventTitle,
        start: `${newStartDate}T${startTime}`,
        end: `${newEndDate}T${endTime}`,
        allDay: newAllDay
      };
      console.log(updatedEvent);
      setEvents((prevEvents) => prevEvents.map((event) => (event.scheduleIdx === selectedEvent.scheduleIdx ? updatedEvent : event)));
      updateEventOnServer(updatedEvent);
      handleModalClose2();
    }
  };

  // 모달에서 '삭제' 버튼 클릭 시 호출시킬 함수
  // 모달에서 '수정' 버튼 클릭 시 호출시킬 함수
  const handleDeleteButton = () => {
   
      console.log(scheduleIdx)
      // setEvents((prevEvents) => prevEvents.map((event) => 
      //   (event.scheduleIdx === selectedEvent.scheduleIdx ? updatedEvent : event)));
      deleteEventToServer(scheduleIdx)
      handleModalClose2();
    
  }; 

  return (
    <div>
      <div style={{
        maxWidth: "1000px",
        margin: "0 auto",
        padding: "20px",
        boxSizing: "border-box",
        border: "1px solid #ddd",
        borderRadius: "8px",
        backgroundColor: "#f9f9f9",
      }}>
        <FullCalendar
          schedulerLicenseKey="GPL-My-Project-Is-Open-Source"
          ref={calendarComponentRef}
          dateClick={handleDateClick}
          displayEventTime={true}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth"
          }}
          selectable={true}
          selectMirror={true}
          plugins={[
            dayGridPlugin,
            interactionPlugin,
            timeGridPlugin,
            resourceTimeGridPlugin,
          ]}
          eventClick={handleEventClick}
          events={events}
          select={handleSelectedDates}
          dayMaxEvents={2}
          locale= 'ko'
          eventAdd={(obj)=> {console.log(obj)}}
          eventChange={(obj)=> {console.log(obj)}}
          eventRemove={(obj)=> {console.log(obj)}}
          slotMinTime='00:00'
          slotMaxTime='24:00'
          editable={true}
        />
      </div>
      <AddEventModal
        isOpen={isAddModalOpen}
        onRequestClose={handleModalClose}
        selectedDateRange={selectedDateRange}
        newEventTitle={newEventTitle}
        setNewEventTitle={setNewEventTitle}
        newStartTime={newStartTime}
        setNewStartTime={setNewStartTime}
        newEndTime={newEndTime}
        setNewEndTime={setNewEndTime}
        newAllDay={newAllDay}
        setNewAllDay={setNewAllDay}
        handleAddButton={handleAddButton}
      />
      <EditEventModal
        isOpen={isEditModalOpen}
        onRequestClose={handleModalClose2}
        selectedEvent={selectedEvent}
        newEventTitle={newEventTitle}
        setNewEventTitle={setNewEventTitle}
        newStartDate={newStartDate}
        setNewStartDate={setNewStartDate}
        newStartTime={newStartTime}
        setNewStartTime={setNewStartTime}
        newEndDate={newEndDate}
        setNewEndDate={setNewEndDate}
        newEndTime={newEndTime}
        setNewEndTime={setNewEndTime}
        newAllDay={newAllDay}
        setNewAllDay={setNewAllDay}
        handleUpdateButton={handleUpdateButton}
        handleDeleteButton={handleDeleteButton}
      />
    </div>
  );
};

export default FullCalendarF;
