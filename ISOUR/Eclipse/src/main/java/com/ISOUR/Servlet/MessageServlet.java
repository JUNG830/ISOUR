package com.ISOUR.Servlet;

import java.io.*;

import javax.servlet.http.*;
import javax.servlet.ServletException;

import com.ISOUR.DAO.MessageDAO;
import org.json.simple.JSONObject;

import com.ISOUR.Common.Common;
import com.ISOUR.DAO.MemberDAO;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class MessageServlet {
    @PostMapping("/MessageServlet")
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // 한글 깨짐 방지를 위해서 설정
        request.setCharacterEncoding("utf-8");
        response.setCharacterEncoding("utf-8");
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