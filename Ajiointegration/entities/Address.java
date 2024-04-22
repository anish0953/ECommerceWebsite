package Ajiointegration.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "Address")
@Data
public class Address {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "AddressID")
    private long address_id;

    @Column(name = "personname")
    private String personname;

    @Column(name = "Addressname")
    private String addressname;

    @Column(name = "Address")
    private String address;

    @Column(name = "Landmark")
    private String landmark;

    @Column(name = "contact")
    private String contact;

    @Column(name = "Pincode")
    private int pincode;

    @Column(name = "City")
    private String city;

    @Column(name = "State")
    private String State;

    @Column(name = "Country")
    private String Country;

    @ManyToOne
    @JsonBackReference
    private User users;


}
