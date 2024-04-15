package org.example.warships.model;

public class RoomNotFound extends RuntimeException{
    public RoomNotFound(String message) {
        super(message);
    }
}
