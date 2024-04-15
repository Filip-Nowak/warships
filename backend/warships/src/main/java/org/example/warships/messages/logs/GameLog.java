package org.example.warships.messages.logs;

import lombok.Builder;
import lombok.Data;
import org.example.warships.model.ship.Pos;

@Data
@Builder
public class GameLog {
    private String senderId;
    private LogType type;
    private Pos pos;
}
