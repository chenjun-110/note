/**
 * 英雄
 */
var Hero = (function (_super) {
    __extends(Hero, _super);
    function Hero() {
        _super.call(this);
        this.init();
    }
    var d = __define,c=Hero;p=c.prototype;
    p.init = function () {
        var sprite = new egret.Bitmap();
        sprite.texture = RES.getRes("kuchipatchi1_png");
        this.anchorOffsetX = sprite.width / 2;
        this.anchorOffsetY = sprite.height / 2;
        this.addChild(sprite);
        this.sprite = sprite;
        console.log("hero created");
    };
    return Hero;
})(egret.Sprite);
egret.registerClass(Hero,"Hero");
