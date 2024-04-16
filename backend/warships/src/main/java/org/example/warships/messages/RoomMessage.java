package org.example.warships.messages;

import lombok.Builder;
import lombok.Data;
import org.example.warships.model.ship.ShipModel;

import java.util.List;

@Data
@Builder
public class RoomMessage {
    String senderId;
    String roomId;
    String message;
}
