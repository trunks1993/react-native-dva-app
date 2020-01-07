package com.aitablet.utils;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

public class UtilsForRN {
    public static void sendEvent(ReactApplicationContext context, String eventName, String msg, String data) {
        WritableMap params = Arguments.createMap();
        params.putString("msg", msg);
        params.putString("data", data);
        context.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);
    }
}
