package org.example.warships.controller;

import lombok.RequiredArgsConstructor;

import org.example.warships.cache.ProfileEntity;
import org.example.warships.messages.ResponseModel;
import org.example.warships.model.UserModel;
import org.example.warships.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@CrossOrigin
public class UserRestController {
    private final UserService userService;
    @GetMapping("/test")
    public String test(){
        return "xd";
    }
    @PostMapping("/createUser")
    public ResponseEntity<ResponseModel> createUser(@RequestBody NicknameHolder userModel){
        ProfileEntity user=userService.createUser(userModel.getNickname());
        return ResponseEntity.ok(ResponseModel.builder().message(user.getId()).build());
    }
}
