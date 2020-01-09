package com.aitablet;

import androidx.annotation.NonNull;

import com.aitablet.clock.AlarmModle;
import com.aitablet.clock.PlayMusicModle;
import com.aitablet.fingerprint.FingerModle;
import com.aitablet.readcard.ReadCardModle;
import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class CustomPackage implements ReactPackage {
    @Override
    public List<NativeModule> createNativeModules(
            ReactApplicationContext reactContext) {
        List<NativeModule> modules = new ArrayList<>();
        modules.add(new FingerModle(reactContext));
        modules.add(new ReadCardModle(reactContext));
        modules.add(new AlarmModle(reactContext));
        modules.add(new PlayMusicModle(reactContext));
        return modules;
    }

    @NonNull
    @Override
    public List<ViewManager> createViewManagers(@NonNull ReactApplicationContext reactContext) {
        return Collections.emptyList();
    }
}
