package no.haagensoftware.netty.webserver.util;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import no.haagensoftware.netty.webserver.data.GpioState;

import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: joahaa
 * Date: 12/11/12
 * Time: 2:38 PM
 * To change this template use File | Settings | File Templates.
 */
public class JsonGenerator {

    public static JsonObject generateJsonForGpioStateList(List<GpioState> gpioStateList) {
        JsonObject jsonObject = new JsonObject();
        JsonArray gpioStatesArray = new JsonArray();
        JsonObject gpioStatesObject = new JsonObject();
        JsonArray gpiosArray = new JsonArray();

        gpioStatesObject.addProperty("id", "gpio");
        for (GpioState gs : gpioStateList) {
            gpioStatesObject.addProperty(gs.getGpioId(), gs.getGpioId());

            JsonObject gpio = new JsonObject();
            gpio.addProperty("id", gs.getGpioId());
            gpio.addProperty("state", gs.getGpioState());

            gpiosArray.add(gpio);
        }
        gpioStatesArray.add(gpioStatesObject);
        jsonObject.add("gpiostates", gpioStatesArray);
        jsonObject.add("gpios", gpiosArray);

        return jsonObject;
    }
}