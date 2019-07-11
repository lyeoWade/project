<?php 
	include "com.php";
	header("Content-type: text/html; charset=utf-8"); 

	//采集优酷


	$url=htmlspecialchars($_POST['requrl']);
	$type=htmlspecialchars($_POST['type']);
	$videoType=htmlspecialchars($_POST['videoType']);


	
	date_default_timezone_set('Asia/Shanghai');
	$tt=date('Y-m-d H:i:s');
	// echo $type;
	// echo $url;
	// echo $videoType;
	$get=file_get_contents($url);

	//var_dump($get);

	switch ($type) {
		case 'youku':
			
			$reg='/<li class="yk-col4 mr1"><div class="yk-pack pack-film"><div class="p-thumb"><a href="(.*?)" title="(.*?)" target="_blank"><\/a>(.*?)<img class="quic" _src="(.*?)" src="(.*?)" alt="(.*?)" \/><\/div><ul class="p-info pos-bottom"><li class="status hover-hide"><span class="p-time "><i class="ibg"><\/i><span>(.*?)<\/span><\/span><\/li><\/ul>.*?<\/div><\/li>/i';

			preg_match_all($reg,$get,$datas);
			//var_dump($datas);
			//$datas[1]//内容页链接
			//$datas[2]//标题
			//$datas[4]//封面图
			//$datas[7]//状态

			$data=array();

			$regs='/<a class="sn"  href="(.*?)" data-from="(.*?)"><span class="sn_num">(\d+)<\/span>.*?<\/a>/i';
			
			
			$empty=0;
			for ($i=0; $i <count($datas[1]); $i++) { 

				if($videoType=="连续剧"){
					$getNum=file_get_contents('http:'.$datas[1][$i]);

					preg_match_all($regs,$getNum,$datasAll);
					//var_dump($datasAll);
					$b=implode('[-]',$datasAll[1]);	
				}else{
					$b=$datas[1][$i];
				}
				
				//echo $i;
				$title=$datas[2][$i];
				$content='http:'.$b;
				$coverpic=$datas[4][$i];
				$statusTip=$datas[7][$i];
				$status=1;
				//0 更新中； 1 已完结

				if(strpos($datas[7][$i],"预告")){
					$status=0;
				}else if($videoType=="电影"){
					$status=1;
				}else if(!strpos($datas[7][$i],"全")){
					$status=0;
				}else if($videoType=="连续剧"){
					$status=1;
				}
				//echo $status;
				//先查询对比是否存在 且状态为更新中 则更新 ， 如果存在且状态为1已完结，则跳过
				//如果没有，则新增
				//echo $title;n
				$checkSql=mysql_query("SELECT * FROM vipvideo WHERE title = '".$title."' AND status='1'");
				$isEnd=mysql_fetch_array($checkSql);
				$checkSql2=mysql_query("SELECT * FROM vipvideo WHERE title = '".$title."' AND status='0'");
				$isEnd2=mysql_fetch_array($checkSql2);

				// $addNum=0;
				// $updateNum=0;
				// $endNum=0;
				
				//标题没有直接插入
				//有标题但是状态更新中则更新
				if(!$isEnd){
					//var_dump($isEnd);
					if($isEnd2){ //有标题但是状态更新中则更新
						//var_dump($isEnd2['id']);
						$UpdataOneArticle="UPDATE vipvideo SET content='".$content."',zhuyan='".$empty."',singalChange='1',miaoshu='".$empty."',coverPic='".$coverpic."', videoType='".$videoType."' , status='".$status."' , statusTip='".$statusTip."' , recommended='".$empty."' , ishot='".$empty."' , view='".$empty."' , createTime='".$tt."'  WHERE id=".$isEnd2['id'];
						$UpdataONE=mysql_query($UpdataOneArticle) or die('更新失败:'.mysql_error());
						$updateNum++;
					}else{ //新增
						$INSERT="INSERT INTO vipvideo (title , content, zhuyan , singalChange , miaoshu , coverPic , videoType , status , statusTip , recommended , ishot , view ,createTime ) VALUES ('{$title}' , '{$content}', '{$empty}' , '1', '{$empty}', '{$coverpic}' ,'{$videoType}', '{$status}' , '{$statusTip}' , '{$empty}' , '{$empty}' , '{$empty}' ,'{$tt}')";
						$AddOneArticle=mysql_query($INSERT) or die('插入失败:'.mysql_error());
						$addNum++;
					}
					
				}else{ //已完结
					//var_dump($isEnd);
					$endNum++;
				}
				
			}

			echo_status(array('respondCode'=>'0','respondMsg'=>'操作完成','endNum'=>'重复个数:"'.$endNum.'"','updateNum'=>'更新个数:"'.$updateNum.'"','addNum'=>'新增个数:"'.$addNum.'"'));
		break;
		
		default:
			# code...
			break;
	}

?>