<!DOCTYPE html>
<html lang="en">
<head>
  	<title>Search results</title>
  	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"> 
    <meta name="description" content="Your description">
    <meta name="keywords" content="Your keywords">
    <meta name="author" content="Your name">
      <link rel="icon" href="images/favicon.ico" type="image/x-icon">
    <link rel="shortcut icon" href="images/favicon.ico" type="image/x-icon" />

    <script src="js/jquery-1.7.min.js"></script>
	<script src="search/search.js"></script>
   <script type="text/javascript" src="js/superfish.js"></script>
   <link rel="stylesheet" href="css/style.css" />
<!--[if lt IE 8]>
   <div style=' clear: both; text-align:center; position: relative;'>
     <a href="http://windows.microsoft.com/en-US/internet-explorer/products/ie/home?ocid=ie6_countdown_bannercode">
       <img src="http://storage.ie6countdown.com/assets/100/images/banners/warning_bar_0000_us.jpg" border="0" height="42" width="820" alt="You are using an outdated browser. For a faster, safer browsing experience, upgrade for free today." />
    </a>
  </div>
<![endif]-->
<!--[if lt IE 9]>
	<script src="js/html5.js"></script>
	<link rel="stylesheet" href="css/ie.css"> 
<![endif]-->
</head>
<body>
	<div class="main">
<!--==============================header=================================-->
   	<header>
       <div class="top">
         <div class="nav">
           <ul class="sf-menu">
              <li><a href="#">home</a></li>
              <li><a href="#">reviews</a></li>
              <li><a href="#">news</a></li>
              <li><a href="#">videos</a></li>
              <li><a href="#">blog</a></li>
              <li><a href="#">contacts</a></li>
           </ul>
         </div>
         <div class="login">
             You have not yet registered to our club? &nbsp;&nbsp; &nbsp; <a href="#">Register</a> &nbsp;&nbsp; or &nbsp;&nbsp; <a href="#">Log in</a>
         </div>
         <div class="clear"></div>
       </div>
       <div class="middle">
         <h1><a class="logo" href="index.html">Games</a></h1>
         <a href="#" class="h_banner"></a>
       </div>
	    <nav>
        	<ul class="sf-menu">
            <li class="f_item"><a href="index.html">PC</a></li>
            <li><a href="index-1.html">XBOX 360</a></li>
            <li><a href="#">Wii</a></li>
            <li><a href="#">PS2</a>
               <ul>
                  <li><a href="#">Lorem ipsum </a></li>
                  <li><a href="#">Dolor sit amet</a></li>
                  <li><a href="#">Conse ctetur </a></li>
                  <li><a href="#">Dipisicing </a></li>
                  <li class="bd_none"><a href="#">Eeliteiusmod</a></li>
              </ul>
            </li>
            <li><a href="#">PS3</a></li>
            <li><a href="#">PSP</a></li>
            <li><a href="#">Mobile</a></li>
         </ul>
         <form id="search" action="search.php" method="GET" accept-charset="utf-8">
            <input type="text" name="s" />
            <a onclick="document.getElementById('search').submit()" class="button1">Search</a>
         </form>
         <div class="clear"></div>
        </nav>
    </header>
<!--==============================content================================-->
    <section id="content" class="cont_pad">
    	<div class="container_12">
        	<div class="wrapper">
            <article class="grid_12">
               <div class="box">
                 <h2 class="first">Search result:</h2>
                  <div id="search-results"></div>
					</div>
            </article> 
         </div>
      </div>
    </section>
<!--==============================footer=================================-->
    <footer>
      <div class="menu">
         <a href="#">home</a>
         <a href="#">reviews</a>
         <a href="#">news</a>
         <a href="#">videos</a>
         <a href="#">blog</a>
         <a href="#">contacts</a>
      </div>
      <div class="privacy">
         <a href="index.html"><img src="images/f_logo.png" width="74" height="23" alt="f_logo" /></a>
          &nbsp; &nbsp;<span>© 2012 &nbsp; &nbsp;&nbsp; <a href="index-2.html">Privacy Policy</a></span>
      </div>
    </footer>
</div>
</body>
</html>