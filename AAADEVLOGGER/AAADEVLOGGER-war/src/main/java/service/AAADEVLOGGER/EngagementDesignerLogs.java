package service.AAADEVLOGGER;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import service.util.SystemCommandExecutor;

/**
 * Servlet implementation class SystemCommandExc
 */
@WebServlet("/EngagementDesignerLogs")
public class EngagementDesignerLogs extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public EngagementDesignerLogs() {
		super();
		// TODO Auto-generated constructor stub
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		setAccessControlHeaders(response);
		PrintWriter out = response.getWriter();
		
		String numberLines = request.getParameter("number");     
        String filter = request.getParameter("filter");
		
		List<String> commands = new ArrayList<String>();
		commands.add("/bin/sh");
		commands.add("-c");
		commands.add("tail -n -"+numberLines+" /var/log/Avaya/services/EngagementDesigner/EngagementDesigner.log | grep "+filter);

		SystemCommandExecutor commandExecutor = new SystemCommandExecutor(
				commands);
		try {
			int result = commandExecutor.executeCommand();
		} catch (InterruptedException e) {

			out.println(e.toString());
		}

		String stdout = commandExecutor.getLastExecutionStandardOutput();
		String stderr = commandExecutor.getLastExecutionStandardError();

		out.println(stdout);
		out.println(stderr);

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
