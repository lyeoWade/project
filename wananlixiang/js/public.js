

function Wanan(){
	//alert(123)

	this.userdatas=this.getCookie('userinfo');
	this.isLogin();
	this.IsPC("m/home.html");
}

Wanan.prototype.isLogin=function(){
	var _this=this; 
	var pic='';
	if(_this.userdatas){
		var obj=eval('('+_this.userdatas+')');
		if(obj.pic==""){
			pic="images/default.jpg";
		}else{
			pic=obj.pic;
		}
		$('.login-wrap').removeClass('show').addClass('hide');
		$('.login-end').removeClass('hide').addClass('show').html('<a target="_blank" href="member.html?id='+obj.id+'"><img src="'+pic+'"><span>'+obj.username+'</span></a>');
	}
}

Wanan.prototype.checkeUser=function(fn){
	var _this=this;
	if(!this.userdatas){
		_this.createLayer({
			text:"请登录之后再操作哦^_^!",
			handle:1
		});
		return false;
	}else{
		fn&&fn()
	}
}

//播放器

Wanan.prototype.Aduio=function(){

	var _this=this,
		PageSize=5,
		nowpage=1,
		ismedia=0;
		_this.wananIndex(PageSize,nowpage,ismedia,function (str){
			var data=eval('('+str+')'),
				shtml='';
			
			var oAudio=document.getElementById('audio'),
			oImg=$('.audio-img-wrap img');
			//alert(datas);
			var random=0;
			

			if(data.Total>0){
				//alert(data.result.length)
				for(var i=0; i<data.result.length; i++){
					var datas=data.result;
					//console.log(datas[0]);
					initAudio(random);
					//初始化
					function initAudio(random){

						var k=eval('('+datas[random]+')')
						$('.audio-img-wrap img').attr('src',k.mediacoverpic);
						$('#audio').attr('src',k.media);
						$('.audio-title').html('<h3><a target="_blank" href="content.html?id='+k.id+'">'+k.title+'</a></h3><p>作者:<a target="_blank" href="member.html?id='+k.authorid+'">'+k.zuozhe+'</a></p>\
							<p class="handles comment-handle"><span class="" satinid="'+k.id+'" data-zan="'+k.id+'"><i class="zan"></i>(<strong>'+k.zan+'</strong>)</span><span class=""><i class="comment"></i>('+k.comment+')</span><span class="" data-sc="'+k.id+'"><i class="shoucang"></i>(<strong>'+k.sc+'</strong>)</span></p>');	

						//收藏
						_this.Collection(2,function(This){
							var oI=This.find('strong'),
								zanNum=oI.html();
								console.log(zanNum)
							oI.html(parseInt(zanNum)+1);
						});
						//给文章点赞
						_this.SatinZan('span[data-zan]','arc',function(obj){
							var oB=obj.find('strong'),
								oI=obj.find('i'),
								zanNum=oB.html();
								oB.html(parseInt(zanNum)+1);
								oI.addClass('zan-active');
								obj.css('color','rgb(255, 68, 102)');
						});				
					};
				}
			}
			//
			$('.paly-btn').on('click',function(){
				if(oAudio.paused){
					oAudio.play();
					$(this).removeClass('play').addClass('pause');
					oImg.css({"animation":"musicpic 5s infinite linear"});
				}else{
					oAudio.pause();
					$(this).removeClass('pause').addClass('play');
					oImg.css({"animation":"0"});
				}		
				
			});

			$('.audio-change a').on('click',function(){
				var randomNum=_this.random(0,datas.length);
				initAudio(randomNum);
			})


			//播放结束之后
			endedPlay();

			function endedPlay(){	
				oAudio.addEventListener('ended',function(){
					var randomNum=_this.random(0,datas.length);
					initAudio(randomNum);	
				},false);
			};
		});
}
//首页banner
Wanan.prototype.getBanner=function(){

	$.ajax({
		url:"admin/pushArc.php",
		type:"POST",
		data:"type=getbanner",
		beforeSend: function(data){
				loading();
		},
		success:function(data){
			$('.layer_loading').css('display','none');
			$(".layer_loading").remove();
			var d=eval('('+data+')');
			var oUlHtml='',
				oTitleHtml='';
			for(var i=0; i<d.result.length; i++){
				var resultobj=eval('('+d.result[i]+')');
				oUlHtml+='<li><a target="_blank" href="content.html?id='+resultobj.id+'" target="_blank"><img src="'+resultobj.banner+'" alt="'+resultobj.title+'"></a></li>';
				oTitleHtml+='<a target="_blank" href="content.html?id='+resultobj.id+'" target="_blank">'+resultobj.title+'</a>';
			}
			$('.banner-ul').html(oUlHtml).animate({'opacity':1});
			$('.font-wrap p').html(oTitleHtml);
			banner();
		}
	})
}
function banner(){
	var $oBanner=$('.banner');
	var $oBannerul=$('.banner-ul');
	var $oLi=$('.banner-ul li');
	//var $oPrev=$('.prev');
	//var $oNext=$('.next');
	var $oBtnWarp=$('.font-wrap ol');
	var $oTitle=$('.font-wrap p a');
	var $oNext=$('.nextprev .next');
	var $oPrev=$('.nextprev .prev');
	//创建按钮
	createBtn();
	function createBtn(){
		var oFrag=document.createDocumentFragment(); //文档碎片
		for (var i = 0; i < $oLi.length; i++) {
			var oLi=document.createElement('li');
			oFrag.appendChild(oLi)
		};
		$oBtnWarp.append(oFrag);
	}

	var $oBtn=$('.font-wrap ol li');
	// int 默认选项
	int();
	function int(){
		$oLi.eq(0).addClass('showli').css({'z-index':'10'});
		$oBtn.eq(0).addClass('active');
		$oTitle.eq(0).addClass('show')
	}

	// 

	var iNow=0;
	var timer=null;
	var iMinzIndex=1;
	timer=setInterval(play,5000);

	// 左右按钮
	$oNext.on('click',function(){
		play();
	})
	$oPrev.on('click',function(){
		prev();
	})
	function play(){
		if(iNow>=$oLi.length-1){
			iNow=0;
		}else{
			iNow++
		}
		mianfn();
	}
	function prev(){
		if(iNow<=0){
			iNow=$oLi.length-1;
		}else{
			iNow--
		}
		mianfn();
	}

	$oBtn.on('click',function(){
		iNow=$(this).index();
		mianfn(iNow);
	});	

	function mianfn(){
		$oBtn.removeClass('active');
		$oBtn.eq(iNow).addClass('active');
		$oLi.stop().animate({opacity:0});
		$oLi.eq(iNow).stop().animate({opacity:1}).css({
			"z-index":iMinzIndex++
		});
		$oTitle.removeClass('show');
		$oTitle.eq(iNow).addClass('show');
	}

	$oBanner.on('mouseenter',function(){
		clearInterval(timer);
		$('.nextprev span').css({'display':'block'})
	});
	$oBanner.on('mouseleave',function(){
		timer=setInterval(play,3000);
		$('.nextprev span').css({'display':'none'})
	});
}

//漂流瓶
Wanan.prototype.plp=function(){

	var oPlpbtn=$_('#plpbtn'),
		_this=this,
		oPushText=$_('.push-text');
	oPlpbtn.onclick=function(){
		_this.checkeUser();
		
		var userInfo=eval('('+_this.userdatas+')');
		var datas="type=Pushplp&userid="+userInfo.id+"&plpval="+encodeURIComponent(oPushText.value.replace(/[\n]/ig,'。'));
		_this.oAjax('admin/satin.php',datas,function(str){
			var obj=eval('('+str+')');
			if(obj.respondCode==0){
				_this.createLayer({
					text:"漂流瓶已扔出!",
					handle:1
				});
				oPushText.value='';
				_this.GetPlpList(1,50);
			}
		},function(str){

		});
	}
}
Wanan.prototype.GetPlpList=function(nowpage,PageSize){

	var _this=this;

	var datas="type=GetPlpList&nowpage="+nowpage+"&PageSize="+PageSize;
	_this.oAjax('admin/satin.php',datas,function(str){
		var obj=eval('('+str+')');

		if(obj.Total>0){
			var sHtml='';
			$('.roll-content').html('');
			for(var i=0; i<obj.Total; i++){
				var oDatas=eval('('+obj.result[i]+')');
				//console.log(oDatas);
				sHtml+='<div class="wanan-now-line"><div class="wanan-now-thumb"><img src="'+oDatas.pic+'"></div>\
			  			<div class="line-info">\
			  						<div class="line-username">\
			  							<a href="">'+oDatas.username+'</a><span>'+oDatas.pushtime+'</span>\
										<div class="line-handle handles fr"><span class="zan">('+oDatas.zan+')</span></div>\
			  						</div>\
			  						<div class="line-content">'+decodeURIComponent(oDatas.content)+'</div></div></div>';

			}
			$('.roll-content').html(sHtml);


			var oBox=getByClass(document,'wanan-roll');
			var oBarBox=getByClass(document,'wanan-bar-roll');

			_this.roll(oBox,oBarBox,0);
		}else{

		}
	},function(str){
		
	});
}



//收藏

Wanan.prototype.Collection=function(typeid,cbfn){
	/*
		typeid
			1:段子
			2:文章
			3:图集
	*/
	var _this=this,
		arcId,
		typeid=typeid,
		userid;
		
	$("span[data-sc],a[data-sc]").on('click',function(){
		
		arcId=$(this).attr('data-sc'),
		authorId=$(this).attr('authorId');
		var This=$(this);
		//alert(arcId)
		if(_this.userdatas!=null){
			userid=eval('('+_this.userdatas+')').id;
			//console.log(arcId)
			$.ajax({
				url:'admin/satin.php',
				data:'type=Sc&authorId='+authorId+'&userid='+userid+'&typeid='+typeid+'&arcid='+arcId,
				type:'POST',
				success:function(str){
					
					var oData=eval('('+str+')');
					//console.log(oData);

					if(oData.respondCode==0){
						_this.createLayer({
							text:oData.respondMsg,
							handle:1
						});
						cbfn&&cbfn(This);
					}else{
						_this.createLayer({
							text:oData.respondMsg,
							handle:1
						});
						return false;
					}
				},
				error:function(){}
			})
		}else{
			_this.createLayer({
				text:"请登录之后再操作哦^_^",
				handle:1
			});
			return false;
		}
	});	
}

