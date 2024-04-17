package org.example.warships.exception;

public class UserNotFound extends RuntimeException{
    public UserNotFound() {
        super("Session not found");
    }
}
