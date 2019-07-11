


function Llq(){
	//this.getOpenUrl();
	//this.MZ();


	this.openUrl1222='http://api.662820.com/xnflv/index.php?url=';
	this.openUrl1='http://jx.drgxj.com/?url=';
	
	this.openUrl41='http://jqaaa.com/jx.php?url=';
	this.openUrl11='http://www.xmqbook.com/xnflv/index.php?url=';
	this.openUrl13='http://api.wlzhan.com/sudu/?url=';
	this.openUrl15='https://vip.yingyanxinwen.cn/baidu/index3.php?n=3&path=';

	//this.getOpenUrl();
	try{
		this.setNva();
	
		this.setHeader();
		
		this.setTopAd();
	}catch(e){
		console.log(e)
	}
	
}

Llq.prototype.getOpenUrl=function(){
	$.ajax({
		url:"../phpdata/datapage/com.php",
		type:"POST",
		data:"type=getLinkLibrary&id=1",
		success:function(str){
			var oData=$.parseJSON(str);
			
			if(oData.respondCode==0){
				var oLink=oData.link.split('\n');
					
				window.localStorage.setItem('linkArr',oLink);
			}else{
			}
		},
		complete:function(){
			//获取广告图片并删除
			
		}
	})
}

Llq.prototype.subFont=function(num){

}

