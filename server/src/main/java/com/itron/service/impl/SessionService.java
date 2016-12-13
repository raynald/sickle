/**
 * 
 */
package com.itron.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.itron.dao.BaseDaoI;
import com.itron.model.Session;

@Transactional
@Service("sessionService")
public class SessionService {
    @Resource
    private BaseDaoI<Session> baseDao;

    public Session get(Long id) {
        return baseDao.get(id);
    }

    public List<Session> list(String sortBy, int page, int rows) {
        return baseDao.find("select * from Session sort by " + sortBy, page, rows);
    }
}
