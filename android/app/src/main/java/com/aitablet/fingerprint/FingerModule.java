package com.aitablet.fingerprint;

import android.content.Intent;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

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
    public void regist() {
        Intent intent = new Intent(UsbFingerService.REGISTER);
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
}
