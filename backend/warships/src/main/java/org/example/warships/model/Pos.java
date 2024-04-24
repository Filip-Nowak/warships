package org.example.warships.model;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class Pos {
    private int x;
    private int y;
}
