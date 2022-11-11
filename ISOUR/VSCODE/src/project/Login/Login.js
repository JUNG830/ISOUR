import React, { useState } from 'react';
import TeamAPI from '../api/TeamAPI';
import '../CSS/Style_Login.css';
import logo from '../images/logo.png';

const regexPw = /^\w{8,20}$/;

function Login() {
  // ▼ 로그인되어 있으면 바로 HOME 으로 이동 
  const isLogin = window.localStorage.getItem("isLogin");
  if(isLogin === "TRUE") window.location.replace("/home");
  // ▲ 로그인되어 있으면 바로 HOME 으로 이동

  const [id, setId] = useState("");
  const [pwd, setPwd] = useState("");

  /*
  아이디 변경 */
  const onChangeId = (e) => {
    let temp_id = e.target.value;
    setId(temp_id);
  }

  /*
  비밀번호 변경 */
  const onChangePwd = (e) => {
    let temp_pwd = e.target.value;
    setPwd(temp_pwd);
  }

  /*
  Login 버튼 클릭 */
  const onClickLogin = async(e) => {
    e.preventDefault();

    console.log("입력한 ID : " + id);
    console.log("입력한 Password : " + pwd);
    console.log("LOGIN 버튼 눌렀어요.");

    try {
      const res = await TeamAPI.userLogin(id, pwd);
      // 로그인을 위한 axios 호출
      console.log("호출 TRY: " + res.data.result);

      if(res.data.result === "OK") {
        window.localStorage.setItem("userId", id);
        window.localStorage.setItem("userPw", pwd);
        window.localStorage.setItem("isLogin", "TRUE");
        window.location.replace("/home");
      } else {
        alert("아이디 또는 비밀번호를 확인하세요!");
      }
    } catch (e) {
      console.log("e");
    }
  }

  return(
    <div className="Login-Container">
      <div className="Login-card-container">
        <div className="Login-card">

          <div className="Login-card-logo">
            <img src={logo} alt="logo" />
          </div>

          <div className="Login-card-header">
            <h1>Sign In</h1>
            <div>Please login to use platform</div>
          </div>

          <form action="" className="Login-card-form">

          {/* 아이디 */}
            <div className="Form-item">
              <span className="Form-item-icon material-symbols-rounded">account_circle</span>
              <input type="text" placeholder="Enter ID" value={id} onChange={onChangeId} required />
            </div>

          {/* 비밀번호 */}
            <div className="Form-item">
              <span className="Form-item-icon material-symbols-rounded">lock</span>
              <input type="password" placeholder="Enter Password" value ={pwd} onChange={onChangePwd} />
            </div>

            <div className="Form-item-other">
              <a href="/">I forgot my password</a>
            </div>

            <button type="submit" onClick={onClickLogin}>Login</button>

          </form>

          <div className="Login-card-footer">
            Don't have an account? <a href="/signup">Create a free account</a>.
          </div>

        </div> {/* Login-card 의 끝 */}

        <div className="Login-card-social">
          <div>Other Sign-in Platform</div>

          <div className="Login-card-social-btns">
            <a href="/">
              <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-brand-facebook" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3"></path>
              </svg>
            </a>

            <a href="/">
              <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-brand-google" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M17.788 5.108a9 9 0 1 0 3.212 6.892h-8"></path>
              </svg>
            </a>
          </div>

        </div> {/* Login-card-social 의 끝 */}

      </div> {/* Login-card-container 의 끝 */}
    </div>
  );
}

export default Login;