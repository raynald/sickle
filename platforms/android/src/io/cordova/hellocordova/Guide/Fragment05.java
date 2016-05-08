package io.cordova.hellocordova.Guide;

import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.CompoundButton;
import android.widget.EditText;
import android.widget.RadioButton;

import io.cordova.hellocordova.R;


/**
 * Created by jiefly on 2016/3/23.
 */
public class Fragment05 extends Fragment implements CompoundButton.OnCheckedChangeListener {
    private RadioButton rbtnMan, rbtnWoman;
    private EditText edtFirstName;
    private View view;

    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        super.onCreateView(inflater, container, savedInstanceState);
        view = inflater.inflate(R.layout.fragment05, container, false);
        return view;
    }

    @Override
    public void onStart() {
        super.onStart();
        rbtnMan = (RadioButton) view.findViewById(R.id.rbtnMan);
        rbtnWoman = (RadioButton) view.findViewById(R.id.rbtnWoman);
        edtFirstName = (EditText) view.findViewById(R.id.edtFirstName);

        rbtnMan.setOnCheckedChangeListener(this);
        rbtnWoman.setOnCheckedChangeListener(this);
    }

    @Override
    public void onCheckedChanged(CompoundButton buttonView, boolean isChecked) {
        if (isChecked){
            switch (buttonView.getId()){
                case R.id.rbtnWoman:
                    break;
                case R.id.rbtnMan:
                    break;
                default:
                    break;
            }
        }
    }
    private void setUserFirstNameAndSex(String userFirstName , String sex){
        ((GuideActivity) getActivity()).getUserGuideInfo().setFirstName(userFirstName);
        ((GuideActivity) getActivity()).getUserGuideInfo().setPersonalSex(sex);
    }
}
