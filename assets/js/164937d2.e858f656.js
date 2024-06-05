"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[5477],{64010:(e,n,r)=>{r.r(n),r.d(n,{assets:()=>o,contentTitle:()=>c,default:()=>h,frontMatter:()=>i,metadata:()=>d,toc:()=>a});var s=r(24246),t=r(71670);const i={},c="Interface: SecretStorage",d={id:"interfaces/SecretStorage",title:"Interface: SecretStorage",description:"Represents a storage utility for secrets, information that is",source:"@site/api/interfaces/SecretStorage.md",sourceDirName:"interfaces",slug:"/interfaces/SecretStorage",permalink:"/api/interfaces/SecretStorage",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{},sidebar:"typedocSidebar",previous:{title:"SaveDialogOptions",permalink:"/api/interfaces/SaveDialogOptions"},next:{title:"SecretStorageChangeEvent",permalink:"/api/interfaces/SecretStorageChangeEvent"}},o={},a=[{value:"Properties",id:"properties",level:2},{value:"onDidChange",id:"ondidchange",level:3},{value:"Source",id:"source",level:4},{value:"Methods",id:"methods",level:2},{value:"delete()",id:"delete",level:3},{value:"Parameters",id:"parameters",level:4},{value:"Returns",id:"returns",level:4},{value:"Source",id:"source-1",level:4},{value:"get()",id:"get",level:3},{value:"Parameters",id:"parameters-1",level:4},{value:"Returns",id:"returns-1",level:4},{value:"Source",id:"source-2",level:4},{value:"store()",id:"store",level:3},{value:"Parameters",id:"parameters-2",level:4},{value:"Returns",id:"returns-2",level:4},{value:"Source",id:"source-3",level:4}];function l(e){const n={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",hr:"hr",p:"p",strong:"strong",...(0,t.a)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.h1,{id:"interface-secretstorage",children:"Interface: SecretStorage"}),"\n",(0,s.jsx)(n.p,{children:"Represents a storage utility for secrets, information that is\nsensitive."}),"\n",(0,s.jsx)(n.h2,{id:"properties",children:"Properties"}),"\n",(0,s.jsx)(n.h3,{id:"ondidchange",children:"onDidChange"}),"\n",(0,s.jsxs)(n.blockquote,{children:["\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.strong,{children:"onDidChange"}),": ",(0,s.jsx)(n.a,{href:"/api/interfaces/Event",children:(0,s.jsx)(n.code,{children:"Event"})})," <",(0,s.jsx)(n.a,{href:"/api/interfaces/SecretStorageChangeEvent",children:(0,s.jsx)(n.code,{children:"SecretStorageChangeEvent"})}),">"]}),"\n"]}),"\n",(0,s.jsx)(n.p,{children:"Fires when a secret is stored or deleted."}),"\n",(0,s.jsx)(n.h4,{id:"source",children:"Source"}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.a,{href:"https://github.com/containers/podman-desktop/blob/6b93dc5d129d3e3fd8c5f303d5f460805c4b6b65/packages/extension-api/src/extension-api.d.ts#L4276",children:"packages/extension-api/src/extension-api.d.ts:4276"})}),"\n",(0,s.jsx)(n.h2,{id:"methods",children:"Methods"}),"\n",(0,s.jsx)(n.h3,{id:"delete",children:"delete()"}),"\n",(0,s.jsxs)(n.blockquote,{children:["\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.strong,{children:"delete"}),"(",(0,s.jsx)(n.code,{children:"key"}),"): ",(0,s.jsx)(n.code,{children:"Promise"}),"<",(0,s.jsx)(n.code,{children:"void"}),">"]}),"\n"]}),"\n",(0,s.jsx)(n.p,{children:"Remove a secret from storage."}),"\n",(0,s.jsx)(n.h4,{id:"parameters",children:"Parameters"}),"\n",(0,s.jsxs)(n.p,{children:["\u2022 ",(0,s.jsx)(n.strong,{children:"key"}),": ",(0,s.jsx)(n.code,{children:"string"})]}),"\n",(0,s.jsx)(n.p,{children:"The key the secret was stored under."}),"\n",(0,s.jsx)(n.h4,{id:"returns",children:"Returns"}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.code,{children:"Promise"}),"<",(0,s.jsx)(n.code,{children:"void"}),">"]}),"\n",(0,s.jsx)(n.h4,{id:"source-1",children:"Source"}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.a,{href:"https://github.com/containers/podman-desktop/blob/6b93dc5d129d3e3fd8c5f303d5f460805c4b6b65/packages/extension-api/src/extension-api.d.ts#L4271",children:"packages/extension-api/src/extension-api.d.ts:4271"})}),"\n",(0,s.jsx)(n.hr,{}),"\n",(0,s.jsx)(n.h3,{id:"get",children:"get()"}),"\n",(0,s.jsxs)(n.blockquote,{children:["\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.strong,{children:"get"}),"(",(0,s.jsx)(n.code,{children:"key"}),"): ",(0,s.jsx)(n.code,{children:"Promise"}),"<",(0,s.jsx)(n.code,{children:"undefined"})," | ",(0,s.jsx)(n.code,{children:"string"}),">"]}),"\n"]}),"\n",(0,s.jsx)(n.p,{children:"Retrieve a secret that was stored with key. Returns undefined if there\nis no secret matching that key."}),"\n",(0,s.jsx)(n.h4,{id:"parameters-1",children:"Parameters"}),"\n",(0,s.jsxs)(n.p,{children:["\u2022 ",(0,s.jsx)(n.strong,{children:"key"}),": ",(0,s.jsx)(n.code,{children:"string"})]}),"\n",(0,s.jsx)(n.p,{children:"The key the secret was stored under."}),"\n",(0,s.jsx)(n.h4,{id:"returns-1",children:"Returns"}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.code,{children:"Promise"}),"<",(0,s.jsx)(n.code,{children:"undefined"})," | ",(0,s.jsx)(n.code,{children:"string"}),">"]}),"\n",(0,s.jsxs)(n.p,{children:["The stored value or ",(0,s.jsx)(n.code,{children:"undefined"}),"."]}),"\n",(0,s.jsx)(n.h4,{id:"source-2",children:"Source"}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.a,{href:"https://github.com/containers/podman-desktop/blob/6b93dc5d129d3e3fd8c5f303d5f460805c4b6b65/packages/extension-api/src/extension-api.d.ts#L4258",children:"packages/extension-api/src/extension-api.d.ts:4258"})}),"\n",(0,s.jsx)(n.hr,{}),"\n",(0,s.jsx)(n.h3,{id:"store",children:"store()"}),"\n",(0,s.jsxs)(n.blockquote,{children:["\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.strong,{children:"store"}),"(",(0,s.jsx)(n.code,{children:"key"}),", ",(0,s.jsx)(n.code,{children:"value"}),"): ",(0,s.jsx)(n.code,{children:"Promise"}),"<",(0,s.jsx)(n.code,{children:"void"}),">"]}),"\n"]}),"\n",(0,s.jsx)(n.p,{children:"Store a secret under a given key."}),"\n",(0,s.jsx)(n.h4,{id:"parameters-2",children:"Parameters"}),"\n",(0,s.jsxs)(n.p,{children:["\u2022 ",(0,s.jsx)(n.strong,{children:"key"}),": ",(0,s.jsx)(n.code,{children:"string"})]}),"\n",(0,s.jsx)(n.p,{children:"The key to store the secret under."}),"\n",(0,s.jsxs)(n.p,{children:["\u2022 ",(0,s.jsx)(n.strong,{children:"value"}),": ",(0,s.jsx)(n.code,{children:"string"})]}),"\n",(0,s.jsx)(n.p,{children:"The secret."}),"\n",(0,s.jsx)(n.h4,{id:"returns-2",children:"Returns"}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.code,{children:"Promise"}),"<",(0,s.jsx)(n.code,{children:"void"}),">"]}),"\n",(0,s.jsx)(n.h4,{id:"source-3",children:"Source"}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.a,{href:"https://github.com/containers/podman-desktop/blob/6b93dc5d129d3e3fd8c5f303d5f460805c4b6b65/packages/extension-api/src/extension-api.d.ts#L4265",children:"packages/extension-api/src/extension-api.d.ts:4265"})})]})}function h(e={}){const{wrapper:n}={...(0,t.a)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(l,{...e})}):l(e)}},71670:(e,n,r)=>{r.d(n,{Z:()=>d,a:()=>c});var s=r(27378);const t={},i=s.createContext(t);function c(e){const n=s.useContext(i);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function d(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:c(e.components),s.createElement(i.Provider,{value:n},e.children)}}}]);