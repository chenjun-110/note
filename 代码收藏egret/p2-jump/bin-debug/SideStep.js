/**
 * 台阶
 */
var SideStep = (function (_super) {
    __extends(SideStep, _super);
    function SideStep() {
        _super.call(this);
        this.init();
    }
    var d = __define,c=SideStep;p=c.prototype;
    /*
     * @type:图片的尾号
     */
    p.init = function () {
        var sprite = new egret.Bitmap();
        // 随机台阶图片
        sprite.texture = RES.getRes("rectbr-" + Math.floor(Math.random() * 11));
        this.anchorOffsetX = sprite.width / 2;
        this.anchorOffsetY = sprite.height / 2;
        this.scaleX = 0.6;
        this.scaleY = 0.1;
        this.addChild(sprite);
        this.sprite = sprite;
        console.log("floor created");
    };
    return SideStep;
})(egret.Sprite);
egret.registerClass(SideStep,"SideStep");
