import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import TeamAPI from '../../api/TeamAPI';
import hangjungdong from "../../hangjungdong";
import '../../CSS/MyPage.css'
import { Link } from 'react-router-dom';
import noImage from '../../images/no_image.gif'
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
  const [addressChange, setAddressChange] = useState(false);
  const [mbti, setMbti] = useState("");
  
  const today = new Date();

  const [isBirth, setIsBirth] = useState(false);
  const [isGender, setIsGender] = useState(false);
  const [isRegion1, setIsRegion1] = useState(false);
  const [isRegion2, setIsRegion2] = useState(false);

  // 프로필 사진 추가 여부 확인
  const [isFileUP, setIsFileUp] = useState(false); 

  // 파일 업로드 관련 함수
  // const onFileUpload = (e) => {
  //   SetFiles(e.target.files[0]);
  //   console.log("이거!" + files);
  //   setIsFileUp(true)
  // }

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

  const [memberInfo, setMemberInfo] = useState([]); // 현재 로그인 되어 있는 회원의 정보 저장용
  useEffect(() => {  
    const memberData = async () => {
        console.log("localId : "+ localId);
        try {
            const response = await TeamAPI.memberInfo(localId); // 회원 정보 조회
            const temp_response = response.data;
            setMemberInfo(temp_response);

            setName(temp_response[0].name);
            console.log("name : " + temp_response[0].name);

            setBirth(temp_response[0].birth);
            console.log("birth : " + temp_response[0].birth);

            setAge(temp_response[0].age);
            console.log("age : " + temp_response[0].age);

            setGender(temp_response[0].gender);
            console.log("gender : " + temp_response[0].gender);

            setRegion1(temp_response[0].region1);
            console.log("region1 : " + temp_response[0].region1);

            setRegion2(temp_response[0].region2);
            console.log("region2 : " + temp_response[0].region2);

            setMbti(temp_response[0].mbti);
            console.log("mbti : " + temp_response[0].mbti);
            // setName(temp_response.name);
            
        } catch (e) {
            console.log(e);
        }
    };
    memberData();
  }, []);

  const onChangeName = e => {
    console.log("name : " + name);
    let temp_name = e.target.value;
    setName(temp_name); 
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
        window.location.replace("/mypage");
    // } else {
    //   console.log("잘못 입력한 값이 있거나 입력되지 않은 값이 있어요.");
    //   alert('입력된 값을 확인하세요.');
  }

  const onClickChange = () => {
    setAddressChange(true);
  }

  function selectAddress1() {

    return (
      <>

<select className='Select-Sido' onChange={onChangeRegion1}>
                <option disabled selected>시도선택</option>
                {sido.map((e) => (
                  <option key={e.sido} value={e.codeNm}>
                    {e.codeNm}
                  </option>
                ))}
              </select>
      </>
    );
  }
  const selectAddress2 = () => {

    return (
      <>
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
      </>
    );
  }

  // 프로필 사진 미리보기
  const [imageSrc, setImageSrc] = useState('');

  const encodeFileToBase64 = (fileBlob) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise((resolve) => {
      reader.onload = () => {
        setImageSrc(reader.result);
        resolve();
      };
      SetFiles(fileBlob);
      console.log("이거!" + files);
      setIsFileUp(true)
    });
  };

  
  return (
    <div className='MyPage-Container'>
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
                  { isFileUP ?  
                     <img src={imageSrc} style={{borderRadius:'70%', width: '200px'}} />
                    : member.fileName ?
                           <img src={`${DOMAIN}` + `${member.fileName}`} style={{borderRadius:'70%', width: '200px'}} />
                           : <img src={noImage} style={{borderRadius:'70%', width: '200px'}} /> 
                  } 
              </td>   
            </tr>           
            <tr>
              <td colSpan="2" align='center' >
                <form className='profileImg-label' >
                  <label className='profileImg-label'>
                    <input className="profileImg-input" type='file' display='none' id='image' accept='image/*' onChange={(e) => {encodeFileToBase64(e.target.files[0])}} />
                    프로필사진 추가
                  </label> 
                </form>
              </td> 
            </tr>
            <tr>
              <th>이름</th>
              {/* <td><input type="text" value={name} placeholder={member.name} required onChange={onChangeName}/></td> */}
              <td><input type="text" value={name} onChange={onChangeName}/></td>
            </tr>
            <tr>
              <th>아이디</th>
              <td><input type="text" value={id} placeholder={member.id} id="inputId"/></td>
            </tr>
            <tr>
              <th>비밀번호</th>
              <td><input type="password" value={password} /></td>
            </tr>
            <tr>
              <th>생년월일</th>
              <td><input type="date" value={birth} onChange={onChangeBirth}/>
                  <span >만 {age}세</span>
              </td>
            </tr>
            <tr>
              <th>성별</th>
              <td>
                <label>
                  { (gender == '남자') 
                  ? <input type="radio" name="gender" value="남자" onChange={onChangeRadio} checked/>
                  : <input type="radio" name="gender" value="남자" onChange={onChangeRadio}/>
                  }
                <span>남자</span>
                </label>
                <label>
                { (gender == '여자') 
                  ? <input type="radio" name="gender" value="여자" onChange={onChangeRadio} checked/>
                  : <input type="radio" name="gender" value="여자" onChange={onChangeRadio} />}
                  <span>여자</span>
                </label>
              </td>
            </tr>
            <tr>
              <th>주소</th>
              <td>
                  {(addressChange !== true)
                
                    ? <select onChange={onChangeRegion1}>
                      <option>{region1}</option>
                      </select>
                    : <selectAddress1></selectAddress1>
                  }
                

                
                  {(addressChange !== true)
                    ? <select onChange={onChangeRegion1}>
                      <option>{region2}</option>
                      </select>
                    : <selectAddress2 />
                  }
                <button onClick={onClickChange}>변경</button>
              </td>

                  {/* 
              <td>
                { (addressChange === false)
                ? <>
                  
                  </>
                : <>
                  <select onChange={onChangeRegion1}>
                    <option disabled selected>시도선택</option>
                    {sido.map((e) => (
                      <option key={e.sido} value={e.codeNm}>
                        {e.codeNm}
                      </option>
                    ))}
                  </select>
                  <select onChange={onChangeRegion2}>
                    <option disabled selected>시/구/군선택</option>
                    
                    {sigugun
                    // 필터함수를 사용하여 배열을 필터링하여 군/구를 불러옴
                      .filter((e) => e.sido === keySido)
                      .map((e) => (
                        <option key={e.sigugun} value={e.codeNm}>
                          {e.codeNm}
                        </option>
                    ))}
                  </select></>
                }
                
                
              </td>
               */}
              {/* 
              <td>
              <select value={region1} onChange={onChangeRegion1} >
                <option disabled>시도선택</option>
                  {sido.map((e) => (
                  <option key={e.sido} value={e.codeNm} >
                    {e.codeNm}
                  </option>
                  ))}
              </select>
              <select defaultValue={region2} onChange={onChangeRegion2} >
                  <option disabled>시/구/군선택</option>
                  
                  {sigugun
                // 필터함수를 사용하여 배열을 필터링하여 군/구를 불러옴
                  .filter((e) => e.sido === keySido)
                  .map((e) => (
                    <option key={e.sigugun} value={e.codeNm}>
                      {e.codeNm}
                    </option>
                  ))}
              </select>
              </td>
               */}
            </tr>

          {/* MBTI */}
            <tr>
              <th>MBTI</th>
              <td>
                <input type="text" value={mbti} disabled />
              </td>
            </tr>

          {/* 자기소개 */}
            <tr>
              <th>자기소개</th>
              <td>
                {/* <textarea style={{width: '250px', height: '136px'}} placeholder='자기소개 한 줄 작성(글자 수 제한)'/> */}
                <textarea placeholder='자기소개 한 줄 작성(글자 수 제한)'/>
              </td>
            </tr>

          {/* 빈 줄 */}  
            {/* <tr>
                  <br />
                </tr> */}
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