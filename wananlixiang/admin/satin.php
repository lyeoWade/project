<?php
	ini_set("display_errors","On");  
	error_reporting(E_ALL); 
	ini_set("error_reporting","E_ALL & ~E_NOTICE");
	header('Cache-control:private,must-revalidate');
	header("Content-type: text/html; charset=utf-8"); 

	include "com.php";
	$type         = _get('type');
	//echo $type;
	$id           = _get('id');
	$title        =htmlspecialchars(_get('title'));
	$desc = str_replace("\r\n", "", _get('description')); 
	$isrecommend  =htmlspecialchars(_get('isrecommend'));
	$newbanner    =htmlspecialchars(_get('newbanner'));
	$keywords     =htmlspecialchars(_get('keywords'));
	$content      =urlencode(_get('content'));

	$plpval       =htmlspecialchars(str_replace("\r\n", "", _get('plpval'))); 
	$picture      =_get('picurl');
	$satintype    =_get('satintype');
	$username     =htmlspecialchars(_get('username'));
	$satintype      =_get('satintype');
	$nowpage      =_get('nowpage'); //当前第几页
	$PageSize     =_get('PageSize'); //每一页多少条
	date_default_timezone_set('Asia/Shanghai');
	$Sid=_get('id');
	$satinid=_get('satinid');
	$commentid=_get('commentid');
	
	$userid=_get('userid');
	$commenttypeid=_get('commenttypeid');
	$targetid=_get('targetid');
	$ConmentTypeIdForZan=_get('typeZanid');
	$ConmentTypeIdForCai=_get('typeZanid');

	$ManagerType=_get('ManagerType');
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
		case 'pushOneSatin': //添加一篇文章 
			$INSERT="INSERT INTO satin ( userid , content , picture  , satintype , zan , cai , shoucang , pushtime , comment ) VALUES ( '{$userid}','{$content}','{$picture}','{$satintype}' , '0', '0', '0' ,'{$tt}' , '0')";

			$AddOneArticle=mysql_query($INSERT) or die('插入失败---:'.mysql_error());
			if($AddOneArticle){
				echo_status(array('respondCode'=>'0','respondMsg'=>'发布成功'));	
			}else{
				echo_status(array('respondCode'=>'1','respondMsg'=>'发布失败'));	
			}
		break;
		
		case 'pushWorld': //添加图集 	
			$musicurl=$_POST['musicurl'];
			$pass=$_POST['pass'];
			$ttime=$_POST['ttime'];
			$targetAddress=$_POST['targetAddress'];
			$zero=0;
			//echo $targetAddress;
			$INSERT="INSERT INTO w_world ( title , targetAddress ,userid, pic , ttime , scNum , zan , see , pushtime , musicurl ,pass  ) VALUES ( '{$title}','{$targetAddress}','{$userid}','{$picture}' ,'{$ttime}','{$zero}','{$zero}','{$zero}','{$tt}','{$musicurl}' ,'{$pass}' )";

			$AddOneArticle=mysql_query($INSERT) or die('插入失败2--:'.mysql_error());

			if($AddOneArticle){
				echo_status(array('respondCode'=>'0','respondMsg'=>'发布成功'));	
			}else{
				echo_status(array('respondCode'=>'1','respondMsg'=>'发布失败'));	
			}
		break;
		case 'GetPicList':
			$tag=_get('Tag');
			if($tag==undefined){
				$t='';
			}else{
				$t="WHERE targetAddress like '%$tag%'";
			};
			$z_sql="SELECT * FROM w_world ".$t." order by pushtime desc limit ".($nowpage - 1) * $PageSize.",".$PageSize;
			$query=mysql_query($z_sql);
			$total = mysql_fetch_array(mysql_query("select count(*) from w_world ".$t.""));
			$Total = $total[0]; 
			$i=0;
			$result=array();
			while($row=mysql_fetch_array($query)){
				$userSql=mysql_fetch_array(mysql_query("SELECT * FROM member WHERE id=".$row['userid']));
				$result[$i]="{'id':'".$row["id"]."','targetAddress':'".$row["targetAddress"]."','title':'".urldecode($row["title"])."','zan':'".$row["zan"]."','ttime':'".$row['ttime']."','userid':'".$row['userid']."','userpic':'".$userSql['pic']."','username':'".$userSql['username']."','pic':'".$row["pic"]."','pushtime':'".$row["pushtime"]."'}";
				$i++;
			};
			$a=json_encode($result);
			echo '{"result":'.$a.',"Total":'.$Total.'}';
		break;
		//获取图片集详情
		/*typeid  1
			1->段子
			2->陪你入睡
			3->图片
		  targetid->被评论目标id
		  cuserid->评论人id
		*/
		case 'GetPicDetail':
			$w_world="SELECT * FROM w_world WHERE id=".$Sid;
			$query=mysql_query($w_world) or die("获取失败:".mysql_error());
			if($query){
				while ($row=mysql_fetch_array($query)) {
					//获取用户信息
					$userSql=mysql_fetch_array(mysql_query("SELECT * FROM member WHERE id=".$row['userid']));
					//获取评论条数
					$rowcomment=mysql_fetch_array(mysql_query("select count(*) from comment WHERE typeid=3 and targetid='".$row["id"]."'"));

					echo_status(array("respondCode"=>"0","respondMsg"=>"数据获取成功！","id"=>$row['id'],"title"=>$row['title'],"targetAddress"=>$row['targetAddress'],"pic"=>urldecode($row['pic']),"userid"=>$row['userid'],"username"=>$userSql['username'],"ttime"=>$row['ttime'],"zan"=>$row['zan'],"see"=>$row['see'],"comment"=>$rowcomment[0],"collect"=>$row['collect'],"musicurl"=>$row['musicurl'],"pass"=>$row['pass'],"pushtime"=>$row['pushtime']));
				}
			}else{
				echo_status(array("respondCode"=>"1","respondMsg"=>"获取失败"));
			}
		break;

		//收藏
		case 'Sc':
			$arcid=$_POST['arcid'];
			$typeid=$_POST['typeid'];
			$authorId=$_POST['authorId'];
			$repeat=mysql_query("SELECT * FROM collection WHERE arcid ='".$arcid."' AND typeid ='".$typeid."'  AND userid='".$userid."' ");
			$row=mysql_fetch_array($repeat);//依次调用 mysql_fetch_row() 将返回结果集中的下一行，如果没有更多行则返回 FALSE。
		
			if($row){ //找到了 已经注册了
				echo_status(array('respondCode'=>'1','respondMsg'=>'你已经收藏过了哟'));	
			}else{
				$INSERT="INSERT INTO collection (authorId, userid , arcid , typeid  , createTime) VALUES ('{$authorId}', '{$userid}','{$arcid}','{$typeid}','{$tt}')";
				$Sc=mysql_query($INSERT) or die('插入失败:'.mysql_error());
				if($Sc){
					echo_status(array('respondCode'=>'0','respondMsg'=>'收藏成功,可在个人中心查看！'));	
				}else{
					echo_status(array('respondCode'=>'1','respondMsg'=>'收藏失败'));	
				}
			}
		break;
		//获取自己的收藏列表
		case 'GetMyCollection':
			$z_sql="SELECT * FROM collection WHERE userid=".$userid." order by createTime asc limit ".($nowpage - 1) * $PageSize.",".$PageSize;
			$query=mysql_query($z_sql);

			$total = mysql_fetch_array(mysql_query("select count(*) from collection WHERE userid=".$userid." "));

			$Total = $total[0]; 
			
			$i=0;
			$result=array();
			while($row=mysql_fetch_array($query)){

				switch ($row["typeid"]) {
					case '1':
						$table="satin";
					break;
					case '2':
						$table="wanan";
						break;
					case '3':
						$table="w_world";
						break;
					default:
						# code...
						break;
				}

				$arc=mysql_fetch_array(mysql_query("SELECT * FROM ".$table." WHERE id=".$row['arcid']));
				
				$userInfoData=mysql_fetch_array(mysql_query("SELECT * FROM member WHERE id=".$row['userid']));

				$authorInfoDatas=mysql_fetch_array(mysql_query("SELECT * FROM member WHERE id=".$row['authorId']));
				//echo $arc;
				//var_dump($authorInfoDatas);
				$result[$i]="{'id':'".$row["id"]."','typeid':'".$row["typeid"]."','content':'".urldecode($arc["content"])."','title':'".$arc["title"]."','arcid':'".$row["arcid"]."','username':'".$userInfoData['username']."','authorName':'".$authorInfoDatas['username']."','authorid':'".$authorInfoDatas["id"]."','createTime':'".$row["createTime"]."'}";
				$i++;
			};
			$a=json_encode($result);
			echo '{"result":'.$a.',"Total":'.$Total.'}';
			break;
		
		//获取自己的评论列表
		case 'GetMyComment':
			$z_sql="SELECT * FROM comment WHERE cuserid=".$userid." order by commenttime asc limit ".($nowpage - 1) * $PageSize.",".$PageSize;
			$query=mysql_query($z_sql);

			$total = mysql_fetch_array(mysql_query("select count(*) from comment WHERE 	cuserid=".$userid." "));

			$Total = $total[0]; 
			
			$i=0;
			$result=array();
			while($row=mysql_fetch_array($query)){

				switch ($row["typeid"]) {
					case '1':
						$table="satin";
					break;
					case '2':
						$table="wanan";
						break;
					case '3':
						$table="w_world";
						break;
					default:
						# code...
						break;
				}
				//echo $table;
				//echo $row['targetid'];
				$arc=mysql_fetch_array(mysql_query("SELECT * FROM ".$table." WHERE id=".$row['targetid']));
				//var_dump($arc);
				
				$userInfoData=mysql_fetch_array(mysql_query("SELECT * FROM member WHERE id=".$row['cuserid']));

				$authorInfoDatas=mysql_fetch_array(mysql_query("SELECT * FROM member WHERE id=".$row['authorId']));
				
				//var_dump($row['authorId']);
				$result[$i]="{'id':'".$row["id"]."','typeid':'".$row["typeid"]."','content':'".urldecode($row["content"])."','title':'".$arc["title"]."','commentcontent':'".urldecode($arc["content"])."','arcid':'".$row["targetid"]."','username':'".$userInfoData['username']."','authorName':'".$authorInfoDatas['username']."','authorid':'".$authorInfoDatas["id"]."','commenttime':'".$row["commenttime"]."'}";
				$i++;
			};
			$a=json_encode($result);
			echo '{"result":'.$a.',"Total":'.$Total.'}';
		break;
		case 'Pushplp': //漂流瓶 
			$INSERT="INSERT INTO plp ( userid , content , zan  , pushtime ) VALUES ( '{$userid}','{$plpval}','{$zan}','{$tt}')";

			$AddOnePlp=mysql_query($INSERT) or die('插入失败:'.mysql_error());
			if($AddOnePlp){
				echo_status(array('respondCode'=>'0','respondMsg'=>'发布成功'));	
			}else{
				echo_status(array('respondCode'=>'1','respondMsg'=>'发布失败'));	
			}
		break;
		case 'GetPlpList':
			$z_sql="SELECT * FROM plp order by pushtime asc limit ".($nowpage - 1) * $PageSize.",".$PageSize;
			$query=mysql_query($z_sql);
			$total = mysql_fetch_array(mysql_query("select count(*) from plp"));
			$Total = $total[0]; 
			$i=0;
			$result=array();
			while($row=mysql_fetch_array($query)){

				$userSql=mysql_fetch_array(mysql_query("SELECT * FROM member WHERE id=".$row['userid']));
				$result[$i]="{'id':'".$row["id"]."','content':'".urldecode($row["content"])."','zan':'".$row["zan"]."','username':'".$userSql['username']."','pic':'".$userSql["pic"]."','pushtime':'".$row["pushtime"]."'}";
				$i++;
			};
			$a=json_encode($result);
			echo '{"result":'.$a.',"Total":'.$Total.'}';
		break;
		//获取一条段子
		case 'GetOneSatin':
			$GetOneSatin="SELECT * FROM satin WHERE id=".$satinid;
			$query=mysql_query($GetOneSatin) or die("获取失败:".mysql_error());
			//获取收藏条数
			$scNum=mysql_fetch_array(mysql_query("select count(*) from collection WHERE typeid=1 and arcid='".$satinid."'"));
			if($query){
				while ($row=mysql_fetch_array($query)) {

					$userInfoData=mysql_fetch_array(mysql_query("SELECT * FROM member WHERE id=".$row['userid']));

					echo_status(array("respondCode"=>"0","respondMsg"=>"数据获取成功！","id"=>$row['id'],"username"=>$userInfoData['username'],"userpic"=>$userInfoData["pic"],"userid"=>$row['userid'],"content"=>urldecode($row['content']),"picture"=>$row['picture'],"satintype"=>$row['satintype'],"zan"=>$row['zan'],"cai"=>$row['cai'],"comment"=>$row['comment'],"shoucang"=>$scNum[0],"pushtime"=>$row['pushtime']));
				}
			}else{
				echo_status(array("respondCode"=>"1","respondMsg"=>"获取失败"));
			}
		break;
		//获取段子列表
		case 'GetSatinList':
			$userId=$_POST['userId'];
			if($userId!='undefined'){
				if($satintype){
					$setNewType="and userid='".$userId."' and satintype='".$satintype."'";
				}

				if($satintype==''){
					$setsql="";
				}else{
					$setsql=" WHERE 1 ".$setNewType." ";
				};
			}else{
				if($satintype){
					$setNewType="and satintype='".$satintype."'";
				}

				if($satintype==''){
					$setsql="";
				}else{
					$setsql=" WHERE 1 ".$setNewType." ";
				};
			}
			
			
			//拼接条件查询字符串
			$z_sql="SELECT * FROM satin ".$setsql." order by pushtime desc limit ".($nowpage - 1) * $PageSize.",".$PageSize;
			$query=mysql_query($z_sql);
			$total = mysql_fetch_array(mysql_query("select count(*) from satin ".$setsql.""));//查询数据库中一共有多少条数据  
			$Total = $total[0]; 
			//echo $query;
			$i=0;
			$result=array();
			while($row=mysql_fetch_array($query)){

				//获取平论条数
				$commentNum=mysql_fetch_array(mysql_query("select count(*) from comment WHERE typeid=1 and targetid='".$row["id"]."'"));
				
				$userInfo=mysql_fetch_array(mysql_query("SELECT * FROM member WHERE id='".$row["userid"]."'"));

				//获取收藏条数
				$scNum=mysql_fetch_array(mysql_query("select count(*) from collection WHERE typeid=1 and arcid='".$row["id"]."'"));
				//print_r($scNum);
				//echo $userInfo.'-'.$i.'-'.$row["id"].'////';
				
				$result[$i]="{'id':'".$row["id"]."','zuozhe':'".$userInfo[1]."','userid':'".$userInfo[0]."','userpic':'".$userInfo["pic"]."','content':'".urldecode($row["content"])."','picture':'".$row["picture"]."','zan':'".$row["zan"]."','cai':'".$row["cai"]."','comment':'".$commentNum[0]."','sc':'".$scNum[0]."','pushtime':'".$row["pushtime"]."'}";
				$i++;
			};
			$a=json_encode($result);
			echo '{"result":'.$a.',"Total":'.$Total.'}';
			break;
		case 'pageview':
			// 段子列表赞
			$typeComId=$_POST['typeComId'];
			if($typeComId==1){
			$query=mysql_query("UPDATE wanan SET pageview = pageview+1 WHERE id = '".$id."' ");
			}else if($typeComId==2){
				$query=mysql_query("UPDATE w_world SET see = see+1 WHERE id = '".$id."' ");
			}
			
			//var_dump($query);
			if($query){ 
				 echo_status(array('respondCode'=>'0','respondMsg'=>'新增成功'));
			}else{
				echo_status(array('respondCode'=>'1','respondMsg'=>'新增失败'));
			}
		break;
		case 'satinZan':
			// 段子列表赞
			if($ConmentTypeIdForZan=='undefined'){
				$query=mysql_query("UPDATE satin SET zan = zan+1 WHERE id = '".$satinid."' ");
			}else if($ConmentTypeIdForZan=='arc'){
				$query=mysql_query("UPDATE wanan SET zan = zan+1 WHERE id = '".$satinid."' ");
			}else{
				//echo $ConmentTypeIdForZan.'--'.$satinid;
				$query=mysql_query("UPDATE comment SET zan = zan+1 WHERE typeid='".$ConmentTypeIdForZan."' and id = '".$satinid."' ");
			}
			
			//var_dump($query);
			if($query){ 
				 echo_status(array('respondCode'=>'0','respondMsg'=>'点赞成功'));
			}else{
				echo_status(array('respondCode'=>'1','respondMsg'=>'点赞失败'));
			}
		break;
		case 'satinCai':
			// 段子列表踩
			if($ConmentTypeIdForCai=='undefined'){
				$query=mysql_query("UPDATE satin SET cai = cai+1 WHERE id = '".$satinid."' ");
			}else{
				$query=mysql_query("UPDATE comment SET cai = cai+1 WHERE typeid='".$ConmentTypeIdForCai."' and id = '".$satinid."' ");
			}
			
			if($query){ 
				 echo_status(array('respondCode'=>'0','respondMsg'=>'很给力的一脚！'));
			}else{
				echo_status(array('respondCode'=>'1','respondMsg'=>'脚折了，没踩成功！'));
			}
		break;
		//获取评论列表
		/*typeid  文章，段子，图集类型
			1->段子
			2->文章
			3->图片
		  targetid->具体文章，段子，图集那一篇的id
		  cuserid->评论人id
		*/
		case 'GetCommentList':
			if($commenttypeid==''){
				echo '{"result":"获取失败"}';
			}else{
				$setsql=" WHERE typeid='".$commenttypeid."' and targetid='".$targetid."' ";
			};
			//拼接条件查询字符串
			$z_sql="SELECT * FROM comment ".$setsql." order by commenttime desc limit ".($nowpage - 1) * $PageSize.",".$PageSize;
			$query=mysql_query($z_sql);
			//var_dump($query);
			$total = mysql_fetch_array(mysql_query("select count(*) from comment ".$setsql.""));//查询数据库中一共有多少条数据  
			$Total = $total[0]; 
			$i=0;
			$result=array();
			while($row=mysql_fetch_array($query)){

				$userSql=mysql_fetch_array(mysql_query("SELECT * FROM member WHERE id=".$row['cuserid']));
				$result[$i]="{'id':'".$row["id"]."','targetid':'".$row["targetid"]."','typeid':'".$row["typeid"]."','content':'".$row["content"]."','picture':'".$row["picture"]."','zan':'".$row["zan"]."','cai':'".$row["cai"]."','username':'".$userSql['username']."','pic':'".$userSql["pic"]."','commenttime':'".$row["commenttime"]."'}";
				$i++;
			};
			$a=json_encode($result);
			echo '{"result":'.$a.',"Total":'.$Total.'}';
		break;
		//新增评论
		case 'SatinCommentPush':
			$contents=$_POST['content'];
			$authorId=$_POST['authorId'];
			$INSERT="INSERT INTO comment ( content , targetid , typeid  , cuserid , zan , cai , commenttime ,authorId) VALUES ( '{$contents}','{$targetid}','{$commenttypeid}','{$userid}' , '0', '0', '{$tt}' , '{$authorId}')";

			$AddOneArticle=mysql_query($INSERT) or die('插入失败:'.mysql_error());
			if($AddOneArticle){
				echo_status(array('respondCode'=>'0','respondMsg'=>'评论成功'));	
			}else{
				echo_status(array('respondCode'=>'1','respondMsg'=>'评论失败'));	
			}
		break;
	};

	function _get($str){ 
		//echo $str;
		if(isset($_POST[$str])==1){
			$val=$_POST[$str];
		}
		return $val; 
	} 
?>