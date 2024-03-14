package org.example.warships.model;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ResponseModel {
    private String id;
    private String username;
    private String error;
}
