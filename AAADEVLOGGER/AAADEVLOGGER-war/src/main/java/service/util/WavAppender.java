package service.util;

import java.io.File;
import java.io.IOException;
import java.io.SequenceInputStream;
import java.net.URISyntaxException;
import java.security.CodeSource;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.Date;
import java.util.List;

import javax.sound.sampled.AudioFileFormat;
import javax.sound.sampled.AudioFormat;
import javax.sound.sampled.AudioInputStream;
import javax.sound.sampled.AudioSystem;
import javax.sound.sampled.UnsupportedAudioFileException;

import com.avaya.collaboration.ssl.util.SSLUtilityException;
import com.avaya.collaboration.util.logger.Logger;
import com.avaya.zephyr.platform.dal.api.ServiceUtil;

public class WavAppender {

	private transient final Logger logger = Logger.getLogger(WavAppender.class);

	public String appender(String audioUno, String audioDos) {
		int i = 0;
		File EndFile = null;
		float tiempoFinal = 0;
		/*
		 * Determinar el path de almacenamiento
		 */
		String realPath = getApplcatonPath();
		String [] split = realPath.split("/");
		StringBuilder path = new StringBuilder();
	       for(int k = 1 ; k < split.length - 1; k++){
	    	   path.append("/");
	    	   path.append(split[k]);
	       }
	     logger.info("path" + path.toString());
		
		/*
		 * Determina la URL del servicio
		 */
		final TrafficInterfaceAddressRetrieverImpl addressRetriever = new TrafficInterfaceAddressRetrieverImpl();
		final String trafficInterfaceAddress = addressRetriever
				.getTrafficInterfaceAddress();
		final String myServiceName = ServiceUtil.getServiceDescriptor()
				.getName();

		
		try {
			//Para el Laboratorio 213 en haj7 se cambió el Node01Cell Node01Cell por breeze7-mgmtNode01Cell
			//breeze7-mgmtNode01Cell
			File audio1 = new File(path.toString()+"/"+audioUno);
			File audio2 = new File(path.toString()+"/"+audioDos);
			File audioVoid = new File(path.toString()+"/void.wav");
			/*
			 * Audio InputStream Audio 1
			 */
			float durationInSeconds = tiempoAudio(audio1);
			/*
			 * Audio InputStream Audio 2
			 */
			float durationInSeconds2 = tiempoAudio(audio2);

			float diferenciaSegundos = 0;

			if (durationInSeconds2 >= durationInSeconds) {
				logger.info("Audio2 es mayor: " + durationInSeconds2);

				// Tiempo Mayor audio2
				// Obtener la diferencia de tiempos
				diferenciaSegundos = (durationInSeconds2 - durationInSeconds);
				tiempoFinal = durationInSeconds2;
				if (diferenciaSegundos <= 1) {
					logger.info("diferencia de seg menor a uno "
							+ diferenciaSegundos);
					AudioInputStream clip1 = AudioSystem
							.getAudioInputStream(audio1);
					AudioInputStream clip2 = AudioSystem
							.getAudioInputStream(audio2);
					Collection list = new ArrayList();
					list.add(clip1);
					list.add(clip2);
					DateFormat df = new SimpleDateFormat("yyyyMMddHHmmss");
					Date date = new Date(System.currentTimeMillis());
					String[] handleOne = audio1.getName().split("_");
					String[] handleTwo = audio2.getName().split("_");
					File mixFile = new File(path+"/wavMixed.wav");

					AudioInputStream mixedFiles = new MixingAudioInputStream(
							clip2.getFormat(), list);

					AudioSystem.write(mixedFiles, AudioFileFormat.Type.WAVE,
							mixFile);
					copyAudio(mixFile.getAbsolutePath(),
							"home/wsuser/web/Conversaciones/" + df.format(date)
									+ "_" + handleOne[0] + "_" + handleTwo[0]
									+ "_" + handleTwo[1], 0,
							Math.round(tiempoFinal));

					return "ok";
				}
				int diferenciaEnSegundos = (Math.round(diferenciaSegundos));
				logger.info("Diferencia de seg "
						+ diferenciaEnSegundos);
				// Definimos el tiempo máximo de la grabación.
				double cortes = (tiempoFinal / diferenciaSegundos);
				AudioInputStream appendedFiles = null;
				int primerParametro = 0;
				double SegundoParametro = cortes;
				int ciclo = diferenciaEnSegundos;
				File audioSec = new File(path.toString()+"/audioC1.wav");
				for (i = 1; i <= ciclo; i++) {

					copyAudioFloat(audio1.getAbsolutePath(),
							audioSec.getAbsolutePath(), primerParametro,
							SegundoParametro);
					File audio3 = new File(audioSec.getAbsolutePath());
					AudioInputStream clip1 = AudioSystem
							.getAudioInputStream(audio3);
					AudioInputStream clipVoid = AudioSystem
							.getAudioInputStream(audioVoid);

					appendedFiles = new AudioInputStream(
							new SequenceInputStream(clip1, clipVoid),
							clip1.getFormat(), clip1.getFrameLength()
									+ clipVoid.getFrameLength());

					AudioSystem.write(appendedFiles, AudioFileFormat.Type.WAVE,
							new File("home/wsuser/web/audioSecuencias/audioC1"
									+ getCharForNumber(i) + ".wav"));

					primerParametro += (cortes);
					appendedFiles.close();

				}
				try {
					File audDir = new File("home/wsuser/web/audioSecuencias/");

					File[] filesList = audDir.listFiles();
					long length = 0;
					AudioInputStream clip = null;
					List<AudioInputStream> list = new ArrayList<AudioInputStream>();

					for (File file : filesList) {
						clip = AudioSystem.getAudioInputStream(new File(file
								.getPath()));
						list.add(clip);
						length += clip.getFrameLength();

					}

					AudioInputStream appendedFiles2 = null;
					if (length > 0 && list.size() > 0 && clip != null) {

						appendedFiles2 = new AudioInputStream(
								new SequenceInputStream(
										Collections.enumeration(list)),
								clip.getFormat(), length);
						File file = new File(path.toString()+"/wavSequenced.wav");
                        AudioSystem.write(appendedFiles2,
                                AudioFileFormat.Type.WAVE,
                                file);
					}
				} catch (Exception e) {
					System.out.println("Error: " + e.toString());
				}
				AudioInputStream clip1 = AudioSystem
						.getAudioInputStream(new File(path+"/wavSequenced.wav"));
				AudioInputStream clip2 = AudioSystem
						.getAudioInputStream(audio2);

				Collection list = new ArrayList();
				list.add(clip1);
				list.add(clip2);
				DateFormat df = new SimpleDateFormat("yyyyMMddHHmmss");
				Date date = new Date(System.currentTimeMillis());
				String[] handleOne = audio1.getName().split("_");
				String[] handleTwo = audio2.getName().split("_");
				File mixFile = new File(path.toString()+"/wavMixed.wav");
				EndFile = new File("home/wsuser/web/Conversaciones/"
						+ df.format(date) + "_" + handleOne[0] + "_"
						+ handleTwo[0] + "_" + handleTwo[1]);
				AudioInputStream mixedFiles = new MixingAudioInputStream(
						clip2.getFormat(), list);

				AudioSystem.write(mixedFiles, AudioFileFormat.Type.WAVE,
						mixFile);
				copyAudio(mixFile.getAbsolutePath(), EndFile.getAbsolutePath(),
						0, Math.round(tiempoFinal));

			} else {
				// Tiempo Mayor audio1
				logger.info("Audio1 es mayor: " + durationInSeconds);
				// Obtener la diferencia de tiempos
				diferenciaSegundos = (durationInSeconds - durationInSeconds2);
				tiempoFinal = durationInSeconds;
				if (diferenciaSegundos <= 1) {
					logger.info("diferencia de seg menor a uno "
							+ diferenciaSegundos);
					AudioInputStream clip1 = AudioSystem
							.getAudioInputStream(audio1);
					AudioInputStream clip2 = AudioSystem
							.getAudioInputStream(audio2);
					Collection list = new ArrayList();
					list.add(clip1);
					list.add(clip2);
					DateFormat df = new SimpleDateFormat("yyyyMMddHHmmss");
					Date date = new Date(System.currentTimeMillis());
					String[] handleOne = audio1.getName().split("_");
					String[] handleTwo = audio2.getName().split("_");
					File mixFile = new File(path.toString()+"/wavMixed.wav");

					AudioInputStream mixedFiles = new MixingAudioInputStream(
							clip2.getFormat(), list);

					AudioSystem.write(mixedFiles, AudioFileFormat.Type.WAVE,
							mixFile);
					copyAudio(mixFile.getAbsolutePath(),
							"home/wsuser/web/Conversaciones/" + df.format(date)
									+ "_" + handleOne[0] + "_" + handleTwo[0]
									+ "_" + handleTwo[1], 0,
							Math.round(tiempoFinal));

					return "ok";
				}
				int diferenciaEnSegundos = (Math.round(diferenciaSegundos));
				logger.info("Diferencia de seg "
						+ diferenciaEnSegundos);
				// Definimos el tiempo máximo de la grabación.
				double cortes = (tiempoFinal / diferenciaSegundos);
				AudioInputStream appendedFiles = null;
				int primerParametro = 0;
				double SegundoParametro = cortes;
				int ciclo = diferenciaEnSegundos;
				File audioSec = new File(path.toString()+"/audioC1.wav");
				for (i = 1; i <= ciclo; i++) {

					copyAudioFloat(audio2.getAbsolutePath(),
							audioSec.getAbsolutePath(), primerParametro,
							SegundoParametro);
					File audio3 = new File(audioSec.getAbsolutePath());
					AudioInputStream clip1 = AudioSystem
							.getAudioInputStream(audio3);
					AudioInputStream clipVoid = AudioSystem
							.getAudioInputStream(audioVoid);

					appendedFiles = new AudioInputStream(
							new SequenceInputStream(clip1, clipVoid),
							clip1.getFormat(), clip1.getFrameLength()
									+ clipVoid.getFrameLength());

					AudioSystem.write(appendedFiles, AudioFileFormat.Type.WAVE,
							new File("home/wsuser/web/audioSecuencias/audioC1"
									+ getCharForNumber(i) + ".wav"));

					primerParametro += (cortes);
					appendedFiles.close();

				}
				try {
					File audDir = new File("home/wsuser/web/audioSecuencias/");

					File[] filesList = audDir.listFiles();
					long length = 0;
					AudioInputStream clip = null;
					List<AudioInputStream> list = new ArrayList<AudioInputStream>();

					for (File file : filesList) {
						clip = AudioSystem.getAudioInputStream(new File(file
								.getPath()));
						list.add(clip);
						length += clip.getFrameLength();

					}

					AudioInputStream appendedFiles2 = null;
					if (length > 0 && list.size() > 0 && clip != null) {

						appendedFiles2 = new AudioInputStream(
								new SequenceInputStream(
										Collections.enumeration(list)),
								clip.getFormat(), length);
						File file = new File(path.toString()+"/wavSequenced.wav");
                        AudioSystem.write(appendedFiles2,
                                AudioFileFormat.Type.WAVE,
                                file);
					}
				} catch (Exception e) {
					System.out.println("Error: " + e.toString());
				}
				AudioInputStream clip1 = AudioSystem
						.getAudioInputStream(new File(path.toString()+"/wavSequenced.wav"));
				AudioInputStream clip2 = AudioSystem
						.getAudioInputStream(audio1);

				Collection list = new ArrayList();
				list.add(clip1);
				list.add(clip2);
				DateFormat df = new SimpleDateFormat("yyyyMMddHHmmss");
				Date date = new Date(System.currentTimeMillis());
				String[] handleOne = audio1.getName().split("_");
				String[] handleTwo = audio2.getName().split("_");
				File mixFile = new File(path.toString()+"/wavMixed.wav");
				EndFile = new File("home/wsuser/web/Conversaciones/"
						+ df.format(date) + "_" + handleOne[0] + "_"
						+ handleTwo[0] + "_" + handleTwo[1]);
				AudioInputStream mixedFiles = new MixingAudioInputStream(
						clip2.getFormat(), list);

				AudioSystem.write(mixedFiles, AudioFileFormat.Type.WAVE,
						mixFile);
				copyAudio(mixFile.getAbsolutePath(), EndFile.getAbsolutePath(),
						0, Math.round(tiempoFinal));
			}

		} catch (Exception e) {

			return "Error: " + e.toString();
		}

		 final StringBuilder sb = new StringBuilder();
		 sb.append("http://").append(trafficInterfaceAddress)
		 .append("/services/").append(myServiceName)
		 .append("/StoreRecordingServlet?Delete=");
		
		 Delete delete = new Delete();
		 try {
		 delete.deleteAudio(audioUno, sb.toString());
		 delete.deleteAudio(audioDos, sb.toString());
		 } catch (SSLUtilityException | IOException e) {
		 return "Error al borrar: "+ e.toString();
		 }

		for (int j = 1; j < i; j++) {

			String Uri = "http://" + trafficInterfaceAddress + "/services/"
					+ myServiceName + "/ReadText/web/audioSecuencias/audioC1"
					+ getCharForNumber(j) + ".wav";
			Delete deleteSec = new Delete();
			try {
				logger.info(deleteSec.borrarSecuencia(Uri));
			} catch (Exception ex) {
				System.out.println("Error: " + ex.toString());
			}

		}

		return "ok";
	}

