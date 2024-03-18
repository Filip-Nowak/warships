package org.example.warships.model;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserModel {
    private String id;
    private String username;
    private String roomId;
}
