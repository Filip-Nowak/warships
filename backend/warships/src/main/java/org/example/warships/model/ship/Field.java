package org.example.warships.model.ship;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class Field {
    private Pos pos;
    private boolean hit;
}
