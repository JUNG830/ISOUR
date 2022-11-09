package com.ISOUR.Servlet;

import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Collection;

import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;

import org.json.simple.JSONObject;

import com.ISOUR.DAO.MemberDAO;
/**
 * fileSizeThreshold	서버로 파일을 저장할 때 파일의 임시 저장 사이즈
 * maxFileSize			1개 파일에 대한 최대 사이즈
 * maxRequestSize		서버로 전송되는 request의 최대 사이즈
 * @author  "SeokRae (kslbsh@gmail.com)"
 * https://www.journaldev.com/2122/servlet-3-file-upload-multipartconfig-part
 */

// 파일 업로드
@WebServlet("/UploadService")
@MultipartConfig(fileSizeThreshold=1024*1024*10, 	// 10 MB 
					maxFileSize=1024*1024*50,      	// 50 MB
					maxRequestSize=1024*1024*100)   // 100 MB
public class UploadService extends HttpServlet{

	/**
	 * 
	 */
	private static final long serialVersionUID = -4793303100936264213L;
	
	private static final String CHARSET = "utf-8";
	private static final String uploadFilePath = "\\UPLOADING";
	
	// 학원 버전 경로
//	private static final String UPLOAD_DIR = "D:\\ISOUR_HJ\\ISOUR\\Eclipse\\src\\main\\webapp";
	
	// 집 버전
//	private static final String UPLOAD_DIR = "F:\\KH\\TOTAL-1\\ISOUR_HJ\\ISOUR\\Eclipse\\src\\main\\webapp\\UPLOADING";
	
	// 우 노트북
//	private static final String UPLOAD_DIR = "F:\\KH\\ISOUR\\ISOUR\\Eclipse\\src\\main\\webapp\\UPLOADING";
	
	
	// 조혜경 학원 데스크탑
//	private static final String UPLOAD_DIR = "D:\\ISOUR\\ISOUR\\Eclipse\\src\\main\\webapp\\UPLOADING";
	
	// 규한님 학원 데스크탑
//	private static final String UPLOAD_DIR = "D:\\혜정님 수정파일\\ISOUR\\ISOUR\\Eclipse\\src\\main\\webapp\\UPLOADING";
	
	// 조혜경 노트북
	private static final String UPLOAD_DIR = "D:\\ISOUR\\ISOUR\\Eclipse\\src\\main\\webapp\\UPLOADING";
	

	public UploadService() {
		
	}
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.getWriter().append("Served at: ").append(request.getContextPath());
	}
	
	
	@SuppressWarnings({ "unchecked" })
	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setContentType("text/html; charset=UTF-8");
        request.setCharacterEncoding(CHARSET);
        PrintWriter out = response.getWriter();
        String contentType = request.getContentType();
		
		String fileName = ""; // 원본파일명
		String filePath = ""; // 파일 경로
        String loginId = "";	// 로그인 아이디
        String extension = "";	// 확장자명
		
		
		if (contentType != null &&  contentType.toLowerCase().startsWith("multipart/")) {
            // getParts()를 통해 Body에 넘어온 데이터들을 각각의  Part로 쪼개어 리턴
            Collection<Part> parts = request.getParts();
            
            try {
                parts = request.getParts();
            }catch (IllegalStateException e) {
                //업로드 크기 제한을 넘겼을 경우의 처리
            	System.out.println("파일 용량 초과!!");
            }
            
            // creates the save directory if it does not exists
    		File fileSaveDir = new File(uploadFilePath);
    		
    		// 파일 경로 없으면 생성
    		if (!fileSaveDir.exists()) {
    			fileSaveDir.mkdirs();
    		}

 
            for (Part part : parts) {
                System.out.printf("파라미터 명 : %s, contentType :  %s,  size : %d bytes \n", part.getName(),
                        part.getContentType(), part.getSize());
                
                
                if  (part.getHeader("Content-Disposition").contains("filename=")) {
                    fileName = extractFileName(part.getHeader("Content-Disposition"));
                    
                    if (part.getSize() > 0) {
                        System.out.printf("업로드 원본 파일 명 : %s  \n", fileName);
                        System.out.printf("업로드 원본 파일 경로 : %s  \n", UPLOAD_DIR + File.separator + fileName);
                        part.write(UPLOAD_DIR + File.separator  + fileName);
                        part.delete();
                    }
                } else {
                	loginId = request.getParameter(part.getName());
                    System.out.printf("name : %s, value : %s  \n", part.getName(), loginId);
                    
                    int index = fileName.lastIndexOf(".");
                    if (index > 0) {
                    // 파일의 확장자만 가져옴.. (하지만 못 쓰겠음...)
//                    String extension = FileUtils.getExtension(uploadfile.getOriginalFilename());
                    	
                    	
                    	
                    	extension = fileName.substring(index + 1); // 확장자명 
                        File file = new File(UPLOAD_DIR + File.separator + fileName);
                        
                        File reFile = new File(UPLOAD_DIR + File.separator + loginId + "." + extension);
                        
                        if(reFile.exists()) {
                        	reFile.delete();
                        }
                        
                		file.renameTo(reFile);
                		
                		System.out.println("파일명 수정 경로 :" + UPLOAD_DIR + File.separator + loginId + "." + extension);
                		
                		filePath = UPLOAD_DIR + File.separator + loginId + "." + extension;
                		fileName = loginId + "." + extension; 
                    }
                } 
            }
                      
            
            System.out.println(">>> fileName");
            System.out.println(fileName);
            
            MemberDAO dao = new MemberDAO();
    		boolean isRegister = dao.FlieUpload(filePath, fileName, loginId);

    		System.out.println("제발제발제발제발 여기까지 오면 집에 간다....");
    		
    		
    		JSONObject resJson = new JSONObject();
    		if(isRegister) resJson.put("result", "OK");  // result = Key / OK = value
    		else resJson.put("result", "NOK");
    		out.print(resJson);
            
            out.println("<h1>업로드 완료</h1>");
        } else {
            out.println("<h1>enctype이 multipart/form-data가 아님</h1>");
        }
    }
 
 
    private String extractFileName(String partHeader) {
        for (String cd : partHeader.split(";")) {
            if (cd.trim().startsWith("filename")) {
                String fileName = cd.substring(cd.indexOf("=") +  1).trim().replace("\"", "");
                int index = fileName.lastIndexOf(File.separator);
                return fileName.substring(index + 1);
            }
        }
        return null;
    }
    
    // 파일 이름 변경
//    public class FileReNameClass {
//    	public FileReNameClass() {
//    		// TODO Auto-generated constructor stub
//    		File file = new File("C:\\Users\\ljhgo\\Desktop\\abc1.txt");
//    		file.renameTo(new File("C:\\Users\\ljhgo\\Desktop\\abc2.txt"));
//    	}
    
////    public static void main(String[] args) {
//		new FileReNameClass();
//		}
//    }
}
