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
	

	//评论
	$column     =htmlspecialchars($_POST['column']);
	$arc_id  =htmlspecialchars($_POST['arc_id']);
	$user_id    =htmlspecialchars($_POST['user_id']);


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
			//echo '123';
			$VideoBanner="SELECT * FROM video WHERE isChecked=1 ORDER BY updatetime DESC limit 0,5";

			$query=mysql_query($VideoBanner);

			$i=0;
			$result=array();
			while($row=mysql_fetch_array($query)){

				
				$result[$i] = array('id' => $row["id"] , "title" =>$row["title"] , "descention" =>$row["descention"] , "videoUrl" =>$row["videoUrl"] , "bannerUrl" =>$row["bannerUrl"] , "tag" =>$row["tag"] , "updatetime" =>$row["updatetime"] );
				$i++;
			};
			$a=json_encode($result);
		 echo '{"result":'.$a.'}';
		break;
		case 'conmentAdd':
			//新增评论
			$sql="INSERT INTO comment ( content , c_time ,c_column, user_id , arc_id ) VALUES ( '{$content}','{$tt}','{$column}','{$user_id}','$arc_id')";
			$desc=mysql_query($sql) or die("插入错误:".mysql_error());
			if($desc){
				echo '{"code":"1","desc":"发布成功"}';	
			}else{
				echo '{"code":"0","desc":"发布失败"}';	
			}
		break;
		//评论列表
		case 'conmentList':

			//$act  =htmlspecialchars($_POST['act']);
			//$ids    =htmlspecialchars($_POST['ids']);
			
			//$user_id    =htmlspecialchars($_POST['user_id']);
			//echo $column;
			$z_sql="SELECT * FROM comment  WHERE arc_id=".$arc_id." and c_column=".$column." order by c_time desc";
			 
		    $sql=mysql_query($z_sql) ;
		   // var_dump($sql);
		    $i=0;
			$result=array();

			while($row=mysql_fetch_array($sql)){
				
				$c_username=mysql_fetch_array(mysql_query("SELECT * FROM member WHERE id='".$row["user_id"]."'"));
				
				//$result[$i]="{'id':'".$row["id"]."','content':'".$row["content"]."','times':'".$row["c_time"]."','username':'".$c_username["username"]."','userid':'".$row["user_id"]."'}";
				//var_dump($c_username);
				$result[$i] = array('id' => $row["id"] , "content" =>$row["content"] , "times" =>$row["c_time"] , "username" =>$c_username["nickname"] , "userid" =>$row["user_id"] , "avatar" =>$c_username["avatar"]  );
				$i++;
				
			};
			
			$a=json_encode($result);
			echo '{"result":'.$a.',"counts":'.count($result).'}';
		  
		break;

		//获取自己的评论
		case 'getMyComment':
			
			//echo '123';
			$getMyComment="SELECT * FROM comment WHERE user_id=".$user_id." ORDER BY c_time DESC";

			$query=mysql_query($getMyComment);

			$i=0;
			$result=array();
			while($row=mysql_fetch_array($query)){


				if($row["c_column"]==2){
					$Target=mysql_fetch_array(mysql_query("SELECT * FROM blong_arclist WHERE id='".$row["arc_id"]."'"));
				}else{
					$Target=mysql_fetch_array(mysql_query("SELECT * FROM video WHERE id='".$row["arc_id"]."'"));
				}
				$c_username=mysql_fetch_array(mysql_query("SELECT * FROM member WHERE id='".$row["user_id"]."'"));

				$result[$i] = array('id' => $row["id"], "arc_id" =>$c_username["id"] , "username" =>$c_username["nickname"]  , "title" =>$Target["title"] , "title_id" =>$Target["id"] , "content" =>$row["content"] , "times" =>$row["c_time"]  );

				$i++;
			};
			$a=json_encode($result);

			echo '{"result":'.$a.'}';

		break;
		case 'list'://文章列表
			if($newtype){
				$setNewType="and type_id='".$newtype."'";
			}
			if($title){
				$newTitle="and title like '%$title%'";
			};
			if($username){
				$newUsername="and username='".$username."'";
			};

			if($newtype=='' && $title=='' && $username==''){
				$setsql="";
			}else{
				$setsql=" WHERE 1 ".$setNewType." ".$newTitle." ".$newUsername." ";
			};
			//echo $setsql;
			//拼接条件查询字符串
			$z_sql="SELECT * FROM blong_arclist ".$setsql." order by datatime desc  limit ".($nowpage - 1) * $PageSize.",".$PageSize;

			$query=mysql_query($z_sql);

			$total = mysql_fetch_array(mysql_query("select count(*) from blong_arclist ".$setsql.""));//查询数据库中一共有多少条数据  
			$Total = $total[0]; 

			$i=0;
			$result=array();
			while($row=mysql_fetch_array($query)){

				// $firstIndex=strpos($row["article"],'src="');
				// $lastIndex=strpos($row["article"],'title');
				// //echo ("/".$firstIndex.'---'.$lastIndex);
				// $substrStr=substr($row["article"],$firstIndex,$lastIndex);


				/*
				$temp=mt_rand(1,4);
				$pattern="/<[img|IMG].*?src=[\'|\"](.*?(?:[\.gif|\.jpg|\.png]))[\'|\"].*?[\/]?>/";
				$content = $article->Content; //文章内容
				preg_match_all($pattern,$content,$matchContent);
				if(isset($matchContent[1][0])){
				  $temp=$matchContent[1][0];
				}else{
				  $temp="images/random/$temp.jpg"; //需要在相应位置放置4张jpg的文件，名称为1，2，3，4
				}*/
				
				$pattern="/<[img|IMG].*?src=[\'|\"](.*?(?:[\.gif|\.jpg|\.png]))[\'|\"].*?[\/]?>/";
				$content = $row["article"]; //文章内容
				preg_match_all($pattern,$content,$matchContent);
				if(isset($matchContent[1][0])){
				  $temp=$matchContent[1][0];
				}

				
				/*/preg_match('/<img .+src=\"?(.+\.(jpg|gif|bmp|bnp|png))\"?>/i',$row["article"],$match);*/
				//var_dump($matchContent);

				//$result[$i]="{id':'".$row["id"]."','title':'".$row["title"]."','descption':'".$row["descption"]."','banner':'".$row["bannerimg"]."','datatime':'".$row["datatime"]."','keywords':'".$row["keywords"]."','page_view':'".$row["page_view"]."','username':'".$row["username"]."','isrecommend':'".$row["isrecommend"]."','newtype':'".$row["type_id"]."','userid':'".$row["userid"]."','status':'".$row["status"]."','thumb':'".$match[1]."'}";
				
				//$raw_success = array('code' => 1, 'msg' => '验证码正确');
				$result[$i] = array('id' => $row["id"] , "title" =>$row["title"] , "page_view" =>$row["page_view"] , "newtype" =>$row["type_id"] , "thumb" =>$temp , "datatime" =>$row["datatime"] , "keywords" =>$row["keywords"] );
				$i++;
			};
			$a=json_encode($result);
			echo '{"result":'.$a.',"Total":'.$Total.'}';
		break;
		case 'DeleteOneArclist': //删除一篇文章
			deletesfn('blong_arclist',$id);
		break;
		
		
		case 'DeleteOneArclist': //删除一篇文章
			deletesfn('blong_arclist',$id);
		break;

		case 'userDeleteNotUseArticle': //删除一篇文章
			$userid      =$_POST['userid'];
			$arcid      =$_POST['arcid'];
			//if(){}
			$checkSql=mysql_query("SELECT * FROM blong_arclist  WHERE id = ".$arcid."");
			$row=mysql_fetch_array($checkSql);
			if($row){
				if($row['userid']==$userid){
					$deletes=mysql_query("DELETE FROM blong_arclist WHERE id = ".$arcid."") or die('删除失败'.mysql_error());

					if($deletes){
						echo_status(array('msg'=>'删除成功','code'=>'0'));
						//扣除积分80%
					}else{
						echo_status(array('msg'=>'删除失败','code'=>'1'));	
					};
				};
			}else{
				echo_status(array('msg'=>'删除失败,请联系客服;','code'=>'1'));
			}
		break;

		case 'userDeleteArticle':
			$userid      =$_POST['userid'];
			$arcid      =$_POST['arcid']; //当前第几页
			//if(){}
			$checkSql=mysql_query("SELECT * FROM blong_arclist  WHERE id = ".$arcid."");
			$row=mysql_fetch_array($checkSql);
			if($row){
				if($row['userid']==$userid){
					$deletes=mysql_query("DELETE FROM blong_arclist WHERE id = ".$arcid."") or die('删除失败'.mysql_error());

					if($deletes){
						mysql_query("UPDATE member SET integral=integral-40 WHERE id=".$userid);
						echo_status(array('msg'=>'删除成功','code'=>'0'));
						//扣除积分80%
					}else{
						echo_status(array('msg'=>'删除失败','code'=>'1'));	
					};
				};
			}else{
				echo_status(array('msg'=>'删除失败,请联系客服;','code'=>'1'));
			}
		break;

		case 'GetOneArticleInfo':
			


			$GetOneArticleInfo="SELECT * FROM blong_arclist WHERE id=".$Sid;
			$query=mysql_query($GetOneArticleInfo) or die("获取失败:".mysql_error());

			if($query){
				while ($row=mysql_fetch_array($query)) {
					echo_status(array("respondCode"=>"0","respondMsg"=>"数据获取成功！","id"=>$row['id'],"title"=>$row['title'],"descption"=>$row['descption'],"article"=>$row['article'],"type_id"=>$row['type_id'],"keywords"=>$row['keywords'],"bannerimg"=>$row['bannerimg'],"isrecommend"=>$row['isrecommend'],"pushtime"=>$row['datatime']));
				}
			}else{
				echo_status(array("respondCode"=>"1","respondMsg"=>"获取失败"));
			}
			break;





		//用户获取自己的文章
		case 'GetOneUserArticleInfo':
			$GetOneArticleInfo="SELECT * FROM blong_arclist WHERE userid=".$userid." and id=".$Sid;
			$query=mysql_query($GetOneArticleInfo) or die("获取失败:".mysql_error());

			$num = 0;
			$num = mysql_num_rows($query);

			if(!$num == 0){
				while ($row=mysql_fetch_array($query)) {
					echo_status(array("respondCode"=>"0","respondMsg"=>"数据获取成功！","id"=>$row['id'],"title"=>$row['title'],"descption"=>$row['descption'],"article"=>$row['article'],"type_id"=>$row['type_id'],"keywords"=>$row['keywords'],"bannerimg"=>$row['bannerimg'],"isrecommend"=>$row['isrecommend']));
				}
			}else{
				echo_status(array("respondCode"=>"1","respondMsg"=>"获取失败"));
			}
			
		break;
			//echo '{"result":'.$query.',"counts":'.count($result).'}';
		case 'AddOneArticle': //添加一篇文章 
			$INSERT="INSERT INTO blong_arclist ( title , descption , article  , datatime , type_id , username , userid , keywords , page_view , bannerimg,isrecommend,status) VALUES ( '{$title}','{$desc}','{$content}','{$tt}' , '{$newtype}', '{$username}', '{$userid}' ,'{$keywords}' , '{$pageview}','{$newbanner}','{$isrecommend}','{$status}')";

			$AddOneArticle=mysql_query($INSERT) or die('插入失败:'.mysql_error());
			if($AddOneArticle){
				echo_status(array('respondCode'=>'0','respondMsg'=>'发布成功'));	
			}else{
				echo_status(array('respondCode'=>'1','respondMsg'=>'发布失败'));	
			}
		break;
		case 'UpdataOneArticle': //更新一篇文章
			//echo $content;
			$UpdataOneArticle="UPDATE blong_arclist SET title='".$title."',descption='".$desc."',article='".$content."',keywords='".$keywords."',bannerimg='".$newbanner."',isrecommend='".$isrecommend."',type_id='".$newtype."'  WHERE id=".$Sid;
			$UpdataONE=mysql_query($UpdataOneArticle) or die('更新失败:'.mysql_error());
			if($UpdataONE){
				echo_status(array('respondCode'=>'0','respondMsg'=>'发布成功'));	
			}else{
				echo_status(array('respondCode'=>'1','respondMsg'=>'发布失败'));	
			}
		break;
		case 'UpdataOneUserArticle': //更新一篇文章
			//echo $content;
			$UpdataOneArticle="UPDATE blong_arclist SET title='".$title."',descption='".$desc."',article='".$content."',keywords='".$keywords."',type_id='".$newtype."',status='".$status."'  WHERE id=".$Sid;

			$UpdataONE=mysql_query($UpdataOneArticle) or die('更新失败:'.mysql_error());
			if($UpdataONE){
				echo_status(array('respondCode'=>'0','respondMsg'=>'更新成功'));	
			}else{
				echo_status(array('respondCode'=>'1','respondMsg'=>'更新失败'));	
			}
		break;
		case 'Through': //通过则给发布文章的用户增加50积分 
			$userid=$_POST['userid'];
			$Updatastatus="UPDATE blong_arclist SET status='1' WHERE id=".$Sid;
			mysql_query("UPDATE member SET integral = integral+50 WHERE id = '".$userid."' ");

			$UpdataONE=mysql_query($Updatastatus) or die('插入失败:'.mysql_error());
			if($UpdataONE){
				echo_status(array('respondCode'=>'0','respondMsg'=>'更新成功'));	
			}else{
				echo_status(array('respondCode'=>'1','respondMsg'=>'更新失败'));	
			}
			break;
		case 'refuse': //拒绝 状态码为3
			$userid=$_POST['userid'];
			
			$Updatastatus="UPDATE blong_arclist SET status='3' WHERE id=".$Sid;

			$UpdataONE=mysql_query($Updatastatus) or die('插入失败:'.mysql_error());
			if($UpdataONE){
				echo_status(array('respondCode'=>'0','respondMsg'=>'更新成功'));	
			}else{
				echo_status(array('respondCode'=>'1','respondMsg'=>'更新失败'));	
			}
			break;
		//前台新闻接口
		case 'getSelectNewsList':
			if($newtype){
				$setNewType="and type_id='".$newtype."'";
			}

			if($newtype==''){
				$setsql="";
			}else{
				$setsql=" WHERE 1 ".$setNewType." ";
			};
			//拼接条件查询字符串
			$z_sql="SELECT * FROM blong_arclist ".$setsql." order by datatime desc  limit ".($nowpage - 1) * $PageSize.",".$PageSize;

			$query=mysql_query($z_sql);

			$total = mysql_fetch_array(mysql_query("select count(*) from blong_arclist ".$setsql.""));//查询数据库中一共有多少条数据  
			$Total = $total[0]; 

			$i=0;
			$result=array();
			while($row=mysql_fetch_array($query)){
				$result[$i]="{'id':'".$row["id"]."','title':'".$row["title"]."','descption':'".$row["descption"]."','banner':'".$row["bannerimg"]."','datatime':'".$row["datatime"]."','keywords':'".$row["keywords"]."','page_view':'".$row["page_view"]."','isrecommend':'".$row["isrecommend"]."','newtype':'".$row["type_id"]."'}";
				$i++;
			};
			$a=json_encode($result);
			echo '{"result":'.$a.',"Total":'.$Total.'}';
			break;
	};
?>