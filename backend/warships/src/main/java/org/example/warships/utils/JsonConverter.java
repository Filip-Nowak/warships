package org.example.warships.utils;

import com.google.gson.Gson;

public class JsonConverter {
    private static JsonConverter converter;
    private Gson gson;
    private JsonConverter(){
        gson = new Gson();
    }
    public static JsonConverter getInstance(){
        if(converter == null){
            converter = new JsonConverter();
        }
        return converter;
    }
    public String toJson(Object object){
        String msg=gson.toJson(object);
        System.out.println(msg);
        return msg;
    }
}
