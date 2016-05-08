package io.cordova.hellocordova.Guide;

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

import java.util.ArrayList;
import java.util.List;

import io.cordova.hellocordova.R;


/**
 * Created by jiefly on 2016/3/23.
 */
public class Fragment08 extends Fragment implements CompoundButton.OnCheckedChangeListener, View.OnClickListener, View.OnFocusChangeListener {
    private View view;
    private GuideViewData mGuideViewData;
    private List<Integer> chooseItem;
    private CheckBox chooseChk01, chooseChk02, chooseChk03, chooseChk04, chooseChk05, chooseChk06, chooseChk07, chooseChk08, chooseChk09, chooseChk10, chooseChk11, chooseChk12;
    private Button btnSkip, btnSava;
    private boolean isFirst = true;
    private EditText edtSetsupplement;

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        super.onCreateView(inflater, container, savedInstanceState);
        view = inflater.inflate(R.layout.fragment08, container, false);
        return view;
    }

    @Override
    public void onStart() {
        super.onStart();
        initCheckBox();
        initButton();
        initData();
        edtSetsupplement = (EditText) view.findViewById(R.id.edtSetSupplement);
        edtSetsupplement.setOnFocusChangeListener(this);
        Log.i("jiefly", mGuideViewData.getChooseItem().size() + "");
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
        int i = 12;
        while (i-- != 0)
            chooseItem.add(0);
        mGuideViewData.setChooseItem(chooseItem);
    }

    private void initCheckBox() {

        chooseChk01 = (CheckBox) view.findViewById(R.id.chooseChk01);
        chooseChk02 = (CheckBox) view.findViewById(R.id.chooseChk02);
        chooseChk03 = (CheckBox) view.findViewById(R.id.chooseChk03);
        chooseChk04 = (CheckBox) view.findViewById(R.id.chooseChk04);
        chooseChk05 = (CheckBox) view.findViewById(R.id.chooseChk05);
        chooseChk06 = (CheckBox) view.findViewById(R.id.chooseChk06);
        chooseChk07 = (CheckBox) view.findViewById(R.id.chooseChk07);
        chooseChk08 = (CheckBox) view.findViewById(R.id.chooseChk08);
        chooseChk09 = (CheckBox) view.findViewById(R.id.chooseChk09);
        chooseChk10 = (CheckBox) view.findViewById(R.id.chooseChk10);
        chooseChk11 = (CheckBox) view.findViewById(R.id.chooseChk11);
        chooseChk12 = (CheckBox) view.findViewById(R.id.chooseChk12);

        chooseChk01.setOnCheckedChangeListener(this);
        chooseChk02.setOnCheckedChangeListener(this);
        chooseChk03.setOnCheckedChangeListener(this);
        chooseChk04.setOnCheckedChangeListener(this);
        chooseChk05.setOnCheckedChangeListener(this);
        chooseChk06.setOnCheckedChangeListener(this);
        chooseChk07.setOnCheckedChangeListener(this);
        chooseChk08.setOnCheckedChangeListener(this);
        chooseChk09.setOnCheckedChangeListener(this);
        chooseChk10.setOnCheckedChangeListener(this);
        chooseChk11.setOnCheckedChangeListener(this);
        chooseChk12.setOnCheckedChangeListener(this);
    }


    @Override
    public void onCheckedChanged(CompoundButton buttonView, boolean isChecked) {
        switch (buttonView.getId()) {
            case R.id.chooseChk01:
                setChooseItem(0, isChecked);
                break;
            case R.id.chooseChk02:
                setChooseItem(1, isChecked);
                break;
            case R.id.chooseChk03:
                setChooseItem(2, isChecked);
                break;
            case R.id.chooseChk04:
                setChooseItem(3, isChecked);
                break;
            case R.id.chooseChk05:
                setChooseItem(4, isChecked);
                break;
            case R.id.chooseChk06:
                setChooseItem(5, isChecked);
                break;
            case R.id.chooseChk07:
                setChooseItem(6, isChecked);
                break;
            case R.id.chooseChk08:
                setChooseItem(7, isChecked);
                break;
            case R.id.chooseChk09:
                setChooseItem(8, isChecked);
                break;
            case R.id.chooseChk10:
                setChooseItem(9, isChecked);
                break;
            case R.id.chooseChk11:
                setChooseItem(10, isChecked);
                break;
            case R.id.chooseChk12:
                setChooseItem(11, isChecked);
                break;
        }
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
                    System.out.print("|_" + x + "_|");
                break;
            case R.id.btnSkip:
                break;
        }
    }
    @Override
    public void onFocusChange(View v, boolean hasFocus) {
        if (hasFocus){
            if (isFirst){
                edtSetsupplement.setText("");
                isFirst = false;
            }
        }
    }
}