//获取自己个人中心的收藏
Wanan.prototype.GetMyCollection=function(nowpage,PageSize){
	var _this=this,
		userid=parseInt(_this.geturldata().id);
	//alert(userid);

	$.ajax({
		url:'admin/satin.php',
		data:'type=GetMyCollection&nowpage='+nowpage+'&PageSize='+PageSize+'&userid='+userid,
		type:'POST',
		success:function(str){	
			var oData=eval('('+str+')');
			
			if(oData.Total>0){
				var sHtml='',oneHtml='';
				for(var i=0; i<oData.result.length; i++){
					var sData=eval('('+oData.result[i]+')'),
						arcInfo='';

					switch(sData.typeid){
						case '1': //段子
							arcInfo='段子 <a target="_blank" href="satincontent.html?id='+sData.arcid+'">'+sData.content.substring(0,35)+'...</a>';
						break;
						case '2'://文章
							arcInfo='文章 <a target="_blank" href="content.html?id='+sData.arcid+'">'+sData.title+'</a>';
						break;
						case '3'://图片
							arcInfo='图集 <a target="_blank" href="content.html?id='+sData.arcid+'">'+sData.title+'</a>';
						break;
					}


					sHtml+='<div class="comment-line-list">\
									<div class="comment-line-info">\
										<a href="javascript:;">'+sData.username+'</a> 收藏了 <a href="member.html?id='+sData.authorid+'">'+sData.authorName+'</a> 的'+arcInfo+'<time>'+sData.createTime+'</time>\
									</div></div>';
					//console.log(sData);
				}
				
				$('.colectionWrap').append(sHtml);
			}else{
				$('.colectionWrap').append('<span class="nodata">暂无收藏</span>');
			}
		},
		error:function(){}
	});
}

//获取自己个人中心的评论
Wanan.prototype.GetMyComment=function(nowpage,PageSize){
	var _this=this,
		userid=parseInt(_this.geturldata().id);
	//alert(userid)
	$.ajax({
		url:'admin/satin.php',
		data:'type=GetMyComment&nowpage='+nowpage+'&PageSize='+PageSize+'&userid='+userid,
		type:'POST',
		success:function(str){	
			var oData=eval('('+str+')');
			console.log(oData)
			if(oData.Total>0){
				var sHtml='',oneHtml='';
				for(var i=0; i<oData.result.length; i++){
					var sData=eval('('+oData.result[i]+')'),
						arcInfo='';
					switch(sData.typeid){
						case '1': //段子
							arcInfo='段子 <a target="_blank" href="satincontent.html?id='+sData.arcid+'">'+sData.content.substring(0,35)+'...</a>';
						break;
						case '2'://文章
							arcInfo='文章 <a target="_blank" href="content.html?id='+sData.arcid+'">'+sData.title+'</a>';
						break;
						case '3'://图片
							arcInfo='图集 <a target="_blank" href="content.html?id='+sData.arcid+'">'+sData.title+'</a>';
						break;
					}
					sHtml+='<div class="comment-line-list">\
										<div class="comment-line-info">\
											<a href="javascript:;">'+sData.username+'</a> 评论了 <a href="member.html?id='+sData.authorid+'">'+sData.authorName+'</a> 的'+arcInfo+'<time>'+sData.commenttime+'</time></div>\
										<div class="comment-content"><span>\评论详情：</span>'+sData.content+'</div></div>';
					console.log(sData);
				}			
				$('.commentWrap').append(sHtml);
			}else{
				$('.commentWrap').append('<span class="nodata">暂无评论</span>');
			}
		},
		error:function(){}
	});
}



//首页图集展示

Wanan.prototype.GetPicList=function(nowpage,PageSize){

	var _this=this;

	var datas="type=GetPicList&nowpage="+nowpage+"&PageSize="+PageSize;
	_this.oAjax('admin/satin.php',datas,function(str){
		var obj=eval('('+str+')');
		console.log(obj)
		if(obj.Total>0){
			var sHtml='',oneHtml='',showlen=7;
			if(obj.Total<showlen){
				showlen=obj.Total;
			}
			for(var i=1; i<showlen; i++){
				var oDatas=eval('('+obj.result[i]+')');
				var thumbpic=eval('('+oDatas.pic+')');//get 封面图
				//console.log(thumbpic.src)
			  	sHtml+='<li style="background:url('+thumbpic.src+') no-repeat ; background-size:cover;"><a target="_blank" href="worldcontent.html?id='+oDatas.id+'" title="'+oDatas.title+'"><span>'+oDatas.title+'</span></a></li>';
			}

			$('.world-index-list').html(sHtml);
			//console.log(oneData)
			var oneData=eval('('+obj.result[0]+')');
			var onepic=(eval('('+oneData.pic+')'));
			
			oneHtml='<div  style="width: 380px; height:280px;background:url('+onepic.src+') no-repeat ; background-size:cover;"></div><p><a target="_blank" href="worldcontent.html?id='+oneData.id+'">'+oneData.title+'</a></p>';
			$('.worldplay-warp').append(oneHtml)
			var oS=document.createElement('script');
			oS.src="js/mark.js";
			var oBody=document.getElementsByTagName('body')[0];
			oBody.appendChild(oS);




		}else{

		}
	},function(str){
		
	});
}

//图片集列表
Wanan.prototype.GetAllPicList=function(tag,nowpage,PageSize){

	var _this=this;
	rePicList(tag,nowpage,PageSize);
	function rePicList(tag,nowpage,PageSize){
		var datas="type=GetPicList&Tag="+tag+"&nowpage="+nowpage+"&PageSize="+PageSize;
		_this.oAjax('admin/satin.php',datas,function(str){
			console.log(str);
			$('.layer_loading').css('display','none');
			$(".layer_loading").remove();

			var obj=eval('('+str+')');

			var obox=document.getElementById('pblbox');
			var aUl=obox.getElementsByTagName('ul');

			function addLi(PageSize,obj){
				//开始的20张
				for(var i=0;i<PageSize;i++){
					var newLi=createLi(obj,i);
					var oUl;
					
					if(aUl[0].offsetHeight<aUl[1].offsetHeight)
					{
						//	aUl[0].offsetHeight  小
						if(aUl[0].offsetHeight<aUl[2].offsetHeight)
						{
							oUl=aUl[0];	
						}
						else
						{
							oUl=aUl[2];		
						}
					}
					else
					{	
						//aUl[1].offsetHeight小
						if(aUl[1].offsetHeight<aUl[2].offsetHeight)
						{
							oUl=aUl[1];	
						}
						else
						{
							oUl=aUl[2];		
						}	
					}
					oUl.appendChild(newLi);
				};
			};

			//console.log(obj.result.length)
			if(obj.Total>0){
				if(obj.Total<=PageSize){
					PageSize=obj.Total;
				};
				if(obj.result.length<PageSize){
					//alert(111)
					$('.loading-more').css('display','none');
					return false;
				}
				addLi(PageSize,obj.result);
				ttao();
				//$('.loading-more').css('display','block');
			}

			


			function ttao(){
				var oLi=obox.getElementsByTagName('li');
				for(var i=0; i<oLi.length; i++){
					(function(ind){
						oLi[ind].onmouseover=function(){
							var oTitlespan=getByClass(this,'titlespan')[0];
							var oLayer=getByClass(this,'flag-layer')[0];
							oLayer.style.transform=oLayer.style.webkitTransform="translateY("+(oLi[ind].offsetHeight-oTitlespan.offsetHeight-oLayer.offsetHeight)+"px)";
						}
						oLi[ind].onmouseout=function(){
							var oTitlespan=getByClass(this,'titlespan')[0];
							var oLayer=getByClass(this,'flag-layer')[0];
							oLayer.style.transform=oLayer.style.webkitTransform="translateY(-40px)";
						}
					})(i)
				}
			}
			window.onscroll=function(){
				var _scroll=document.documentElement.scrollTop||document.body.scrollTop;
				var windowHeight=document.documentElement.clientHeight;
				//出错 body没有高度
				//document.title=document.body.scrollHeight; 
				if(_scroll+windowHeight>=document.body.scrollHeight-100)
				{
					//addLi();
						
				}
			};

			function createLi(obj,i)
			{


				var pblData=eval('('+obj[i]+')');
				
				var onepic=(eval('('+pblData.pic+')'));
				//console.log(pblData)
				var oLi=document.createElement('li');
				oLi.style.height=rnd(300,700)+'px';
				var address=pblData.targetAddress;
				if(pblData.targetAddress==''){
					address='';
				}else{
					var addressArr=pblData.targetAddress.indexOf(',');
					//console.log(addressArr)
					var addressHtml='';
					if(addressArr==-1){
						addressHtml='<a target="_blank" href="world.html?tag='+pblData.targetAddress+'">'+pblData.targetAddress+'</a>';
					}else{
						var cArr=pblData.targetAddress.split(',');
						for(var k=0; k<cArr.length; k++){
							addressHtml+='<a  target="_blank" href="world.html?tag='+cArr[k]+'">'+cArr[k]+'</a>&nbsp;&nbsp;';
						}
					}

					address='<div class="fl flag-address"><i></i>'+addressHtml+'</div>';
				}

				oLi.innerHTML='<div class="flag-layer"><div class="fl flag-author"><i></i><a target="_blank" href="member.html?id='+pblData.userid+'">'+pblData.username+'</a></div>'+address+'<div class="fr flag-comment"><span>230&nbsp;评论</span></div><div class="fr flag-see"><span>230&nbsp;浏览</span>&nbsp;-&nbsp;</div></div>\
					<a class="tagetUrl" href="worldcontent.html?id='+pblData.id+'" style="background:url('+onepic.src+') no-repeat center center; background-size:cover;"><span class="titlespan">'+pblData.title+'</span></a>';
				oLi.style.background='rgb('+rnd(0,255)+','+rnd(0,255)+','+rnd(0,255)+')';
				oLi.className='com_color_'+rnd(1,10);
				return oLi;
			};
			function rnd(n,m)
			{
				return parseInt(Math.random()*(m-n+1)+n);
			};
		},function(str){
			
		},function(){
			loading();
		});

	}

	$('.loading-more a').on('click',function(){
		nowpage++;
		rePicList(tag,nowpage,PageSize);
	});
}


//图片集详情

