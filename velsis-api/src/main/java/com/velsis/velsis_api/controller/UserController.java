package com.velsis.velsis_api.controller;

import com.velsis.velsis_api.dto.User;
import com.velsis.velsis_api.dto.ApiResponse;
import com.velsis.velsis_api.exception.UserNotFoundException;
import com.velsis.velsis_api.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {

    private UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/list")
    public ResponseEntity<ApiResponse<List<User>>> getAllUsers() {
        return ResponseEntity.ok(ApiResponse.success("Usuários retornados com sucesso", userService.getUsers()));
    }

    @PostMapping("/add")
    public ResponseEntity<ApiResponse<Void>> createUser(@RequestBody User user) {
        userService.saveUser(user);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.<Void>success("Usuário criado com Sucesso", null));
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<ApiResponse<User>> getUserById(@PathVariable Long id) {
        User user = userService.getUserById(id)
                .orElseThrow(() -> new UserNotFoundException(id));
        return ResponseEntity.ok(ApiResponse.success("Usuário retornado com sucesso", user));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<User>> updateUser(@PathVariable Long id, @RequestBody User user) {
        User updatedUser = userService.updateUser(id, user)
                .orElseThrow(() -> new UserNotFoundException(id));
        return ResponseEntity.ok(ApiResponse.success("Usuário atualizado com sucesso.", updatedUser));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteUserById(@PathVariable Long id) {
        userService.deleteUserbyId(id);
        return ResponseEntity.ok(ApiResponse.<Void>success("User deleted", null));
    }
}
