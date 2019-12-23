package com.aitablet.fp_core;

public interface IVerifyCallback {
    public static final int CODE_SUCCESS = 0;
    public static final int CODE_ERROR = 1;

    void onVerifyResult(int code, String message);
}
