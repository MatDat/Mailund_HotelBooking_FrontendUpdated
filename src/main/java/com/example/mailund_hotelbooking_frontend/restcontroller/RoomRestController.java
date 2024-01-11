package com.example.mailund_hotelbooking_frontend.restcontroller;

import com.example.mailund_hotelbooking_frontend.model.Room;
import com.example.mailund_hotelbooking_frontend.service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
public class RoomRestController {

    @Autowired
    RoomService roomService;

    @PostMapping("addRoom")
    private ResponseEntity<Room> addRoom(@RequestBody Room room){
        return roomService.saveRoom(room);
    }
}
