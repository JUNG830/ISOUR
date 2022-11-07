package com.ISOUR.DAO;

import java.sql.*;
//import java.sql.Date;

import java.util.*;

import com.ISOUR.Common.Common;
import com.ISOUR.VO.MemberVO;


public class MemberDAO {
	private Connection conn = null;
	private Statement stmt = null; //표준 SQL문을 수행하기 위한 Statement 객체 얻기
	private ResultSet rs = null; // Statement의 수행 결과를 여러행으로 받음
	// SQL문을 미리 컴파일해서 재 사용하므로 Statement 인터페이스보다 훨씬 빨르게 데이터베이스 작업을 수행
	private PreparedStatement pstmt = null; 
	
	// 내가 로그인창에서 입력한 아이디(id), 비밀번호(pwd)
	public boolean loginCheck(String id, String pwd) {
		
		try {
			conn = Common.getConnection();
			stmt = conn.createStatement(); // Statement 객체 얻기
			// WHERE 뒤에 조건 컬럼명이 테이블과 동일해야 함(한글 안 됨)
			String sql = "SELECT * FROM I_MEMBER WHERE ID = " + "'" + id + "'";
			rs = stmt.executeQuery(sql);

			while(rs.next()) { // 읽은 데이타가 있으면 true
				// getString() 안에 테이블의 컬럼명과 동일하게 입력해야 함
				String sqlId = rs.getString("ID"); // 쿼리문 수행 결과에서 ID값을 가져 옴
				String sqlPwd = rs.getString("PASSWORD");
				
				System.out.println("가입 되어 있는 ID : " + sqlId);
				System.out.println("가입 되어 있는 PASSWORD : " + sqlPwd);
				
				if(id.equals(sqlId) && pwd.equals(sqlPwd)) {
					Common.close(rs);
					Common.close(stmt);
					Common.close(conn);
					return true;
				}
			}
			Common.close(rs);
			Common.close(stmt);
			Common.close(conn);
		} catch(Exception e) {
			e.printStackTrace();
		}
		return false;
	}
	
	 // 탈퇴하기 화면에서 입력한 아이디(id), 비밀번호(pwd) 확인하기 위함
    public boolean dropCheck(String id, String pwd) {
        int isOut = 0;

        System.out.println("넘어온 id : " + id);
        System.out.println("넘어온 pwd : " + pwd);

        try {
            conn = Common.getConnection();
            stmt = conn.createStatement(); // Statement 객체 얻기
            // WHERE 뒤에 조건 컬럼명이 테이블과 동일해야 함(한글 안 됨)
            String selectSQL = "SELECT * FROM I_MEMBER WHERE ID = " + "'" + id + "' AND PASSWORD = " + "'" + pwd + "'";
            String deleteSQL = "DELETE FROM I_MEMBER WHERE ID = " + "'" + id + "' AND PASSWORD = " + "'" + pwd + "'";
            String dropTableSQL = "DROP TABLE " + id;

            rs = stmt.executeQuery(selectSQL);

            while(rs.next()) { // 읽은 데이타가 있으면 true
                // getString() 안에 테이블의 컬럼명과 동일하게 입력해야 함
                String sqlId = rs.getString("ID"); // 쿼리문 수행 결과에서 ID값을 가져 옴
                String sqlPwd = rs.getString("PASSWORD");

                System.out.println("가입 되어 있는 ID : " + sqlId);
                System.out.println("가입 되어 있는 PASSWORD : " + sqlPwd);

                System.out.println("id : " + id + "/ sqlId : " + sqlId);
                System.out.println("pwd : " + pwd + "/ sqlPwd : " + sqlPwd);

                if(id.equals(sqlId) && pwd.equals(sqlPwd)) {
                    pstmt = conn.prepareStatement(dropTableSQL);
                    isOut = pstmt.executeUpdate();

                    pstmt = conn.prepareStatement(deleteSQL);
                    isOut = pstmt.executeUpdate();

                    Common.close(rs);
                    Common.close(stmt);
                    Common.close(conn);
                    return true;
                }
            }
            Common.close(rs);
            Common.close(stmt);
            Common.close(conn);
        } catch(Exception e) {
            e.printStackTrace();
        }

        return false;
    }
	
