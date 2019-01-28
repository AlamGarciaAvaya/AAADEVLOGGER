package service.AAADEVLOGGER;

import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.avaya.collaboration.util.logger.Logger;

import service.util.Encoder;



@WebServlet("/GetBase64/*")
@MultipartConfig
public class GetBase64 extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private transient final Logger logger = Logger
			.getLogger(GetBase64.class);
	public GetBase64() {
		super();
	}
	
	@Override
	protected void doGet(final HttpServletRequest request,
			final HttpServletResponse response) throws IOException {
	
		setAccessControlHeaders(response);
		/*
		 * ServletContext Defines a set of methods that a servlet uses to
		 * communicate with its servlet container Returns the name of this web
		 * application corresponding to this ServletContext as specified in the
		 * deployment descriptor for this web application by the display-name
		 * element.
		 */
		final ServletContext callableServiceServletContext = getServletContext();


		/*
		 * Gets the real path corresponding to the given virtual path. For
		 * example, if path is equal to /index.html, this method will return the
		 * absolute file path on the server's filesystem to which a request of
		 * the form http://<host>:<port>/<contextPath>/index.html would be
		 * mapped, where <contextPath> corresponds to the context path of this
		 * ServletContext.
		 */
		final String contextPathOriginal = callableServiceServletContext
				.getRealPath("/");
		logger.info("contextPathOriginal GetBase64");
		logger.info(contextPathOriginal);
		final String archivo = request.getParameter("archivo");
		final String contextPath = "home/wsuser/web/"+archivo+"/";
                
		/*
		 * Obtiene el nombre del último archivo de audio guardado.
		 */
		final String filename = request.getParameter("audio");
		if (filename != null) {
			/*
			 * File(String parent, String child) Creates a new File instance
			 * from a parent pathname string and a child pathname string.
			 */
			final File audioFile = new File(contextPath, filename);
			if (audioFile.exists()) {
				
				String base64 = Encoder.encoder(audioFile.getAbsolutePath());

				final PrintWriter out = response.getWriter();
				out.println(base64);

			} else {
				response.setStatus(404);
				response.sendError(404, "audio file does not exist");
			}

		}
		
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