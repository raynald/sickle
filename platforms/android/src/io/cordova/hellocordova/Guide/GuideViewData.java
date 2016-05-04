package io.cordova.hellocordova.Guide;

import java.util.List;

/**
 * Created by jiefly on 2016/4/7.
 * Fighting_jiiiiie
 */
public class GuideViewData {
    public List<Integer> getChooseItem() {
        return chooseItem;
    }

    public void setChooseItem(List<Integer> chooseItem) {
        this.chooseItem = chooseItem;
    }

    private List<Integer> chooseItem;
    private static GuideViewData mGuideViewData = null;
    private GuideViewData(){}
    public  static synchronized GuideViewData getInstance(){
        if(mGuideViewData==null) {
            synchronized (GuideViewData.class){
                if (mGuideViewData==null)
                    mGuideViewData = new GuideViewData();
            }
        }
        return mGuideViewData;
    }
}
