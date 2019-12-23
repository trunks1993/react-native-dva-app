package com.aitablet.fp_core;

public interface ICaptureCallback {
    public final int CODE_SUCCESS = 0;
    public final int CODE_ERROR = 1;
    public final int CODE_CANCEL = 2;
    void onCaptureResult(int code, String message);
}
