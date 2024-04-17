package org.example.warships.exception;

public class RoomNotFound extends RuntimeException{
    public RoomNotFound() {
        super("Room not found");
    }
}
