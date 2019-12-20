package com.aitablet.fp_core;

import android.content.Context;
import android.os.SystemClock;

import java.util.Arrays;

/**
 * Created by Hfengxiang
 * on 2019/12/9
 */
public class DevComm {
    public static final int GD_RECORD_SIZE = 498;
    public static final int GD_MAX_RECORD_COUNT = 2000;
    public static final int ID_NOTE_SIZE = 64;
    public static final int MODULE_SN_LEN = 16;
    private static final int SCSI_TIMEOUT = 5000;
    private static final int COMM_SLEEP_TIME = 40;
    private static final int CMD_PACKET_LEN = 26;
    private static final int RCM_PACKET_LEN = 26;
    private static final int RCM_DATA_OFFSET = 10;
    private static final int CMD_PREFIX_CODE = 43605;
    private static final int CMD_DATA_PREFIX_CODE = 42330;
    private static final int RCM_PREFIX_CODE = 21930;
    private static final int RCM_DATA_PREFIX_CODE = 23205;
    private static final short CMD_TEST_CONNECTION = 1;
    private static final short CMD_SET_PARAM = 2;
    private static final short CMD_GET_PARAM = 3;
    private static final short CMD_GET_DEVICE_INFO = 4;
    private static final short CMD_ENTER_ISPMODE = 5;
    private static final short CMD_SET_ID_NOTE = 6;
    private static final short CMD_GET_ID_NOTE = 7;
    private static final short CMD_SET_MODULE_SN = 8;
    private static final short CMD_GET_MODULE_SN = 9;
    private static final short CMD_GET_IMAGE = 32;
    private static final short CMD_FINGER_DETECT = 33;
    private static final short CMD_UP_IMAGE = 34;
    private static final short CMD_DOWN_IMAGE = 35;
    private static final short CMD_SLED_CTRL = 36;
    private static final short CMD_STORE_CHAR = 64;
    private static final short CMD_LOAD_CHAR = 65;
    private static final short CMD_UP_CHAR = 66;
    private static final short CMD_DOWN_CHAR = 67;
    private static final short CMD_DEL_CHAR = 68;
    private static final short CMD_GET_EMPTY_ID = 69;
    private static final short CMD_GET_STATUS = 70;
    private static final short CMD_GET_BROKEN_ID = 71;
    private static final short CMD_GET_ENROLL_COUNT = 72;
    private static final short CMD_GENERATE = 96;
    private static final short CMD_MERGE = 97;
    private static final short CMD_MATCH = 98;
    private static final short CMD_SEARCH = 99;
    private static final short CMD_VERIFY = 100;
    private static final short RCM_INCORRECT_COMMAND = 255;
    public static final int ERR_SUCCESS = 0;
    public static final int ERR_FAIL = 1;
    public static final int ERR_CONNECTION = 2;
    public static final int ERR_VERIFY = 16;
    public static final int ERR_IDENTIFY = 17;
    public static final int ERR_TMPL_EMPTY = 18;
    public static final int ERR_TMPL_NOT_EMPTY = 19;
    public static final int ERR_ALL_TMPL_EMPTY = 20;
    public static final int ERR_EMPTY_ID_NOEXIST = 21;
    public static final int ERR_BROKEN_ID_NOEXIST = 22;
    public static final int ERR_INVALID_TMPL_DATA = 23;
    public static final int ERR_DUPLICATION_ID = 24;
    public static final int ERR_BAD_QUALITY = 25;
    public static final int ERR_MERGE_FAIL = 26;
    public static final int ERR_NOT_AUTHORIZED = 27;
    public static final int ERR_MEMORY = 28;
    public static final int ERR_INVALID_TMPL_NO = 29;
    public static final int ERR_INVALID_PARAM = 34;
    public static final int ERR_GEN_COUNT = 37;
    public static final int ERR_INVALID_BUFFER_ID = 38;
    public static final int ERR_INVALID_OPERATION_MODE = 39;
    public static final int ERR_FP_NOT_DETECTED = 40;
    public static final int DP_DEVICE_ID = 0;
    public static final int DP_SECURITY_LEVEL = 1;
    public static final int DP_DUP_CHECK = 2;
    public static final int DP_BAUDRATE = 3;
    public static final int DP_AUTO_LEARN = 4;
    public static final int MIN_DEVICE_ID = 1;
    public static final int MAX_DEVICE_ID = 255;
    public static final int MIN_SECURITY_LEVEL = 1;
    public static final int MAX_SECURITY_LEVEL = 5;
    public static final int GD_TEMPLATE_NOT_EMPTY = 1;
    public static final int GD_TEMPLATE_EMPTY = 0;
    public int m_nPacketSize;
    public byte m_bySrcDeviceID = 1;
    public byte m_byDstDeviceID = 1;
    public byte[] m_abyPacket = new byte[65536];
    public byte[] m_abyPacket2 = new byte[65536];
    private final Context mApplicationContext;
    private static final int VID = 8201;
    private static final int PID = 30264;
    private UsbController m_usbBase;

