"use strict";var _createClass=function(){function a(t,e){for(var r=0;r<e.length;r++){var a=e[r];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(t,a.key,a)}}return function(t,e,r){return e&&a(t.prototype,e),r&&a(t,r),t}}();function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var cloneArray=function(t){return t.map(function(t){return t.slice()})},flattenArray=function(t){return[].concat.apply([],t)},utils={cloneArray:cloneArray,flattenArray:flattenArray},Game=function(){function e(t){_classCallCheck(this,e),this.prevState=[],this.currentState=t,this.getNeighbours=this.getNeighbours.bind(this),this.calculateNext=this.calculateNext.bind(this),this.setCell=this.setCell.bind(this)}return _createClass(e,[{key:"getNeighbours",value:function(t,e){var r=this.prevState[t]||[],a=this.prevState[t-1]||[],n=this.prevState[t+1]||[],o=[[a[e-1],a[e],a[e+1]],[r[e-1],0,r[e+1]],[n[e-1],n[e],n[e+1]]];return utils.flattenArray(o).reduce(function(t,e){return t+ +!!e},0)}},{key:"calculateNext",value:function(){for(var t=[],e=0;e<this.prevState.length;++e){t[e]=[];for(var r=0;r<this.prevState[e].length;++r){var a=this.getNeighbours(e,r);3===a&&0===this.prevState[e][r]?t[e][r]=1:t[e][r]=a<2||3<a?0:this.prevState[e][r]}}return t}},{key:"next",value:function(){this.prevState=utils.cloneArray(this.currentState),this.currentState=this.calculateNext()}},{key:"print",value:function(){console.log(this.currentState)}},{key:"setCell",value:function(t,e,r){this.currentState[t][e]=+r}},{key:"getBoard",value:function(){return this.currentState}}]),e}(),View=function(){function t(){_classCallCheck(this,t),this.board=[],this.size=8}return _createClass(t,[{key:"init",value:function(){for(var t=document.querySelector("#content"),e=0;e<this.size;++e){this.board[e]=[];for(var r=document.createElement("tr"),a=new DocumentFragment,n=0;n<this.size;++n){this.board[e][n]=0;var o=document.createElement("input");o.setAttribute("type","checkbox"),o.setAttribute("data-row",e),o.setAttribute("data-col",n),a.appendChild(o)}r.appendChild(a),t.appendChild(r)}}},{key:"getBoard",value:function(){return this.board}},{key:"setBoard",value:function(a,n){for(var t=function(r){for(var t=function(e){n.find(function(t){return t.dataset.row==r&&t.dataset.col==e}).checked=!!a[r][e]},e=0;e<a[r].length;++e)t(e)},e=0;e<a.length;++e)t(e)}}]),t}(),boardView=new View;boardView.init();var gameBoard=boardView.getBoard(),currentGame=new Game(gameBoard),gameStarted=!1,gameIntervalId=void 0,checkboxes=[].slice.call(document.querySelectorAll("input[type=checkbox]")),startStopButton=document.querySelector("#startstop"),stopGame=function(){gameStarted=!1,startStopButton.innerHTML="Start",gameIntervalId&&clearInterval(gameIntervalId)},onCheckboxChange=function(t){if(gameStarted)stopGame();else{var e=t.target.dataset.row,r=t.target.dataset.col;currentGame.setCell(e,r,!!t.target.checked)}},onNext=function(t){currentGame.next();var e=currentGame.getBoard();boardView.setBoard(e,checkboxes)},onStartStop=function(t){gameStarted?stopGame():(gameStarted=!0,startStopButton.innerHTML="Stop",gameIntervalId=setInterval(onNext,500))};checkboxes.forEach(function(t){return t.addEventListener("change",onCheckboxChange)}),startStopButton.addEventListener("click",onStartStop);