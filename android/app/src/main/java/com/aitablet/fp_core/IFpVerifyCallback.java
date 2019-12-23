package com.aitablet.fp_core;

public interface IFpVerifyCallback {
    void onVerifyStart(int code, String message);
    void onVerifyError(int code, String message);
    void onVerifySuccess(String message);
}