    public DevComm(Context context, IUsbConnState usbConnState) {
        DebugManage.DeleteLog();
        this.mApplicationContext = context.getApplicationContext();
        this.m_usbBase = new UsbController(context, usbConnState, 8201, 30264);
    }

    public boolean IsInit() {
        return this.m_usbBase.IsInit();
    }

    public boolean OpenComm() {
        this.m_usbBase.init();
        return true;
    }

    public boolean CloseComm() {
        this.m_usbBase.uninit();
        return true;
    }

    int Run_TestConnection() {
        this.InitCmdPacket((short)1, this.m_bySrcDeviceID, this.m_byDstDeviceID, this.m_abyPacket2, 0);
        boolean w_bRet = this.USB_SendPacket((short)1);
        return !w_bRet ? 2 : this.GetRetCode();
    }

    int Run_SetParam(int p_nParamIndex, int p_nParamValue) {
        byte[] w_abyData = new byte[]{(byte)p_nParamIndex, (byte)(p_nParamValue & 255), (byte)((p_nParamValue & '\uff00') >> 8), (byte)((p_nParamValue & 16711680) >> 16), (byte)((p_nParamValue & -16777216) >> 24)};
        this.InitCmdPacket((short)2, this.m_bySrcDeviceID, this.m_byDstDeviceID, w_abyData, 5);
        boolean w_bRet = this.USB_SendPacket((short)2);
        return !w_bRet ? 2 : this.GetRetCode();
    }

    int Run_GetParam(int p_nParamIndex, int[] p_pnParamValue) {
        byte[] w_abyData = new byte[]{(byte)p_nParamIndex};
        this.InitCmdPacket((short)3, this.m_bySrcDeviceID, this.m_byDstDeviceID, w_abyData, 1);
        boolean w_bRet = this.USB_SendPacket((short)3);
        if (!w_bRet) {
            return 2;
        } else if (this.GetRetCode() != 0) {
            return this.GetRetCode();
        } else {
            p_pnParamValue[0] = this.m_abyPacket[13] << 24 & -16777216 | this.m_abyPacket[12] << 16 & 16711680 | this.m_abyPacket[11] << 8 & '\uff00' | this.m_abyPacket[10] & 255;
            return 0;
        }
    }

    int Run_GetDeviceInfo(String[] p_szDevInfo) {
        this.InitCmdPacket((short)4, this.m_bySrcDeviceID, this.m_byDstDeviceID, this.m_abyPacket2, 0);
        boolean w_bRet = this.USB_SendPacket((short)4);
        if (!w_bRet) {
            return 2;
        } else if (this.GetRetCode() != 0) {
            return this.GetRetCode();
        } else {
            int w_nDevInfoLen = this.MAKEWORD(this.m_abyPacket[10], this.m_abyPacket[11]);
            w_bRet = this.USB_ReceiveDataPacket((short)4);
            if (!w_bRet) {
                return 2;
            } else if (this.GetRetCode() != 0) {
                return this.GetRetCode();
            } else {
                this.memset(this.m_abyPacket2, (byte)0, 512);
                System.arraycopy(this.m_abyPacket, 10, this.m_abyPacket2, 0, w_nDevInfoLen);
                String w_strTmp = new String(this.m_abyPacket2);
                p_szDevInfo[0] = w_strTmp;
                return 0;
            }
        }
    }

    int Run_SetIDNote(int p_nTmplNo, String p_pstrNote) {
        boolean w_bRet = false;
        byte[] w_abyData = new byte[66];
        byte[] w_abyData2 = new byte[2];
        byte[] w_abyNoteBuf = p_pstrNote.getBytes();
        w_abyData2[0] = this.LOBYTE((short)66);
        w_abyData2[1] = this.HIBYTE((short)66);
        this.InitCmdPacket((short)6, this.m_bySrcDeviceID, this.m_byDstDeviceID, w_abyData2, 2);
        w_bRet = this.USB_SendPacket((short)6);
        if (!w_bRet) {
            return 2;
        } else if (this.GetRetCode() != 0) {
            return this.GetRetCode();
        } else {
            this.memset(w_abyData, (byte)0, 66);
            w_abyData[0] = this.LOBYTE((short)p_nTmplNo);
            w_abyData[1] = this.HIBYTE((short)p_nTmplNo);
            System.arraycopy(w_abyNoteBuf, 0, w_abyData, 2, w_abyNoteBuf.length);
            this.InitCmdDataPacket((short)6, this.m_bySrcDeviceID, this.m_byDstDeviceID, w_abyData, 66);
            w_bRet = this.USB_SendDataPacket((short)6);
            return !w_bRet ? 2 : this.GetRetCode();
        }
    }

