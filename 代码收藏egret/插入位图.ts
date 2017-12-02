class Main extends egret.DisplayObjectContainer{
    public constructor()
    {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
    }
    private onAddToStage(event:egret.Event) {
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onGroupComplete, this);//RES监听组事件，创建位图、纹理
        RES.loadConfig("resource/default.res.json", "resource/");//配置
        RES.loadGroup("preload");//组名
    }
    private onGroupComplete()
    {
        var img:egret.Bitmap = new egret.Bitmap();
        img.texture = RES.getRes("bg_jpg");
        this.addChild(img);
    }
}