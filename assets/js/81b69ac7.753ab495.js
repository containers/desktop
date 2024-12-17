"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[33582],{10099:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>c,contentTitle:()=>s,default:()=>h,frontMatter:()=>o,metadata:()=>r,toc:()=>a});const r=JSON.parse('{"id":"interfaces/KubernetesProviderConnectionFactory","title":"Interface: KubernetesProviderConnectionFactory","description":"Extends","source":"@site/api/interfaces/KubernetesProviderConnectionFactory.md","sourceDirName":"interfaces","slug":"/interfaces/KubernetesProviderConnectionFactory","permalink":"/api/interfaces/KubernetesProviderConnectionFactory","draft":false,"unlisted":false,"tags":[],"version":"current","frontMatter":{},"sidebar":"typedocSidebar","previous":{"title":"KubernetesProviderConnectionEndpoint","permalink":"/api/interfaces/KubernetesProviderConnectionEndpoint"},"next":{"title":"LifecycleContext","permalink":"/api/interfaces/LifecycleContext"}}');var d=i(62540),t=i(43023);const o={},s="Interface: KubernetesProviderConnectionFactory",c={},a=[{value:"Extends",id:"extends",level:2},{value:"Properties",id:"properties",level:2},{value:"creationButtonTitle?",id:"creationbuttontitle",level:3},{value:"Inherited from",id:"inherited-from",level:4},{value:"Defined in",id:"defined-in",level:4},{value:"creationDisplayName?",id:"creationdisplayname",level:3},{value:"Inherited from",id:"inherited-from-1",level:4},{value:"Defined in",id:"defined-in-1",level:4},{value:"Methods",id:"methods",level:2},{value:"create()?",id:"create",level:3},{value:"Parameters",id:"parameters",level:4},{value:"params",id:"params",level:5},{value:"logger?",id:"logger",level:5},{value:"token?",id:"token",level:5},{value:"Returns",id:"returns",level:4},{value:"Defined in",id:"defined-in-2",level:4},{value:"initialize()?",id:"initialize",level:3},{value:"Returns",id:"returns-1",level:4},{value:"Inherited from",id:"inherited-from-2",level:4},{value:"Defined in",id:"defined-in-3",level:4}];function l(e){const n={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",h5:"h5",header:"header",hr:"hr",li:"li",p:"p",strong:"strong",ul:"ul",...(0,t.R)(),...e.components};return(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(n.header,{children:(0,d.jsx)(n.h1,{id:"interface-kubernetesproviderconnectionfactory",children:"Interface: KubernetesProviderConnectionFactory"})}),"\n",(0,d.jsx)(n.h2,{id:"extends",children:"Extends"}),"\n",(0,d.jsxs)(n.ul,{children:["\n",(0,d.jsx)(n.li,{children:(0,d.jsx)(n.a,{href:"/api/interfaces/ProviderConnectionFactory",children:(0,d.jsx)(n.code,{children:"ProviderConnectionFactory"})})}),"\n"]}),"\n",(0,d.jsx)(n.h2,{id:"properties",children:"Properties"}),"\n",(0,d.jsx)(n.h3,{id:"creationbuttontitle",children:"creationButtonTitle?"}),"\n",(0,d.jsxs)(n.blockquote,{children:["\n",(0,d.jsxs)(n.p,{children:[(0,d.jsx)(n.code,{children:"optional"})," ",(0,d.jsx)(n.strong,{children:"creationButtonTitle"}),": ",(0,d.jsx)(n.code,{children:"string"})]}),"\n"]}),"\n",(0,d.jsx)(n.h4,{id:"inherited-from",children:"Inherited from"}),"\n",(0,d.jsxs)(n.p,{children:[(0,d.jsx)(n.a,{href:"/api/interfaces/ProviderConnectionFactory",children:(0,d.jsx)(n.code,{children:"ProviderConnectionFactory"})}),".",(0,d.jsx)(n.a,{href:"/api/interfaces/ProviderConnectionFactory#creationbuttontitle",children:(0,d.jsx)(n.code,{children:"creationButtonTitle"})})]}),"\n",(0,d.jsx)(n.h4,{id:"defined-in",children:"Defined in"}),"\n",(0,d.jsx)(n.p,{children:(0,d.jsx)(n.a,{href:"https://github.com/podman-desktop/podman-desktop/blob/5a43945d1d92ad67b8b8b76f2cd096ae2a232ddc/packages/extension-api/src/extension-api.d.ts#L537",children:"packages/extension-api/src/extension-api.d.ts:537"})}),"\n",(0,d.jsx)(n.hr,{}),"\n",(0,d.jsx)(n.h3,{id:"creationdisplayname",children:"creationDisplayName?"}),"\n",(0,d.jsxs)(n.blockquote,{children:["\n",(0,d.jsxs)(n.p,{children:[(0,d.jsx)(n.code,{children:"optional"})," ",(0,d.jsx)(n.strong,{children:"creationDisplayName"}),": ",(0,d.jsx)(n.code,{children:"string"})]}),"\n"]}),"\n",(0,d.jsx)(n.h4,{id:"inherited-from-1",children:"Inherited from"}),"\n",(0,d.jsxs)(n.p,{children:[(0,d.jsx)(n.a,{href:"/api/interfaces/ProviderConnectionFactory",children:(0,d.jsx)(n.code,{children:"ProviderConnectionFactory"})}),".",(0,d.jsx)(n.a,{href:"/api/interfaces/ProviderConnectionFactory#creationdisplayname",children:(0,d.jsx)(n.code,{children:"creationDisplayName"})})]}),"\n",(0,d.jsx)(n.h4,{id:"defined-in-1",children:"Defined in"}),"\n",(0,d.jsx)(n.p,{children:(0,d.jsx)(n.a,{href:"https://github.com/podman-desktop/podman-desktop/blob/5a43945d1d92ad67b8b8b76f2cd096ae2a232ddc/packages/extension-api/src/extension-api.d.ts#L534",children:"packages/extension-api/src/extension-api.d.ts:534"})}),"\n",(0,d.jsx)(n.h2,{id:"methods",children:"Methods"}),"\n",(0,d.jsx)(n.h3,{id:"create",children:"create()?"}),"\n",(0,d.jsxs)(n.blockquote,{children:["\n",(0,d.jsxs)(n.p,{children:[(0,d.jsx)(n.code,{children:"optional"})," ",(0,d.jsx)(n.strong,{children:"create"}),"(",(0,d.jsx)(n.code,{children:"params"}),", ",(0,d.jsx)(n.code,{children:"logger"}),"?, ",(0,d.jsx)(n.code,{children:"token"}),"?): ",(0,d.jsx)(n.code,{children:"Promise"}),"<",(0,d.jsx)(n.code,{children:"void"}),">"]}),"\n"]}),"\n",(0,d.jsx)(n.h4,{id:"parameters",children:"Parameters"}),"\n",(0,d.jsx)(n.h5,{id:"params",children:"params"}),"\n",(0,d.jsx)(n.h5,{id:"logger",children:"logger?"}),"\n",(0,d.jsx)(n.p,{children:(0,d.jsx)(n.a,{href:"/api/interfaces/Logger",children:(0,d.jsx)(n.code,{children:"Logger"})})}),"\n",(0,d.jsx)(n.h5,{id:"token",children:"token?"}),"\n",(0,d.jsx)(n.p,{children:(0,d.jsx)(n.a,{href:"/api/interfaces/CancellationToken",children:(0,d.jsx)(n.code,{children:"CancellationToken"})})}),"\n",(0,d.jsx)(n.h4,{id:"returns",children:"Returns"}),"\n",(0,d.jsxs)(n.p,{children:[(0,d.jsx)(n.code,{children:"Promise"}),"<",(0,d.jsx)(n.code,{children:"void"}),">"]}),"\n",(0,d.jsx)(n.h4,{id:"defined-in-2",children:"Defined in"}),"\n",(0,d.jsx)(n.p,{children:(0,d.jsx)(n.a,{href:"https://github.com/podman-desktop/podman-desktop/blob/5a43945d1d92ad67b8b8b76f2cd096ae2a232ddc/packages/extension-api/src/extension-api.d.ts#L549",children:"packages/extension-api/src/extension-api.d.ts:549"})}),"\n",(0,d.jsx)(n.hr,{}),"\n",(0,d.jsx)(n.h3,{id:"initialize",children:"initialize()?"}),"\n",(0,d.jsxs)(n.blockquote,{children:["\n",(0,d.jsxs)(n.p,{children:[(0,d.jsx)(n.code,{children:"optional"})," ",(0,d.jsx)(n.strong,{children:"initialize"}),"(): ",(0,d.jsx)(n.code,{children:"Promise"}),"<",(0,d.jsx)(n.code,{children:"void"}),">"]}),"\n"]}),"\n",(0,d.jsx)(n.h4,{id:"returns-1",children:"Returns"}),"\n",(0,d.jsxs)(n.p,{children:[(0,d.jsx)(n.code,{children:"Promise"}),"<",(0,d.jsx)(n.code,{children:"void"}),">"]}),"\n",(0,d.jsx)(n.h4,{id:"inherited-from-2",children:"Inherited from"}),"\n",(0,d.jsxs)(n.p,{children:[(0,d.jsx)(n.a,{href:"/api/interfaces/ProviderConnectionFactory",children:(0,d.jsx)(n.code,{children:"ProviderConnectionFactory"})}),".",(0,d.jsx)(n.a,{href:"/api/interfaces/ProviderConnectionFactory#initialize",children:(0,d.jsx)(n.code,{children:"initialize"})})]}),"\n",(0,d.jsx)(n.h4,{id:"defined-in-3",children:"Defined in"}),"\n",(0,d.jsx)(n.p,{children:(0,d.jsx)(n.a,{href:"https://github.com/podman-desktop/podman-desktop/blob/5a43945d1d92ad67b8b8b76f2cd096ae2a232ddc/packages/extension-api/src/extension-api.d.ts#L531",children:"packages/extension-api/src/extension-api.d.ts:531"})})]})}function h(e={}){const{wrapper:n}={...(0,t.R)(),...e.components};return n?(0,d.jsx)(n,{...e,children:(0,d.jsx)(l,{...e})}):l(e)}},43023:(e,n,i)=>{i.d(n,{R:()=>o,x:()=>s});var r=i(63696);const d={},t=r.createContext(d);function o(e){const n=r.useContext(t);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function s(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(d):e.components||d:o(e.components),r.createElement(t.Provider,{value:n},e.children)}}}]);