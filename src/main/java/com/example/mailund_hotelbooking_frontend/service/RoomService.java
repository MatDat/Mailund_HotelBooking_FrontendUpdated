package com.example.mailund_hotelbooking_frontend.service;

import com.example.mailund_hotelbooking_frontend.model.Room;
import com.example.mailund_hotelbooking_frontend.repository.RoomRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class RoomService {

    @Autowired
    RoomRepo roomRepo;

    public ResponseEntity<Room> saveRoom(Room room){
        room.setCreated(LocalDateTime.now());
        room.setUpdated(LocalDateTime.now());
        roomRepo.save(room);
        return ResponseEntity.ok(room);
    }
}
