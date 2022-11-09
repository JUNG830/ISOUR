package com.ISOUR.DAO;

import java.sql.*;
import java.util.*;

import com.ISOUR.Common.Common;
import com.ISOUR.VO.MessageVO;

// 메세지 관련 DAO
public class MessageDAO {
    private Connection conn = null;
    private Statement stmt = null; //표준 SQL문을 수행하기 위한 Statement 객체 얻기
    private ResultSet rs = null; // Statement의 수행 결과를 여러행으로 받음
    // SQL문을 미리 컴파일해서 재 사용하므로 Statement 인터페이스보다 훨씬 빨르게 데이터베이스 작업을 수행
    private PreparedStatement pstmt = null;

    // 내 쪽지함 보기
    public List<MessageVO> messageList(String reqId) {
        List<MessageVO> list = new ArrayList<>();
        try {
            conn = Common.getConnection();
            stmt = conn.createStatement();
            String sql = "SELECT * FROM " + reqId;
            
        System.out.println("MessageDAO ID넘어오나 : " + reqId);

            rs = stmt.executeQuery(sql);

            while(rs.next()) {
                // getString() 안에 테이블의 컬럼명과 동일하게 입력해야 함
                String id = rs.getString("ID");
                String content = rs.getString("CONTENT");
                String datetime = rs.getString("DATETIME");

                MessageVO vo = new MessageVO();  // 각 정보를 저장할 수 있는 객체 생성.
                vo.setName(id);
                vo.setContent(content);
                vo.setDatetime(datetime);

                list.add(vo);  // 받은 정보를 list로 저장.
            }
            Common.close(rs);
            Common.close(stmt);
            Common.close(conn);

        } catch(Exception e) {
            e.printStackTrace();	// 어디서 오류가 발생했는지 뿌려줌.
        }
        return list;
    }

    // 쪽지 보내기
    public boolean mbtiRegister(String id, String receiverId, String content) {
        int result = 0;
        // 테이블 컬럼명이랑 똑같이
        String insertSQL = "INSERT INTO " + receiverId + " (ID, CONTENT) VALUES(?, ?)";

        try {
            conn = Common.getConnection();
            pstmt = conn.prepareStatement(insertSQL);
            pstmt.setString(1, id);
            pstmt.setString(2, content);

            result = pstmt.executeUpdate();
            System.out.println("쪽지 보내기 DB 등록 확인 : " + result);

        } catch (Exception e) {
            e.printStackTrace();
        }
        Common.close(rs);
        Common.close(pstmt);
        Common.close(conn);

        if(result == 1) return true;
        else return false;
    }

    // 탈퇴할 때 쪽지함 자동 삭제
//    public boolean dropCheck(String id, String pwd) {
//        int isOut = 0;
//
//        System.out.println("넘어온 id : " + id);
//        System.out.println("넘어온 pwd : " + pwd);
//
//        try {
//            conn = Common.getConnection();
//            stmt = conn.createStatement(); // Statement 객체 얻기
//            // WHERE 뒤에 조건 컬럼명이 테이블과 동일해야 함(한글 안 됨)
//            String selectSQL = "SELECT * FROM I_MEMBER WHERE ID = " + "'" + id + "' AND PASSWORD = " + "'" + pwd + "'";
//            String deleteSQL = "DELETE FROM I_MEMBER WHERE ID = " + "'" + id + "' AND PASSWORD = " + "'" + pwd + "'";
//            String dropTableSQL = "DROP TABLE " + id ;
//
//            rs = stmt.executeQuery(selectSQL);
//
//            while(rs.next()) { // 읽은 데이타가 있으면 true
//                // getString() 안에 테이블의 컬럼명과 동일하게 입력해야 함
//                String sqlId = rs.getString("ID"); // 쿼리문 수행 결과에서 ID값을 가져 옴
//                String sqlPwd = rs.getString("PASSWORD");
//
//                System.out.println("id : " + id + "/ sqlId : " + sqlId);
//                System.out.println("pwd : " + pwd + "/ sqlPwd : " + sqlPwd);
//
//                if(id.equals(sqlId) && pwd.equals(sqlPwd)) {
//                    pstmt = conn.prepareStatement(deleteSQL);
//                    pstmt = conn.prepareStatement(dropTableSQL);
//                    isOut = pstmt.executeUpdate();
//
//                    Common.close(rs);
//                    Common.close(stmt);
//                    Common.close(conn);
//                    return true;
//                }
//            }
//            Common.close(rs);
//            Common.close(stmt);
//            Common.close(conn);
//            
//        } catch(Exception e) {
//            e.printStackTrace();
//        }
//
//        return false;
//    }

}