    int Run_GetIDNote(int p_nTmplNo, String[] p_pstrNote) {
        boolean w_bRet = false;
        byte[] w_abyData = new byte[]{this.LOBYTE((short)p_nTmplNo), this.HIBYTE((short)p_nTmplNo)};
        this.InitCmdPacket((short)7, this.m_bySrcDeviceID, this.m_byDstDeviceID, w_abyData, 2);
        w_bRet = this.USB_SendPacket((short)7);
        if (!w_bRet) {
            return 2;
        } else if (this.GetRetCode() != 0) {
            return this.GetRetCode();
        } else {
            w_bRet = this.USB_ReceiveDataPacket((short)7);
            if (!w_bRet) {
                return 2;
            } else if (this.GetRetCode() != 0) {
                return this.GetRetCode();
            } else {
                this.memset(this.m_abyPacket2, (byte)0, 512);
                System.arraycopy(this.m_abyPacket, 10, this.m_abyPacket2, 0, 64);
                String w_strTmp = new String(this.m_abyPacket2);
                p_pstrNote[0] = w_strTmp;
                return 0;
            }
        }
    }

    int Run_SetModuleSN(String p_pstrModuleSN) {
        boolean w_bRet = false;
        byte[] w_abyData = p_pstrModuleSN.getBytes();
        byte[] w_abyModuleSN = new byte[16];
        byte[] w_abyData2 = new byte[2];
        this.memset(w_abyModuleSN, (byte)0, 16);
        System.arraycopy(w_abyData, 0, w_abyModuleSN, 0, w_abyData.length);
        w_abyData2[0] = this.LOBYTE((short)16);
        w_abyData2[1] = this.HIBYTE((short)16);
        this.InitCmdPacket((short)8, this.m_bySrcDeviceID, this.m_byDstDeviceID, w_abyData2, 2);
        w_bRet = this.USB_SendPacket((short)8);
        if (!w_bRet) {
            return 2;
        } else if (this.GetRetCode() != 0) {
            return this.GetRetCode();
        } else {
            this.InitCmdDataPacket((short)8, this.m_bySrcDeviceID, this.m_byDstDeviceID, w_abyModuleSN, 16);
            w_bRet = this.USB_SendDataPacket((short)8);
            return !w_bRet ? 2 : this.GetRetCode();
        }
    }

    int Run_GetModuleSN(String[] p_pstrModuleSN) {
        boolean w_bRet = false;
        this.InitCmdPacket((short)9, this.m_bySrcDeviceID, this.m_byDstDeviceID, this.m_abyPacket2, 0);
        w_bRet = this.USB_SendPacket((short)9);
        if (!w_bRet) {
            return 2;
        } else if (this.GetRetCode() != 0) {
            return this.GetRetCode();
        } else {
            w_bRet = this.USB_ReceiveDataPacket((short)9);
            if (!w_bRet) {
                return 2;
            } else if (this.GetRetCode() != 0) {
                return this.GetRetCode();
            } else {
                this.memset(this.m_abyPacket2, (byte)0, 512);
                System.arraycopy(this.m_abyPacket, 10, this.m_abyPacket2, 0, 16);
                String w_strTmp = new String(this.m_abyPacket2);
                p_pstrModuleSN[0] = w_strTmp;
                return 0;
            }
        }
    }
    /**
     * 手指按下指纹识别区获取指纹数据
     * */
    int Run_GetImage() {
        this.InitCmdPacket((short)32, this.m_bySrcDeviceID, this.m_byDstDeviceID, this.m_abyPacket2, 0);
        boolean w_bRet = this.USB_SendPacket((short)32);
        return !w_bRet ? 2 : this.GetRetCode();
    }

    int Run_FingerDetect(int[] p_pnDetectResult) {
        this.InitCmdPacket((short)33, this.m_bySrcDeviceID, this.m_byDstDeviceID, this.m_abyPacket2, 0);
        boolean w_bRet = this.USB_SendPacket((short)33);
        if (!w_bRet) {
            return 2;
        } else if (this.GetRetCode() != 0) {
            return this.GetRetCode();
        } else {
            p_pnDetectResult[0] = this.m_abyPacket[10];
            return 0;
        }
    }

    int Run_UpImage(int p_nType, byte[] p_pFpData, int[] p_pnImgWidth, int[] p_pnImgHeight) {
        byte[] w_abyData = new byte[]{(byte)p_nType};
        this.InitCmdPacket((short)34, this.m_bySrcDeviceID, this.m_byDstDeviceID, w_abyData, 1);
        boolean w_bRet = this.USB_SendPacket((short)34);
        if (!w_bRet) {
            return 2;
        } else if (this.GetRetCode() != 0) {
            return this.GetRetCode();
        } else {
            int w = this.MAKEWORD(this.m_abyPacket[10], this.m_abyPacket[11]);
            int h = this.MAKEWORD(this.m_abyPacket[12], this.m_abyPacket[13]);
            w_bRet = this.USB_ReceiveImage(p_pFpData, w * h);
            if (!w_bRet) {
                return 2;
            } else {
                p_pnImgWidth[0] = w;
                p_pnImgHeight[0] = h;
                return 0;
            }
        }
    }

