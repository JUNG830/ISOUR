import { useState, useCallback } from 'react';
import styled from 'styled-components';
import TeamAPI from '../api/TeamAPI';
import hangjungdong from "../hangjungdong";
import '../CSS/Style_SignUp.css';
import logo from '../images/logo.png';

// 정규식 조건

// 조혜경 : 이름 정규식 추가
const regexName = /^[ㄱ-ㅎ가-힣]{2,20}$/;

const regexId = /^\w{5,20}$/;
// const regexPw = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
const regexPw = /^\w{8,20}$/;


const Msg = styled.div`
  color: orangered;
  font-size: calc(1rem * .8);
  display: flex;
  justify-content: flex-end;
  height: 1.5rem;
  margin-right: 20px;
  align-items: center; // 세로 기준으로 가운데 정렬
`;



function SignUp() {
  // 이름, 아이디, 비밀번호, 비밀번호 확인, 생년월일, 성별, 주소, 회원가입
  // 조혜경 : 입력 받을 값 상태
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [password_check, setPassword_check] = useState('');
  const [birth, setBirth] = useState('');
  const [age, setAge] = useState("");
  const [gender, setGender] = useState('');

  const { sido, sigugun } = hangjungdong;
  const [region1, setRegion1] = useState("");
  const [region2, setRegion2] = useState("");
  const [keySido, setKeySido] = useState("");

  const today = new Date();


  // 조혜경 : 보여줄 문구 따로 빼기
  const req_name = "이름을 정확히 입력하세요."
  const req_id = "아이디를 입력하세요."
  const guide_id = "아이디를 올바르게 입력해주세요."
  const guide_password = "임시 정규식 : 8~20자"
  const accept_password = "사용 가능한 비밀번호입니다."
  const error_password_check = "비밀번호가 일치하지 않습니다."
  const accept_password_check = "비밀번호가 일치합니다."
  const accept_id = "사용 가능한 ID 입니다.";

  // 조혜경 : 보여줄 문구 상태
  const [showReqName, setShowReqName] = useState(false);
  const [showReqId, setShowReqId] = useState(false);
  const [showAcceptId, setShowAcceptId] = useState(false);
  const [showGuideId, setShowGuideId] = useState(false);
  const [showGuidePassword, setShowGuidePassword] = useState(false);
  const [showAcceptPassword, setShowAcceptPassword] = useState(false);
  const [showErrorPasswordCheck, setShowErrorPasswordCheck] = useState(false);
  const [showAcceptPasswordCheck, setShowAcceptPasswordCheck] = useState(false);
  
  // 유효성 검사
  const [isName, setIsName] = useState(false);
  const [isId, setIsId] = useState(false);
  const [isId_check, setIsId_check] = useState(false);
  const [isPassword, setIsPassword] = useState(false)
  const [isPassword_check, setIsPassword_check] = useState(false);
  const [isBirth, setIsBirth] = useState(false);
  const [isGender, setIsGender] = useState(false);
  const [isRegion1, setIsRegion1] = useState(false);
  const [isRegion2, setIsRegion2] = useState(false);

  const onChangeName = e => { 
    let temp_name = e.target.value;
    setName(temp_name); 

    // 조혜경 : if 조건식 수정
    if(temp_name === '' || !regexName.test(temp_name)) {
      setIsName(false);
      setShowReqName(true); // 이름을 정확히 입력하세요.
    } else {
      setIsName(true);
      setShowReqName(false); // 이름을 정확히 입력하세요.
    }
  };

  const onChangeId = e => {
    setIsId_check(false);

    let temp_id = e.target.value; 
    setId(temp_id);

    if(temp_id === '') {
      setIsId(false);
      setShowReqId(true); // 아이디를 입력하세요.
      setShowGuideId(false); // 아이디를 올바르게 입력해주세요.
    } else if (!regexId.test(temp_id)) {
      setIsId(false);
      setShowReqId(false); // 아이디를 입력하세요.
      setShowGuideId(true); // 아이디를 올바르게 입력해주세요.
    } else {
      setIsId(true);
      setShowReqId(false); // 아이디를 입력하세요.
      setShowGuideId(false); // 아이디를 올바르게 입력해주세요.
    }
  };
  
  const onClickIdCheck = async(e) => {
    e.preventDefault();
    setIsId_check(false);
    console.log("\n\n중복확인 버튼 눌렀어요.");

    if(id === '' || !regexId.test(id)) {
      console.log("아이디를 입력하지 않았거나 정규식에 맞지 않아요.");
      alert("먼저, 아이디를 확인하세요.");
    } else {
      setIsId_check(true);
      // 가입 여부 우선 확인
      const memberCheck = await TeamAPI.memberRegCheck(id);
      console.log("memberCheck.data.result : " + memberCheck.data.result);
      if(memberCheck.data.result === true) {
        setId("");
        alert("이미 가입되어 있는 ID 입니다.");
        console.log("이미 가입되어 있는 ID 입니다.");
      } else {
        alert("사용 가능한 ID 입니다.");
        console.log("사용 가능한 ID 입니다.");
      }
    }
  }

  const onChangePassword = e => {
    setIsPassword(false);
    setIsPassword_check(false);

    let temp_password = e.target.value;
    setPassword(temp_password);

    if(regexPw.test(temp_password)) {
      setIsPassword(true);
      setShowAcceptPassword(true); // 사용 가능한 비밀번호입니다.
      setShowGuidePassword(false); // 임시 정규식 : 8~20자
    } else {
      setIsPassword(false);
      setShowAcceptPassword(false); // 사용 가능한 비밀번호입니다.
      setShowGuidePassword(true); // 임시 정규식 : 8~20자
    }

    if (password_check == '') console.log(password_check);
    else if(password_check !== '' && (temp_password !== '' && temp_password === password_check)) {
      setIsPassword_check(true);
      setShowAcceptPasswordCheck(true); // 비밀번호가 일치합니다.
      setShowErrorPasswordCheck(false); // 비밀번호가 일치하지 않습니다.
    } else {
      setIsPassword_check(false);
      setShowErrorPasswordCheck(true); // 비밀번호가 일치하지 않습니다.
      setShowAcceptPasswordCheck(false); // 비밀번호가 일치합니다.
    }
  };

  const onChangePassword_check = e => {
    const temp_password_check = e.target.value;
    setPassword_check(temp_password_check);
    
    if (password === temp_password_check) {
      setIsPassword_check(true);
      setShowAcceptPasswordCheck(true); // 비밀번호가 일치합니다.
      setShowErrorPasswordCheck(false); // 비밀번호가 일치하지 않습니다.
    } else {
      setIsPassword_check(false);
      setShowErrorPasswordCheck(true); // 비밀번호가 일치하지 않습니다.
      setShowAcceptPasswordCheck(false); // 비밀번호가 일치합니다.
    }
  };
  
  const onChangeBirth = e => { 
    setIsBirth(false);

    let temp_birth = e.target.value;
    setBirth(temp_birth); 
    console.log("\n\ntemp_birth : " + temp_birth);

    if(temp_birth !== null) {
      setIsBirth(true);
      const birthArray = temp_birth.split('-');
      // console.log("birthArray : " + birthArray);

      console.log("태어난 연도 : " + birthArray[0]);
      console.log("태어난 월 : " + birthArray[1]);
      console.log("태어난 일 : " + birthArray[2]);

      // 1992-02-20
      // 0123456789
      setAge(String(today.getFullYear() - birthArray[0]));

      console.log("오늘은 몇 년도? "+ String(today.getFullYear()));

      const m = today.getMonth() - birthArray[1]; 
      console.log("오늘 몇 월인가요?" + today.getMonth());
      console.log("m의 값은 얼마인가요? " + m);

      if (m < 0 || (m === 0 && today.getDate() < birthArray[2])) {
        setAge(String(age-1));
      }
    }
    console.log("age : " + age);
    console.log("typeof(age) : " + typeof(age));

  };

  const onChangeRadio = e => {
    let temp_sex = e.target.value;
    console.log(temp_sex);
    setGender(temp_sex);
    setIsGender(true);

  };
  
  const onChangeRegion1 = (e) => {
    setIsRegion1(true);

    let temp_region1 = e.target.value;
    console.log("\n\n시도선택 : " + temp_region1); // 서울특별시
    setRegion1(temp_region1);

    // 서울특별시의 객체 인덱스를 받아
    const indexSido = sido.findIndex(e => e.codeNm === temp_region1);
    // console.log("indexSido : " + indexSido);

    let temp_keySido = sido.at(indexSido).sido;
    // console.log("temp_keySido : " + temp_keySido);
    setKeySido(temp_keySido);
    
  }

  const onChangeRegion2 = (e) => {
    setIsRegion2(true);

    let temp_region2 = e.target.value;
    console.log("\n\n시/구/군선택 : " + temp_region2);
    setRegion2(e.target.value);
  }

  const onClickButton = async(e) => {
    e.preventDefault();
    console.log("\n\n★★★★★★★★★★");
    console.log("회원가입 버튼 눌렀어요.");
    console.log("isName : " + isName);
    console.log("isId : " + isId);
    console.log("isId_check : " + isId_check);
    console.log("isPassword : " + isPassword);
    console.log("isPassword_check : " + isPassword_check);
    console.log("isBirth : " + isBirth);
    console.log("isGender : " + isGender);
    console.log("isRegion1 : " + isRegion1);
    console.log("isRegion2 : " + isRegion2);
    
    if(isName && isId && isId_check && isPassword && isBirth && isGender && isRegion1 && isRegion2) {
      const memberReg = await TeamAPI.memberReg(name, id, password, birth, age, gender, region1, region2);
  
        console.log("name : " + name);
        console.log("id : " + id);
        console.log("password : " + password);
        console.log("birth : " + birth);
        console.log("age : " + age);
        console.log("gender : " + gender);
        console.log("region1 : " + region1);
        console.log("region2 : " + region2);
        console.log("가입 완!!");
        alert("콘솔창 확인용");
        window.location.replace("/login");
    } else {
      console.log("잘못 입력한 값이 있거나 입력되지 않은 값이 있어요.");
      alert('입력된 값을 확인하세요.');
    }
  }

  return ( 
    <div className='SignUp-Container'>
      <div className='SignUp-card-container'>
      <div className="SignUp-card">
        
        <div className="SignUp-card-logo">
          <img src={logo} alt="logo" />
        </div>

        <div className="SignUp-card-header">
            <h1>Sign Up</h1>
            <div>회원정보를 입력해주세요</div>
          </div>

        <form action="" className="SignUp-card-form">
        {/* 이름 */}
            <div className="Form-item">
              {/* <span style={{display: 'inline-block', width: 150}}>이름</span> */}
              <span className="Form-item-icon material-symbols-rounded">person</span>
              <input type="text" className='Input-Name' placeholder="이름" value={name} onChange={onChangeName} required />
              <Msg>
                {showReqName && req_name}
              </Msg>
            </div>

        {/* 아이디 */}
            <div className="Form-item">
              <span className="Form-item-icon material-symbols-rounded">account_circle</span>
              <input type="text" className='Input-ID' placeholder="아이디" value={id} onChange={onChangeId} required/>
              <button onClick={onClickIdCheck} className='Input-ID-check' required> 중복확인 </button>
              <Msg>
                {showReqId && req_id}
                {showGuideId && guide_id}
                {showAcceptId && accept_id}
              </Msg>
            </div>
        
          
        {/* 비밀번호 */}
            <div className="Form-item">
              <span className="Form-item-icon material-symbols-rounded">lock</span>
              <input type="password" placeholder="비밀번호" value={password} onChange={onChangePassword} />
              <Msg>
                {showGuidePassword && guide_password}
                {showAcceptPassword && accept_password}
              </Msg>
            </div>

        {/* 비밀번호 확인 */}
            <div className="Form-item">
              <span className="Form-item-icon material-symbols-rounded">password</span>
              <input type="password" placeholder="비밀번호 확인" value={password_check} onChange={onChangePassword_check} disabled={!regexPw.test(password)}/>
              <Msg>
                {showErrorPasswordCheck && error_password_check}
                {showAcceptPasswordCheck && accept_password_check}
              </Msg>
            </div>

        {/* 생년월일 */}
            <div className="Form-item">
              <span className="Form-item-icon material-symbols-rounded">cake</span>
              <input type="date" value={birth} onChange={onChangeBirth} />
              <span className='Span-Age'>만 {age}세</span>
              <Msg>생년월일을 선택하세요</Msg>
            </div>

        {/* 성별 */}
            <div className="Form-item">
            <div className='Form-item-Gender'>
              <span className="Form-item-icon material-symbols-rounded">touch_app</span>
                <label className='Label-gender'>
                  <input type="radio" name="gender" value="남자" onChange={onChangeRadio} />
                  <span>남자</span>
                </label>
                <label className='Label-gender'>
                  <input type="radio" name="gender" value="여자" onChange={onChangeRadio} />
                  <span>여자</span>
                </label>
              </div>
              <Msg></Msg>
            </div>


        {/* 주소 */}
          <div className="Form-item">
            <div className='Form-item-Address'>
              <span className="Form-item-icon material-symbols-rounded">home</span>
              <select className='Select-Sido' onChange={onChangeRegion1}>
                <option disabled selected>시도선택</option>
                {sido.map((e) => (
                  <option key={e.sido} value={e.codeNm}>
                    {e.codeNm}
                  </option>
                ))}
              </select>
              <select className='Select-SiGuGun' onChange={onChangeRegion2}>
                <option disabled selected>시/구/군선택</option>
                
                {sigugun
                // 필터함수를 사용하여 배열을 필터링하여 군/구를 불러옴
                  .filter((e) => e.sido === keySido)
                  .map((e) => (
                    <option key={e.sigugun} value={e.codeNm}>
                      {e.codeNm}
                    </option>
                  ))}
              </select>
            </div>
              <Msg>주소를 선택하세요</Msg>
          </div>

        {/* 회원가입 */}
          <button type="submit" className='Button-Submit' onClick={onClickButton}>회원가입</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;