package io.cordova.hellocordova.Guide;

import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentActivity;
import android.support.v4.view.ViewPager;

import java.util.ArrayList;
import java.util.List;

import io.cordova.hellocordova.R;

public class GuideActivity extends FragmentActivity implements ViewPager.OnPageChangeListener {
    private ViewPager mViewPager;
    private CustomFragmentPageAdapter mFragmentPageAdapter;
    private List<Fragment> mFragmentList = new ArrayList<Fragment>();
    private UserGuideInfo mUserGuideInfo;

    private Fragment01 mFragment01;
    private Fragment02 mFragment02;
    private Fragment03 mFragment03;
    private Fragment03_1 mFragment03_1;
    private Fragment03_2 mFragment03_2;
    private Fragment04 mFragment04;
    private Fragment05 mFragment05;
    private Fragment06 mFragment06;
    private Fragment07 mFragment07;
    private Fragment08 mFragment08;
    private Fragment09 mFragment09;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_guide);
        mViewPager = (ViewPager) findViewById(R.id.id_first_vp);

        mFragment01 = new Fragment01();
        mFragment02 = new Fragment02();
        mFragment03 = new Fragment03();
        mFragment03_1 = new Fragment03_1();
        mFragment03_2 = new Fragment03_2();
        mFragment04 = new Fragment04();
        mFragment05 = new Fragment05();
        mFragment06 = new Fragment06();
        mFragment07 = new Fragment07();
        mFragment08 = new Fragment08();
        mFragment09 = new Fragment09();

        mFragmentList.add(mFragment01);
        mFragmentList.add(mFragment02);
        mFragmentList.add(mFragment03);
        mFragmentList.add(mFragment03_1);
        mFragmentList.add(mFragment03_2);
        mFragmentList.add(mFragment04);
        mFragmentList.add(mFragment05);
        mFragmentList.add(mFragment06);
        mFragmentList.add(mFragment07);
        mFragmentList.add(mFragment08);
        mFragmentList.add(mFragment09);

        mFragmentPageAdapter = new CustomFragmentPageAdapter(getSupportFragmentManager(), mFragmentList);
        mViewPager.setAdapter(mFragmentPageAdapter);
        mViewPager.setCurrentItem(0);
        mViewPager.addOnPageChangeListener(this);

        mUserGuideInfo = UserGuideInfo.getInstance();
    }

    @Override
    public void onPageScrolled(int position, float positionOffset, int positionOffsetPixels) {

    }

    public UserGuideInfo getUserGuideInfo() {
        return mUserGuideInfo;
    }

    @Override
    public void onPageSelected(int position) {


    }
    public ViewPager getmViewPager() {
        return mViewPager;
    }
    @Override
    public void onPageScrollStateChanged(int state) {

    }
}
