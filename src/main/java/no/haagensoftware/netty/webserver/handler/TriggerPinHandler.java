package no.haagensoftware.netty.webserver.handler;

import com.google.gson.Gson;
import no.haagensoftware.netty.webserver.data.GpioState;
import org.apache.log4j.Logger;
import org.jboss.netty.channel.ChannelHandlerContext;
import org.jboss.netty.channel.MessageEvent;

import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: joahaa
 * Date: 12/11/12
 * Time: 8:37 AM
 * To change this template use File | Settings | File Templates.
 */
public class TriggerPinHandler extends FileServerHandler {
    private Logger logger = Logger.getLogger(TriggerPinHandler.class.getName());
    private List<GpioState> gpioStateList;

    public TriggerPinHandler(String path, List<GpioState> gpioStateList) {
        super(path);
        this.gpioStateList = gpioStateList;
    }

    @Override
    public void messageReceived(ChannelHandlerContext ctx, MessageEvent e) throws Exception {
        String jsonResponse = "";

        String messageContent = getHttpMessageContent(e);
        logger.info(messageContent);

        GpioJson inputJson = new Gson().fromJson(messageContent, GpioJson.class);
        logger.info("got id: " + inputJson.getId() + " state: " + inputJson.getState());

        for (GpioState state : gpioStateList) {
            if (state.getGpioId().equals(inputJson.getId())) {
                state.setGpioState(inputJson.getState());
                jsonResponse = state.toJSON();
                break;
            }
        }

        writeContentsToBuffer(ctx, jsonResponse, "text/json");
    }

    class GpioJson {
        private String id;
        private Boolean state;

        public String getId() {
            return id;
        }

        public void setId(String id) {
            this.id = id;
        }

        public Boolean getState() {
            return state;
        }

        public void setState(Boolean state) {
            this.state = state;
        }
    }
}
