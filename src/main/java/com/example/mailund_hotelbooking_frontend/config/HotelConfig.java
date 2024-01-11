package com.example.mailund_hotelbooking_frontend.config;

import com.example.mailund_hotelbooking_frontend.model.Hotel;
import com.example.mailund_hotelbooking_frontend.model.Room;
import com.example.mailund_hotelbooking_frontend.repository.HotelRepo;
import com.example.mailund_hotelbooking_frontend.repository.RoomRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Component
public class HotelConfig implements CommandLineRunner {

    @Autowired
    HotelRepo hotelRepo;

    @Autowired
    RoomRepo roomRepo;

    private Hotel createHotel(){
        Hotel hotel = new Hotel();
        hotel.setName("Dummy Hotel");
        hotel.setStreet("Dummy Street 123");
        hotel.setCity("Dummy City");
        hotel.setZip("123");
        hotel.setCountry("Dummy Country");
        hotel.setCreated(LocalDateTime.now());
        hotel.setUpdated(LocalDateTime.now());
        return hotel;
    }

    private Set<Room> createRooms(Hotel hotel){
        Set<Room> rooms = new HashSet<>();
        int countRooms = (int) (Math.random() * 31) +10;

        for (int i = 0; i < countRooms; i++) {
            Room room = new Room();
            room.setRoomNumber(i + 1);
            room.setNumberOfBeds((int) (Math.random() * 4) +1);
            room.setCreated(LocalDateTime.now());
            room.setUpdated(LocalDateTime.now());
            room.setHotel(hotel);

            rooms.add(room);
        }
        return rooms;
    }

    public void initializeDummyHotels(){
        for (int i = 0; i < 250; i++) {
            Hotel hotel = createHotel();
            Set<Room> rooms = createRooms(hotel);
            hotel.setRooms(rooms);
            hotelRepo.save(hotel);
        }
    }

    @Override
    public void run(String... args) throws Exception {
        initializeDummyHotels();
    }
}
