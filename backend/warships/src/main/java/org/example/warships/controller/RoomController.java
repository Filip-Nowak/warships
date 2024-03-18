package org.example.warships.controller;

import lombok.RequiredArgsConstructor;

import org.example.warships.model.RequestModel;
import org.example.warships.model.ResponseModel;
import org.example.warships.model.RoomModel;
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
//    @PostMapping("/createRoom")
//    public ResponseEntity<ResponseModel> createRoom(@RequestBody RequestModel requestModel){
//        UserModel user =roomService.createUser(requestModel.getUser().getUsername());
//        RoomModel room=roomService.createRoom(user);
//        ResponseModel responseModel = ResponseModel.builder().room(room).user(user).build();
//        return ResponseEntity.ok(responseModel);
//    }
//    @GetMapping("/getRoom/{id}")
//    public ResponseEntity<RoomModel> getRoom(@PathVariable String id){
//        return ResponseEntity.ok(roomService.getRoom(id));
//    }
//    @PostMapping("/joinRoom")
//    public ResponseEntity<ResponseModel> joinRoom(@RequestBody RequestModel requestModel){
//        if(roomService.joinRoom(requestModel.getRoom().getId(), requestModel.getUser().getUsername())){
//            RoomModel room = roomService.getRoom(requestModel.getRoom().getId());
//            return ResponseEntity.ok(ResponseModel.builder().room(room).user(room.getGuest()).build());
//        }
//        return ResponseEntity.ok(ResponseModel.builder().error("couldn't join").build());
//    }
    @PostMapping("/createUser")
    public ResponseEntity<ResponseModel> createUser(@RequestBody UserModel userModel){
        return ResponseEntity.ok(ResponseModel.builder().user(roomService.createUser(userModel.getUsername())).build());
    }
}
