package com.example.mailund_hotelbooking_frontend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.Set;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Table(name = "hotel")
public class Hotel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "hotel_id")
    private int hotelId;

    private String name;

    private String street;

    private String city;

    private String zip;

    private String country;

    private LocalDateTime created;

    private LocalDateTime updated;

    @OneToMany(mappedBy = "hotel")
    private Set<Room> rooms;
}
