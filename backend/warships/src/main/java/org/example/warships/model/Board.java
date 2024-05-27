package org.example.warships.model;

import org.example.warships.utils.BoolHolder;

import java.util.Arrays;

public class Board {
    private int[][] fields;
    public Board(int[][] fields){
        this.fields = fields;
    }
    public int[][] getFields(){
        return fields;
    }
    public int getField(int x, int y){
        return fields[y][x];
    }
    public int countHp(){
        int hp = 0;
        for(int y = 0; y<fields.length;y++){
            for(int x = 0; x<fields[y].length;x++){
                if(fields[y][x]==1){
                    hp++;
                }
            }
        }
        return hp;
    }

    public int shoot(int x, int y) {
        if (fields[y][x] == 1) {
            int[][] copy = fields.clone();
            for (int i = 0; i < copy.length; i++) {
                copy[i] = fields[i].clone();
            }
            if (checkSunken(x, y, copy)) {
                sunkShip(x, y);
                return 2;
            }
            fields[y][x] = 2;
            return 1;
        } else if (fields[y][x] == 0 || fields[y][x] == 4) {
            fields[y][x] = 4;
            return 0;
        }
        return 3;
    }

    private void sunkShip(int x, int y) {
        fields[y][x] = 3;
        int[][] directions = new int[][]{{x + 1, y}, {x - 1, y}, {x, y + 1}, {x, y - 1}};
        for (int[] direction : directions) {
            if (checkField(direction[0], direction[1])) {
                if (getField(direction[0],direction[1]) == 2) {
                    sunkShip(direction[0], direction[1]);
                }
            }
        }
    }

    private boolean checkField(int x, int y) {
        return x >= 0 && x < 10 && y >= 0 && y < 10;
    }

    private boolean checkSunken(int x, int y, int[][] fields) {
        BoolHolder sunken = new BoolHolder(true);
        fields[y][x] = 5;
        forCrossFields(x, y, fields, sunken);
        if(sunken.getValue()){
            System.out.println("xdd sunken");
        }else{
            System.out.println("xdd not sunken");
        }
        return sunken.getValue();
    }
    private void callback(int x, int y, int[][] fields, BoolHolder sunken){
        if(fields[y][x]==1){
            sunken.setValue(false);
        }else if(fields[y][x]==2){
            fields[y][x]=5;
            forCrossFields(x,y,fields,sunken);
        }
    }
    private void forCrossFields(int x, int y, int[][] fields,BoolHolder sunken){
        if(checkField(x+1,y)){
           callback(x+1,y,fields,sunken);
        }
        if(checkField(x-1,y)){
           callback(x-1,y,fields,sunken);
        }
        if(checkField(x,y+1)){
           callback(x,y+1,fields,sunken);
        }
        if(checkField(x,y-1)){
           callback(x,y-1,fields,sunken);
        }

    }
}