	// 회원 목록 조회
	public List<MemberVO> memberSelect(String reqId) {
		List<MemberVO> list = new ArrayList<>();
		try {
			conn = Common.getConnection();
			stmt = conn.createStatement();
			String sql = null;
			if(reqId.equals("admin")) sql = "SELECT * FROM I_MEMBER";
			else sql = "SELECT * FROM I_MEMBER WHERE ID = " + "'" + reqId + "'";
			
			rs = stmt.executeQuery(sql);
			
			while(rs.next()) {
				// getString() 안에 테이블의 컬럼명과 동일하게 입력해야 함
				String fileName = rs.getString("FILENAME");
				String name = rs.getString("NAME");
				String id = rs.getString("ID");
				String pwd = rs.getString("PASSWORD");
				String birth = rs.getString("BIRTH");
				String age = rs.getString("AGE");
				String gender = rs.getString("GENDER");
				String region1 = rs.getString("REGION1");
				String region2 = rs.getString("REGION2");
				String MBTI = rs.getString("MBTI");
				
				MemberVO vo = new MemberVO();  // 각 정보를 저장할 수 있는 객체 생성.
				vo.setFileName(fileName);
				vo.setName(name);
				vo.setId(id);
				vo.setPwd(pwd);
				vo.setBirth(birth);
				vo.setAge(age);
				vo.setGender(gender);
				vo.setRegion1(region1);
				vo.setRegion2(region2);
				vo.setMBTI(MBTI);
				
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
	
	// 회원가입여부 확인!!
	public boolean regIdCheck(String id) {

		boolean isNotReg = false;
		try {
			conn = Common.getConnection();
			stmt = conn.createStatement();
			String sql = "SELECT * FROM I_MEMBER WHERE ID = " + "'" + id + "'";
			rs = stmt.executeQuery(sql);

			if(rs.next()) {
				isNotReg = true;
			} else {
				isNotReg = false;
			}
		} catch (Exception e) {
			e.printStackTrace();
		} 
		Common.close(rs);
		Common.close(stmt);
		Common.close(conn);
		return isNotReg;  // 가입되어 있으면 false, 가입 안되어 있으면 true.
	}
	
	// 회원가입
	// 내가 회원가입창에서 입력하는 사진(FILENAME) 이름(name), 아이디(id), 비밀번호(pwd), 생년월일(birth)
	public boolean memberRegister(String name, String id, String pwd, String birth, String age, String gender, String region1, String region2) {
		int result = 0;
		// 테이블 컬럼명이랑 똑같이
		// 회원가입에서 사진 안 받을거니까 생략.
		String sql = "INSERT INTO I_MEMBER (FILENAME, FILEPATH, NAME, ID, PASSWORD, BIRTH, AGE, GENDER, REGION1, REGION2, MBTI) VALUES('', '', ?, ?, ?, ?, ?, ?, ?, ?, '')";
		 String createSQL = "CREATE TABLE " + id + "( NAME VARCHAR2(30), CONTENT VARCHAR2(30), DATETIME VARCHAR2(50) DEFAULT TO_CHAR(SYSDATE, 'yyyy-mm-dd hh24:mi:ss') )";
		try {
			conn = Common.getConnection();
			pstmt = conn.prepareStatement(sql);
//			pstmt.setString(1, fileName);
			pstmt.setString(1, name);
			pstmt.setString(2, id);
			pstmt.setString(3, pwd);
			pstmt.setString(4, birth);
			pstmt.setString(5, age);
			pstmt.setString(6, gender);
			pstmt.setString(7, region1);
			pstmt.setString(8, region2);
//			pstmt.setString(10, MBTI);
			
			
			result = pstmt.executeUpdate();	
			System.out.println("회원 가입 DB 결과 확인 : " + result);
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
//		CREATE TABLE admin (
//              NAME        VARCHAR2(30),
//              CONTENT     VARCHAR2(30),
//              DATETIME    VARCHAR2(50) DEFAULT TO_CHAR(SYSDATE, 'yyyy-mm-dd hh24:mi:ss')
//      );


		Common.close(rs);
		Common.close(pstmt);
		Common.close(conn);
		
		if(result == 1) return true;
		else return false;
	}
	
	// 파일 업로드
	public boolean FlieUpload(String filePath, String fileName, String id) {
		System.out.println("여기까진 오니?" + id);
		System.out.println("여기까진 오니?" + fileName);
		System.out.println("여기까진 오니?" + filePath);
		
		int result = 0;
		// 테이블 컬럼명이랑 똑같이
		String sql = "UPDATE I_MEMBER SET FILEPATH = ?, FILENAME = ? WHERE ID = ?";
		try {
			conn = Common.getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1, filePath);
			pstmt.setString(2, fileName);
			pstmt.setString(3, id);
			
			result = pstmt.executeUpdate();	
			System.out.println("이미지 DB 결과 확인 : " + result);
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		Common.close(rs);
		Common.close(pstmt);
		Common.close(conn);
		
		if(result == 1) return true;
		else return false;
	}
	
	// MBTI 검사 결과 등록
		public boolean mbtiRegister(String mbti, String id) {
			int result = 0;
			// 테이블 컬럼명이랑 똑같이
			String sql = "UPDATE I_MEMBER SET MBTI = ? WHERE ID = ?";
			
			try {
				conn = Common.getConnection();
				pstmt = conn.prepareStatement(sql);
				pstmt.setString(1, mbti);
				pstmt.setString(2, id);
				
				result = pstmt.executeUpdate();	
				System.out.println("MBTI 결과 DB 등록 확인 : " + result);
				
			} catch (Exception e) {
				e.printStackTrace();
			}
			Common.close(rs);
			Common.close(pstmt);
			Common.close(conn);
			
			if(result == 1) return true;
			else return false;
		}
		
		public boolean memberUpdate(String name, String id, String pwd, String birth, String age, String gender, String region1, String region2) {
			int result = 0;
			// 테이블 컬럼명이랑 똑같이
			// 회원가입에서 사진 안 받을거니까 생략.
			String sql = "UPDATE I_MEMBER SET NAME=?, BIRTH=?, AGE=?, GENDER=?, REGION1=?, REGION2=? WHERE ID = ? ";
			try {
				conn = Common.getConnection();
				pstmt = conn.prepareStatement(sql);
//				pstmt.setString(1, fileName);
				pstmt.setString(1, name);
//				pstmt.setString(3, pwd);
				pstmt.setString(2, birth);
				pstmt.setString(3, age);
				pstmt.setString(4, gender);
				pstmt.setString(5, region1);
				pstmt.setString(6, region2);
				pstmt.setString(7, id);
//				pstmt.setString(10, MBTI);
				
				
				result = pstmt.executeUpdate();	
				System.out.println("회원 정보 수정 DB 결과 확인 : " + result);
				
			} catch (Exception e) {
				e.printStackTrace();
			}
			Common.close(rs);
			Common.close(pstmt);
			Common.close(conn);
			
			if(result == 1) return true;
			else return false;
		}
}

















