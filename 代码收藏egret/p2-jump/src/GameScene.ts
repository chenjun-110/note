/**
 * @ author
 */
class GameScene extends egret.Sprite{

    private hero:Hero;
    private factor:number;
    // 需要用到的数据
    private floatFloorSpeedX:number = 6;// 浮动台阶左右移动的最大速度
    private gravity:number = -10;// 重力，物体下落速度
    private jumpSpeedY:number = 6;// 英雄的跳跃y速度
    private jumpSpeedX: number = 4;// 英雄的跳跃x速度

    private stageW:number;
    private stageH:number;

    private worldW:number;
    private worldH:number;
    private  world:p2.World;// 世界
    private heroShape:p2.Shape;// 主角形状
    private heroBody:p2.Body;// 主角
    private floatFloor:p2.Body[] = [];// 浮动的台阶刚体集合
    private posArray: number[][] = [];// 坐标集合

    public constructor(){

        super();
        this.init();

    }

    private init(){

        this.touchEnabled = true;
        this.createUI();
    }

    private createUI():void {

        var stageW:number = egret.MainContext.instance.stage.stageWidth;
        var stageH:number = egret.MainContext.instance.stage.stageHeight;
        this.stageH = stageH;
        this.stageW = stageW;
        
        // 创建背景
        var bg = new egret.Bitmap();
        bg.texture = RES.getRes("bg_jpg");
        this.addChild(bg);
        
        //  物理世界和真实世界的转换因子
        var factor:number = 50;
        this.factor = factor;
        //  物理世界的尺寸
        var worldW = stageW / factor;
        var worldH = stageH / factor;
        this.worldW = worldW;
        this.worldH = worldH;
        //  创建world
        var world:p2.World = new p2.World({
            gravity : [0, this.gravity]
        });
        this.world = world;
        // 创建地板
        var land = new p2.Body();
        var planeShape = new p2.Plane();
        land.addShape(planeShape);
        land.displays = [];//  没有显示对象也要写，不然会出错
        world.addBody(land);

        // 注册心跳函数
        egret.Ticker.getInstance().register(this.worldLogic, this);

        //鼠标点击移动
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, click, this);
        function click(e:egret.TouchEvent):void {
            console.log("click: " + e.stageX + "," + e.stageY);
            if(e.stageX > stageW/2){
                //  向右移动
                heroBody.velocity = [this.jumpSpeedX, this.jumpSpeedY];
        
            }else{
                //  向左移动
                heroBody.velocity = [-this.jumpSpeedX,this.jumpSpeedY];
            }
        }

        //  添加英雄刚体
        var hero = new Hero();// 创建一个英雄精灵
        var heroShape = new p2.Circle(hero.height*0.7/factor);// 根据英雄形状创建碰撞框
        heroShape.material = new p2.Material(1);// 碰撞材质，用来做特殊碰撞监测
        var heroBody = new p2.Body({
            mass: 1,
            type: p2.Body.DYNAMIC,
            fixedRotation: true// 禁止旋转
        });
        heroBody.position = [3,8];
        heroBody.addShape(heroShape);// 将碰撞框添加到刚体上
        heroBody.angularDamping = 0;//  角阻尼。取值区间[0,1]
        heroBody.damping = 0;//  限行阻尼。取值区间[0,1]
        heroBody.allowSleep = false;//  禁止休眠
        world.addBody(heroBody);// 将刚体添加到物理世界中
        heroBody.displays = [hero];// 将英雄绑定到刚体上，即刚体的外观
        //  将英雄添加到屏幕上
        this.addChild(hero);

        this.hero = hero;
        this.heroBody = heroBody;
        this.heroShape = heroShape;

        // 添加台阶
        this.addSidesteps();

        var curFloor;// 当前碰撞的台阶
        var floatFloor = this.floatFloor;
        // 碰撞开始函数
        world.on("beginContact", function (evt){
            // 如果不包含英雄则返回
            if(evt.bodyA != heroBody && evt.bodyB != heroBody){
                return;
            }
            // 判断哪个物体为台阶
            if(evt.bodyA == heroBody && floatFloor.indexOf(evt.bodyB) != -1){
                curFloor = evt.bodyB;
            }else if(evt.bodyB == heroBody && floatFloor.indexOf(evt.bodyA) != -1){
                curFloor = evt.bodyA;
            }
            
        }, this);

