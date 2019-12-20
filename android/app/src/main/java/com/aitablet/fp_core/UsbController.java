package com.aitablet.fp_core;

import android.app.PendingIntent;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.hardware.usb.UsbDevice;
import android.hardware.usb.UsbDeviceConnection;
import android.hardware.usb.UsbEndpoint;
import android.hardware.usb.UsbInterface;
import android.hardware.usb.UsbManager;
import android.os.SystemClock;
import android.util.Log;
import android.widget.Toast;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Iterator;

/**
 * Created by Hfengxiang
 * on 2019/12/9
 */
public class UsbController {
    private Context mApplicationContext;
    private final UsbManager mUsbManager;
    private final int VID;
    private final int PID;
    private int m_nEPInSize;
    private int m_nEPOutSize;
    private byte[] m_abyTransferBuf;
    private boolean m_bInit = false;
    private UsbDevice m_usbDevice;
    private UsbDeviceConnection m_usbConn = null;
    private UsbInterface m_usbIf = null;
    private UsbEndpoint m_epIN = null;
    private UsbEndpoint m_epOUT = null;
    private final IUsbConnState mConnectionHandler;
    protected static final String ACTION_USB_PERMISSION = "ch.serverbox.android.USB";
    private BroadcastReceiver mPermissionReceiver = new PermissionReceiver(new IPermissionListener() {
        public void onPermissionDenied(UsbDevice d) {
            UsbController.this.l("Permission denied on " + d.getDeviceId());
        }
    });
    public static final String TAG = "USBController";

    public UsbController(Context context, IUsbConnState connectionHandler, int vid, int pid) {
        this.mConnectionHandler = connectionHandler;
        this.mApplicationContext = context.getApplicationContext();
        this.mUsbManager = (UsbManager) this.mApplicationContext.getSystemService(Context.USB_SERVICE);
        this.VID = vid;
        this.PID = pid;
        this.m_abyTransferBuf = new byte[512];
    }

    public void init() {
        this.enumerate(new IPermissionListener() {
            public void onPermissionDenied(UsbDevice d) {
                UsbManager usbman = (UsbManager) UsbController.this.mApplicationContext.getSystemService(Context.USB_SERVICE);
                PendingIntent pi = PendingIntent.getBroadcast(UsbController.this.mApplicationContext, 0, new Intent("ch.serverbox.android.USB"), 0);
                UsbController.this.mApplicationContext.registerReceiver(UsbController.this.mPermissionReceiver, new IntentFilter("ch.serverbox.android.USB"));
                usbman.requestPermission(d, pi);
            }
        });
    }

    public void uninit() {
        if (this.m_usbConn != null) {
            this.m_usbConn.releaseInterface(this.m_usbIf);
            this.m_usbConn.close();
            this.m_usbConn = null;
            this.m_bInit = false;
            stop();
        }

    }

    public void stop() {
        try {
            mPermissionReceiver = null;
            mApplicationContext = null;
            Log.i("FingerPrinter","UsbController释放Activity");
//            this.mApplicationContext.unregisterReceiver(this.mPermissionReceiver);
        } catch (IllegalArgumentException var2) {
            Log.i("FingerPrinter",var2.getLocalizedMessage());
        }

    }

    public boolean IsInit() {
        return this.m_bInit;
    }

    private void enumerate(IPermissionListener listener) {
        boolean bFound = false;
        this.l("enumerating");
        HashMap<String, UsbDevice> devlist = this.mUsbManager.getDeviceList();
        Iterator deviter = devlist.values().iterator();

        while (deviter.hasNext()) {
            UsbDevice d = (UsbDevice) deviter.next();
            this.l("Found device: " + String.format("%04X:%04X", d.getVendorId(), d.getProductId()));
            Toast.makeText(this.mApplicationContext, "Found device: " + String.format("%04X:%04X", d.getVendorId(), d.getProductId()), Toast.LENGTH_SHORT).show();
            DebugManage.WriteLog2("Found device: " + String.format("%04X:%04X", d.getVendorId(), d.getProductId()));
            if (d.getVendorId() == this.VID && d.getProductId() == this.PID) {
                bFound = true;
                this.l("Device under: " + d.getDeviceName());
                if (this.mUsbManager.hasPermission(d)) {
                    Toast.makeText(this.mApplicationContext, "enumerate, GetConnInerface start", Toast.LENGTH_SHORT).show();
                    this.GetConnInerface(d);
                    return;
                }

                Toast.makeText(this.mApplicationContext, "enumerate, hasPermission return false", Toast.LENGTH_SHORT).show();
                listener.onPermissionDenied(d);
                break;
            }
        }

        if (!bFound) {
            Toast.makeText(this.mApplicationContext, "no more devices found", Toast.LENGTH_SHORT).show();
            DebugManage.WriteLog2("no more devices found");
            this.mConnectionHandler.onDeviceNotFound();
        }

    }

