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