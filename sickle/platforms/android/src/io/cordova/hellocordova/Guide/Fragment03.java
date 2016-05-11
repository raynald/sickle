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
public class Fragment03 extends Fragment implements CompoundButton.OnCheckedChangeListener, View.OnClickListener {
    private View view;
    private RadioButton rbtParents;
    private RadioButton rbtSelf;
    private ImageView imgBack;
    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        super.onCreateView(inflater, container, savedInstanceState);
        view = inflater.inflate(R.layout.fragment03, container, false);
        return view;
    }

    @Override
    public void onStart() {
        super.onStart();
        rbtParents = (RadioButton) view.findViewById(R.id.rbtParent);
        rbtSelf = (RadioButton) view.findViewById(R.id.rbtSelf);

        imgBack = (ImageView) view.findViewById(R.id.imgBack);

        imgBack.setOnClickListener(this);

        rbtSelf.setOnCheckedChangeListener(this);
        rbtParents.setOnCheckedChangeListener(this);
    }

    @Override
    public void onCheckedChanged(CompoundButton buttonView, boolean isChecked) {
        if (isChecked) {
            switch (buttonView.getId()){
                case R.id.rbtParent:
                    setUserInentify("parents");
                    new Handler().postDelayed(new Runnable() {
                        @Override
                        public void run() {
                            gotoNextPage(2);
                        }
                    },200);
                    break;
                case R.id.rbtSelf:
                    setUserInentify("self");
                    new Handler().postDelayed(new Runnable() {
                        @Override
                        public void run() {
                            gotoNextPage(1);
                        }
                    },200);
                    break;
                default:
                    break;
            }
        }
    }

    private void gotoNextPage(int i) {

            int currentItem = ((GuideActivity) getActivity()).getmViewPager().getCurrentItem();
            ((GuideActivity) getActivity()).getmViewPager().setCurrentItem(currentItem + i);
    }

    private void setUserInentify(String userInentify){
        ((GuideActivity) getActivity()).getUserGuideInfo().setIdentity(userInentify);
    }
    @Override
    public void onClick(View v) {
        switch (v.getId()){
            case R.id.imgBack:
                gotoNextPage(-1);
        }
    }
}
