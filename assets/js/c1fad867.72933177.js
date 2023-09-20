"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[4758],{35318:(e,t,n)=>{n.d(t,{Zo:()=>d,kt:()=>u});var r=n(27378);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var s=r.createContext({}),p=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},d=function(e){var t=p(e.components);return r.createElement(s.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,s=e.parentName,d=i(e,["components","mdxType","originalType","parentName"]),m=p(n),u=a,f=m["".concat(s,".").concat(u)]||m[u]||c[u]||o;return n?r.createElement(f,l(l({ref:t},d),{},{components:n})):r.createElement(f,l({ref:t},d))}));function u(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,l=new Array(o);l[0]=m;var i={};for(var s in t)hasOwnProperty.call(t,s)&&(i[s]=t[s]);i.originalType=e,i.mdxType="string"==typeof e?e:a,l[1]=i;for(var p=2;p<o;p++)l[p]=n[p];return r.createElement.apply(null,l)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},53042:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>l,default:()=>c,frontMatter:()=>o,metadata:()=>i,toc:()=>p});var r=n(25773),a=(n(27378),n(35318));const o={sidebar_position:3,title:"Installing from a compressed tar file",description:"You can install Podman Desktop on Linux from a compressed tar file.",tags:["podman-desktop","installing","linux","restricted-environment"],keywords:["podman desktop","podman","containers","installing","installation","linux","restricted-environment"]},l="Installing Podman Desktop from a compressed tar file",i={unversionedId:"Installation/linux-install/installing-podman-desktop-from-a-compressed-tar-file",id:"Installation/linux-install/installing-podman-desktop-from-a-compressed-tar-file",title:"Installing from a compressed tar file",description:"You can install Podman Desktop on Linux from a compressed tar file.",source:"@site/docs/Installation/linux-install/installing-podman-desktop-from-a-compressed-tar-file.md",sourceDirName:"Installation/linux-install",slug:"/Installation/linux-install/installing-podman-desktop-from-a-compressed-tar-file",permalink:"/docs/Installation/linux-install/installing-podman-desktop-from-a-compressed-tar-file",draft:!1,editUrl:"https://github.com/containers/podman-desktop/tree/main/website/docs/Installation/linux-install/installing-podman-desktop-from-a-compressed-tar-file.md",tags:[{label:"podman-desktop",permalink:"/docs/tags/podman-desktop"},{label:"installing",permalink:"/docs/tags/installing"},{label:"linux",permalink:"/docs/tags/linux"},{label:"restricted-environment",permalink:"/docs/tags/restricted-environment"}],version:"current",sidebarPosition:3,frontMatter:{sidebar_position:3,title:"Installing from a compressed tar file",description:"You can install Podman Desktop on Linux from a compressed tar file.",tags:["podman-desktop","installing","linux","restricted-environment"],keywords:["podman desktop","podman","containers","installing","installation","linux","restricted-environment"]},sidebar:"mySidebar",previous:{title:"Installing from a Flatpak bundle",permalink:"/docs/Installation/linux-install/installing-podman-desktop-from-a-flatpak-bundle"},next:{title:"Onboarding",permalink:"/docs/onboarding/"}},s={},p=[{value:"Prerequisites",id:"prerequisites",level:4},{value:"Procedure",id:"procedure",level:4},{value:"Next steps",id:"next-steps",level:4}],d={toc:p};function c(e){let{components:t,...n}=e;return(0,a.kt)("wrapper",(0,r.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"archive"},"Installing Podman Desktop from a compressed tar file"),(0,a.kt)("p",null,"Consider installing from an archive rather than ",(0,a.kt)("a",{parentName:"p",href:"../linux-install"},"from Flathub"),", or ",(0,a.kt)("a",{parentName:"p",href:"installing-podman-desktop-from-a-flatpak-bundle"},"from a Flatpak bundle")," when:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"You cannot use Flatpak."),(0,a.kt)("li",{parentName:"ul"},"You install in a restricted environment.")),(0,a.kt)("h4",{id:"prerequisites"},"Prerequisites"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"https://podman.io/"},"Podman")," stable version")),(0,a.kt)("h4",{id:"procedure"},"Procedure"),(0,a.kt)("ol",null,(0,a.kt)("li",{parentName:"ol"},"Download the\n",(0,a.kt)("inlineCode",{parentName:"li"},"podman-desktop-<version>.tar.gz")," archive from the ",(0,a.kt)("a",{parentName:"li",href:"https://github.com/containers/podman-desktop/releases"},"Git repository release assets"),"."),(0,a.kt)("li",{parentName:"ol"},"Extract the content."),(0,a.kt)("li",{parentName:"ol"},"Go to the extracted directory."),(0,a.kt)("li",{parentName:"ol"},"Double-click on the ",(0,a.kt)("inlineCode",{parentName:"li"},"podman-desktop")," executable file.")),(0,a.kt)("h4",{id:"next-steps"},"Next steps"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"/docs/getting-started"},"Getting started"))))}c.isMDXComponent=!0}}]);