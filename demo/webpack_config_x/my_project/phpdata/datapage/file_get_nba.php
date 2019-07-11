<?php 
	include "com.php";
	header("Content-type: text/html; charset=utf-8"); 

	//采集优酷


	$url=htmlspecialchars($_POST['requrl']);
	//$url="https://v.qq.com/x/page/a0332l6v5fo.html";
	$type=htmlspecialchars($_POST['sourcecolumn']);
	date_default_timezone_set('Asia/Shanghai');
	$tt=date('Y-m-d H:i:s');
	$get=file_get_contents($url);

	//var_dump($get);
	//$type='qq';
	switch ($type) {
		case 'qq':
			
			$reg='/<a href="(.*?)" class="figure" title="(.*?)" r-on="(.*?)" _stat="quickopen:click">\n\s\s<img src="\/\/i.gtimg.cn\/qqlive\/images\/20150608\/pic_h.png  " alt="(.*?)" r-lazyload="(.*?)" class="figure_pic" (.*?)>\n\s\s<div class="figure_count"><span class="num">(.*?)<\/span><\/div>\n\s<\/a>/i';

/*
<a href="/x/page/m0022onk64h.html" class="figure" title="全明星赛史上10大过人 罗斯戏耍杜兰特库里风骚过人" r-on="{click: changeToVideo.bind(null, 'm0022onk64h')}" _stat="quickopen:click">
		<img src="//i.gtimg.cn/qqlive/images/20150608/pic_h.png  " alt="全明星赛史上10大过人 罗斯戏耍杜兰特库里风骚过人" r-lazyload="//puui.qpic.cn/vpic/0/m0022onk64h_160_90_3.jpg/0" class="figure_pic" onerror="picerr(this, 'h')">
		<div class="figure_count"><span class="num">02:43</span></div>
	</a>

*/ 
			preg_match_all($reg,$get,$datas);
			//var_dump($datas);
			//$datas[1]//内容页链接
			//$datas[2]//标题
			//$datas[5]//封面图

			$data=array();
			$empty=0;
			$kong='';

			for ($i=0; $i <count($datas[2]); $i++) { 

				//var_dump($datas[2][$i]);
				//echo $status;
				//先查询对比是否存在 且状态为更新中 则更新 ， 如果存在且状态为1已完结，则跳过
				//如果没有，则新增
				//echo $title;n
				$videoUrl='https://v.qq.com'.$datas[1][$i];


				$title=$datas[2][$i];
				$thumPic=$datas[5][$i];

				

				$checkSql=mysql_query("SELECT * FROM video WHERE title = '".$title."'");
				$isEnd=mysql_fetch_array($checkSql);
				// $addNum=0;
				// $updateNum=0;
				// $endNum=0;
				
				//标题没有直接插入
				//有标题但是状态更新中则更新

				if(!$isEnd){
						
					$INSERT="INSERT INTO video (title , descention, videoUrl , tag , videoColumn , bannerUrl , thumPic , isChecked , view , updatetime , source , sourceSite  ) VALUES ('{$title}' , '{$kong}', '{$videoUrl}' , '{$empty}', '{$empty}' ,'{$empty}', '{$thumPic}' , '{$empty}' , '{$empty}' , '{$tt}' , '{$empty}' ,'{$type}')";
					$AddOneArticle=mysql_query($INSERT) or die('插入失败:'.mysql_error());
					$addNum++;
				}else{ //已完结
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