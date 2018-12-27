package service.util;

import java.io.File;

import org.json.JSONObject;

/**
 *
 * @author umansilla
 */
public class Arrays {
	/**
	 * @return
	 * En lista en formato Json los audios que se recuperan, de acuerdo a la direccion proporcionada
	 * en el método GET a Controlador de Grabaciones.
	 */
	public static JSONObject main(String recordLocationOnHttpServer) {
		JSONObject json = new JSONObject();
		int index = 0;
		String dirPath = recordLocationOnHttpServer;
		File dir = new File(dirPath);
		String[] files = dir.list();
		if (files.length == 0) {
			System.out.println("The directory is empty");
		} else {

            for(int contador=files.length-1; contador>=0; contador--){
                json.put("Index "+index , files[contador]);
                index++;
             }

		}

		return json;
	}

}