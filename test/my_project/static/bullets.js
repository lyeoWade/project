


//子弹类
export default class{

	constructor(dir = 'left' , speed=2){
		this.div=null;


		this.dir=dir;
		this.left=0;
		this.top=0;
		this.width=24;
		this.height=24;
		this.timer=0;

		this.speed=speed

		//设置移动过程中的事件

		this.onmove=function(){}
	}

	//绘制子弹
	draw(wrap){

		this.div=document.createElement('div');
		this.div.classList.add('bullet');
		this.div.classList.add(this.dir);
		wrap.appendChild(this.div);

		//子弹绘制完场 让子弹运动起来
		this.move();
	}

	//计算子弹的位置
	setPos(left,top){
		this.left=left;
		this.top=top;

		this.div.style.left=this.left+'px';
		this.div.style.top=this.top+'px';
	}
	move(){
		this.timer=setInterval(()=>{
			

			switch(this.dir){
				case 'left':
					this.left-=this.speed;
				break;
				case 'right':
					this.left+=this.speed;
				break;
				case 'top':
					this.top-=this.speed;
				break;
				case 'bottom':
					this.top+=this.speed;
				break;
			}
			this.setPos(this.left,this.top);
			typeof this.onmove==='function' && this.onmove();
		},16)
	}

	collision (arr,wrap){

		let p1={
			x:this.left+this.width/2,
			y:this.top +this.height/2
		}
		//console.log(p1.x)
		// if(p1.x<wrap.offsetLeft || p1.x>wrap.offsetWidth ||p1.y<wrap.offsetTop||p1.y>wrap.offsetHeight+wrap.offsetTop){
		// 	this.destory();
		// }
		
		//console.log(p1)
		for(var i=0; i<arr.length; i++){

			let p2={
				x:arr[i].left+arr[i].width/2,
				y:arr[i].top +arr[i].height/2
			}
			//console.log(p2)
			//检测子弹与小球知否碰撞
			if(p1.x>p2.x-10 && p1.x<p2.x+10 && p1.y>p2.y-10 && p1.y<p2.y+10 ){
				return arr[i]
			}
		}

	}

	//碰上之后销毁子弹
	destory(){
		clearInterval(this.timer);
		this.div.remove();
	}
}