	public static void copyAudio(String sourceFileName,
			String destinationFileName, int startSecond, int secondsToCopy) {
		AudioInputStream inputStream = null;
		AudioInputStream shortenedStream = null;
		try {
			File file = new File(sourceFileName);
			AudioFileFormat fileFormat = AudioSystem.getAudioFileFormat(file);
			AudioFormat format = fileFormat.getFormat();
			inputStream = AudioSystem.getAudioInputStream(file);
			int bytesPerSecond = format.getFrameSize()
					* (int) format.getFrameRate();
			inputStream.skip(startSecond * bytesPerSecond);
			long framesOfAudioToCopy = secondsToCopy
					* (int) format.getFrameRate();
			shortenedStream = new AudioInputStream(inputStream, format,
					framesOfAudioToCopy);
			File destinationFile = new File(destinationFileName);
			AudioSystem.write(shortenedStream, fileFormat.getType(),
					destinationFile);
		} catch (Exception e) {
			// println(e);
		} finally {
			if (inputStream != null) {
				try {
					inputStream.close();
				} catch (Exception e) {
					// println(e);
				}
			}
			if (shortenedStream != null) {
				try {
					shortenedStream.close();
				} catch (Exception e) {
					// println(e);
				}
			}
		}
	}

	public static float tiempoAudio(File audio)
			throws UnsupportedAudioFileException, IOException {
		AudioInputStream audioInputStream = AudioSystem
				.getAudioInputStream(audio);
		AudioFormat format = audioInputStream.getFormat();
		long audioFileLength = audio.length();
		int frameSize = format.getFrameSize();
		float frameRate = format.getFrameRate();
		float durationInSeconds = (audioFileLength / (frameSize * frameRate));
		return durationInSeconds;
	}

