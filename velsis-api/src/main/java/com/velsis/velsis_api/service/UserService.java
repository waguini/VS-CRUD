package com.velsis.velsis_api.service;

import com.velsis.velsis_api.dto.User;

import java.util.List;
import java.util.Optional;

public interface UserService {


    List<User> getUsers();

    void saveUser(User user);

    Optional<User> getUserById(Long id);

    Optional<User> updateUser(Long id, User user);

    public void deleteUserbyId(Long id);
}
