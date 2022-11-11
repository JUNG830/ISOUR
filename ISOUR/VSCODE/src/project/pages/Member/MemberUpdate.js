import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import TeamAPI from '../../api/TeamAPI';
import hangjungdong from "../../hangjungdong";
import '../../CSS/MyPage.css'
import { Link } from 'react-router-dom';
import noImage from '../../images/no_image.gif'
import axios from 'axios';


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
  const [memberInfo, setMemberInfo] = useState([]); // 현재 로그인 되어 있는 회원의 정보 저장용

  const [ files, SetFiles ] = useState({noImage});
  const [name, setName] = useState('');
  const [birth, setBirth] = useState('');
  const [age, setAge] = useState("");
  const [gender, setGender] = useState('');

  const { sido, sigugun } = hangjungdong;
  const [region1, setRegion1] = useState("");
  const [region2, setRegion2] = useState("");
  const [keySido, setKeySido] = useState("");

  const [isBirth, setIsBirth] = useState(false);
  const [isGender, setIsGender] = useState(false);
  const [isRegion1, setIsRegion1] = useState(false);
  const [isRegion2, setIsRegion2] = useState(false);

  // 프로필 사진 추가 여부 확인
  const [isFileUP, setIsFileUp] = useState(false); 

  // formData 객체는 key, value 형식으로 되어 있는 객체이다.
  // formData.append( key, value );
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
    // if(isBirth && isGender && isRegion1 && isRegion2) {

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
        window.location.replace("/mypage");
    // } else {
    //   console.log("잘못 입력한 값이 있거나 입력되지 않은 값이 있어요.");
    //   alert('입력된 값을 확인하세요.');
  }



// 프로필 사진 미리보기
const [imageSrc, setImageSrc] = useState('');

  const encodeFileToBase64 = (fileBlob) => {
    // FileReader의 인스턴스 reader을 생성한다.
    const reader = new FileReader();
    
    // 인자로 받은 fileBlob을 base64로 인코딩한다.
    reader.readAsDataURL(fileBlob);
    return new Promise((resolve) => {
      reader.onload = () => {
    // reader가 인코딩을 성공했다면 reader.result 안에 담긴 문자열을 imageSrc로 세팅해준다.
        setImageSrc(reader.result);
    // resolve를 호출하여 Promise를 이행상태(비동기 로직 처리가 완료된 상태로 Promise 결과값 반환 상태)로 만들어준다.
    // Promise는 비동기 처리에 활용되는 객체로, 순차적으로 특정 코드의 실행을 끝까지 기다리지 않고 다음 코드를 선제적으로 처리하는 것을 의미
        resolve();
      };
      SetFiles(fileBlob);
      console.log(files);
      setIsFileUp(true)
    });
  };

  
  return (
    <div className='Container'>
      <div className='MemberUpdate-Container'>
        {memberInfo.map(member => (
            <div key={member.id}>
          <table className='MemberUpdate-table'>
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

                  {/* 파일이 추가되었는지를 먼저 확인 -> DB 데이터가 있는지를 먼저 확인할 경우 파일을 변경했을 때를 인식하지 못함.  */}
                    { isFileUP ?  
                    //  추가한 파일 이 있는 경우 해당 파일은 미리보기로 보여줌.
                      <img src={imageSrc} style={{borderRadius:'70%', width: '200px'}} />
                      //  추가한 파일이 없는 경우 DB에 저장된 파일이 있는지 확인
                      : member.fileName ?
                      // DB 에 저장된 데이터가 있다면 해당 데이터를 미리보기에 보여줌.
                            <img src={`${DOMAIN}` + `${member.fileName}`} style={{borderRadius:'70%', width: '200px'}} />
                      // DB에 저장된 데이터가 없다면 기본 파일을 보여줌.
                            : <img src={noImage} style={{borderRadius:'70%', width: '200px'}} /> 
                    } 
                </td>   
              </tr>           
              <tr>
                <td colSpan="2" align='center' >
                  <form className='MemberUpdate-profileImg-label' >
                    <label className='MemberUpdate-profileImg-label'>
                      <input className="MemberUpdate-profileImg-input" type='file' display='none' id='image' accept='image/*' onChange={(e) => {encodeFileToBase64(e.target.files[0])}} />
                      프로필사진 추가
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
                <td><input type="text" value={member.id} disabled required id="inputId" readOnly/></td>
              </tr>
              <tr>
                <th>비밀번호</th>
                <td><input type="password" value={member.pwd} disabled readOnly/></td>
              </tr>
              <tr>
                <th>생년월일</th>
                <td><input type="date" value={member.birth} readOnly />
                    <span readOnly>만 {member.age}세</span>
                </td>
              </tr>
              <tr>
                <th>성별</th>
                <td>
                <label>
                  {(`${member.gender}` === "남자") ?  
                      <input type="radio" name="gender" value="남자" checked disabled readOnly /> 
                      : <input type="radio" name="gender" value="남자" disabled readOnly />
                  } 남자

                  {(`${member.gender}` === "여자") ?  
                      <input type="radio" name="gender" value="여자" checked disabled readOnly /> 
                      : <input type="radio" name="gender" value="여자" disabled readOnly />
                  } 여자
                </label>
                </td>
              </tr>
              <tr>
                <th>주소</th>
                <td>
                <select defaultValue={member.region1} onChange={onChangeRegion1} disabled readOnly>
                    <option disabled >시도선택</option>
                    {sido.map((e) => (
                    <option key={e.sido} value={e.codeNm} >
                        {e.codeNm}
                    </option>
                    ))}
                </select>
                <select defaultValue={member.region2} onChange={onChangeRegion2} disabled readOnly>
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
                  <input type="text" value={member.mbti} disabled />
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
      </div>
      ))}
          {/* 저장하기 */}
          <div className='MemberUpdate-btn'>
            <Link to="/" ><button type="submit">취소하기</button></Link>
            <button type="submit" onClick={onClickButton}>저장하기</button>
          </div>
      </div>
    </div>
  )
}

    

export default MemberUpdate;