    int Run_DownImage(byte[] p_pData, int p_nWidth, int p_nHeight) {
        return 0;
    }
    /**
     * 控制LED闪烁
     * */
    int Run_SLEDControl(int p_nState) {
        byte[] w_abyData = new byte[]{this.LOBYTE((short)p_nState), this.HIBYTE((short)p_nState)};
        this.InitCmdPacket((short)36, this.m_bySrcDeviceID, this.m_byDstDeviceID, w_abyData, 2);
        boolean w_bRet = this.USB_SendPacket((short)36);
        return !w_bRet ? 2 : this.GetRetCode();
    }

    int Run_StoreChar(int p_nTmplNo, int p_nRamBufferID, int[] p_pnDupTmplNo) {
        byte[] w_abyData = new byte[]{this.LOBYTE((short)p_nTmplNo), this.HIBYTE((short)p_nTmplNo), this.LOBYTE((short)p_nRamBufferID), this.HIBYTE((short)p_nRamBufferID)};
        this.InitCmdPacket((short)64, this.m_bySrcDeviceID, this.m_byDstDeviceID, w_abyData, 4);
        boolean w_bRet = this.USB_SendPacket((short)64);
        if (!w_bRet) {
            return 2;
        } else if (this.GetRetCode() != 0) {
            if (this.GetRetCode() == 24) {
                p_pnDupTmplNo[0] = this.MAKEWORD(this.m_abyPacket[10], this.m_abyPacket[11]);
            }

            return this.GetRetCode();
        } else {
            return this.GetRetCode();
        }
    }

    int Run_LoadChar(int p_nTmplNo, int p_nRamBufferID) {
        byte[] w_abyData = new byte[]{this.LOBYTE((short)p_nTmplNo), this.HIBYTE((short)p_nTmplNo), this.LOBYTE((short)p_nRamBufferID), this.HIBYTE((short)p_nRamBufferID)};
        this.InitCmdPacket((short)65, this.m_bySrcDeviceID, this.m_byDstDeviceID, w_abyData, 4);
        boolean w_bRet = this.USB_SendPacket((short)65);
        return !w_bRet ? 2 : this.GetRetCode();
    }

    int Run_UpChar(int p_nRamBufferID, byte[] p_pbyTemplate) {
        boolean w_bRet = false;
        byte[] w_abyData = new byte[]{this.LOBYTE((short)p_nRamBufferID), this.HIBYTE((short)p_nRamBufferID)};
        this.InitCmdPacket((short)66, this.m_bySrcDeviceID, this.m_byDstDeviceID, w_abyData, 2);
        w_bRet = this.USB_SendPacket((short)66);
        if (!w_bRet) {
            return 2;
        } else if (this.GetRetCode() != 0) {
            return this.GetRetCode();
        } else {
            w_bRet = this.USB_ReceiveDataPacket((short)66);
            if (!w_bRet) {
                return 2;
            } else if (this.GetRetCode() != 0) {
                return this.GetRetCode();
            } else {
                System.arraycopy(this.m_abyPacket, 10, p_pbyTemplate, 0, 498);
                return 0;
            }
        }
    }

    int Run_DownChar(int p_nRamBufferID, byte[] p_pbyTemplate) {
        boolean w_bRet = false;
        byte[] w_abyData = new byte[500];
        byte[] w_abyData2 = new byte[]{this.LOBYTE((short)500), this.HIBYTE((short)500)};
        this.InitCmdPacket((short)67, this.m_bySrcDeviceID, this.m_byDstDeviceID, w_abyData2, 2);
        w_bRet = this.USB_SendPacket((short)67);
        if (!w_bRet) {
            return 2;
        } else if (this.GetRetCode() != 0) {
            return this.GetRetCode();
        } else {
            w_abyData[0] = this.LOBYTE((short)p_nRamBufferID);
            w_abyData[1] = this.HIBYTE((short)p_nRamBufferID);
            System.arraycopy(p_pbyTemplate, 0, w_abyData, 2, 498);
            this.InitCmdDataPacket((short)67, this.m_bySrcDeviceID, this.m_byDstDeviceID, w_abyData, 500);
            w_bRet = this.USB_SendDataPacket((short)67);
            return !w_bRet ? 2 : this.GetRetCode();
        }
    }

