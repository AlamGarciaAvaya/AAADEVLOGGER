package service.AAADEVLOGGER;

/**
*
* @author umansilla
*/
import java.io.BufferedReader;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;

import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;

import org.json.JSONException;
import org.json.JSONObject;

import service.util.Arrays;



/**
*
* @author umansilla
*/
@MultipartConfig
@WebServlet(urlPatterns = {"/ReadText/*"})
public class ReadText extends HttpServlet {
   private static final long serialVersionUID = 1L;
   String userHomeDir = null;
   String osName = null;
   String windows = "WINDOWS";

   @Override
   public void init() throws ServletException {
       this.userHomeDir = System.getProperty("user.home");
       this.osName = System.getProperty("os.name");
   }



   protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
   	setAccessControlHeaders(response);
       String reviewLocationOnHttpServer = null;
       File transcriptFile = null;
       String reqURIForReview = request.getRequestURL().toString();
       String[] transcriptNameArray = reqURIForReview.split("\\/");
       String recFileName = transcriptNameArray[transcriptNameArray.length - 1];
       final String str[] = reqURIForReview.split("/");
       final int lengthUrlPre = reqURIForReview.indexOf(str[4]);
       final int lengthUrlPost = str[4].length();
       final int completeUrl = lengthUrlPre + lengthUrlPost;
       final String folderPath = reqURIForReview.substring(completeUrl, reqURIForReview.lastIndexOf('/'));
       reviewLocationOnHttpServer = userHomeDir + folderPath;
       transcriptFile = new File(reviewLocationOnHttpServer + "/" + recFileName);
       
       
       OutputStream out = response.getOutputStream();
       try (FileInputStream in = new FileInputStream(transcriptFile)) {
           byte[] buffer = new byte[4096];
           int length;
           
           while ((length = in.read(buffer)) > 0) {
               out.write(buffer, 0, length);
           }
           
       }
       response.setHeader("Content-Type", "text/plain; charset=UTF-8");
       out.flush();
   }
   
   @Override
   protected void doPost(HttpServletRequest request, HttpServletResponse response)
           throws ServletException, IOException {
   	setAccessControlHeaders(response);
       String recFileName = null;
       String recordLocationOnHttpServer = null;
       File transcriptFile = null;
       String recFileUri = null;
       File dir = null;
       JSONObject responseJson = new JSONObject();
       try {
           /*https://docs.oracle.com/javaee/6/tutorial/doc/gmhba.html*/
           final Part transcriptPartOfFile = request.getPart("data"); //Se refiere a los datos de grabación
           System.out.println(transcriptPartOfFile.getClass());
           System.out.println(transcriptPartOfFile.getContentType());
           final Part transcriptFileName = request.getPart("FileName");//hace referencia al nombre del archivo
           final Part transcriptFileRestUri = request.getPart("restRecordURI"); // hace referencia al URI de registro completo de la solicitud
           if (transcriptFileName != null) {
               recFileName = getStringValue(transcriptFileName);
           }
           if (transcriptFileRestUri != null) {
               recFileUri = getStringValue(transcriptFileRestUri);
           }
           final String str[] = recFileUri.split("/");

           final int lengthUrlPre = recFileUri.indexOf(str[4]);
           final int lengthUrlPost = str[4].length();
           final int completeUrl = lengthUrlPre + lengthUrlPost;
           final String folderPath = recFileUri.substring(completeUrl, recFileUri.lastIndexOf('/'));
           recordLocationOnHttpServer = userHomeDir + folderPath;
           if (folderPath.length() > 0) {
               dir = new File(recordLocationOnHttpServer);
               if (!dir.exists()) {
                   dir.mkdirs();
               }
           }
           transcriptFile = new File(recordLocationOnHttpServer + "/" + recFileName);
           System.out.println(transcriptFile);
           final InputStream transcriptInput = transcriptPartOfFile.getInputStream();
           final byte transcriptBytes[] = new byte[(int) transcriptPartOfFile.getSize()];

           final FileOutputStream saveAudioFile
                   = new FileOutputStream(transcriptFile);
           while ((transcriptInput.read(transcriptBytes)) != -1) {
               InputStream byteAudioStream = new ByteArrayInputStream(transcriptBytes);

               saveAudioFile.write(transcriptBytes);

           }
           System.out.println("Absolute Path");
           System.out.println(transcriptFile.getAbsolutePath());
           JSONObject grabaciones = Arrays.main(recordLocationOnHttpServer);
           System.out.println(grabaciones);
//           logger.info(grabaciones);
           transcriptInput.close();
           saveAudioFile.flush();
           saveAudioFile.close();
           responseJson.put("status", "file saved successfully on web server");
           responseJson.put("grabacion", recFileName);
           responseJson.put("Absolute Path", transcriptFile.getAbsolutePath());
       } catch (final Exception e) {
           e.printStackTrace();
           try {
               responseJson.put("status", "failed to save the recording on web server");
           } catch (JSONException ex) {
               // Logger.getLogger(FileSaveServlet.class.getName()).log(Level.SEVERE, null, ex);
           }
       }
       response.setContentType("application/json");
       response.getWriter().write(responseJson.toString());

   }
   
       private String getStringValue(final Part part) {

       BufferedReader bufferedReader = null;
       final StringBuilder stringBuilder = new StringBuilder();
       String line;
       final String partName = part.getName();
       try {
           final InputStream inputStream = part.getInputStream();
           bufferedReader = new BufferedReader(new InputStreamReader(inputStream));
           while ((line = bufferedReader.readLine()) != null) {
               stringBuilder.append(line);
           }
       } catch (final IOException e) {
           System.out.println("getStringValue - IOException while reading inputStream. Part name : " + partName);
       } finally {
           if (bufferedReader != null) {
               try {
                   bufferedReader.close();
               } catch (final IOException e) {
                   System.out.println("getStringValue - IOException while closing bufferedReader. Part name : " + partName);
               }
           }
       }
       return stringBuilder.toString();
   }
       
       @Override
   protected void doDelete(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
       setAccessControlHeaders(resp);
       JSONObject responseJson = new JSONObject();
       String reqURIForDelete = req.getRequestURL().toString();
       
       final String str[] = reqURIForDelete.split("/");

       final int lengthUrlPre = reqURIForDelete.indexOf(str[5]);
       final String deleteFilePath = userHomeDir + "/" + reqURIForDelete.substring(lengthUrlPre, reqURIForDelete.length());

       final File file = new File(deleteFilePath);
       if (file.exists() && file.delete()) {
           resp.setStatus(HttpServletResponse.SC_OK);
           responseJson.put("status", "file deleted successfully on web server");
           resp.setContentType("application/json");
           resp.getWriter().write(responseJson.toString());
       } else {
           resp.setStatus(HttpServletResponse.SC_NOT_FOUND);
           responseJson.put("status", "failed deleted on web server");
           resp.setContentType("application/json");
           resp.getWriter().write(responseJson.toString());
       }
       resp.setContentType("text/html");
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
