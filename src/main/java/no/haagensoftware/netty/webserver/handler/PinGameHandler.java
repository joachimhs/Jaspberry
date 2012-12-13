package no.haagensoftware.netty.webserver.handler;

import com.google.gson.Gson;
import no.haagensoftware.netty.webserver.data.GpioState;
import no.haagensoftware.netty.webserver.util.JsonGenerator;
import org.jboss.netty.channel.ChannelHandler;
import org.jboss.netty.channel.ChannelHandlerContext;
import org.jboss.netty.channel.MessageEvent;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.logging.Logger;

/**
 * Created with IntelliJ IDEA.
 * User: joahaa
 * Date: 12/12/12
 * Time: 4:54 PM
 * To change this template use File | Settings | File Templates.
 */
public class PinGameHandler extends FileServerHandler {
    private List<GpioState> gpioStateList;
    private Logger logger = Logger.getLogger(PinGameHandler.class.getName());
    private List<Integer> correctLedList;
    private Integer correctLeds = 0;
    private Random random;

    public PinGameHandler(String path, List<GpioState> gpioStateList) {
        super(path);
        this.gpioStateList = gpioStateList;
        correctLedList = new ArrayList<Integer>();
        random = new Random();
    }

    @Override
    public void messageReceived(ChannelHandlerContext ctx, MessageEvent e) throws Exception {
        String jsonResponse = "";

        String messageContent = getHttpMessageContent(e);
        logger.info("PinGameHandler request: " + messageContent);
        PinGameActionRequestJson request = new Gson().fromJson(messageContent, PinGameActionRequestJson.class);

        if (request.getAction().equalsIgnoreCase("start")) {
            correctLedList.clear();
            correctLeds = 0;
            animateNextRound();
            PinGameResponseJson response = new PinGameResponseJson("started");
            jsonResponse = new Gson().toJson(response);
        } else if (request.getAction().equalsIgnoreCase("ledOne")) {
            jsonResponse = new Gson().toJson(advanceGame(0));
        } else if (request.getAction().equalsIgnoreCase("ledTwo")) {
            jsonResponse = new Gson().toJson(advanceGame(1));
        } else if (request.getAction().equalsIgnoreCase("ledThree")) {
            jsonResponse = new Gson().toJson(advanceGame(2));
        } else if (request.getAction().equalsIgnoreCase("ledFour")) {
            jsonResponse = new Gson().toJson(advanceGame(3));
        } else if (request.getAction().equalsIgnoreCase("ledFive")) {
            jsonResponse = new Gson().toJson(advanceGame(4));
        }

        writeContentsToBuffer(ctx, jsonResponse, "text/json");
    }

    private PinGameResponseJson advanceGame(Integer ledNum) {
        String actionResponse = "correct";

        if (correctLedList.size() > correctLeds && correctLedList.get(correctLeds) == ledNum) {
            //Correct LED picked
            correctLeds++;
            if (correctLeds == correctLedList.size()) {
                //Round finished. Add a new number and reset correctLeds to 0
                animateNextRound();
            }
        } else {
            //Wrong LED Picked or game in faulty state. Regardless, end game!
            actionResponse = "wrong";
        }

        return new PinGameResponseJson(actionResponse, correctLedList.size(), correctLeds);
    }

    private void animateNextRound() {
        Integer nextLed = new Random().nextInt(5);
        logger.info("Next LED: " + (nextLed+1));
        correctLedList.add(nextLed);

        for (Integer ledNum : correctLedList) {
            gpioStateList.get(ledNum).setGpioState(true);
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                //What to do, what to do...
            }
            gpioStateList.get(ledNum).setGpioState(false);
            try {
                Thread.sleep(200);
            } catch (InterruptedException e) {
                //What to do, what to do...
            }
        }

        correctLeds = 0;
    }

    class PinGameResponseJson {
        private String actionResponse;
        private Integer numLeds;
        private Integer completedLeds;

        PinGameResponseJson() {
            this.numLeds = 1;
            this.completedLeds = 0;
        }

        PinGameResponseJson(String actionResponse) {
            this.actionResponse = actionResponse;
            this.numLeds = 1;
            this.completedLeds = 0;
        }

        PinGameResponseJson(String actionResponse, Integer numLeds, Integer completedLeds) {
            this.actionResponse = actionResponse;
            this.numLeds = numLeds;
            this.completedLeds = completedLeds;
        }

        public String getActionResponse() {
            return actionResponse;
        }

        public void setActionResponse(String actionResponse) {
            this.actionResponse = actionResponse;
        }

        public Integer getNumLeds() {
            return numLeds;
        }

        public void setNumLeds(Integer numLeds) {
            this.numLeds = numLeds;
        }

        public Integer getCompletedLeds() {
            return completedLeds;
        }

        public void setCompletedLeds(Integer completedLeds) {
            this.completedLeds = completedLeds;
        }
    }

    class PinGameActionRequestJson {
        private String action;

        public String getAction() {
            return action;
        }

        public void setAction(String action) {
            this.action = action;
        }
    }
}
