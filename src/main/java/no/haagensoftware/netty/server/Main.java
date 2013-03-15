package no.haagensoftware.netty.server;

import no.haagensoftware.netty.webserver.pipeline.NettyWebserverPipelineFactory;
import org.apache.log4j.Logger;
import no.haagensoftware.netty.webserver.util.IntegerParser;
import org.jboss.netty.bootstrap.ServerBootstrap;
import org.jboss.netty.channel.socket.nio.NioServerSocketChannelFactory;

import com.pi4j.io.gpio.GpioFactory;

import java.io.File;
import java.io.FileInputStream;
import java.net.InetSocketAddress;
import java.util.Enumeration;
import java.util.Properties;
import java.util.concurrent.Executors;

public class Main {
	private static Logger logger = Logger.getLogger(Main.class.getName());
	
	public static void main(String[] args) throws Exception{
		//new Main().run();
		configure();
		
		Main main = new Main();
		main.run();
	}
	
	private static void configure() throws Exception {
		Properties properties = new Properties();
		File configFile = new File("config.properties");
		if (!configFile.exists()) {
			configFile = new File("../config.properties");
		}
		if (!configFile.exists()) {
			configFile = new File("../../config.properties");
		}
		if (configFile.exists()) {
			FileInputStream configStream = new FileInputStream(configFile);
			properties.load(configStream);
			configStream.close();
			logger.info("Server properties loaded from " + configFile.getAbsolutePath());
			for (Enumeration<Object> e = properties.keys(); e.hasMoreElements();) {
				Object property = (String) e.nextElement();
				logger.info("\t\t* " + property + "=" + properties.get(property));
			}
		}
		
		setProperties(properties);
	}

	private static void setProperties(Properties properties) {
		boolean error = false;
		Enumeration<Object> propEnum = properties.keys();
		while (propEnum.hasMoreElements()) {
			String property = (String) propEnum.nextElement();
			System.setProperty(property, properties.getProperty(property));
		}
		
		if (System.getProperty("jaspberry.port") == null) {
			System.setProperty("jaspberry.port", "8080");
			logger.info(" * Property 'jaspberry.port' is not specified. Using default: 8080. Configure in file config.properties.");
		}
		
		if (System.getProperty("jaspberry.webappDirectory") == null) {
			error = true;
			logger.info(" * SEVERE: Property 'jaspberry.webappDirectory' is not specified. Terminating! Please specify in config.properties");
		}
		
		if (error) {
			System.exit(-1);
		}
	}
	
	public void run() throws Exception {
		
		String webappDir = System.getProperty("jaspberry.webappDirectory");
		System.setProperty("basedir", webappDir);

        logger.info("Starting server");
				
		Integer port = IntegerParser.parseIntegerFromString(System.getProperty("jaspberry.port"), 8080);
		
        ServerBootstrap bootstrap = new ServerBootstrap(
                new NioServerSocketChannelFactory(
                        Executors.newCachedThreadPool(),
                        Executors.newCachedThreadPool()));

        NettyWebserverPipelineFactory nwpf = new NettyWebserverPipelineFactory(webappDir);
        // Set up the event pipeline factory          .
        bootstrap.setPipelineFactory(nwpf);

        // Bind and start to accept incoming connections.
        bootstrap.bind(new InetSocketAddress(port));
        
        logger.info("Started server on port: " + port + " hosting directory: " + webappDir);
    }
}
