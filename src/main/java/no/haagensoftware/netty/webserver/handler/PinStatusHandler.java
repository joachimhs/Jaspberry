package no.haagensoftware.netty.webserver.handler;

import no.haagensoftware.netty.webserver.data.GpioState;
import no.haagensoftware.netty.webserver.util.JsonGenerator;
import org.apache.log4j.Logger;
import org.jboss.netty.channel.ChannelHandlerContext;
import org.jboss.netty.channel.MessageEvent;

import java.util.ArrayList;
import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: joahaa
 * Date: 12/11/12
 * Time: 8:35 AM
 * To change this template use File | Settings | File Templates.
 */
public class PinStatusHandler extends FileServerHandler {
    private Logger logger = Logger.getLogger(PiStatusHandler.class.getName());
    private List<GpioState> gpioStateList;

    public PinStatusHandler(String path, List<GpioState> gpioStateList) {
        super(path);
        this.gpioStateList = gpioStateList;
    }

    @Override
    public void messageReceived(ChannelHandlerContext ctx, MessageEvent e) throws Exception {
        String jsonResponse = "";

        jsonResponse = JsonGenerator.generateJsonForGpioStateList(gpioStateList).toString();
        logger.info(getHttpMessageContent(e));
        logger.info(jsonResponse);

        writeContentsToBuffer(ctx, jsonResponse, "text/json");
    }
}