Llq.prototype.geturldata=function (url){
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
Llq.prototype.getNBAOnlinefn=function(){
	var b=1,
		_this=this;

		$.ajax({
			url:'../phpdata/datapage/online.php',
			type:"POST",
			data:"type=GetOneListInfo&id="+_this.geturldata(window.location.href).id,
			success:function(str){
				var oData=$.parseJSON(str);
				console.log(oData);
				//标题

				var logo="../img/logo.png",
				hlogo='',
				glogo='';

				if(true){
					hlogo=glogo=logo;
				}

				$('.hteam').html('<div class="flex-img"><img src="'+hlogo+'"></div><div class="play-name">'+oData.hteam+'</div>');


				$('.gteam').html('<div class="flex-img"><img src="'+glogo+'"></div><div class="play-name">'+oData.gteam+'</div>');
				
				$('.ptime').html('<div class="flex-img">'+oData.league+'</div><div class="play-name1">'+oData.PlayTime+'</div>')
				

				$('title').html(oData.league+' '+oData.hteam+'-'+oData.gteam);


				if(oData.LiveSignalIn==''){
					$('#moreInfoIn').remove();
				}else{
					var moreSingle=oData.LiveSignalOut.replace(/fuck0/g,'&');
					var list=moreSingle.split('\n');
					var moreSingleHtml='',targetUrl='',singUrl=[];
					console.log(list);
					for(var i=0; i<list.length; i++){
						targetUrl=encodeURIComponent(list[i].split('|||')[0]);
						
						moreSingleHtml+='<a target="_blank" infoUrl="'+targetUrl+'" href="javascript:;">'+list[i].split('|||')[1]+'</a>';
						singUrl.push(targetUrl);

					//	alert(targetUrl);
					}

					$('#tabsingle').html(moreSingleHtml);
					$('#tabsingle a').eq(0).addClass('active');
					play(singUrl[0]);
					
				};

				change();
				//是否第一次打开页面
			}
		});



	function change(){
		$('#tabsingle a').on('click',function(){
			//alert($(this).attr('infourl'))
			$('#tabsingle a').removeClass('active');
			$(this).addClass('active');
			play($(this).attr('infourl'));
		})
	}


	function play(singUrl){
		var videoObject = {
	        container: '#onlinePlay',//“#”代表容器的ID，“.”或“”代表容器的class
	        variable: 'player',//该属性必需设置，值等于下面的new chplayer()的对象
	        autoplay:true,//自动播放
	        live:true,
	        html5m3u8:true,
	        video:singUrl//视频地址
	    };
	    var player=new ckplayer(videoObject);
	}
}



//获取伤病信息
//
//
Llq.prototype.getInjList=function(){
	var teamName=''; 

	GetInjuriesList(teamName);


	function GetInjuriesList(teamName){
		var datas="type=GetInjuriesList&teamName="+teamName;
		
		$.ajax({
			url:"../phpdata/datapage/nbainj.php",
			type:"POST",
			data:datas,
			success: function(str){
				//console.log(str)
				var json=$.parseJSON(str);
				$('.times').html(json.newTime);
				var Liststr='';
				console.log(json)
				if(json.Total==0){
					$('#NBAinj').html('<p style="line-height:50px; text-align:center;">暂无数据！</p>');
				}else{

					for(var i=0; i<json.result.length; i++){
						var newjson=json.result[i];
						Liststr+=`<tr><td class="wp30"><span class="sb-name">`+newjson.player+`</span><br><span class="sb-teamname">`+newjson.teamName+`</span></td>
						<td class="wp20"><span class="sb-reason">`+newjson.reason+`</span></td>
						<td class="sb-detail">`+newjson.timetable+`</td>
					</tr>`;
					}
					
					$('#NBAinj').append(Liststr);					
				}
				
			},
			error: function(){
				
			}
		});	
	}

	$('#clickmore').on('click',function(){
		//alert(window.location.hash);
		if(window.location.hash){
			videoType=window.location.hash.substring(1);
		}else{
			videoType='';
		}
		
		var num=parseInt($(this).attr('nowpage'));
		//alert(num+1)
		$(this).attr('nowpage',num+1);

	})
}


//统计直播页面访问人数

Llq.prototype.tjPlayNum=function(){
	

	$.ajax({
			url:"../phpdata/datapage/othersetting.php",
			type:"POST",
			data:"type=tjplaypageNum",
			success: function(str){
				//console.log(str)
				
				
			},
			error: function(){
				
			}
		});
}


Llq.prototype.getVideofn=function(){
	var b=1,
		_this=this,
		videoId=parseInt(_this.geturldata().id),
		linkArr=window.localStorage['linkArr'];

	if(linkArr=='undefined'){
		history.go(0);
	}


	if(!videoId){
		alert('非法地址！');
		window.location.href='vip.html';
	}

	var linkArrTmp=linkArr.split(',');
	var dropHtml='';
	var AllUrl=[];
	for(var i=0; i<linkArrTmp.length; i++){
		var a=linkArrTmp[i].split('|||');
		AllUrl.push(a[0]);
		dropHtml+='<li signalurl="'+a[0]+'"><a href="javascript:;" >'+a[1]+'</a></li>';
	}
	$('.singal-drap').html(dropHtml);

	var comUrl=AllUrl[0];

	//去掉百度云
	$('.singal-drap li:last-of-type').css('display','none');

	$('.singal-list span').on('click',function(){
		if(b==1){
			$('.singal-drap').css('display','block');
			b=2;
		}else{
			$('.singal-drap').css('display','none');
			b=1;
		}
	});




	
	//选择信号
	$('.singal-drap li').on('click',function(){
		window.localStorage.setItem('thisUrl',$(this).attr('signalurl'));
		
		history.go(0);
	});

	//页面路径
	$('.notplay i').html(window.location.href);
	if(window.localStorage['thisUrl']!=undefined){
		comUrl=window.localStorage['thisUrl'];
	}



	//console.log(window.localStorage['thisUrl']);

	//获取默认信息
	$.ajax({
		url:"../phpdata/datapage/online.php",
		type:"POST",
		data:"type=GetOneVipVideoInfo&isUPDATE=1&id="+videoId,
		success:function(str){
			var oData=$.parseJSON(str);
			console.log(oData);
			if(oData.respondCode==0){
				$('.video-title h2').html(oData.title.replace('#云#',''));
				$('title').html(oData.title.replace('#云#','')+'&nbsp-&nbsp;腾讯、爱奇艺、优酷、芒果等各大网站VIP视频免费看');



				var oVideoList=[],
					listHtml='',
					u=0;
				
				if(oData.content.split('[-]')<0){
					oVideoList=oData.content.split('\n')
				}else{
					oVideoList=oData.content.split('[-]')
				};

				if(oData.title.indexOf('#云#')!=-1){
					comUrl=AllUrl[AllUrl.length-1];
					u=1;
				}
				//singalChange为0,隐藏切换信号源按钮
				if(oData.singalChange==0){
					$('.singal-list').remove();
				}
				if(window.location.hash==''){
					window.localStorage.removeItem("pUrl"+videoId);
				}
				//alert(window.localStorage['pUrl'+videoId])
				//判断是否点击了剧集按钮

				console.log(oData.content.split('[-]'));

				if(u==1){
					if(window.localStorage['pUrl'+videoId]==undefined){
						//alert(comUrl)
						$('#v').attr('src',comUrl+oVideoList[0].split('|||')[0]);
					}else{
						$('#v').attr('src',comUrl+window.localStorage['pUrl'+videoId]);
					}

					//alert($('#v').attr('src'));
				}else{
					if(window.localStorage['pUrl'+videoId]==undefined){
						//alert(comUrl)
						$('#v').attr('src',comUrl+oVideoList[0].split('|||')[0]);
					}else{
						$('#v').attr('src',comUrl+window.localStorage['pUrl'+videoId]);
					}
				}
				//没有hash值,说明第一次进入删除
				//alert();

				//进入另一部剧集用剧集id区分
				for(var i=0; i<oVideoList.length; i++){
					var k=oVideoList[i].split('|||');
					listHtml+='<a href="javascript:;" data-url="'+k[0]+'">'+(i+1)+'</a>';
				}
				$('.num-list-p').html(listHtml);
				var oBtn=$('.num-list-p a');
				//选中剧集按钮
				if(window.location.hash!=''){
					oBtn.eq(window.location.hash.substring(1)-1).addClass('active');
					$('.video-title span').html('第'+window.location.hash.substring(1)+'集')
				}else{
					oBtn.eq(0).addClass('active');
				}
				oBtn.on('click',function(){
					oBtn.removeClass('active');
					$(this).addClass('active');
					var playUrl=$(this).attr('data-url');
					var hash=$(this)[0].innerHTML;
					window.location.hash=hash;
					window.localStorage.setItem('pUrl'+videoId,playUrl);
					history.go(0);
				})
			}else{
			}
		},
		complete:function(){
			//获取广告图片并删除
			
		}
	})

}

Llq.prototype.MZ=function(){
	var _this=this;
	this.ready(function(){
		var oBody=document.getElementsByTagName('body')[0];
		//var oBody=oBody.children;

		//console.log(oBody[oBody.length-1]);

		var oMz=_this.getByClass(oBody,'mz');
		console.log(oMz)
		if(oMz.length==0){
			var oDiv=document.createElement('div');
			oDiv.innerHTML='本站所有直播信号和视频录像均从搜索引擎搜索整理获得，所有内容均来自互联网，我们自身不提供任何直播信号和视频内容，如有侵犯您的权益请通知我们，我们会第一时间处理，谢谢。另外，本站没有任何黄赌毒，反动，违法之类的广告，如果出现则是系统漏洞。希望大家不要点击，否则后果自负！';
			oDiv.className='mz';
			document.body.appendChild(oDiv);
		};
		
	});

	
}

Llq.prototype.ready = function(fn) {
	if (document.getElementsByClassName) {
		document.addEventListener('DOMContentLoaded', fn, false);
	} else {
		document.attachEvent('onreadystatechange', function() {
			if (document.readyState == 'complete') {
				fn();
			}
		});
	}
};

Llq.prototype.getByClass=function(oParent, sClass) {

	if (document.addEventListener) {
		return oParent.getElementsByClassName(sClass);
	};

	var aEle = oParent.getElementsByTagName('*');
	var re = new RegExp('\\b' + sClass + '\\b');
	var result = [];

	for (var i = 0; i < aEle.length; i++) {
		if (re.test(aEle[i].className)) {
			result.push(aEle[i]);
		}
	};

	return result;
};


Llq.prototype.getVipVideoList=function(){
	var PageSize=30,nowpage=1,videotitle='',_this=this,videoType=''; 
	//getList(videotitle,videoType,PageSize,nowpage);
	oNavBtn=$('#nav a');
	var defaultHash=window.location.hash.substring(1)||"";
	//alert(defaultHash);
	for(var j=0; j<oNavBtn.length; j++){	

		if(defaultHash==$(oNavBtn)[j].dataset.hash){
			oNavBtn.eq(j).addClass('active');
			//oUserBox.eq(j).css('display','block');
		}else{
			oNavBtn.eq(j).removeClass('active');
			//oUserBox.eq(j).css('display','none');
		}
	}
	getList(videotitle,defaultHash,PageSize,nowpage);



	$('#subVideo').on('click',function(){
		$('#vipListbox').empty();
		$('#clickmore').css('display','block').attr('nowpage',1);
		videotitle=$('#videotitle').val();
		getList(videotitle,videoType,PageSize,nowpage);
	});

	if(window.localStorage['thisUrl']!=undefined){
		window.localStorage.removeItem("thisUrl");
	};

	//切换栏目 

	
	
	oNavBtn.on('click',function(){

		$('#vipListbox').empty();
		$('#clickmore').css('display','block').attr('nowpage',1);
		oNavBtn.removeClass('active');
		$(this).addClass('active');
		var hash=$(this)[0].dataset.hash,
		nowpage=1,
		videotitle='';
		window.location.hash=hash;
		getList(videotitle,hash,PageSize,nowpage);
	});

	
	function getList(videotitle,videoType,PageSize,nowpage){
		var datas="type=GetVipVideoList&videotitle="+videotitle+"&videoType="+videoType+"&nowpage="+nowpage+"&PageSize="+PageSize;
		
		$.ajax({
			url:"../phpdata/datapage/online.php",
			type:"POST",
			data:datas,
			success: function(str){
				//console.log(str)
				var json=$.parseJSON(str);
				var Liststr='';
				console.log(json)
				if(json.Total==0){
					$('#vipListbox').html('<p style="line-height:50px; text-align:center;">暂无数据！</p>');
					$('#clickmore').css('display','none');
				}else{
					
					if(json.result.length<PageSize){
						$('#clickmore').css('display','none');
					}

					for(var i=0; i<json.result.length; i++){
						
						var newjson=eval('('+json.result[i].replace(/\n/g,'-||-')+')'),
							statusTag='';
						if(newjson.coverPic=='' || newjson.coverPic=='0'){
							newjson.coverPic='../img/error.png';
						};
						
						var jujNum=newjson.content.split('-||-').length;
							if(newjson.status==0){
								statusTag="<i>"+newjson.statusTip+"</i>";
							}else{
								statusTag="<i>"+newjson.statusTip+"</i>";
								Liststr+='<li><a href="vips.html?id='+newjson.id+'"><div class="thumPics" style=" background:url('+newjson.coverPic+') no-repeat ;background-size:cover;"></div><span>'+newjson.title.replace('#云#','')+'</span></a>'+statusTag+'</li>';
							}
					
						$('#vipListbox').append(Liststr);
					
					}
				
			}
		},
			error: function(){
				
			}
		})
	}

	$('#clickmore').on('click',function(){
		//alert(window.location.hash);
		if(window.location.hash){
			videoType=window.location.hash.substring(1);
		}else{
			videoType='';
		}
		
		var num=parseInt($(this).attr('nowpage'));
		//alert(num+1)
		$(this).attr('nowpage',num+1);

		getList(videotitle,videoType,PageSize,num+1);
	})
}

//直播信号
Llq.prototype.GetOnlineList=function(newtype,nowpage,PageSize){
	var _this=this;

	if(window.localStorage['thisUrl']!=undefined){
		window.localStorage.removeItem("thisUrl");
	};

	$.ajax({
		url:'../phpdata/datapage/online.php',
		type:"POST",
		data:"type=GetOnlineList",
		success:function(str){

			console.log(str.replace(/fuck0/g,'&'));


			var oData=$.parseJSON(str.replace(/fuck0/g,'&'));
			console.log(oData);
			if(oData.counts==0){
				$('.onlone-wrap').html('<p class="dataisno">暂无数据</p>');
				return false;
			}
			var oList1='',oList2='',oList3='',oList4='',oList5='',oList6='',oList7='',cHtml='';


			for(var i=0; i<oData.result.length;i++){
				var obj=oData.result[i];

			//					console.log(obj.LiveSignalOut);

					var descentions='';
					if(obj.descention==''){
						descentions='';
					}else{
						descentions='<div class="firelineWarp"><p><a href="" class="tip">火线速递:</a>'+obj.descention+'</p></div>';
					};
					

					if(!obj.hteamLogo){
						obj.hteamLogo='img/logo.png';
					}
					if(!obj.gteamLogo){
						obj.gteamLogo='img/logo.png';
					}
				
                    cHtml+=`<div class="online-info unonlineed">
					<a href="zhibodetail.html?id=`+obj.id+`" class="online-link">
						<div class="online-detail">
							<div class="time-status">
								<p>`+obj.PlayTime.substring(10,16)+`</p>
							</div>
							<div class="match-info">
								<div class="team">
									<p><img src="../`+obj.hteamLogo+`" alt="">`+obj.hteam+`</p>
									<p><img src="../`+obj.gteamLogo+`" alt="">`+obj.gteam+`</p>
								</div>
								<div class="period">
									<i></i>
									<p>`+obj.league+`</p>
								</div>
							</div>
						</div>
					</a>
					<div class="user-handle-wrap">
						<div class="game-socre">
							<div class="no-started">
								<span>前瞻</span>
								<a href="" class="qianzhan"></a>
							</div>
						</div>
						<div class="fenxi"><a href="info.html?id=`+obj.id+`"><i class="fenxi-icon"></i>情报</a></div>
						<div class="user-play" data-gameName="`+obj.hteam+`&nbsp;VS&nbsp;`+obj.gteam+`"><a href="zhibodetail.html?id=`+obj.id+`" class="qianzhan"><i class="play-icon"></i>直播</a></div>
					</div>	
				</div>`;
				$('.onlone-wrap').html(cHtml);
				// data-signal="`+obj.LiveSignalOut+`"


				//_this.cloesPlayList();
			}
			//var All='';
			//console.log(All)
			
			//drop();
			
			// for(var i=0; i<$('.onlineurl').length; i++){
			// 	$('.onlineurl').attr('href',oTargeturl[randoms(0,oTargeturl.length-1)]);
			// };

			
		}
	});	
}

//直播信号页面

Llq.prototype.onlinePlayPage=function(){
	var b=1,
		_this=this;

		$.ajax({
			url:'../phpdata/datapage/online.php',
			type:"POST",
			data:"type=GetOneListInfo&id="+_this.geturldata(window.location.href).id,
			success:function(str){
				var oData=$.parseJSON(str);
				console.log(oData);
				//标题
				

				$('title').html(oData.league+' '+oData.hteam+'-'+oData.gteam);
				$('#tipst').html('点击下方按钮观看(<span class="zhibot">'+oData.hteam+'vs'+oData.gteam+'</span>)比赛直播')
				var moreSingleHtml='',targetUrl='',singUrl=[];
				if(oData.LiveSignalOut){
					var moreSingle=oData.LiveSignalOut.replace(/fuck0/g,'&');
					var list=moreSingle.split('\n');
										//console.log(list);
					for(var i=0; i<list.length; i++){
						moreSingleHtml+='<li><a href="'+list[i]+'">高清直播'+(i+1)+'</a></li>';
					}					
				};

				$('.zhibo-box ul').html(moreSingleHtml+'<li><a href="info.html?id='+oData.id+'">查看本场比赛投注率</a></li>');

			}
		});
}

//分析情报页面

Llq.prototype.onlineInfoPage=function(){
	var b=1,
		_this=this;


		function formatDate(now) { 
			 var d=new Date(now);
		     var year=d.getFullYear(); 
		     var month=d.getMonth()+1; 
		     var date=d.getDate(); 
		     var hour=d.getHours(); 
		     var minute=d.getMinutes(); 
		     var second=d.getSeconds(); 
		     return toZero(month)+"-"+toZero(date)+" "+toZero(hour)+":"+toZero(minute); 
		} 

		$.ajax({
			url:'../phpdata/datapage/getInfoPage.php',
			type:"POST",
			data:"type=GetOnePlayInfo&id="+_this.geturldata(window.location.href).id,
			success:function(str){



				var oData=$.parseJSON(str);
				console.log(oData);
				
				if(oData.respondCode==1){
					alert('数据暂未更新，请稍后查看');
					history.go(-1);
				}

				//获取到让分比例的数据
				var newjson=oData.rfbl.replace(/\n/g,'c');
				//var rf=oData.rfbl;
				var rfARR=newjson.split('c'),
					rfHtml='';
					console.log(rfARR);

					for(var i=0;i<rfARR.length; i++){
					var newArrRF=rfARR[i].split(',');

					console.log(newArrRF[3]);

					rfHtml+=`<div class="tzl-line clearfix">
								<time>`+formatDate(Number(newArrRF[3]))+`</time>
								<span class="over">`+newArrRF[0]+`%</span>
								<span class="all">`+newArrRF[1]	+`</span>
								<span class="under">`+newArrRF[2]+`%</span>
							</div>`;
				};

				$('#rfbl').append(rfHtml);




				//获取到大小分比例的数据
				var dxnewjson=oData.dxbl.replace(/\n/g,'c');
				//var rf=oData.rfbl;
				var dxARR=dxnewjson.split('c'),
					dxHtml='';
				for(var i=0;i<dxARR.length; i++){
					var dxnewArrRF=dxARR[i].split(',');

					console.log(dxnewArrRF[3]);

					dxHtml+=`<div class="tzl-line clearfix">
								<time>`+formatDate(Number(dxnewArrRF[3]))+`</time>
								<span class="over">`+dxnewArrRF[0]+`%</span>
								<span class="all">`+dxnewArrRF[1]	+`</span>
								<span class="under">`+dxnewArrRF[2]+`%</span>
							</div>`;
				};

				$('#dxbl').append(dxHtml);



				//获取到交手分析
				var jsData=oData.jiaoshou.replace(/\n/g,'c');
				//var rf=oData.rfbl;
				var jiaoshouARR=jsData.split('c'),
					jiaoshouHtml='';
				for(var i=0;i<jiaoshouARR.length; i++){
					jiaoshouHtml+=`<li>&not;`+jiaoshouARR[i]+`</li>`;
				};

				$('#jsdata').append(jiaoshouHtml);

				//获取到主队近况分析
				var zdData=oData.zdfx.replace(/\n/g,'c');
				//var rf=oData.rfbl;
				var zdfxARR=zdData.split('c'),
					zdfxHtml='';
				for(var i=0;i<zdfxARR.length; i++){
					zdfxHtml+=`<li>&not;`+zdfxARR[i]+`</li>`;
				};

				$('#AllInfo').append(zdfxHtml);


				//获取到主队近况分析
				var kdData=oData.kdfx.replace(/\n/g,'c');
				//var rf=oData.rfbl;
				var kdfxARR=kdData.split('c'),
					kdfxHtml='';
				for(var i=0;i<kdfxARR.length; i++){
					kdfxHtml+=`<li>&not;`+kdfxARR[i]+`</li>`;
				};

				$('#AllInfo').append(kdfxHtml);



				$('title').html(oData.league+' '+oData.hteam+'-'+oData.gteam+'比赛分析、比赛情报');

				$('#zhibobtn').html('<a href="zhibodetail.html?id='+oData.gameId+'">观看本场比赛直播</a>');
				$('.game-title h1').addClass('zhibot').html('<span class="tipfont">(主)</span>'+oData.hteam+'&nbsp;vs&nbsp;'+oData.gteam+'<span class="tipfont">(客)</span>');
			}
		});
};

Llq.prototype.cloesPlayList=function(){
	$('.close-icon').on('click',function(){
		$('.play-layer-wrap').animate({'opacity':0},300,function(){
			$('.play-layer-wrap').css('display','none')
		})
	});

	$('.play-layer').on('click',function(){
		var signaldata=$(this).attr('data-signal').split('-|=|-');
		var gameName=$(this).attr('data-gameName');
		var signalHtml='';
		for(var i=0; i<signaldata.length; i++){
			var signalInfo=signaldata[i].split('|||');
			signalHtml+='<li><span>信号'+(i+1)+'</span><a href="zhiboc.html?gameName='+gameName+'&playUrl='+encodeURIComponent(signalInfo[0])+'">'+signalInfo[1]+'</a></li>';
		}
		$('.play-ul').html(signalHtml);
		$('.play-layer-wrap').css('display','block')
		$('.play-layer-wrap').animate({'opacity':1},300);
	});
}
// $(function(){
// 	//getList()
// 	var title='',username='',newtype='',nowpage=1,PageSize=20;
// 	getList(title,username,newtype,nowpage,PageSize);

// 	$('#searchBtn').on('click',function(){
// 		title=$('#title').val();
// 		//alert(title)
// 		username=$('#uesrname').val();
// 		newtype=$('#newtype').val();
// 		getList(title,username,newtype,nowpage,PageSize);
// 	});
// });
Llq.prototype.navScroll=function(ele){
	var oNavwrap=document.querySelectorAll(ele)[0];
	var oNav=oNavwrap.children;
	var Aw=0;
	for(var i=0;i<oNav.length; i++){
		Aw+=oNav[i].offsetWidth;
	}
	oNavwrap.style.width=Aw+'px';
}



// 文章内容
Llq.prototype.articleContent=function(){
	
	var _this=this;
	var id=_this.geturldata(window.location.href).id;
	$.ajax({
		url:"../phpdata/datapage/arclist.php",
		type:"POST",
		data:"type=GetOneArticleInfo&id="+id,
		success: function(data){
			console.log(data)
			var json=$.parseJSON(data);
			console.log(json);
			if(json.Total==0){
				$('.articletime').html('<p class="dataisno">暂无数据</p>');
			
			}else{
				$('title').html(json.title+', 约个球，篮球，足球，直播，NBA直播');
				$('.newshead h1').html(json.title);
				$('.articlecontent').html(json.article);
				$('.articletime').html(json.pushtime);
			}
		},
		error: function(){
		}	
	});
}

Llq.prototype.Banner=function(ele){
	var oBanner=document.querySelectorAll(ele)[0];
	var oUl=oBanner.getElementsByTagName('ul')[0];
	var aLi=oUl.children;
	var oDot=oBanner.getElementsByTagName('ol')[0];
	var oFont=oBanner.getElementsByTagName('p')[0];

	//创建dot
	for(var i=0; i<aLi.length; i++){
		var oOlli=document.createElement('li');
		oDot.appendChild(oOlli);
	}

	var oDotLi=oDot.children;

	oDotLi[0].className='active';


	var sFont=['08梦之队纪录片科比亲述夺冠之路','老妖怪！基德生涯20大震撼表演','逆天压哨血帽库里！利拉德赛季无解进攻欣赏','詹姆斯韦德经典连线史上快攻最禽兽二人组','传奇谢幕！科比60分谢幕战台前幕后大揭秘'];
	oFont.innerHTML=sFont[0];
	//初始化oUl长度

	oUl.style.width=aLi[0].offsetWidth*aLi.length+'px';

	var iNow=0;
	var iX=0;
	var iW=view().w;
	var oTimer=0;
	var iStartTouchX=0;
	var iStartX=0;
	auto();
	bind(oBanner,"touchstart",fnStart);
	bind(oBanner,"touchmove",fnMove);
	bind(oBanner,"touchend",fnEnd);

	function auto()
	{
		oTimer=setInterval(function(){
			iNow++;	
			iNow=iNow%aLi.length;
			tab();
		},5000);
	}

	function fnStart(ev)
	{
		oUl.style.transition="none";
		ev=ev.changedTouches[0];
		iStartTouchX=ev.pageX;
		iStartX=iX;
		clearInterval(oTimer);
	}
	function fnMove(ev)
	{
		ev=ev.changedTouches[0];
		var iDis=ev.pageX-iStartTouchX;
		iX=iStartX+iDis;
		oUl.style.WebkitTransform=oUl.style.transform="translateX("+iX+"px)";

	}
	function fnEnd()
	{
		iNow=iX/iW;
		iNow=-Math.round(iNow);
		if(iNow<0)
		{
			iNow=0;
		}
		if(iNow>aLi.length-1)
		{
			iNow=aLi.length-1;
		}
		tab();
	}


	function tab()
	{
		iX=-iNow*iW;
		oUl.style.transition="0.5s";
		oUl.style.WebkitTransform=oUl.style.transform="translateX("+iX+"px)";

		for(var i=0; i<oDotLi.length; i++){
			oDotLi[i].className='';
		}
		oDotLi[iNow].className='active';

		oFont.innerHTML=sFont[iNow];
	}

}

/* 新闻消息板块 */ 
// 筛选
Llq.prototype.SelectNews=function(nowpage,PageSize){
	var _this=this;
	var oBtn=document.querySelectorAll('.dropup')[0].children;
	for(var i=0; i<oBtn.length; i++){
		(function(ind){
			oBtn[ind].onclick=function(){

				$('#newsWrap').empty();
				var nNewType=this.getAttribute('newtype');

				window.location.hash=nNewType;

				_this.GetNewsList(nNewType,nowpage,PageSize)
			};
		})(i);
	}
}
Llq.prototype.GetNewsList=function(newtype,nowpage,PageSize,cbfn){
	var _this=this;

	//alert("type=list&newtype="+newtype+"&nowpage="+nowpage+"&PageSize="+PageSize);
	$.ajax({
		url:"../phpdata/datapage/arclist.php",
		type:"POST",
		data:"type=list&newtype="+newtype+"&nowpage="+nowpage+"&PageSize="+PageSize,
		success: function(data){
			_this.NewsNav();
			var json=$.parseJSON(data);
			//console.log(json);
			if(json.Total==0){
				$('#newsWrap').html('<p class="dataisno">暂无数据</p>');
				$('.onlinemore').css('display','none')
			}else{

				//alert('Total:'+json.result.length+'-PageSize:'+PageSize);

				if(json.result.length<PageSize){
					$('.onlinemore').css('display','none');
				}else{
					$('.onlinemore').css('display','block').find('a').attr('pagenum',2);
				}

				var newtypes='',html='';
				var Liststr='';
				for(var i=0; i<json.result.length; i++){
					
					//console.log(json.result[i])

					var newjson=json.result[i];

					console.log(newjson)
					switch(newjson.newtype){
						case '1':
							newtypes="篮球新闻";
						break;
						case '2':
							newtypes="足球新闻";
						break;
						case '3':
							newtypes="实时新闻";
						break;
						case '4':
							newtypes="神棍区";
						break;
						case '5':
							newtypes="推荐文章";
						break;
						case '6':
							newtypes="篮球心水";
						break;
						case '7':
							newtypes="足球心水";
						break;
						case '8':
							newtypes="视频下载";
						break;
						default:
							newtypes='栏目id:'+newjson.newtype;
					}
					if(newjson.isrecommend=='')newjson.isrecommend='-';
					
					if(newjson.thumb==''){newjson.thumb='../img/logo.png" style="border:1px solid #ccc;"'}
					Liststr+=`<li>
						<a href="article.html?id=`+newjson.id+`"><img src="`+newjson.thumb+`"><div class="newinfo"><h2>`+newjson.title+`</h2>\
						<p><span class="read">`+newjson.page_view+`</span><span><span class="time">`+newjson.datatime+`</span></p>
						</div></a>
						</li>`;
				}
				$('#newsWrap').append(Liststr);
			}

			cbfn&&cbfn();
		},
		error: function(){
		}	
	});	
}



/* 消息列表分类菜单 */

Llq.prototype.NewsNav=function(){
	var oMoreNav=document.querySelectorAll('.moreNav')[0];
	var oVal=document.getElementById('videotitle');
	var oDropup=document.querySelectorAll('.dropup')[0];
	bind(oMoreNav,"touchend",function(){
		oDropup.style.transition='0.5s';
		oDropup.style.bottom='0';
		oDropup.style.opacity=1;
		//oVal.focus();
		oMoreNav.style.transition='0.3s';
		oMoreNav.style.right='-0.6rem';
		oMoreNav.style.opacity='0';
	});
	var oInput=oDropup.getElementsByTagName('input')[0];


	if(oInput!=undefined){
		var oSubVideo=document.getElementById('subVideo');
		bind(oSubVideo,"touchend",function(){
			oDropup.style.transition='0.5s';
			oDropup.style.bottom='-0.6rem';
			oDropup.style.opacity=0;

			oMoreNav.style.transition='0.3s';
			oMoreNav.style.right='0.1rem';
			oMoreNav.style.opacity='1';
		});
	}else{
		bind(oDropup,"touchend",function(){
			oDropup.style.transition='0.5s';
			oDropup.style.bottom='-0.6rem';
			oDropup.style.opacity=0;

			oMoreNav.style.transition='0.3s';
			oMoreNav.style.right='0.1rem';
			oMoreNav.style.opacity='1';
		});
	}
}



// 视频集锦

Llq.prototype.GetVideoList=function(username,nowpage,PageSize,cbfn){
	var _this=this;

	//alert("type=GetVideoList&keywords="+username+"&nowpage="+nowpage+"&PageSize="+PageSize)
	$.ajax({
		url:"../phpdata/datapage/online.php",
		type:"POST",
		data:"type=GetVideoList&keywords="+username+"&nowpage="+nowpage+"&PageSize="+PageSize,
		success: function(data){
			_this.NewsNav();
			var json=$.parseJSON(data);
			
			console.log(json);

			if(json.Total==0){
				$('#newsWrap').html('<p class="dataisno">暂无数据</p>');
				$('.onlinemore').css('display','none')
			}else{
				if(json.result.length<PageSize){
					$('.onlinemore').css('display','none');
				}else{
					$('.onlinemore').css('display','block').find('a').attr('pagenum',2);
				}
				var newtypes='',html='';
				var Liststr='';
				for(var i=0; i<json.result.length; i++){
				
					var newjson=json.result[i];

					Liststr+='<li><a href="shipindetail.html?id='+newjson.id+'"><div class="mark"></div><img src="'+newjson.thumPic+'"><p>'+newjson.title+'</p></a></li>';
				}
				console.log(json);
				$('#video-wrap').append(Liststr);
				
				cbfn&&cbfn();
			}
		},
		error: function(){
		}	
	});
}

//底部菜单

Llq.prototype.setNva=function(){

	var sHtml=`<div class="bottom-nav"><ul class="">
			<li><a href="zhibo.html" class="nva-zb">直播</a></li>
			<li><a href="shipin.html" class="nva-sp">视频</a></li>
			<li><a href="javascript:;" id="gzhbtn" class="nva-wx">公众号</a></li>
			<li><a href="active.html" class="nva-wz">红包福利</a></li>
			<li ><a href="javascript:;" id="" class="nva-sb navdrop">伤病/首发</a><div class="sb-list">
			<a href="shangbing.html">伤病</a>
			<a href="shoufa.html">首发</a>
			</div></li></ul>	</div>`;

	var oDiv=document.createElement('div');
	oDiv.id='sitenav';
	oDiv.innerHTML=sHtml;
	document.getElementsByTagName("body")[0].appendChild(oDiv);

	this.setGZH();

	var k=1;

	$('.navdrop').on('click',function(){
		if(k==1){
			$('.sb-list').css('display','block');
			k=0;
		}else{
			$('.sb-list').css('display','none');
			k=1;
		}
	});
}



Llq.prototype.setGZH=function(){

	var oBox=document.createElement('div');

	oBox.id='gzh';

	oBox.style.height=document.documentElement.clientHeight-46+'px';

	 document.getElementsByTagName('body')[0].appendChild(oBox);

	var oGzhbtn=document.getElementById('gzhbtn');
	
	oBox.innerHTML='<div class="gzh-warp"><h2>关注</h2>\
			<div class="gzh-img"><img src="images/gzh.jpg" /></div>\
			<div class="gzh-name">微信公众号：<strong id="gzh-text">约个球</strong></div>\
			<textarea id="zghinput"></textarea>\
			<div class="copygzh"><a href="javascript:;" id="copyText">复制公众号名称</a></div></div>';

	var k=0;

	function copyArticle(event) {
        const range = document.createRange();
        range.selectNode(document.getElementById('gzh-text'));
 
        const selection = window.getSelection();
        if(selection.rangeCount > 0) selection.removeAllRanges();
        selection.addRange(range);
        document.execCommand('copy');
        alert("复制成功！");
      }
 
      document.getElementById('copyText').addEventListener('click', copyArticle, false);


      

	oGzhbtn.onclick=function(){
		if(k==0){
			oBox.style.display='block';
			oGzhbtn.innerHTML='关闭';
			oGzhbtn.style.color='#1fb5ad';
			k=1;
		}else{
			oBox.style.display='none';
			oGzhbtn.innerHTML='公众号';
			oGzhbtn.style.color='';
			k=0;
		}
		

	}

}


//顶部header
Llq.prototype.setHeader=function(){

	var sHtml='<header class="header-top">\
		<a href=""><img src="images/logo.png"></a></header>';

	var oDiv=document.getElementById('siteHeader');
	
	oDiv.innerHTML=sHtml;
	//document.getElementsByTagName("body")[0].appendChild(oDiv);
}
Llq.prototype.setTopAd=function(){

	var sHtml='<a href="active.html"><img src="images/111.jpg"></a>';

	var oDiv=document.getElementById('TopAD');
	
	oDiv.innerHTML=sHtml;
	//document.getElementsByTagName("body")[0].appendChild(oDiv);
}


Llq.prototype.VideoDetail=function(){
	var _this=this;
	var id=_this.geturldata(window.location.href).id;
	$.ajax({
		url:"../phpdata/datapage/online.php",
		type:"POST",
		data:"type=GetOneVideoInfo&id="+id,
		success: function(data){

			var json=$.parseJSON(data);
			console.log(json);
			if(json.Total==0){
				$('.articletime').html('<p class="dataisno">暂无数据</p>');
			
			}else{
				$('.newshead h1').html(json.title);
				$('title').html(json.title+' - 约个球，更多精彩视频请关注微信公众号：约个球');
				$('.descriptions').html(json.descention);
				$('.articletime').html(json.updatetime);
				$('.viewnum').html(json.view);
				var sourceUrl=json.videoUrl.split('|||')[0];
				$('#othersource').attr('href',sourceUrl);
				$('#v').attr('src',_this.openUrl1+sourceUrl);
			}
		},
		error: function(){
		}	
	});
}

function fnTab(){
	var oTab=document.getElementById("tabPic");
	var oList=document.getElementById("picList");
	var oLi=oList.children;
	var picnum=document.getElementById('picnum');
	var iNow=0;
	var iX=0;
	var iW=view().w;
	var oTimer=0;
	var iStartTouchX=0;
	var iStartX=0;
	oTab.style.width=iW+'px';
	oList.style.width=oLi.length*100+'%';
	picnum.innerHTML=(iNow+1)+'/'+oLi.length;
	for(var i=0; i<oLi.length; i++){
		oLi[i].style.width=100/oLi.length+'%';
		oLi[i].style.height=view().h+'px';
	}


	bind(oTab,"touchstart",fnStart);
	bind(oTab,"touchmove",fnMove);
	bind(oTab,"touchend",fnEnd);
	function fnStart(ev)
	{
		oList.style.transition="none";
		ev=ev.changedTouches[0];
		iStartTouchX=ev.pageX;
		iStartX=iX;
		//clearInterval(oTimer);
	}
	function fnMove(ev)
	{
		ev=ev.changedTouches[0];
		var iDis=ev.pageX-iStartTouchX;
		iX=iStartX+iDis;
		oList.style.WebkitTransform=oList.style.transform="translateX("+iX+"px)";
	}
	function fnEnd()
	{
		iNow=iX/iW;
		iNow=-Math.round(iNow);
		if(iNow<0)
		{
			iNow=0;
		}
		if(iNow>oLi.length-1)
		{
			iNow=oLi.length-1;
		}
		tab();
	}
	function tab()
	{
		iX=-iNow*iW;
		oList.style.transition="0.5s";
		oList.style.WebkitTransform=oList.style.transform="translateX("+iX+"px)";
	}

}
function view() {
    return {
        w: document.documentElement.clientWidth,
        h: document.documentElement.clientHeight
    };
}

























