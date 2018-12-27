package service.AAADEVLOGGER;

import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.text.DateFormat;
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
@WebServlet(name = "LogAccess", urlPatterns = { "/LogAccess" })
public class LogAccess extends HttpServlet {
	private static final long serialVersionUID = 1L;

	@Override
	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {

	}

	@Override
	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		PrintWriter out = response.getWriter();
		JSONObject json = new JSONObject();

		try {
			String username = request.getParameter("usuario");
			System.out.println(username);
			FileWriter fichero = new FileWriter(
					"home/wsuser/web/LogIn/Accesslogs.txt", true);
			PrintWriter pw = new PrintWriter(fichero);
			DateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			Date date = new Date(System.currentTimeMillis());
			pw.println(df.format(date) + "_AAADEVLOGGER" + "_Usuario:"
					+ username);
			fichero.close();

			response.setContentType("application/json");
			response.setCharacterEncoding("UTF-8");
			response.setStatus(200);
			json.put("status", "ok");
			out.print(json);

		} catch (Exception e) {
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
	 * Returns a short description of the servlet.
	 *
	 * @return a String containing servlet description
	 */
	@Override
	public String getServletInfo() {
		return "Short description";
	}// </editor-fold>

}