        // Disable any equations between the current passthrough body and the character
        world.on("preSolve", function (evt){
            // 英雄穿越台阶
            for(var i = 0;i < evt.contactEquations.length;i++) {
                var eq = evt.contactEquations[i];
                if(curFloor){
                    if(heroBody.velocity[1] >= 0 || heroBody.position[1] < curFloor.position[1]) {
                        eq.enabled = false;
                    } else {
                        heroBody.velocity = [0,0];
                    }
                }
                
            }
        }, this);

        //  碰撞结束。
        world.on("endContact", function (evt){
            curFloor = null;
        }, this);


        //  世界运行逻辑
        world.on("postStep", function(){
            var hero = this.hero;
            var heroBody = this.heroBody;
            var heroShape = this.heroShape;
            var radius = (<p2.Circle>heroShape).radius;

            // 限制最大下降速度
            if(heroBody.velocity[1] < this.gravity){
                heroBody.velocity[1] = this.gravity;
            }

            //  如果英雄超出屏幕左边，则从右边出现，如果超出右边，则从左边出现
            if(heroBody.position[0] + radius <= 0){
                heroBody.position[0] = worldW - radius;
            }else if(heroBody.position[0] - radius >= worldW) {
                heroBody.position[0] = radius;
            }

        }, this);
    }

    /* 
     * 随机添加台阶
     */
    private addSidesteps(){

        var world = this.world;
        var heroShape = this.heroShape;
        var factor = this.factor;
        var worldW = this.worldW;
        var worldH = this.worldH;

        // 先创建一个台阶，主要是用来使用它的长度
        var floor = new SideStep();
        var floorLength = floor.width*0.6 / factor;

        var boxShape;
        var boxBody;
        //  碰撞材质
        var boxMaterial = new p2.Material(0);

        //  添加台阶
        for(var i = 0;i < 4;i++) {
            //添加方形刚体
            var display = new SideStep();
            // 台阶碰撞框用矩形比较合适，这里偷懒用直线了
            boxShape = new p2.Line(floorLength);
            boxShape.material = boxMaterial;
            boxBody = new p2.Body({
                mass: 0,
                position: [(i + 1) * 2,(i + 1) * 3]
            });
            boxBody.addShape(boxShape);
            boxBody.angularDamping = 0;//  角阻尼。取值区间[0,1]
            boxBody.damping = 0;//  限行阻尼。取值区间[0,1]
            boxBody.fixedRotation = true;
            boxBody.type = p2.Body.KINEMATIC;
            // 随机台阶的速度
            boxBody.velocity = [ Math.floor(Math.random()*this.floatFloorSpeedX) ,0];
            world.addBody(boxBody);
            // 将该刚体存放到集合中
            this.floatFloor.push(boxBody);
            boxBody.displays = [display];// 绑定台阶外观
            this.addChild(display);
        }

        // 添加英雄和台阶的碰撞材料
        var boxHeroCM = new p2.ContactMaterial(boxMaterial, heroShape.material);
        boxHeroCM.restitution = 0;
        boxHeroCM.stiffness = Number.MAX_VALUE;
        world.addContactMaterial(boxHeroCM);
    }

    // 物理世界的逻辑
    private worldLogic(dt){
        if (dt < 10) {
            return;
        }
        if (dt > 1000) {
            return;
        }
        //  世界执行
        this.world.step(dt / 1000);
        
        // 更新精灵显示
        var l = this.world.bodies.length;
        for(var i: number = 0;i < l;i++) {
            var boxBody: p2.Body = this.world.bodies[i];
            var box = boxBody.displays[0];
            if(box) {
                box.x = boxBody.position[0] * this.factor;
                box.y = this.stageH - boxBody.position[1] * this.factor;
                box.rotation = 360 - boxBody.angle * 180 / Math.PI;
                if(boxBody.sleepState == p2.Body.SLEEPING) {
                    box.alpha = 0.5;
                }
                else {
                    box.alpha = 1;
                }
            }
        }
        // 浮动台阶左右循环移动
        var floatFloor = this.floatFloor;
        var length = (<p2.Line>(floatFloor[0].shapes[0])).length / 2;
        for(var i = 0;i < floatFloor.length;i++) {
            if(floatFloor[i].position[0] + length > this.worldW) {
                floatFloor[i].position[0] = this.worldW - length;
                floatFloor[i].velocity[0] = -floatFloor[i].velocity[0];
            } else if(floatFloor[i].position[0] - length < 0) {
                floatFloor[i].position[0] = length;
                floatFloor[i].velocity[0] = -floatFloor[i].velocity[0];
            }
        }
    }
}