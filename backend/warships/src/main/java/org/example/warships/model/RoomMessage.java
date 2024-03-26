package org.example.warships.model;

import lombok.Builder;
import lombok.Data;
import org.example.warships.model.ship.Ship;

import java.util.List;

@Data
@Builder
public class RoomMessage {
    String senderId;
    String roomId;
    String message;
    private List<Ship> ships;
}
