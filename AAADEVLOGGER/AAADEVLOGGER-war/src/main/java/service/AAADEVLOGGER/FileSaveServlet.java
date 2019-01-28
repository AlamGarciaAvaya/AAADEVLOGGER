package service.AAADEVLOGGER;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.OutputStream;

import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
//import com.avaya.collaboration.util.logger.Logger;

import org.json.JSONObject;

/**
 *
 * @author umansilla
 */
@MultipartConfig
@WebServlet(urlPatterns = { "/FileSaveServlet/*" })
public class FileSaveServlet extends HttpServlet {

	private static final long serialVersionUID = 1L;
	// private final Logger logger;
	String userHomeDir = null;
	String osName = null;
	String windows = "WINDOWS";

	// public FileSaveServlet()
	// {
	// super();
	// // logger = com.avaya.collaboration.ut
	// il.logger.Logger.getLogger(getClass());
	// }
	@Override
	public void init() throws ServletException {
		this.userHomeDir = System.getProperty("user.home");
		this.osName = System.getProperty("os.name");
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		// logger.info("Método GET");
		setAccessControlHeaders(response);
		String reviewLocationOnHttpServer = null;
		File audioFile = null;
		String reqURIForReview = request.getRequestURL().toString();
		String[] recordNameArray = reqURIForReview.split("\\/");
		String recFileName = recordNameArray[recordNameArray.length - 1];
		final String str[] = reqURIForReview.split("/");
		final int lengthUrlPre = reqURIForReview.indexOf(str[4]);
		final int lengthUrlPost = str[4].length();
		final int completeUrl = lengthUrlPre + lengthUrlPost;
		final String folderPath = reqURIForReview.substring(completeUrl,
				reqURIForReview.lastIndexOf('/'));
		reviewLocationOnHttpServer = userHomeDir + folderPath;
		audioFile = new File(reviewLocationOnHttpServer + "/" + recFileName);
		response.setHeader("Cache-Control",
				"no-cache, no-store, must-revalidate");
		response.setHeader("Pragma", "no-cache");
		response.setHeader("Expires", "0");
		response.setHeader("Content-Type", "audio/mpeg");
		OutputStream out = response.getOutputStream();
		try (FileInputStream in = new FileInputStream(audioFile)) {
			byte[] buffer = new byte[4096];
			int length;
			while ((length = in.read(buffer)) > 0) {
				out.write(buffer, 0, length);
			}
		}
		out.flush();
	}

	@Override
	protected void doDelete(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		// logger.info("Método DELETE");
		setAccessControlHeaders(resp);
		JSONObject responseJson = new JSONObject();
		String reqURIForDelete = req.getRequestURL().toString();
		final String str[] = reqURIForDelete.split("/");

		final int lengthUrlPre = reqURIForDelete.indexOf(str[5]);
		final String deleteFilePath = userHomeDir
				+ "/"
				+ reqURIForDelete.substring(lengthUrlPre,
						reqURIForDelete.length());

		final File file = new File(deleteFilePath);
		if (file.exists() && file.delete()) {
			resp.setStatus(HttpServletResponse.SC_OK);
			responseJson.put("status",
					"file deleted successfully on web server");
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
	

	// AUTORIZAR CROSS DOMAIN
	@Override
	protected void doOptions(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		setAccessControlHeaders(response);
		response.setStatus(HttpServletResponse.SC_OK);
	}

	private void setAccessControlHeaders(HttpServletResponse response) {
		response.setHeader("Access-Control-Allow-Origin", "*");
		response.setHeader("Access-Control-Allow-Credentials", "true");
		response.setHeader("Access-Control-Allow-Methods",
				"GET, POST, DELETE, PUT");
		response.setHeader("Access-Control-Allow-Headers",
				"Content-Type, Accept, X-Requested-With");
	}
}