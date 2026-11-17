package com.velsis.velsis_api.dto;

import java.time.LocalDate;

public class User {
    private Long id;

    public User(String name, LocalDate birthDate, String document, String addressLine, Integer addressNumber, String city, String state, String zip) {
        this.name = name;
        this.birthDate = birthDate;
        this.document = document;
        this.addressLine = addressLine;
        this.addressNumber = addressNumber;
        this.city = city;
        this.state = state;
        this.zip = zip;
    }

    public User(Long id, String name, LocalDate birthDate, String document, String addressLine, Integer addressNumber, String city, String state, String zip) {
        this(name, birthDate, document, addressLine, addressNumber, city, state, zip);
        this.id = id;
    }

    public User() {}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    private String name;
    private LocalDate birthDate;
    private String document;
    private String addressLine;
    private Integer addressNumber;
    private String city;
    private String state;
    private String zip;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public LocalDate getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(LocalDate birthDate) {
        this.birthDate = birthDate;
    }

    public String getDocument() {
        return document;
    }

    public void setDocument(String document) {
        this.document = document;
    }

    public String getAddressLine() {
        return addressLine;
    }

    public void setAddressLine(String addressLine) {
        this.addressLine = addressLine;
    }

    public Integer getAddressNumber() {
        return addressNumber;
    }

    public void setAddressNumber(Integer addressNumber) {
        this.addressNumber = addressNumber;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getZip() {
        return zip;
    }

    public void setZip(String zip) {
        this.zip = zip;
    }
}
