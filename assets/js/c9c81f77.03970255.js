"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[28697],{71736:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>d,contentTitle:()=>o,default:()=>m,frontMatter:()=>r,metadata:()=>s,toc:()=>c});const s=JSON.parse('{"id":"namespaces/navigation/functions/register","title":"Function: register()","description":"register(routeId, commandId): Disposable","source":"@site/api/namespaces/navigation/functions/register.md","sourceDirName":"namespaces/navigation/functions","slug":"/namespaces/navigation/functions/register","permalink":"/api/namespaces/navigation/functions/register","draft":false,"unlisted":false,"tags":[],"version":"current","frontMatter":{},"sidebar":"typedocSidebar","previous":{"title":"navigateToWebview","permalink":"/api/namespaces/navigation/functions/navigateToWebview"},"next":{"title":"process","permalink":"/api/namespaces/process/"}}');var t=i(62540),a=i(43023);const r={},o="Function: register()",d={},c=[{value:"Parameters",id:"parameters",level:2},{value:"routeId",id:"routeid",level:3},{value:"commandId",id:"commandid",level:3},{value:"Returns",id:"returns",level:2},{value:"Remarks",id:"remarks",level:2},{value:"Example",id:"example",level:2},{value:"Defined in",id:"defined-in",level:2}];function l(e){const n={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",p:"p",pre:"pre",strong:"strong",...(0,a.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.header,{children:(0,t.jsx)(n.h1,{id:"function-register",children:"Function: register()"})}),"\n",(0,t.jsxs)(n.blockquote,{children:["\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.strong,{children:"register"}),"(",(0,t.jsx)(n.code,{children:"routeId"}),", ",(0,t.jsx)(n.code,{children:"commandId"}),"): ",(0,t.jsx)(n.a,{href:"/api/classes/Disposable",children:(0,t.jsx)(n.code,{children:"Disposable"})})]}),"\n"]}),"\n",(0,t.jsx)(n.p,{children:"Allow to define custom route for an extension."}),"\n",(0,t.jsx)(n.h2,{id:"parameters",children:"Parameters"}),"\n",(0,t.jsx)(n.h3,{id:"routeid",children:"routeId"}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.code,{children:"string"})}),"\n",(0,t.jsxs)(n.p,{children:["a unique string value that could be used in ",(0,t.jsx)(n.a,{href:"/api/namespaces/navigation/functions/navigate",children:"navigation.navigate"})]}),"\n",(0,t.jsx)(n.h3,{id:"commandid",children:"commandId"}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.code,{children:"string"})}),"\n",(0,t.jsx)(n.p,{children:"the command that will be executed on navigate"}),"\n",(0,t.jsx)(n.h2,{id:"returns",children:"Returns"}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.a,{href:"/api/classes/Disposable",children:(0,t.jsx)(n.code,{children:"Disposable"})})}),"\n",(0,t.jsx)(n.h2,{id:"remarks",children:"Remarks"}),"\n",(0,t.jsxs)(n.p,{children:["The commandId used must have been registered through ",(0,t.jsx)(n.a,{href:"/api/namespaces/commands/functions/registerCommand",children:"commands.registerCommand"})]}),"\n",(0,t.jsx)(n.h2,{id:"example",children:"Example"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-ts",children:"import { navigation, commands } from '@podman-desktop/api';\n\ncommands.registerCommand('redirect-download-command', (trackingId: string) => {\n  // todo: do something with the trackingId\n});\n\n// register the route\nnavigation.register('download-page', 'redirect-download-command');\n\n// when needed call the navigate with the route id registered to\n// trigger the command\nnavigation.navigate('download-page', 'dummy-tracking-id');\n"})}),"\n",(0,t.jsx)(n.h2,{id:"defined-in",children:"Defined in"}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.a,{href:"https://github.com/podman-desktop/podman-desktop/blob/6164319e090e3e7bd13096df61c715490f2f6c45/packages/extension-api/src/extension-api.d.ts#L4833",children:"packages/extension-api/src/extension-api.d.ts:4833"})})]})}function m(e={}){const{wrapper:n}={...(0,a.R)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(l,{...e})}):l(e)}},43023:(e,n,i)=>{i.d(n,{R:()=>r,x:()=>o});var s=i(63696);const t={},a=s.createContext(t);function r(e){const n=s.useContext(a);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function o(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:r(e.components),s.createElement(a.Provider,{value:n},e.children)}}}]);