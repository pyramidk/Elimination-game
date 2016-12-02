/**
 *
 * @author 
 *
 */
class GameData {
    
    /*表示空白地图块的数量*/
    public static unmapnum: number = 0;
    /*真正的地图数据*/
    public static mapData: number[][];
    /*当前玩家剩余的步数*/
    public static stepNum: number = 0;  
    /*当前关卡要求的步数*/
    public static levelStepNum: number = 0;
    /*当前关卡出现的元素类型*/
    public static elementTypes: number[];
    /*定义过关条件*/
    public static levelreq: LevelRequire;
    /*游戏元素的对象值*/
    public static elements: GameElement[];
    /*游戏中未使用元素的id*/
    public static unusedElements: number[];
    /*当前关卡的背景图*/
    public static levelBackgroundImageName: string = '';
    
    /*三个属性*/
    /*行*/
    public static MaxRow: number = 8;
    public static MaxColumn: number = 8;
    /*当前关卡中地图可用元素的数量*/
    public static currentElementNum: number = 0;
    
    
    /*初始化数据的方法*/
    public static initData() {
         GameData.mapData = [];
         for(var i = 0;i< GameData.MaxRow; i++){
             var arr: number[] = [];
             for(var t = 0;t < GameData.MaxColumn; t++){
                 GameData.mapData[t].push(-2);
             }
         }
         
         /*创建关卡*/
         GameData.levelreq = new LevelRequire();
         
         GameData.elements = [];
         GameData.unusedElements = [];
         var len:number = GameData.MaxRow * GameData.MaxColumn;
         for(var q = 0;q < len; q++){
             var ele:GameElement = new GameElement();
             ele.id = q;
             GameData.elements.push(ele);
             GameData.unusedElements.push(q);
         }
         
         GameData.stageW = egret.MainContext.instance.stage.stageWidth;
         GameData.stageH = egret.MainContext.instance.stage.stageHeight;      
         
    }
    
    public static stageW: number = 0;
    public static stageH: number = 0; 
    
}
