package com.aitablet.fingerprint;

import android.graphics.Bitmap;
import android.util.Log;

import androidx.annotation.NonNull;

import com.aitablet.fp_core.FingerManager;
import com.aitablet.fp_core.IRegisterFpCallback;
import com.aitablet.fp_core.IVerifyCallback;
import com.aitablet.utils.UtilsForRN;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.io.ByteArrayOutputStream;

public class FingerModle extends ReactContextBaseJavaModule implements IRegisterFpCallback, IVerifyCallback {
    private static ReactApplicationContext reactContext;
    private FingerManager fingerManager;

    public FingerModle(@NonNull ReactApplicationContext reactContext) {
        super(reactContext);
        FingerModle.reactContext = reactContext;
        fingerManager = FingerManager.getInstance();
        fingerManager.setRegisterFpCallback(this);
        fingerManager.setVerifyFpFeedback(this);
    }

    @NonNull
    @Override
    public String getName() {
        return "FingerModle";
    }


    @ReactMethod
    public void open() {
        fingerManager.initDevice(reactContext);
    }

    @ReactMethod
    public void close() {
        fingerManager.release();
    }

    @ReactMethod
    public void compare() {
        fingerManager.verifyFp();
    }

    @ReactMethod
    public void regist(String userName, int userId) {
        fingerManager.registerFp(userName, userId);
    }

    @ReactMethod
    public void deleteById(int id) {
        fingerManager.deleteById(id);
    }

    @ReactMethod
    public void deleteAll() {
        fingerManager.deleteAll();
    }


    @Override
    public void onRegisterStart(String message) {
        Log.e("test", "onRegisterStart : " + message);
    }

    @Override
    public void onRegisterError(String message) {
        Log.e("test", "onRegisterError : " + message);
        UtilsForRN.sendEvent(reactContext, "onRegisterError", message, "");
    }

    @Override
    public void onPress(int step, String message) {
        Log.e("test", "onPress : " + message);
    }

    @Override
    public void onRelease(int step, String message) {
        Log.e("test", "onRelease : " + message);
    }

    @Override
    public void onShowFpImage(Bitmap bitmap) {
        Log.e("test", "onShowFpImage");
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        bitmap.compress(Bitmap.CompressFormat.JPEG, 100, baos);
        byte[] data = baos.toByteArray();
        String s = new String(data);
        UtilsForRN.sendEvent(reactContext, "onShowFpImage", "", s);
    }

    @Override
    public void onRegisterFpResult(String userName, int userId, String printId) {
        Log.e("test", "onRegisterFpResult : " + userName + " , " + userId + " , " + printId);
        String s = "{userName:'" + userName + "',userId:" + userId + ",printId:'" + printId + "'}";
        UtilsForRN.sendEvent(reactContext, "onRegisterFpResult", "", s);
    }

    @Override
    public void onRegisterSuccess(String message) {
        Log.e("test", "onRegisterSuccess : " + message);
        UtilsForRN.sendEvent(reactContext, "onRegisterSuccess", "", message);
    }

    @Override
    public void onVerifyResult(int code, String message) {
        Log.e("test", "onVerifyResult : " + code + " , " + message);
        String s = "{code:" + code + "}";
        UtilsForRN.sendEvent(reactContext, "onVerifyResult", "", s);
    }
}
