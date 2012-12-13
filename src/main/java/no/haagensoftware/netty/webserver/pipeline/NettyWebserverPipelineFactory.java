package no.haagensoftware.netty.webserver.pipeline;

import java.io.File;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;

import com.pi4j.io.gpio.*;
import com.pi4j.io.gpio.event.GpioPinDigitalStateChangeEvent;
import com.pi4j.io.gpio.event.GpioPinListenerDigital;
import no.haagensoftware.netty.webserver.data.GpioState;
import no.haagensoftware.netty.webserver.handler.*;

import org.apache.log4j.Logger;
import org.jboss.netty.channel.ChannelHandler;
import org.jboss.netty.channel.ChannelPipeline;
import org.jboss.netty.channel.ChannelPipelineFactory;
import org.jboss.netty.channel.Channels;
import org.jboss.netty.handler.codec.http.HttpChunkAggregator;
import org.jboss.netty.handler.codec.http.HttpContentCompressor;
import org.jboss.netty.handler.codec.http.HttpRequestDecoder;
import org.jboss.netty.handler.codec.http.HttpResponseEncoder;
import org.jboss.netty.handler.stream.ChunkedWriteHandler;

public class NettyWebserverPipelineFactory implements ChannelPipelineFactory {
	private static Logger logger = Logger.getLogger(NettyWebserverPipelineFactory.class.getName());
	private RouterHandler routerhandler = null;
    LinkedHashMap<String, ChannelHandler> routes = new LinkedHashMap<String, ChannelHandler>();
    List<GpioState> gpioStateList;

	private String webappPath;

	public NettyWebserverPipelineFactory(String webappPath) {
        this.webappPath = webappPath;
        gpioStateList = new ArrayList<GpioState>();
        gpioStateList.add(new GpioState("gpio0", false));
        gpioStateList.add(new GpioState("gpio1", false));
        gpioStateList.add(new GpioState("gpio2", false));
        gpioStateList.add(new GpioState("gpio3", false));
        gpioStateList.add(new GpioState("gpio4", false));
        gpioStateList.add(new GpioState("gpio5", false));
        gpioStateList.add(new GpioState("gpio6", false));
        gpioStateList.add(new GpioState("gpio7", false));
        gpioStateList.add(new GpioState("vdcOne", false));
        gpioStateList.add(new GpioState("vdcTwo", false));
        gpioStateList.add(new GpioState("sda0", false));
        gpioStateList.add(new GpioState("dnc0", false));
        gpioStateList.add(new GpioState("scl0", false));
        gpioStateList.add(new GpioState("gnd", false));
        gpioStateList.add(new GpioState("txd", false));
        gpioStateList.add(new GpioState("dnc1", false));
        gpioStateList.add(new GpioState("rxd", false));
        gpioStateList.add(new GpioState("dnc2", false));
        gpioStateList.add(new GpioState("dnc3", false));
        gpioStateList.add(new GpioState("mosi", false));
        gpioStateList.add(new GpioState("dnc4", false));
        gpioStateList.add(new GpioState("miso", false));
        gpioStateList.add(new GpioState("sclk", false));
        gpioStateList.add(new GpioState("ce0", false));
        gpioStateList.add(new GpioState("dnc5", false));
        gpioStateList.add(new GpioState("ce1", false));

        GpioController gpioController = GpioFactory.getInstance();
        gpioStateList.get(0).setGpioPinDigitalOutput(gpioController.provisionDigitalOutputPin(RaspiPin.GPIO_00, "gpio0", PinState.LOW));
        gpioStateList.get(1).setGpioPinDigitalOutput(gpioController.provisionDigitalOutputPin(RaspiPin.GPIO_01, "gpio1", PinState.LOW));
        gpioStateList.get(2).setGpioPinDigitalOutput(gpioController.provisionDigitalOutputPin(RaspiPin.GPIO_02, "gpio2", PinState.LOW));
        gpioStateList.get(3).setGpioPinDigitalOutput(gpioController.provisionDigitalOutputPin(RaspiPin.GPIO_03, "gpio3", PinState.LOW));
        gpioStateList.get(4).setGpioPinDigitalOutput(gpioController.provisionDigitalOutputPin(RaspiPin.GPIO_04, "gpio4", PinState.LOW));
        gpioStateList.get(5).setGpioPinDigitalOutput(gpioController.provisionDigitalOutputPin(RaspiPin.GPIO_05, "gpio5", PinState.LOW));
        gpioStateList.get(6).setGpioPinDigitalOutput(gpioController.provisionDigitalOutputPin(RaspiPin.GPIO_06, "gpio6", PinState.LOW));
        gpioStateList.get(7).setGpioPinDigitalOutput(gpioController.provisionDigitalOutputPin(RaspiPin.GPIO_07, "gpio7", PinState.LOW));

        /*GpioPinDigitalInput input = gpioController.provisionDigitalInputPin(RaspiPin.GPIO_07, "gpio7", PinPullResistance.PULL_DOWN);
        input.addListener(new GpioPinListenerDigital() {
            @Override
            public void handleGpioPinDigitalStateChangeEvent(GpioPinDigitalStateChangeEvent gpioPinDigitalStateChangeEvent) {
                logger.info("PIN Changed to: " + gpioPinDigitalStateChangeEvent.getState());
            }
        });*/
    }

	@Override
	public ChannelPipeline getPipeline() throws Exception {
		ChannelPipeline pipeline = Channels.pipeline();

        // Uncomment the following line if you want HTTPS
        //SSLEngine engine = SecureChatSslContextFactory.getServerContext().createSSLEngine();
        //engine.setUseClientMode(false);
        //pipeline.addLast("ssl", new SslHandler(engine));

        pipeline.addLast("decoder", new HttpRequestDecoder());
        pipeline.addLast("aggregator", new HttpChunkAggregator(256000));
        pipeline.addLast("encoder", new HttpResponseEncoder());
        pipeline.addLast("gzip", new HttpContentCompressor(6));
        pipeline.addLast("chunkedWriter", new ChunkedWriteHandler());

        if (routerhandler == null) {
            routes.put("equals:/pinStatus", new PinStatusHandler(webappPath, gpioStateList));
            routes.put("equals:/triggerPin", new TriggerPinHandler(webappPath, gpioStateList));
            routes.put("equals:/piStatus", new PiStatusHandler(webappPath));
            routes.put("equals:/pinGameAction", new PinGameHandler(webappPath, gpioStateList));
            routerhandler = new RouterHandler(routes, false, new CacheableFileServerHandler(webappPath, 0));
        }

        pipeline.addLast("handler_routeHandler", routerhandler);
        
        return pipeline;
	}
}
