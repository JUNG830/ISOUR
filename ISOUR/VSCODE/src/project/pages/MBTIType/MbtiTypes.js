import React from "react";
// import INTP from "../images/INTP-F.svg"
import styled from 'styled-components';
// import "./MbtiTypes.css";
import Mbti from '../../CSS/Mbti.css';
import 전략가 from '../../images/전략가.png';
import 논리술사 from '../../images/논리술사.png';
import 통솔자 from '../../images/통솔자.png';
import 변론가 from '../../images/변론가.png';
import 옹호자 from '../../images/옹호자.png';
import 중재자 from '../../images/중재자.png';
import 선도자 from '../../images/선도자.png';
import 활동가 from '../../images/활동가.png';
import 현실주의자 from '../../images/현실주의자.png';
import 수호자 from '../../images/수호자.png';
import 경영자 from '../../images/경영자.png';
import 집정관 from '../../images/집정관.png';
import 장인 from '../../images/장인.png';
import 모험가 from '../../images/모험가.png';
import 사업가 from '../../images/사업가.png';
import 연예인 from '../../images/연예인.png';




function MbtiTypes(){

  return(
    <div>
    <div className="Container-mbti">
      <div className="mbti-box">
        <h2 className="title-box1" >분석가형</h2>
        <ul className="mbti-image1">
        <img src={전략가}></img>
        <span> </span>
        <img src={논리술사}></img>
        <span> </span>
        <img src={통솔자}></img>
        <span> </span>
        <img src={변론가}></img>
        </ul>
          <div className="mbti-t1">
          <a href="https://www.16personalities.com/ko/%EC%84%B1%EA%B2%A9%EC%9C%A0%ED%98%95-intj" >INTJ 전략가<span> </span></a>|
          <span> </span>
          <a href="https://www.16personalities.com/ko/%EC%84%B1%EA%B2%A9%EC%9C%A0%ED%98%95-intp" >INTP 논리술사<span> </span></a>|
          <span> </span>
          <a href="https://www.16personalities.com/ko/%EC%84%B1%EA%B2%A9%EC%9C%A0%ED%98%95-entj" >ENTJ 통솔자<span> </span></a>|
          <span> </span>
          <a href="https://www.16personalities.com/ko/%EC%84%B1%EA%B2%A9%EC%9C%A0%ED%98%95-entp" >ENTP 변론가</a>
          </div>
        </div>
      <br></br>
      
      <div className="mbti-box">
        <h2 className="title-box2">외교관형</h2>
        <ul className="mbti-image2">
        <img src={옹호자}></img>
        <span> </span>
        <img src={중재자}></img>
        <span> </span>
        <img src={선도자}></img>
        <span> </span>
        <img src={활동가}></img>
        </ul>
        <div className="mbti-t2">
          <a href="https://www.16personalities.com/ko/%EC%84%B1%EA%B2%A9%EC%9C%A0%ED%98%95-infj">INFJ 옹호자<span> </span></a>|
          <span> </span>
          <a href="https://www.16personalities.com/ko/%EC%84%B1%EA%B2%A9%EC%9C%A0%ED%98%95-infp">INFP 중재자<span> </span></a>|
          <span> </span>
          <a href="https://www.16personalities.com/ko/%EC%84%B1%EA%B2%A9%EC%9C%A0%ED%98%95-enfj">ENFJ 선도자<span> </span></a>|
          <span> </span>
          <a href="https://www.16personalities.com/ko/%EC%84%B1%EA%B2%A9%EC%9C%A0%ED%98%95-enfp">ENFP 활동가</a>
        </div>
      </div>

      <div className="mbti-box">
        <h2 className="title-box3">관리자형</h2>
        <div className="mbti-t3">
        <ul className="mbti-image3">
        <img src={현실주의자}></img>
        <span> </span>
        <img src={수호자}></img>
        <span> </span>
        <img src={경영자}></img>
        <span> </span>
        <img src={집정관}></img>
        </ul>
        <br></br>
          <a href="https://www.16personalities.com/ko/%EC%84%B1%EA%B2%A9%EC%9C%A0%ED%98%95-istj">ISTJ 현실주의자<span> </span></a>|
          <span> </span>
          <a href="https://www.16personalities.com/ko/%EC%84%B1%EA%B2%A9%EC%9C%A0%ED%98%95-isfj">ISFJ 수호자<span> </span></a>|
          <span> </span>
          <a href="https://www.16personalities.com/ko/%EC%84%B1%EA%B2%A9%EC%9C%A0%ED%98%95-estj">ESTJ 경영자<span> </span></a>|
          <span> </span>
          <a href="https://www.16personalities.com/ko/%EC%84%B1%EA%B2%A9%EC%9C%A0%ED%98%95-esfj">ESFJ 집정관<span> </span></a>
        </div>
      </div>
      <br></br>
      <div className="mbti-box">
        <h2 className="title-box4">탐험가형</h2>
          <div className="mbti-t4">
          <ul className="mbti-image4">
        <img src={장인}></img>
        <span> </span>
        <img src={모험가}></img>
        <span> </span>
        <img src={사업가}></img>
        <span> </span>
        <img src={연예인}></img>
        
        </ul>
        <br></br>
            <a href="https://www.16personalities.com/ko/%EC%84%B1%EA%B2%A9%EC%9C%A0%ED%98%95-istp"><span> </span>ISTP 장인<span> </span></a>|
            <span> </span>
            <a href="https://www.16personalities.com/ko/%EC%84%B1%EA%B2%A9%EC%9C%A0%ED%98%95-isfp">ISFP 모험가<span> </span></a>|
            <span> </span>
            <a href="https://www.16personalities.com/ko/%EC%84%B1%EA%B2%A9%EC%9C%A0%ED%98%95-estp">ESTP 사업가<span> </span></a>|
            <span> </span>
            <a href="https://www.16personalities.com/ko/%EC%84%B1%EA%B2%A9%EC%9C%A0%ED%98%95-esfp">ESFP 연예인<span> </span></a>
          </div>
        </div>
      </div>
      </div>
    
  );
}
export default MbtiTypes;