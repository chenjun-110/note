class Main extends egret.DisplayObjectContainer {
    constructor() {
        super();
        var txInput:egret.TextField = new egret.TextField;
        txInput.type = egret.TextFieldType.INPUT;
        txInput.width = 282;
        txInput.height = 43;
        txInput.x = 134;
        txInput.y = 592;
        txInput.textColor = 0x000000;
        this.layTxBg(txInput);
        this.addChild( txInput );
    }
    private layTxBg(tx:egret.TextField):void {
    var shp:egret.Shape = new egret.Shape;
    shp.graphics.beginFill(0xffffff);
    shp.graphics.drawRect(tx.x, tx.y, tx.width, tx.height);
    shp.graphics.endFill();
    this.addChild(shp);
}
}