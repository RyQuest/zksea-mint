(this["webpackJsonpmint-nft"]=this["webpackJsonpmint-nft"]||[]).push([[0],{438:function(e,t,n){},451:function(e,t){},453:function(e,t){},457:function(e,t){},458:function(e,t){},483:function(e,t){},485:function(e,t){},495:function(e,t){},497:function(e,t){},507:function(e,t){},509:function(e,t){},524:function(e,t){},556:function(e,t){},557:function(e,t){},625:function(e,t){},627:function(e,t){},632:function(e,t){},634:function(e,t){},641:function(e,t){},653:function(e,t){},656:function(e,t){},661:function(e,t){},737:function(e,t){},770:function(e,t){},841:function(e,t){},847:function(e,t){},860:function(e,t){},962:function(e,t,n){"use strict";n.r(t);var c=n(8),s=n(112),r=n.n(s),o=(n(438),n(10)),a=n(174),i=n(1),l=n.n(i),u=n(413),d=n.n(u),b=n(429),f=n(423),h=n.n(f),p={walletconnect:{package:b.a,options:{rpc:{56:"https://bsc-dataseed.binance.org/"},network:"mainnet",chainId:56}}},j=new h.a({network:"mainnet",cacheProvider:!0,providerOptions:p,disableInjectedProvider:!1}),x=function(){var e=Object(o.a)(l.a.mark((function e(){var t,n;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,j.connect();case 2:return t=e.sent,n=new d.a(t),e.abrupt("return",n);case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),g=n(74),m=n(81),O=n(36),v=(n(235),n(9).Buffer,function(){var e=Object(o.a)(l.a.mark((function e(){var t,n,c,s,r,o,a,i,u,d,b,f;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=!1,!0,console.log("wallet connect"),e.next=5,x();case 5:return n=new m.providers.Web3Provider(window.ethereum),c=n.getSigner(),e.next=9,n.getNetwork();case 9:return s=e.sent,console.log("chain",s.chainId),1!=s.chainId&&(console.log("not match"),O.b.error("Please select Ethereum Mainnet",{position:"bottom-center"})),console.log("signer",c),Object(O.b)("Verifying Account",{position:"bottom-center"}),e.next=16,g.getDefaultProvider("mainnet");case 16:return r=e.sent,e.next=19,g.Wallet.fromEthSigner(c,r);case 19:return o=e.sent,console.log("syncWallet",o),a=o.address(),console.log("address",a),e.next=25,o.getBalance("ETH","verified");case 25:if(i=e.sent,console.log("Balance _____",i),u=i.toString(),u=parseFloat(u),u/=Math.pow(10,18),console.log("Balancein number _____",u),"0.01","0.001",!(i<"0.01")){e.next=51;break}return Object(O.b)("You do not have sufficient funds, please deposit amount to activate zksync account",{position:"bottom-center"}),e.next=37,o.depositToSyncFromEthereum({depositTo:o.address(),token:"ETH",amount:m.utils.parseEther("0.001")});case 37:return d=e.sent,e.prev=38,e.next=41,d.awaitReceipt();case 41:b=e.sent,console.log("depositReceipt",b),t=!0,console.log("verified in depositReceipt",b.block.verified),!1===b.block.verified&&(console.log("verified block error"),Object(O.b)("Verify Your balance first",{position:"bottom-center"})),e.next=51;break;case 48:e.prev=48,e.t0=e.catch(38),console.log(e.t0);case 51:return Object(O.b)("Authenticating",{position:"bottom-center"}),e.prev=52,e.next=55,o.setSigningKey({feeToken:"ETH",ethAuthType:"ECDSA"});case 55:return f=e.sent,e.next=58,f.awaitReceipt();case 58:e.next=63;break;case 60:e.prev=60,e.t1=e.catch(52),console.log("Error",e.t1);case 63:return Object(O.b)("Wallet connect successful",{position:"bottom-center"}),e.abrupt("return",{Balance:u,address:a,depositStatus:t});case 65:case"end":return e.stop()}}),e,null,[[38,48],[52,60]])})));return function(){return e.apply(this,arguments)}}()),k=(n(235),n(9).Buffer,n(172)),w=Object(k.b)({name:"Auth",initialState:{value:{user:{},isAuthenticated:!1}},reducers:{login:function(e,t){e.value=t.payload},logout:function(e){e.value={user:{},isAuthenticated:!1}}}}),N=w.actions,T=N.login,E=(N.logout,w.reducer),y=n(115),S=n(242),A=n.n(S),_=n(235),B=n(9).Buffer,C=function(){var e=Object(o.a)(l.a.mark((function e(t){var n,c,s,r,o,a,i,u,d,b,f,h,p,j,v,k,w;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,x();case 2:return n=new m.providers.Web3Provider(window.ethereum),c=n.getSigner(),console.log("signer",c),Object(O.b)("Verifying Account",{position:"bottom-center"}),e.next=8,g.getDefaultProvider("mainnet");case 8:return s=e.sent,e.next=11,g.Wallet.fromEthSigner(c,s);case 11:return r=e.sent,o=r.address(),e.next=15,r.getNonce();case 15:return e.sent,e.next=18,r.getBalance("ETH","verified");case 18:return a=e.sent,console.log("Balance _____",a),e.next=22,r.getEthereumBalance("ETH");case 22:if(i=e.sent,console.log("balance",i),0!=a){e.next=38;break}return e.next=27,r.depositToSyncFromEthereum({depositTo:r.address(),token:"ETH",amount:m.utils.parseEther("0.001")});case 27:return u=e.sent,e.prev=28,e.next=31,u.awaitReceipt();case 31:d=e.sent,console.log("depositReceipt",d),e.next=38;break;case 35:e.prev=35,e.t0=e.catch(28),console.log(e.t0);case 38:return e.next=40,r.isSigningKeySet();case 40:if(e.sent){e.next=52;break}return e.next=43,r.getAccountId();case 43:if(e.t1=e.sent,e.t2=void 0,e.t1!=e.t2){e.next=47;break}throw new Error("Unknown account");case 47:return e.next=49,r.setSigningKey({feeToken:"ETH",ethAuthType:"ECDSA"});case 49:return b=e.sent,e.next=52,b.awaitReceipt();case 52:return console.log("ipfs hash",t),t=(t=t.toString()).replace("https://gateway.ipfs.io/ipfs/",""),console.log("ipfs hash",t),B.from(t,"hex"),f="0x"+_.decode(t).slice(2).toString("hex"),console.log("hash",f),Object(O.b)("Minting NFT",{position:"bottom-center"}),h=r.mintNFT({recipient:r.address(),contentHash:f,feeToken:"ETH"}),e.next=63,h.finally();case 63:return p=e.sent,console.log("nftReceipt",p),e.t3=console,e.next=68,p;case 68:return e.t4=e.sent.txData,e.t3.log.call(e.t3,"nftdata",e.t4),e.next=72,r.getAccountState(o);case 72:return j=e.sent,console.log("state",j),console.log("commited",j.committed.nfts),console.log("verified",j.verified.nfts),v=Object.keys(j.committed.nfts),k="",v.forEach((function(e,t){k=e})),w={NftToken:k,address:o},e.abrupt("return",w);case 81:case"end":return e.stop()}}),e,null,[[28,35]])})));return function(t){return e.apply(this,arguments)}}(),F=n(17);var H=function(){var e=Object(c.useState)(0),t=Object(a.a)(e,2),n=t[0],s=t[1],r=Object(c.useState)(!1),i=Object(a.a)(r,2),u=i[0],d=i[1],b=Object(c.useState)(0),f=Object(a.a)(b,2),h=f[0],p=f[1],j=Object(y.b)(),x=Object(y.c)((function(e){return e.auth.value.isAuthenticated})),g=Object(y.c)((function(e){return e.auth.value.user})),m=function(){var e=Object(o.a)(l.a.mark((function e(){var t;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,v();case 2:t=e.sent,console.log("zksyncCon",t),null==t.address?O.b.error("Please switch to Ethereum Mainnet",{position:"bottom-center"}):(j(T({user:{address:t.address},isAuthenticated:!0})),console.log("login",g));case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),k=function(){var e=Object(o.a)(l.a.mark((function e(){var t,n,c,s;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!x){e.next=30;break}if(0==(t=parseFloat(h))){e.next=6;break}O.b.error("Amount cannot be zero",{position:"bottom-center"}),e.next=28;break;case 6:return d(!0),!0,e.next=11,A.a.post("http://52.14.90.31:3001/random-NFT",{address:g.address,price:t,hash:"free"});case 11:return n=e.sent,console.log("res",n),console.log("ipfs",n.data.ipfs_hash),console.log("contentid",n.data._id),e.next=17,C(n.data.ipfs_hash);case 17:return c=e.sent,console.log("mintNFT",c),e.next=21,A.a.post("http://52.14.90.31:3001/set-tokenId",{tokenId:c.NftToken,contentId:n.data._id});case 21:s=e.sent,console.log("setToken",s),Object(O.b)("Transaction Successful",{position:"bottom-center"}),d(!1),e.next=28;break;case 27:O.b.error("Transaction Unsuccessful",{position:"bottom-center"});case 28:e.next=31;break;case 30:O.b.error("Please connect wallet",{position:"bottom-center"});case 31:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(F.jsxs)(F.Fragment,{children:[Object(F.jsx)(O.a,{}),Object(F.jsxs)("div",{className:"header",children:[u&&Object(F.jsx)("div",{className:"text-center",children:Object(F.jsx)("div",{className:"spinner-border text-white"})}),Object(F.jsx)("div",{className:"logo",children:Object(F.jsx)("img",{src:"/images/logo-bull.png",alt:""})}),x?Object(F.jsx)("span",{className:"wallet-address",children:Object(F.jsx)("p",{className:"swl",children:(null===g||void 0===g?void 0:g.address.substring(0,5))+"....."+(null===g||void 0===g?void 0:g.address.substring(38,42))})}):Object(F.jsx)("button",{onClick:function(){return m()},className:"connectWallet",children:"CONNECT WALLET"})]}),Object(F.jsxs)("div",{className:"main",children:[Object(F.jsx)("h1",{children:"MINT YOUR Bullish Freaks"}),Object(F.jsxs)("div",{className:"card",children:[Object(F.jsx)("div",{className:"cardFlex1",children:Object(F.jsx)("h2",{className:"aaa",children:"10,000 NFTs"})}),Object(F.jsxs)("div",{className:"cardFlex1",children:[Object(F.jsxs)("div",{className:"innerCont",children:[Object(F.jsx)("h2",{children:"MY ETH BALANCE"}),Object(F.jsx)("h3",{children:"0 ETH"})]}),Object(F.jsxs)("div",{className:"middle",children:[Object(F.jsx)("h2",{children:"AMOUNT"}),Object(F.jsxs)("div",{className:"ggg",children:[Object(F.jsx)("button",{onClick:function(){s(n>0?n-1:0),".345"===h&&p(".276"),".276"===h&&p(".207"),".207"===h&&p(".138"),".138"===h&&p(".069"),".069"===h&&p(0),".69"===h&&p(".621"),".621"===h&&p(".552"),".552"===h&&p(".483"),".483"===h&&p(".414"),".414"===h&&p(".345")},children:"-"}),Object(F.jsx)("span",{children:n}),Object(F.jsx)("button",{onClick:function(){s(n<1?n+1:1),0===h&&p("0"),".069"===h&&p(".138"),2===n&&p(".207"),3===n&&p(".276"),4===n&&p(".345"),5===n&&p(".414"),6===n&&p(".483"),7===n&&p(".552"),8===n&&p(".621"),9===n&&p(".69")},children:"+"})]}),Object(F.jsx)("button",{className:"max",onClick:function(){s(1),p(0)},children:"Max"})]}),Object(F.jsxs)("div",{className:"innerCont",children:[Object(F.jsx)("h2",{children:"TOTAL PRICE"}),Object(F.jsxs)("h3",{children:[h," ETH"]})]}),Object(F.jsx)("div",{className:"cardFlex1 mainBTN",children:u?Object(F.jsx)("button",{children:"Processing"}):Object(F.jsx)("button",{onClick:k,children:"Mint Now"})})]})]}),Object(F.jsx)("div",{className:"darkBackground"}),Object(F.jsx)("img",{src:"/images/bg-bull.png",className:"background",alt:""})]}),Object(F.jsx)("div",{className:"footer",children:Object(F.jsx)("p",{children:"Copyright \xa9 2022 Bullish Freaks, All Right Reserved"})})]})},R=(n(959),n(427)),I=n(430),P=n(142),M=n(428),W=n.n(M),D=n(114),L=n(45),U=Object(L.b)({auth:E}),Y={key:"root",storage:W.a},z=Object(D.a)(Y,U),K=Object(k.a)({reducer:z,middleware:[P.a]}),V=Object(I.a)(K);r.a.render(Object(F.jsx)(y.a,{store:K,children:Object(F.jsx)(R.a,{loading:null,persistor:V,children:Object(F.jsx)(H,{})})}),document.getElementById("root"))}},[[962,1,2]]]);
//# sourceMappingURL=main.6c533c6c.chunk.js.map