    int Run_DelChar(int p_nSTmplNo, int p_nETmplNo) {
        byte[] w_abyData = new byte[]{this.LOBYTE((short)p_nSTmplNo), this.HIBYTE((short)p_nSTmplNo), this.LOBYTE((short)p_nETmplNo), this.HIBYTE((short)p_nETmplNo)};
        this.InitCmdPacket((short)68, this.m_bySrcDeviceID, this.m_byDstDeviceID, w_abyData, 4);
        boolean w_bRet = this.USB_SendPacket((short)68);
        return !w_bRet ? 2 : this.GetRetCode();
    }

    int Run_GetEmptyID(int p_nSTmplNo, int p_nETmplNo, int[] p_pnEmptyID) {
        byte[] w_abyData = new byte[]{this.LOBYTE((short)p_nSTmplNo), this.HIBYTE((short)p_nSTmplNo), this.LOBYTE((short)p_nETmplNo), this.HIBYTE((short)p_nETmplNo)};
        this.InitCmdPacket((short)69, this.m_bySrcDeviceID, this.m_byDstDeviceID, w_abyData, 4);
        boolean w_bRet = this.USB_SendPacket((short)69);
        if (!w_bRet) {
            return 2;
        } else if (this.GetRetCode() != 0) {
            return this.GetRetCode();
        } else {
            p_pnEmptyID[0] = this.MAKEWORD(this.m_abyPacket[10], this.m_abyPacket[11]);
            return 0;
        }
    }

    int Run_GetStatus(int p_nTmplNo, int[] p_pnStatus) {
        byte[] w_abyData = new byte[]{this.LOBYTE((short)p_nTmplNo), this.HIBYTE((short)p_nTmplNo)};
        this.InitCmdPacket((short)70, this.m_bySrcDeviceID, this.m_byDstDeviceID, w_abyData, 2);
        boolean w_bRet = this.USB_SendPacket((short)70);
        if (!w_bRet) {
            return 2;
        } else if (this.GetRetCode() != 0) {
            return this.GetRetCode();
        } else {
            p_pnStatus[0] = this.m_abyPacket[10];
            return 0;
        }
    }

    int Run_GetBrokenID(int p_nSTmplNo, int p_nETmplNo, int[] p_pnCount, int[] p_pnFirstID) {
        byte[] w_abyData = new byte[]{this.LOBYTE((short)p_nSTmplNo), this.HIBYTE((short)p_nSTmplNo), this.LOBYTE((short)p_nETmplNo), this.HIBYTE((short)p_nETmplNo)};
        this.InitCmdPacket((short)71, this.m_bySrcDeviceID, this.m_byDstDeviceID, w_abyData, 4);
        boolean w_bRet = this.USB_SendPacket((short)71);
        if (!w_bRet) {
            return 2;
        } else if (this.GetRetCode() != 0) {
            return this.GetRetCode();
        } else {
            p_pnCount[0] = this.MAKEWORD(this.m_abyPacket[10], this.m_abyPacket[11]);
            p_pnFirstID[0] = this.MAKEWORD(this.m_abyPacket[12], this.m_abyPacket[13]);
            return 0;
        }
    }

    int Run_GetEnrollCount(int p_nSTmplNo, int p_nETmplNo, int[] p_pnEnrollCount) {
        byte[] w_abyData = new byte[]{this.LOBYTE((short)p_nSTmplNo), this.HIBYTE((short)p_nSTmplNo), this.LOBYTE((short)p_nETmplNo), this.HIBYTE((short)p_nETmplNo)};
        this.InitCmdPacket((short)72, this.m_bySrcDeviceID, this.m_byDstDeviceID, w_abyData, 4);
        boolean w_bRet = this.USB_SendPacket((short)72);
        if (!w_bRet) {
            return 2;
        } else if (this.GetRetCode() != 0) {
            return this.GetRetCode();
        } else {
            p_pnEnrollCount[0] = this.MAKEWORD(this.m_abyPacket[10], this.m_abyPacket[11]);
            return 0;
        }
    }

    int Run_Generate(int p_nRamBufferID) {
        byte[] w_abyData = new byte[]{this.LOBYTE((short)p_nRamBufferID), this.HIBYTE((short)p_nRamBufferID)};
        this.InitCmdPacket((short)96, this.m_bySrcDeviceID, this.m_byDstDeviceID, w_abyData, 2);
        boolean w_bRet = this.USB_SendPacket((short)96);
        return !w_bRet ? 2 : this.GetRetCode();
    }

    int Run_Merge(int p_nRamBufferID, int p_nMergeCount) {
        byte[] w_abyData = new byte[]{this.LOBYTE((short)p_nRamBufferID), this.HIBYTE((short)p_nRamBufferID), (byte)p_nMergeCount};
        this.InitCmdPacket((short)97, this.m_bySrcDeviceID, this.m_byDstDeviceID, w_abyData, 3);
        boolean w_bRet = this.USB_SendPacket((short)97);
        return !w_bRet ? 2 : this.GetRetCode();
    }

