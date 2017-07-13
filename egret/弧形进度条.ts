class Main extends egret.DisplayObjectContainer
{
    public constructor()
    {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
    }
    private onAddToStage(event:egret.Event)
    {
       
            var shape:egret.Shape = new egret.Shape();
            var angle:number = 0;
            egret.startTick(function (timeStamp:number):boolean {
                angle += 1;
                changeGraphics(angle);
                angle = angle % 360;
                return true;
            }, this);
            function changeGraphics(angle) { //弧形进度条
                shape.graphics.clear();
                shape.graphics.lineStyle(2, 0x0000ff, 1);
                shape.graphics.drawArc(50, 50, 50, 0, angle * Math.PI / 180, false);
                shape.graphics.endFill();
            }

        this.addChild( shape );
    }
}

 function aa(angle) { //扇形进度条
        shape.graphics.clear();
        shape.graphics.beginFill(0xff0000);
        shape.graphics.moveTo(50, 50);
        shape.graphics.lineTo(100, 50);
        shape.graphics.drawArc(50, 50, 50, 0, angle * Math.PI / 180, false);
        shape.graphics.lineTo(50, 50);
        shape.graphics.endFill();
    }