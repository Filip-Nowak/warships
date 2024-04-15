package org.example.warships.cache;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ProfileEntity {
    private String id;
    private String nickname;
    private String roomId;
}
