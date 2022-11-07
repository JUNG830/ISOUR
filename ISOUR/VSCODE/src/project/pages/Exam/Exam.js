// import { Link } from "react-router-dom";
import styled from 'styled-components';
// import TeamAPI from '../api/TeamAPI';
import { useEffect, useState } from "react";
import "./Exam.css";
import TeamAPI from '../../api/TeamAPI';
// import '../CSS/Style_Login.css';

// QuizApp 의 Line 44 에서 props를 넘겨받음.
// props 1 ▶ mode={()=>changeMode('score')} 
// props 2 ▶ quizList={states.quizList}
const Quiz = (props) => {
  const isLogin = window.localStorage.getItem("isLogin");
  if (isLogin === "FALSE") window.location.replace("/");

  const localId = window.localStorage.getItem("userId");

  const [count, setCount] = useState(0);
  const [count2, setCount2] = useState(1);
  const [EnI, setEnI] = useState(0);
  const [SnN, setSnN] = useState(0);
  const [TnF, setTnF] = useState(0);
  const [JnP, setJnP] = useState(0);
 


  const [testMBTI, setTestMBTI] = useState("");
  useEffect(()=>{
    console.log(EnI);
    console.log(SnN);
    console.log(TnF);
    console.log(JnP);
  },[EnI,SnN,TnF,JnP]);

  const answerNoList = {
    answer: ["I", "N", "F", "P"]
  };
  const answerYesList = {
    answer: ["E", "S", "T", "J"]
  };

  const onClickSave = async (e) => {
    // e.preventDefault();
    console.log("저장하기 버튼 눌렀어요.");
    console.log("MBTI 결과 : " + testMBTI);

    try {
      const res = await TeamAPI.mbtiReg(testMBTI, localId);
      // 로그인을 위한 axios 호출
      console.log("호출 TRY: " + res.data.result);

      if (res.data.result === "OK") {
        alert("저장이 잘 되었는지 확인해봐요.")
        // window.localStorage.setItem("isLogin", "TRUE");
        window.location.replace("/");
      } else {
        alert("아이디 또는 비밀번호를 확인하세요!");
      }
    } catch (e) {
      alert("오류 발생!! 아이디(" + +")랑 비밀번호(" + +")는 일단 넘어와요.");
      console.log("로그인 에러!! 왜 또 안 될까..?");
    }
    
  }

  // QuizApp의 문제 수랑 같아지면 EndMessage를 보여줌
  if (count === props.questionList.length) {
    return (
      <EndMessage>
        <h1>Quiz END</h1>
        <h1>{testMBTI}</h1>
        <button onClick={onClickSave}>저장하기</button>
      </EndMessage>
    );
  }
  
  function onClickYes1() {
    let index = count2 / 5 - 1;
    
    
    setCount(count + 1);
    setCount2(count2 + 1);
    
    console.log(index + ' ' + EnI)
    setEnI(EnI => EnI + 1);
    let current = EnI+1;
    if (current < 0 && (count2 / 5) === 1) {
      setTestMBTI(testMBTI + answerNoList.answer[index]);
      console.log('작동1-1');
    } else if (current > 0 && (count2 / 5) === 1) {
      setTestMBTI(testMBTI + answerYesList.answer[index]);
      console.log('작동1-2');
    }
  }

  function onClickNo1() {

    let index = count2 / 5 - 1;
    let index2 = count/EnI


    setCount(count + 1);
    setCount2(count2 + 1);
    setEnI(EnI - 1);
    let current = EnI-1;


    console.log(index + ' ' + EnI + ' ' +index2)

    if (current < 0 && (count2 / 5) === 1) {
      setTestMBTI(testMBTI + answerNoList.answer[index]);
      console.log('작동2-1');
    } else if (current > 0 && (count2 / 5) === 1) {
      setTestMBTI(testMBTI + answerYesList.answer[index]);
      console.log('작동2-2');
    }
  }

  function onClickYes2() {
    let index = count2 / 5 - 1;

    setCount(count + 1);
    setCount2(count2 + 1);
    setSnN((SnN) => SnN + 1);
    let current = SnN+1;



    console.log(index + ' ' + SnN)

    if (current < 0 && (count2 / 5) === 2) {
      setTestMBTI(testMBTI + answerNoList.answer[index]);
      console.log('작동3-1');
    } else if (current > 0 && (count2 / 5) === 2) {
      setTestMBTI(testMBTI + answerYesList.answer[index]);
      console.log('작동3-2');
    }
  }

  function onClickNo2() {
    let index = count2 / 5 - 1;

    setCount(count + 1);
    setCount2(count2 + 1);
    setSnN((SnN) => SnN - 1);
    let current = SnN-1;


    console.log(index + ' ' + SnN)

    if (current < 0 && (count2 / 5) === 2) {
      setTestMBTI(testMBTI + answerNoList.answer[index]);
      console.log('작동4-1');
    } else if (current > 0 && (count2 / 5) === 2) {
      setTestMBTI(testMBTI + answerYesList.answer[index]);
      console.log('작동4-2');
    }
  }
  function onClickYes3() {
    let index = count2 / 5 - 1;

    setCount(count + 1);
    setCount2(count2 + 1);
    setTnF((TnF) => TnF + 1);
    let current = TnF+1;

    console.log(index + ' ' + TnF)

    if (current < 0 && (count2 / 5) === 3) {
      setTestMBTI(testMBTI + answerNoList.answer[index]);
      console.log('작동5-1');
    } else if (current > 0 && (count2 / 5) === 3) {
      setTestMBTI(testMBTI + answerYesList.answer[index]);
      console.log('작동5-2');
    }
  }

  function onClickNo3() {
    let index = count2 / 5 - 1;

    setCount(count + 1);
    setCount2(count2 + 1);
    setTnF((TnF) => TnF - 1);
    let current = TnF-1;

    console.log(index + ' ' + TnF)

    if (current < 0 && (count2 / 5) === 3) {
      setTestMBTI(testMBTI + answerNoList.answer[index]);
      console.log('작동6-1');
    } else if (current > 0 && (count2 / 5) === 3) {
      setTestMBTI(testMBTI + answerYesList.answer[index]);
      console.log('작동6-2');
    }

  }
  function onClickYes4() {
    let index = count2 / 5 - 1;


    setCount(count + 1);
    setCount2(count2 + 1);
    setJnP((JnP) => JnP + 1);
    let current = JnP+1;


    console.log(index + ' ' + JnP)

    if (current < 0 && (count2 / 5) === 4) {
      setTestMBTI(testMBTI + answerNoList.answer[index]);
      console.log('작동7-1');
    } else if (current > 0 && (count2 / 5) === 4) {
      setTestMBTI(testMBTI + answerYesList.answer[index]);
      console.log('작동7-2');
    }
  }

  function onClickNo4() {
    let index = count2 / 5 - 1;

    setCount(count + 1);
    setCount2(count2 + 1);
    setJnP((JnP) => JnP - 1);
    let current = JnP-1;


    console.log(index + ' ' + JnP)

    if (current < 0 && (count2 / 5) === 4) {
      setTestMBTI(testMBTI + answerNoList.answer[index]);
      console.log('작동8-1');
    } else if (current > 0 && (count2 / 5) === 4) {
      setTestMBTI(testMBTI + answerYesList.answer[index]);
      console.log('작동8-2');
    }
  }


  return (
    <div>
      {props.questionList.map((e, idx) => {
        if (count === idx && idx < 5) {
          return (
            <>
              <NumContainer key={idx}>
                <Num>{count + 1}번 문제</Num>
                <p>{e.question}</p>
                <OXcontainer>
                  <OX onClick={onClickYes1}><div>{e.check_O}</div></OX>
                  <OX onClick={onClickNo1}><div>{e.check_X}</div></OX>
                </OXcontainer>
              </NumContainer>
            </>
          );
        } else if (count === idx && idx < 10) {
          return (
            <>
              <NumContainer key={idx}>
                <Num>{count + 1}번 문제</Num>
                <p>{e.question}</p>
                <OXcontainer>
                  <OX onClick={() => onClickYes2()}><div>{e.check_O}</div></OX>
                  <OX onClick={() => onClickNo2()}><div>{e.check_X}</div></OX>
                </OXcontainer>
              </NumContainer>
            </>
          );
        } else if (count === idx && idx < 15) {
          return (
            <>
              <NumContainer key={idx}>
                <Num>{count + 1}번 문제</Num>
                <p>{e.question}</p>
                <OXcontainer>
                  <OX onClick={() => onClickYes3()}><div>{e.check_O}</div></OX>
                  <OX onClick={() => onClickNo3()}><div>{e.check_X}</div></OX>
                </OXcontainer>
              </NumContainer>
            </>
          );
        } else if (count === idx && idx < 20) {
          return (
            <>
              <NumContainer key={idx}>
                <Num>{count + 1}번 문제</Num>
                <p>{e.question}</p>
                <OXcontainer>
                  <OX onClick={() => onClickYes4()}><div>{e.check_O}</div></OX>
                  <OX onClick={() => onClickNo4()}><div>{e.check_X}</div></OX>
                </OXcontainer>
              </NumContainer>
            </>
          );
        }
      })}

    </div>
  );
}