    int Run_Match(int p_nRamBufferID0, int p_nRamBufferID1) {
        byte[] w_abyData = new byte[]{this.LOBYTE((short)p_nRamBufferID0), this.HIBYTE((short)p_nRamBufferID0), this.LOBYTE((short)p_nRamBufferID1), this.HIBYTE((short)p_nRamBufferID1)};
        this.InitCmdPacket((short)98, this.m_bySrcDeviceID, this.m_byDstDeviceID, w_abyData, 4);
        boolean w_bRet = this.USB_SendPacket((short)98);
        return !w_bRet ? 2 : this.GetRetCode();
    }

    int Run_Search(int p_nRamBufferID, int p_nStartID, int p_nSearchCount, int[] p_pnTmplNo, int[] p_pnLearnResult) {
        byte[] w_abyData = new byte[]{this.LOBYTE((short)p_nRamBufferID), this.HIBYTE((short)p_nRamBufferID), this.LOBYTE((short)p_nStartID), this.HIBYTE((short)p_nStartID), this.LOBYTE((short)p_nSearchCount), this.HIBYTE((short)p_nSearchCount)};
        this.InitCmdPacket((short)99, this.m_bySrcDeviceID, this.m_byDstDeviceID, w_abyData, 6);
        boolean w_bRet = this.USB_SendPacket((short)99);
        if (!w_bRet) {
            return 2;
        } else if (this.GetRetCode() != 0) {
            return this.GetRetCode();
        } else {
            p_pnTmplNo[0] = this.MAKEWORD(this.m_abyPacket[10], this.m_abyPacket[11]);
            p_pnLearnResult[0] = this.m_abyPacket[12];
            return this.GetRetCode();
        }
    }

    int Run_Verify(int p_nTmplNo, int p_nRamBufferID, int[] p_pnLearnResult) {
        byte[] w_abyData = new byte[]{this.LOBYTE((short)p_nTmplNo), this.HIBYTE((short)p_nTmplNo), this.LOBYTE((short)p_nRamBufferID), this.HIBYTE((short)p_nRamBufferID)};
        this.InitCmdPacket((short)100, this.m_bySrcDeviceID, this.m_byDstDeviceID, w_abyData, 4);
        boolean w_bRet = this.USB_SendPacket((short)100);
        if (!w_bRet) {
            return 2;
        } else {
            p_pnLearnResult[0] = this.m_abyPacket[12];
            return this.GetRetCode();
        }
    }

    public boolean GetDeviceInformation(String[] deviceInfo) {
        int[] w_nRecvLen = new int[1];
        byte[] w_abyPCCmd = new byte[6];
        byte[] w_abyData = new byte[32];
        Arrays.fill(w_abyPCCmd, (byte)0);
        w_abyPCCmd[2] = 4;
        boolean w_bRet = this.SendPackage(w_abyPCCmd, w_abyData);
        if (!w_bRet) {
            return false;
        } else {
            w_bRet = this.RecvPackage(w_abyData, w_nRecvLen);
            if (!w_bRet) {
                return false;
            } else {
                String w_strTmp = new String(w_abyData);
                deviceInfo[0] = w_strTmp;
                return true;
            }
        }
    }

    private boolean SendPackage(byte[] pPCCmd, byte[] pData) {
        pPCCmd[0] = -17;
        pPCCmd[1] = 1;
        int nDataLen = pPCCmd[5] << 8 & '\uff00' | pPCCmd[4] & 255;
        return this.m_usbBase.UsbSCSIWrite(pPCCmd, 6, pData, nDataLen, 5000);
    }

    private boolean RecvPackage(byte[] pData, int[] pLevRen) {
        byte[] w_abyPCCmd = new byte[6];
        byte[] w_abyRespond = new byte[4];
        w_abyPCCmd[0] = -17;
        w_abyPCCmd[1] = 2;
        w_abyPCCmd[2] = 0;
        w_abyPCCmd[3] = 0;
        w_abyPCCmd[4] = 0;
        w_abyPCCmd[5] = 0;
        boolean w_bRet = this.m_usbBase.UsbSCSIRead(w_abyPCCmd, 6, w_abyRespond, 4, 5000);
        if (!w_bRet) {
            return false;
        } else {
            int w_nLen = w_abyRespond[3] << 8 & '\uff00' | w_abyRespond[2] & 255;
            if (w_nLen > 0) {
                w_abyPCCmd[1] = 3;
                w_bRet = this.m_usbBase.UsbSCSIRead(w_abyPCCmd, 6, pData, w_nLen, 5000);
                if (!w_bRet) {
                    return false;
                }

                pLevRen[0] = w_nLen;
            }

            return true;
        }
    }

    private short GetRetCode() {
        return (short)(this.m_abyPacket[9] << 8 & '\uff00' | this.m_abyPacket[8] & 255);
    }

