package service.AAADEVLOGGER;

import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.nio.file.Files;
import java.nio.file.attribute.BasicFileAttributes;
import java.nio.file.attribute.FileTime;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONObject;

/**
 *
 * @author umansilla
 */
@WebServlet(name = "GetFileCreation", urlPatterns = {"/GetFileCreation"})
public class GetFileCreation extends HttpServlet {

	private static final long serialVersionUID = 1L;

	@Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
    	setAccessControlHeaders(response);
        PrintWriter out = response.getWriter();
        String archivo = request.getParameter("archivo");
        String nombreWav = request.getParameter("nombreWav");
        try {
            File file = new File("home/wsuser/web/" + archivo + "/" + nombreWav + "");
            JSONObject json = new JSONObject();
            BasicFileAttributes attrs;

            attrs = Files.readAttributes(file.toPath(), BasicFileAttributes.class);
            FileTime time = attrs.creationTime();

            String pattern = "yyyy-MM-dd";
            SimpleDateFormat simpleDateFormat = new SimpleDateFormat(pattern);
            String Fecha = simpleDateFormat.format(new Date(time.toMillis()));

            String pattern2 = "HH:mm:ss";
            SimpleDateFormat simpleDateFormat2 = new SimpleDateFormat(pattern2);
            String Hora = simpleDateFormat2.format(new Date(time.toMillis()));

            System.out.println(Fecha);
            System.out.println(Hora);
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            response.setStatus(200);
            json.put("Fecha", Fecha);
            json.put("Hora", Hora);
            out.print(json);

        } catch (IOException e) {
            JSONObject error = new JSONObject();
            error.put("Status", "Error");
            error.put("Error", e.toString());
            response.setStatus(404);
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            out.println(error);
        }

    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

    }
    
  //AUTORIZAR CROSS DOMAIN
    @Override
    protected void doOptions(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        setAccessControlHeaders(response);
        response.setStatus(HttpServletResponse.SC_OK);
    }

    private void setAccessControlHeaders(HttpServletResponse response) {
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Credentials", "true");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type, Accept, X-Requested-With");
    }


}
