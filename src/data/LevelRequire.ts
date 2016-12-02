/**
 *
 * @author 
 *
 */
class LevelRequire {
    
    public reqElements: LevelRequireElement[];
    /*对数组初始化*/
	public constructor() {
    	this.reqElements = [];
	}
	
	/*获取过关环境的数量*/
	public getLevelReqNum():number {
	    return this.reqElements.length;
	}
	/*添加关卡元素*/
	public addElement(type:string, num:number){
	    var ele: LevelRequireElement = new LevelRequireElement();
	    ele.num = num;
	    ele.type = type;
	    this.reqElements.push(ele);
	}
	
	/*启动关卡条件修改*/
	
	public openChange() {
	    this.reqElements = [];
	}
	/*x修改过关条件*/
	public changeReqNum(type:string, num:number) {
	    var l: number = this.getLevelReqNum();
	    for(var i = 0; i<l; i++){
	        if(this.reqElements[i].type = type){
	            this.reqElements[i].num = num;
	            return;
	        }
	    }
	}
	/*判断玩家是否通关*/
	public isClear():boolean {
	    var l:number = this.getLevelReqNum();
	    for(var i =0;i < l; i++) {
	        if(this.reqElements[i].num > 0) {
	            return false;
	        }
	    }
	    return true;
	}	
}
