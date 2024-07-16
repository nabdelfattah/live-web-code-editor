const htmlCodeEl = document.getElementById("htmlCode")
const cssCodeEl = document.getElementById("cssCode")
const jsCodeEl = document.getElementById("jsCode")
const htmlEl = document.getElementById("html")
const cssEl = document.getElementById("css")
const jsEl = document.getElementById("js")
const resultWrapperEl = document.getElementById("result")
const frame = document.getElementById("preview-window").contentWindow.document;

function wtireToFrame(htmlCode, cssCode, jsCode) {
    frame.open();
    frame.write(htmlCode+cssCode+jsCode);
    frame.close();
}

function showPreview(){
    const htmlCode = htmlCodeEl.value;
    const cssCode = cssCodeEl.value;
    const jsCode = jsCodeEl.value;
    wtireToFrame(htmlCode, cssCode, jsCode)
    localStorage.setItem('code', JSON.stringify({htmlCode, cssCode, jsCode}))
}

function show(x){
    htmlEl.style.display="none";
    cssEl.style.display="none";
    jsEl.style.display="none";
    resultWrapperEl.style.display="none";
    document.getElementById(x).style.display="block";
}

function show_all(){
    if(window.innerWidth>=992)
    {
        htmlEl.style.display="block";
        cssEl.style.display="block";
        jsEl.style.display="block";
        resultWrapperEl.style.display="block";
    }
    if(window.innerWidth<992 && htmlEl.style.display=="block")
    {
        cssEl.style.display="none";
        jsEl.style.display="none";
        resultWrapperEl.style.display="none";
    }
}

function retrieveCode () {
    const code = localStorage.getItem('code')
    if(!code || code == "") {
        htmlCodeEl.value="<div>\n\n</div>";
        cssCodeEl.value="<style>\n\n</style>";
        jsCodeEl.value="<script>\n\n</script>";
    } else {
        const {htmlCode, cssCode, jsCode} = JSON.parse(code)
        htmlCodeEl.value = htmlCode
        cssCodeEl.value = cssCode
        jsCodeEl.value = jsCode
        wtireToFrame(htmlCode, cssCode, jsCode)
    }
}

document.addEventListener("DOMContentLoaded", retrieveCode);
document.body.addEventListener('resize', show_all)