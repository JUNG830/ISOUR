import { Link } from "react-router-dom";
import '../../CSS/Style_Login.css';
import '../../pages/Main/Main.css'

function Main() {

    return(
        <div className="Main-container">
            <div className="Main-container1">
                <div className="Main-box0">
                    <div className="Main-font">MBTISOUR</div>
                </div>

                <div className="Main-box-font2">"인간들은 제각각 다른 성격을 가지고 있습니다."</div>
            </div>
            <div className="Main-container2">
                <div className="Main-box2">
                <div className="Main-box2-font1">?</div>
                <div className="Main-box2-font2">전부다 같을 수는 없지만</div>
                <div className="Main-box2-font3">성격이 잘 맞는다면 좋은 친구가 될 수 있죠!</div>
            </div>
            <div className="Main-container3">
            <div className="Main-box3">
            <div className="Main-box3-font1">나와 비슷한 사람을 찾는다면</div>
                <div className="Main-box3-font2">아래의 시작 버튼을 클릭해 주세요!</div>
                </div>
                </div>
            </div>
            <div className="Main-box-button1">
            <Link to="/login"><button className="Main-box-button2">START</button></Link>
            </div>
        </div>
        
            );
            
        }
        export default Main;