Wanan.prototype.GetPicdetail=function(){
	var _this=this;
	//获取图集id
	var picId=_this.geturldata().id;
	//alert(picId)
	//获取一个图集详情
	var datas="type=GetPicDetail&id="+picId;
	_this.oAjax('admin/satin.php',datas,function(str){
		
		var oData=eval('('+str+')');

		//初始化页面

		$('title').html(oData.title);
		$('#h1-story-title').html(oData.title);
		$('.author').html('<a target="_blank" href="member.html?id='+oData.userid+'">BY '+oData.username+'</a>');

		

		//操作图片集
		var oPicList=eval('(['+oData.pic+'])');
		
		for(var k=0; k<oPicList.length; k++){
			var oDiv=document.createElement('div');
			oDiv.className="showpic";
			oDiv.style.background="url("+oPicList[k].src+")";
			oDiv.style.backgroundSize='cover';

			if(oPicList[k].txt!=''){
				oDiv.innerHTML='<div class="mark-font">'+oPicList[k].txt+'</div>'	
			}
			
			$('.pic-wrap-box').prepend(oDiv);
			
		}

		var ttimeArr=oData.ttime.substring(0,10).split('-');
		
		$('.date').html('<span class="month">'+_this.MonthtoE(ttimeArr[1])+'</span><span class="day">'+ttimeArr[2]+'</span>.<span class="year">'+ttimeArr[0]+'</span>');
		//$('#pic-bgm-audio').attr('src',oData.musicurl);
		// $('.start-play').on('click',function(){

		// });
		console.log(oData.targetAddress);
		var address=oData.targetAddress;
		if(oData.targetAddress==''){
			address='';
		}else{
			var addressArr=oData.targetAddress.indexOf(',');
			//console.log(addressArr)
			var addressHtml='';
			if(addressArr==-1){
				addressHtml='<a target="_blank" href="world.html?tag='+oData.targetAddress+'">'+oData.targetAddress+'</a>';
			}else{
				var cArr=oData.targetAddress.split(',');
				for(var k=0; k<cArr.length; k++){
					addressHtml+='<a  target="_blank" href="world.html?tag='+cArr[k]+'">'+cArr[k]+'</a>&nbsp;&nbsp;';
				}
			}

			address='<i></i>'+addressHtml+'';
		}

		$('.info').html(''+address+'&nbsp;·&nbsp;'+oPicList.length+'照片&nbsp;·&nbsp;<a href="javascript:;" id="showComment">'+oData.comment+'评论</a>&nbsp;·&nbsp;'+oData.see+'&nbsp;浏览&nbsp;·&nbsp;'+oData.zan+' 赞');

		$('#coverpic').css({
			"background":" url("+oPicList[0].src+")",
			"background-size":"cover"
		});


		_this.picTabSwitch();
	},function(){},function(){

	});

}
Wanan.prototype.picTabSwitch=function(){
	var oBtn=$('.start-show'),
		oInitInfo=$('.story-cover-title'),
		oInitPic=$('#coverpic'),
		oPicList=$('.showpic'),
		oNext=$('.nextbtn'),
		oPrev=$('.prevbtn'),
		oHeadNav=$('#nav-warp'),
		oFont=$('.mark-font');
	oBtn.on('click',function(){
		oInitInfo.animate({'opacity':0},200,function(){
			oInitInfo.css({'display':'none'});
			oInitPic.css('display','none');
			$(oPicList).eq(0).animate({opacity:1},500);
			//oFont.eq(0).css('display','block');
		});
	});
	var iNow=0;
	var nimIndex=1;
	function autoFn(){
		$(oPicList).stop().animate({opacity:0});
		$(oPicList).eq(iNow).stop().animate({opacity:1},500).css({
			"z-index":nimIndex++
		});
	}
	oNext.on('click',function(){
		
		if(iNow>=oPicList.length-1){
			alert('图集浏览完成')
		}else{
			iNow++
		}
		autoFn();
	});

	oPrev.on('click',function(){
		
		if(iNow<=0){
			alert('前面没有了,这里就是第一张。')
		}else{
			iNow--
		}
		autoFn();
	});


	//移动显示菜单栏
	

	oHeadNav.on('mouseover',function(){
		oHeadNav.stop().animate({'opacity':'0.7'},500);
	});
	oHeadNav.on('mouseout',function(){
	
		oHeadNav.stop().animate({'opacity':'0'},500);
	});
}
Wanan.prototype.oAjax=function(url,datas,sfn,ffn,loadfn){
	$.ajax({
		url:url,
		type:"POST",
		beforeSend:function(str){
			loadfn&&loadfn(str);
		},
		data:datas,
		success:function(str){
			sfn(str);
		},
		error:function(str){
			ffn&&ffn();
		}
	})
}
Wanan.prototype.AduioOne=function(k){

	var _this=this,
		PageSize=5,
		nowpage=1,
		ismedia=0;


	var oAudio=document.getElementById('audio'),
	oImg=$('.audio-img-wrap img');
	//alert(datas);
	//var random=0;
	
	initAudio(k);
	//初始化
	function initAudio(k){

		//var k=eval('('+datas[random]+')')
		$('.audio-img-wrap img').attr('src',k.mediacoverpic);
		$('#audio').attr('src',k.media);
		try{
			_this.createAnalysers(oAudio);	

			setInterval(function(){
				nowTime(oAudio);
			},1000);
		}catch(e){

		}
		
	};


	
	

	//
	$('.paly-btn').on('click',function(){
		if(oAudio.paused){
			oAudio.play();
			$(this).removeClass('play').addClass('pause');
			oImg.css({"animation":"musicpic 5s infinite linear"});
			
		}else{
			oAudio.pause();
			$(this).removeClass('pause').addClass('play');
			oImg.css({"animation":"0"});
		}		
		
	});

	var progressBox=document.getElementById('progress');
	var progress=document.getElementById('progress').children[0];
	function nowTime(obj){
		//当前播放时间
		//播放进度
		var scale = obj.currentTime/obj.duration;
		//console.log(scale)
		progress.style.width = scale * 540 + 'px';
		
	}


	//播放结束之后
	endedPlay();

	function endedPlay(){	
		oAudio.addEventListener('ended',function(){
			//var randomNum=_this.random(0,datas.length);
			initAudio(k);	
		},false);
	};
}
//创建音频
Wanan.prototype.createAnalysers=function(obj){ 
	//音频文件接口：用来监听音乐的播放
	window.AudioContext=window.AudioContext||window.webkitAudioContext||window.mozAudioContext;
	var _this=this;
	var actx = new AudioContext();  //创建一个音乐对象
	// 创建一个音频节点
	var analyser = actx.createAnalyser();
	//创建音乐媒体源节点
	var audioSrc = actx.createMediaElementSource(obj);

	//console.log(audioSrc)
	//将媒体源节点与分析机制链接
	audioSrc.connect(analyser);
	
	//将分析机制与目标点链接（扬声器）
	analyser.connect(actx.destination);

	console.log(analyser);
	var num = 100;     
	var can = $_(".audio-info");

	var cxt = can.getContext("2d");
	color = cxt.createLinearGradient(can.width*0.2,0,can.width*0.2,150);
	color.addColorStop(0,"#fff");
	color.addColorStop(0.5,"#f00");
	color.addColorStop(1,"#ccc");
	colorf = cxt.createLinearGradient(can.width*.2,150,can.width*.2,250);
	colorf.addColorStop(0,"#ccc");
	colorf.addColorStop(0.5,"#f00");
	colorf.addColorStop(1,"#fff");
	draw();
	function draw(){
		//创建一个与音乐频次等长的数组 【自动转换为0-255之间的数子】
		var voicehigh = new Uint8Array(analyser.frequencyBinCount);
		//将分析出来的音频数据添加到数组里面
		analyser.getByteFrequencyData(voicehigh);
		//console.log(voicehigh);
		var step = Math.round(voicehigh.length/num);
		cxt.clearRect(0,0,can.width,can.height);
		cxt.globalAlpha = 0.3;//透明度
		cxt.beginPath();
		for(var i=0;i<num;i++){
			var value = (voicehigh[step*i])/2;
			cxt.fillStyle = color;
			cxt.fillRect(i*10+can.width*0.2,150,7,-value+1);
			cxt.fillRect(can.width*0.2-(i-1)*10,150,7,-value+1); 
			cxt.fillStyle = colorf;       
			cxt.fillRect(i*10+can.width*0.2,150,7,value+1);
			cxt.fillRect(can.width*0.2-(i-1)*10,150,7,value+1);
		}
		cxt.closePath();
		requestAnimationFrame(draw);
	}
}


Wanan.prototype.satinPush=function(){
	var _this=this;
	$('.satin-btn').on('click',function(){
		var oContent=encodeURIComponent($('#satincontent').val());
					 //encodeURIComponent
		var iUserId=eval('('+_this.userdatas+')'),
			$picArr=$('#uploader').attr('imageSrc'),
			picurl='',
			satintype=1;
			if($picArr!=undefined){
				picurl=$picArr.replace(/\\/g,'/');
			}
		//alert(oContent+'-'+picurl)
		if(oContent=='' && picurl==''){
			_this.createLayer({
				text:"总得干点什么吧？",
				handle:1
			});
			return false;
		};

		if(oContent.length<6){
			_this.createLayer({
				text:"你确定这是一个段子？",
				handle:1
			});
			return false;
		}

		if(picurl==''){
			satintype=1;
		}else{
			satintype=2;
		}
		$.ajax({
			url:"admin/satin.php",
			type:"POST",
			data:"type=pushOneSatin&userid="+iUserId.id+"&content="+oContent+"&satintype="+satintype+"&picurl="+picurl,
			success:function(str){
				console.log(str);
				var data=eval('('+str+')');
				if(data.respondCode==0){
					_this.createLayer({
						text:data.respondMsg,
						handle:1
					},function(){
						history.go(0);
					});

				}else{
					_this.createLayer({
						text:data.respondMsg,
						handle:1
					});
				}
			}
		})
		//alert($picArr);


	});

}

