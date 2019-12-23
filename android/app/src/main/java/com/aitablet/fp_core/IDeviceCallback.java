package com.aitablet.fp_core;
public interface IDeviceCallback {
    public final int CODE_OPED_DEVICE_SUCCESS = 0;
    public final int CODE_OPED_DEVICE_FAIL = 1;
    public final int CODE_USB_PERMISSION_DENY = 2;
    public final int CODE_USB_DEVICE_NOT_FOUND = 3;
    public final int CODE_INIT_USB_FAIL = 4;
    public final int CODE_OTHER = 100;
    public final int CODE_CONNECT_DEVICE_FAIL = 5;

    void onInitDeviceError(int stateCode, String message);
}
