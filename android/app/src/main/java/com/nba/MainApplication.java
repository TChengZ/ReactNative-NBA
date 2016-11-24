package com.nba;

import android.app.Application;
import android.util.Log;

import com.facebook.react.ReactApplication;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.nba.jsmodule.JsPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

    private static MainApplication mInstance = null;

    private JsPackage mJsPackage = null;

    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
      @Override
      protected boolean getUseDeveloperSupport() {
        return BuildConfig.DEBUG;
      }

      @Override
      protected List<ReactPackage> getPackages() {
        if(null == mJsPackage){
           mJsPackage = new JsPackage();
        }
        return Arrays.<ReactPackage>asList(
            new MainReactPackage(), mJsPackage
        );
      }
    };

    @Override
    public ReactNativeHost getReactNativeHost() {
        return mReactNativeHost;
    }

    public JsPackage getJsPackage(){
        return mJsPackage;
    }

    @Override
    public void onCreate() {
        super.onCreate();
        mInstance = this;
    }

    public static MainApplication getInstance(){
        return mInstance;
    }
}
