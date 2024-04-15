package org.example.warships.model;

public class NotInGame extends RuntimeException{
    public NotInGame(String message) {
        super(message);
    }
}
