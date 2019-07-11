

import Water from './water.js';
import Bullet from './bullets.js';
export default{

	//设置默认水量
	water:10,
	txt:null,
	//容器

	wrap:null,
	score:0,
	scoreHtml:null,
	highScore:0,
	isHistoryScore:false,
	waterEl:[],

	//保存子弹
	bulletsIcon:[],
	//初始化函数

	Start(){

		if(this.wrap===null)throw new Error('请设置容器')

		this.wrap.innerHTML='';

		//初始化点击次数
		this.txt.innerHTML=this.water;
		//绘制初始化页面

		window.localStorage.getItem('highScore')

		//获取最高分数
		if(window.localStorage.getItem('highScore')){
			this.highScore.innerHTML=window.localStorage.getItem('highScore');
			this.isHistoryScore=true;
		}

		for(var i=0; i<36; i++){
			//创建水球实例
			//
			let WaterBall = new Water(Math.floor(Math.random()*5));


			this.waterEl.push(WaterBall);

			//调用水球实例上的绘制方法
			WaterBall.draw(this.wrap);
			//调用小球上的onclick属性 执行点击小球的动作
			WaterBall.onclick=()=>{
				//点击空白处 
				if(WaterBall.level==0){
					return false;
				}

				if(this.water>0){
					this.water--;
					WaterBall.levelUp(this); //修改this指向到构造函数
					this.txt.innerHTML=this.water;
				}else{
					alert('次数用完了，游戏结束')
				}
			}

			//等级变成2的时候统计分数
			WaterBall.onLevelTwo = ()=>{
				this.score+=1;
				this.scoreHtml.innerHTML=this.score;
				
				//将分数存进storage
				//this.highScore.innerHTML=this.score;

				if(this.isHistoryScore){

					if(window.localStorage.getItem('highScore')<this.score){
						window.localStorage.setItem('highScore',this.score);
						this.highScore.innerHTML=this.score;
					}

				}else{
					window.localStorage.setItem('highScore',this.score)
				}
			}

			//等级变成3的时候统计分数
			WaterBall.onLevelThree = ()=>{
				this.score+=2;
				this.scoreHtml.innerHTML=this.score;
				
				//将分数存进storage
				//this.highScore.innerHTML=this.score;

				if(this.isHistoryScore){

					if(window.localStorage.getItem('highScore')<this.score){
						window.localStorage.setItem('highScore',this.score);
						this.highScore.innerHTML=this.score;
					}

				}else{
					window.localStorage.setItem('highScore',this.score)
				}
			}

			//等级变成4的时候统计分数
			WaterBall.onLevelFour = ()=>{
				this.score+=5;
				this.scoreHtml.innerHTML=this.score;
				
				//将分数存进storage
				//this.highScore.innerHTML=this.score;

				if(this.isHistoryScore){

					if(window.localStorage.getItem('highScore')<this.score){
						window.localStorage.setItem('highScore',this.score);
						this.highScore.innerHTML=this.score;
					}

				}else{
					window.localStorage.setItem('highScore',this.score)
				}
			}

			//爆炸的时候

			WaterBall.onbomb =()=>{
				//
				//console.log(123)

				this.score+=10;


				this.scoreHtml.innerHTML=this.score;


				//将分数存进storage
				//this.highScore.innerHTML=this.score;

				if(this.isHistoryScore){

					if(window.localStorage.getItem('highScore')<this.score){
						window.localStorage.setItem('highScore',this.score);
						this.highScore.innerHTML=this.score;
					}

				}else{
					window.localStorage.setItem('highScore',this.score)
				}

				

				//左边
				let BulletLeft= new Bullet('left');
				this.bulletsIcon.push(BulletLeft);
				BulletLeft.draw(this.wrap);
				BulletLeft.setPos(WaterBall.left,WaterBall.top+WaterBall.height/4);
				BulletLeft.onmove=()=>{
					this.moveBullet(WaterBall,BulletLeft);
				}

				//右边
				let BulletRight= new Bullet('right');
				this.bulletsIcon.push(BulletRight);
				BulletRight.draw(this.wrap);
				BulletRight.setPos(WaterBall.left+12,WaterBall.top+WaterBall.height/4);

				BulletRight.onmove=()=>{
					this.moveBullet(WaterBall,BulletRight);
				}

				//上边
				let BulletTop= new Bullet('top');
				this.bulletsIcon.push(BulletTop);
				BulletTop.draw(this.wrap);
				BulletTop.setPos(WaterBall.left+7,WaterBall.top+WaterBall.height/4);

				BulletTop.onmove=()=>{
					this.moveBullet(WaterBall,BulletTop);
				}

				//右边
				let BulletBottom= new Bullet('bottom');
				this.bulletsIcon.push(BulletBottom);
				BulletBottom.draw(this.wrap);
				BulletBottom.setPos(WaterBall.left+7,WaterBall.top+WaterBall.height/4);

				BulletBottom.onmove=()=>{
					this.moveBullet(WaterBall,BulletBottom);
				}

				//Bullets.collision(this.waterEls)
			}

		}

	},
	moveBullet(WaterBall,bullet){
		//过滤waterEl
		let waterPolo=this.waterEl.filter( item => {
			return item!=WaterBall && item.level>0
		} )

		let isCollision=bullet.collision(waterPolo); //碰上
		
		if(isCollision){

			bullet.destory(); //销毁子弹
			//升级被碰撞到的小球
			isCollision.levelUp();

			this.bulletsIcon =this.bulletsIcon.filter( b => b!=bullet);

		}

		//判断子弹是否出界
		if (bullet.left < -bullet.width || bullet.left > this.wrap.offsetWidth-this.wrap.offsetLeft|| bullet.top < this.wrap.offsetTop-10 || bullet.top > this.wrap.offsetHeight+this.wrap.offsetTop ) {
            bullet.destory();
            this.bulletsIcon = this.bulletsIcon.filter( b => b!=bullet);
            //this.bullets = this.bullets.filter( bu => bu != bullet );
        }

        if(this.bulletsIcon.length==0 && this.water>0){

        	let vu = this.waterEl.filter(wp => wp.level!=0)
        	//console.log(vu)

        	if(vu.length==0){
        		alert("恭喜你,过关了");
        		this.water+=5; //过关之后加5
        		this.Start();
        	}
        }

        if(this.bulletsIcon.length==0 && this.water==0){
        	let vu = this.waterEl.filter(wp => wp.level!=0)
        	//console.log(vu)
        	if(vu.length>0){
        		alert("很遗憾失败了")
        	}else{
        		alert("次数用完了")
        	}

        }

        
	}
}
































