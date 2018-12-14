// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        jumpHeight:0,
        jumpDuration:0,
        xSpeed:0,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {

        this.node.runAction(this.setJumpAction());
// 加速度方向开关
        this.accLeft = false;
        this.accRight = false;
        // 主角当前水平方向速度
        this.xSpeed = 0;
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN,this.myKeyDown,this)
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP,this.myKeyUp,this)

    },

    update:function(dt){
        if(this.accLeft){
            this.xSpeed -= this.accel * dt;
        } else if (this.accRight) {
            this.xSpeed += this.accel * dt;
        }

        // 限制主角的速度不能超过最大值
        // if ( Math.abs(this.xSpeed) > this.maxMoveSpeed ) {
        //     // if speed reach limit, use max speed with current direction
        //     this.xSpeed = this.maxMoveSpeed * this.xSpeed / Math.abs(this.xSpeed);
        // }

        // 根据当前速度更新主角的位置
        // console.log(this.node.x);
        // console.log(this.node.y);
        // console.log(dt);
         console.log(this.accLeft);
        if(this.accLeft){
            this.node.x =0;
            this.node.y =0;
        }

    },

    myKeyDown(event){
        switch(event.keyCode) {
            case cc.macro.KEY.a:
                this.accLeft = true;
                break;
            case cc.macro.KEY.d:
                this.accRight = true;
                break;
        }
        console.log(this.accLeft);
        console.log(1);
    },
    myKeyUp (event) {
        // unset a flag when key released
        switch(event.keyCode) {
            case cc.macro.KEY.a:
                this.accLeft = true;
                break;
            case cc.macro.KEY.d:
                this.accRight = true;
                break;
        }
    },

    setJumpAction:function(){
        // 跳跃上升
        var jumpUp = cc.moveBy(this.jumpDuration, cc.v2(0, this.jumpHeight)).easing(cc.easeCubicActionOut());
         var jumpLeft = cc.moveBy(this.jumpDuration, cc.v2(-this.jumpHeight, 0)).easing(cc.easeCubicActionOut());
         var jumpRight = cc.moveBy(this.jumpDuration, cc.v2(this.jumpHeight, 0)).easing(cc.easeCubicActionOut());
        // 下落
        var jumpDown = cc.moveBy(this.jumpDuration, cc.v2(0, -this.jumpHeight)).easing(cc.easeCubicActionIn());
        // 不断重复
        // return cc.repeatForever(cc.sequence(jumpUp, jumpDown));
        return cc.repeatForever(cc.sequence(jumpUp,jumpDown,jumpLeft,jumpRight))
    },

    start () {

    },

    // update (dt) {},
});
