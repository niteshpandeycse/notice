var error_Msg = "It is already marked....!"
url ='https://api.rss2json.com/v1/api.json?rss_url=http://feeds.bbci.co.uk/news/rss.xml;'

document.addEventListener("DOMContentLoaded", function(event) { 
  // To check the local Storage space and delete values
  localStorageSpace();
  window.callAPI = function() {   
    console.log('corefile enter');  
    var Ajax = {
      xhr : null,
      request : function (url,method, data,success,failure){
          if (!this.xhr){
              this.xhr = window.ActiveX ? new ActiveXObject("Microsoft.XMLHTTP"): new XMLHttpRequest();
          }
          var self = this.xhr;  
          self.onreadystatechange = function () {
              if (self.readyState === 4 && self.status === 200){
                  // the request is complete, parse data and call callback
                  var response = JSON.parse(self.responseText);
                  success(response);
              }else if (self.readyState === 4) { // something went wrong but complete
                  failure();
              }
          };
          this.xhr.open(method,url,true);
          if (method === "POST"){
              this.xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
              this.xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
              this.xhr.send(data);
          }else {
                  this.xhr.send();
          }
      },
  };
    Ajax.request(url,"GET",null,function(data){
      callSuccessMethod(data); 
         
    },function(){
      console.log("failed");
    },);  
  }
});


var localStorageSpace = function(){
  var data = '';  
  for(var key in window.localStorage){
      if(window.localStorage.hasOwnProperty(key)){
          data += window.localStorage[key];
          console.log( key + " = " + ((window.localStorage[key].length * 16)/(8 * 1024)).toFixed(2) + ' KB' );
      }
  }
  var usedSpace = ((data.length * 16)/(8 * 1024)).toFixed(2);
  var remainingSpace = (5120 - ((data.length * 16)/(8 * 1024)).toFixed(2));
  console.log(usedSpace);
  console.log(window.sessionStorage);
  if(remainingSpace == 0){
    localStorage.clear();
  }
};


function checkNotificationCount(key){      
  var result = JSON.parse(localStorage.getItem('result'));     
  if(result[key].ReadStatus=="read"){                       
    readCount++;
    notifyCount = notificationCount-readCount;
    document.getElementById("badge").innerHTML= notifyCount; 
    document.getElementById("themeopt").style.display='inline-block';
  }
  else{
    document.getElementById("badge").innerHTML=notificationCount; 
  }
}

function deletebtn(clicked_id){
var result = JSON.parse(localStorage.getItem('result'));
 result.splice(clicked_id,1);
 localStorage.setItem('result', JSON.stringify(result));
 document.getElementById(clicked_id).remove();
 readCount =0; 
 renderData();
}

function markStatus(key){
var result = JSON.parse(localStorage.getItem('result'));  
if(result[key].ReadStatus){    
  alert(error_Msg);
  return;
}
else{
  result[key].ReadStatus = 'read';
  localStorage.setItem('result', JSON.stringify(result));
  readCount =0;
  addDataToHTML();
} 
}
              function showDropdown() {
                  document.getElementById("myDropdown").classList.toggle("show");
              }
              window.onclick = function(event) {                 
                  if (!event.target.matches('.dropbtn')) {                      
                      var dropdowns = document.getElementsByClassName("dropdown-content");
                      var i;
                      for (i = 0; i < dropdowns.length; i++) {
                          var openDropdown = dropdowns[i];
                          if (openDropdown.classList.contains('show')) {
                              openDropdown.classList.remove('show');
                          }
                      }
                  }
                  if (event.target.matches('.clkClose')) {                                       
                    var dropdowns = document.getElementsByClassName("dropdown-content");
                    openDropdown.classList.add('show');                      
                }                                     
              }
