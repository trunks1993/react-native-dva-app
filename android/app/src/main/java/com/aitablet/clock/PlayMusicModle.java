package com.aitablet.clock;

import android.content.Intent;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class PlayMusicModle extends ReactContextBaseJavaModule {
    private static ReactApplicationContext reactContext;

    public PlayMusicModle(@NonNull ReactApplicationContext reactContext) {
        super(reactContext);
        PlayMusicModle.reactContext = reactContext;
    }

    @NonNull
    @Override
    public String getName() {
        return "PlayMusicModle";
    }

    @ReactMethod
    public void playClockMusic() {
        playingmusic(PlayingMusicServices.PLAT_MUSIC);
    }

    @ReactMethod
    public void pauseClockMusic() {
        playingmusic(PlayingMusicServices.PAUSE_MUSIC);
    }

    @ReactMethod
    public void stopClockMusic() {
        playingmusic(PlayingMusicServices.STOP_MUSIC);
    }


    private void playingmusic(int type) {
        //启动服务，播放音乐
        Intent intent = new Intent(reactContext, PlayingMusicServices.class);
        intent.putExtra("type", type);
        reactContext.startService(intent);
    }
}
