



// 水球类


export default class{

	constructor(level){
		this.level=level;
		this.img=null;
		this.div=null;

		//保存小球的位置
		this.left=0;
		this.top=0;
		this.height=0;
		this.width=0

		//当前对象的自定义属性 不是原生的click函数
		this.onclick=function(){}
		this.onbomb=function(){}
		this.onLevelTwo=function(){}
		this.onLevelThree=function(){}
		this.onLevelFour=function(){}
	}

	draw(wrap){
		this.div = document.createElement('div');
		this.div.classList.add('water-polo');

		//小球

		this.img=document.createElement('img');
		this.img.src="./static/"+this.level+".png";

		this.div.appendChild(this.img)
		wrap.appendChild(this.div);


		//保存小球的位置属性
		this.width=this.div.offsetWidth;
		this.height=this.div.offsetHeight;
		this.left=this.div.offsetLeft;
		this.top=this.div.offsetTop;
		console.log()
		this.div.onclick=()=>{
			//点击的时候判断onclick是不是函数 是的话执行onclick 在调用这个构造函数的时候使用onclick函数
			typeof this.onclick === 'function' && this.onclick();
		}

		
	}
	levelUp(){

		
		//根据水量来决定是否能够点击
		//
		this.level++;

		if(this.level==2){
			typeof this.onLevelTwo === 'function' && this.onLevelTwo(); 
		}
		if(this.level==3){
			typeof this.onLevelThree === 'function' && this.onLevelThree(); 
		}

		if(this.level==4){
			typeof this.onLevelFour === 'function' && this.onLevelFour(); 
		}

		if(this.level>4){
			this.level=0;
			//当等级达到4的时候 ， 消灭最大的 然后向周围发射子弹
			typeof this.onbomb === 'function' && this.onbomb();
		}
		this.img.src="./static/"+this.level+".png";
		this.div.appendChild(this.img)
	}

}























