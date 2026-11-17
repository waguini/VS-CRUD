package com.velsis.velsis_api.repository;

import com.velsis.velsis_api.entity.UserEntity;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface UserRepository extends CrudRepository<UserEntity, Long> {

    @Override
    List<UserEntity> findAll();

    @Override
    UserEntity save(UserEntity entity);


}
