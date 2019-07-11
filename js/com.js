



function loading(){
	
	var oLoayer=document.createElement('div');
	oLoayer.className='layer_loading';
	
	oLoayer.innerHTML='<div id="load"><div>加</div><div>载</div><div>中</div><div>,</div><div>请</div><div>稍</div><div>后</div></div>';
	document.body.appendChild(oLoayer);
	
};



function seeting(){
	var arr=[];
	//var oData;
	$.ajax({
		type:"POST"	,
		url:"phpdata/datapage/othersetting.php",
		data:"type=GetOtherSetting",
		async: false, 
		success: function(str){
			var oData=$.parseJSON(str);
			arr.push({
				contactQQ:  oData.contactQQ,
				description:oData.description,
				fLink:      oData.fLink,
				keyword:    oData.keyword,
				keyword1:   oData.keyword1,
				keyword2:   oData.keyword2,
				keyword3:   oData.keyword3,
				newsTag:    oData.newsTag,
				statement1: oData.statement1,
				statement2: oData.statement2,
				videoTag:   oData.videoTag
			})
			
		}
	});	
	return arr[0];	
};


function roundNum(s, b){
	return parseInt( Math.random()*(b-s+1)+s);
};
//关键字seo






// tabswitch
$(function(){
	$('.columnwrap li').on('mouseenter',function(){
    	$('.columnwrap li').removeClass('active');
	  	$('.tabswitch').css('display','none');
	  	$(this).addClass('active');
	  	$('.tabswitch').eq($(this).index()).css('display','block');
	})
});


var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "//hm.baidu.com/hm.js?ec074110fa21030012a6f913f5baa7f0";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();





// var sUserAgent = navigator.userAgent.toLowerCase();
// var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
// var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
// var bIsMidp = sUserAgent.match(/midp/i) == "midp";
// var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
// var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
// var bIsAndroid = sUserAgent.match(/android/i) == "android";
// var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
// var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";

// if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
    
//   //  location.href  = 'http://qiweixcx.com/phone';
//   alert('检测到您是移动用户，现在为您跳转到移动版本。');

//   var sUrl=window.location.href;
//     if(sUrl.indexOf('_')>0){
//     	var sId=sUrl.split('_')[1].split('.')[0];

//     	if(sUrl.indexOf('content')>0){
//     		window.location.href='m/article.html?id='+sId;
//     	}

//     	if(sUrl.indexOf('videoDetail')>0){
//     		window.location.href='m/shipindetail.html?id='+sId;
//     	}

//     }else{

//     	if(sUrl.indexOf('news')>0){
//     		window.location.href='m/xiaoxi.html';
//     	}
//     	if(sUrl.indexOf('video')>0){
//     		window.location.href='m/shipin.html';
//     	}

//     	if(sUrl.indexOf('Injuries')>0){
//     		window.location.href='m/shangbing.html';
//     	}

//     	if(sUrl.indexOf('NBAfirst')>0){
//     		window.location.href='m/shoufa.html';
//     	}
//     }

// }else{
	

	
// }
