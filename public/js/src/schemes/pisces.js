$(document).ready(function(){var o=$(".sidebar-inner");function i(){var e,i,t,a=$(".header-inner").height()+CONFIG.sidebar.offset,f=(e=$(".footer-inner"),i=e.outerHeight(!0)-e.outerHeight(),e.outerHeight(!0)+i);a+($("#sidebar").height()+NexT.utils.getSidebarb2tHeight())<$("#content").height()&&o.affix({offset:{top:a-CONFIG.sidebar.offset,bottom:f}}),t=a,$("#sidebar").css({"margin-top":t}).css({"margin-left":"initial"})}i(),window.matchMedia("(min-width: 991px)").addListener(function(e){e.matches&&($(window).off(".affix"),o.removeData("bs.affix").removeClass("affix affix-top affix-bottom"),i())})});