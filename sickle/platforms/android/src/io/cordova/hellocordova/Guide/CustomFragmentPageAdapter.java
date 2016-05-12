package io.cordova.hellocordova.Guide;

import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentManager;
import android.support.v4.app.FragmentPagerAdapter;

import java.util.List;

/**
 * Created by jiefly on 2016/3/23.
 */
public class CustomFragmentPageAdapter extends FragmentPagerAdapter {
    private List<Fragment> mFragment;


    public CustomFragmentPageAdapter(FragmentManager fm) {
        super(fm);
    }

    public CustomFragmentPageAdapter(FragmentManager fm, List<Fragment> mFragment) {
        super(fm);
        this.mFragment = mFragment;
    }

    @Override
    public Fragment getItem(int position) {
        return mFragment.get(position);
    }

    @Override
    public int getCount() {
        return mFragment.size();
    }
}
