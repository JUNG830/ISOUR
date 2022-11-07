import axios from "axios";


const HEADER = 'application/json';
const TEAM_DOMAIN = "http://localhost:8111/ISOUR/";



const TeamAPI = {
  // 로그인 기능
  userLogin: async function(id, pw) {
    const loginObj = {
      id: id,
      pwd: pw
    }
    
    return await axios.post(TEAM_DOMAIN + "LoginServlet", loginObj, HEADER); // LoginServlet이거가 백앤드랑 이름이 동일해야댐
  },

  // 회원 정보 조회
  memberInfo: async function(id) {
    const regCmd = {
      // cmd : "MemberInfo",
      id : id
    }
    return await axios.post(TEAM_DOMAIN + "MemberServlet", regCmd, HEADER);
  },

  // 회원 가입
  memberReg: async function(name, id, pwd, birth, age, gender, region1, region2) {
    const memberObj = {
      name: name,
      id: id,
      pwd: pwd,
      birth: birth,
      age: age,
      gender: gender,
      region1: region1,
      region2: region2
    };

    return await axios.post(TEAM_DOMAIN + "MemberRegServlet", memberObj, HEADER);
  },
  // 회원 정보 수정
  MemberUpdate: async function(name, id, pwd, birth, age, gender, region1, region2) {
    const memberObj = {
      name: name,
      id: id,
      pwd: pwd,
      birth: birth,
      age: age,
      gender: gender,
      region1: region1,
      region2: region2
    };

    return await axios.post(TEAM_DOMAIN + "MemberUpdateServlet", memberObj, HEADER);
  },

  // MBTI 검사 결과
  mbtiReg: async function(mbti, id) {
    const resultObj = {
      mbti: mbti,
      id: id
    };

    return await axios.post(TEAM_DOMAIN + "TestServlet", resultObj, HEADER);
  },

  // 회원 탈퇴
  memberDrop: async function(id, pwd) {
    const dropObj = {
      id: id,
      pwd: pwd
    };

    return await axios.post(TEAM_DOMAIN + "MemberDropServlet", dropObj, HEADER);
  },
  
  // 회원 가입 여부 확인
  memberRegCheck: async function(id) {
    const regCheck = {
      id: id
    };

    return await axios.post(TEAM_DOMAIN + "MemberCheck", regCheck, HEADER);
  },
  // 쪽지함 불러오기
  messageStorage: async function(id) {
    const regCmd = {
      cmd : "ShowMessage",
      id : id
    }
    return await axios.post(TEAM_DOMAIN + "PostboxServlet", regCmd, HEADER);
  },

  // 이미지 파일 업로드
  UploadService: async function(formData) {
    const regCheck = {
      formData: formData
    };
    const config = {
      Header: {
        'content-type': 'multipart/form-data',
      },
    };

    return await axios.post(TEAM_DOMAIN + "UploadService", regCheck, config, HEADER);
  },
  


}

export default TeamAPI;