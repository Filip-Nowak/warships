package org.example.warships.model;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class RoomMessage {
    String senderId;
    String roomId;
    String message;
}