Wanan.prototype.pushWorld=function(){
	var _this=this;
	$('#picfile').on('change',function(){
	    var oFile=$('#picfile').get(0).files[0];
	    console.log(oFile);
	    uploades(oFile,function(d){
		    if(d.code==0){
		    	_this.createLayer({
					text:d.msg,
					handle:1
				});
		       $('.pic-wrap-box-list').prepend('<div class="pic-one-line"><div class="pic-tumb fl">\
					<img src="server/'+d.url+'"></div><div class="pic-desc fl">\
					<textarea></textarea>\
					<div class="handle-wrap"><span class="delete"></span></div></div></div>');
		    };
	    });
	});

	$('.world-btn').on('click',function(){

		var obj=eval('('+_this.userdatas+')');
		if(obj==null){
			_this.createLayer({
				text:"请登录之后再操作哦！",
				handle:1
			});
			setTimeout(function(){
				window.location.href="denglu.html";
			},1000)
		};

		var txt=$('.pic-text'),
			time=$('.pic-time'),
			target=$('.pic-target'),
			song=$('.pic-song'),
			pass=$('.pic-pass'),
			userid=obj.id,
			picWrap=$('.pic-wrap-box-list');
		if(txt.val()=='' || txt.val().length>20){
			_this.createLayer({
				text:"请填写2-20字的标题哦！",
				handle:1
			});

			return false;
		}
		if(time.val()==''){
			_this.createLayer({
				text:"请选择您出行的日期",
				handle:1
			});

			return false;
		}
		if(target.val()==''){
			_this.createLayer({
				text:"请填写您出行的目的地",
				handle:1
			});
			return false;
		}
		if(pass.val()!='' && pass.val().length!=4 || pass.val()!='' && /^{0-9}[4]$/.test(pass.val())){
			_this.createLayer({
				text:"请填写4位数字作为相册密码",
				handle:1
			});
			return false;
		}
		//alert(picWrap.html())
		if(picWrap.html()==''){
			_this.createLayer({
				text:"请上传图片",
				handle:1
			});
			return false;
		}
		var $line=$('.pic-one-line');
		var picData=[];
		$line.each(function(ind){
			var $src=$line.eq(ind).find('img').attr('src');
			var $txt=$line.eq(ind).find('textarea').val();
			picData.push('{"src":"'+$src+'","txt":"'+$txt+'"}');
		})
		//console.log(picData);

		var datas='type=pushWorld&title='+txt.val()+'&targetAddress='+target.val()+'&userid='+userid+'&ttime='+time.val()+'&pass='+pass.val()+'&musicurl='+encodeURIComponent(song.val())+'&picurl='+encodeURIComponent(picData);

		console.log(datas);
		//return false;
		$.ajax({
			type:"POST",
			url:"admin/satin.php",
			data:datas,
			beforeSend: function(str){
				//loading();
			},
			success:function(str){
				console.log(str);
				var data=eval('('+str+')');
				if(data.respondCode==0){
					_this.createLayer({
						text:data.respondMsg,
						handle:1
					},function(){
						history.go(0);
					});
				}else{
					_this.createLayer({
						text:data.respondMsg,
						handle:1
					});
				}
			}
		});	
	})
}


//段子列表
Wanan.prototype.satin=function(userId){
	var nowpage=1,
		PageSize=20,
		satintype=1,
		_this=this;
	satinList(nowpage,PageSize,satintype,userId);

	function satinList(nowpage,PageSize,satintype,userId){
		//alert(userId);
		$.ajax({
			type:"POST",
			url:"admin/satin.php",
			data:"type=GetSatinList&userId="+userId+"&nowpage="+nowpage+"&PageSize="+PageSize+"&satintype="+satintype,
			beforeSend: function(data){
				loading();
			},
			success:function(data){
				$('.layer_loading').css('display','none');
				$(".layer_loading").remove();
			//success:function(data){
				var datas=eval('('+data+')');
				console.log(datas)
				if(datas.Total!=0){
					var shtml='',imgbox='',picarr='';
					for(var i=0; i<datas.result.length; i++){
						var strs=eval('('+datas.result[i]+')');
						//console.log(strs.picture)
						var picUrl='';
						if(strs.picture!=''){
							var picArr=strs.picture.split(',');
							
							for(var j=0; j<picArr.length; j++){
								picUrl+='<img src="'+picArr[j]+'"/>';
							}
						}

						if(strs.userpic=='')strs.userpic='images/default.jpg';
						
						imgbox='<div class="imgbox">'+picUrl+'</div>';
						shtml+='<div class="satin-line"><div class="satin-thumb">\
								<img src="'+strs.userpic+'">\
								<div class="satin-line-username">\
									<a target="_blank" href="member.html?id='+strs.userid+'">'+strs.zuozhe+'</a>\
									<span>'+strs.pushtime+'</span></div></div>\
								<div class="satin-line-info"><div class="satin-line-content">\
									<a target="_blank" href="satincontent.html?id='+strs.id+'">'+strs.content+''+imgbox+'</a>\
								</div><div class="satin-line-handle ">\
									<div class="fl"><span class="zan-btn" satinid='+strs.id+'><i class="zan"></i>'+strs.zan+'</span>\
								<span  class="cai-btn" satinid='+strs.id+'><i class="cai"></i>'+strs.cai+'</span>\
								<span class="shoucang-btn" data-sc="'+strs.id+'" satinid='+strs.id+' authorId="'+strs.userid+'"><i class="shoucang"></i>'+strs.sc+'</span></div>\
								<div class="fr"><span class="comment-btn"><a target="_blank" href="satincontent.html?id='+strs.id+'"><i class="comment"></i>'+strs.comment+'</a></span></div>\
								</div></div></div>';
					}
					if(datas.Total>1){
						$('.satin-list').append(shtml);
						//alert(nowpage*PageSize+'-'+datas.Total);
						$('#loadmore').attr('nowpage',nowpage)
						if(nowpage*PageSize>=datas.Total){
							//alert('来了')
							$('.load-more').css('display','none')
						}
					}else{
						$('.satin-list').append(shtml);
						$('.load-more').css('display','none')
					}

					_this.SatinZan('.zan-btn');
					_this.SatinCai('.cai-btn');
					_this.Collection(1,function(This){
						This.html('<i class="shoucang"></i>'+(parseInt(This.text())+1));
					});
				}
			}
		});	
	}

	$('#loadmore').on('click',function(){
		nowpage++;
		//var num=$('#loadmore').attr('nowpage');
		var typeid=$(this).attr('typeid');
		satinList(nowpage,PageSize,typeid,userId);
	});

	$('.satin-tag-wrap a').on('click',function(){
		nowpage=1,
		PageSize=20;
		$('.satin-tag-wrap a').removeClass('active')
		$(this).addClass('active');
		var satintypes=$(this).attr('typeid');
		//清空
		$('.satin-list').html('');
		$('.load-more').css('display','block');
		$('#loadmore').attr('typeid',satintypes);
		$('#loadmore').attr('nowpage',1);
		satinList(nowpage,PageSize,satintypes,userId);
	});
};


//获取评论列表  
/*
	commenttypeid-评论栏目id  
	1->段子
	2->文章
	3->图片
*/
Wanan.prototype.GetCommentList=function(commenttypeid){
	var nowpage=1,
		PageSize=20,
		_this=this,
		targetid=this.geturldata(window.location.href).id;
	GetCommentList(nowpage,PageSize,targetid,commenttypeid);

	function GetCommentList(nowpage,PageSize,targetid,commenttypeid){
		$.ajax({
			type:"POST",
			url:"admin/satin.php",
			data:"type=GetCommentList&nowpage="+nowpage+"&PageSize="+PageSize+"&targetid="+targetid+"&commenttypeid="+commenttypeid,
			success:function(data){
				var datas=eval('('+data+')');
				console.log(datas)
				$('.all-num').html('('+datas.Total+')');
				if(datas.Total!=0){
					var shtml='';
					for(var i=0; i<datas.result.length; i++){
						var strs=eval('('+datas.result[i]+')');
						if(strs.pic==''){
							strs.pic="images/4.jpg";
						};
						shtml+='<div class="comment-line">\
						<div class="comment-user-pic">\
							<img src="'+strs.pic+'"></div>\
						<div class="comment-user-wrap">\
							<div class="comment-user-info clearfix">\
								<div class="fl comment-username"><p>'+strs.username+'</p><p>'+strs.commenttime+'</p></div>\
								<div class="fr comment-handle">\
									<span class="comment-zan-btn" satinid="'+strs.id+'"><i class="zan"></i>'+strs.zan+'</span>\
									<span class="comment-cai-btn" satinid="'+strs.id+'"><i class="cai"></i>'+strs.cai+'</span>\
									</div></div>\
							<div class="comment-user-content">'+decodeURIComponent(strs.content)+'</div></div></div>';
					}
					if(datas.Total>1){
						$('.all-comment-list').append(shtml);
						$('#loadmore').attr('nowpage',nowpage)
						if(nowpage*PageSize>=datas.Total){
							$('.load-more').css('display','none');
						}
					}else{
						$('.all-comment-list').append(shtml);
						$('.load-more').css('display','none')
					}

					_this.SatinZan('.comment-zan-btn',commenttypeid);
					_this.SatinCai('.comment-cai-btn',commenttypeid);
				}else{
					$('.all-comment-list').html("暂无评论");
					$('.load-more').css('display','none')
				}
			}
		});	
	}

	$('#loadmore').on('click',function(){
		nowpage++;
		//var num=$('#loadmore').attr('nowpage');
		GetCommentList(nowpage,PageSize,targetid,commenttypeid);
	});

	$('.satin-tag-wrap a').on('click',function(){
		nowpage=1,
		PageSize=20;
		$('.satin-tag-wrap a').removeClass('active')
		$(this).addClass('active');
		//清空
		$('.all-comment-list').html('');
		$('.load-more').css('display','block');
		$('#loadmore').attr('nowpage',1);
		GetCommentList(nowpage,PageSize,targetid,commenttypeid);
	});
	
};

Wanan.prototype.SatinZan=function(ele,typeid,cbfn){
	var This=this;
	// /SatinZan

	
	$(ele).on('click',function(){

		//satinid  -- > 目标id 例如文章id 图集id 段子id 具体某一条评论的id
		

		var satinid=$(this).attr('satinid');
		var _this=$(this);
		if($(this).attr('isable')==undefined){
			var datas="type=satinZan&typeZanid="+typeid+"&satinid="+satinid;
			//console.log(datas);
			$.ajax({
				type:"POST",
				url:"admin/satin.php",
				data:datas,
				success:function(data){
					var datas=eval('('+data+')');
					//console.log(datas)
					if(datas.respondCode==0){
						//
						This.createLayer({
							text:'点赞成功！',
							handle:1
						});
						if(cbfn){
							cbfn(_this)
						}else{
							_this.html('<i class="zan-active"></i>'+(parseInt(_this.text())+1)).css('color','#f46').attr('isable','1');
						}
					}else{
						alert(datas.respondMsg)
					}
				}
			});	
		}
	})
}
Wanan.prototype.SatinCai=function(ele,typeid){
	$(ele).on('click',function(){
		var satinid=$(this).attr('satinid');
		var _this=$(this);
		if($(this).attr('isable')==undefined){

			var datas="type=satinCai&typeZanid="+typeid+"&satinid="+satinid;
			$.ajax({
				type:"POST",
				url:"admin/satin.php",
				data:datas,
				success:function(data){
					var datas=eval('('+data+')');
					console.log(datas)
					if(datas.respondCode==0){
						_this.html('<i class="cai-active"></i>'+(parseInt(_this.text())+1)).css('color','#4c8b22').attr('isable','1');
					}else{
						alert(datas.respondMsg)
					}
				}
			});	
		}
	})
};