    private short CalcChkSumOfPkt(byte[] pDataPkt, int nSize) {
        int nChkSum = 0;

        for(int i = 0; i < nSize; ++i) {
            if (pDataPkt[i] < 0) {
                nChkSum += pDataPkt[i] + 256;
            } else {
                nChkSum += pDataPkt[i];
            }
        }

        return (short)nChkSum;
    }

    void InitCmdPacket(short wCMDCode, byte bySrcDeviceID, byte byDstDeviceID, byte[] pbyData, int nDataLen) {
        this.memset(this.m_abyPacket, (byte)0, 26);
        this.m_abyPacket[0] = 85;
        this.m_abyPacket[1] = -86;
        this.m_abyPacket[2] = bySrcDeviceID;
        this.m_abyPacket[3] = byDstDeviceID;
        this.m_abyPacket[4] = (byte)(wCMDCode & 255);
        this.m_abyPacket[5] = (byte)(wCMDCode >> 8 & 255);
        this.m_abyPacket[6] = (byte)(nDataLen & 255);
        this.m_abyPacket[7] = (byte)(nDataLen >> 8 & 255);
        if (nDataLen > 0) {
            System.arraycopy(pbyData, 0, this.m_abyPacket, 8, nDataLen);
        }

        short w_wCheckSum = this.CalcChkSumOfPkt(this.m_abyPacket, 24);
        this.m_abyPacket[24] = (byte)(w_wCheckSum & 255);
        this.m_abyPacket[25] = (byte)(w_wCheckSum >> 8 & 255);
        this.m_nPacketSize = 26;
    }

    void InitCmdDataPacket(short wCMDCode, byte bySrcDeviceID, byte byDstDeviceID, byte[] pbyData, int nDataLen) {
        this.m_abyPacket[0] = 90;
        this.m_abyPacket[1] = -91;
        this.m_abyPacket[2] = bySrcDeviceID;
        this.m_abyPacket[3] = byDstDeviceID;
        this.m_abyPacket[4] = (byte)(wCMDCode & 255);
        this.m_abyPacket[5] = (byte)(wCMDCode >> 8 & 255);
        this.m_abyPacket[6] = (byte)(nDataLen & 255);
        this.m_abyPacket[7] = (byte)(nDataLen >> 8 & 255);
        System.arraycopy(pbyData, 0, this.m_abyPacket, 8, nDataLen);
        short w_wCheckSum = this.CalcChkSumOfPkt(this.m_abyPacket, nDataLen + 8);
        this.m_abyPacket[nDataLen + 8] = (byte)(w_wCheckSum & 255);
        this.m_abyPacket[nDataLen + 9] = (byte)(w_wCheckSum >> 8 & 255);
        this.m_nPacketSize = nDataLen + 10;
    }

    boolean CheckReceive(byte[] pbyPacket, int nPacketLen, short wPrefix, short wCMDCode) {
        short w_wTmp = (short)(pbyPacket[1] << 8 & '\uff00' | pbyPacket[0] & 255);
        if (wPrefix != w_wTmp) {
            return false;
        } else {
            short w_wCheckSum = (short)(pbyPacket[nPacketLen - 1] << 8 & '\uff00' | pbyPacket[nPacketLen - 2] & 255);
            short w_wCalcCheckSum = this.CalcChkSumOfPkt(pbyPacket, nPacketLen - 2);
            if (w_wCheckSum != w_wCalcCheckSum) {
                return false;
            } else {
                w_wTmp = (short)(pbyPacket[5] << 8 & '\uff00' | pbyPacket[4] & 255);
                return wCMDCode == w_wTmp;
            }
        }
    }

    private boolean USB_SendPacket(short wCMD) {
        byte[] btCDB = new byte[8];
        Arrays.fill(btCDB, (byte)0);
        btCDB[0] = -17;
        btCDB[1] = 17;
        btCDB[4] = (byte)this.m_nPacketSize;
        boolean w_bRet = this.m_usbBase.UsbSCSIWrite(btCDB, 8, this.m_abyPacket, this.m_nPacketSize, 5000);
        return !w_bRet ? false : this.USB_ReceiveAck(wCMD);
    }

    private boolean USB_ReceiveAck(short wCMD) {
        boolean w_nReadCount = false;
        byte[] btCDB = new byte[8];
        byte[] w_abyWaitPacket = new byte[26];
        Arrays.fill(btCDB, (byte)0);
        int c = 0;
        Arrays.fill(w_abyWaitPacket, (byte)-81);

        byte w_nLen;
        do {
            Arrays.fill(this.m_abyPacket, (byte)0);
            btCDB[0] = -17;
            btCDB[1] = 18;
            w_nLen = 26;
            if (!this.m_usbBase.UsbSCSIRead(btCDB, 8, this.m_abyPacket, w_nLen, 5000)) {
                return false;
            }

            SystemClock.sleep(40L);
            ++c;
        } while(this.memcmp(this.m_abyPacket, w_abyWaitPacket, 26));

        this.m_nPacketSize = w_nLen;
        if (!this.CheckReceive(this.m_abyPacket, this.m_nPacketSize, (short)21930, wCMD)) {
            return false;
        } else {
            return true;
        }
    }

