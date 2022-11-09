import { useState } from "react";
import hangjungdong from "./hangjungdong";

const App2 = () => {
  const [value, setValue] = useState("");
  const [setValue2] = useState("");

  //변수값 변경을 위해 타겟밸류 설정
  const onChangeValue = (e) => {
    setValue(e.target.value);
  }
  const onChangeValue2 = (e) => {
    setValue2(e.target.value);
  }

  const { sido, sigugun } = hangjungdong;
  
  return (
    <div>
      <select onChange={onChangeValue}>
        <option value="">선택</option>
        {/* map을 사용하여 한정동에 있는 키값을 받아옴 */}
        {sido.map((el) => (
          <option key={el.sido} value={el.sido}>
            {el.codeNm}
          </option>
        ))}
      </select>
      <select onChange={onChangeValue2}>
        <option value="">선택</option>
        {sigugun
        // 필터함수를 사용하여 배열을 필터링하여 군/구를 불러옴
          .filter((el) => el.sido === value)
          .map((el) => (
            <option key={el.sigugun} value={el.sigugun}>
              {el.codeNm}
            </option>
          ))}
      </select>
    </div>
  );
}
export default App2;