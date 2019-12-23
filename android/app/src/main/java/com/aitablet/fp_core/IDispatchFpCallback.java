package com.aitablet.fp_core;
public interface IDispatchFpCallback {
    public final int CODE_SUCCESS = 0;
    public final int CODE_ERROR = 1;
    public final int CODE_DISPATCH_REPEAT = 2;
    void onDispatchResult(int code, String message);
}
