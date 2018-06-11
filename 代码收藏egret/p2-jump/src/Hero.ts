/**
 * 英雄
 */
class Hero extends egret.Sprite{
    public sprite: egret.Bitmap;
    public constructor(){
        super();
        this.init();
    }

    private init() {
        var sprite = new egret.Bitmap();
        sprite.texture = RES.getRes("kuchipatchi1_png");
        this.anchorOffsetX = sprite.width / 2;
        this.anchorOffsetY = sprite.height / 2;
        this.addChild(sprite);
        this.sprite = sprite;
        console.log("hero created");
    }
}