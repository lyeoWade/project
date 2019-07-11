<?php 
	include "com.php";
	header("Content-type: text/html; charset=utf-8"); 

	//采集优酷


	$url="http://list.youku.com/category/show/c_96_s_1_d_4_p_30.html?spm=a2h1n.8251845.0.0";
	

	$get=file_get_contents($url);



	$reg='/<li class="yk-col4 mr1"><div class="yk-pack pack-film"><div class="p-thumb"><a href="(.*?)" title="(.*?)" target="_blank"><\/a>(.*?)<img class="quic" _src="(.*?)" src="(.*?)" alt="(.*?)" \/><\/div><ul class="p-info pos-bottom"><li class="status hover-hide"><span class="p-time "><i class="ibg"><\/i><span>(.*?)<\/span><\/span><\/li><\/ul>.*?<\/div><\/li>/i';
	preg_match_all($reg,$get,$datas);
	//var_dump($datas);

	//$datas[2]//标题
	//$datas[4]//封面图
	//$datas[7]//状态

	$data=array();

	//<a href="(//v.youku.com/v_show/id_XMzIyMTk3MTY2MA==.html?spm=a2h0j.8191423.vpofficiallistv5_wrap.5~5~5~5~5~5~A)" class="A" data-from="y1.2-2.4.1" data-spm-anchor-id="a2h0j.8191423.vpofficiallistv5_wrap.5~5~5~5~5~5~A"><div class="serial"><label>1</label><span class="playing"></span></div><div class="cover"><img src="https://vthumb.ykimg.com/054102015A2A68CD18962B6289026397" alt="请爱我的女朋友"><span class="c-time"><i class="bg"></i><span>1:29:20</span></span></div><div class="headline">请爱我的女朋友</div><div class="status"><span>7,491次播放</span><span>5次评论</span></div></a>
	
	$regs='/<a href="(.*?)".*?>(.*?)<\/a>/i';
	$empty=0;
	for ($i=0; $i <count($datas[1]); $i++) { 

		$getNum=file_get_contents('http:'.$datas[1][$i]);

		preg_match_all($regs,$getNum,$datasAll);
		var_dump($datasAll);
		$b=implode('[-]',$datasAll[1]);	
		//echo $i;
		$title=$datas[2][$i];
		$content=$b;
		$coverpic=$datas[4][$i];
		$status=1;
		
	}



	

	
		

	
	//var_dump($result);	

	//$c = call_user_func_array('array_merge', $result);

	//var_dump($result);// 播放url

	//$reg="/<img src='(https:\/\/t1.onvshen.com:85\/gallery\/[\d]+\/[\d]+\/[\d\w]+\/[\d]+\.jpg)' alt='(.*?)' \/>/";


	//var_dump($numUrl[1][0]); //第一页的地址 用来判断是否已采集
	// $result=array();
	// for ($i=0; $i <count($numUrl[1]) ; $i++) { 

	// 	$getNumPic=file_get_contents($url.$numUrl[1][$i]);

	// 	preg_match_all($reg,$getNumPic,$datasAll);
		
	// 	$result[]=$datasAll[1];
	// }

	// $c = call_user_func_array('array_merge', $result+$datas[1]);

	//var_dump(array_keys(array_flip($c)+array_flip($datas[1]))); //所有的图片

?>