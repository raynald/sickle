package io.cordova.hellocordova.Guide;

import android.content.Intent;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.CheckBox;
import android.widget.CompoundButton;
import android.widget.EditText;
import android.widget.Toast;

import java.util.ArrayList;
import java.util.List;

import io.cordova.hellocordova.MainActivity;
import io.cordova.hellocordova.R;


/**
 * Created by jiefly on 2016/3/23.
 */
public class Fragment09 extends Fragment implements CompoundButton.OnCheckedChangeListener, View.OnClickListener, View.OnFocusChangeListener {
    private View view;
    private GuideViewData mGuideViewData;
    private List<Integer> chooseItem;
    private CheckBox chkFind01, chkFind02, chkFind03, chkFind04, chkFind05, chkFind06, chkFind07, chkFind08, chkFind09, chkFind10, chkFind11, chkFind12, chkFind13, chkFind14, chkFind15;
    private Button btnSkip, btnSava;
    private int chooseCount = 0;
    private boolean isFirst = true;
    private EditText edtFindSupplement;

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        super.onCreateView(inflater, container, savedInstanceState);
        view = inflater.inflate(R.layout.fragment09, container, false);
        return view;
    }

    @Override
    public void onStart() {
        super.onStart();
        initCheckBox();
        initButton();
        initData();
        edtFindSupplement = (EditText) view.findViewById(R.id.edtFindsupplement);
        edtFindSupplement.setOnFocusChangeListener(this);

    }

    private void initCheckBox() {

        chkFind01 = (CheckBox) view.findViewById(R.id.chkFind01);
        chkFind02 = (CheckBox) view.findViewById(R.id.chkFind02);
        chkFind03 = (CheckBox) view.findViewById(R.id.chkFind03);
        chkFind04 = (CheckBox) view.findViewById(R.id.chkFind04);
        chkFind05 = (CheckBox) view.findViewById(R.id.chkFind05);
        chkFind06 = (CheckBox) view.findViewById(R.id.chkFind06);
        chkFind07 = (CheckBox) view.findViewById(R.id.chkFind07);
        chkFind08 = (CheckBox) view.findViewById(R.id.chkFind08);
        chkFind09 = (CheckBox) view.findViewById(R.id.chkFind09);
        chkFind10 = (CheckBox) view.findViewById(R.id.chkFind10);
        chkFind11 = (CheckBox) view.findViewById(R.id.chkFind11);
        chkFind12 = (CheckBox) view.findViewById(R.id.chkFind12);
        chkFind13 = (CheckBox) view.findViewById(R.id.chkFind13);
        chkFind14 = (CheckBox) view.findViewById(R.id.chkFind14);
        chkFind15 = (CheckBox) view.findViewById(R.id.chkFind15);

        chkFind01.setOnCheckedChangeListener(this);
        chkFind02.setOnCheckedChangeListener(this);
        chkFind03.setOnCheckedChangeListener(this);
        chkFind04.setOnCheckedChangeListener(this);
        chkFind05.setOnCheckedChangeListener(this);
        chkFind06.setOnCheckedChangeListener(this);
        chkFind07.setOnCheckedChangeListener(this);
        chkFind08.setOnCheckedChangeListener(this);
        chkFind09.setOnCheckedChangeListener(this);
        chkFind10.setOnCheckedChangeListener(this);
        chkFind11.setOnCheckedChangeListener(this);
        chkFind12.setOnCheckedChangeListener(this);
        chkFind13.setOnCheckedChangeListener(this);
        chkFind14.setOnCheckedChangeListener(this);
        chkFind15.setOnCheckedChangeListener(this);
    }

    private void initButton() {
        btnSava = (Button) view.findViewById(R.id.btnSave);
        btnSkip = (Button) view.findViewById(R.id.btnSkip);

        btnSkip.setOnClickListener(this);
        btnSava.setOnClickListener(this);
    }

    private void initData() {
        mGuideViewData = GuideViewData.getInstance();
        chooseItem = new ArrayList<Integer>();
        int i = 15;
        while (i-- != 0)
            chooseItem.add(0);
        mGuideViewData.setChooseItem(chooseItem);
    }

    @Override
    public void onCheckedChanged(CompoundButton buttonView, boolean isChecked) {
        switch (buttonView.getId()) {
            case R.id.chkFind01:
                checkCount(buttonView,0,isChecked);
                break;
            case R.id.chkFind02:
                checkCount(buttonView, 1, isChecked);
                break;
            case R.id.chkFind03:
                checkCount(buttonView, 2, isChecked);
                break;
            case R.id.chkFind04:
                checkCount(buttonView, 3, isChecked);
                break;
            case R.id.chkFind05:
                checkCount(buttonView, 4, isChecked);
                break;
            case R.id.chkFind06:
                checkCount(buttonView, 5, isChecked);
                break;
            case R.id.chkFind07:
                checkCount(buttonView, 6, isChecked);
                break;
            case R.id.chkFind08:
                checkCount(buttonView, 7, isChecked);
                break;
            case R.id.chkFind09:
                checkCount(buttonView, 8, isChecked);
                break;
            case R.id.chkFind10:
                checkCount(buttonView, 9, isChecked);
                break;
            case R.id.chkFind11:
                checkCount(buttonView, 10, isChecked);
                break;
            case R.id.chkFind12:
                checkCount(buttonView, 11, isChecked);
                break;
            case R.id.chkFind13:
                checkCount(buttonView, 12, isChecked);
                break;
            case R.id.chkFind14:
                checkCount(buttonView, 13, isChecked);
                break;
            case R.id.chkFind15:
                checkCount(buttonView,14, isChecked);
                break;
        }
    }

    private void checkCount(CompoundButton buttonView, int num, boolean isChecked) {
        if (chooseCount < 9) {
            changeChooseCount(isChecked);
            setChooseItem(num,isChecked);
        } else if (chooseCount == 9) {
            if (isChecked) {
                buttonView.setChecked(false);
                Toast.makeText(getActivity(), "最多只能选择9项", Toast.LENGTH_SHORT).show();
            } else {
                chooseCount--;
                setChooseItem(num,isChecked);
            }
        } else if (chooseCount>9){
            Log.e("Checkde count err", chooseCount + "");
        }
    }

    private void changeChooseCount(boolean isChecked) {
        if (isChecked)
            chooseCount++;
        else
            chooseCount--;
    }

    private void setChooseItem(int i, boolean isChecked) {
        chooseItem.set(i, isChecked ? 1 : 0);
    }

    @Override
    public void onClick(View v) {
        switch (v.getId()) {
            case R.id.btnSave:
                mGuideViewData.setChooseItem(chooseItem);
                for (Integer x : chooseItem)
                    Log.i("jiefly","|_" + x + "_|");
                break;
            case R.id.btnSkip:
                Log.i("jiefly","Skip button clicked!!!");
                Intent intent = new Intent();
                intent.setClass(getActivity(),MainActivity.class);
                startActivity(intent);
                break;
        }
    }
    @Override
    public void onFocusChange(View v, boolean hasFocus) {
        if (hasFocus){
            if (isFirst){
                edtFindSupplement.setText("");
                isFirst= false;
            }
        }
    }
}
