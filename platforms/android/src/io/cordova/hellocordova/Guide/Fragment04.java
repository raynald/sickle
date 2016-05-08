package io.cordova.hellocordova.Guide;

import android.content.Context;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v4.app.Fragment;
import android.util.DisplayMetrics;
import android.util.Log;
import android.view.Gravity;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.PopupWindow;
import android.widget.RelativeLayout;
import android.widget.TextView;

import io.cordova.hellocordova.R;
import io.cordova.hellocordova.Guide.widget.OnWheelChangedListener;
import io.cordova.hellocordova.Guide.widget.OnWheelScrollListener;
import io.cordova.hellocordova.Guide.widget.WheelView;
import io.cordova.hellocordova.Guide.widget.adapters.AbstractWheelTextAdapter;
import io.cordova.hellocordova.Guide.widget.adapters.ArrayWheelAdapter;


/**
 * Created by jiefly on 2016/3/23.
 *        Fighting_jiiiiie
 */
public class Fragment04 extends Fragment {
    RelativeLayout test_pop_layout;
    int width, height;
    private Button btn_choose_city, btn_ok,btn_cancle;
    private View view;
    private Context context;
    private boolean scrolling = false;
    private TextView tv_city_name,tv_choose_city;

    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        super.onCreateView(inflater, container, savedInstanceState);
        return view =inflater.inflate(R.layout.fragment04,container,false);
    }
    @Override
    public void onStart() {
        super.onStart();
        // 获取屏幕的高度和宽度
        DisplayMetrics displayMetrics = getResources().getDisplayMetrics();
        width = displayMetrics.widthPixels;
        height = displayMetrics.heightPixels;
        tv_choose_city = (TextView) view.findViewById(R.id.tv_choose_city);

        // 获取弹出的layout
        test_pop_layout = (RelativeLayout) view.findViewById(R.id.rl_fragment04);
       /* tt = (TextView) view.findViewById(R.id.tpop2_tv);*/


        btn_choose_city = (Button) view.findViewById(R.id.btn_choose_city);
        btn_choose_city.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                // 显示 popupWindow
                PopupWindow popupWindow = makePopupWindow(getActivity());
                int[] xy = new int[2];
                test_pop_layout.getLocationOnScreen(xy);
                popupWindow.setWidth(width);
                popupWindow.setHeight(height);
                popupWindow.showAtLocation(test_pop_layout, Gravity.CENTER_VERTICAL, 0, 0);
            }
        });
    }

    // 创建一个包含自定义view的PopupWindow
    private PopupWindow makePopupWindow(Context cx) {
        final PopupWindow window;
        window = new PopupWindow(cx);

        View contentView = LayoutInflater.from(getActivity()).inflate(R.layout.cities_layout, null);
        window.setContentView(contentView);


        tv_city_name = (TextView) contentView.findViewById(R.id.tv_cityName);

        final WheelView country = (WheelView) contentView.findViewById(R.id.country);
       // country.setVisibleItems(4);
        // country.setCurrentItem(0);
        country.setViewAdapter(new CountryAdapter(getActivity()));
        final String cities[][] = AddressData.CITIES;
        final WheelView city = (WheelView) contentView.findViewById(R.id.city);
        // city.setVisibleItems(3);
        // city.setCurrentItem(0);

        country.addChangingListener(new OnWheelChangedListener() {
            public void onChanged(WheelView wheel, int oldValue, int newValue) {
                if (!scrolling) {
                    updateCities(city, cities, newValue);
                }
            }
        });

        country.addScrollingListener(new OnWheelScrollListener() {
            public void onScrollingStarted(WheelView wheel) {
                scrolling = true;
            }

            public void onScrollingFinished(WheelView wheel) {
                scrolling = false;
                updateCities(city, cities, country.getCurrentItem());

                tv_city_name.setText(AddressData.PROVINCES[country.getCurrentItem()]);
            }
        });

        city.addScrollingListener(new OnWheelScrollListener() {
            public void onScrollingStarted(WheelView wheel) {
                scrolling = true;
            }

            public void onScrollingFinished(WheelView wheel) {
                scrolling = false;
                //updatecCities(ccity, ccities, country.getCurrentItem(), city.getCurrentItem());

                tv_city_name.setText(
                        AddressData.PROVINCES[country.getCurrentItem()] + "-" +
                                AddressData.CITIES[country.getCurrentItem()][city.getCurrentItem()]);

            }
        });

        // 点击事件处理
        btn_ok = (Button) contentView.findViewById(R.id.button_ok);
        btn_ok.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                /*tt.setText(AddressData.PROVINCES[country.getCurrentItem()] + "-" +
                                AddressData.CITIES[country.getCurrentItem()][city.getCurrentItem()] + "-"*/
                Log.i("jiefly", AddressData.PROVINCES[country.getCurrentItem()] + "-" +
                        AddressData.CITIES[country.getCurrentItem()][city.getCurrentItem()]);
                //AddressData.COUNTIES[country.getCurrentItem()][city.getCurrentItem()][ccity.getCurrentItem()]
                tv_choose_city.setText(AddressData.CITIES[country.getCurrentItem()][city.getCurrentItem()]);
                //保存选择的城市
                ((GuideActivity)getActivity()).getUserGuideInfo().setFindCity(AddressData.CITIES[country.getCurrentItem()][city.getCurrentItem()]);
                window.dismiss(); // 隐藏
            }
        });
        btn_cancle = (Button) contentView.findViewById(R.id.button_cancel);
        btn_cancle.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                window.dismiss();
            }
        });


        // window.setWidth(width);
        // window.setHeight(height / 2);


        // 设置PopupWindow外部区域是否可触摸

        window.setFocusable(true); //设置PopupWindow可获得焦点
        window.setTouchable(true); //设置PopupWindow可触摸
        window.setOutsideTouchable(false); //设置非PopupWindow区域可触摸
        return window;
    }

    /**
     * Updates the city wheel
     */
    private void updateCities(WheelView city, String cities[][], int index) {
        ArrayWheelAdapter<String> adapter =
                new ArrayWheelAdapter<String>(getActivity(), cities[index]);
        adapter.setTextSize(18);
        city.setViewAdapter(adapter);
//        city.setCurrentItem(cities[index].length / 2);
        city.setCurrentItem(0);
    }

    /**
     * Updates the ccity wheel
     */
    private void updatecCities(WheelView city, String ccities[][][], int index, int index2) {
        ArrayWheelAdapter<String> adapter =
                new ArrayWheelAdapter<String>(this.getActivity(), ccities[index][index2]);
        adapter.setTextSize(18);
        city.setViewAdapter(adapter);
        city.setCurrentItem(ccities[index][index2].length / 2);
    }

    /**
     * Adapter for countries
     */
    private class CountryAdapter extends AbstractWheelTextAdapter {
        // Countries names
        private String countries[] = AddressData.PROVINCES;

        /**
         * Constructor
         */
        protected CountryAdapter(Context context) {
            super(context, R.layout.country_layout, NO_RESOURCE);

            setItemTextResource(R.id.country_name);
        }



        @Override
        public View getItem(int index, View cachedView, ViewGroup parent) {
            View view = super.getItem(index, cachedView, parent);
            return view;
        }

        @Override
        public int getItemsCount() {
            return countries.length;
        }

        @Override
        protected CharSequence getItemText(int index) {
            return countries[index];
        }
    }
}
