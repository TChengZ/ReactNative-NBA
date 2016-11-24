package com.nba.jsmodule;

import android.os.Looper;
import android.view.Gravity;
import android.view.MotionEvent;
import android.view.View;
import android.view.ViewGroup;
import android.widget.LinearLayout;
import android.widget.PopupWindow;
import android.widget.TextView;
import android.widget.Toast;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.nba.utils.Constants;


public class PopupWindowModule extends ReactContextBaseJavaModule{

    private PopupWindow mMoreLinkPopup = null;
    private android.os.Handler mHandler = new android.os.Handler(Looper.getMainLooper());

    public PopupWindowModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return Constants.POPUP_WINDOW;
    }

    @ReactMethod
    public void showPopup(final ReadableArray array){
        mHandler.post(new Runnable() {
            @Override
            public void run() {
                LinearLayout linearLayout = new LinearLayout(getCurrentActivity());
                linearLayout.setLayoutParams(new LinearLayout.LayoutParams(ViewGroup.LayoutParams.WRAP_CONTENT, ViewGroup.LayoutParams.WRAP_CONTENT));
                linearLayout.setOrientation(LinearLayout.VERTICAL);
                linearLayout.setBackgroundResource(android.R.color.holo_green_dark);
                linearLayout.setGravity(Gravity.CLIP_HORIZONTAL);
                for(int i = 0; i < array.size(); i++){
                    ReadableMap readableMap = array.getMap(i);
                    String name = readableMap.getString("name");
                    TextView textView = new TextView(getCurrentActivity());
                    textView.setLayoutParams(new LinearLayout.LayoutParams(ViewGroup.LayoutParams.WRAP_CONTENT, ViewGroup.LayoutParams.WRAP_CONTENT));
                    textView.setText(name);
                    textView.setGravity(Gravity.CENTER);
                    linearLayout.addView(textView);
                }
                mMoreLinkPopup = null;
                mMoreLinkPopup = new PopupWindow(linearLayout, ViewGroup.LayoutParams.WRAP_CONTENT, ViewGroup.LayoutParams.WRAP_CONTENT);
                View decorView = getCurrentActivity().getWindow().getDecorView();
                mMoreLinkPopup.showAtLocation(decorView, Gravity.TOP|Gravity.RIGHT, 20, 200);
            }
        });

    }

    public PopupWindow getMoreLinkPopup(){
        return mMoreLinkPopup;
    }
}