//增加浏览量
/*
	typeComId 
		1：增加文章浏览量
		2：增加图集浏览量
*/
Wanan.prototype.pageView=function(typeComId){
	var pageId=this.geturldata(window.location.href).id;
	$.ajax({
		type:"POST",
		url:"admin/satin.php",
		data:"type=pageview&typeComId="+typeComId+"&id="+pageId,
		success:function(str){
			var oData=eval('('+str+')');
			console.log(oData)
		}
	});
}


//获取段子详情
Wanan.prototype.GetOneSatin=function(){
	var _this=this;
	var satinid=_this.geturldata(window.location.href).id;

	
	$.ajax({
		type:"POST",
		url:"admin/satin.php",
		data:"type=GetOneSatin&satinid="+satinid,
		beforeSend: function(data){
			loading();
		},
		success:function(data){
			$('.layer_loading').css('display','none');
			$(".layer_loading").remove();
			var oData=eval('('+data+')');
			console.log(oData)
			if(oData.respondCode==0){
				
				$('.satin-line-username').html('<a target="_blank" href="member.html?id='+oData.userid+'">'+oData.username+'</a><span>'+oData.pushtime+'</span>');
				var picUrl='';
				if(oData.picture!=''){
					var picArr=oData.picture.split(',');
					
					for(var j=0; j<picArr.length; j++){
						picUrl+='<img src="'+picArr[j]+'"/>';
					}
				}

				
				if(oData.userpic=='')oData.userpic='images/default.jpg';
				$('#usertx').attr('src',oData.userpic);
				//
				imgbox='<div class="imgbox">'+picUrl+'</div>';
				$('.satin-line-content').html(oData.content+imgbox);
				$('.satin-line-j').html('<span class="zan-btn" satinid='+oData.id+'><i class="zan"></i>'+oData.zan+'</span>\
								<span class="cai-btn" satinid='+oData.id+'><i class="cai"></i>'+oData.cai+'</span>\
								<span class="shoucang-btn" data-sc="'+oData.id+'" satinid='+oData.id+' authorId="'+oData.userid+'"><i class="shoucang"></i>'+oData.shoucang+'</span>');
				$('.satin-push-btn').attr('authorId',oData.userid);
				_this.SatinZan('.zan-btn');
				_this.SatinCai('.cai-btn');
				_this.Collection(1,function(This){
					This.html('<i class="shoucang"></i>'+(parseInt(This.text())+1));
				});
			}else{
				alert(oData.respondMsg)
			}
			//console.log(oData)
		}
	});	
}

//评论组件
Wanan.prototype.SatinComment=function(commenttypeid){
	var _this=this;
	var oText=$_('.satin-push-textarea');
	var allNum=140;

	//获取当前用户信息  头像 id
	var userdatas=this.getCookie('userinfo');
	var obj=eval('('+userdatas+')');
	if(obj.pic){
		$('.user-pic img').attr('src',obj.pic);
	}else{
		$('.user-pic img').attr('src',"images/default.jpg");
	}

	_this.oinput(oText,function(){
		$_('#fontnum').innerHTML=allNum-oText.value.length;
		if(parseInt($_('#fontnum').innerHTML)<=0){
			$_('#fontnum').style.color='red';
		}else{
			$_('#fontnum').style.color='#969696';
		}
	});


	//pinglun




	$('.satin-push-btn').on('click',function(){

		if(parseInt($_('#fontnum').innerHTML)<=0){
			_this.createLayer({
				text:"请输入0-140字评论",
				handle:1
			});
			return false;
		}

		if(oText.value==''){
			_this.createLayer({
				text:"请输入评论！",
				handle:1
			});
			return false;
		}

		/*
			content
			authorId  作品作者id
			userid	  评论用户id
			targetid  文章,图集,段子id
			commenttypeid    文章,图集,段子分类id
						1:段子
						2:文章
						3:图集

		*/

		var cuserid=eval('('+_this.userdatas+')');
		if(!cuserid){
			_this.createLayer({
				text:"请登录之后再评论",
				handle:1
			});
			return false;
		}

		var authorId=$(this).attr('authorid');

		if(!authorId){
			_this.createLayer({
				text:"系统异常，请刷新页面！",
				handle:1
			});
			setTimeout(function(){
				history.go(0);
			},1500);
			return false;
		}
		//console.log(cuserid);
		var tsrgetid=_this.geturldata(window.location.href).id;
		var datas="type=SatinCommentPush&content="+oText.value+"&userid="+cuserid.id+"&targetid="+tsrgetid+"&authorId="+authorId+"&commenttypeid="+commenttypeid;
		$.ajax({
			type:"POST",
			url:"admin/satin.php",
			data:datas,
			success:function(str){
				console.log(str);
				var oDatas=eval('('+str+')');
				if(oDatas.respondCode==0){
					
					var oBox=getByClass(document,'all-comment-list')[0];
					oBox.innerHTML='';
					
					_this.GetCommentList(commenttypeid);

					oText.value='';
				}else{

				}

				_this.createLayer({
					text:oDatas.respondMsg,
					handle:1
				});
			}
		})

	});
};

//获取文章列表
Wanan.prototype.GetArcList=function(ismedias,userid){
	var nowpage=1,
		PageSize=20,
		_this=this;
	GetArcList(nowpage,PageSize,userid,ismedias);
	//alert(userid);
	function GetArcList(nowpage,PageSize,userid,ismedias){
		$.ajax({
			type:"POST",
			url:"admin/pushArc.php",
			data:"type=GetArcList&nowpage="+nowpage+"&PageSize="+PageSize+"&authorid="+userid+"&ismedias="+ismedias,
			beforeSend: function(data){
				loading();
			},
			success:function(data){
				$('.layer_loading').css('display','none');
				$(".layer_loading").remove();
				var datas=eval('('+data+')');
				console.log(datas)
				$('.all-num').html('('+datas.Total+')');
				if(datas.Total!=0){
					var shtml='';
					for(var i=0; i<datas.result.length; i++){
						var strs=eval('('+datas.result[i]+')');
						if(strs.coverpic==''){
							strs.coverpic="images/default.jpg";
						};
						shtml+='<div class="wanan-line line-style-'+_this.random(1,8)+'">\
					<div class="img-wrap"><img src="'+strs.coverpic+'"></div>\
					<div class="wanan-line-content">\
							<h2 class=""><a target="_blank" href="content.html?id='+strs.id+'">'+strs.title+'</a></h2>\
						<div class="author"><p>来源:<a target="_blank" href="member.html?id='+strs.authorid+'">'+strs.zuozhe+'</a></p></div>	  					<div class="desc">'+strs.description+'</div>	  					<div class="info"><p class="fl">发布时间:'+strs.pushtime+'</p><p class="fr">阅读:0 &nbsp; 评论:'+strs.comment+'</p></div></div></div>';
					}
					if(datas.Total>1){
						$('.wananlist-l-content').append(shtml);
						$('.moreList a').attr('nowpage',nowpage)
						if(nowpage*PageSize>=datas.Total){
							$('.moreList').css('display','none');
						}
					}else{
						$('.wananlist-l-content').append(shtml);
						$('.moreList').css('display','none')
					}

					//_this.SatinZan('.comment-zan-btn',commenttypeid);
					//_this.SatinCai('.comment-cai-btn',commenttypeid);
				}
			}
		});	
	}

	$('.moreList a').on('click',function(){
		nowpage++;
		GetArcList(nowpage,PageSize,userid,ismedias);
	});

	$('.wananlist-l-t a').on('click',function(){
		$('.wananlist-l-t a').removeClass('active');
		$(this).addClass('active');

		var hash=$(this)[0].dataset.hash;
		window.location.hash=hash;

		if(hash=="voice"){
			ismedias=0;
		}else{
			ismedias="";
		}
		
		nowpage=1,
		PageSize=20;
		//清空
		$('.wananlist-l-content').html('');
		$('.moreList').css('display','block');
		$('.moreList a').attr('nowpage',1);
		GetArcList(nowpage,PageSize,userid,ismedias);
	});
};
//写段子  写文章公用模块
Wanan.prototype.Write=function(obj,url){
	var _this=this;
	obj.onclick=function(){
		_this.checkeUser(function(){
			window.location.href=url;
		});
	}
}
Wanan.prototype.GetOneArc=function(){
	var _this=this,
		id   =_this.geturldata(window.location.href).id;
	$.ajax({
		type:"POST",
		url:"admin/pushArc.php",
		data:"type=GetOneArc&id="+id,
		beforeSend: function(){
				loading();
		},
		success:function(data){
			//sadasda
			$('.layer_loading').css('display','none');
			$(".layer_loading").remove();

			var datas=eval('('+data+')');
			console.log(datas);
			if(datas.Total!=0){
				if(datas.ismedia==1){
					$('.audio-wrap-box').css('display','none');
				}
				$('.arc-box').html(datas.content);
				_this.AduioOne(datas);
				$('.title h1').html(datas.title);
				$('title').html(datas.title+'&nbsp;-&nbsp;晚安理想');
				$('.c-author').html('<span><a href="member.html?id='+datas.userid+'">'+datas.username+'</a></span>');
				$('.c-pushtime').html('<span>'+datas.pushtime+'</span>');
				$('.c-comment').html('<a href="#comment" >('+datas.comment+')</a>');
				$('.satin-push-btn').attr('authorId',datas.userid)
				$('.arc-handle').html('<div class="arc-handle-wrap"><a href="javascript:;" class="zan" data-zan="'+datas.id+'" satinid="'+datas.id+'">&nbsp;</a><span>已有<i>'+datas.zan+'</i>人点赞</span></div>\
							<div class="arc-handle-wrap"><a href="javascript:;" class="sc" data-sc="'+datas.id+'" authorId="'+datas.userid+'">&nbsp;</a><span>已有<i>'+datas.shoucang+'</i>人收藏</span></div>');
			};
		},
		complete:function(){
			_this.Collection(2,function(This){
				var oI=This.parent().find('i'),
					zanNum=oI.html();
				oI.html(parseInt(zanNum)+1);
			});
			//给文章点赞
			_this.SatinZan('a[data-zan]','arc',function(_this){

				var oI=_this.parents('.arc-handle-wrap').find('i'),
					zanNum=oI.html();
					//alert(_this)
				oI.html(parseInt(zanNum)+1);
			});
		}
	});	
}
Wanan.prototype.GetHotArcList=function(ismedias){
	var nowpage=1,
		PageSize=10,
		_this=this;
	GetHotList();

	function GetHotList(){
		$.ajax({
			type:"POST",
			url:"admin/pushArc.php",
			data:"type=GetHotList",
			success:function(data){
				var datas=eval('('+data+')');
				console.log(datas);
				if(datas.Total!=0){
					var shtml='';
					for(var i=0; i<datas.result.length; i++){
						var strs=eval('('+datas.result[i]+')');
						
						shtml+='<a target="_blank" href="content.html?id='+strs.id+'">'+strs.title+'</a>';
					}
					
					$('.arcList').html(shtml)
				}
			}
		});	
	}

};
Wanan.prototype.reg=function(){

	var oName=$("#name");
	
	var oPass=$("#password");
	var oRepass=$("#repassword");
	var oEmail=$("#email");
	var _this=this;
	$('#regsub').on("click",function(){
		
		if(oName.val()==""){
			oName.parent().find('span').removeClass('success');
			oName.parent().find('span').html('用户名不能为空！').addClass('error');
			return;
		}else if(!/^[0-9a-zA-Z_\\u4e00-\\u9fa5]{2,16}$/.test(oName.val())){
			oName.parent().find('span').removeClass('success');
			oName.parent().find('span').html('请输入2-16位汉字字母数字下划线').addClass('error');
			return;
		}else{
			oName.parent().find('span').html('填写正确！').addClass('success');
		}
		if(oPass.val()==""){
			oPass.parent().find('span').removeClass('success');
			oPass.parent().find('span').html('密码不能为空！').addClass('error');
			return;
		}else if(!/^.{6,12}$/.test(oPass.val())){
			oPass.parent().find('span').removeClass('success');
			oPass.parent().find('span').html('用户名只能是6-12位任何字符！').addClass('error');
			return;
		}else{
			oPass.parent().find('span').html('填写正确！').addClass('success');
		}
		if(oRepass.val()==""){
			oRepass.parent().find('span').html('请确认密码！').addClass('error');
			return;
		}else if(oRepass.val()!=oPass.val()){
			oRepass.parent().find('span').html('两次密码不一致！').addClass('error');
			return;
		}else{
			oRepass.parent().find('span').html('两次密码一致！').addClass('success');
		}

		if(oEmail.val()==""){
			oEmail.parent().find('span').removeClass('success');
			oEmail.parent().find('span').html('邮箱不能为空,非常重要！').addClass('error');
			return;
		}else if(!/^([a-zA-Z0-9_])+\@([a-zA-Z0-9\-]{1,5})\.([a-zA-Z0-9]{2,4})+$/.test(oEmail.val())){
			oEmail.parent().find('span').removeClass('success');
			oEmail.parent().find('span').html('邮箱不正确！').addClass('error');
			return;
		}else{
			oEmail.parent().find('span').html('输入正确！').addClass('success');
		}
		
		$.ajax({
			type:"POST",
			url:"admin/reg.php",
			data:"act=reg&username="+oName.val()+"&password="+oPass.val()+"&email="+oEmail.val(),
			success:function(data){
				var oData=eval('('+data+')');
				if(oData.error==0){
					console.log(oData);
					window.location.href='index.html';
					_this.setCookie('userinfo',data,1);	
				}else if(oData.error==1){
					alert(oData.des)	
				}
			}
		});	
	});	
}
Wanan.prototype.login=function(){
	var oName=$("#name");
	
	var oPass=$("#password");
	var _this=this;
	$('#regsub').on("click",function(){
		
		if(oName.val()==""){
			oName.parent().find('span').removeClass('success');
			oName.parent().find('span').html('用户名不能为空！').addClass('error');
			return;
		}else if(!/^[0-9a-zA-Z_\u4e00-\u9fa5]{2,16}$/.test(oName.val())){
			oName.parent().find('span').removeClass('success');
			oName.parent().find('span').html('请输入2-16位汉字字母数字下划线').addClass('error');
			return;
		}else{
			oName.parent().find('span').html('填写正确！').addClass('success');
		}
		if(oPass.val()==""){
			oPass.parent().find('span').removeClass('success');
			oPass.parent().find('span').html('密码不能为空！').addClass('error');
			return;
		}else if(!/^.{6,12}$/.test(oPass.val())){
			oPass.parent().find('span').removeClass('success');
			oPass.parent().find('span').html('用户名只能是6-12位任何字符！').addClass('error');
			return;
		}else{
			oPass.parent().find('span').html('填写正确！').addClass('success');
		}
		

		$.ajax({
			type:"POST",
			url:"admin/reg.php",
			data:"act=login&username="+oName.val()+"&password="+oPass.val(),
			success:function(data){
				var oData=eval('('+data+')');
				if(oData.error==0){
					history.go(-1);
					_this.setCookie('userinfo',data,1);	
				}else if(oData.error==1){
					alert(oData.des)	
				}
			}
		});	
	});	
}

