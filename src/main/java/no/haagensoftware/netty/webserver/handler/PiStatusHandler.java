package no.haagensoftware.netty.webserver.handler;

import org.apache.log4j.Logger;
import org.jboss.netty.channel.ChannelHandlerContext;
import org.jboss.netty.channel.MessageEvent;

/**
 * Created with IntelliJ IDEA.
 * User: joahaa
 * Date: 12/11/12
 * Time: 8:38 AM
 * To change this template use File | Settings | File Templates.
 */
public class PiStatusHandler extends FileServerHandler {
    private Logger logger = Logger.getLogger(PiStatusHandler.class.getName());

    public PiStatusHandler(String path) {
        super(path);
    }

    @Override
    public void messageReceived(ChannelHandlerContext ctx, MessageEvent e) throws Exception {
        String jsonResponse = "";

        logger.info(getHttpMessageContent(e));

        writeContentsToBuffer(ctx, jsonResponse, "text/json");
    }
}
