package org.example.warships.model.ship;

import lombok.Builder;
import lombok.Data;

import java.util.List;
@Data
@Builder
public class Ship {
    private List<Field> fields;
    private boolean sunken;
}
