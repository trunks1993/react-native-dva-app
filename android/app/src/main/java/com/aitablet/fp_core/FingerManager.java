package com.aitablet.fp_core;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.os.Handler;
import android.os.SystemClock;
import android.util.Base64;
import android.util.Log;

public class FingerManager {
    private Handler mHandler = new Handler();
    private String TAG = "FingerManager";

    private FingerManager() {
    }

    private static final class FingerHolder {
        private static FingerManager FINGER_MANAGER = new FingerManager();
    }

    public static FingerManager getInstance() {
        return FingerHolder.FINGER_MANAGER;
    }

    /**
     * 串口通信回调
     */
    private IDeviceCallback mDeviceCallback;
    private IRegisterFpCallback mRegisterFpCallback;
    private ICaptureCallback mCaptureCallback;
    private IDispatchFpCallback mDispatchFpCallback;
    private IVerifyCallback mVerifyFpFeedback;

    public void setVerifyFpFeedback(IVerifyCallback mVerifyFpFeedback) {
        this.mVerifyFpFeedback = mVerifyFpFeedback;
    }

    public IDispatchFpCallback getDispatchFpCallback() {
        return mDispatchFpCallback;
    }

    public FingerManager setDispatchFpCallback(IDispatchFpCallback mDispatchFpCallback) {
        this.mDispatchFpCallback = mDispatchFpCallback;
        return this;
    }

    public FingerManager setDeviceCallback(IDeviceCallback mDeviceCallback) {
        this.mDeviceCallback = mDeviceCallback;
        return this;
    }

    public FingerManager setRegisterFpCallback(IRegisterFpCallback mRegisterFpCallback) {
        this.mRegisterFpCallback = mRegisterFpCallback;
        return this;
    }

    public FingerManager setCaptureCallback(ICaptureCallback mCaptureCallback) {
        this.mCaptureCallback = mCaptureCallback;
        return this;
    }

    /**
     * 串口通信类
     */
    private static DevComm m_usbComm;

    /**
     * USB连接状态监听器
     */
    private final IUsbConnState m_IConnectionHandler = new IUsbConnState() {
        @Override
        public void onUsbConnected() {
            String[] w_strInfo = new String[1];

            if (m_usbComm.Run_TestConnection() == DevComm.ERR_SUCCESS) {

                if (m_usbComm.Run_GetDeviceInfo(w_strInfo) == DevComm.ERR_SUCCESS) {
                    if (mDeviceCallback != null) {
                        mDeviceCallback.onInitDeviceError(IDeviceCallback.CODE_OPED_DEVICE_SUCCESS, "Open Success!\r\nDevice Info : " + w_strInfo[0]);
                    }
                }
            } else {
                if (mDeviceCallback != null) {
                    mDeviceCallback.onInitDeviceError(IDeviceCallback.CODE_OPED_DEVICE_FAIL, "Can not connect to device!");
                }
            }
        }

        @Override
        public void onUsbPermissionDenied() {
            if (mDeviceCallback != null) {
                mDeviceCallback.onInitDeviceError(IDeviceCallback.CODE_USB_PERMISSION_DENY, "Permission denied!");
            }
        }

        @Override
        public void onDeviceNotFound() {
            if (mDeviceCallback != null) {
                mDeviceCallback.onInitDeviceError(IDeviceCallback.CODE_USB_DEVICE_NOT_FOUND, "Can not find usb device!");
            }
        }
    };
    /**
     * 比特流信号
     */
    private byte[] m_binImage;
    /**
     * 指纹图片字节数据
     */
    private byte[] m_bmpImage;
    /**
     * 指纹模板数据
     */
    private byte[] p_pbyTemplate;
    /**
     * 用户名
     */
    private String userName;
    /**
     * 用户id
     */
    private int userId;
    /**
     * 验证成功后返回的用户id
     */
    private int verifyUserId = -1;
    /**
     * 指纹id
     */
    private String printId;
    /**
     * 指纹id总个数
     */
    private int m_nMaxFpCount = 500;
    /**
     * 指纹图案的宽
     */
    private int m_nImgWidth;
    /**
     * 指纹图案的高
     */
    private int m_nImgHeight;

    /**
     * 取消捕捉线程
     */
    private boolean m_bCancel;


