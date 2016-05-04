package io.cordova.hellocordova.Guide;

import android.os.Bundle;
import android.os.Handler;
import android.support.annotation.Nullable;
import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.CompoundButton;
import android.widget.ImageView;
import android.widget.RadioButton;

import io.cordova.hellocordova.R;

/**
 * Created by jiefly on 2016/3/23.
 */
public class Fragment03_1 extends Fragment implements View.OnClickListener, CompoundButton.OnCheckedChangeListener {
    private View view;
    private RadioButton rbtHusband;
    private RadioButton rbtWife;
    private ImageView imgBack_01;

    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        super.onCreateView(inflater, container, savedInstanceState);
        view =  inflater.inflate(R.layout.fragment03_1, container, false);
        return view;
    }

    @Override
    public void onClick(View v) {

        new Handler().postDelayed(new Runnable() {
            @Override
            public void run() {
                ((GuideActivity) getActivity()).getmViewPager().setCurrentItem(3);
            }
        }, 100);
    }

    @Override
    public void onStart() {
        super.onStart();
        imgBack_01 = (ImageView) view.findViewById(R.id.imgBack_01);
        rbtHusband = (RadioButton) view.findViewById(R.id.rbtHusband);
        rbtWife = (RadioButton) view.findViewById(R.id.rbtWife);

        imgBack_01.setOnClickListener(this);
        rbtHusband.setOnCheckedChangeListener(this);
        rbtWife.setOnCheckedChangeListener(this);

    }
    private void setFindInentify(String findInentify){
        ((GuideActivity) getActivity()).getUserGuideInfo().setFindIdentity(findInentify);
    }
    @Override
    public void onCheckedChanged(CompoundButton buttonView, boolean isChecked) {
        if (isChecked) {
            switch (buttonView.getId()){
                case R.id.rbtHusband:
                    setFindInentify("husband");
                    break;
                case R.id.rbtWife:
                    setFindInentify("wife");
                    break;
            }
            new Handler().postDelayed(new Runnable() {
                @Override
                public void run() {
                    ((GuideActivity) getActivity()).getmViewPager().setCurrentItem(5);
                }
            }, 100);
        }
    }
}
