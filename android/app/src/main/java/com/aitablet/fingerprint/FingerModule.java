package com.aitablet.fingerprint;

import android.content.Intent;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

public class FingerModule extends ReactContextBaseJavaModule {
    private static ReactApplicationContext reactContext;

    public FingerModule(@NonNull ReactApplicationContext reactContext) {
        super(reactContext);
        FingerModule.reactContext = reactContext;
    }

    @NonNull
    @Override
    public String getName() {
        return "FingerModule";
    }


    @ReactMethod
    public void open() {
        Intent intent = new Intent(UsbFingerService.OPENFINGER);
        reactContext.sendBroadcast(intent);
    }

    @ReactMethod
    public void close() {
        Intent intent = new Intent(UsbFingerService.CLOSEFINGER);
        reactContext.sendBroadcast(intent);
    }

    @ReactMethod
    public void compare() {
        Intent intent = new Intent(UsbFingerService.COMPAREFINGER);
        reactContext.sendBroadcast(intent);
    }

    @ReactMethod
    public void regist(String object) {
        Intent intent = new Intent(UsbFingerService.REGISTER);
        intent.putExtra("PoliceFinger",object);
        reactContext.sendBroadcast(intent);
    }

    @ReactMethod
    public void deleteById(String id) {
        Intent intent = new Intent(UsbFingerService.DELESOMEFINGER);
        intent.putExtra("policeId", id);
        reactContext.sendBroadcast(intent);
    }

    @ReactMethod
    public void deleteAll(String id) {
        Intent intent = new Intent(UsbFingerService.DELEALLFINGER);
        reactContext.sendBroadcast(intent);
    }

    public static void sendEvent(String eventName,
                                 String... value) {
        WritableMap params = Arguments.createMap();
        for (int i = 1; i <= value.length; i++) {
            params.putString("eventProperty" + i, value[i]);
        }
        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);
    }
}
