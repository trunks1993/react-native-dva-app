package com.aitablet.fp_core;

import android.graphics.Bitmap;

public interface IRegisterFpCallback {
    public final int CODE_PRESS = 0;
    public final int CODE_RELEASE = 1;
    public final int CODE_ERROR = 2;
    public final int CODE_SUCCESS = 3;
    public final int CODE_RESULT = 4;
    void onRegisterStart(String message);
    void onRegisterError(String message);
    void onPress(int step, String message);
    void onRelease(int step, String message);
    void onShowFpImage(Bitmap bitmap);
    void onRegisterFpResult(String userName, int userId, String printId);
    void onRegisterSuccess(String message);
}
