class Car{
    constructor(x,y,width,height){
        this.x=x;
        this.y=y;
        this.width=width;
        this.height=height;

        this.speed=0;
        this.acceleration=0.2;
        this.maxSpeed=3;
        this.friction=0.05;
        this.angle=0;

        
        this.controls=new Controls();
    }
    #move(){
        if(this.controls.forward){
            this.speed += this.acceleration;
        }
        if(this.controls.reverse){
            this.speed -= this.acceleration;
        }

        // speed limits
        if(this.speed > this.maxSpeed){
            this.speed = this.maxSpeed;
        }
        if(this.speed < -this.maxSpeed/2){
            this.speed = -this.maxSpeed/2;
        }

        // friction
        if(this.speed > 0){
            this.speed -= this.friction;
        }
        if(this.speed < 0){
            this.speed += this.friction;
        }
        if(Math.abs(this.speed) < this.friction){
            this.speed = 0;
        }

        // REALISTIC STEERING - only turn when moving
        if(this.speed !== 0){
            const flip = this.speed > 0 ? 1 : -1;

            if(this.controls.left){
                this.angle += 0.03 * flip;
            }
            if(this.controls.right){
                this.angle -= 0.03 * flip;
            }
        }

        // REAL movement based on angle
        this.x -= Math.sin(this.angle) * this.speed;
        this.y -= Math.cos(this.angle) * this.speed;
    }
    update(){
        this.#move();
    }

    draw(ctx){
        ctx.save();
        ctx.translate(this.x,this.y);
        ctx.rotate(-this.angle);
        ctx.beginPath();
        ctx.rect(
            -this.width/2,
            -this.height/2,
            this.width,
            this.height
        );
        ctx.fill()
        // lights
        const headlightHeight = 3;
        const headlightWidth = 3;
        ctx.fillStyle = "yellow";
        ctx.fillRect(
            -this.width/2 + 3,
            -this.height/2 - headlightHeight,
            headlightWidth,
            headlightHeight
        );
        ctx.fillRect(
            this.width/2 - headlightWidth - 3,
            -this.height/2 - headlightHeight,
            headlightWidth,
            headlightHeight
        );
        ctx.fillStyle="red";
        const taillightHeight = 1;
        const taillightWidth = 7;
        ctx.fillRect(
            -this.width/2 + 3,
            this.height/2,
            taillightWidth,
            taillightHeight
        );
        ctx.fillRect(
            this.width/2 - taillightWidth - 3,
            this.height/2,
            taillightWidth,
            taillightHeight
        );
        ctx.restore()
    }
}