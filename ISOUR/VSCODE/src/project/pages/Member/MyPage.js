import React, { useState, useEffect } from 'react';
import TeamAPI from '../../api/TeamAPI';
import nowGo from '../../images/short_cut.png'
import noImage from '../../images/no_image.gif';
import { Link } from 'react-router-dom';
import '../../CSS/Style_Login.css';
import '../../CSS/MyPage.css'


const MyPage = () => {
  // ▼ 로그인 안 되어 있으면 로그인 페이지로
  const isLogin = window.localStorage.getItem("isLogin");
  if(isLogin === "FALSE") window.location.replace("/login");
  // ▲ 로그인 안 되어 있으면 로그인 페이지로

  const DOMAIN = 'http://localhost:8111/ISOUR/MemberInfo/file/';

  const localId = window.localStorage.getItem("userId");
  const localPw = window.localStorage.getItem("userPw");

  const [memberInfo, setMemberInfo] = useState(""); // 현재 로그인 되어 있는 회원의 정보 저장용

  useEffect(() => {
        
    const memberData = async () => {
      console.log("\n\n현재 localStorage 에 저장된 ID : " + localId);
      console.log("\n\n현재 localStorage 에 저장된 PASSWORD : " + localPw);
      console.log("\n\n현재 localStorage 에 저장된 isLogin : " + isLogin);

      try {
        const response = await TeamAPI.memberInfo(localId); // 원래는 전체 회원 조회용
        setMemberInfo(response.data);
        console.log(response.data)
      } catch (e) {
        console.log(e);
      }
    };
    memberData();
    }, []);

  const onClickMember = () => {
    console.log("회원 목록 조회 눌렀어요.");
    window.location.replace("/AdminMemberInfo");
  }
  
  const onClickDrop = () => {
    console.log("탈퇴하기 버튼 눌렀어요.");
    // alert("콘솔 확인하세요.")
    window.location.replace("/MemberDrop");
  }
  
  const onClickUpdate = () => {
    console.log("수정하기 버튼 눌렀어요.");
    // alert("콘솔 확인하세요.")
    window.location.replace("/MemberUpdate");
  }

  const onClickTestStart = () => {
    console.log("검사하기 버튼 눌렀어요.");
    // alert("콘솔 확인하세요.")
    window.location.replace("/Exam");
  }
  const onClickMessage = () => {
    console.log("메세지함 버튼 눌렀어요.");
    // alert("콘솔 확인하세요.")
    window.location.replace("/MessageList");
  }



  return(
    <div>
      <div className="MyPage-Container">
        <div className="mainhead">
          
          {/* admin 계정일 때만 회원목록조회 버튼 생성 */}
          {/* { localId === 'admin' &&
            <div onClick={onClickMember}>
              <img src={nowGo} alt="화살표"/>
              <Link to='/AdminMemberInfo'><span>회원 목록 조회</span></Link>
            </div>
          } */}
          
        </div>
        <div className="history" >
          {memberInfo && memberInfo.map(member => (
            <div key={member.id}>
              <table className='mypage-table'>
              <colgroup> 
                <col width="50%" /> 
                <col width="50%" /> 
              </colgroup>
                <tr>
                  <td colSpan="2" align='center' style={{width:"300px", padding:'20px'}}><h1>회원정보</h1></td>
                </tr>
                <tr>
                  <td colSpan="2" align='center' >
                    { member.fileName ?  
                      <img src={`${DOMAIN}` + `${member.fileName}`} style={{borderRadius:'70%', width: '200px'}}/>
                      : <img src={noImage} style={{borderRadius:'70%', width: '200px'}} />
                    }</td>
                </tr>
                <tr>
                  <br />
                </tr>
                <tr>
                  <th className='mypage-th' >이름</th>
                  <td className='mypage-td'>{member.name}</td>
                </tr>
                <tr>
                  <th className='mypage-th'>아이디</th>
                  <td className='mypage-td'>{member.id}</td>
                </tr>
                {/* <tr>
                  <th className='mypage-th'>비밀번호</th>
                  <td className='mypage-td'>{member.pwd}</td>
                </tr> */}
                <tr>
                  <th className='mypage-th'>생년월일</th>
                  <td className='mypage-td'>{member.birth}</td>
                </tr>
                <tr>
                  <th className='mypage-th'>나이</th>
                  <td className='mypage-td'>{member.age}</td>
                </tr>
                <tr>
                  <th className='mypage-th'>성별</th>
                  <td className='mypage-td'>{member.gender}</td>
                </tr>
                <tr>
                  <th className='mypage-th'>주소</th>
                  <td className='mypage-td'>{member.region1} {member.region2}</td>
                </tr>
                <tr>
                  <th className='mypage-th'>MBTI</th>
                  <td className='mypage-td'> 
                    { member.mbti ? 
                        member.mbti 
                        : <button onClick={onClickTestStart}>검사하기</button>}
                  </td>
                </tr>
                <tr>
                  <br />
                </tr>
              </table> 
          
            { (`${member.id}` !== 'admin') ?
            <div onClick={onClickUpdate}>
              <img src={nowGo} alt="화살표" />
              <span>회원정보 수정</span>
            </div>
            : ''}
          </div>))}
          <div onClick={onClickMessage}>
              <img src={nowGo} alt="화살표" />
              <span>메세지 함</span>
            </div>
          <div onClick={onClickDrop}>
              <img src={nowGo} alt="화살표" />
              <span>탈퇴하기</span>
            </div>
          
        </div>
      </div>
    </div>
  );

}

export default MyPage;