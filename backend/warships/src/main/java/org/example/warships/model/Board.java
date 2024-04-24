package org.example.warships.model;

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
            if (checkSunken(x, y, copy)) {
                sunkShip(x, y);
                return 2;
            }
            fields[y][x] = 2;
            return 1;
        } else if (fields[y][x] == 0) {
            return 0;
        }
        return 3;
    }

    private void sunkShip(int x, int y) {
        fields[y][x] = 3;
        int[][] directions = new int[][]{{x + 1, y}, {x - 1, y}, {x, y + 1}, {x, y - 1}};
        for (int[] direction : directions) {
            if (checkField(direction[0], direction[1])) {
                if (fields[direction[1]][direction[0]] == 2) {
                    sunkShip(direction[0], direction[1]);
                }
            }
        }
    }

    private boolean checkField(int x, int y) {
        return x >= 0 && x < 10 && y >= 0 && y < 10;
    }

    private boolean checkSunken(int x, int y, int[][] fields) {
        //5 is checked
        fields[y][x] = 5;
        int[][] directions = new int[][]{{x + 1, y}, {x - 1, y}, {x, y + 1}, {x, y - 1}};
        for (int[] direction : directions) {
            if (checkField(direction[0], direction[1])) {
                if (fields[direction[1]][direction[0]] == 1) {
                    return false;
                } else if (fields[direction[1]][direction[0]] == 2) {
                    return checkSunken(direction[0], direction[1], fields);
                }
            }
        }
        return true;
    }
}
