package io.cordova.hellocordova.Guide;

import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v4.app.Fragment;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;

import io.cordova.hellocordova.R;

/**
 * Created by jiefly on 2016/3/23.
 */
public class Fragment01 extends Fragment implements View.OnClickListener {
    private View view;
    private Button btn_go,btn_fast_login;
    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        super.onCreateView(inflater, container, savedInstanceState);
        view = inflater.inflate(R.layout.fragment01,container,false);
        btn_fast_login = (Button) view.findViewById(R.id.btn_fast_login);
        btn_go = (Button) view.findViewById(R.id.btn_go);

        btn_fast_login.setOnClickListener(this);
        btn_go.setOnClickListener(this);
        return view;
    }

    @Override
    public void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

    }

    @Override
    public void onClick(View v) {
        switch (v.getId()){
            case R.id.btn_go:
                Log.i("jiefly", "click button go!");

                break;
            case R.id.btn_fast_login:
                Log.i("jiefly","click button fast_login");
                //跳转到登陆fragment
                ((GuideActivity)getActivity()).getmViewPager().setCurrentItem(1);
                break;
        }
    }
}
