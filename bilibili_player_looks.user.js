// ==UserScript==
// @name         bilibili player looks
// @namespace    https://space.bilibili.com/4298216/
// @version      1.2.2
// @description  修改哔哩哔哩播放器外观
// @author       konekohineko
// @match        *://*.bilibili.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    //live page
    if(window.location.hostname=="live.bilibili.com" && /^\/\d+/.test(window.location.pathname)){
        document.getElementById('link-navbar-vm').style.position = 'absolute';//fix top bar
        document.getElementById('my-dear-haruna-vm').remove();//hide live pet
        document.getElementsByClassName('bilibili-live-player-video-logo')[0].remove();//hide live logo
        document.getElementById('chat-history-list').style.height='100%';//hide free gifts
        document.getElementById('penury-gift-msg').style.height='0';//hide free gifts
        if(document.getElementsByClassName('checkin-btn')[0]){document.getElementsByClassName('checkin-btn')[0].click();}

        var newCSS = document.createElement('style');
        newCSS.type = "text/css";
        newCSS.innerText = ".title-label,.welcome-msg{display:none;}";
        document.body.append(newCSS);
    };


    //video page
    if(/\/(video|play|blackboard)\//.test(window.location.pathname)){
        setInterval(function(){
            //if page can changed and havn't changed, try change per 1s
            //if(document.getElementById("bilibiliPlayer") && !document.getElementById("switchon")){
            if(document.getElementsByClassName("bilibili-player-video-danmaku-switch").length && !document.getElementById("switchon")){
                main();}},1000);}

    function main(){
        document.getElementsByClassName('bilibili-player-video-top-issue')[0].remove();
        document.getElementsByClassName('bilibili-player-video-top-follow')[0].remove();
        document.getElementsByClassName('bilibili-player-video-state-play')[0].remove();
        //document.getElementsByClassName('bilibili-player-video-control-mask')[0].hidden="true";
        //document.getElementsByClassName('bui-dot')[0].hidden="true";
        document.getElementsByClassName('bilibili-player-video-btn-send')[0].className="bilibili-player-video-btn-send bui bui-button";

        document.getElementsByClassName('bilibili-player')[0].style.boxShadow="0 0 0px";
        var theBar = document.getElementsByClassName('video-toolbar')[0];
        if(theBar){
            theBar.style.marginTop = '0px';
            theBar.style.paddingTop = '12px';
        }else{
            theBar = document.getElementsByClassName('media-wrapper')[0];
        }
        theBar.style.borderTop = '1px solid #e5e9f0';

        document.getElementsByClassName("bilibili-player-video-danmaku-input")[0].onfocus=text_focus;
        document.getElementsByClassName("bilibili-player-video-danmaku-input")[0].onblur=text_blur;
        var oldSwitch=document.getElementsByClassName('bilibili-player-video-danmaku-switch')[0];
        oldSwitch.style.display="none";

        var newSwitch=document.createElement("div");
        newSwitch.className="bilibili-player-video-danmaku-setting";
        newSwitch.onclick=new_switch;
        newSwitch.innerHTML='<span class="bp-svgicon" id="switchon" style="display: inline;" title="关闭弹幕"><svg xmlns="http://www.w3.org/2000/svg" viewbox="0 0 22 22"><path d="M20 6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2H18a2 2 0 0 0 2-2V6zM7 13H5a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2zm2-4H5a1 1 0 0 1 0-2h4a1 1 0 0 1 0 2z"></path></svg></span><span class="bp-svgicon" id="switchoff" style="display: none;" title="开启弹幕"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 22"><path d="M16.5 8c1.289 0 2.49.375 3.5 1.022V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h7.022A6.5 6.5 0 0 1 16.5 8zM7 13H5a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2zm2-4H5a1 1 0 0 1 0-2h4a1 1 0 0 1 0 2z"></path><path d="M17 13l1.2-1.2c2-2 4 0 2 2l-1.2 1.2l1.2 1.2c2 2 0 4-2 2l-1.2-1.2l-1.2 1.2c-2 2-4 0-2-2l1.2-1.2l-1.2-1.2c-2-2 0-4 2-2l1.2 1.2z"></path></svg></span>';
        if(document.getElementsByClassName('bilibili-player-video-danmaku-switch')[0].style.display=="none"){
            oldSwitch.before(newSwitch);}

        function new_switch(){
            document.getElementsByClassName("bilibili-player-video-danmaku-switch")[0].children[0].click();
            if(document.getElementById("switchon").style.display!="none"){
                document.getElementById("switchon").style.display="none";
                document.getElementById("switchoff").style.display="inline";}
            else{
                document.getElementById("switchon").style.display="inline";
                document.getElementById("switchoff").style.display="none";
            }
        }

        function text_focus(){
            document.getElementsByClassName('bilibili-player-video-btn-send')[0].className="bilibili-player-video-btn-send bui bui-button bui-button-blue";
            //document.getElementsByClassName('bilibili-player-video-hint')[0].style.display="none";
        }
        function text_blur(){
            if(document.getElementsByClassName("bilibili-player-video-danmaku-input")[0].value==""){
                document.getElementsByClassName('bilibili-player-video-btn-send')[0].className="bilibili-player-video-btn-send  bui bui-button";
                //document.getElementsByClassName('bilibili-player-video-hint')[0].style.display="block";
            }
        }
    }
})();
