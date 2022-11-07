import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import TeamAPI from '../../api/TeamAPI';
import hangjungdong from "../../hangjungdong";
import '../../CSS/Style_Login.css'
import { Link } from 'react-router-dom';
import noImage from '../../images/no_image.gif';
import '../../CSS/Style_Login.css'
import axios from 'axios';

// 정규식 조건
// 조혜경 : 이름 정규식 추가
const regexName = /^[ㄱ-ㅎ가-힣]{2,20}$/;
const regexId = /^\w{5,20}$/;
// const regexPw = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
const regexPw = /^\w{8,20}$/;

const MemberListBlock = styled.div`
box-sizing: border-box;
padding-bottom: 3em;
width: 768px;
margin: 0 auto;
margin-top: 2rem;
@media screen and (max-width: 768px) {
  width: 100%;
  padding-left: 1em;
  padding-right:1em;
}
`;

const Msg = styled.div`
  color: white;
  font-size: .8em;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;


function MemberUpdate() {
    const localId = window.localStorage.getItem("userId");
    const localPw = window.localStorage.getItem("userPw");
    const isLogin = window.localStorage.getItem("isLogin");
    if(isLogin === "FALSE") window.location.replace("/");
    const DOMAIN = 'http://localhost:8111/ISOUR/MemberInfo/file/';


  // 이름, 아이디, 비밀번호, 비밀번호 확인, 생년월일, 성별, 주소, 회원가입
  // 조혜경 : 입력 받을 값 상태
  const [memberInfo, setMemberInfo] = useState([]); // 현재 로그인 되어 있는 회원의 정보 저장용
  const imgRef = useRef(null);

  const [ files, SetFiles ] = useState({noImage});
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [birth, setBirth] = useState('');
  const [age, setAge] = useState("");
  const [gender, setGender] = useState('');

  const { sido, sigugun } = hangjungdong;
  const [region1, setRegion1] = useState("");
  const [region2, setRegion2] = useState("");
  const [keySido, setKeySido] = useState("");
  const [MBTI, setMBTI] = useState("");
  
  const today = new Date();

  const [isBirth, setIsBirth] = useState(false);
  const [isGender, setIsGender] = useState(false);
  const [isRegion1, setIsRegion1] = useState(false);
  const [isRegion2, setIsRegion2] = useState(false);
  const [isFileUP, setIsFileUp] = useState(false);

  // 파일 업로드 관련 함수
  const onFileUpload = (e) => {
    SetFiles(e.target.files[0]);
    console.log("이거!" + files);
    setIsFileUp(true)
  }

  const handleClick = () => {
    const formData = new FormData();
    formData.append('uploadImage', files);
    formData.append('Id', localId);

    for(let value of formData.values()) {
      console.log(value);
    }

    const config = {
      Header: {
        'content-type': 'multipart/form-data',
      },
    };
    // https://bewci01vce.execute-api.ap-northeast-2.amazonaws.com/prod/isour-file-upload
    // http://localhost:8090/ISOUR/UploadService
    axios.post('http://localhost:8111/ISOUR/UploadService', formData, config).then(() => { // API Gateway URL 입력
      console.log(localId);
    });
};

  useEffect(() => {  
    const memberData = async () => {
        console.log("localId : "+ localId);
        try {
            const response = await TeamAPI.memberInfo(localId); // 회원 정보 조회
            setMemberInfo(response.data);
            console.log(response.data)
        } catch (e) {
            console.log(e);
        }
    };
    memberData();
}, []);

const onChangeName = e => { 
  let temp_name = e.target.value;
  setName(temp_name); 
}
  
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
    let temp_gender = e.target.value;
    setGender(temp_gender);
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

  const onClickButton = async() => {
    if (isFileUP === true) {
      handleClick();
    }

     console.log(document.getElementById("inputId").value);
     setId(document.getElementById("inputId").value);
    // if(isBirth && isGender && isRegion1 && isRegion2) {
        // }
      const MemberUpdate = await TeamAPI.MemberUpdate(name, localId, localPw, birth, age, gender, region1, region2);
  
        console.log("name : " + name);
        console.log("id : " + localId);
        console.log("password : " + localPw);
        console.log("birth : " + birth);
        console.log("age : " + age);
        console.log("gender : " + gender);
        console.log("region1 : " + region1);
        console.log("region2 : " + region2);
        console.log("가입 완!!");
        alert("콘솔창 확인용");
        window.location.replace("/");
    // } else {
    //   console.log("잘못 입력한 값이 있거나 입력되지 않은 값이 있어요.");
    //   alert('입력된 값을 확인하세요.');
  }
  
// 이미지 업로드 input의 onChange
  // const saveImgFile = (e) => {
  //   const file = imgRef.current.files[0];
  //   const reader = new FileReader();
  //     reader.readAsDataURL(file);
  //     reader.onloadend = () => {
  //         SetFiles(reader.result);
  //      };
  //   // SetFiles(e.target.files[0]);
  //   // console.log("이거!" + files);
  // };

  

  return (
    <div className='Container'>
       {memberInfo.map(member => (
          <div key={member.id}>
        <table className='memberUpdate-table'>
          <colgroup> 
            <col width="50%" /> 
            <col width="50%" /> 
          </colgroup>
            <tr>
              <td colSpan="2" align='center' style={{width:"300px", padding:'20px'}}>
                <h1 style={{fontSize: '30px'}}>회원 정보 수정</h1>
              </td>
            </tr>
            <tr>
              <td colSpan="2" align='center' >
                <form className='profileImg-label' >     
                  { member.fileName ?  
                    <img src={`${DOMAIN}` + `${member.fileName}`} width='160px' height='200px'/>
                    : <img src={noImage} width='160px' height='200px' />
                  }
                  <label htmlFor='image'>
                  <input className="profileImg-input" type='file' display='none' id='image' accept='image/*' onChange={onFileUpload} />
                   <br />프로필사진 추가 
                  </label>         
                </form>
              </td>
            </tr>
            <tr>
              <th>이름</th>
              <td><input type="text" value={name} placeholder={member.name} required onChange={onChangeName}/></td>
            </tr>
            <tr>
              <th>아이디</th>
              <td><input type="text" value={password} placeholder={member.id} disabled required id="inputId" readOnly/></td>
            </tr>
            <tr>
              <th>비밀번호</th>
              <td><input type="password" value={member.password} disabled readOnly/></td>
            </tr>
            <tr>
              <th>생년월일</th>
              <td><input type="date" value={member.birth} readOnly />
                  <span>만 {member.age}세</span>
              </td>
            </tr>
            <tr>
              <th>성별</th>
              <td>
              <label>
                {(`${member.gender}` === "남자") ?  
                    <input type="radio" name="gender" value="남자" checked readOnly /> 
                    : <input type="radio" name="gender" value="남자" readOnly />
                } 남자

                {(`${member.gender}` === "여자") ?  
                    <input type="radio" name="gender" value="여자" checked readOnly /> 
                    : <input type="radio" name="gender" value="여자" readOnly />
                } 여자
              </label>
              </td>
            </tr>
            <tr>
              <th>주소</th>
              <td>
              <select defaultValue={member.region1} onChange={onChangeRegion1}>
                  <option disabled >시도선택</option>
                  {sido.map((e) => (
                  <option key={e.sido} value={e.codeNm} >
                      {e.codeNm}
                  </option>
                  ))}
              </select>
              <select defaultValue={member.region2} onChange={onChangeRegion2}>
                  <option disabled >시/구/군선택</option>
                  
                  {sigugun
                  // 필터함수를 사용하여 배열을 필터링하여 군/구를 불러옴
                  .filter((e) => e.sido === `${member.region1}` )
                  .map((e) => (
                      <option key={e.sigugun} value={e.codeNm}>
                      {e.codeNm}
                      </option>
                  ))}
                </select>
              </td>
            </tr>
            <tr>
              <th>MBTI</th>
              <td>
                <input type="text" value={member.MBTI} disabled />
              </td>
            </tr>
            <tr>
              <th>자기소개</th>
              <td>
                <textarea style={{width: '212px', height: '136px'}} placeholder='임시로 만들어 둠'/>
              </td>
            </tr>
            <tr>
                  <br />
                </tr>
        </table>
       
        
        {/* 사진 업로드 완 */}
        

        {/* <form className='upload_input'>  
          <label htmlFor='image' className="profileImg-label">
          { member.fileName ?  
              <img src={`${DOMAIN}` + `${member.fileName}`} width='80px' height='100px'/>
              : <img src={noImage} width='80px' height='100px' />
            }
          <input className="profileImg-input" type='file' display='none' id='image' accept='image/*' onChange={onFileUpload} />
          프로필사진 추가
          </label>         
        </form> */}


        {/* 업로드 된 이미지 미리보기 */}
        {/* {(files !== '') ? 
          <img src={files} alt="프로필 이미지" />
        : <img src={files} alt="프로필 이미지" />
        } */}
        {/* 이미지 업로드 input */}
        {/* <input
        type="file"
        accept="image/*"
        id="profileImg"
        onChange={saveImgFile}
        ref={imgRef}
        /> */}
        {/* <form>
          <label className="signup-profileImg-label" htmlFor="profileImg">프로필 이미지 추가</label>
            <input
            className="signup-profileImg-input"
            type="file"
            accept="image/*"
            id="profileImg"
          />
        </form> */}
      
    </div>
    ))}
        {/* 저장하기 */}
        <div className='memberUpdate-btn'>
          <Link to="/" ><button type="submit">취소하기</button></Link>
          <button type="submit" onClick={onClickButton}>저장하기</button>
        </div>
    </div>
  )
}

    

export default MemberUpdate;