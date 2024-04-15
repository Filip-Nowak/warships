package org.example.warships.model.ship;

import lombok.Builder;
import lombok.Data;

import java.util.List;
@Data
@Builder
public class ShipModel {
    private List<Field> fields;
    private boolean sunken;

    public Field getField(int x,int y) {
        for (Field field : fields) {
            if (field.getPos().getX() == x && field.getPos().getY() == y) {
                return field;
            }
        }
        return null;
    }
}
