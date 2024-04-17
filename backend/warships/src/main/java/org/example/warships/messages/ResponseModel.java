package org.example.warships.messages;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ResponseModel {
    private String message;
    private RoomMessageType type;
}