    private void GetConnInerface(UsbDevice dev) {
        this.m_usbDevice = dev;
        this.m_usbConn = this.mUsbManager.openDevice(dev);
        int n = dev.getInterfaceCount();
        if (n > 0) {
            if (this.m_usbConn.claimInterface(dev.getInterface(0), true)) {
                this.m_usbIf = dev.getInterface(0);
                n = this.m_usbIf.getEndpointCount();
                if (n >= 2) {
                    for (int i = 0; i < n; ++i) {
                        if (this.m_usbIf.getEndpoint(i).getType() == 2) {
                            if (this.m_usbIf.getEndpoint(i).getDirection() == 128) {
                                this.m_epIN = this.m_usbIf.getEndpoint(i);
                            } else {
                                this.m_epOUT = this.m_usbIf.getEndpoint(i);
                            }
                        }
                    }
                    this.m_nEPInSize = this.m_epIN.getMaxPacketSize();
                    this.m_nEPOutSize = this.m_epOUT.getMaxPacketSize();
                    this.m_bInit = true;
                    DebugManage.WriteLog2("device connected");
                    this.mConnectionHandler.onUsbConnected();
                }
            }
        }
    }

    public boolean OperationInternal(byte[] pData, int nDataLen, int nTimeOut, boolean bRead) {
        byte[] w_abyTmp = new byte[31];
        byte[] w_abyCSW = new byte[13];
        Arrays.fill(w_abyTmp, (byte) 0);
        w_abyTmp[0] = 85;
        w_abyTmp[1] = 83;
        w_abyTmp[2] = 66;
        w_abyTmp[3] = 67;
        w_abyTmp[4] = 40;
        w_abyTmp[5] = 43;
        w_abyTmp[6] = 24;
        w_abyTmp[7] = -119;
        w_abyTmp[8] = (byte) (nDataLen & 255);
        w_abyTmp[9] = (byte) (nDataLen >> 8 & 255);
        w_abyTmp[10] = (byte) (nDataLen >> 16 & 255);
        w_abyTmp[11] = (byte) (nDataLen >> 24 & 255);
        if (bRead) {
            w_abyTmp[12] = -128;
        } else {
            w_abyTmp[12] = 0;
        }

        w_abyTmp[13] = 0;
        w_abyTmp[14] = 10;
        w_abyTmp[15] = -17;
        if (bRead) {
            w_abyTmp[16] = -1;
        } else {
            w_abyTmp[16] = -2;
        }

        boolean w_bRet = this.UsbBulkSend(w_abyTmp, 31, nTimeOut);
        if (!w_bRet) {
            return false;
        } else {
            if (bRead) {
                w_bRet = this.UsbBulkReceive(pData, nDataLen, nTimeOut);
            } else {
                w_bRet = this.UsbBulkSend(pData, nDataLen, nTimeOut);
            }

            if (!w_bRet) {
                return false;
            } else {
                w_bRet = this.UsbBulkReceive(w_abyCSW, 13, nTimeOut);
                return w_bRet;
            }
        }
    }

    public boolean UsbSCSIWrite(byte[] pCDB, int nCDBLen, byte[] pData, int nDataLen, int nTimeOut) {
        byte[] w_abyTmp = new byte[31];
        byte[] w_abyCSW = new byte[13];
        w_abyTmp[0] = 85;
        w_abyTmp[1] = 83;
        w_abyTmp[2] = 66;
        w_abyTmp[3] = 67;
        w_abyTmp[4] = 40;
        w_abyTmp[5] = 43;
        w_abyTmp[6] = 24;
        w_abyTmp[7] = -119;
        w_abyTmp[8] = 0;
        w_abyTmp[9] = 0;
        w_abyTmp[10] = 0;
        w_abyTmp[11] = 0;
        w_abyTmp[12] = 0;
        w_abyTmp[13] = 0;
        w_abyTmp[14] = 10;
        System.arraycopy(pCDB, 0, w_abyTmp, 15, nCDBLen);
        boolean w_bRet = this.UsbBulkSend(w_abyTmp, 31, nTimeOut);
        if (!w_bRet) {
            return false;
        } else {
            w_bRet = this.UsbBulkSend(pData, nDataLen, nTimeOut);
            if (!w_bRet) {
                return false;
            } else {
                w_bRet = this.UsbBulkReceive(w_abyCSW, 13, nTimeOut);
                return w_bRet;
            }
        }
    }

