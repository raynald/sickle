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
public class Fragment03_2 extends Fragment implements View.OnClickListener, CompoundButton.OnCheckedChangeListener {
    private View view;
    private RadioButton rbtSon_in_law;
    private RadioButton rbtDaughter_in_law;
    private ImageView imgBack_02;

    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        super.onCreateView(inflater, container, savedInstanceState);
        view = inflater.inflate(R.layout.fragment03_2, container, false);
        return view;
    }

    @Override
    public void onStart() {
        super.onStart();
        imgBack_02 = (ImageView) view.findViewById(R.id.imgBack_02);
        rbtDaughter_in_law = (RadioButton) view.findViewById(R.id.rbtDaughter_in_law);
        rbtSon_in_law = (RadioButton) view.findViewById(R.id.rbtSon_in_law);

        imgBack_02.setOnClickListener(this);
        rbtSon_in_law.setOnCheckedChangeListener(this);
        rbtDaughter_in_law.setOnCheckedChangeListener(this);

    }

    @Override
    public void onClick(View v) {
            new Handler().postDelayed(new Runnable() {
                @Override
                public void run() {
                    ((GuideActivity) getActivity()).getmViewPager().setCurrentItem(3);
                }
            },100);
    }
    private void setFindInentify(String findInentify){
        ((GuideActivity) getActivity()).getUserGuideInfo().setFindIdentity(findInentify);
    }
    @Override
    public void onCheckedChanged(CompoundButton buttonView, boolean isChecked) {
        if (isChecked){
            switch (buttonView.getId()){
                case R.id.rbtDaughter_in_law:
                    setFindInentify("daughter_in_law");
                    break;
                case R.id.rbtSon_in_law:
                    setFindInentify("son_in_law");
                    break;
            }
            new Handler().postDelayed(new Runnable() {
                @Override
                public void run() {
                    ((GuideActivity)getActivity()).getmViewPager().setCurrentItem(5);
                }
            },100);
        }
    }
}
