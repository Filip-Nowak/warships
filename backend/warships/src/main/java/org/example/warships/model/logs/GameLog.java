package org.example.warships.model.logs;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class GameLog {
    private String roomId;
    private String senderId;
    private LogType type;
    private Pos pos;

}