    public boolean UsbSCSIRead(byte[] pCDB, int nCDBLen, byte[] pData, int nDataLen, int nTimeOut) {
        byte[] w_abyTmp = new byte[31];
        byte[] w_abyCSW = new byte[13];
        w_abyTmp[0] = 85;
        w_abyTmp[1] = 83;
        w_abyTmp[2] = 66;
        w_abyTmp[3] = 67;
        w_abyTmp[4] = 40;
        w_abyTmp[5] = 43;
        w_abyTmp[6] = 24;
        w_abyTmp[7] = -119;
        w_abyTmp[8] = 0;
        w_abyTmp[9] = 0;
        w_abyTmp[10] = 0;
        w_abyTmp[11] = 0;
        w_abyTmp[12] = -128;
        w_abyTmp[13] = 0;
        w_abyTmp[14] = 10;
        System.arraycopy(pCDB, 0, w_abyTmp, 15, nCDBLen);
        boolean w_bRet = this.UsbBulkSend(w_abyTmp, 31, nTimeOut);
        if (!w_bRet) {
            return false;
        } else {
            long w_nTime = SystemClock.elapsedRealtime();
            w_bRet = this.UsbBulkReceive(pData, nDataLen, nTimeOut);
            w_nTime = SystemClock.elapsedRealtime() - w_nTime;
            if (!w_bRet) {
                return false;
            } else {
                w_bRet = this.UsbBulkReceive(w_abyCSW, 13, nTimeOut);
                return w_bRet;
            }
        }
    }

    private boolean UsbBulkSend(byte[] pBuf, int nLen, int nTimeOut) {
        int n = nLen / this.m_nEPOutSize;
        int r = nLen % this.m_nEPOutSize;

        int i;
        int w_nRet;
        for (i = 0; i < n; ++i) {
            System.arraycopy(pBuf, i * this.m_nEPOutSize, this.m_abyTransferBuf, 0, this.m_nEPOutSize);
            w_nRet = this.m_usbConn.bulkTransfer(this.m_epOUT, this.m_abyTransferBuf, this.m_nEPOutSize, nTimeOut);
            if (w_nRet != this.m_nEPOutSize) {
                return false;
            }
        }

        if (r > 0) {
            System.arraycopy(pBuf, i * this.m_nEPOutSize, this.m_abyTransferBuf, 0, r);
            w_nRet = this.m_usbConn.bulkTransfer(this.m_epOUT, this.m_abyTransferBuf, r, nTimeOut);
            if (w_nRet != r) {
                return false;
            }
        }

        return true;
    }

    private boolean UsbBulkReceive(byte[] pBuf, int nLen, int nTimeOut) {
        int n = nLen / this.m_nEPInSize;
        int r = nLen % this.m_nEPInSize;

        int i;
        int w_nRet;
        for (i = 0; i < n; ++i) {
            w_nRet = this.m_usbConn.bulkTransfer(this.m_epIN, this.m_abyTransferBuf, this.m_nEPInSize, nTimeOut);
            if (w_nRet != this.m_nEPInSize) {
                return false;
            }

            System.arraycopy(this.m_abyTransferBuf, 0, pBuf, i * this.m_nEPInSize, this.m_nEPInSize);
        }

        if (r > 0) {
            w_nRet = this.m_usbConn.bulkTransfer(this.m_epIN, this.m_abyTransferBuf, r, nTimeOut);
            if (w_nRet != r) {
                return false;
            }

            System.arraycopy(this.m_abyTransferBuf, 0, pBuf, i * this.m_nEPInSize, r);
        }

        return true;
    }

    private void l(Object msg) {
        Log.d("USBController", ">==< " + msg.toString() + " >==<");
    }

    private void e(Object msg) {
        Log.e("USBController", ">==< " + msg.toString() + " >==<");
    }

    private interface IPermissionListener {
        void onPermissionDenied(UsbDevice var1);
    }

    private class PermissionReceiver extends BroadcastReceiver {
        private final IPermissionListener mPermissionListener;

        public PermissionReceiver(IPermissionListener permissionListener) {
            this.mPermissionListener = permissionListener;
        }

        public void onReceive(Context context, Intent intent) {
            UsbController.this.mApplicationContext.unregisterReceiver(this);
            if (intent.getAction().equals("ch.serverbox.android.USB")) {
                if (!intent.getBooleanExtra("permission", false)) {
                    this.mPermissionListener.onPermissionDenied((UsbDevice) intent.getParcelableExtra("device"));
                    UsbController.this.mConnectionHandler.onUsbPermissionDenied();
                } else {
                    UsbController.this.l("Permission granted");
                    UsbDevice dev = (UsbDevice) intent.getParcelableExtra("device");
                    if (dev != null) {
                        if (dev.getVendorId() == UsbController.this.VID && dev.getProductId() == UsbController.this.PID) {
                            UsbController.this.GetConnInerface(dev);
                        }
                    } else {
                        DebugManage.WriteLog2("device not present!");
                        UsbController.this.mConnectionHandler.onDeviceNotFound();
                    }
                }
            }

        }
    }
}

