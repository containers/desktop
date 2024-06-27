"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[58262,43163,11724,65248],{544:(e,s,t)=>{t.d(s,{Z:()=>i});var l=t(161),n=t(27378),a=t(24246);const i=function(){function e(){if(!document?.documentElement)return;const e=document.documentElement;"dark"===e.dataset?.theme?(e.classList.add("dark"),setTimeout((()=>{e.classList.add("dark")}),100)):(e.classList.remove("dark"),setTimeout((()=>{e.classList.remove("dark")}),100))}return(0,n.useEffect)((()=>{l.Z.canUseDOM&&e()}),[l.Z.canUseDOM]),(0,n.useEffect)((()=>{if(!l.Z.canUseDOM)return;const s=new MutationObserver((s=>{s.forEach((s=>{"attributes"!==s.type||"data-rh"!==s.attributeName&&"data-theme"!==s.attributeName||e()}))}));return s.observe(document.documentElement,{attributes:!0,childList:!1,subtree:!1}),()=>{s.disconnect()}}),[l.Z.canUseDOM]),(0,a.jsx)("div",{})}},96187:(e,s,t)=>{t.r(s),t.d(s,{default:()=>d});var l=t(50353),n=t(544),a=t(93963),i=t(53330),r=t(50036),o=t(40684),c=(t(27378),t(24246));function d(){const{siteConfig:e}=(0,l.Z)();return(0,c.jsx)(o.Z,{title:e.title,description:"Downloads",children:(0,c.jsx)("section",{className:"container mx-auto flex justify-left flex-col bg-hero-pattern bg-no-repeat bg-center bg-cover",children:(0,c.jsxs)("div",{className:"bg-white/30 dark:bg-transparent",children:[(0,c.jsx)("div",{className:"lg:w-2/3 w-full",children:(0,c.jsx)("h1",{className:"flex flex-col title-font sm:text-3xl text-2xl lg:text-5xl mb-10 font-medium text-gray-900 dark:text-white",children:"Downloads"})}),(0,c.jsxs)("div",{className:"flex lg:flex-row flex-col mb-12 gap-8",children:[(0,c.jsx)(n.Z,{}),(0,c.jsx)(r.WindowsDownloads,{}),(0,c.jsx)(i.MacOSDownloads,{}),(0,c.jsx)(a.LinuxDownloads,{})]})]})})})}},93963:(e,s,t)=>{t.r(s),t.d(s,{LinuxDownloads:()=>m,default:()=>p});var l=t(36641),n=t(50353),a=t(9928),i=t(19374),r=t(92739),o=t(544),c=t(40684),d=t(27378),x=t(24246);function m(){const[e,s]=(0,d.useState)({version:"",binary:"",flatpak:""});return(0,d.useEffect)((()=>{(async function(e){const s=await fetch("https://api.github.com/repos/containers/podman-desktop/releases/latest"),t=await s.json(),l=t.assets,n=l.filter((e=>e.name.endsWith(".tar.gz")));if(1!==n.length)throw new Error("Unable to grab .tar.gz");const a=n[0],i=l.filter((e=>e.name.endsWith(".flatpak")));if(1!==i.length)throw new Error("Unable to grab .flatpak");const r=i[0];e({version:t.name,binary:a.browser_download_url,flatpak:r.browser_download_url})})(s).catch((e=>{console.error(e)}))}),[]),(0,x.jsxs)("div",{className:"basis-1/3 py-2 rounded-lg dark:text-gray-400 text-gray-900  bg-zinc-300/25 dark:bg-zinc-700/25 bg-blend-multiply text-center items-center",children:[(0,x.jsx)(r.G,{size:"4x",icon:a.qJE,className:"my-4"}),(0,x.jsx)("h2",{className:"w-full text-center text-4xl title-font font-medium pb-3 border-purple-500 border-b-2",children:"Linux"}),(0,x.jsx)("div",{className:"flex p-1 flex-col md:flex-col items-center align-top",children:(0,x.jsxs)("div",{className:"flex flex-col align-middle items-center",children:[(0,x.jsx)("h3",{className:"mt-0",children:"Podman Desktop for Linux"}),(0,x.jsxs)("div",{className:"pt-8",children:[(0,x.jsxs)(l.Z,{className:"mt-auto no-underline hover:no-underline inline-flex text-white hover:text-white bg-purple-500 border-0 py-2 px-6 focus:outline-none hover:bg-purple-500 rounded text-md font-semibold",to:e.flatpak,children:[(0,x.jsx)(r.G,{size:"1x",icon:i.q7m,className:"mr-2"}),"Download Now"]}),(0,x.jsxs)("caption",{className:"block w-full mt-1 text/50 dark:text-white/50",children:["Linux *.flatpak, version ",e.version]})]}),(0,x.jsxs)("div",{className:"mt-4",children:[(0,x.jsx)("div",{children:"Other Linux downloads:"}),(0,x.jsxs)(l.Z,{className:"underline inline-flex dark:text-white text-purple-500 hover:text-purple-200 py-2 px-6 font-semibold text-md",to:e.binary,children:[(0,x.jsx)(r.G,{size:"1x",icon:i.q7m,className:"mr-2"}),"AMD64 binary (tar.gz)"]})]}),(0,x.jsx)("div",{className:"flex flex-col align-middle items-center",children:(0,x.jsxs)("div",{className:"items-center text-center pt-6",children:[(0,x.jsxs)("p",{className:"text-lg",children:["Using"," ",(0,x.jsx)("a",{className:"text-purple-500",href:"https://flathub.org/apps/details/io.podman_desktop.PodmanDesktop",children:"Flathub"})," ","? Install in one command:"]}),(0,x.jsxs)("div",{className:"flex flex-row pt-3 pb-7",children:[(0,x.jsx)("p",{className:"text-xl p-1 mx-1",children:(0,x.jsx)("svg",{width:"35px",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",fill:"currentColor",children:(0,x.jsx)("path",{d:"M12 2.604l-.43.283L0 10.459v6.752l6.393 4.184L12 17.725l5.607 3.671L24 17.211v-6.752L12 2.604zm0 .828l5.434 3.556-2.717 1.778L12 10.545l-2.717-1.78-2.717-1.777L12 3.432zM6.39 7.104l5.434 3.556-5.408 3.54-5.434-3.557 5.409-3.54zm11.22 0l5.431 3.554-5.434 3.557-5.433-3.555 5.435-3.556zM.925 10.867l5.379 3.52a.123.08 0 00.027.013v5.647l-5.406-3.54v-5.64zm11.213.115l5.408 3.54v5.664l-5.408-3.54v-5.664z"})})}),(0,x.jsxs)("div",{className:"dark:bg-charcoal-800/50 bg-zinc-300/50 p-1 text-xl dark:text-purple-200 text-purple-600 flex flex-row",children:[(0,x.jsxs)("div",{className:"w-72 truncate",children:[(0,x.jsx)(r.G,{size:"xs",icon:i.Jw3,className:"mx-2 mt-3"}),"flatpak install flathub io.podman_desktop.PodmanDesktop"]}),(0,x.jsx)("div",{children:(0,x.jsxs)("button",{title:"Copy To Clipboard",className:"mr-2 p-1",children:[" ",(0,x.jsx)(r.G,{size:"xs",icon:i.O4,className:"ml-3  cursor-pointer text-xl  text-white-500",onClick:()=>{(async()=>{await navigator.clipboard.writeText("flatpak install flathub io.podman_desktop.PodmanDesktop")})().catch((e=>{console.error("unable to copy instructions",e)}))}})]})})]})]})]})})]})})]})}function p(){const{siteConfig:e}=(0,n.Z)();return(0,x.jsxs)(c.Z,{title:e.title,description:"Downloads for macOS",children:[(0,x.jsx)(o.Z,{}),(0,x.jsx)("section",{className:"container mx-auto flex justify-center flex-col",children:(0,x.jsxs)("div",{className:"w-full flex flex-col",children:[(0,x.jsx)("h1",{className:"title-font sm:text-3xl text-2xl lg:text-5xl mb-10 font-medium text-gray-900 dark:text-white",children:"Linux Downloads"}),(0,x.jsx)("main",{className:"h-screen",children:(0,x.jsx)(m,{})})]})})]})}},53330:(e,s,t)=>{t.r(s),t.d(s,{MacOSDownloads:()=>m,default:()=>p});var l=t(36641),n=t(50353),a=t(9928),i=t(19374),r=t(92739),o=t(544),c=t(40684),d=t(27378),x=t(24246);function m(){const[e,s]=(0,d.useState)({version:"",universal:"",x64:"",arm64:"",airgapsetupX64:"",airgapsetupArm64:""});return(0,d.useEffect)((()=>{(async function(e){const s=await fetch("https://api.github.com/repos/containers/podman-desktop/releases/latest"),t=await s.json(),l=t.assets,n=l.filter((e=>e.name.endsWith("-arm64.dmg")&&!e.name.includes("airgap")));if(1!==n.length)throw new Error("Unable to grab arm64 dmg");const a=n[0],i=l.filter((e=>e.name.endsWith("-x64.dmg")&&!e.name.includes("airgap")));if(1!==i.length)throw new Error("Unable to grab x64 dmg");const r=i[0],o=l.filter((e=>e.name.endsWith("universal.dmg")&&e.name.includes("airgap")));let c;1!==o.length?console.log("Error: Unable to find Apple Disk Image for restricted environments"):c=o[0];const d=l.filter((e=>e.name.endsWith(".dmg")&&!e.name.includes("airgap")&&e.name!==a.name&&e.name!==r.name));if(1!==d.length)throw new Error("Unable to grab unified dmg");const x=d[0],m=l.filter((e=>e.name.endsWith("-x64.dmg")&&e.name.includes("airgap"))),p=m?.[0]?.browser_download_url,u=l.filter((e=>e.name.endsWith("-arm64.dmg")&&e.name.includes("airgap"))),h=u?.[0]?.browser_download_url;e({version:t.name,universal:x.browser_download_url,x64:r.browser_download_url,arm64:a.browser_download_url,airgapsetup:c?.browser_download_url,airgapsetupX64:p,airgapsetupArm64:h})})(s).catch((e=>{console.error(e)}))}),[]),(0,x.jsxs)("div",{className:"basis-1/3 py-2 rounded-lg dark:text-gray-400 text-gray-900  bg-zinc-300/25 dark:bg-zinc-700/25 bg-blend-multiply text-center items-center",children:[(0,x.jsx)(r.G,{size:"4x",icon:a.Av$,className:"my-4"}),(0,x.jsx)("h2",{className:"w-full text-center text-4xl title-font font-medium pb-3 border-purple-500 border-b-2",children:"macOS"}),(0,x.jsx)("div",{className:"flex p-1 flex-col md:flex-col items-center align-top",children:(0,x.jsxs)("div",{className:"flex flex-col align-middle items-center",children:[(0,x.jsx)("h3",{className:"mt-0",children:"Podman Desktop for macOS"}),(0,x.jsxs)("div",{className:"pt-8",children:[(0,x.jsxs)(l.Z,{className:"mt-auto no-underline hover:no-underline inline-flex text-white hover:text-white bg-purple-500 border-0 py-2 px-6 focus:outline-none hover:bg-purple-500 rounded text-md font-semibold",to:e.universal,children:[(0,x.jsx)(r.G,{size:"1x",icon:i.q7m,className:"mr-2"}),"Download Now"]}),(0,x.jsxs)("caption",{className:"block w-full mt-1 text/50 dark:text-white/50",children:["Universal *.dmg, version ",e.version]})]}),(0,x.jsxs)("div",{className:"mt-4",children:[(0,x.jsx)("div",{children:"Other macOS downloads:"}),(0,x.jsxs)(l.Z,{className:"underline inline-flex dark:text-white text-purple-500 hover:text-purple-200 py-2 px-6 font-semibold text-md",to:e.x64,children:[(0,x.jsx)(r.G,{size:"1x",icon:i.q7m,className:"mr-2"}),"Intel"]}),(0,x.jsxs)(l.Z,{className:"underline inline-flex dark:text-white text-purple-500 hover:text-purple-200 py-2 px-6 text-md font-semibold",to:e.arm64,children:[(0,x.jsx)(r.G,{size:"1x",icon:i.q7m,className:"mr-2"}),"Apple silicon"]})]}),(0,x.jsxs)("div",{className:"pt-2 pb-4 flex flex-col",children:[(0,x.jsx)("div",{className:"",children:"Installer for restricted environments:"}),(0,x.jsxs)("div",{className:"flex flex-row justify-center",children:[(0,x.jsxs)(l.Z,{className:"underline inline-flex dark:text-white text-purple-500 hover:text-purple-200 py-2 px-6 font-semibold text-md",to:e.airgapsetupX64,children:[(0,x.jsx)(r.G,{size:"1x",icon:i.q7m,className:"mr-2"}),"Intel"]}),(0,x.jsxs)(l.Z,{className:"underline inline-flex dark:text-white text-purple-500 hover:text-purple-200 py-2 px-6 font-semibold text-md",to:e.airgapsetupArm64,children:[(0,x.jsx)(r.G,{size:"1x",icon:i.q7m,className:"mr-2"}),"Apple silicon"]})]})]}),(0,x.jsx)("div",{className:"flex flex-col align-middle items-center",children:(0,x.jsxs)("div",{className:"items-center text-center pt-6",children:[(0,x.jsxs)("p",{className:"text-lg",children:["Using ",(0,x.jsx)("strong",{children:"Brew"}),"? Install in one command:"]}),(0,x.jsxs)("div",{className:"flex flex-row pt-3",children:[(0,x.jsx)("p",{className:"text-xl p-1",children:(0,x.jsx)(r.G,{size:"sm",icon:i.v8y,className:"mx-1 mt-2"})}),(0,x.jsx)("div",{className:"dark:bg-charcoal-800/50 bg-zinc-300/50 p-1 truncate",children:(0,x.jsxs)("p",{className:"text-xl dark:text-purple-200 text-purple-600",children:[(0,x.jsx)(r.G,{size:"xs",icon:i.Jw3,className:"mx-2 mt-3"}),"brew install podman-desktop",(0,x.jsxs)("button",{title:"Copy To Clipboard",className:"mr-2 p-1",children:[" ",(0,x.jsx)(r.G,{size:"xs",icon:i.O4,className:"ml-3  cursor-pointer text-xl  text-white-500",onClick:()=>{(async()=>{await navigator.clipboard.writeText("brew install podman-desktop")})().catch((e=>{console.error("unable to copy instructions",e)}))}})]})]})})]})]})})]})})]})}function p(){const{siteConfig:e}=(0,n.Z)();return(0,x.jsxs)(c.Z,{title:e.title,description:"Downloads for macOS",children:[(0,x.jsx)(o.Z,{}),(0,x.jsx)("section",{className:"container mx-auto flex justify-center flex-col",children:(0,x.jsxs)("div",{className:"w-full flex flex-col",children:[(0,x.jsx)("h1",{className:"title-font sm:text-3xl text-2xl lg:text-5xl mb-10 font-medium text-gray-900 dark:text-white",children:"macOS Downloads"}),(0,x.jsx)("main",{className:"h-screen",children:(0,x.jsx)(m,{})})]})})]})}},50036:(e,s,t)=>{t.r(s),t.d(s,{WindowsDownloads:()=>m,default:()=>p});var l=t(36641),n=t(50353),a=t(9928),i=t(19374),r=t(92739),o=t(544),c=t(40684),d=t(27378),x=t(24246);function m(){const[e,s]=(0,d.useState)({version:"",binaryX64:"",setupX64:"",airgapsetupX64:"",binaryArm64:"",setupArm64:"",airgapsetupArm64:""});return(0,d.useEffect)((()=>{(async function(e){const s=await fetch("https://api.github.com/repos/containers/podman-desktop/releases/latest"),t=await s.json(),l=t.assets,n=l.filter((e=>e.name.endsWith("-setup-x64.exe")&&!e.name.includes("airgap")));if(1!==n.length)throw new Error("Unable to grab setup.exe");const a=l.filter((e=>e.name.endsWith("-setup-arm64.exe")&&!e.name.includes("airgap"))),i=n?.[0],r=i?.browser_download_url,o=a?.[0],c=o?.browser_download_url,d=l.filter((e=>e.name.endsWith("x64.exe")&&!e.name.includes("airgap")&&e.name!==i?.name)),x=d?.[0]?.browser_download_url,m=l.filter((e=>e.name.endsWith("arm64.exe")&&!e.name.includes("airgap")&&e.name!==o?.name)),p=m?.[0]?.browser_download_url,u=l.filter((e=>e.name.endsWith("-setup-x64.exe")&&e.name.includes("airgap")&&e.name!==i?.name)),h=u?.[0]?.browser_download_url,f=l.filter((e=>e.name.endsWith("-setup-arm64.exe")&&e.name.includes("airgap")&&e.name!==o?.name)),w=f?.[0]?.browser_download_url;e({version:t.name,binaryX64:x,setupX64:r,airgapsetupX64:h,binaryArm64:p,setupArm64:c,airgapsetupArm64:w})})(s).catch((e=>{console.error(e)}))}),[]),(0,x.jsxs)("div",{className:"basis-1/3 py-2 rounded-lg dark:text-gray-400 text-gray-900  bg-zinc-300/25 dark:bg-zinc-700/25 bg-blend-multiply text-center items-center",children:[(0,x.jsx)(r.G,{size:"4x",icon:a.ts2,className:"my-4"}),(0,x.jsx)("h2",{className:"w-full text-center text-4xl title-font font-medium pb-3 border-purple-500 border-b-2",children:"Windows"}),(0,x.jsx)("div",{className:"flex p-1 flex-col md:flex-col items-center align-top",children:(0,x.jsxs)("div",{className:"flex flex-col align-middle items-center",children:[(0,x.jsx)("h3",{className:"mt-0",children:"Podman Desktop for Windows"}),(0,x.jsxs)("div",{className:"pt-8",children:[(0,x.jsxs)(l.Z,{className:"mt-auto no-underline hover:no-underline inline-flex text-white hover:text-white bg-purple-500 border-0 py-2 px-6 focus:outline-none hover:bg-purple-500 rounded text-md font-semibold",to:e.setupX64,children:[(0,x.jsx)(r.G,{size:"1x",icon:i.q7m,className:"mr-2"}),"Download Now"]}),(0,x.jsxs)("caption",{className:"block w-full mt-1 text/50 dark:text-white/50",children:["Windows installer x64, version ",e.version]})]}),(0,x.jsxs)("div",{className:"mt-4",children:[(0,x.jsx)("div",{children:"Other Windows downloads:"}),(0,x.jsxs)("div",{className:"pt-4 pb-4 flex flex-col",children:[(0,x.jsx)("div",{className:"",children:"Installer:"}),(0,x.jsxs)("div",{className:"flex flex-row justify-center",children:[(0,x.jsxs)(l.Z,{className:"underline inline-flex dark:text-white text-purple-500 hover:text-purple-200 py-2 px-3 font-semibold text-md",to:e.setupX64,children:[(0,x.jsx)(r.G,{size:"1x",icon:i.q7m,className:"mr-2"}),"x64"]}),(0,x.jsxs)(l.Z,{className:"underline inline-flex dark:text-white text-purple-500 hover:text-purple-200 py-2 px-3 font-semibold text-md",to:e.setupArm64,children:[(0,x.jsx)(r.G,{size:"1x",icon:i.q7m,className:"mr-2"}),"arm64"]})]})]}),(0,x.jsxs)("div",{className:"pt-2 pb-4 flex flex-col",children:[(0,x.jsx)("div",{className:"",children:"Portable binary:"}),(0,x.jsxs)("div",{className:"flex flex-row justify-center",children:[(0,x.jsxs)(l.Z,{className:"underline inline-flex dark:text-white text-purple-500 hover:text-purple-200 py-2 px-2 font-semibold text-md",to:e.binaryX64,children:[(0,x.jsx)(r.G,{size:"1x",icon:i.q7m,className:"mr-2"}),"x64"]}),(0,x.jsxs)(l.Z,{className:"underline inline-flex dark:text-white text-purple-500 hover:text-purple-200 py-2 px-2 font-semibold text-md",to:e.binaryArm64,children:[(0,x.jsx)(r.G,{size:"1x",icon:i.q7m,className:"mr-2"}),"arm64"]})]})]}),(0,x.jsxs)("div",{className:"pt-2 pb-4 flex flex-col",children:[(0,x.jsx)("div",{className:"",children:"Installer for restricted environments:"}),(0,x.jsxs)("div",{className:"flex flex-row justify-center",children:[(0,x.jsxs)(l.Z,{className:"underline inline-flex dark:text-white text-purple-500 hover:text-purple-200 py-2 px-6 font-semibold text-md",to:e.airgapsetupX64,children:[(0,x.jsx)(r.G,{size:"1x",icon:i.q7m,className:"mr-2"}),"x64"]}),(0,x.jsxs)(l.Z,{className:"underline inline-flex dark:text-white text-purple-500 hover:text-purple-200 py-2 px-6 font-semibold text-md",to:e.airgapsetupArm64,children:[(0,x.jsx)(r.G,{size:"1x",icon:i.q7m,className:"mr-2"}),"arm64"]})]})]}),(0,x.jsxs)(l.Z,{className:"underline inline-flex dark:text-white text-purple-500 hover:text-purple-200 py-2 px-6 font-semibold text-md",to:"/docs/installation/windows-install",children:[(0,x.jsx)(r.G,{size:"1x",icon:a.ts2,className:"mr-2"}),"Package Managers Guide"]})]}),(0,x.jsx)("div",{className:"flex flex-col align-middle items-center",children:(0,x.jsxs)("div",{className:"items-center text-center pt-6",children:[(0,x.jsxs)("p",{className:"text-lg",children:["Using ",(0,x.jsx)("strong",{children:"winget"}),"? Install in one command:"]}),(0,x.jsxs)("div",{className:"flex flex-row pt-3",children:[(0,x.jsx)("p",{className:"text-xl p-1",children:(0,x.jsx)(r.G,{size:"sm",icon:a.hVS,className:"mx-1 mt-2"})}),(0,x.jsxs)("div",{className:"dark:bg-charcoal-800/50 bg-zinc-300/50 p-1 text-xl dark:text-purple-200 text-purple-600 flex flex-row",children:[(0,x.jsxs)("div",{className:"w-72 truncate",children:[(0,x.jsx)(r.G,{size:"xs",icon:i.Jw3,className:"mx-2 mt-3"}),"winget install -e --id RedHat.Podman-Desktop"]}),(0,x.jsx)("div",{children:(0,x.jsxs)("button",{title:"Copy To Clipboard",className:"mr-2 p-1",children:[" ",(0,x.jsx)(r.G,{size:"xs",icon:i.O4,className:"ml-3  cursor-pointer text-xl  text-white-500",onClick:()=>{(async()=>{await navigator.clipboard.writeText("winget install -e --id RedHat.Podman-Desktop")})().catch((e=>{console.error("unable to copy instructions",e)}))}})]})})]})]})]})})]})})]})}function p(){const{siteConfig:e}=(0,n.Z)();return(0,x.jsxs)(c.Z,{title:e.title,description:"Downloads for Windows",children:[(0,x.jsx)(o.Z,{}),(0,x.jsx)("section",{className:"container mx-auto flex justify-center flex-col",children:(0,x.jsxs)("div",{className:"w-full flex flex-col",children:[(0,x.jsx)("h1",{className:"title-font sm:text-3xl text-2xl lg:text-5xl mb-10 font-medium text-gray-900 dark:text-white",children:"Windows Downloads"}),(0,x.jsx)("main",{className:"h-screen",children:(0,x.jsx)(m,{})})]})})]})}}}]);