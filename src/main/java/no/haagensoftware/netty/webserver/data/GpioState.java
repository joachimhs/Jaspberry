package no.haagensoftware.netty.webserver.data;

import com.google.gson.JsonObject;
import com.pi4j.io.gpio.GpioPinDigitalInput;
import com.pi4j.io.gpio.GpioPinDigitalOutput;
import com.pi4j.io.gpio.PinState;
import org.apache.log4j.Logger;

/**
 * Created with IntelliJ IDEA.
 * User: joahaa
 * Date: 12/11/12
 * Time: 2:30 PM
 * To change this template use File | Settings | File Templates.
 */
public class GpioState {
    private String gpioId;
    private Boolean gpioState;
    private GpioPinDigitalOutput gpioPinDigitalOutput;
    private Long pinStateChangeTime;
    private Logger logger = Logger.getLogger(GpioState.class.getName());

    public GpioState() {
        gpioState = new Boolean(false);
    }

    public GpioState(String gpioId, Boolean gpioState) {
        this.gpioId = gpioId;
        this.gpioState = gpioState;
    }

    public String getGpioId() {
        return gpioId;
    }

    public void setGpioId(String gpioId) {
        this.gpioId = gpioId;
    }

    public Boolean getGpioState() {
        return gpioState;
    }

    public Long getPinStateChangeTime() {
        return pinStateChangeTime;
    }

    public void setGpioState(Boolean gpioState) {
        if (gpioPinDigitalOutput != null) {
            int counter = 0;
            if (gpioState) {
                gpioPinDigitalOutput.setState(PinState.HIGH);
                while (!gpioPinDigitalOutput.isHigh()) {
                    counter++;
                }
            } else {
                gpioPinDigitalOutput.setState(PinState.LOW);
                while (!gpioPinDigitalOutput.isLow()) {
                    counter++;
                }
            }
            pinStateChangeTime = (long)counter;
            logger.info("Pin changed to " + gpioPinDigitalOutput.getState() + " in " + pinStateChangeTime + " ms.");
        }

        this.gpioState = gpioState;
    }

    public void setGpioPinDigitalOutput(GpioPinDigitalOutput gpioPinDigitalOutput) {
        this.gpioPinDigitalOutput = gpioPinDigitalOutput;
    }

    public String toJSON() {
        JsonObject json = new JsonObject();
        json.addProperty("id", this.gpioId);
        json.addProperty("state", this.gpioState);
        return json.toString();
    }
}
