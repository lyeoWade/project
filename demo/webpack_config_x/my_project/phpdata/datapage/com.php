<?php
	$conn=mysql_connect('localhost','root','') or die("数据库连接失败");
	mysql_select_db('ilovenba') or die("数据库查询失败".mysql_error());;
	
	
	// $conn=mysql_connect('www.ilovenba.cn','wadebing333','74113991') or die("数据库连接失败");
	// mysql_select_db('wadebing333') or die("数据库查询失败".mysql_error());

	mysql_query("SET NAMES UTF8") or die("字符编码设置失败".mysql_error());

	function echo_status($str){

		echo json_encode($str);
		exit;
	};
	function echo_status2($str){

		echo json_encode($str);
	};
	//删除
	function deletesfn($table,$ID){
		$deletes=mysql_query("DELETE FROM ".$table." WHERE id = ".$ID."") or die('删除失败'.mysql_error());
		if($deletes){
			echo_status(array('msg'=>'删除成功','code'=>'0'));	
		}else{
			echo_status(array('msg'=>'删除失败','code'=>'1'));	
		};
	};	


	date_default_timezone_set('Asia/Shanghai');
	$tt=date('Y-m-d H:i:s');

	//获取链接库数据



	$link=htmlspecialchars($_POST['linklibrary']);
	$linkSpare=htmlspecialchars($_POST['linkSpare']);
	$tvlink=htmlspecialchars($_POST['tvlink']);
	$types=$_POST['type'];
	$Sid=$_POST['id'];

	switch ($types) {
		case 'updateLinkLibrary':
			//echo $link;
			$UpdateLink="UPDATE linklibrary SET tvlink='".$tvlink."',link='".$link."',linkSpare='".$linkSpare."',updatetime='".$tt."'  WHERE id=".$Sid;

			$UpdataONE=mysql_query($UpdateLink) or die('插入失败:'.mysql_error());
			if($UpdataONE){
				echo_status(array('respondCode'=>'0','respondMsg'=>'更新成功'));	
			}else{
				echo_status(array('respondCode'=>'1','respondMsg'=>'更新失败'));	
			}
			break;
		break;
		case 'getLinkLibrary':
			$getLinkLibrary="SELECT * FROM linklibrary WHERE id=".$Sid;
			$query=mysql_query($getLinkLibrary) or die("获取失败:".mysql_error());
			if($query){
				while ($row=mysql_fetch_array($query)) {
					echo_status(array("respondCode"=>"0","respondMsg"=>"数据获取成功！","id"=>$row['id'],"tvlink"=>$row['tvlink'],"link"=>$row['link'],"linkSpare"=>$row['linkSpare'],"updatetime"=>$row['updatetime']));
				}
			}else{
				echo_status(array("respondCode"=>"1","respondMsg"=>"获取失败"));
			}
		break;
		
		default:
			# code...
			break;
	}

?>