package com.aitablet.fp_core;

/**
 * Created by Hfengxiang
 * on 2019/12/9
 */
public interface IUsbConnState {
    void onUsbConnected();

    void onUsbPermissionDenied();

    void onDeviceNotFound();
}
