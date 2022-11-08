import border from '../CSS/border.css';

const Boarding = () => {

    return (
        <div className='html'>
            <div className='board_wrap'>
                <div className='board_title'>
                    <strong>게시판</strong>
                    <p>자유롭게 소통할 수 있는 게시판입니다</p>
               </div>
               <div className='board_list_wrap'>
                <div className='board_list'>
                    <div className='top'>
                        <div className='num'>번호</div>
                        <div className='write_title'>제목</div>
                        <div className='writer'>글쓴이</div>
                        <div className='date'>작성일자</div>
                        <div className='count'>조회수</div>
                    </div>
                    <div>
                        <div className='num'>5</div>
                        <div className='write_title'><a href='#'>infp 대화하실분?</a></div>
                        <div className='writer'>냠냠이</div>
                        <div className='date'>22.11.08</div>
                        <div className='count'>20</div>
                    </div>
                    <div>
                        <div className='num'>4</div>
                        <div className='write_title'><a href='#'>오늘 홍대에서 급만나서 클럽가실 성격좋은 분 모집합니다~~~~</a></div>
                        <div className='writer'>조모씨</div>
                        <div className='date'>22.11.08</div>
                        <div className='count'>20</div>
                    </div>
                    <div>
                        <div className='num'>3</div>
                        <div className='write_title'><a href='#'>요새 게시판 왜 이렇게 조용함?</a></div>
                        <div className='writer'>이모씨</div>
                        <div className='date'>22.11.08</div>
                        <div className='count'>20</div>
                    </div>
                    <div>
                        <div className='num'>2</div>
                        <div className='write_title'><a href='#'>조용히 대화하면서 서로 알아가실 ENFP타입 구합니다. 다른 타입도 대환영~~~</a></div>
                        <div className='writer'>연애하고파</div>
                        <div className='date'>22.11.08</div>
                        <div className='count'>20</div>
                    </div>
                    <div>
                        <div className='num'>1</div>
                        <div className='write_title'><a href='#'>같이 맛집 투어하실 성격좋은 분 구합니다!! mbti테스트 필수!!</a></div>
                        <div className='writer'>3년을굶은거지</div>
                        <div className='date'>22.11.08</div>
                        <div className='count'>20</div>
                    </div>
                </div>
                <div className='board_page'>
                    <a href='#' className='bt first'>맨앞</a>
                    <a href='#' className='bt prev'>이전</a>
                    <a href='#' className='num on'>1</a>
                    <a href='#' className='num on'>2</a>
                    <a href='#' className='num on'>3</a>
                    <a href='#' className='num on'>4</a>
                    <a href='#' className='num on'>5</a>
                    <a href='#' className='bt next'>다음</a>
                    <a href='#' className='bt last'>맨뒤 </a>
                </div>
                <div className='bt_wrap'>
                    <a href='#' className='on'>목록</a>
                    <a href='#'>수정</a>
                </div>
               </div>
            </div>
        </div>
    );
}

export default Boarding;