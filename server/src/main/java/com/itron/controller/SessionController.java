package com.itron.controller;

import javax.annotation.Resource;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.itron.model.Session;
import com.itron.service.impl.SessionService;

@Controller
@RequestMapping(value = { "/Sessions" })
public class SessionController {
    @Resource
    private SessionService sessionService;

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ResponseEntity<Session> get(@PathVariable long id) {

        Session session = sessionService.get(id);
        return new ResponseEntity<>(session, HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<Session[]> list(@RequestParam(required = false) String orderby,
            @RequestParam(required = false) Integer limit, @RequestParam(required = false) Integer offset) {

        Session[] sessions = sessionService.list(orderby, offset, limit).toArray(new Session[] {});

        return new ResponseEntity<>(sessions, HttpStatus.OK);
    }

}