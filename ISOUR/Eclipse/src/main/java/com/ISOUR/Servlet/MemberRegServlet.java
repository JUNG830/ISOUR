package com.ISOUR.Servlet;

import java.io.*;
//import java.sql.Date;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;

import org.json.simple.JSONObject;

import com.ISOUR.Common.Common;
import com.ISOUR.DAO.MemberDAO;

// 회원 가입
@WebServlet("/MemberRegServlet")
public class MemberRegServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.getWriter().append("Served at: ").append(request.getContextPath());
	}
	
	protected void doOptions(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		Common.corsResSet(response);
	}

	@SuppressWarnings("unchecked")
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// 한글 깨짐 방지를 위해서 설정
		request.setCharacterEncoding("utf-8");
		// CORS 접근 허용
		Common.corsResSet(response);
		// 요청 메시지 받기
		StringBuffer sb = Common.reqStringBuff(request);
		// 요청 받은 메시지 JSON 파싱
		JSONObject jsonObj = Common.getJsonObj(sb);
		
		// TeamAPI.js 에 작성해둔 memberReg : "memberObj" 를 가져온다.
//		String getFileName = (String)jsonObj.get("fileName");
		String getName = (String)jsonObj.get("name");
		String getId = (String)jsonObj.get("id");
		String getPwd = (String)jsonObj.get("pwd");
		String getBirth = (String)jsonObj.get("birth");
		String getAge = (String)jsonObj.get("age");
		String getGender = (String)jsonObj.get("gender");
		String getRegion1 = (String)jsonObj.get("region1");
		String getRegion2 = (String)jsonObj.get("region2");
		
		
		MemberDAO dao = new MemberDAO();
		boolean rstComplete = dao.memberRegister(getName, getId, getPwd, getBirth, getAge, getGender, getRegion1, getRegion2);
		
		PrintWriter out = response.getWriter();
		JSONObject resJson = new JSONObject();
		
//		System.out.println("여기까지 와라....Reg");
		
		if(rstComplete) resJson.put("result", "OK");
		else resJson.put("result", "NOK");
		out.print(resJson);
	}
}