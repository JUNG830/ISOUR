import React from 'react';
// import '../App';
import './Modal.css';

const Modal = (props) => {
    const { open, confirm, close, type, header } = props;
    return (
        <div className={open ? 'openModal modal' : 'modal'}>
            {open && 
                <section>
                    <header>
                        {header}
                        <button onClick={close}>
                            &times;
                        </button>
                    </header>
                    <main>{props.children}</main>
                    <footer>
                        {/* Home의 정말 탈퇴하겠냐의 type이 true 이면 버튼이 두개 나온다 아니면 취소만 있거나 확인만 있음. */}
                        {type && <button onClick={confirm}>확인</button>}
                        <button onClick={close}>취소</button>
                    </footer>
                </section>
            }
        </div>
    );
};
export default Modal;