Wanan.prototype.tableSwitch=function(){
	var oBtn=$_('.push-select-wrap').getElementsByTagName('a');
	var oC=$_('.push-bar');
	var _this=this;

	for(var i=0; i<oBtn.length; i++){
		oBtn[i].onclick=function(){
			var hash=this.dataset.hash;
			window.location.hash=hash;
			$(oBtn).removeClass('active');
			$(this).addClass('active');
			for(var j=0; j<oC.length; j++){				
				oC[j].style.display="none";
				if(hash==oC[j].dataset.hash){
					oC[j].style.display="block";
				}
			}
			
		}
	}

	var defaultHash=window.location.hash.substring(1)||"article";

	for(var j=0; j<oC.length; j++){			
		
		
		oC[j].style.display="none";

		if(defaultHash==oC[j].dataset.hash){
			$(oBtn).eq(j).addClass('active');
			oC[j].style.display="block";
		}else{
			$(oBtn).eq(j).removeClass('active');
		}
	}
}
//发布文章

Wanan.prototype.pushArc=function(){

	var _this=this,
		$articleFmFileBtn   =$('.article-fm-file-btn'),
		$articleFmFile      =$('#article-fm-file'),
		$articleFmPic       =$('.article-fm-pic'),
		$articleFmFileMark  =$('.article-fm-file-mark');
	var $audiouploadpic     =$('#audiouploadpic'),
		$audiouploadmark	=$('.audiouploadmark'),
		$uploadAudioPicBtn  =$('.upload-audio-pic-btn'),
		$fileAudioUploadPic =$('.file-audio-upload-pic');
	_this.uploadImg($articleFmFileBtn,$articleFmFile,$articleFmPic,$articleFmFileMark);
	_this.uploadImg($uploadAudioPicBtn,$audiouploadpic,$fileAudioUploadPic,$audiouploadmark);


	var $uploadbannerbtn =$('.uploadbannerbtn'),
		$isBanner        =$('#isBanner'),
		$bannerShowWrap  =$('.banner-show-wrap'),
		$bannerMarkWrap  =$('.banner-mark-wrap');
	_this.uploadImg($uploadbannerbtn,$isBanner,$bannerShowWrap,$bannerMarkWrap);
	$('#isrecommend').on('click',function(){
		if($('#isrecommend').is(':checked')){
			$('.isrecommendbanner').removeClass('hide').addClass('show');
		}else{
			$('.isrecommendbanner').removeClass('show').addClass('hide');
		}
	});

	//我有音频

	$('#isaudioupload').on('click',function(){
		if($('#isaudioupload').is(':checked')){
			$('.haveaudio').removeClass('hide').addClass('show');
		}else{
			$('.haveaudio').removeClass('show').addClass('hide');
		}
	});
	//上传音频
	$('.audiouploadbtn').on('click',function(){
		$(this).html('上传中...');
	    var oFile=$('#audioupload').get(0).files[0];
	    console.log(oFile);

	    uploadeAudio(oFile,function(d){

	    	console.log(d)
		    if(d.code==1){
		        _this.createLayer({
					text:d.msg,
					handle:1
				});
		        return false;
		    }else  if(d.code==3){
		        _this.createLayer({
					text:d.msg,
					handle:1
				});
		        return false;
		    }else{
		       //sBox.html('<img src="server/'+d.url+'" />');
		       _this.createLayer({
					text:d.msg,
					handle:1
				});
		       $('.audiouploadbtn').html('上传').attr('audiosrc','server/'+d.url);
		    };
	    });
	});

	$('#audioupload').on('change',function(){
	    $('.audiouploadmarktip').html($(this).val());
	});


	$('.arc-btn').on('click',function(){

		//alert(eval('('+_this.userdatas+')'))
		var $title=$('.arctitle').val(),
			$desc=$('.desc').val(),
			$articleFmPic=$('.article-fm-pic img'),
			$bannerShowWrap=$('.banner-show-wrap img'),
			$audio=$('.audiouploadbtn'),
			$fileAudioUploadPic=$('.file-audio-upload-pic img'),
			content=encodeURIComponent(UE.getEditor('container').getContent()),
			fmt='',
			bannerpic='',
			audiopic='',
			audiosource='',
			authorid=eval('('+_this.userdatas+')').id,
			ismedia=1,
			isrecommend=1,
			isexamine=0;
			//alert($articleFmPic.attr('src'));

			if($title=="" || content==""){
				_this.createLayer({
					text:"标题和内容为必填项",
					handle:1
				});
				return false;
			}


			if($desc==''){
				$desc=UE.getEditor('container').getContentTxt().substring(0,140);
			}

			//alert($desc+'......////....'+content);

			//return false;
			if($articleFmPic.attr('src')!=undefined){
				fmt=$articleFmPic.attr('src');
			}

			//如果勾选了banner
			if($('#isrecommend').is(':checked')){
				if($bannerShowWrap.attr('src')!=undefined){
					bannerpic=$bannerShowWrap.attr('src');
					isrecommend=0; //0 表示推荐
				}else{
					_this.createLayer({
						text:"请上传banner图片",
						handle:1
					});

					return false;
				}
			}

			//如果选择了
			if($('#isaudioupload').is(':checked')){
				audiosource=$audio.attr('audiosrc');
				audiopic=$fileAudioUploadPic.attr('src');
				if(audiosource==undefined){
					_this.createLayer({
						text:"请上传音频文件",
						handle:1
					});
					return false;
				}

				if(audiopic==undefined){
					_this.createLayer({
						text:"请上传音频文件封面图",
						handle:1
					});
					return false;
				}
				ismedia=0; //有音频文件
				isexamine=1; //需要审核之后在发表
			}

		var datas="type=pushArcticle&title="+$title+"&desc="+$desc+"&banner="+bannerpic+"&content="+content+"&coverpic="+fmt+"&authorid="+authorid+"&media="+audiosource+"&mediacoverpic="+audiopic+"&isrecommend="+isrecommend+"&ismedia="+ismedia+"&isexamine="+isexamine;
		$.ajax({
			type:"POST",
			url:"admin/pushArc.php",
			data:datas,
			success:function(data){

				console.log(data)
				var oData=eval('('+data+')');
				if(oData.respondCode==0){
					_this.createLayer({
						text:oData.respondMsg,
						handle:1
					});
					history.go(0);
				}else{
					_this.createLayer({
						text:oData.respondMsg,
						handle:1
					});
				}
			}
		});	
	})
};

