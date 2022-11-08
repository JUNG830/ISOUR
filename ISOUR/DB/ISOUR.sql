

SELECT * FROM I_MEMBER;
SELECT * FROM dleldi;
SELECT * FROM rldyal;
COMMIT;


// 전체 회원 테이블
CREATE TABLE I_MEMBER (
    FILEPATH    VARCHAR2(200),
    FILENAME    VARCHAR2(100),
    NAME        VARCHAR2(30),
    ID          VARCHAR2(30) PRIMARY KEY,
    PASSWORD    VARCHAR2(30),
    BIRTH       VARCHAR2(30),
    AGE         VARCHAR2(10),
    GENDER      VARCHAR2(10),
    REGION1     VARCHAR2(30),
    REGION2     VARCHAR2(30),
    MBTI        VARCHAR2(10)
);


// 회원가입시 해당 ID로 쪽지 테이블 생성
CREATE TABLE rldyal (
    ID          VARCHAR2(30),
    CONTENT     VARCHAR2(500),
    DATETIME    VARCHAR2(50) DEFAULT TO_CHAR(SYSDATE, 'yyyy-mm-dd hh24:mi:ss')
);

INSERT INTO I_MEMBER VALUES('', '', '어드민', 'admin', 'admin1234', '1971-05-08', '52', '여자', '부산광역시', '해운대구', '');
INSERT INTO I_MEMBER VALUES('', '', '이디야', 'dleldi', 'dleldi88', '2000-06-06', '22', '남자', '대구광역시', '수성구', ''); 
INSERT INTO I_MEMBER VALUES('', '', '기요미', 'rldyal', 'rldyal59', '1997-06-25', '25', '여자', '서울특별시', '도봉구', ''); 

SELECT *  FROM I_MEMBER WHERE ID = 'admin';

DELETE FROM I_MEMBER WHERE NAME = '어드민';

UPDATE I_MEMBER SET FILEPATH = '', FILENAME = '' WHERE ID = 'admin';
UPDATE I_MEMBER SET NAME='', PASSWORD='', BIRTH='', AGE='', GENDER='', REGION1='', REGION2='', MBTI='' WHERE ID = 'dleldi';
rollback;

INSERT INTO dleldi (ID, CONTENT) VALUES(?, ?)

DROP TABLE I_MEMBER;
DROP TABLE dleldi;
DROP TABLE rlfehddl;