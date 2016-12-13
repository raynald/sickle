package com.itron.controller;

import javax.annotation.Resource;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.itron.model.User;
import com.itron.service.impl.UserService;

@Controller
@RequestMapping(value = { "/Users" })
public class UserController {
    @Resource
    private UserService userService;

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ResponseEntity<User> get(@PathVariable long id) {

        User user = userService.get(id);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<User[]> list(@RequestParam(required = false) String orderby,
            @RequestParam(required = false) Integer limit, @RequestParam(required = false) Integer offset) {

        User[] users = userService.list(orderby, offset, limit).toArray(new User[] {});

        return new ResponseEntity<>(users, HttpStatus.OK);
    }

}