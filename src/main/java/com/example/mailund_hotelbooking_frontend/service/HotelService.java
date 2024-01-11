package com.example.mailund_hotelbooking_frontend.service;

import com.example.mailund_hotelbooking_frontend.model.Hotel;
import com.example.mailund_hotelbooking_frontend.repository.HotelRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class HotelService {

    @Autowired
    HotelRepo hotelRepo;

    public ResponseEntity<Hotel> saveHotel(Hotel hotel){
        hotelRepo.save(hotel);
        return ResponseEntity.ok(hotel);
    }
}
