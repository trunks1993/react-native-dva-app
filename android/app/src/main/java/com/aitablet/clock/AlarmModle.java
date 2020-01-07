package com.aitablet.clock;

import android.app.AlarmManager;
import android.app.PendingIntent;
import android.app.Service;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.util.Log;

import androidx.annotation.NonNull;

import com.aitablet.Constant;
import com.aitablet.utils.UtilsForRN;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.util.Calendar;

public class AlarmModle extends ReactContextBaseJavaModule {
    private static ReactApplicationContext reactContext;
    private AlarmManager alarmManager;
    private AlarmBroadcastReceiver myBroadcastReceiver;
    private static final String TAG = "AlarmModle";

    public AlarmModle(@NonNull ReactApplicationContext reactContext) {
        super(reactContext);
        AlarmModle.reactContext = reactContext;
        alarmManager = (AlarmManager) reactContext.getSystemService(Service.ALARM_SERVICE);
        initBroadcastReceiver();
    }

    @NonNull
    @Override
    public String getName() {
        return "AlarmModle";
    }

    @ReactMethod
    public void setAlarm(int hourOfDay, int minute) {
        //设置当前时间
        Calendar c = Calendar.getInstance();
        c.setTimeInMillis(System.currentTimeMillis());
        // 根据用户选择的时间来设置Calendar对象
        c.set(Calendar.HOUR, hourOfDay);
        c.set(Calendar.MINUTE, minute);
        Intent intent = new Intent(Constant.ACTION_MY_CLOCK);
        PendingIntent broadcast = PendingIntent.getBroadcast(reactContext, 0, intent, PendingIntent.FLAG_UPDATE_CURRENT);
        // 设置AlarmManager在Calendar对应的时间启动Activity
        alarmManager.set(AlarmManager.RTC_WAKEUP, c.getTimeInMillis(), broadcast);
    }

    @ReactMethod
    public void cancleAlarm() {
        Intent intent = new Intent(Constant.ACTION_MY_CLOCK);
        PendingIntent broadcast = PendingIntent.getBroadcast(reactContext, 0, intent, PendingIntent.FLAG_UPDATE_CURRENT);
        try {
            alarmManager.cancel(broadcast);
            Log.d(TAG, "Alarm is Canceled.");
        } catch (Exception e) {
            e.printStackTrace();
            Log.d(TAG, "Alarm is not Canceled: " + e.toString());
        }
    }

    private void initBroadcastReceiver() {
        myBroadcastReceiver = new AlarmBroadcastReceiver();
        IntentFilter filter = new IntentFilter();
        filter.addAction(Constant.ACTION_MY_CLOCK);
        reactContext.registerReceiver(myBroadcastReceiver, filter);
    }

    public class AlarmBroadcastReceiver extends BroadcastReceiver {

        @Override
        public void onReceive(Context context, Intent intent) {
            String action = intent.getAction();
            if (action.equals(Constant.ACTION_MY_CLOCK)) {
                UtilsForRN.sendEvent(reactContext, "onAlarmCall", "", "");
            }
        }

    }
}
