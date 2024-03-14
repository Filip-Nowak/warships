package org.example.warships.controller;

import lombok.RequiredArgsConstructor;

import org.example.warships.model.RequestModel;
import org.example.warships.model.ResponseModel;
import org.example.warships.model.RoomModel;
import org.example.warships.service.RoomService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class RoomController {
    private final RoomService roomService;
    @GetMapping("/test")
    public String test(){
        return "xd";
    }
    @PostMapping("/createRoom")
    public ResponseEntity<ResponseModel> createRoom(@RequestBody RequestModel requestModel){
        String id=roomService.createRoom(requestModel.getUsername());
        ResponseModel responseModel = ResponseModel.builder().id(id).build();
        return ResponseEntity.ok(responseModel);
    }
    @GetMapping("/getRoom/{id}")
    public ResponseEntity<RoomModel> getRoom(@PathVariable String id){
        return ResponseEntity.ok(roomService.getRoom(id));
    }
    @PostMapping("/joinRoom")
    public ResponseEntity<ResponseModel> joinRoom(@RequestBody RequestModel requestModel){
        if(roomService.joinRoom(requestModel.getId(), requestModel.getUsername())){
            return ResponseEntity.ok(ResponseModel.builder().id(requestModel.getId()).build());
        }
        return ResponseEntity.ok(ResponseModel.builder().error("couldn't join").build());
    }
}