    /**
     * 录入指纹时状态消息
     */

    private FeedbackInfo mFeedbackInfo = new FeedbackInfo(-1, "initial");

    /**
     * 主线程更新录入指纹，反馈信息
     */
    private Runnable registerFpFeedbackTask = new Runnable() {
        public void run() {
            if (mRegisterFpCallback != null) {
                switch (mFeedbackInfo.getCode()) {
                    case IRegisterFpCallback.CODE_PRESS:
                        mRegisterFpCallback.onPress(mFeedbackInfo.getStep(), mFeedbackInfo.getMessage());
                        break;
                    case IRegisterFpCallback.CODE_RELEASE:
                        mRegisterFpCallback.onRelease(mFeedbackInfo.getStep(), mFeedbackInfo.getMessage());
                        break;
                    case IRegisterFpCallback.CODE_SUCCESS:
                        mRegisterFpCallback.onRegisterSuccess(mFeedbackInfo.getMessage());
                        break;
                    case IRegisterFpCallback.CODE_RESULT:
                        mRegisterFpCallback.onRegisterFpResult(userName, userId, printId);
                        break;
                    case IRegisterFpCallback.CODE_ERROR:
                        mRegisterFpCallback.onRegisterError(mFeedbackInfo.getMessage());
                        break;

                }
            }
        }
    };

    /**
     * 捕捉指纹反馈
     */
    private Runnable captureFpFeedbackTask = new Runnable() {
        public void run() {
            if (mCaptureCallback != null) {
                mCaptureCallback.onCaptureResult(mFeedbackInfo.getCode(), mFeedbackInfo.getMessage());
            }
        }
    };


    /**
     * 更新指纹图片的线程，可以获得指纹图片数据
     */
    private Runnable drawImageTask = new Runnable() {
        public void run() {
            int nSize;
            /**
             * 创建图片缓冲区，将比特流数据转成字节流数据
             * */
            MessageHandler.transferBit2BmpByte(m_binImage, m_bmpImage, m_nImgWidth, m_nImgHeight);

            if ((m_nImgWidth % 4) != 0)
                nSize = m_nImgWidth + (4 - (m_nImgWidth % 4));
            else
                nSize = m_nImgWidth;

            nSize = 1078 + nSize * m_nImgHeight;

            // DebugManage.WriteBmp(m_bmpImage, nSize);

            Bitmap image = BitmapFactory.decodeByteArray(m_bmpImage, 0, nSize);

            if (mRegisterFpCallback != null) {
                mRegisterFpCallback.onShowFpImage(image);
            }
        }
    };
    /**
     * 下发指纹反馈
     */
    private Runnable dispatchFpFeedbackTask = new Runnable() {
        public void run() {
            if (mDispatchFpCallback != null) {
                mDispatchFpCallback.onDispatchResult(mFeedbackInfo.getCode(), mFeedbackInfo.getMessage());
            }
        }
    };

    /**
     * 验证指纹反馈
     */
    private Runnable verifyFpFeedbackTask = new Runnable() {
        public void run() {
            if (mVerifyFpFeedback != null) {
                mVerifyFpFeedback.onVerifyResult(mFeedbackInfo.getCode(), mFeedbackInfo.getMessage());
            }
        }
    };

    /**
     * 初始化设备
     */
    public void initDevice(Context context) {
        if (m_usbComm == null) {
            m_usbComm = new DevComm(context.getApplicationContext(), m_IConnectionHandler);
        }
        /**
         * 存储指纹字节数据的数组
         * */
        m_binImage = new byte[1024 * 100];
        m_bmpImage = new byte[1024 * 100];
        p_pbyTemplate = new byte[498];
        openDevice();
    }

