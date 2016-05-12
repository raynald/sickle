package io.cordova.hellocordova.Guide;

import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import io.cordova.hellocordova.R;


/**
 * Created by jiefly on 2016/3/23.
 */
public class Fragment06 extends Fragment {
    private View view;
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        super.onCreateView(inflater, container, savedInstanceState);
        view = inflater.inflate(R.layout.fragment06, container, false);
        return view;
    }
}