//个人中心 
Wanan.prototype.userData=function(){

	//获取个人信息
	var oUserData,
		_this=this,
		author,
		targetid=parseInt(_this.geturldata().id);
	if(this.userdatas!=null){
		oUserData=eval('('+_this.userdatas+')');
		//console.log(oUserData.id);
	}else{
		//浏览别人的主页
		console.log(targetid)
	}

	if(targetid==oUserData.id){
		//访问自己的个人中心
		getMyData(oUserData.id);

	}else{
		getMyData(targetid);
	}

	function getMyData(myId){
		$.ajax({
			type:"POST",
			url:"admin/pushArc.php",
			data:"type=userdata&userid="+myId,
			success:function(str){
				var oData=eval('('+str+')');
				//console.log(oData.pic);
				if(oData.pic=='')oData.pic='images/default.jpg';
				$('.home-user-info').html('<div class="user-pic"><img src="'+oData.pic+'"></div>\
				<div class="user-name"><strong>'+oData.username.toUpperCase()+'</strong></div>\
				<div class="user-single">'+oData.note+'</div>');
				$('title').html(oData.username+'的主页&nbsp;-&nbsp;晚安，理想');
				$('.forme-wrap').html('<a href=""><strong>'+_this.numto(oData.view)+'</strong><span>浏览量</span></a>\
								<a href=""><strong>'+_this.numto(oData.fans)+'</strong><span>粉丝</span></a>\
								<a href=""><strong>'+_this.numto(oData.score)+'</strong><span>积分</span></a>');
			}
		});
	}
}

Wanan.prototype.upDataView=function(){
	var _this=this,
		targetid=parseInt(_this.geturldata().id);
	$.ajax({
		type:"POST",
		url:"admin/pushArc.php",
		data:"type=upDataView&id="+targetid,
		success:function(){}
	});
} 

Wanan.prototype.numto=function(nums){
	var newNum=0;
	//console.log(nums.length)
	if(nums.length>4){
		newNum=nums.substring(0,nums.length-4)+'.'+nums.substring(nums.length-4,nums.length-3)+'<i style="font:12px/20px bold normal; ">万</i>';
	}else if(nums.length==4){
		newNum=nums.substring(0,1)+','+nums.substring(1,nums.length);
	}else{
		newNum=nums;
	}
	return newNum;
}

Wanan.prototype.userAllEffect=function(){
	var oUserBox=$('.user-box'),
		oNavBtnEffect=$('.nav-btn-effect'),
		oUserNav=$('.user-nav'),
		_this=this,
		oT=_this.getPos(oUserNav.get(0)).top,
		copytag=$('.copytag'),
		oDevoteNavWrapBtn=$('.devote-nav-wrap a');

	window.onscroll=function(){
		var osc=document.documentElement.scrollTop=document.body.scrollTop;
		if(osc<oT){
			oUserNav.css({'position':'static'});
			copytag.css('display','none');
		}else{
			oUserNav.css({'position':'fixed','top':0,'width':'1100px'});
			copytag.css('display','block');
		}
	}

	for(var i=0; i<oNavBtnEffect.length; i++){
		oNavBtnEffect[i].onclick=function(){
			var oHash=this.dataset.hash;
			window.location.hash=oHash;

			for(var j=0; j<oNavBtnEffect.length; j++){
				oNavBtnEffect.removeClass('active');
				oUserBox.css('display','none');
			}
			$(this).addClass('active');
			oUserBox.eq($(this).index()).css('display','block');
			if(oHash!='homes'){
				document.documentElement.scrollTop=document.body.scrollTop=oT;
				oUserNav.css({'position':'fixed','top':0,'width':'1100px'});
				copytag.css('display','block');
			}else{
				document.documentElement.scrollTop=document.body.scrollTop=0;
				oUserNav.css({'position':'static'});
				copytag.css('display','none');
			}
		}
	}

	var defaultHash=window.location.hash.substring(1)||"homes";

	for(var j=0; j<oNavBtnEffect.length; j++){			
		if(defaultHash==$(oNavBtnEffect)[j].dataset.hash){
			oNavBtnEffect.eq(j).addClass('active');
			oUserBox.eq(j).css('display','block');
		}else{
			oNavBtnEffect.eq(j).removeClass('active');
			oUserBox.eq(j).css('display','none');
		}
	}
	

	oDevoteNavWrapBtn.on('click',function(){
		oDevoteNavWrapBtn.removeClass('active')
		$(this).addClass('active');
	});


}

Wanan.prototype.uploadImg=function(cBtn,tFile,sBox,sMark){
	var _this=this;
	cBtn.on('click',function(){
		$(this).html('上传中...');
	    var oFile=tFile.get(0).files[0];
	    console.log(oFile);

	    uploades(oFile,function(d){
		    if(d.code==1){
		        _this.createLayer({
					text:d.msg,
					handle:1
				});
		        return false;
		    }else if(d.code==2){
		    	_this.createLayer({
					text:d.msg,
					handle:1
				});
		        return false;
		    }else if(d.code==3){
		    	_this.createLayer({
					text:d.msg,
					handle:1
				});
		        return false;
		    }else{
		    	_this.createLayer({
					text:d.msg,
					handle:1
				});
		       sBox.html('<img src="server/'+d.url+'" />');
		       cBtn.html('上传');
		    };
	    });
	});
	tFile.on('change',function(){
	    sMark.html($(this).val());
	});
}


//首页晚安理想版块

Wanan.prototype.wananIndex=function(PageSize,nowpage,ismedia,cbfn){
	//
	$.ajax({
		type:"POST",
		url:"admin/pushArc.php",
		data:"type=GetArcList&PageSize="+PageSize+"&nowpage="+nowpage+"&authorid=0&ismedias="+ismedia,
		success:function(data){
			cbfn&&cbfn(data)
		}
	});	
};

Wanan.prototype.getBannerList=function(){
	$.ajax({
		type:"POST",
		url:"admin/pushArc.php",
		data:"type=GetBannerList",
		success:function(data){
			//console.log(data);//cbfn&&cbfn(data)
		}
	});
}

Wanan.prototype.oinput=function(obj,fn){

	if(document.getElementsByClassName){
		if(window.navigator.userAgent.indexOf('MSIE 9')!=-1){
			obj.onfocus=function(){
				this.timer=setInterval(function(){
					fn && fn()//document.title=obj.value.length;
				},40)
			};
			obj.onblur=function(){
				clearInterval(this.timer);
			}
		}else{
			obj.oninput=function(){
				fn&&fn();
			};
		}
	}else{
		obj.onpropertychange=function(){
		    fn&&fn();//document.title=obj.value.length;
		};
	};
};

Wanan.prototype.setCookie=function(name, value, iDay){
	var oDate=new Date();
	oDate.setDate(oDate.getDate()+iDay);
	
	document.cookie=name+'='+value+';expires='+oDate;
}
Wanan.prototype.getCookie=function (name){
	var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
	if(arr=document.cookie.match(reg)){
		return unescape(arr[2]);
	}else{
		return null;
	}
}
Wanan.prototype.removeCookie=function (name){
	setCookie(name, '1', -1);
}

Wanan.prototype.random=function(n,m){
	return parseInt(Math.random()*(m - n +1)+n);
}
Wanan.prototype.geturldata=function (url){
	url=url||window.location.href;
	if(url.indexOf('?')!=-1){
		var urldata=url.split('?')[1].split('&');
		var result=[];
		var c=[];
		for(var i=0; i<urldata.length; i++){
			a=urldata[i].split('=');
			c+=result.concat('"'+urldata[i]+'",')
		};
		var laststr=c.replace(/=/g,'":"');//;
		var aaa='{'+laststr.substring(0,laststr.lastIndexOf(','))+'}';
		return JSON.parse(aaa);
	}else{
		return '';
	}
};

Wanan.prototype.getPos=function(obj){
	var l=0,t=0;
	while(obj){
		l+=obj.offsetLeft;
		t+=obj.offsetTop;
		obj=obj.offsetParent;
	}
	return{
		left:l,
		top:t
	}
}

//拖拽
Wanan.prototype.drags=function(ele,option){
	
	var obj=document.getElementById(ele),
		_this=this;
	obj.onmousedown=function(ev){
		
		
		var oEvent=ev||event;
		
		var disX=oEvent.clientX-this.offsetLeft;
		var disY=oEvent.clientY-this.offsetTop;

		document.onmousemove=function(ev){
			var oEvent=ev||event;
			var t=oEvent.clientY-disY;
			var l=oEvent.clientX-disX;
			
			obj.style.left=l+150+'px';
			obj.style.top=t+150+'px';

			return false;
		}
		document.onmouseup=function(){
			document.onmousemove=null;
			document.onmouseup=null;
		}

		if(option){
			option.cancelBubble1.onmousedown=function(ev){
				var oEvent=ev||event;
				oEvent.cancelBubble=true;	
			};
		}

	};

}

Wanan.prototype.createLayer=function(option,fn){

	var oLayer=document.createElement('div');
		oLayer.id='drag';
		oLayer.className='layer';
		oLayer.innerHTML='<div class="layer-wrap">\
			<h2>温馨提示</h2>\
			<div class="layer-wrap-box"><p></p></div>\
			<div class="layer-btn-wrap" id="layer-btn">\
				<a target="_blank" href="javascript:;">确定</a>\
				<a target="_blank" href="javascript:;" class="cancel">取消</a>\
			</div></div>';
		//console.log(oLayer.offsetTop+'-'+document.body.scrollTop)
		var h=window.screen.height;
		var oT=document.body.scrollTop||document.documentElement.scrollTop;
		var t=(h/2-180);
		oLayer.style.top=t+oT+'px';
	document.body.appendChild(oLayer);

	var oText=$('.layer-wrap-box p');
	var oHandel=$('.layer-btn-wrap');
	option.text=option.text||'请填写参数';
	oText.html(option.text);

	option.handle=option.handle||'';
	if(option.handle==1){
		oHandel.addClass('hide');
	};

	setTimeout(function(){
		document.body.removeChild(oLayer);
		fn&&fn();
	},1500);

	


	var c1=document.getElementById('layer-btn');
	oSatin.drags('drag',{'cancelBubble1':c1});

};


//换行转义



//scroll

