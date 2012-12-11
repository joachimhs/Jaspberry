package no.haagensoftware.netty.webserver.data;

import com.google.gson.JsonObject;

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

    public void setGpioState(Boolean gpioState) {
        this.gpioState = gpioState;
    }

    public String toJSON() {
        JsonObject json = new JsonObject();
        json.addProperty("id", this.gpioId);
        json.addProperty("state", this.gpioState);
        return json.toString();
    }
}
