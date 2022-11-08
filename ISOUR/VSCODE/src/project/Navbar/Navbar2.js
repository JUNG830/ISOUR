import { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../CSS/nav.css";
import logo from '../images/logo.png';


// npm install react-icons --save  설치!!

function Navbar2() {
    const uavRef = useRef();
    const localId = window.localStorage.getItem("userId");

    const showNavBar = () => {
        uavRef.current.classList.toggle("responsive_nav");
    }

    // 로그아웃 by 조혜경 (수정 필요할 수도 있음)
    const onClickLogout = () => {
      const currentId = window.localStorage.getItem("userId");
      const currentPw = window.localStorage.getItem("userPw");
  
      console.log("\n\n현재 localStorage 에 저장된 ID : " + currentId);
      console.log("\n\n현재 localStorage 에 저장된 PASSWORD : " + currentPw);

      const logoutID = window.localStorage.setItem("userId", "");
      const logoutPW =window.localStorage.setItem("userPw", "");
      window.localStorage.setItem("isLogin", "FALSE");
      
      console.log("로그아웃 ID : " + logoutID)
      console.log("로그아웃 PW : " + logoutPW)
      alert("콘솔 확인용");
      window.location.replace("/");
    }

    return(
        <header>
            <div className="logo">
                {/* <Link to="/"> */}
                    <img src={logo} alt='logo' />
                    <h3>MBTISOUR</h3>
                {/* </Link> */}
            </div>
            <nav ref={uavRef}>
                <a href="/">HOME</a>
                <a href="/Exam">TEST</a>
                <a href="/MbtiTypes">BOARD</a>
                {(localId === 'admin') ? 
                    <a href="/AdminMemberInfo">My Page</a>
                    :  <a href="/mypage">My Page</a>
                }
                <button onClick={onClickLogout}>로그아웃</button>
                {/* 닫기 버튼 */}
                <button className="nav-btn nav-colse-btn" onClick={showNavBar}>
                   <FaTimes /> 
                </button>
            </nav>
            {/* 누르면 하위 항복이 보이게 해줌 */}
            <button className="nav-btn" onClick={showNavBar}>
                <FaBars />
            </button>
        </header>
    );
}

export default Navbar2;