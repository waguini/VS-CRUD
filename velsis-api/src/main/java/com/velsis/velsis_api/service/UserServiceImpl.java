package com.velsis.velsis_api.service;

import com.velsis.velsis_api.dto.User;
import com.velsis.velsis_api.entity.UserEntity;
import com.velsis.velsis_api.exception.UserNotFoundException;
import com.velsis.velsis_api.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public List<User> getUsers() {
        return userRepository.findAll().stream()
                .map(this::toUser)
                .collect(Collectors.toList());
    }

    @Override
    public void saveUser(User user) {
        userRepository.save(toEntity(user));
    }

    @Override
    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id).map(this::toUser);
    }

    @Override
    public Optional<User> updateUser(Long id, User user) {
        return userRepository.findById(id).map(entity -> {
            entity.setName(user.getName());
            entity.setBirthDate(user.getBirthDate());
            entity.setDocument(user.getDocument());
            entity.setAddressLine(user.getAddressLine());
            entity.setAddressNumber(user.getAddressNumber());
            entity.setCity(user.getCity());
            entity.setState(user.getState());
            entity.setZip(user.getZip());

            return toUser(userRepository.save(entity));
        });
    }

    @Override
    public void deleteUserbyId(Long id) {
        if (!userRepository.existsById(id)) {
            throw new UserNotFoundException(id);
        }
        userRepository.deleteById(id);
    }

    //mappers
    
    private User toUser(UserEntity entity) {
        return new User(
                entity.getId(),
                entity.getName(),
                entity.getBirthDate(),
                entity.getDocument(),
                entity.getAddressLine(),
                entity.getAddressNumber(),
                entity.getCity(),
                entity.getState(),
                entity.getZip()
        );
    }

    private UserEntity toEntity(User user) {
        return new UserEntity(
                user.getName(),
                user.getBirthDate(),
                user.getDocument(),
                user.getAddressLine(),
                user.getAddressNumber(),
                user.getCity(),
                user.getState(),
                user.getZip()
        );
    }
}
