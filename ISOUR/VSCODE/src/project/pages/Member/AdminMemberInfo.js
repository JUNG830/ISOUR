
import { useState, useEffect } from 'react';
import TeamAPI from '../../api/TeamAPI';
import styled from 'styled-components';
import { Link } from "react-router-dom";
import imgHome from '../../images/home_button.png'
import '../../CSS/Style_Login.css';
import noImage from '../../images/no_image.gif';
import './AdminMemberInfo.css';
const AdminMemberInfo = () => {
  const localId = window.localStorage.getItem("userId");
  const DOMAIN = 'http://localhost:8111/ISOUR/MemberInfo/file/';

  const [memberInfo, setMemberInfo] = useState('');
  const [loading, setLoading] = useState(false);

  const Styled = styled.div`
    overflow: scroll;
    &::-webkit-scrollbar{
      /*가로 스크롤 넓이*/
      width: 8px;
      /*세로 스크롤 넓이*/
      height: 8px;
      
      border-radius: 6px;
      background: rgba(255, 255, 255, 0.4);
    }
    &::-webkit-scrollbar-thumb{
      background-color: rgba(0,0,0,0.3);
      border-radius:6px;
    }
    width: 1120px;
    height: 500px;
    `;

  const MemberList = styled.table`
    border-collapse: collapse;
    width: 768px;
    margin: 0 auto;
    font-size: 1.125em;
    @media screen and (max-width: 768px) {
      width: 100%;
    }
    th, td {
      border:1px solid #ccc;
      padding: 2px;
    }
    th {
      background-color: bisque;
    }
  `;

  const MemberTitle = styled.table`
    font-size: 2em;
    text-align: center;
  `;

  useEffect(() => {
    const memberData = async () => {
      setLoading(true);
      try {
        const response = await TeamAPI.memberInfo(localId);
        setMemberInfo(response.data);
        console.log(response.data)
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    };
    memberData();
  }, []);

  if (loading) {
    return <div>대기 중...</div>
  }

  return (
    <div className='Container'>
      <div className='outbox'>
            <div className='name'>회원 정보</div>
        <Styled>
          <table className='tableContainer'>
            {/* F:\KH\TOTAL-1\ISOUR_HJ\ISOUR\Eclipse\src\main\webapp\UPLOADIMG\admin.jpg */}
            {/* <img src={ require('F:/KH/TOTAL-1/ISOUR_HJ/ISOUR/Eclipse/src/main/webapp/UPLOADIMG/admin.jpg').default } width='80px' height='100px'/> */}
            {/* <img src={aaa} width='80px' height='100px' /> */}
            <tr className='tr1'>
              <th>사진(IMAGE)</th>
              <th>이름(NAME)</th>
              <th>아이디(ID)</th>
              <th>비밀번호(PASSWORD)</th>
              <th>생년월일(BIRTH)</th>
              <th>나이(AGE)</th>
              <th>성별(GENDER)</th>
              <th>시도(REGION1)</th>
              <th>시/구/군(REGION2)</th>
              <th>MBTI</th>
            </tr>
            {memberInfo && memberInfo.map(member => (  //  npm i babel-eslint -D  설치
              <tr key={member.name}>

                {/* <td><p style={{background={member.fileName}}} /></td> */}
                {/* <td><p style={{background: 'url({member.fileName})'}} width='80px' height='100px'/></td> */}
                {/* <td><img style={{background: 'url({member.fileName})'}} width='80px' height='100px'/></td> */}
                {/* <td><img src='/MemberInfo/file/admin.jpg' width='80px' height='100px'/></td> */}
                {/* <td><img src={ require({member.fileName}).default } width='80px' height='100px' alt='엑박'/></td> */}
                {/* <td>{member.fileName}</td> */}
                {/* <td><div style={{backgroundImage: 'url("{member.fileName}")', width:'80px', height:'100px' }} /></td> */}
                <td>
                  {member.fileName ?
                    <img src={`${DOMAIN}` + `${member.fileName}`} width='80px' height='100px' />
                    : <img src={noImage} width='80px' height='100px' />
                  }
                </td>
                <td>{member.name}</td>
                <td>{member.id}</td>
                <td>{member.pwd}</td>
                <td>{member.birth}</td>
                <td>{member.age}</td>
                <td>{member.gender}</td>
                <td>{member.region1}</td>
                <td>{member.region2}</td>
                <td>{member.mbti}</td>
              </tr>
            ))}
          </table>
        </Styled>
          <Link to="/" className="link-box">
            <img className="link-img" src={imgHome} alt="HOME" />
            <span>HOME으로 이동</span>
          </Link>
      </div>
    </div>
  );
}
export default AdminMemberInfo;