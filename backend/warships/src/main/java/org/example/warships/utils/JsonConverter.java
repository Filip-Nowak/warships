package org.example.warships.utils;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import java.lang.reflect.Type;
import java.util.Arrays;
import java.util.List;

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
    public <T> List<T> fromJsonToList(String json, Class<T[]> classOfT){
        T[] arr = new Gson().fromJson(json, classOfT);
        return Arrays.asList(arr);
    }

    public <T> T fromJson(String json, Class<T> classOfT){
        return gson.fromJson(json, classOfT);
    }
}
