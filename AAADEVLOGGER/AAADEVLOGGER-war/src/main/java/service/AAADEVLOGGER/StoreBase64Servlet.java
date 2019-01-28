package service.AAADEVLOGGER;

import java.io.BufferedReader;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;

import javax.mail.MessagingException;
import javax.mail.internet.MimeUtility;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;
import javax.sound.sampled.AudioFileFormat;
import javax.sound.sampled.AudioFormat;
import javax.sound.sampled.AudioInputStream;
import javax.sound.sampled.AudioSystem;

import org.json.JSONException;
import org.json.JSONObject;

import service.util.TrafficInterfaceAddressRetrieverImpl;

import com.avaya.collaboration.util.logger.Logger;
import com.avaya.zephyr.platform.dal.api.ServiceUtil;

@WebServlet("/StoreBase64Servlet/*")
@MultipartConfig
public class StoreBase64Servlet extends HttpServlet
{
    private static final long serialVersionUID = 1L;
    private transient final Logger logger = Logger.getLogger(StoreRecordingServlet.class);
    String userHomeDir = null;
    String osName = null;
    String windows = "WINDOWS";
    
    public StoreBase64Servlet()
    {
        super();
    }

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
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException
    {	
    setAccessControlHeaders(response);
    JSONObject responseJson = new JSONObject();
    try {
    	final File audioFile = getFile(request, response);
		final boolean isDeleted = audioFile.delete();
		if (isDeleted) {
			logger.info("StoreRecordingServlet doPost previous record file is removed.");
		}
		final FileOutputStream saveAudioFile = new FileOutputStream(
				audioFile);
		final Part audioPartOfFile = request.getPart("rec_data");
	
		
		final InputStream audioInput = audioPartOfFile.getInputStream();
		final byte audioBytes[] = new byte[(int) audioPartOfFile.getSize()];

		while ((audioInput.read(audioBytes)) != -1) {
			InputStream byteAudioStream = new ByteArrayInputStream(
					decode(audioBytes));
			final AudioFormat audioFormat = getAudioFormat();
			AudioInputStream audioInputStream = new AudioInputStream(
					byteAudioStream, audioFormat, audioBytes.length);

			if (AudioSystem.isFileTypeSupported(AudioFileFormat.Type.WAVE,
					audioInputStream)) {
				AudioSystem.write(audioInputStream,
						AudioFileFormat.Type.WAVE, saveAudioFile);
			}

		}
		audioInput.close();
		saveAudioFile.flush();
		saveAudioFile.close();
		logger.info("recording saved as " + audioFile.getAbsolutePath());
        responseJson.put("status", "file saved successfully on web server");
        responseJson.put("grabacion", audioFile.getName());
        responseJson.put("Absolute Path", audioFile.getAbsolutePath());
    } catch (final Exception e) {
        logger.error("Error: "+ e.toString());
        try {
            responseJson.put("status", "failed to save the recording on web server");
        } catch (JSONException ex) {
            logger.error("Error: " +ex.toString());
        }
    }
    response.setContentType("application/json");
    response.getWriter().write(responseJson.toString());
       
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
    
	public static byte[] decode(byte[] encodedAudioBytes)
			throws MessagingException, IOException {
		ByteArrayInputStream byteArrayInputStream = new ByteArrayInputStream(
				encodedAudioBytes);
		InputStream b64InputStream = MimeUtility.decode(byteArrayInputStream,
				"base64");

		byte[] tmpAudioBytes = new byte[encodedAudioBytes.length];
		int numberOfBytes = b64InputStream.read(tmpAudioBytes);
		byte[] decodedAudioBytes = new byte[numberOfBytes];

		System.arraycopy(tmpAudioBytes, 0, decodedAudioBytes, 0, numberOfBytes);

		return decodedAudioBytes;
	}
	
	/*
	 * Avaya recommends that audio played by Avaya Aura MS be encoded as 16-bit,
	 * 8 kHz, single channel, PCM files. Codecs other than PCM or using higher
	 * sampling rates for higher quality recordings can also be used, however,
	 * with reduced system performance. Multiple channels, like stereo, are not
	 * supported.
	 * 
	 * @see Using Web Services on Avaya Aura Media Server Release 7.7, Issue 1,
	 * August 2015 on support.avaya.com
	 */
	private AudioFormat getAudioFormat() {
		final float sampleRate = 8000.0F;
		// 8000,11025,16000,22050,44100
		final int sampleSizeInBits = 16;
		// 8,16
		final int channels = 1;
		// 1,2
		final boolean signed = true;
		// true,false
		final boolean bigEndian = false;
		// true,false
		return new AudioFormat(sampleRate, sampleSizeInBits, channels, signed,
				bigEndian);
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
    
    public File getFile(final HttpServletRequest request, final HttpServletResponse response) {
        final ServletContext callableServiceServletContext = getServletContext();
//        final String contextPath = callableServiceServletContext.getRealPath("/");
        final String contextPath = "home/wsuser/web/RecordParticipant/";
        final String filename = request.getPathInfo();

        return new File(contextPath, filename);
    }
}