    /**
     * 打开指纹设备
     */
    public void openDevice() {
        String[] w_strInfo = new String[1];
        if (m_usbComm != null) {
            if (!m_usbComm.IsInit()) {
                if (m_usbComm.OpenComm()) {
                    //
                } else {
                    if (mDeviceCallback != null) {
                        mDeviceCallback.onInitDeviceError(IDeviceCallback.CODE_INIT_USB_FAIL, "Failed init usb!");
                    }
                }
            } else {
                if (m_usbComm.Run_TestConnection() == DevComm.ERR_SUCCESS) {
                    if (m_usbComm.Run_GetDeviceInfo(w_strInfo) == DevComm.ERR_SUCCESS) {
                        if (mDeviceCallback != null) {
                            mDeviceCallback.onInitDeviceError(IDeviceCallback.CODE_OPED_DEVICE_SUCCESS, "Open Success!\r\nDevice Info : " + w_strInfo[0]);
                        }
                    } else if (mDeviceCallback != null) {
                        mDeviceCallback.onInitDeviceError(IDeviceCallback.CODE_OPED_DEVICE_FAIL, "Can not connect to device!");
                    }
                } else if (mDeviceCallback != null) {
                    mDeviceCallback.onInitDeviceError(IDeviceCallback.CODE_CONNECT_DEVICE_FAIL, "Can not connect to device!");
                }
            }
        }
    }