	public static void copyAudioFloat(String sourceFileName,
			String destinationFileName, double startSecond, double secondsToCopy) {
		AudioInputStream inputStream = null;
		AudioInputStream shortenedStream = null;
		try {
			File file = new File(sourceFileName);
			AudioFileFormat fileFormat = AudioSystem.getAudioFileFormat(file);
			AudioFormat format = fileFormat.getFormat();
			inputStream = AudioSystem.getAudioInputStream(file);
			int bytesPerSecond = format.getFrameSize()
					* (int) format.getFrameRate();
			inputStream.skip((long) (startSecond * bytesPerSecond));
			long framesOfAudioToCopy = (long) (secondsToCopy * (int) format
					.getFrameRate());
			shortenedStream = new AudioInputStream(inputStream, format,
					framesOfAudioToCopy);
			File destinationFile = new File(destinationFileName);
			AudioSystem.write(shortenedStream, fileFormat.getType(),
					destinationFile);

		} catch (Exception e) {

		} finally {
			if (inputStream != null) {
				try {
					inputStream.close();
				} catch (Exception e) {
					// println(e);
				}
			}
			if (shortenedStream != null) {
				try {
					shortenedStream.close();
				} catch (Exception e) {
					// println(e);
				}
			}
		}
	}

	private static String getCharForNumber(int i) {
		return i > 0 && i < 27 ? String.valueOf((char) (i + 64)) : null;
	}
	
	/*****************************************************************************
     * return application path
     * @return
     *****************************************************************************/
    public static String getApplcatonPath(){
        CodeSource codeSource = WavAppender.class.getProtectionDomain().getCodeSource();
        File rootPath = null;
        try {
            rootPath = new File(codeSource.getLocation().toURI().getPath());
        } catch (URISyntaxException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }           
        return rootPath.getParentFile().getPath();
    }//end of getApplcatonPath()
}
