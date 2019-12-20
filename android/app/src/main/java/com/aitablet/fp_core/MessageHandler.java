package com.aitablet.fp_core;

import java.util.Arrays;

/**
 * Created by Hfengxiang
 * on 2019/12/10
 */
public class MessageHandler {
    public static String handleMessage(int nErrorCode){
        String str;

        switch (nErrorCode) {
            case DevComm.ERR_SUCCESS:
                str = "Succcess";
                break;
            case DevComm.ERR_VERIFY:
                str = "Verify NG";
                break;
            case DevComm.ERR_IDENTIFY:
                str = "Identify NG";
                break;
            case DevComm.ERR_EMPTY_ID_NOEXIST:
                str = "Empty Template no Exist";
                break;
            case DevComm.ERR_BROKEN_ID_NOEXIST:
                str = "Broken Template no Exist";
                break;
            case DevComm.ERR_TMPL_NOT_EMPTY:
                str = "Template of this ID Already Exist";
                break;
            case DevComm.ERR_TMPL_EMPTY:
                str = "This Template is Already Empty";
                break;
            case DevComm.ERR_INVALID_TMPL_NO:
                str = "Invalid Template No";
                break;
            case DevComm.ERR_ALL_TMPL_EMPTY:
                str = "All Templates are Empty";
                break;
            case DevComm.ERR_INVALID_TMPL_DATA:
                str = "Invalid Template Data";
                break;
            case DevComm.ERR_DUPLICATION_ID:
                str = "Duplicated ID : ";
                break;
            case DevComm.ERR_BAD_QUALITY:
                str = "Bad Quality Image";
                break;
            case DevComm.ERR_MERGE_FAIL:
                str = "Merge failed";
                break;
            case DevComm.ERR_NOT_AUTHORIZED:
                str = "Device not authorized.";
                break;
            case DevComm.ERR_MEMORY:
                str = "Memory Error ";
                break;
            case DevComm.ERR_INVALID_PARAM:
                str = "Invalid Parameter";
                break;
            case DevComm.ERR_GEN_COUNT:
                str = "Generation Count is invalid";
                break;
            case DevComm.ERR_INVALID_BUFFER_ID:
                str = "Ram Buffer ID is invalid.";
                break;
            case DevComm.ERR_INVALID_OPERATION_MODE:
                str = "Invalid Operation Mode!";
                break;
            case DevComm.ERR_FP_NOT_DETECTED:
                str = "Finger is not detected.";
                break;
            default:
                str = String.format("Fail, error code=%d", nErrorCode);
                break;
        }

        return str;
    }

    /**
     * 指纹传感器返回的字节数据转成指纹图片字节数据
     */
    public static void transferBit2BmpByte(byte[] Input, byte[] Output, int iImageX, int iImageY) {
        byte[] w_bTemp = new byte[4];
        byte[] head = new byte[1078];
        byte[] head2 = {
                /***************************/
                // file header
                0x42, 0x4d, // file type
                // 0x36,0x6c,0x01,0x00, //file size***
                0x0, 0x0, 0x0, 0x00, // file size***
                0x00, 0x00, // reserved
                0x00, 0x00, // reserved
                0x36, 0x4, 0x00, 0x00, // head byte***
                /***************************/
                // infoheader
                0x28, 0x00, 0x00, 0x00, // struct size

                // 0x00,0x01,0x00,0x00,//map width***
                0x00, 0x00, 0x0, 0x00, // map width***
                // 0x68,0x01,0x00,0x00,//map height***
                0x00, 0x00, 0x00, 0x00, // map height***

                0x01, 0x00, // must be 1
                0x08, 0x00, // color count***
                0x00, 0x00, 0x00, 0x00, // compression
                // 0x00,0x68,0x01,0x00,//data size***
                0x00, 0x00, 0x00, 0x00, // data size***
                0x00, 0x00, 0x00, 0x00, // dpix
                0x00, 0x00, 0x00, 0x00, // dpiy
                0x00, 0x00, 0x00, 0x00, // color used
                0x00, 0x00, 0x00, 0x00,// color important
        };

        int i, j, num, iImageStep;

        Arrays.fill(w_bTemp, (byte) 0);

        System.arraycopy(head2, 0, head, 0, head2.length);

        if ((iImageX % 4) != 0)
            iImageStep = iImageX + (4 - (iImageX % 4));
        else
            iImageStep = iImageX;

        num = iImageX;
        head[18] = (byte) (num & (byte) 0xFF);
        num = num >> 8;
        head[19] = (byte) (num & (byte) 0xFF);
        num = num >> 8;
        head[20] = (byte) (num & (byte) 0xFF);
        num = num >> 8;
        head[21] = (byte) (num & (byte) 0xFF);

        num = iImageY;
        head[22] = (byte) (num & (byte) 0xFF);
        num = num >> 8;
        head[23] = (byte) (num & (byte) 0xFF);
        num = num >> 8;
        head[24] = (byte) (num & (byte) 0xFF);
        num = num >> 8;
        head[25] = (byte) (num & (byte) 0xFF);

        j = 0;
        for (i = 54; i < 1078; i = i + 4) {
            head[i] = head[i + 1] = head[i + 2] = (byte) j;
            head[i + 3] = 0;
            j++;
        }

        System.arraycopy(head, 0, Output, 0, 1078);

        if (iImageStep == iImageX) {
            for (i = 0; i < iImageY; i++) {
                System.arraycopy(Input, i * iImageX, Output, 1078 + i * iImageX, iImageX);
            }
        } else {
            iImageStep = iImageStep - iImageX;

            for (i = 0; i < iImageY; i++) {
                System.arraycopy(Input, i * iImageX, Output, 1078 + i * (iImageX + iImageStep), iImageX);
                System.arraycopy(w_bTemp, 0, Output, 1078 + i * (iImageX + iImageStep) + iImageX, iImageStep);
            }
        }
    }
}