    /**
     * 注册指纹
     */
    public void registerFp(final String userName, final int userId) {
        /**
         * 校验一下输入的字符串是否正确
         * */
        if (!checkUserId(userId))
            return;
        this.userName = userName;
        int w_nRet;
        int[] w_nState = new int[1];
        // Check if fp is exist
        w_nRet = m_usbComm.Run_GetStatus(userId, w_nState);
        if (w_nRet != DevComm.ERR_SUCCESS) {
            if (mDeviceCallback != null) {
                mDeviceCallback.onInitDeviceError(IDeviceCallback.CODE_OTHER, MessageHandler.handleMessage(w_nRet));
            }
            return;
        }

        if (w_nState[0] == DevComm.GD_TEMPLATE_NOT_EMPTY) {
            if (mRegisterFpCallback != null) {
                mRegisterFpCallback.onRegisterError("Template is already exist");
            }
            return;
        }

        if (mRegisterFpCallback != null) {
            mRegisterFpCallback.onRegisterStart("Press finger : " + userId);
        }
        /**
         * 这个方法是干啥的？？？控制LED不闪烁？
         * */
        m_usbComm.Run_SLEDControl(1);
        m_bCancel = false;

        new Thread(new Runnable() {
            int w_nRet, w_nUserID, w_nEnrollStep = 0, w_nGenCount = 3;
            int[] w_nDupID = new int[1];
            int[] w_nWidth = new int[1];
            int[] w_nHeight = new int[1];

            @Override
            public void run() {

                w_nUserID = userId;

                /**
                 * 循环录入指纹
                 * */
                while (w_nEnrollStep < w_nGenCount) {
                    String message = String.format("Input finger #%d!", w_nEnrollStep + 1);
                    mFeedbackInfo.clear();
                    mFeedbackInfo.setCode(IRegisterFpCallback.CODE_PRESS);
                    mFeedbackInfo.setStep(w_nEnrollStep + 1);
                    mFeedbackInfo.setMessage(message);
                    mHandler.post(registerFpFeedbackTask);

                    // Capture
                    /**
                     * 与串口通信捕捉到指纹数据
                     * */
                    int capturing = Capturing();
                    /**
                     * 捕捉失败
                     * */
                    if (capturing < 0) {
                        if (mRegisterFpCallback != null) {
                            if (capturing == -1) {
                                /**
                                 * 用户手指移开
                                 * */
                                mFeedbackInfo.clear();
                                mFeedbackInfo.setCode(IRegisterFpCallback.CODE_ERROR);
                                mFeedbackInfo.setMessage("user cancel press finger!");
                            } else if (capturing == -2) {
                                /**
                                 * 连接故障
                                 * */
                                mFeedbackInfo.clear();
                                mFeedbackInfo.setCode(IRegisterFpCallback.CODE_ERROR);
                                mFeedbackInfo.setMessage("device connect error!");
                            }
                            mHandler.post(registerFpFeedbackTask);
                        }
                        return;
                    }

                    // Up Cpatured Image
                    /**
                     * 更新指纹，串口将指纹信号封装字节数据放入m_binImage中
                     * */
                    w_nRet = m_usbComm.Run_UpImage(0, m_binImage, w_nWidth, w_nHeight);

                    if (w_nRet != DevComm.ERR_SUCCESS) {
                        mFeedbackInfo.clear();
                        mFeedbackInfo.setCode(IRegisterFpCallback.CODE_ERROR);
                        mFeedbackInfo.setMessage(MessageHandler.handleMessage(w_nRet));
                        mHandler.post(registerFpFeedbackTask);
                        return;
                    }
                    // Draw image
                    m_nImgWidth = w_nWidth[0];
                    m_nImgHeight = w_nHeight[0];
                    mHandler.post(registerFpFeedbackTask);
                    mHandler.post(drawImageTask);


                    // Create Template
                    /**
                     * 创建指纹模板
                     * */
                    w_nRet = m_usbComm.Run_Generate(w_nEnrollStep);

                    if (w_nRet != DevComm.ERR_SUCCESS) {
                        if (w_nRet == DevComm.ERR_BAD_QUALITY) {
                            mFeedbackInfo.clear();
                            mFeedbackInfo.setCode(IRegisterFpCallback.CODE_ERROR);
                            mFeedbackInfo.setMessage("Bad quality. Try Again!");
                            mHandler.post(registerFpFeedbackTask);
                            continue;
                        } else {
                            mFeedbackInfo.clear();
                            mFeedbackInfo.setCode(IRegisterFpCallback.CODE_ERROR);
                            mFeedbackInfo.setMessage(MessageHandler.handleMessage(w_nRet));
                            mHandler.post(registerFpFeedbackTask);
                            return;
                        }
                    }

                    /*
                     * if(w_nEnrollStep == 0) { if (w_nGenCount == 3) m_strPost
                     * = "Two More"; else m_strPost = "One More"; } else
                     * if(w_nEnrollStep == 1) m_strPost = "One More";
                     * mHandler.post(runShowStatus);
                     */
                    /**
                     * 提示用户抬起手指并再次按下指纹
                     * */
                    SystemClock.sleep(500);
                    mFeedbackInfo.clear();
                    mFeedbackInfo.setMessage("Release your finger.");
                    mFeedbackInfo.setCode(IRegisterFpCallback.CODE_RELEASE);
                    mFeedbackInfo.setStep(w_nEnrollStep + 1);
                    Log.e("Finger", "post(registerFpFeedbackTask) CODE_RELEASE");
                    mHandler.post(registerFpFeedbackTask);
                    w_nEnrollStep++;
                }

                // m_strPost = "Release Finger";
                // mHandler.post(runShowStatus);

                /**
                 * 对多次采集的指纹进行整合
                 * */
                // Merge
                if (w_nGenCount != 1) {
                    // . Merge Template
                    w_nRet = m_usbComm.Run_Merge(0, w_nGenCount);

                    if (w_nRet != DevComm.ERR_SUCCESS) {
                        mFeedbackInfo.clear();
                        mFeedbackInfo.setCode(IRegisterFpCallback.CODE_ERROR);
                        mFeedbackInfo.setMessage(MessageHandler.handleMessage(w_nRet));
                        mHandler.post(registerFpFeedbackTask);
                        return;
                    }
                }
                /**
                 * 存储指纹数据
                 * */
                w_nRet = m_usbComm.Run_StoreChar(w_nUserID, 0, w_nDupID);
                OnUpDate(0, userId);
//                OnUpDate(0);
                if (w_nRet != DevComm.ERR_SUCCESS) {
                    String state = "";
                    if (mRegisterFpCallback != null) {
                        if (w_nRet == DevComm.ERR_DUPLICATION_ID) {
                            mFeedbackInfo.clear();
                            mFeedbackInfo.setCode(IRegisterFpCallback.CODE_ERROR);
                            state = String.format("Result : Fail\r\nDuplication ID = %d", w_nDupID[0]);
                        } else {
                            mFeedbackInfo.setCode(IRegisterFpCallback.CODE_ERROR);
                            state = MessageHandler.handleMessage(w_nRet);
                        }
                        mFeedbackInfo.setMessage(state);
                        mHandler.post(registerFpFeedbackTask);
                    }
                } else {
                    String state = String.format("Result : Success\r\nTemplate No : %d", userId);
                    if (mRegisterFpCallback != null) {
                        mFeedbackInfo.clear();
                        mFeedbackInfo.setMessage(state);
                        mFeedbackInfo.setCode(IRegisterFpCallback.CODE_SUCCESS);
                        mHandler.post(registerFpFeedbackTask);
                    }

                    if (mRegisterFpCallback != null) {
                        mFeedbackInfo.clear();
                        mFeedbackInfo.setMessage("store finger print info");
                        mFeedbackInfo.setCode(IRegisterFpCallback.CODE_RESULT);
                        mHandler.post(registerFpFeedbackTask);
                    }
                }

            }
        }).start();
    }

