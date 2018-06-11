/**
 * 台阶
 */
class SideStep extends egret.Sprite{

    public sprite:egret.Bitmap;
    public constructor(){

        super();
        this.init();
    }

    /*
     * @type:图片的尾号
     */ 
    private init(){

        var sprite = new egret.Bitmap();
        // 随机台阶图片
        sprite.texture = RES.getRes("rectbr-" + Math.floor(Math.random()*11) );
        this.anchorOffsetX = sprite.width / 2;
        this.anchorOffsetY = sprite.height / 2;
        this.scaleX = 0.6;
        this.scaleY = 0.1;
        this.addChild(sprite);
        this.sprite = sprite;
        console.log("floor created");

    }
}