const Exam = () => {
  const isLogin = window.localStorage.getItem("isLogin");
  if (isLogin === "FALSE") window.location.replace("/login");

  const currentId = window.localStorage.getItem("userId");
  const currentPw = window.localStorage.getItem("userPw");

  console.log("\n\n현재 localStorage 에 저장된 ID : " + currentId);
  console.log("\n\n현재 localStorage 에 저장된 PASSWORD : " + currentPw);

  const [states, setStates] = useState({
    mode: 'start',
    questionList: [
      { question: "나는 사교적이며 활동적이다.", check_O: "O", check_X: "X" },
      { question: "나는 사람들과 함께 있을때 에너지를 얻는다.", check_O: "O", check_X: "X" },
      { question: "대인관계를 넓고 다양하게 유지하는 편이다.", check_O: "O", check_X: "X" },
      { question: "글보다는 말로 표현하는 것이 좋다.", check_O: "O", check_X: "X" },
      { question: "생각보다 행동이 앞선다.", check_O: "O", check_X: "X" },
      { question: "나는 오감에 의존한다.", check_O: "O", check_X: "X" },
      { question: "근거없는 예감을 믿지 않는다.", check_O: "O", check_X: "X" },
      { question: "미래에 대한 생각보다는 현재에 집중한다.", check_O: "O", check_X: "X" },
      { question: "간접 경험보다는 직접 행동으로 경험하는 것을 선호한다.", check_O: "O", check_X: "X" },
      { question: "본인이 명확함, 사실, 실용적 등의 단어와 어울린다.", check_O: "O", check_X: "X" },
      { question: "나는 분석적이고 논리적이다.", check_O: "O", check_X: "X" },
      { question: "나는 감정적인 호소 보다는 논리적인 호소에 설득이 잘된다.", check_O: "O", check_X: "X" },
      { question: "비교적 협력보다 경쟁을 통해 성장할 수 있다고 생각한다.", check_O: "O", check_X: "X" },
      { question: "나는 어떠한 일에 동정심을 느끼기 보다는 해결책을 제시한다.", check_O: "O", check_X: "X" },
      { question: "나의 논리적인 부분이 감정적인 부분을 컨트롤 할 수 있다.", check_O: "O", check_X: "X" },
      { question: "나는 철처하고 계획적이다", check_O: "O", check_X: "X" },
      { question: "나는 데이트를 할때 모든 계획을 세워두고 만나는 편이다.", check_O: "O", check_X: "X" },
      { question: "나는 선택의 여지를 주는것을 좋아하지 않는다.", check_O: "O", check_X: "X" },
      { question: "나는 머릿속에 늘 체크리스트를 가지고 다닌다.", check_O: "O", check_X: "X" },
      { question: "나는 당장의 흥미보다는 미래의 안정이 더 중요하다.", check_O: "O", check_X: "X" }
    ]
  });

  function changeMode(mode) {
    setStates({ ...states, ['mode']: mode })
  }

  return (
    <div>
      {/* mode 가 main 일 때 */}
      {states.mode === 'start'
        ?
        <div>
          <button onClick={() => { changeMode('quiz') }}>검사 시작하기</button>
        </div>
        : null
      }

      {/* mode 가 quiz 일 때 */}
      {states.mode === 'quiz'
        ? <Quiz questionList={states.questionList} />
        : null
      }

    </div>
  )
}

const EndMessage = styled.div`
  text-align: center;
  & > h1{
    font-size: 100px;
  }

  & > button{
    border: 0;
    border-radius: 30px;
    width: 70%;
    background: skyblue;
    color: #fff;
    font-size: 50px;
  }
`
const NumContainer = styled.div`
  font-size: 25px;
  font-weight: bold;
  text-align: center;
`;

const Num = styled.span`
  font-size: 0.8em;
  border-radius: 30px;
  background: #fef5d4;
  border: 0;
  /* 아래부터는 조혜경이 추가 */
  display: inline-block;
  width: 200px;
  height: 50px;
  margin-bottom: 500px;
`;

const OXcontainer = styled.div`
    display: flex;
    width: 100vw;
    height: 100vh;
    /* 원본 */
    position: absolute;
    /* position: relative; */
    top: 0;
    left: 0;
    z-index: 1;
    
`;
const OX = styled.div`
    display: flex;  
    color: skyblue;
    width: 50%;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 400px;
    /* 아래부터는 조혜경이 추가 */
    cursor: pointer;
    :hover {
      transition-duration: .5s;
      text-shadow: 10px 10px 10px rgba(0, 0, 0, 5);
    }
`;

export default Exam;