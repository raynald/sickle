/**
 * 
 */
package com.itron.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.itron.dao.BaseDaoI;
import com.itron.model.User;

@Transactional
@Service("userService")
public class UserService {

    @Resource
    private BaseDaoI<User> baseDao;

    public User get(Long id) {
        return baseDao.get(id);
    }

    /**
     * 
     * @param sortBy
     *            like "creationTime desc"
     * @param page
     * @param rows
     * @return
     */
    public List<User> list(String sortBy, int page, int rows) {
        return baseDao.find("select * from User sort by " + sortBy, page, rows);
    }

}
