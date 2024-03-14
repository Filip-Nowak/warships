package org.example.warships.model;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class RoomModel {
    private String id;
    private String owner;
    private String guest;
}
