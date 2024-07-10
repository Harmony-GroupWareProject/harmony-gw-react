import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    const fetchDocContent = async () => {
        const token = localStorage.getItem("token");
        const empNo = localStorage.getItem("empNo");
        const docIdx = "2024-000008";
        try {
          const response = await axios.get(`http://localhost:9000/getDocContent`, docIdx, {
            headers: {
              'Authorization': token
            }
          });
          const data = response.data
          console.log(data);
          // setEvents(data);
        } catch (error) {
          console.error('Error fetching DocContent data !!!!:', error);
        }
      };
      
      fetchDocContent();
    }, []);

  const saveDocHandler = async () => {
    const token = localStorage.getItem("token");
    const empNo = localStorage.getItem("empNo");    
  
    const save = {
      docType: "업무협조문",
      writer: empNo,
      docTitle: title,
      docContent: content,
      references: "참조자1",
      approvers: "Daff,dfa,df,af",
    }
    try {
      const response = await axios.post('http://localhost:9000/saveApprovalDoc', save, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      
      console.log("success");
    } catch (error) {
     console.log("fail");
     
    }
  };

  return (
    <>
    <div style={{ fontFamily: '맑은 고딕', fontSize: '10pt' }}>
      <table
        style={{
          border: '0px solid rgb(0, 0, 0)',
          width: '800px',
          fontFamily: 'malgun gothic, dotum, arial, tahoma',
          marginTop: '1px',
          borderCollapse: 'collapse',
        }}
      >
        <colgroup>
          <col width="310" />
          <col width="490" />
        </colgroup>
        <tbody>
          <tr>
            <td
              colSpan="2"
              style={{
                background: 'white',
                padding: '0px',
                border: '0px',
                height: '90px',
                textAlign: 'center',
                color: 'black',
                fontSize: '36px',
                fontWeight: 'bold',
                verticalAlign: 'middle',
              }}
            >
              업무 협조
            </td>
          </tr>
          <tr>
            <td
              style={{
                background: 'white',
                padding: '0px',
                border: '0px',
                textAlign: 'left',
                color: 'black',
                fontSize: '12px',
                verticalAlign: 'top',
              }}
            >
              <table
                style={{
                  border: '1px solid rgb(0, 0, 0)',
                  fontFamily: 'malgun gothic, dotum, arial, tahoma',
                  marginTop: '1px',
                  borderCollapse: 'collapse',
                }}
              >
                <colgroup>
                  <col width="90" />
                  <col width="220" />
                </colgroup>
                <tbody>
                  <tr>
                    <td
                      style={{
                        background: 'rgb(221, 221, 221)',
                        padding: '5px',
                        border: '1px solid black',
                        height: '18px',
                        textAlign: 'center',
                        color: 'rgb(0, 0, 0)',
                        fontSize: '12px',
                        fontWeight: 'bold',
                        verticalAlign: 'middle',
                      }}
                    >
                      기안자
                    </td>
                    <td
                      style={{
                        background: 'rgb(255, 255, 255)',
                        padding: '5px',
                        border: '1px solid black',
                        textAlign: 'left',
                        color: 'rgb(0, 0, 0)',
                        fontSize: '12px',
                        verticalAlign: 'middle',
                      }}
                    >
                      <input
                        type="text"
                        readOnly
                        style={{
                          verticalAlign: 'middle',
                          width: '100%',
                          border: '0px',
                          boxShadow: 'inset 0px 0px 0px rgba(150, 150, 150, 0.2)',
                        }}
                        name="draftUser"
                        value="한성준"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        background: 'rgb(221, 221, 221)',
                        padding: '5px',
                        border: '1px solid black',
                        height: '18px',
                        textAlign: 'center',
                        color: 'rgb(0, 0, 0)',
                        fontSize: '12px',
                        fontWeight: 'bold',
                        verticalAlign: 'middle',
                      }}
                    >
                      소속
                    </td>
                    <td
                      style={{
                        background: 'rgb(255, 255, 255)',
                        padding: '5px',
                        border: '1px solid black',
                        textAlign: 'left',
                        color: 'rgb(0, 0, 0)',
                        fontSize: '12px',
                        verticalAlign: 'middle',
                      }}
                    >
                      <input
                        type="text"
                        readOnly
                        style={{
                          verticalAlign: 'middle',
                          width: '100%',
                          border: '0px',
                          boxShadow: 'inset 0px 0px 0px rgba(150, 150, 150, 0.2)',
                        }}
                        name="draftDept"
                        value="경영지원본부"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        background: 'rgb(221, 221, 221)',
                        padding: '5px',
                        border: '1px solid black',
                        height: '18px',
                        textAlign: 'center',
                        color: 'rgb(0, 0, 0)',
                        fontSize: '12px',
                        fontWeight: 'bold',
                        verticalAlign: 'middle',
                      }}
                    >
                      기안일
                    </td>
                    <td
                      style={{
                        background: 'rgb(255, 255, 255)',
                        padding: '5px',
                        border: '1px solid black',
                        textAlign: 'left',
                        color: 'rgb(0, 0, 0)',
                        fontSize: '12px',
                        verticalAlign: 'middle',
                      }}
                    >
                      <input
                        type="text"
                        readOnly
                        style={{
                          verticalAlign: 'middle',
                          width: '100%',
                          border: '0px',
                          boxShadow: 'inset 0px 0px 0px rgba(150, 150, 150, 0.2)',
                        }}
                        name="draftDate"
                        value="2024-07-05(금)"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        background: 'rgb(221, 221, 221)',
                        padding: '5px',
                        border: '1px solid black',
                        height: '18px',
                        textAlign: 'center',
                        color: 'rgb(0, 0, 0)',
                        fontSize: '12px',
                        fontWeight: 'bold',
                        verticalAlign: 'middle',
                      }}
                    >
                      문서번호
                    </td>
                    <td
                      style={{
                        background: 'rgb(255, 255, 255)',
                        padding: '5px',
                        border: '1px solid black',
                        textAlign: 'left',
                        color: 'rgb(0, 0, 0)',
                        fontSize: '12px',
                        verticalAlign: 'middle',
                      }}
                    >
                      <input
                        type="text"
                        readOnly
                        style={{
                          verticalAlign: 'middle',
                          width: '100%',
                          border: '0px',
                          boxShadow: 'inset 0px 0px 0px rgba(150, 150, 150, 0.2)',
                        }}
                        name="docNo"
                        value=""
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
            <td
              style={{
                background: 'white',
                padding: '0px',
                border: '0px',
                textAlign: 'left',
                color: 'black',
                fontSize: '12px',
                verticalAlign: 'top',
              }}
            >
              {/* <table
                style={{
                  border: '1px solid rgb(0, 0, 0)',
                  borderCollapse: 'collapse',
                  fontSize: '12px',
                }}
              >
                <tbody>
                  <tr>
                    <td
                      rowSpan="3"
                      style={{
                        border: '1px solid rgb(0, 0, 0)',
                        background: 'rgb(238, 238, 238)',
                        padding: '4px',
                        textAlign: 'center',
                        width: '40px',
                        verticalAlign: 'middle',
                      }}
                    >
                      신청
                    </td>
                    <td
                      style={{
                        border: '1px solid rgb(0, 0, 0)',
                        background: 'rgb(238, 238, 238)',
                        padding: '4px',
                        textAlign: 'center',
                      }}
                    >
                      과장
                    </td>
                  </tr>
                  <tr>
                    <td
                      rowSpan="2"
                      style={{
                        border: '1px solid rgb(0, 0, 0)',
                        padding: '4px',
                        textAlign: 'center',
                        verticalAlign: 'middle',
                      }}
                    >
                      한성준
                    </td>
                  </tr>
                  <tr></tr>
                  <tr>
                    <td
                      rowSpan="3"
                      style={{
                        border: '1px solid rgb(0, 0, 0)',
                        background: 'rgb(238, 238, 238)',
                        padding: '4px',
                        textAlign: 'center',
                        verticalAlign: 'middle',
                      }}
                    >
                      승인
                    </td>
                    <td
                      style={{
                        border: '1px solid rgb(0, 0, 0)',
                        background: 'rgb(238, 238, 238)',
                        padding: '4px',
                        textAlign: 'center',
                      }}
                    >
                      과장
                    </td>
                    <td
                      style={{
                        border: '1px solid rgb(0, 0, 0)',
                        background: 'rgb(238, 238, 238)',
                        padding: '4px',
                        textAlign: 'center',
                      }}
                    >
                      본부장
                    </td>
                    <td
                      style={{
                        border: '1px solid rgb(0, 0, 0)',
                        background: 'rgb(238, 238, 238)',
                        padding: '4px',
                        textAlign: 'center',
                      }}
                    >
                      차장
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        border: '1px solid rgb(0, 0, 0)',
                        padding: '4px',
                        textAlign: 'center',
                      }}
                    >
                      한성준
                    </td>
                    <td
                      style={{
                        border: '1px solid rgb(0, 0, 0)',
                        padding: '4px',
                        textAlign: 'center',
                      }}
                    >
                      유수연
                    </td>
                    <td
                      style={{
                        border: '1px solid rgb(0, 0, 0)',
                        padding: '4px',
                        textAlign: 'center',
                      }}
                    >
                      전병헌
                    </td>
                  </tr>
                  <tr>
                    <td
                      colSpan="3"
                      style={{
                        border: '1px solid rgb(0, 0, 0)',
                        padding: '4px',
                        height: '18px',
                      }}
                    ></td>
                  </tr>
                </tbody>
              </table> */}
            </td>
          </tr>
        </tbody>
      </table>
      <table
        style={{
          border: '0px solid rgb(0, 0, 0)',
          width: '800px',
          fontFamily: 'malgun gothic, dotum, arial, tahoma',
          marginTop: '10px',
          borderCollapse: 'collapse',
        }}
      >
        <colgroup>
          <col width="120" />
          <col width="230" />
          <col width="120" />
          <col width="330" />
        </colgroup>
        <tbody>
          <tr>
            <td
              style={{
                background: 'rgb(221, 221, 221)',
                padding: '5px',
                border: '1px solid black',
                height: '25px',
                textAlign: 'center',
                color: 'rgb(0, 0, 0)',
                fontSize: '14px',
                fontWeight: 'bold',
                verticalAlign: 'middle',
              }}
            >
              수신부서
            </td>
            <td
              colSpan="3"
              style={{
                background: 'rgb(255, 255, 255)',
                padding: '5px',
                border: '1px solid black',
                textAlign: 'left',
                color: 'rgb(0, 0, 0)',
                fontSize: '14px',
                verticalAlign: 'middle',
              }}
            >
              <input
                type="text"
                className="ipt_editor"
                name="editorForm_4"
                placeholder=""
              />
            </td>
          </tr>
          <tr>
            <td
              style={{
                background: 'rgb(221, 221, 221)',
                padding: '5px',
                border: '1px solid black',
                height: '25px',
                textAlign: 'center',
                color: 'rgb(0, 0, 0)',
                fontSize: '14px',
                fontWeight: 'bold',
                verticalAlign: 'middle',
              }}
            >
              합의
            </td>
            <td
              colSpan="3"
              style={{
                background: 'rgb(255, 255, 255)',
                padding: '5px',
                border: '1px solid black',
                textAlign: 'left',
                color: 'rgb(0, 0, 0)',
                fontSize: '14px',
                verticalAlign: 'middle',
              }}
            >
              <span className="sign_type2" id="agreementWrap"></span>
            </td>
          </tr>
          <tr>
            <td
              style={{
                background: 'rgb(221, 221, 221)',
                padding: '5px',
                border: '1px solid black',
                height: '25px',
                textAlign: 'center',
                color: 'rgb(0, 0, 0)',
                fontSize: '14px',
                fontWeight: 'bold',
                verticalAlign: 'middle',
              }}
            >
              제목
            </td>
            <td
              colSpan="3"
              style={{
                background: 'rgb(255, 255, 255)',
                padding: '5px',
                border: '1px solid black',
                textAlign: 'left',
                color: 'rgb(0, 0, 0)',
                fontSize: '14px',
                verticalAlign: 'middle',
              }}
            >
              <input
                type="text"
                className="ipt_editor"
                name="subject"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder=""
              />
            </td>
          </tr>
          <tr>
            <td
              colSpan="4"
              style={{
                background: 'rgb(255, 255, 255)',
                borderWidth: 'medium 1px 1px',
                borderStyle: 'none solid solid',
                borderColor: 'currentColor black black',
                padding: '5px',
                height: '350px',
                textAlign: 'left',
                color: 'rgb(0, 0, 0)',
                fontSize: '14px',
                verticalAlign: 'top',
              }}
            >
              <input
                className="editor"
                style={{ width: '100%', height: '100%', border: '1px solid black' }}
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <button onClick={saveDocHandler}>저장</button>
    </>
  );
}

export default App;
