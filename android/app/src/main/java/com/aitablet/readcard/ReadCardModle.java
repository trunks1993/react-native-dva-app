package com.aitablet.readcard;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;

import androidx.annotation.NonNull;

import com.aitablet.Constant;
import com.aitablet.utils.UtilsForRN;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;

public class ReadCardModle extends ReactContextBaseJavaModule {
    private static ReactApplicationContext reactContext;
    private MyBroadcastReceiver myBroadcastReceiver;

    public ReadCardModle(@NonNull ReactApplicationContext reactContext) {
        super(reactContext);
        ReadCardModle.reactContext = reactContext;
        initBroadcastReceiver();
    }

    @NonNull
    @Override
    public String getName() {
        return "ReadCardModle";
    }


    private void initBroadcastReceiver() {
        myBroadcastReceiver = new MyBroadcastReceiver();
        IntentFilter filter = new IntentFilter();
        filter.addAction(Constant.ACTION_CARD_NUM);
        reactContext.registerReceiver(myBroadcastReceiver, filter);
    }

    public class MyBroadcastReceiver extends BroadcastReceiver {

        @Override
        public void onReceive(Context context, Intent intent) {
            String action = intent.getAction();
            if (action.equals(Constant.ACTION_CARD_NUM)) {
                String cardNum = intent.getStringExtra("cardNum");
                String data = "{cardNum:'" + cardNum + "'}";
                UtilsForRN.sendEvent(reactContext, "onReadCard", "", data);
            }
        }

    }
}
