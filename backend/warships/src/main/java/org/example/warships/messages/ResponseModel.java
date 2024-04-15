package org.example.warships.messages;

import lombok.Builder;
import lombok.Data;
import org.example.warships.model.RoomModel;

@Data
@Builder
public class ResponseModel {
    private String message;
    private RoomMessageType type;
}
