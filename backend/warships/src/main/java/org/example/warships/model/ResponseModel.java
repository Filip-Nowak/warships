package org.example.warships.model;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ResponseModel {
    private RoomModel room;
    private String userId;
    private String error;
    private RoomMessageType type;
}
