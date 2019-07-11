<?php
	header('Cache-control:private,must-revalidate');
	header("Content-type: text/html; charset=utf-8"); 
	
	include "com.php";

	$type         = $_POST['type'];
	$id           = $_POST['id'];
	

	$title        =htmlspecialchars($_POST['title']);
	//$desc         =htmlspecialchars($_POST['description']);
	//$desc         =str_replace("\r\n","",$desc);
	$desc = str_replace("\r\n", "", $_POST['description']); 
	//=str_replace("\r\n","",$text);
	//echo $desc;
	$isrecommend  =htmlspecialchars($_POST['isrecommend']);
	$newbanner    =htmlspecialchars($_POST['newbanner']);
	$keywords     =htmlspecialchars($_POST['keywords']);
	$content      =$_POST['content'];
	$username     =htmlspecialchars($_POST['username']);
	$newtype      =$_POST['newtype'];
	$nowpage      =$_POST['nowpage']; //当前第几页
	$PageSize     =$_POST['PageSize']; //每一页多少条
	date_default_timezone_set('Asia/Shanghai');
	$Sid=$_POST['id'];
	$userid=$_POST['userid'];
	$ManagerType=$_POST['ManagerType'];
	//echo $title;
	/*
		$status -->1 通过  2-->审核
		$ManagerType->1管理员  2->用户
	*/
	$tt=date('Y-m-d H:i:s');
	
	if($ManagerType==2){
		$pageview=0;
		$status=2; 
		$isrecommend=1;
	}else if($ManagerType==1){
		$pageview=100;
		$status=1; 
	}

	switch($type){
		case 'VideoBanner'://视频banner
			$VideoBanner="SELECT * FROM Video WHERE isChecked=1 ORDER BY updatetime DESC limit 0,5";

			$query=mysql_query($VideoBanner);

			$i=0;
			$result=array();
			while($row=mysql_fetch_array($query)){

				var_dump($row)
				//$result[$i] = array('id' => $row["id"] , "title" =>$row["title"] , "page_view" =>$row["page_view"] , "newtype" =>$row["type_id"] , "thumb" =>$temp , "datatime" =>$row["datatime"] , "keywords" =>$row["keywords"] );
				$i++;
			};
			$a=json_encode($result);
			echo '{"result":'.$a.',"Total":'.$Total.'}';
		break;
		
?>