    /**
     * 检查用户id
     */
    public boolean checkUserId(int userId) {
        if (userId > (m_nMaxFpCount) || userId < 1) {
            if (mRegisterFpCallback != null) {
                mRegisterFpCallback.onRegisterError("Please input correct user id(1~" + m_nMaxFpCount + ")");
            }
            return false;
        }

        return true;
    }

    /**
     * 捕捉指纹
     */
    private int Capturing() {
        int w_nRet;
        while (true) {
            /**
             * 等待手指按下指纹采集器获取指纹,阻塞在这个死循环里
             * */
            w_nRet = m_usbComm.Run_GetImage();

            if (w_nRet == DevComm.ERR_CONNECTION) {
                mFeedbackInfo.clear();
                mFeedbackInfo.setCode(ICaptureCallback.CODE_ERROR);
                mFeedbackInfo.setMessage("Communication error!");
                mHandler.post(captureFpFeedbackTask);
                return -1;
            } else if (w_nRet == DevComm.ERR_SUCCESS) {
                mFeedbackInfo.clear();
                mFeedbackInfo.setCode(ICaptureCallback.CODE_ERROR);
                mFeedbackInfo.setMessage("Capture success!");
                mHandler.post(captureFpFeedbackTask);
                break;
            }
            if (m_bCancel) {
                mFeedbackInfo.clear();
                mFeedbackInfo.setCode(ICaptureCallback.CODE_ERROR);
                mFeedbackInfo.setMessage("Capture cancel!");
                mHandler.post(captureFpFeedbackTask);
                return -2;
            }
            /**
             * 降低一下捕捉频率
             * */
            SystemClock.sleep(50);
            Log.i(TAG, "waiting press....");
        }
        return 0;
    }


    /**
     * 为指纹容器赋值
     */
    public void OnUpDate(int p_nRamBufferID, int userId) {
        m_usbComm.Run_UpChar(p_nRamBufferID, p_pbyTemplate);
        this.userId = userId;
        printId = Base64.encodeToString(p_pbyTemplate, 0);
        Log.e("onRegisterFpResult", "userName:" + userName + ";m_nUserID:" + userId + "printId:" + printId);
    }

    /**
     * 下发指纹
     */
    public void dispatchFp(int p_nRamBufferID, int userId, String fp) {
        byte[] p_pbyTemplates = new byte[498];
        p_pbyTemplates = Base64.decode(fp, Base64.DEFAULT);
        int w_nRet = m_usbComm.Run_DownChar(p_nRamBufferID, p_pbyTemplates);
        int[] w_nDupID = new int[1];
        if (w_nRet != DevComm.ERR_SUCCESS) {
            Log.e("zdz", "注册失败");
            mFeedbackInfo.clear();
            mFeedbackInfo.setCode(IDispatchFpCallback.CODE_ERROR);
            mFeedbackInfo.setMessage("注册失败！");
        } else {
            Log.e("zdz", "注册成功");
            w_nRet = m_usbComm.Run_StoreChar(userId, p_nRamBufferID, w_nDupID);

            if (w_nRet != DevComm.ERR_SUCCESS) {
                if (w_nRet == DevComm.ERR_DUPLICATION_ID) {
                    mFeedbackInfo.clear();
                    mFeedbackInfo.setCode(IDispatchFpCallback.CODE_DISPATCH_REPEAT);
                    mFeedbackInfo.setMessage("Result : Fail\r\nDuplication ID = " + w_nDupID[0]);
                } else {
                    mFeedbackInfo.clear();
                    mFeedbackInfo.setCode(IDispatchFpCallback.CODE_DISPATCH_REPEAT);
                    mFeedbackInfo.setMessage(MessageHandler.handleMessage(w_nRet));
                }
            } else {
                mFeedbackInfo.clear();
                mFeedbackInfo.setCode(IDispatchFpCallback.CODE_SUCCESS);
                mFeedbackInfo.setMessage("Result : Success\r\nTemplate No : " + userId);
            }
            mHandler.post(dispatchFpFeedbackTask);
        }
    }

