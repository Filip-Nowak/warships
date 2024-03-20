package org.example.warships.controller;

import lombok.RequiredArgsConstructor;

import org.example.warships.model.ResponseModel;
import org.example.warships.model.UserModel;
import org.example.warships.service.RoomService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@CrossOrigin
public class RoomController {
    private final RoomService roomService;
    @GetMapping("/test")
    public String test(){
        return "xd";
    }
    @PostMapping("/createUser")
    public ResponseEntity<ResponseModel> createUser(@RequestBody UserModel userModel){
        return ResponseEntity.ok(ResponseModel.builder().user(roomService.createUser(userModel.getNickname())).build());
    }
}
