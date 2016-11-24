package com.nba;

import android.view.MotionEvent;
import android.widget.PopupWindow;

import com.facebook.react.ReactActivity;
import com.nba.jsmodule.JsPackage;
import com.nba.jsmodule.PopupWindowModule;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "Nba";
    }

    @Override
    public boolean dispatchTouchEvent(MotionEvent event) {
        dismissPopup();
        return super.dispatchTouchEvent(event);
    }

    private void dismissPopup(){
        MainApplication application = MainApplication.getInstance();
        JsPackage jsPackage = application.getJsPackage();
        if(null != jsPackage){
            PopupWindowModule popupWindowModule = jsPackage.getPopupWIndowModule();
            if(null != popupWindowModule){
                PopupWindow moreLinkPopup = popupWindowModule.getMoreLinkPopup();
                if(null != moreLinkPopup && moreLinkPopup.isShowing()){
                    moreLinkPopup.dismiss();
                }
            }
        }
    }

}