    public void verifyFp() {
        if (!m_usbComm.IsInit())
            return;
        m_usbComm.Run_SLEDControl(1);
        m_bCancel = false;
        new Thread(new Runnable() {
            int w_nRet;
            int[] w_nID = new int[1];
            int[] w_nLearned = new int[1];
            int[] w_nWidth = new int[1];
            int[] w_nHeight = new int[1];

            @SuppressLint("NewApi")
            @Override
            public void run() {

                while (true) {

                    if (Capturing() < 0)
                        return;

                    // Up Cpatured Image
                    w_nRet = m_usbComm.Run_UpImage(0, m_binImage, w_nWidth, w_nHeight);

                    if (w_nRet != DevComm.ERR_SUCCESS) {
                        mFeedbackInfo.clear();
                        mFeedbackInfo.setCode(IVerifyCallback.CODE_ERROR);
                        mFeedbackInfo.setMessage(MessageHandler.handleMessage(w_nRet));
                        mHandler.post(verifyFpFeedbackTask);
                        return;
                    }

                    // Draw image
                    m_nImgWidth = w_nWidth[0];
                    m_nImgHeight = w_nHeight[0];
                    mHandler.post(drawImageTask);

                    // Create template
                    long m_nPassedTime = SystemClock.elapsedRealtime();
                    w_nRet = m_usbComm.Run_Generate(0);

                    if (w_nRet != DevComm.ERR_SUCCESS) {
                        if (w_nRet == DevComm.ERR_CONNECTION) {
                            mFeedbackInfo.clear();
                            mFeedbackInfo.setCode(IVerifyCallback.CODE_ERROR);
                            mFeedbackInfo.setMessage(MessageHandler.handleMessage(w_nRet));
                            mHandler.post(verifyFpFeedbackTask);
                            return;
                        } else {
                            SystemClock.sleep(1000);
                            continue;
                        }
                    }

                    // Identify
                    w_nRet = m_usbComm.Run_Search(0, 1, m_nMaxFpCount, w_nID, w_nLearned);
                    m_nPassedTime = SystemClock.elapsedRealtime() - m_nPassedTime;
                    if (w_nRet == DevComm.ERR_SUCCESS) {
                        mFeedbackInfo.clear();
                        mFeedbackInfo.setCode(IVerifyCallback.CODE_SUCCESS);
                        mFeedbackInfo.setVerifyUserId(w_nID[0]);
                        String message = String.format(
                                " Result : Success\r\nTemplate No : %d, Learn Result : %d\r\nMatch Time : %dms",
                                w_nID[0], w_nLearned[0], m_nPassedTime);
                        mFeedbackInfo.setMessage(message);
                    } else {
                        mFeedbackInfo.clear();
                        mFeedbackInfo.setCode(IVerifyCallback.CODE_ERROR);
                        mFeedbackInfo.setVerifyUserId(-1);
                        String message = String.format("\r\nMatch Time : %dms", m_nPassedTime);
                        String result = MessageHandler.handleMessage(w_nRet) + message;
                        mFeedbackInfo.setMessage(message);
                    }
                    mHandler.post(verifyFpFeedbackTask);
                }
            }
        }).start();
    }


    public boolean deleteById(int id) {
        int w_nRet;

        if (!m_usbComm.IsInit())
            return false;

        if (id > 500 || id < 0) {
            return false;
        }

        w_nRet = m_usbComm.Run_DelChar(id, id);

        if (w_nRet != DevComm.ERR_SUCCESS) {
            Log.e(TAG, "id:" + id + "Delete false !");
            return false;
        }
        Log.e(TAG, "id:" + id + "Delete OK !");
        return true;
    }

    public boolean deleteAll() {
        int w_nRet;

        if (!m_usbComm.IsInit())
            return false;

        w_nRet = m_usbComm.Run_DelChar(1, 500);

        if (w_nRet != DevComm.ERR_SUCCESS) {
            return false;
        }

        return true;
    }

    public void release() {
        m_usbComm.CloseComm();
        m_usbComm = null;
    }
}
