package io.cordova.hellocordova.Guide;

import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.EditText;

import io.cordova.hellocordova.R;

/**
 * Created by jiefly on 2016/3/23.
 */
public class Fragment02 extends Fragment implements View.OnClickListener {
    private View view;
    private EditText etPhoneNumber;
    private EditText etSecurityCode;
    private Button btnQucikLogin;
    private Button btnGetSecurityCode;

    private String phoneNumber;
    private int securityCode;
    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        super.onCreateView(inflater, container, savedInstanceState);
        view = inflater.inflate(R.layout.fragment02,container,false);
        return view;
    }

    @Override
    public void onStart() {
        super.onStart();
        etPhoneNumber = (EditText) view.findViewById(R.id.etPhoneNumber);
        etSecurityCode = (EditText) view.findViewById(R.id.edtSetSupplement);
        btnGetSecurityCode = (Button) view.findViewById(R.id.btnGetSecurityCode);
        btnQucikLogin = (Button) view.findViewById(R.id.btnQuickLogin);

        btnGetSecurityCode.setOnClickListener(this);
        btnQucikLogin.setOnClickListener(this);
    }

    @Override
    public void onClick(View v) {
        switch (v.getId()){
            case R.id.btnQuickLogin:
                UserGuideInfo userGuideInfo = ((GuideActivity)getActivity()).getUserGuideInfo();
                phoneNumber = etPhoneNumber.getText().toString();
                securityCode = Integer.valueOf(etSecurityCode.getText().toString());

                if (phoneNumber!=null&&securityCode<=999999&&securityCode>100000) {
                    userGuideInfo.setSecurityCode(securityCode);
                    userGuideInfo.setPhoneNumber(phoneNumber);
                }

                //判断验证码是否正确
                //正确的话进入设置页面
                ((GuideActivity)getActivity()).getmViewPager().setCurrentItem(2);
                //不正确给出相应的提示
                break;
            case R.id.btnGetSecurityCode:
                //向服务器请求验证码
                break;
            default:
                break;
        }
    }
}