    boolean USB_ReceiveDataAck(short wCMD) {
        byte[] btCDB = new byte[8];
        byte[] w_WaitPacket = new byte[10];
        this.memset(btCDB, (byte)0, 8);
        this.memset(w_WaitPacket, (byte)-81, 10);

        do {
            btCDB[0] = -17;
            btCDB[1] = 21;
            int w_nLen = 8;
            if (!this.m_usbBase.UsbSCSIRead(btCDB, 8, this.m_abyPacket, w_nLen, 5000)) {
                return false;
            }

            SystemClock.sleep(40L);
        } while(this.memcmp(this.m_abyPacket, w_WaitPacket, 8));

        int w_nLen = (short)(this.m_abyPacket[7] << 8 & '\uff00' | this.m_abyPacket[6] & 255) + 2;
        if (!this.USB_ReceiveRawData(this.m_abyPacket2, w_nLen)) {
            return false;
        } else {
            System.arraycopy(this.m_abyPacket2, 0, this.m_abyPacket, 8, w_nLen);
            this.m_nPacketSize = 8 + w_nLen;
            if (!this.CheckReceive(this.m_abyPacket, this.m_nPacketSize, (short)23205, wCMD)) {
                return false;
            } else {
                return true;
            }
        }
    }

    boolean USB_SendDataPacket(short wCMD) {
        byte[] btCDB = new byte[8];
        this.memset(btCDB, (byte)0, 8);
        btCDB[0] = -17;
        btCDB[1] = 19;
        btCDB[4] = (byte)(this.m_nPacketSize & 255);
        btCDB[5] = (byte)(this.m_nPacketSize >> 8 & 255);
        return !this.m_usbBase.UsbSCSIWrite(btCDB, 8, this.m_abyPacket, this.m_nPacketSize, 5000) ? false : this.USB_ReceiveDataAck(wCMD);
    }

    boolean USB_ReceiveDataPacket(short wCMD) {
        return this.USB_ReceiveDataAck(wCMD);
    }

    boolean USB_ReceiveRawData(byte[] pBuffer, int nDataLen) {
        byte[] btCDB = new byte[8];
        this.memset(btCDB, (byte)0, 8);
        btCDB[0] = -17;
        btCDB[1] = 20;
        return this.m_usbBase.UsbSCSIRead(btCDB, 8, pBuffer, nDataLen, 5000);
    }

    boolean USB_ReceiveImage(byte[] p_pBuffer, int nDataLen) {
        byte[] btCDB = new byte[8];
        byte[] w_WaitPacket = new byte[8];
        this.memset(btCDB, (byte)0, 8);
        this.memset(w_WaitPacket, (byte)-81, 8);
        if (nDataLen < 65536) {
            btCDB[0] = -17;
            btCDB[1] = 22;
            if (!this.m_usbBase.UsbSCSIRead(btCDB, 8, p_pBuffer, nDataLen, 5000)) {
                return false;
            }
        } else if (nDataLen == 73728) {
            btCDB[0] = -17;
            btCDB[1] = 22;
            btCDB[2] = 0;
            if (!this.m_usbBase.UsbSCSIRead(btCDB, 8, p_pBuffer, nDataLen / 2, 5000)) {
                return false;
            }

            btCDB[0] = -17;
            btCDB[1] = 22;
            btCDB[2] = 1;
            if (!this.m_usbBase.UsbSCSIRead(btCDB, 8, this.m_abyPacket2, nDataLen / 2, 5000)) {
                return false;
            }

            System.arraycopy(this.m_abyPacket2, 0, p_pBuffer, nDataLen / 2, nDataLen / 2);
        }

        return true;
    }

    private boolean memcmp(byte[] p1, byte[] p2, int nLen) {
        for(int i = 0; i < nLen; ++i) {
            if (p1[i] != p2[i]) {
                return false;
            }
        }

        return true;
    }

    private void memset(byte[] p1, byte nValue, int nLen) {
        Arrays.fill(p1, 0, nLen, nValue);
    }

    private void memcpy(byte[] p1, byte nValue, int nLen) {
        Arrays.fill(p1, 0, nLen, nValue);
    }

    private short MAKEWORD(byte low, byte high) {
        short s = (short)(high << 8 & '\uff00' | low & 255);
        return s;
    }

    private byte LOBYTE(short s) {
        return (byte)(s & 255);
    }

    private byte HIBYTE(short s) {
        return (byte)(s >> 8 & 255);
    }
}

