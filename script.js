const canvas=document.getElementById("myCanvas");
canvas.width=200;
canvas.height=window.innerHeight;
const ctx=canvas.getContext("2d");// first define context
const car=new Car(100,100,30,50);
car.draw(ctx);

animate()

function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    car.update();
    // canvas.height=window.innerHeight;
    car.draw(ctx);
    requestAnimationFrame(animate)
}