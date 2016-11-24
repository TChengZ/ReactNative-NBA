package com.nba.jsmodule;

import android.graphics.Color;
import android.os.Looper;
import android.util.TypedValue;
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
import com.nba.MainApplication;
import com.nba.R;
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
                linearLayout.setGravity(Gravity.CENTER_HORIZONTAL);
                int m30dp = (int)TypedValue.applyDimension(TypedValue.COMPLEX_UNIT_DIP, 30, MainApplication.getInstance().getResources().getDisplayMetrics());
                int m100dp = (int)TypedValue.applyDimension(TypedValue.COMPLEX_UNIT_DIP, 100, MainApplication.getInstance().getResources().getDisplayMetrics());
                for(int i = 0; i < array.size(); i++){
                    ReadableMap readableMap = array.getMap(i);
                    String name = readableMap.getString("name");
                    TextView textView = new TextView(getCurrentActivity());
                    LinearLayout.LayoutParams textParams = new LinearLayout.LayoutParams(m100dp, m30dp);
                    textView.setLayoutParams(textParams);
//                    textView.setPadding(m15dp, m10dp, m15dp, m10dp);
                    textView.setText(name);
                    textView.setTextSize(16);
                    textView.setTextColor(Color.WHITE);
                    textView.setGravity(Gravity.CENTER);
                    textView.setBackgroundResource(R.drawable.bg_more_link);
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
