package com.velsis.velsis_api.exception;

public class UserNotFoundException extends RuntimeException {

    public UserNotFoundException(Long id) {
        super("Usuário não encontrado");
    }
}