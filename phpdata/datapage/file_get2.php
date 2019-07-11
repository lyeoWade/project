<?php 
	include "com.php";
	header("Content-type: text/html; charset=utf-8"); 

	//采集优酷


	$url="http://list.youku.com/category/show/c_97_s_6_d_1_p_1.html?spm=a2h1n.8251845.0.0";
	

	$get=file_get_contents($url);



	$reg='/<li class="yk-col4 mr1"><div class="yk-pack pack-film"><div class="p-thumb"><a href="(.*?)" title="(.*?)" target="_blank"><\/a>(.*?)<img class="quic" _src="(.*?)" src="(.*?)" alt="(.*?)" \/><\/div><ul class="p-info pos-bottom"><li class="status hover-hide"><span class="p-time "><i class="ibg"><\/i><span>(.*?)<\/span><\/span><\/li><\/ul>.*?<\/div><\/li>/i';
	preg_match_all($reg,$get,$datas);
	var_dump($datas);

	//$datas[2]//标题
	//$datas[4]//封面图
	//$datas[7]//状态

	$data=array();

	$regs='/<a class="sn"  href="(.*?)" data-from="(.*?)"><span class="sn_num">(\d+)<\/span>.*?<\/a>/i';
	$empty=0;
	for ($i=0; $i <count($datas[1]); $i++) { 

		$getNum=file_get_contents('http:'.$datas[1][$i]);

		preg_match_all($regs,$getNum,$datasAll);
		
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