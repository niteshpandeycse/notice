document.addEventListener("DOMContentLoaded", function(event) {
   readCount = 0;  
  //  var notificationCount ;   
    window.changeText2 = function() {      
      renderData();
    }
    window.renderData = function(){         
            document.getElementById("themeopt").style.display='inline-block';
            document.getElementById("badge").style.display='inline-block';
            const myElemHeader = document.getElementById('navheader');
            myElemHeader.classList.remove('themered', 'themeblack', 'themeblue', 'themepink');
            myElemHeader.classList.add('themedef');                
            var result = localStorage.getItem("result");   
            if (result === null || result == '[]') {            
                  document.getElementById("spinner").style.display='block';
                  callAPI();
            }
            else {
                  var result = JSON.parse(localStorage.getItem('result'));
                  addDataToHTML(result);         
                  showDropdown();
            } 
    }
            var headApp = document.getElementById('navheader');
            headApp.insertAdjacentHTML('afterend', '<div id="themeopt"  class="dropdown">'+
            '<div class="dropbtn icons btn-right showLeft" onclick="changeText2()">'+
            '<li>'+
            '<img src="img/notification.png" style="width: 30px;">'+
            '<span id="badge" class="badge"></span>'+
            '</li>'+           
            '</div>'+            
            '<div id="myDropdown" class="dropdown-content">'+       
            '</div>'+
            '</div> ');  

            window.callSuccessMethod = function(data) {    
                      result = data.items;
                      localStorage.setItem('result', JSON.stringify(result));  
                      notificationCount = result.length;
                      addDataToHTML(result);              
                      document.getElementById("spinner").style.display='none';
            }
});
        window.addDataToHTML = function(result){  
            var result = JSON.parse(localStorage.getItem('result'));  
            var d1 = document.getElementById('myDropdown');
                          d1.innerHTML ='<div id="maincontent" class="notifytxtheader">'+    
                          '<span class="heading">Notifications</span>'+      
                          '</div>';

            notificationCount = result.length;       
            Object.keys(result).forEach(function(key) {   
              var d2 = document.getElementById('maincontent'); 
              d2.insertAdjacentHTML('afterend', '<div class="feedContent status clkClose" id="'+key+'" data-status="'+result[key].ReadStatus+'">'+
              '<div class="clkClose">'+
              '<div class="clkClose"  style="width:100%; display:inline-block;"><div id="'+key+'" class="clkClose" onclick="markStatus(this.id)"><a class="title changetheme1 clkClose" id="titletext"  href="'+result[key].link+'" style="text-decoration: none; float:left; width:90%;">'+result[key].title+'</a></div>'+
              '<img onclick="deletebtn(this.id)" class="dltbtn clkClose" src="https://cdn2.iconfinder.com/data/icons/arrows-and-universal-actions-icon-set/256/cancel-512.png" id="'+key+'" height="15px" width="15px" />'+
              '</div>'+
              '<p class="clkClose">'+result[key].description+'</p>'+
              '<p class="clkClose" style="color: #a59e9e; font-size: x-small;"> Updated : '+result[key].pubDate+'</p>'+                        
              '</div>'+
                '</div>');
       
                checkNotificationCount(key);
          });	           
            
  }




