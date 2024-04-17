package org.example.warships.exception;

public class RoomIsFull extends RuntimeException{
    public RoomIsFull() {
        super("Room is full");
    }
}
