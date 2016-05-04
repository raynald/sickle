package io.cordova.hellocordova.Guide;

import android.net.Uri;

/**
 * Created by jiefly on 2016/5/4.
 * Fighting_jiiiiie
 */
public class UserGuideInfo {
    private volatile static UserGuideInfo instance = null;
    private UserGuideInfo(){}
    public static UserGuideInfo getInstance(){
        if (instance==null){
            synchronized (UserGuideInfo.class){
                if (instance==null){
                    instance = new UserGuideInfo();
                }
            }
        }
        return instance;
    }
    //电话号码
    private String phoneNumber;
    //验证码
    private int securityCode;
    //个人身份
    private String identity;
    //要寻找的人老公/老婆/女婿/儿媳
    private String findIdentity;
    //要寻找的人所在地
    private String findCity;
    //个人姓氏
    private String firstName;
    //个人性别
    private String personalSex;
    //上传头像的URI
    private Uri uploadImage;
    //个人身高
    private int height;
    //出生日期
    private int dateOfBirth;
    //现居地
    private String currentResidence;
    //户籍地址
    private String familyRegister;
    //住房情况
    private String housing;
    //学历
    private String education;
    //单位性质
    private String natureOfWork;
    //职业职务
    private String job;
    //月收入
    private int monthlyIncome;
    //婚姻状况

    public String getMaritalStatus() {
        return maritalStatus;
    }

    public void setMaritalStatus(String maritalStatus) {
        this.maritalStatus = maritalStatus;
    }

    public static void setInstance(UserGuideInfo instance) {
        UserGuideInfo.instance = instance;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public int getSecurityCode() {
        return securityCode;
    }

    public void setSecurityCode(int securityCode) {
        this.securityCode = securityCode;
    }

    public String getIdentity() {
        return identity;
    }

    public void setIdentity(String identity) {
        this.identity = identity;
    }

    public String getFindIdentity() {
        return findIdentity;
    }

    public void setFindIdentity(String findIdentity) {
        this.findIdentity = findIdentity;
    }

    public String getFindCity() {
        return findCity;
    }

    public void setFindCity(String findCity) {
        this.findCity = findCity;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getPersonalSex() {
        return personalSex;
    }

    public void setPersonalSex(String personalSex) {
        this.personalSex = personalSex;
    }

    public Uri getUploadImage() {
        return uploadImage;
    }

    public void setUploadImage(Uri uploadImage) {
        this.uploadImage = uploadImage;
    }

    public int getHeight() {
        return height;
    }

    public void setHeight(int height) {
        this.height = height;
    }

    public int getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(int dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public String getCurrentResidence() {
        return currentResidence;
    }

    public void setCurrentResidence(String currentResidence) {
        this.currentResidence = currentResidence;
    }

    public String getFamilyRegister() {
        return familyRegister;
    }

    public void setFamilyRegister(String familyRegister) {
        this.familyRegister = familyRegister;
    }

    public String getHousing() {
        return housing;
    }

    public void setHousing(String housing) {
        this.housing = housing;
    }

    public String getEducation() {
        return education;
    }

    public void setEducation(String education) {
        this.education = education;
    }

    public String getNatureOfWork() {
        return natureOfWork;
    }

    public void setNatureOfWork(String natureOfWork) {
        this.natureOfWork = natureOfWork;
    }

    public String getJob() {
        return job;
    }

    public void setJob(String job) {
        this.job = job;
    }

    public int getMonthlyIncome() {
        return monthlyIncome;
    }

    public void setMonthlyIncome(int monthlyIncome) {
        this.monthlyIncome = monthlyIncome;
    }

    private String maritalStatus;
}
