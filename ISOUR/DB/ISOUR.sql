DROP TABLE I_MEMBER;

SELECT * FROM I_MEMBER;
COMMIT;

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

INSERT INTO I_MEMBER VALUES('', '', '����', 'admin', 'admin1234', '1971-05-08', '52', '����', '�λ걤����', '�ؿ�뱸', '');
INSERT INTO I_MEMBER VALUES('', '', '�̵��', 'dleldi', 'dleldi88', '2000-06-06', '22', '����', '�뱸������', '������', ''); 
INSERT INTO I_MEMBER VALUES('', '', '����', 'rldyal', 'rldyal59', '1997-06-25', '25', '����', '����Ư����', '������', ''); 

SELECT *  FROM I_MEMBER WHERE ID = 'admin';

DELETE FROM I_MEMBER WHERE NAME = '����';

UPDATE I_MEMBER SET FILEPATH = '', FILENAME = '' WHERE ID = 'admin';
UPDATE I_MEMBER SET NAME='', PASSWORD='', BIRTH='', AGE='', GENDER='', REGION1='', REGION2='', MBTI='' WHERE ID = 'dleldi';
rollback;

