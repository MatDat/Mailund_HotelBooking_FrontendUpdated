package com.example.mailund_hotelbooking_frontend.repository;

import com.example.mailund_hotelbooking_frontend.model.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoomRepo extends JpaRepository<Room, Integer> {
}
