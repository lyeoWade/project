	$.ajax({
		url:'phpdata/datapage/online.php',
		type:"POST",
		data:"type=GetOneListInfo&id="+geturldata(window.location.href).id,
		success:function(str){
			var oData=$.parseJSON(str);
			//console.log(str);
			//标题
			$('#newvideo').html('<h3>'+oData.league+' '+oData.hteam+'-'+oData.gteam+'</h3><p>直播开始时间:'+oData.PlayTime+'</p>');
			$('title').html(oData.league+' '+oData.hteam+'-'+oData.gteam);
			if(oData.LiveSignalIn==''){
				$('#moreInfoIn').remove();
			}else{
				var moreSingle=oData.LiveSignalIn.replace(/fuck0/g,'&');
				var list=moreSingle.split('\n');
				var moreSingleHtml='',targetUrl='',singUrl=[];

				for(var i=0; i<list.length; i++){
					targetUrl=encodeURIComponent(list[i].split('|||')[0]);
					
					moreSingleHtml+='<a target="_blank" infoUrl="'+targetUrl+'" href="javascript:;">'+list[i].split('|||')[1]+'</a>';
					singUrl.push(targetUrl);
				}

				$('#moreInfoIn').html(moreSingleHtml);
				$('#moreInfoIn a').eq(0).addClass('active');
				play(singUrl[0]);
				
			};

			change();
			//是否第一次打开页面
			if(geturldata(window.location.href).sburl==undefined){
				$('#iframe').attr('src',list[0].split('|||')[0]);
			}else{
				var palyAddress=decodeURIComponent(geturldata(window.location.href).sburl);
				$('#iframe').attr('src',palyAddress);
			}
				
			
			// if(oData.LiveSignalOut==''){
			// 	$('#moreInfoOut').remove();
			// }else{
			// 	//console.log(oData.LiveSignalOut);
			// 	var moreSingle=oData.LiveSignalOut.replace(/fuck0/g,'&');
			// 	var list=moreSingle.split('\n');
			// 	var moreSingleHtml='';
			// 	for(var i=0; i<list.length; i++){
			// 		moreSingleHtml+='<a target="_blank" href="'+list[i].split('|||')[0]+'">'+list[i].split('|||')[1]+'</a>';
			// 	}
			// 	$('#moreInfoOut').html('<span class="tip">站外直播</span>'+moreSingleHtml);
			// }
			
			// if(oData.LiveText==''){
			// 	$('#moreInfoText').remove()
			// }else{
			// 	$('#moreInfoText').html('<span class="tip">图文直播</span><a target="_blank" href="'+oData.LiveText+'">图文直播间</a>');
			// }
			// $('#question').html('<span class="tip">如有问题请加群询问:<a target="_blank" href="http://shang.qq.com/wpa/qunwpa?idkey=d40b4a12bab61b0faa9a94745a70a6650005b71f8730152f230b79d715fdb293"><img border="0" src="http://pub.idqqimg.com/wpa/images/group.png" alt="" title=""></a>'+seeting().contactQQ+'</span>');
		}
	});



function change(){
	$('#moreInfoIn a').on('click',function(){
		//alert($(this).attr('infourl'))
		$('#moreInfoIn a').removeClass('active');
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
        video:singUrl//视频地址
    };
    var player=new ckplayer(videoObject);
}
//sidehotvideo();