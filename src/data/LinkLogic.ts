/**
 *
 * @author 
 *
 */
class LinkLogic {

    public static lines:number[];
    public static pushLines(val:number) {
        if(LinkLogic.lines.indexOf(val) ==-1) {
            LinkLogic.lines.push(val);
        }
    }
    //判断相连元素是否符合条件
    public static isHaveLine():boolean {
        LinkLogic.lines = [];
        var currentType: string = '';
        var typeNum :number = 0;
        for(var i = 0;i<GameData.MaxRow;i++) {
            for(var t = 0;t < GameData.MaxColumn;t++) {
                if(GameData.mapData[i][t] != -1) {
                    //这里判断循环的那个项和下一个是否相等，如果不相等则个type，和num赋值，然后再判断
                    if(currentType != GameData.elements[GameData.mapData[i][t]].type) {
                        if(typeNum >=3) {
                            for(var q=0;q<typeNum;q++) {
                                LinkLogic.pushLines(GameData.mapData[i][t-q-1]);
                            }
                        }
                        currentType = GameData.elements[GameData.mapData[i][t]].type;
                        typeNum = 1;
                    } else{
                        typeNum++;
                    }
                }else{
                    //这里考虑的是碰到那个位置没有用到的情况
                    if(typeNum>=3) {
                        for(var q = 0;q < typeNum;q++) {
                            LinkLogic.pushLines(GameData.mapData[i][t - q - 1]);
                        }
                    }
                    currentType = '';
                    typeNum = 0;
                }
            }
            if(typeNum >= 3) {
                for(var q = 0;q < typeNum;q++) {
                    LinkLogic.pushLines(GameData.mapData[i][t - q - 1]);
                }
            }
            currentType = '';
            typeNum = 0;
        }
        
        
        for(i = 0;i < GameData.MaxColumn;i++) {
            for(t = 0;t < GameData.MaxRow;t++) {
                if(GameData.mapData[t][i] != -1) {
                    if(currentType != GameData.elements[GameData.mapData[t][i]].type) {
                        if(typeNum >= 3) {
                            //var arr : number[]=[];
                            for(q = 0;q < typeNum;q++) {
                                //arr.push(GameData.mapData[t-q-1][i]);
                                //LinkLogic.lines.push(arr);
                                LinkLogic.pushLines(GameData.mapData[t - q - 1][i]);
                            }
                        }
                        currentType = GameData.elements[GameData.mapData[t][i]].type;
                        typeNum = 1;
                    } else {
                        typeNum++;
                    }
                } else {
                    if(typeNum >= 3) {
                        //var arr: number[] = [];
                        for(q = 0;q < typeNum;q++) {
                            //arr.push(GameData.mapData[t - q - 1][i]);
                            //LinkLogic.lines.push(arr);
                            LinkLogic.pushLines(GameData.mapData[t - q - 1][i]);
                        }
                    }
                    currentType = '';
                    typeNum = 0;
                }
            }
            if(typeNum >= 3) {
                //var arr: number[] = [];
                for(q = 0;q < typeNum;q++) {
                    //arr.push(GameData.mapData[t - q - 1][i]);
                    //LinkLogic.lines.push(arr);
                    LinkLogic.pushLines(GameData.mapData[t - q - 1][i]);
                }
            }
            currentType = '';
            typeNum = 0;
        }
        //说明有符合消除条件的返回true，否则false
        if(LinkLogic.lines.length!=0){
            return true;
        }
        return false;                    
    }

    
    //预检索可消除元素算法设计与实现
    //在页面载入时判断是否有可以进行消除的
    public static isNextHaveLine():boolean{
        for(var i = 0;i<GameData.MaxRow;i++){
            for(var t = 0;t < GameData.MaxColumn;t++){
                /*
                 * 横向两个相同元素相邻
                 * 1.元素不应该在横排的最后一个
                 * 2.元素后面的元素应该存在，并且和前者元素type相等
                 * */
                if(t < (GameData.MaxColumn - 1) && GameData.mapData[i][t + 1] != -1 && GameData.elements[GameData[i][t]].type == GameData.elements[GameData[i][t+1]].type){
                    //左侧，元素左侧不为空,存在
                    if(t>0&&GameData.mapData[i][t]!=-1){
                        //左上角，不为空，并且存在，type相等
                        if(i > 0 && GameData.mapData[i - 1][t - 1] && GameData.mapData[i - 1][t - 1] != -1 && GameData.elements[GameData.mapData[i - 1][t - 1]].type == GameData.elements[GameData[i][t]].type){
                            return true;
                        }
                        //左下角
                        if(i < (GameData.MaxRow - 1) && GameData.mapData[i + 1][t - 1] && GameData.mapData[i + 1][t - 1] != -1 && GameData.elements[GameData.mapData[i + 1][t - 1]].type == GameData.elements[GameData.mapData[i][t]].type) {
                            return true;
                        }
                        //左边
                        if(t > 1 && GameData.mapData[i][t - 2] && GameData.mapData[i][t - 2] != -1 && GameData.elements[GameData.mapData[i][t - 2]].type == GameData.elements[GameData.mapData[i][t]].type) {
                            return true;
                        }
                    }
                    //右侧
                    if(t < GameData.MaxColumn - 2 && GameData.mapData[i][t + 2] != -1) {
                        //右上角
                        if(i > 0 && GameData.mapData[i - 1][t + 2] && GameData.mapData[i - 1][t + 2] != -1 && GameData.elements[GameData.mapData[i - 1][t + 2]].type == GameData.elements[GameData.mapData[i][t]].type) {
                            return true;
                        }
                        //右下角
                        if(i < (GameData.MaxRow - 1) && GameData.mapData[i + 1][t + 2] && GameData.mapData[i + 1][t + 2] != -1 && GameData.elements[GameData.mapData[i + 1][t + 2]].type == GameData.elements[GameData.mapData[i][t]].type) {
                            return true;
                        }
                        //右边
                        if(t < (GameData.MaxColumn - 3) && GameData.mapData[i][t + 3] && GameData.mapData[i][t + 3] != -1 && GameData.elements[GameData.mapData[i][t + 3]].type == GameData.elements[GameData.mapData[i][t]].type) {
                            return true;
                        }
                    }
                }
                //纵向两个相同元素相邻
                if(i < (GameData.MaxRow - 1) && GameData.mapData[i + 1][t] != -1 && GameData.elements[GameData.mapData[i][t]].type == GameData.elements[GameData.mapData[i + 1][t]].type) {

                    //上侧
                    if(i > 0 && GameData.mapData[i - 1][t] != -1) {
                        //左上角
                        if(t > 0 && GameData.mapData[i - 1][t - 1] && GameData.mapData[i - 1][t - 1] != -1 && GameData.elements[GameData.mapData[i - 1][t - 1]].type == GameData.elements[GameData.mapData[i][t]].type) {
                            return true;
                        }
                        //右上角
                        if(t < (GameData.MaxColumn - 1) && GameData.mapData[i - 1][t + 1] && GameData.mapData[i - 1][t + 1] != -1 && GameData.elements[GameData.mapData[i - 1][t + 1]].type == GameData.elements[GameData.mapData[i][t]].type) {
                            return true;
                        }
                        //上边
                        if(i > 1 && GameData.mapData[i - 2][t] && GameData.mapData[i - 2][t] != -1 && GameData.elements[GameData.mapData[i - 2][t]].type == GameData.elements[GameData.mapData[i][t]].type) {
                            return true;
                        }
                    }
                    //下侧
                    if(i < (GameData.MaxRow - 2) && GameData.mapData[i][t + 2] != -1) {
                        //左下角
                        if(t > 0 && GameData.mapData[i + 2][t - 1] && GameData.mapData[i + 2][t - 1] != -1 && GameData.elements[GameData.mapData[i + 2][t - 1]].type == GameData.elements[GameData.mapData[i][t]].type) {
                            return true;
                        }
                        //右下角
                        if(t < (GameData.MaxColumn - 1) && GameData.mapData[i + 2][t + 1] && GameData.mapData[i + 2][t + 1] != -1 && GameData.elements[GameData.mapData[i + 2][t + 1]].type == GameData.elements[GameData.mapData[i][t]].type) {
                            return true;
                        }
                        //下边
                        if(i < (GameData.MaxRow - 3) && GameData.mapData[i + 3][t] && GameData.mapData[i + 3][t] != -1 && GameData.elements[GameData.mapData[i + 3][t]].type == GameData.elements[GameData.mapData[i][t]].type) {
                            return true;
                        }
                    }

                }
                
                
                //横向两个相同元素相隔
                if(t < (GameData.MaxColumn - 2) && GameData.mapData[i][t + 2] != -1 && GameData.elements[GameData.mapData[i][t + 2]].type == GameData.elements[GameData.mapData[i][t]].type) {
                    //上边
                    if(i > 0 && GameData.mapData[i - 1][t + 1] && GameData.mapData[i - 1][t + 1] != -1 && GameData.elements[GameData.mapData[i - 1][t + 1]].type == GameData.elements[GameData.mapData[i][t]].type) {
                        return true;
                    }
                    //下边
                    if(i < (GameData.MaxRow - 1) && GameData.mapData[i + 1][t + 1] && GameData.mapData[i + 1][t + 1] != -1 && GameData.elements[GameData.mapData[i + 1][t + 1]].type == GameData.elements[GameData.mapData[i][t]].type) {
                        return true;
                    }
                }
                //纵向两个相同元素相隔
                if(i < (GameData.MaxRow - 2) && GameData.mapData[i + 2][t] != -1 && GameData.elements[GameData.mapData[i + 2][t]].type == GameData.elements[GameData.mapData[i][t]].type) {
                    //左边
                    if(t > 0 && GameData.mapData[i + 1][t - 1] && GameData.mapData[i + 1][t - 1] != -1 && GameData.elements[GameData.mapData[i + 1][t - 1]].type == GameData.elements[GameData.mapData[i][t]].type) {
                        return true;
                    }
                    //右边
                    if(t < (GameData.MaxColumn - 1) && GameData.mapData[i + 1][t + 1] && GameData.mapData[i + 1][t + 1] != -1 && GameData.elements[GameData.mapData[i + 1][t + 1]].type == GameData.elements[GameData.mapData[i][t]].type) {
                        return true;
                    }
                }

            }
        }
        return false;
    }
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
}
