package service.AAADEVLOGGER;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONObject;

import service.util.WavAppender;


/**
 *
 * @author umansilla
 */
@WebServlet(name = "ConversacionEngagement", urlPatterns = {"/ConversacionEngagement"})
public class ConversacionEngagement extends HttpServlet {

	private static final long serialVersionUID = 1L;
	public static String [] audios = {null, null};


    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        PrintWriter out = response.getWriter();
        JSONObject json = new JSONObject();
        String audioUno = request.getParameter("audioUno");
        String audioDos = request.getParameter("audioDos");
        audios[0] = audioUno;
        audios[1] = audioDos;
//        WavAppender wav = new WavAppender();
//        String result = wav.appender(audioUno, audioDos);
//        response.setContentType("application/json");
//        response.setCharacterEncoding("UTF-8");
//        if (result.equals("ok")) {
            response.setStatus(200);
            json.put("status", "ok");
            out.println(json);
//        }else{
//            response.setStatus(400);
//            json.put("status", result.toString());
//            out.println(json);
//        }
    }

}
