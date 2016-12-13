package com.itron.model;

import java.util.Date;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name = "user", catalog = "sickle")
public class User implements java.io.Serializable {
    @Id
    @GeneratedValue(generator = "increment")
    @GenericGenerator(name = "increment", strategy = "increment")
    private Long id;
    // @Column
    private String userName;
    // @Column
    private String password;
    // @Column
    private GenderEnum gender;
    // @Column
    private String lastName;
    // @Column
    private String mobile;
    @Transient
    private GenderEnum targetGender;// Transient
    // @Column
    private GenderEnum childGender;
    // @Column
    private String childName;
    // private childAvatar": "img/mike.png",
    // @Column
    private String childJob;
    @Embedded
    private Address childAddress;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "childBirthday")
    private Date childBirthday;
    // @Column
    private String childDegree;
    // @Column
    private Integer childHeight;// cm
    // //@Column
    private Date creationTime;

    @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinTable(name = "USERSELFTAG", catalog = "sickle", joinColumns = {
            @JoinColumn(name = "userId", nullable = false, updatable = false) }, inverseJoinColumns = {
                    @JoinColumn(name = "selfTagId", nullable = false, updatable = false) })
    private Set<SelfTag> childTags;

    @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinTable(name = "USERTARGETTAG", catalog = "sickle", joinColumns = {
            @JoinColumn(name = "userId", nullable = false, updatable = false) }, inverseJoinColumns = {
                    @JoinColumn(name = "targetTagId", nullable = false, updatable = false) })
    private Set<TargetTag> childTargetTags;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "USERSUBSCRIBE", joinColumns = { @JoinColumn(name = "userId") }, inverseJoinColumns = {
            @JoinColumn(name = "subscribeUserId") })
    private Set<User> subscribeUsers;

    @ManyToMany(fetch = FetchType.LAZY, mappedBy = "subscribeUsers")
    private Set<User> subscribedUsers;

    /**
     * @return the subscribeUsers
     */
    public Set<User> getSubscribeUsers() {
        return subscribeUsers;
    }

    /**
     * @param subscribeUsers
     *            the subscribeUsers to set
     */
    public void setSubscribeUsers(Set<User> subscribeUsers) {
        this.subscribeUsers = subscribeUsers;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public GenderEnum getGender() {
        return gender;
    }

    public void setGender(GenderEnum gender) {
        this.gender = gender;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public GenderEnum getTargetGender() {
        return targetGender;
    }

    public void setTargetGender(GenderEnum targetGender) {
        this.targetGender = targetGender;
    }

    public GenderEnum getChildGender() {
        return childGender;
    }

    public void setChildGender(GenderEnum childGender) {
        this.childGender = childGender;
    }

    public String getChildName() {
        return childName;
    }

    public void setChildName(String childName) {
        this.childName = childName;
    }

    public String getChildJob() {
        return childJob;
    }

    public void setChildJob(String childJob) {
        this.childJob = childJob;
    }

    public Address getChildAddress() {
        return childAddress;
    }

    public void setChildAddress(Address childAddress) {
        this.childAddress = childAddress;
    }

    public Date getChildBirthday() {
        return childBirthday;
    }

    public void setChildBirthday(Date childBirthday) {
        this.childBirthday = childBirthday;
    }

    public String getChildDegree() {
        return childDegree;
    }

    public void setChildDegree(String childDegree) {
        this.childDegree = childDegree;
    }

    public Integer getChildHeight() {
        return childHeight;
    }

    public void setChildHeight(Integer childHeight) {
        this.childHeight = childHeight;
    }

    /**
     * @return the childTags
     */
    public Set<SelfTag> getChildTags() {
        return childTags;
    }

    /**
     * @param childTags
     *            the childTags to set
     */
    public void setChildTags(Set<SelfTag> childTags) {
        this.childTags = childTags;
    }

    /**
     * @return the childTargetTags
     */
    public Set<TargetTag> getChildTargetTags() {
        return childTargetTags;
    }

    /**
     * @param childTargetTags
     *            the childTargetTags to set
     */
    public void setChildTargetTags(Set<TargetTag> childTargetTags) {
        this.childTargetTags = childTargetTags;
    }

    public Date getCreationTime() {
        return creationTime;
    }

    public void setCreationTime(Date creationTime) {
        this.creationTime = creationTime;
    }

    public Set<User> getSubscribedUsers() {
        return subscribedUsers;
    }

    public void setSubscribedUsers(Set<User> subscribedUsers) {
        this.subscribedUsers = subscribedUsers;
    }
}