Wanan.prototype.roll=function(oBox,oBarBox,index){
	var oSc=oBox[index].children[0];
	var oBar=oBarBox[index].children[0];
	// 初始化滚动条	
	var speed=30;	
	//alert(oSc.offsetHeight+'-'+oBox[index].offsetHeight)
	if(oSc.offsetHeight<=oBox[index].offsetHeight){
		oBarBox[index].style.display="none";
		return false;
	}else{
		oBarBox[index].style.display="block";
	};

	var b=true;
	if(window.navigator.userAgent.indexOf('Firefox')!=-1) // 判断浏览器  分别加事件
	{	
		oSc.addEventListener('DOMMouseScroll',wheelFn,false); // DOMMouseScroll
	}
	else
	{
		oSc.onmousewheel=wheelFn; 
	};
	
	function wheelFn(ev)
	{
		var oEvent=ev||event; 
		var down=oEvent.wheelDelta?oEvent.wheelDelta<0:oEvent.detail>0; // 判断滚动的方向 火狐和chrome不一致
		//true 向下滚
		if(down){
			var t=oBar.offsetTop+speed;  //初始化滚动的值
			Scroll(t);
			
		}else{
			var t=oBar.offsetTop-speed;
			Scroll(t);
		};
		function Scroll(t){
			if(t<0){
				t=0;b=false;
			}else if(t>oBarBox[index].offsetHeight-oBar.offsetHeight) // 如果运动了的 值大于父级-子集的差值 那么就运动完了
			{
				t=oBarBox[index].offsetHeight-oBar.offsetHeight;
				b=false;
			}else{
				b=true;
			}
			startMove(oBar,{top:t});//小条的运动
			
			
			var scale=-(t/(oBar.offsetHeight-oBarBox[index].offsetHeight));	 //取百分比
			startMove(oSc,{top:-(oSc.offsetHeight-oBox[index].offsetHeight)*scale});
		};
		// 阻止默认事件
		if(b){
			return false;
			oEvent&&oEvent.preventDefault();
		}else{
			return true;
			if(oEvent.preventDefault){
				oEvent.preventDefault=false;
			}
		}
		
	};
}




function getEle(str, aParent){
	var arr=str.match(/\S+/g);
	var aParent=aParent||[document];
	var aChild=[];
	for(var i=0;i<arr.length;i++)
	{
		aChild=_getByStr(aParent, arr[i]);
		aParent=aChild;
	};
	return aChild;
};

function getByClass(oParent, sClass){
	
	if(document.addEventListener)
	{
		return oParent.getElementsByClassName(sClass);
	};
	
	var aEle=oParent.getElementsByTagName('*');
	var re=new RegExp('\\b'+sClass+'\\b');
	var result=[];
	
	for(var i=0;i<aEle.length;i++)
	{
		if(re.test(aEle[i].className))
		{
			result.push(aEle[i]);
		}
	};

	return result;
};
//运动
function getStyle(obj,name){ return obj.currentStyle?obj.currentStyle[name]:getComputedStyle(obj,false)[name]}

function getCur(obj,name)
{

	
	if(name=='opacity')
	{
		var child=Math.round(parseFloat(getStyle(obj,name))*100)
	}else
	{
		var child=parseInt(getStyle(obj,name));
	}
	
	if(isNaN(child))
	{
		switch(name)
		{
			case 'top':
			return obj.offsetTop;
			case 'left':
			return obj.offsetLeft;
			case 'width':
			return obj.offsetWidth;
			case 'height':
			return obj.offsetHeight;
		}
	}
	return child;
}
function _getByStr(aParent, str)
{
	var aChild=[];	//结果
	
	for(var i=0;i<aParent.length;i++)
	{
		switch(str.charAt(0))
		{
			case '#':
				var obj=document.getElementById(str.substring(1));
				aChild.push(obj);
				break;
			case '.':
				var arr=getByClass(aParent[i], str.substring(1));
				
				for(var j=0;j<arr.length;j++)
				{
					aChild.push(arr[j]);
				}
				break;
			default:
				//li.box
				if(/^\w+\.\w+$/.test(str))
				{
					var aStr=str.split('.');
					var arr=aParent[i].getElementsByTagName(aStr[0]);
					var re=new RegExp('\\b'+aStr[1]+'\\b');
					
					for(var j=0;j<arr.length;j++)
					{
						if(re.test(arr[j].className))
						{
							aChild.push(arr[j]);
						};
					};
				}
				//li#li1
				else if(/^\w+#\w+$/.test(str))
				{
					var aStr=str.split('#');
					var arr=aParent[i].getElementsByTagName(aStr[0]);
					
					for(var j=0;j<arr.length;j++)
					{
						if(arr[j].id==aStr[1])
						{
							aChild.push(arr[j]);
						}
					}
				}
				//input[type=bbxxx]
				else if(/^\w+\[\w+=.+\]$/.test(str))
				{
					var aStr=str.split(/\[|=|\]/g);
					var arr=aParent[i].getElementsByTagName(aStr[0]);
					for(var j=0;j<arr.length;j++)
					{
						if(arr[j].getAttribute(aStr[1])==aStr[2])
						{
							aChild.push(arr[j]);
						}
					}
				}
				//input:first	li:eq(12)
				else if(/^\w+:[a-z]+(\(.+\))?$/.test(str))
				{
					var aStr=str.split(/:|\(|\)/g);
					var arr=aParent[i].getElementsByTagName(aStr[0]);
					switch(aStr[1])
					{
						case 'eq':
							var n=parseInt(aStr[2]);
							
							aChild.push(arr[n]);
							break;
						case 'first':
							aChild.push(arr[0]);
							break;
						case 'odd':
							for(var j=1;j<arr.length;j+=2)
							{
								aChild.push(arr[j]);
							}
							break;
					}
				}
				
				//li
				else
				{
					var arr=aParent[i].getElementsByTagName(str);
					
					for(var j=0;j<arr.length;j++)
					{
						aChild.push(arr[j]);
					}
				}
				break;
		}
	};
	return aChild;
};

function $_(arg)
{
	var elements=[],bSelect;	
	switch(typeof arg)
	{
		case 'function':	
			$_.tool.ready(arg);
			break;
		case 'string':	 
			elements=$_.browser.ie678?getEle(arg):document.querySelectorAll(arg);
			break;
		case 'object':		
			if(arg instanceof Array)
			{
				elements=arg;
			}
			else
			{
				elements.push(arg);
			};
			break;
	};
	if(elements.length==1)
	{
		return elements[0];
		if(bSelect==window.frameElement)$_.tool.ask();
	};
	return elements;
};
function startMove(obj,json,options)
{
	options =options||{};
	options.time=options.time ||700;
	options.type=options.type ||'buffer';	
	var timer={
		veryslow:5000,
		slow:3000,
		normal:2000,
		fast:1000,
		veryfast:500
		}
	
	if(typeof options.time=='string')
	{
		if(timer[options.time])
		{
			options.time=timer[options.time];
		}else
		{
			options.time=1000;
		}
	}
	
	var first={}
	var count=parseInt(options.time/30);
	var dis={};
	
	for(var i in json)
	{
		first[i]=getCur(obj,i);
		dis[i]=json[i]-first[i];
	}
	
	clearInterval(obj.timer);
	var n=0;
	window.speedX=0;
	window.elaType=0;
	obj.timer=setInterval(function(){
			n++
			var wade;
			
			for(var i in json)
			{
				switch (options.type)
				{
					case  'linear':
					wade=first[i]+dis[i]*n/count;
					break;
					case 'buffer':
					var a=1-n/count;
					wade=first[i]+dis[i]*(1-a*a*a);
					break;
					case 'StoF':
					var a=n/count;
					wade=first[i]+dis[i]*(a*a*a);
					break;
					case 'TX':
					speedX+=(json[i]-elaType)/5;
					speedX*=0.7;
					elaType+=speedX;
					wade=Math.round(elaType);
					break;
				}
				
				if(i=='opacity')
				{
					obj.style.opacity=wade/100;
					obj.style.filter='alpha(opacity='+wade*100+')';
				}else
				{
					obj.style[i]=wade+'px';
				}
			}
			if(options.type=='TX')
			{
				if(Math.round(elaType)==json[i] && Math.round(speedX)==0)
				{
					clearInterval(obj.timer)
					options.fn && options.fn();
				}
			}else
			{
				if(count==n)
				{
					clearInterval(obj.timer)
					options.fn && options.fn();
				}
			}
		},30)
};


Wanan.prototype.IsPC=function(url){
    var userAgentInfo = navigator.userAgent;
    var Agents = ["Android", "iPhone",
                "SymbianOS", "Windows Phone",
                "iPad", "iPod"];
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    //alert()
    if(!flag)window.location.href=url;
}

//上传
function uploades(obj,fn){
	var xhr=new XMLHttpRequest();
	//console.log(oFile.files[0]);
	xhr.onload=function(){
		console.log(this.responseText)
		var d = JSON.parse(this.responseText);
		// console.log(d)
		fn&&fn(d);
	}
	xhr.open('post','server/post_file.php',true);
	xhr.setRequestHeader('X-Request-With', 'XMLHttpRequest');
	var oFormData=new FormData();
	oFormData.append('file',obj);
	xhr.send(oFormData);
}
//上传
function uploadeAudio(obj,fn){
	var xhr=new XMLHttpRequest();
	//console.log(oFile.files[0]);
	xhr.onload=function(){
		console.log(this.responseText)
		var d = JSON.parse(this.responseText);
		// console.log(d)
		fn&&fn(d);
	}
	xhr.open('post','server/post_file_2.php',true);
	xhr.setRequestHeader('X-Request-With', 'XMLHttpRequest');
	var oFormData=new FormData();
	oFormData.append('file',obj);
	xhr.send(oFormData);
}



Wanan.prototype.MonthtoE=function(num){
	var oMonth=["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
	return oMonth[num-1];
}



//////////// 浏览器检测相关
$_.browser={};
$_.browser.userAgent=window.navigator.userAgent.toLowerCase();
$_.browser.ie=!!document.all;
$_.browser.ie6=!window.XMLHttpRequest;
$_.browser.ie678=!document.getElementsByClassName;
$_.browser.ie9=$_.browser.userAgent.indexOf('msie 9')!=-1;
$_.browser.ie6789=$_.browser.ie678||$_.browser.ie9;
$_.browser.ie10=$_.browser.userAgent.indexOf('msie 10')!=-1;
$_.browser.ie11=$_.browser.userAgent.indexOf('trident')!=-1&&$_.browser.userAgent.indexOf('rv:11')!=-1;
$_.browser.chrome=$_.browser.userAgent.indexOf('chrome')!=-1;
$_.browser.ff=$_.browser.userAgent.indexOf('firefox')!=-1;


function loading(){
	
	var oLoayer=document.createElement('div');
	oLoayer.className='layer_loading';
	
	oLoayer.innerHTML='<div id="load"><div>加</div><div>载</div><div>中</div><div>,</div><div>请</div><div>稍</div><div>后</div></div>';
	document.body.appendChild(oLoayer);
};
