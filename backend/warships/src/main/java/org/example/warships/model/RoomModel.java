package org.example.warships.model;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class RoomModel {
    private String id;
    private String ownerId;
    private List<UserModel> players;
}
