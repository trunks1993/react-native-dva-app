package com.aitablet.readcard;

import android.app.Service;
import android.content.Intent;
import android.os.IBinder;
import android.util.Log;

import com.aitablet.Constant;
import com.wits.serialport.SerialPort;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.security.InvalidParameterException;
import java.util.Arrays;

/**
 * 串口刷卡
 */
public class ReadSerialService extends Service {

    private static final String TAG = ReadSerialService.class.getSimpleName();
    private static final String SERIAL_NAME = "/dev/ttyS4";
    private static final int BAUDRATE = 9600;

    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }

    @Override
    public void onCreate() {
        super.onCreate();
        initSerialPort();
    }

    public static SerialPort mSerialPort;
    public static OutputStream mOutputStream;
    public static InputStream mInputStream;

    public SerialPort getSerialPort() throws SecurityException, IOException, InvalidParameterException {

        try {
            mSerialPort = new SerialPort(new File(SERIAL_NAME), BAUDRATE, 0);
        } catch (Exception e) {
            Log.e(TAG, "未找到串口" + SERIAL_NAME);
            return null;
        }
        return mSerialPort;
    }

    public void closeSerialPort() {
        isFlag = false;
        if (mSerialPort != null) {
            Log.i(TAG, "closeSerialPort");
            mSerialPort.close();
            mSerialPort = null;
        }
    }

    /**
     * 串口线程的初始化
     */
    public void initSerialPort() {
        isFlag = true;

        try {
            mSerialPort = getSerialPort();
            if (mSerialPort == null) {
                return;
            }
            Log.e(TAG, SERIAL_NAME + "串口服务已启动");
        } catch (Exception e) {
            e.printStackTrace();
        }
        mOutputStream = mSerialPort.getOutputStream();
        mInputStream = mSerialPort.getInputStream();

        new Thread(new ReadThreadSerial()).start();
    }

    /**
     * 读取串口的线程
     */
    private boolean isFlag = false;

    public class ReadThreadSerial extends Thread {

        @Override
        public void run() {
            super.run();
            while (isFlag) {
                int size;
                int num = 0;
                try {
                    byte[] buffer = new byte[16];
                    if (mInputStream == null) {
                        break;
                    }
                    size = mInputStream.read(buffer);
                    if (size == 10) {
                        for (int i = 0; i < size - 6; i++) {
                            num = (int) (num + (buffer[size - (i + 3)] & 0xff) * Math.pow(16, i * 2));
                        }
                        serial_Card(num + "");
                    }
                    Arrays.fill(buffer, (byte) 0);
                } catch (IOException e) {
                    e.printStackTrace();
                    return;
                }
            }
        }
    }

    public void serial_Card(String cardNum) {
        Intent intent = new Intent();
        intent.putExtra("cardNum", cardNum);
        Log.i(TAG, Constant.ACTION_CARD_NUM + ":" + cardNum);
        intent.setAction(Constant.ACTION_CARD_NUM);
        sendBroadcast(intent);
    }

    @Override
    public void onDestroy() {
        closeSerialPort();
        super.onDestroy();
    }
}