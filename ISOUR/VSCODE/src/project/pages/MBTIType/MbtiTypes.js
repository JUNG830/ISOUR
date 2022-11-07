import React from "react";
// import INTP from "../images/INTP-F.svg"
import styled from 'styled-components';
// import "./MbtiTypes.css";



function MbtiTypes(){

  const GroupBox = styled.div`
  background: yellow;
  border: 1px solid black;
  width: 400;
  height: 450;
  margin: 20px 20px;
  padding: 20px;
  font-size: 1.125em;
  @media screen and (min-width: 768px) {
    width: 100%;
  }
`;

  return(
    <>
      {/* <groupBox className="type-group analysts"> */}
      <GroupBox>
        <h2>분석가형</h2>
        <div className="types">
          <a href="/" className="type">INTJ 전략가</a>
          {/* <a href="/" className="type"><img src={INTP} alt="INTP"></img>INTP 논리술사</a> */}
          <a href="/" className="type">INTP 논리술사</a>
          <a href="/" className="type">ENTJ 통솔자</a>
          <a href="/" className="type">ENTP 변론가</a>
        </div>
      </GroupBox>
      <GroupBox className="type-group analysts">
        <h2>외교관형</h2>
        <div className="types">
          <a href="/">INFJ 옹호자</a>
          <a href="/">INFP 중재자</a>
          <a href="/">ENFJ 선도자</a>
          <a href="/">ENFP 활동가</a>
        </div>
      </GroupBox>
      <GroupBox className="type-group analysts">
        <h2>관리자형</h2>
        <div className="types">
          <a href="/">ISTJ 현실주의자</a>
          <a href="/">ISFJ 수호자</a>
          <a href="/">ESTJ 경영자</a>
          <a href="/">ESFJ 집정관</a>
        </div>
      </GroupBox>
      <GroupBox className="type-group analysts">
        <h2>탐험가형</h2>
        <div className="types">
          <a href="/">ISTP 장인</a>
          <a href="/">ISFP 모험가</a>
          <a href="/">ESTP 사업가</a>
          <a href="/">ESFP 연예인</a>
        </div>
      </GroupBox>
    </>
  );
}
export default MbtiTypes;