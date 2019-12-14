(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{161:function(e,t,a){e.exports=a(320)},166:function(e,t,a){},168:function(e,t,a){},320:function(e,t,a){"use strict";a.r(t);var n=a(0),c=a.n(n),r=a(36),s=a.n(r),i=(a(166),a(167),a(168),a(169),a(32)),o=a(40),l=a(10),m=a(11),p=a(13),u=a(12),h=a(14),f=a(331),d=a(332),v=(a(30),a(43),function(e){function t(){return Object(l.a)(this,t),Object(p.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){return c.a.createElement(n.Fragment,null,c.a.createElement(f.a,{expand:"lg",className:"header-container navbar-dark"},c.a.createElement(d.a.Link,null,c.a.createElement(i.b,{to:"/"},c.a.createElement("img",{className:"logo",src:"logo.png",alt:"D"}),c.a.createElement("span",{className:"heading mr-auto"},"League of Data"))),c.a.createElement(f.a.Toggle,{"aria-controls":"header-navbar"}),c.a.createElement(f.a.Collapse,{id:"header-navbar"},c.a.createElement(d.a.Link,null,c.a.createElement(i.b,{className:"header-item mr-auto",to:"/"},"Best Pairs")),c.a.createElement(d.a.Link,null,c.a.createElement(i.b,{className:"header-item mr-auto",to:"/bestTeams"},"Best Teams")),c.a.createElement(d.a.Link,null,c.a.createElement(i.b,{className:"header-item mr-auto",to:"/about"},"About")))))}}]),t}(n.Component)),b=a(27),g=a(22),E=a.n(g),k=a(29),y=a.n(k),j=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(p.a)(this,Object(u.a)(t).call(this,e))).state={pairs:[]},a}return Object(h.a)(t,e),Object(m.a)(t,[{key:"componentDidMount",value:function(){console.log(this.props)}},{key:"render",value:function(){var e=this.props,t=e.championName,a=e.hyperLink,n=e.imageLink;return c.a.createElement("div",{style:{marginBottom:"15px",marginTop:"15px"}},c.a.createElement(i.b,{to:a},c.a.createElement("div",{className:"champion-icon pl-3 pr-3"},c.a.createElement("img",{alt:t,src:n})),c.a.createElement("div",{className:"champion-name overflow"},c.a.createElement("a",{href:a},t))))}}]),t}(n.Component),O=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(p.a)(this,Object(u.a)(t).call(this,e))).state={champions:[]},a.apiUrl="https://leagueofdata1.herokuapp.com",a}return Object(h.a)(t,e),Object(m.a)(t,[{key:"componentDidMount",value:function(){var e;return E.a.async((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,E.a.awrap(y.a.get("".concat(this.apiUrl,"/champions")));case 3:e=t.sent,console.log(e.data),this.setState({champions:e.data}),t.next=11;break;case 8:t.prev=8,t.t0=t.catch(0),console.log(t.t0);case 11:case"end":return t.stop()}}),null,this,[[0,8]])}},{key:"render",value:function(){var e=this,t=this.state.champions;return""!==this.props.filterText?c.a.createElement("div",{className:"container"},c.a.createElement("div",{className:"row justify-content-center"},t.filter((function(t){return t.name.toLowerCase().includes(e.props.filterText.toLowerCase())})).map((function(e){var t=e.name,a=e.hyperLink,n=e.imageLink,r=e.key;return c.a.createElement("div",{className:"champion-select"},c.a.createElement(j,{key:r,championName:t,hyperLink:a,imageLink:n}))})))):c.a.createElement("div",{className:"container"},c.a.createElement("div",{className:"row justify-content-center"},t.map((function(e){var t=e.name,a=e.hyperLink,n=e.imageLink,r=e.key;return c.a.createElement("div",{className:"champion-select"},c.a.createElement(j,{key:r,championName:t,hyperLink:a,imageLink:n}))}))))}}]),t}(n.Component),x=a(330),N=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(p.a)(this,Object(u.a)(t).call(this,e))).state={value:""},a.handleChange=a.handleChange.bind(Object(b.a)(a)),a}return Object(h.a)(t,e),Object(m.a)(t,[{key:"handleChange",value:function(e){this.setState({value:e.target.value},this.props.getText(e.target.value))}},{key:"render",value:function(){return c.a.createElement("div",{className:"container"},c.a.createElement(x.a,{onChange:this.handleChange,style:{marginBottom:"50px"},size:"huge",placeholder:"Filter...",fluid:!0}))}}]),t}(n.Component),w=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(p.a)(this,Object(u.a)(t).call(this,e))).state={filterText:""},a.getText=a.getText.bind(Object(b.a)(a)),a}return Object(h.a)(t,e),Object(m.a)(t,[{key:"getText",value:function(e){this.setState({filterText:e})}},{key:"render",value:function(){var e=this.props.history;return c.a.createElement("div",{className:"container",style:{maxWidth:"950px"}},c.a.createElement("div",{className:"container prompt",style:{marginBottom:"50px"}},c.a.createElement("h1",null,"CHOOSE YOUR CHAMPION"),c.a.createElement("p",null,"and explore its statistically ideal partners.")),c.a.createElement(N,{getText:this.getText}),c.a.createElement(O,{history:e,filterText:this.state.filterText}))}}]),t}(n.Component),L=a(151),C=a.n(L),T=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(p.a)(this,Object(u.a)(t).call(this,e))).state={champion:[]},a.apiUrl="https://leagueofdata1.herokuapp.com",a.onClick=a.onClick.bind(Object(b.a)(a)),a}return Object(h.a)(t,e),Object(m.a)(t,[{key:"componentDidMount",value:function(){var e;return E.a.async((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,E.a.awrap(y.a.get("".concat(this.apiUrl,"/champion"),{params:{champId:this.props.champId}}));case 3:e=t.sent,this.setState({champion:e.data}),t.next=10;break;case 7:t.prev=7,t.t0=t.catch(0),console.log(t.t0);case 10:case"end":return t.stop()}}),null,this,[[0,7]])}},{key:"onClick",value:function(){console.log(this.state.champion),this.props.history.push({pathname:"/pairs",search:"?champId=".concat(this.props.champId)}),window.location.reload(!1)}},{key:"render",value:function(){var e=this.props.data,t=this.state.champion,a=t.name,n=t.hyperLink,r=t.imageLink;return c.a.createElement("div",{className:"champion-info",onClick:this.onClick},c.a.createElement("div",{className:"champion-icon"},c.a.createElement("a",{className:"champion-icon pl-3 pr-3",href:n},c.a.createElement("img",{alt:a,src:r}))),c.a.createElement("div",{className:"champion-name"},c.a.createElement("a",{href:n},a)),c.a.createElement("div",null,c.a.createElement("span",{className:"winrate"},"".concat((100*e[0]).toFixed(2),"%"))," winrate"),c.a.createElement("div",null,"in ","".concat(e[1]," games")))}}]),t}(n.Component),I=Object(o.f)(T),W=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(p.a)(this,Object(u.a)(t).call(this,e))).state={pairs:[]},a.apiUrl="https://leagueofdata1.herokuapp.com",a}return Object(h.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){var e=this.props.pairs;return c.a.createElement("div",{className:"container",style:{marginTop:"25px"}},c.a.createElement("div",{className:"row justify-content-center"},e.map((function(e){return c.a.createElement(I,{key:e[2],champId:e[2],data:e})}))))}}]),t}(n.Component),U=a(95),D=a.n(U),S=a(152),B=a.n(S),F=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(p.a)(this,Object(u.a)(t).call(this,e))).state={filterText:""},a}return Object(h.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){return c.a.createElement("div",null,c.a.createElement(B.a,{highcharts:D.a,options:this.props.options}))}}]),t}(n.Component),A=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(p.a)(this,Object(u.a)(t).call(this,e))).state={pairs:[],champions:[],wins:[],losses:[],champInfo:{}},a.apiUrl="https://leagueofdata1.herokuapp.com",a.getChampions=a.getChampions.bind(Object(b.a)(a)),a.getWins=a.getWins.bind(Object(b.a)(a)),a.getLosses=a.getLosses.bind(Object(b.a)(a)),a}return Object(h.a)(t,e),Object(m.a)(t,[{key:"componentDidMount",value:function(){var e,t,a,n,c,r,s;return E.a.async((function(i){for(;;)switch(i.prev=i.next){case 0:return i.prev=0,console.log(this.props),e=C.a.parse(this.props.location.search,{ignoreQueryPrefix:!0}).champId,i.next=5,E.a.awrap(y.a.get("".concat(this.apiUrl,"/pairs"),{params:{champId:e}}));case 5:return t=i.sent,a=this.removeItself(t.data,e),n=this.getChampions(a),c=this.getWins(a),r=this.getLosses(a),i.next=12,E.a.awrap(y.a.get("".concat(this.apiUrl,"/championData"),{params:{champId:e}}));case 12:s=i.sent,this.setState({pairs:a,champions:n,wins:c,losses:r,champInfo:s.data}),i.next=19;break;case 16:i.prev=16,i.t0=i.catch(0),console.log(i.t0);case 19:case"end":return i.stop()}}),null,this,[[0,16]])}},{key:"removeItself",value:function(e,t){var a=e.map((function(e){return e[2]}));return e.splice(a.indexOf(parseInt(t)),1),e}},{key:"getChampions",value:function(e){return e.reduce((function(e,t){return e.push(t[5]),e}),[])}},{key:"getWins",value:function(e){return e.reduce((function(e,t){return e.push(t[3]),e}),[])}},{key:"getLosses",value:function(e){return e.reduce((function(e,t){return e.push(t[4]),e}),[])}},{key:"render",value:function(){var e={chart:{type:"column",backgroundColor:"rgb(25,34,39)",borderColor:"#ffffff",borderWidth:1},title:{text:"Champion Pair Wins & Losses",style:{color:"#ffffff"}},xAxis:{categories:this.state.champions,labels:{style:{color:"#ffffff"}},title:{text:"Champions",style:{color:"#ffffff"}}},yAxis:{min:0,title:{text:"Games",style:{color:"#ffffff"}},labels:{style:{color:"#ffffff"}}},legend:{itemStyle:{color:"#ffffff"}},tooltip:{pointFormat:'<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',shared:!0},plotOptions:{column:{stacking:"num"}},series:[{name:"Wins",data:this.state.wins,color:"#38bfc0"},{name:"Losses",data:this.state.losses,color:"#fd5d5f"}]},t=this.state.pairs,a=this.state.champInfo,n=a.name,r=a.hyperLink,s=a.imageLink,i=a.wins,o=a.losses,l=a.pickRate;return c.a.createElement("div",{className:"container",style:{maxWidth:"950px",color:"#ffffff"}},c.a.createElement("div",{className:"champion-chosen"},c.a.createElement(j,{hyperLink:r,imageLink:s}),c.a.createElement("h2",null,n),c.a.createElement("div",{className:"champion-stats"},c.a.createElement("div",null,"Wins: ",c.a.createElement("span",{className:"win"},"".concat(i))," | Losses: ",c.a.createElement("span",{className:"loss"},"".concat(o))),c.a.createElement("div",null,"Win Rate: ",c.a.createElement("span",{className:"winrate"},"".concat((i/(i+o)*100).toFixed(2),"%"))),c.a.createElement("div",null,"Pick Rate: ".concat((100*l).toFixed(2),"%")))),c.a.createElement(F,{options:e}),c.a.createElement(W,{url:this.props.location.search,pairs:t}))}}]),t}(n.Component),M=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(p.a)(this,Object(u.a)(t).call(this,e))).state={champions:[]},a.apiUrl="https://leagueofdata1.herokuapp.com",a}return Object(h.a)(t,e),Object(m.a)(t,[{key:"componentDidMount",value:function(){var e,t,a;return E.a.async((function(n){for(;;)switch(n.prev=n.next){case 0:n.prev=0,e=[],a=0;case 3:if(!(a<this.props.team.length)){n.next=12;break}return n.next=6,E.a.awrap(y.a.get("".concat(this.apiUrl,"/champion"),{params:{champId:this.props.team[a]}}));case 6:t=n.sent,console.log(t),e.push(t.data);case 9:a++,n.next=3;break;case 12:console.log(e),this.setState({champions:e}),n.next=19;break;case 16:n.prev=16,n.t0=n.catch(0),console.log(n.t0);case 19:case"end":return n.stop()}}),null,this,[[0,16]])}},{key:"render",value:function(){var e=this.state.champions;return c.a.createElement("div",{className:"container"},c.a.createElement("div",{className:"row justify-content-center best-team"},e.map((function(e,t){var a=e.name,n=e.hyperlink,r=e.imageLink,s=e.key;return c.a.createElement("div",{className:"champion-select"},c.a.createElement(j,{key:s,championName:a,hyperLink:n,imageLink:r}))}))))}}]),t}(n.Component),P=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(p.a)(this,Object(u.a)(t).call(this,e))).state={teams:[]},a.apiUrl="https://leagueofdata1.herokuapp.com",a}return Object(h.a)(t,e),Object(m.a)(t,[{key:"componentDidMount",value:function(){var e,t,a,n,c;return E.a.async((function(r){for(;;)switch(r.prev=r.next){case 0:return r.prev=0,console.log(this.props),r.next=4,E.a.awrap(y.a.get("".concat(this.apiUrl,"/bestTeams")));case 4:e=r.sent,t=e.data,a=t.teams,n=t.wins,c=t.losses,this.setState({teams:a,wins:n,losses:c}),r.next=12;break;case 9:r.prev=9,r.t0=r.catch(0),console.log(r.t0);case 12:case"end":return r.stop()}}),null,this,[[0,9]])}},{key:"render",value:function(){var e=this.state,t=e.teams,a=e.wins,n=e.losses;return c.a.createElement("div",{className:"container",style:{maxWidth:"950px",color:"#ffffff"}},c.a.createElement("div",{className:"best-teams-header"},c.a.createElement("h2",null,"Best Teams"),c.a.createElement("div",{className:"best-teams-stats"},c.a.createElement("div",null,"Teams: ",t.length),c.a.createElement("div",null,"Wins: ",c.a.createElement("span",{className:"win"},"".concat(a))," | Losses: ",c.a.createElement("span",{className:"loss"},"".concat(n))),c.a.createElement("div",null,"Win Rate: ",c.a.createElement("span",{className:"winrate"},"".concat((a/(a+n)*100).toFixed(2),"%"))))),t.map((function(e){return c.a.createElement(M,{key:e,team:e})})))}}]),t}(n.Component),R=function(e){function t(){return Object(l.a)(this,t),Object(p.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){return c.a.createElement("div",{className:"container",style:{maxWidth:"950px",color:"#ffffff"}},c.a.createElement("div",{className:"about-header"},c.a.createElement("h1",null,"ABOUT")),c.a.createElement("p",null,"League of Data is data-driven web application that returns ideal champion pairings for the game ",c.a.createElement("span",{style:{fontStyle:"italic"}},"League of Legends"),". The application uses Riot's very own API to collect match data from Challenger players."),c.a.createElement("p",null,"For a more technical and detailed understanding of the application, ",c.a.createElement("a",{className:"about-link",href:"https://github.com/pjung16/LeagueOfData",target:"blank"},"visit its GitHub repository.")),c.a.createElement("br",null),c.a.createElement("p",{className:"mb-5"},"League of Data was developed by ",c.a.createElement("a",{className:"about-link",href:"https://www.kennethslee.com/",target:"blank"},"Kenneth Lee"),", ",c.a.createElement("a",{className:"about-link",href:"https://pjung16.github.io/",target:"blank"},"Philip Jung"),", and ",c.a.createElement("a",{className:"about-link",href:"https://www.josephjd.kim/",target:"blank"},"Joseph Kim"),"."),c.a.createElement("img",{className:"logo",src:"logo.png",alt:"D"}))}}]),t}(n.Component);var J=function(){return c.a.createElement("div",null,c.a.createElement("div",{className:"App"},c.a.createElement(i.a,null,c.a.createElement(v,null),c.a.createElement(o.c,null,c.a.createElement(o.a,{exact:!0,path:"/",component:w}),c.a.createElement(o.a,{path:"/pairs",component:A}),c.a.createElement(o.a,{exact:!0,path:"/bestTeams",component:P}),c.a.createElement(o.a,{exact:!0,path:"/about",component:R})))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(c.a.createElement(J,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))},43:function(e,t,a){}},[[161,1,2]]]);
//# sourceMappingURL=main.37abd3df.chunk.js.map