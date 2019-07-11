function remReSize() {

	var w = document.documentElement.clientWidth;
	if (w > 640) {
		w = 640;
	};
	document.getElementsByTagName('html')[0].style.fontSize=200/640*w + 'px';
};
remReSize();

window.addEventListener('resize', remReSize, false);






function bind(obj, ev, fn) {
	if (obj.addEventListener) {
		obj.addEventListener(ev, fn, false);
	} else {
		obj.attachEvent('on' + ev, function() {
			fn.call(obj);
		});
	}
}

function view() {
	return {
		w: document.documentElement.clientWidth,
		h: document.documentElement.clientHeight
	};
};



function substrs(str) {

	var byteLen = 0;

	for (var i = 0; i < str.length; i++) {
		if (/[\u4e00-\u9fa5]/.test(str.charAt(i))) {
			byteLen += 2;
		} else {
			byteLen++;
		}
	};
	return byteLen;
};

function toZero(n) {
	return n < 10 ? '0' + n : n;
}



function getPos(obj) {
	var l = 0,
		t = 0;

	while (obj) {
		l += obj.offsetLeft;
		t += obj.offsetTop;
		obj = obj.offsetParent;
	}
	return {
		left: l,
		top: t
	}
}
function getDay(n){
	var oDay=new Date();
	var year=oDay.getFullYear();
	var oM=oDay.getMonth()+1;
	var oD=oDay.getDate();
	//console.log(nowDays())
	var d=0;
	if((oD+n)>nowDays()){
		d=oD+n-nowDays();
		oM=oM+1;
	}else{
		d=oD+n;
	}
	//console.log(d)
	return year+'-'+toZero(oM)+'-'+toZero(d);
};

function randoms(s,b){
	return parseInt( Math.random()*(b-s+1)+s);
}

function toZero(n){
	return n<10?'0'+n:n;
}
function getWeek(n){
	var oDay=new Date();
	var week=['日','一','二','三','四','五','六'];
	var weekNow='';
	for(var i=0; i<week.length; i++){
		weekNow=week[(oDay.getDay()+n)%7];
	};
	return weekNow;
}

 function nowDays()
{
   var oDate=new Date();
   //将日期先调到下个月，再将天数调为0 回到上个月最后一天
   oDate.setMonth(oDate.getMonth()+1,0); 
   //oDate.setDate(0);
   return oDate.getDate();
};





// //平台、设备和操作系统
// var system ={
// 	win : false,
// 	mac : false,
// 	xll : false
// };
// //检测平台
// var p = navigator.platform;
// system.win = p.indexOf("Win") == 0;
// system.mac = p.indexOf("Mac") == 0;
// system.x11 = (p == "X11") || (p.indexOf("Linux") == 0);

// if(system.win||system.mac||system.xll){
// 	//PC端
// 	alert('现在是电脑');
// }else{
// 	//移动端跳转的链接
// 	alert('现在是手机');
// }


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





// }else{
// 	alert('检测到您是PC用户，现在为您跳转到PC版本。');

// 	var sUrl=window.location.href;
//     if(sUrl.indexOf('?')>0){
//     	var sId=sUrl.split('?')[1].split('=')[1];

//     	if(sUrl.indexOf('article')>0){
//     		window.location.href='../content_'+sId+'.html';
//     	}

//     	if(sUrl.indexOf('shipindetail')>0){
//     		window.location.href='../videoDetail_'+sId+'.html';
//     	}

//     }else{

//     	if(sUrl.indexOf('xiaoxi')>0){
//     		window.location.href='../news.html';
//     	}

//     	if(sUrl.indexOf('shipin')>0){
//     		window.location.href='../video.html';
//     	}

//     	if(sUrl.indexOf('shangbing')>0){
//     		window.location.href='../Injuries.html';
//     	}

//     	if(sUrl.indexOf('shoufa')>0){
//     		window.location.href='../NBAfirst.html';
//     	}
//     }
// }



