function getComponentsOffset(){for(var e=document.querySelectorAll(".component"),t=[],o=0;o<e.length;o++)t.push(e[o].offsetTop);return t}function highlightMenuItems(){for(var e=getComponentsOffset(),t=document.querySelectorAll("#mainNav li"),o=e.length;o>1;o--)if(pxFromTop>=e[o])return document.getElementById(t[o].getAttribute("id")).className="active",0}window.onload=function(){document.addEventListener("scroll",function(){var e=window.pageYOffset||(document.documentElement||document.body.parentNode||document.body).scrollTop;e>58&&document.querySelector("body").setAttribute("class","active")})};