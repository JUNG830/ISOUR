package com.ISOUR.Servlet;

import java.io.*;

import javax.servlet.http.*;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;

import com.ISOUR.DAO.MessageDAO;
import org.json.simple.JSONObject;

import com.ISOUR.Common.Common;
import com.ISOUR.DAO.MemberDAO;

// 쪽지 보내기
@SuppressWarnings({ "serial", "unused" })
@WebServlet("/MessageServlet")
public class MessageServlet extends HttpServlet{
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
        response.setCharacterEncoding("utf-8");
        // CORS 접근 허용
     	Common.corsResSet(response);
        // 요청 메시지 받기
        StringBuffer sb = Common.reqStringBuff(request);
        // 요청 받은 메시지 JSON 파싱
        JSONObject jsonObj = Common.getJsonObj(sb);

        // TeamAPI.js 에 작성해둔 messageReg : "messageObj" 를 가져온다.
        String getId = (String)jsonObj.get("id");
        String getReceiverId = (String)jsonObj.get("receiverId");
        String getContent = (String)jsonObj.get("content");

        MessageDAO dao = new MessageDAO();
        boolean rstComplete = dao.mbtiRegister(getId, getReceiverId, getContent);

        PrintWriter out = response.getWriter();
        JSONObject resJson = new JSONObject();

//		System.out.println("여기까지 와라....Reg");

        if(rstComplete) resJson.put("result", "OK");
        else resJson.put("result", "NOK");
        out.print(resJson);
    }
}