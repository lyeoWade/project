<?php
    include "phpdata/datapage/com.php";
    include "member_com.php";
?>
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<link href="css/reg.css" type="text/css" rel="stylesheet" />
<link href="css/reset.css" type="text/css" rel="stylesheet" />
<title>个人中心-极限数据</title>
<meta name="keywords" content="极限数据网,NBA数据,足球数据,西甲,中超,意甲,德甲,詹姆斯,科比,韦德,比赛前瞻，实时伤病信息，科比，詹姆斯" />
<meta name="description" content="极限数据网，分享NBA各方面数据，足球数据，NBA实时伤病信息，CBA实时伤病，英超实时伤病。竞彩指南中心,NBA伤病指南,极数据给你最精准的数据分析" />
<script src="js/jquery.min.js"></script>
<script src="js/com.js"></script>
<link rel="bookmark"  type="image/x-icon"  href="favicon.ico"/>
<link rel="shortcut icon" href="favicon.ico">

<link rel="stylesheet" type="text/css" href="css/coms.css">

<link rel="stylesheet" type="text/css" href="css/centercom.css">
<link rel="stylesheet" type="text/css" href="css/usercenter.css">
<link rel="stylesheet" href="css/font-awesome.min.css">
</head>
<body pageid="<?php echo $_GET['id'];?>">

<canvas style='position:fixed; left:0; top:0'></canvas>

<?php include "userhead.php";?>
<div class="h30"></div>
<div class="h30"></div>
<div class="h30"></div>

<div id="user-info">
    
</div>
<!-- 个人中心 -->
<div class="userCenter clearfix" style="position:relative;">
        <div class="user_content" id="userWarp">
            <!-- 个人中心
                    ===========
                    说明：用户从外面- ->个人中心进来  展示 (默认显示)

                    左侧栏目点击之后加载数据之后显示 

                    =========
             -->
            <div class="user-center">
                <div class="user-t-center clearfix">
                    <?php include 'member_head.php'; ?>

                    <div class="user-warp clearfix">
                        <div class="user_data fl">
                            <div class="user_pic">
                                <h1>个人中心</h1>
                                <ul class="user_data_list" id="user_data_list">
                                    <li><a href="my_wealth.html" class="xg-u" >我的财富</a></li>
                                    <li><a href="my_integral.html" class="xg-u" >我的积分</a></li>
                                    <li><a href="my_collection.html" class="xg-u " >我的收藏</a></li>
                                    <li><a href="my_article.html" class="xg-u" >文章管理</a></li>
                                    <li><a href="my_guess.html" class="xg-u" >篮球竞猜</a></li>
                                    <li class="active"><a href="my_data.html" class="xg-u" >资料中心</a></li>
                                </ul>
                            </div>
                        </div>
                        <div class="user-con fl">
                            
                            <div class="user-head">
                                <h2 class="fl">我的资料</h2>
                            </div>

                           <div class="push-content">
                                <ul>
                                    <li class="clearfix">
                                        <label>用&nbsp;户&nbsp;名&nbsp;:</label>
                                        <input type="text" class="form-control" placeholder="标题" id="titles"/>
                                    </li>
                                    <li class="clearfix">
                                        <label>手机号码:</label>
                                        <input type="text" class="form-control" placeholder="手机号码" id="tel"/>
                                    </li>
                                    
                                    <li class="clearfix">
                                        <label>QQ号码&nbsp;:</label>
                                        <input type="text" class="form-control" placeholder="QQ号码" id="qq"/>
                                    </li>
                                    <li class="clearfix">
                                        <label>邮&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;箱&nbsp;&nbsp;:</label>
                                        <input type="text" class="form-control" placeholder="邮箱" id="email"/>
                                    </li>
                                    <li class="clearfix">
                                        <label>推广链接:</label>
                                        <input type="text" disabled="" class="form-control" placeholder="推广链接" id="yoursId"/>
                                    </li>
                                    <li class="clearfix">
                                        <label style="opacity:0; filter:alpha(opacity=0);">极限数据</label>
                                        <button type="button" id="push_btn">修&nbsp;&nbsp;改</button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
</div>

<!-- js引用包 --> 
<script src='js/jquery.js'></script> 
<!-- 
<script type="text/javascript" src="js/user_bg.js"></script>
 -->
<div class="h30"></div>
<div class="h30"></div>
<div class="h30"></div>
<div class="h30"></div>

<div class="" style="height:40px; width:100%;"></div>
<div class="foot-warp" style="position:relative;">
    <?php  include 'foot.php';?>
</div>
<script src="js/comjs.js"></script>
<script type="text/javascript" src="js/my_data.js"></script>
</body>
</html>
