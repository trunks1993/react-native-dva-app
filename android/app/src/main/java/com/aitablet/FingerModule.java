package com.aitablet;

import android.graphics.Bitmap;

import com.aitablet.fp_core.FingerManager;
import com.aitablet.fp_core.ICaptureCallback;
import com.aitablet.fp_core.IDeviceCallback;
import com.aitablet.fp_core.IRegisterFpCallback;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.uimanager.IllegalViewOperationException;

public class FingerModule extends ReactContextBaseJavaModule implements IDeviceCallback, IRegisterFpCallback, ICaptureCallback {
    private static ReactApplicationContext reactContext;
    private FingerManager mFpManager;
    private Callback test;

    public FingerModule(ReactApplicationContext reactContext) {
        super(reactContext);
        reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "FingerModule";
    }

    @ReactMethod
    public void registFinger(
            Callback successCallback,
            Callback errorCallback
            ) {
        try {
            successCallback.invoke(1, 2, 3, 4);
        } catch (IllegalViewOperationException e) {
            errorCallback.invoke(e.getMessage());
        }
    }

    @Override
    public void onCaptureResult(int code, String message) {
        test.invoke(1, 2, 3, 4);
    }

    @Override
    public void onInitDeviceError(int stateCode, String message) {
        test.invoke(1, 2, 3, 4);
    }

    @Override
    public void onRegisterStart(String message) {
        test.invoke(1, 2, 3, 4);
    }

    @Override
    public void onRegisterError(String message) {
        test.invoke(1, 2, 3, 4);
    }

    @Override
    public void onPress(int step, String message) {
        test.invoke(1, 2, 3, 4);
    }

    @Override
    public void onRelease(int step, String message) {
        test.invoke(1, 2, 3, 4);
    }

    @Override
    public void onShowFpImage(Bitmap bitmap) {
        test.invoke(1, 2, 3, 4);
    }

    @Override
    public void onRegisterFpResult(String userName, int userId, String printId) {
        test.invoke(1, 2, 3, 4);
    }

    @Override
    public void onRegisterSuccess(String message) {
        test.invoke(1, 2, 3, 4);
    }
}
