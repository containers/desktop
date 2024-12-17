"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[70423],{61554:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>a,contentTitle:()=>h,default:()=>o,frontMatter:()=>t,metadata:()=>i,toc:()=>c});const i=JSON.parse('{"id":"classes/Uri","title":"Class: Uri","description":"Resource identifier for a resource","source":"@site/api/classes/Uri.md","sourceDirName":"classes","slug":"/classes/Uri","permalink":"/api/classes/Uri","draft":false,"unlisted":false,"tags":[],"version":"current","frontMatter":{},"sidebar":"typedocSidebar","previous":{"title":"TelemetryTrustedValue","permalink":"/api/classes/TelemetryTrustedValue"},"next":{"title":"Auditor","permalink":"/api/interfaces/Auditor"}}');var d=s(62540),r=s(43023);const t={},h="Class: Uri",a={},c=[{value:"Properties",id:"properties",level:2},{value:"authority",id:"authority",level:3},{value:"Defined in",id:"defined-in",level:4},{value:"fragment",id:"fragment",level:3},{value:"Defined in",id:"defined-in-1",level:4},{value:"fsPath",id:"fspath",level:3},{value:"Defined in",id:"defined-in-2",level:4},{value:"path",id:"path",level:3},{value:"Defined in",id:"defined-in-3",level:4},{value:"query",id:"query",level:3},{value:"Defined in",id:"defined-in-4",level:4},{value:"scheme",id:"scheme",level:3},{value:"Defined in",id:"defined-in-5",level:4},{value:"Methods",id:"methods",level:2},{value:"toString()",id:"tostring",level:3},{value:"Returns",id:"returns",level:4},{value:"Defined in",id:"defined-in-6",level:4},{value:"with()",id:"with",level:3},{value:"Parameters",id:"parameters",level:4},{value:"change",id:"change",level:5},{value:"authority",id:"authority-1",level:6},{value:"fragment",id:"fragment-1",level:6},{value:"path",id:"path-1",level:6},{value:"query",id:"query-1",level:6},{value:"scheme",id:"scheme-1",level:6},{value:"Returns",id:"returns-1",level:4},{value:"Defined in",id:"defined-in-7",level:4},{value:"file()",id:"file",level:3},{value:"Parameters",id:"parameters-1",level:4},{value:"path",id:"path-2",level:5},{value:"Returns",id:"returns-2",level:4},{value:"Defined in",id:"defined-in-8",level:4},{value:"joinPath()",id:"joinpath",level:3},{value:"Parameters",id:"parameters-2",level:4},{value:"base",id:"base",level:5},{value:"pathSegments",id:"pathsegments",level:5},{value:"Returns",id:"returns-3",level:4},{value:"Defined in",id:"defined-in-9",level:4},{value:"parse()",id:"parse",level:3},{value:"Parameters",id:"parameters-3",level:4},{value:"value",id:"value",level:5},{value:"strict?",id:"strict",level:5},{value:"Returns",id:"returns-4",level:4},{value:"See",id:"see",level:4},{value:"Defined in",id:"defined-in-10",level:4}];function l(e){const n={a:"a",blockquote:"blockquote",code:"code",em:"em",h1:"h1",h2:"h2",h3:"h3",h4:"h4",h5:"h5",h6:"h6",header:"header",hr:"hr",p:"p",pre:"pre",strong:"strong",...(0,r.R)(),...e.components};return(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(n.header,{children:(0,d.jsx)(n.h1,{id:"class-uri",children:"Class: Uri"})}),"\n",(0,d.jsx)(n.p,{children:"Resource identifier for a resource"}),"\n",(0,d.jsx)(n.h2,{id:"properties",children:"Properties"}),"\n",(0,d.jsx)(n.h3,{id:"authority",children:"authority"}),"\n",(0,d.jsxs)(n.blockquote,{children:["\n",(0,d.jsxs)(n.p,{children:[(0,d.jsx)(n.code,{children:"readonly"})," ",(0,d.jsx)(n.strong,{children:"authority"}),": ",(0,d.jsx)(n.code,{children:"string"})]}),"\n"]}),"\n",(0,d.jsxs)(n.p,{children:["Authority is the ",(0,d.jsx)(n.code,{children:"www.example.com"})," part of ",(0,d.jsx)(n.code,{children:"http://www.example.com/some/path?query#fragment"}),".\nThe part between the first double slashes and the next slash."]}),"\n",(0,d.jsx)(n.h4,{id:"defined-in",children:"Defined in"}),"\n",(0,d.jsx)(n.p,{children:(0,d.jsx)(n.a,{href:"https://github.com/podman-desktop/podman-desktop/blob/5a43945d1d92ad67b8b8b76f2cd096ae2a232ddc/packages/extension-api/src/extension-api.d.ts#L1832",children:"packages/extension-api/src/extension-api.d.ts:1832"})}),"\n",(0,d.jsx)(n.hr,{}),"\n",(0,d.jsx)(n.h3,{id:"fragment",children:"fragment"}),"\n",(0,d.jsxs)(n.blockquote,{children:["\n",(0,d.jsxs)(n.p,{children:[(0,d.jsx)(n.code,{children:"readonly"})," ",(0,d.jsx)(n.strong,{children:"fragment"}),": ",(0,d.jsx)(n.code,{children:"string"})]}),"\n"]}),"\n",(0,d.jsxs)(n.p,{children:["Fragment is the ",(0,d.jsx)(n.code,{children:"fragment"})," part of ",(0,d.jsx)(n.code,{children:"http://www.example.com/some/path?query#fragment"}),"."]}),"\n",(0,d.jsx)(n.h4,{id:"defined-in-1",children:"Defined in"}),"\n",(0,d.jsx)(n.p,{children:(0,d.jsx)(n.a,{href:"https://github.com/podman-desktop/podman-desktop/blob/5a43945d1d92ad67b8b8b76f2cd096ae2a232ddc/packages/extension-api/src/extension-api.d.ts#L1852",children:"packages/extension-api/src/extension-api.d.ts:1852"})}),"\n",(0,d.jsx)(n.hr,{}),"\n",(0,d.jsx)(n.h3,{id:"fspath",children:"fsPath"}),"\n",(0,d.jsxs)(n.blockquote,{children:["\n",(0,d.jsxs)(n.p,{children:[(0,d.jsx)(n.code,{children:"readonly"})," ",(0,d.jsx)(n.strong,{children:"fsPath"}),": ",(0,d.jsx)(n.code,{children:"string"})]}),"\n"]}),"\n",(0,d.jsx)(n.p,{children:"The string representing the corresponding file system path of this Uri."}),"\n",(0,d.jsx)(n.h4,{id:"defined-in-2",children:"Defined in"}),"\n",(0,d.jsx)(n.p,{children:(0,d.jsx)(n.a,{href:"https://github.com/podman-desktop/podman-desktop/blob/5a43945d1d92ad67b8b8b76f2cd096ae2a232ddc/packages/extension-api/src/extension-api.d.ts#L1842",children:"packages/extension-api/src/extension-api.d.ts:1842"})}),"\n",(0,d.jsx)(n.hr,{}),"\n",(0,d.jsx)(n.h3,{id:"path",children:"path"}),"\n",(0,d.jsxs)(n.blockquote,{children:["\n",(0,d.jsxs)(n.p,{children:[(0,d.jsx)(n.code,{children:"readonly"})," ",(0,d.jsx)(n.strong,{children:"path"}),": ",(0,d.jsx)(n.code,{children:"string"})]}),"\n"]}),"\n",(0,d.jsxs)(n.p,{children:["Path is the ",(0,d.jsx)(n.code,{children:"/some/path"})," part of ",(0,d.jsx)(n.code,{children:"http://www.example.com/some/path?query#fragment"}),"."]}),"\n",(0,d.jsx)(n.h4,{id:"defined-in-3",children:"Defined in"}),"\n",(0,d.jsx)(n.p,{children:(0,d.jsx)(n.a,{href:"https://github.com/podman-desktop/podman-desktop/blob/5a43945d1d92ad67b8b8b76f2cd096ae2a232ddc/packages/extension-api/src/extension-api.d.ts#L1837",children:"packages/extension-api/src/extension-api.d.ts:1837"})}),"\n",(0,d.jsx)(n.hr,{}),"\n",(0,d.jsx)(n.h3,{id:"query",children:"query"}),"\n",(0,d.jsxs)(n.blockquote,{children:["\n",(0,d.jsxs)(n.p,{children:[(0,d.jsx)(n.code,{children:"readonly"})," ",(0,d.jsx)(n.strong,{children:"query"}),": ",(0,d.jsx)(n.code,{children:"string"})]}),"\n"]}),"\n",(0,d.jsxs)(n.p,{children:["Query is the ",(0,d.jsx)(n.code,{children:"query"})," part of ",(0,d.jsx)(n.code,{children:"http://www.example.com/some/path?query#fragment"}),"."]}),"\n",(0,d.jsx)(n.h4,{id:"defined-in-4",children:"Defined in"}),"\n",(0,d.jsx)(n.p,{children:(0,d.jsx)(n.a,{href:"https://github.com/podman-desktop/podman-desktop/blob/5a43945d1d92ad67b8b8b76f2cd096ae2a232ddc/packages/extension-api/src/extension-api.d.ts#L1847",children:"packages/extension-api/src/extension-api.d.ts:1847"})}),"\n",(0,d.jsx)(n.hr,{}),"\n",(0,d.jsx)(n.h3,{id:"scheme",children:"scheme"}),"\n",(0,d.jsxs)(n.blockquote,{children:["\n",(0,d.jsxs)(n.p,{children:[(0,d.jsx)(n.code,{children:"readonly"})," ",(0,d.jsx)(n.strong,{children:"scheme"}),": ",(0,d.jsx)(n.code,{children:"string"})]}),"\n"]}),"\n",(0,d.jsxs)(n.p,{children:["Scheme is the ",(0,d.jsx)(n.code,{children:"http"})," part of ",(0,d.jsx)(n.code,{children:"http://www.example.com/some/path?query#fragment"}),".\nThe part before the first colon."]}),"\n",(0,d.jsx)(n.h4,{id:"defined-in-5",children:"Defined in"}),"\n",(0,d.jsx)(n.p,{children:(0,d.jsx)(n.a,{href:"https://github.com/podman-desktop/podman-desktop/blob/5a43945d1d92ad67b8b8b76f2cd096ae2a232ddc/packages/extension-api/src/extension-api.d.ts#L1826",children:"packages/extension-api/src/extension-api.d.ts:1826"})}),"\n",(0,d.jsx)(n.h2,{id:"methods",children:"Methods"}),"\n",(0,d.jsx)(n.h3,{id:"tostring",children:"toString()"}),"\n",(0,d.jsxs)(n.blockquote,{children:["\n",(0,d.jsxs)(n.p,{children:[(0,d.jsx)(n.strong,{children:"toString"}),"(): ",(0,d.jsx)(n.code,{children:"string"})]}),"\n"]}),"\n",(0,d.jsx)(n.h4,{id:"returns",children:"Returns"}),"\n",(0,d.jsx)(n.p,{children:(0,d.jsx)(n.code,{children:"string"})}),"\n",(0,d.jsx)(n.h4,{id:"defined-in-6",children:"Defined in"}),"\n",(0,d.jsx)(n.p,{children:(0,d.jsx)(n.a,{href:"https://github.com/podman-desktop/podman-desktop/blob/5a43945d1d92ad67b8b8b76f2cd096ae2a232ddc/packages/extension-api/src/extension-api.d.ts#L1891",children:"packages/extension-api/src/extension-api.d.ts:1891"})}),"\n",(0,d.jsx)(n.hr,{}),"\n",(0,d.jsx)(n.h3,{id:"with",children:"with()"}),"\n",(0,d.jsxs)(n.blockquote,{children:["\n",(0,d.jsxs)(n.p,{children:[(0,d.jsx)(n.strong,{children:"with"}),"(",(0,d.jsx)(n.code,{children:"change"}),"): ",(0,d.jsx)(n.a,{href:"/api/classes/Uri",children:(0,d.jsx)(n.code,{children:"Uri"})})]}),"\n"]}),"\n",(0,d.jsx)(n.p,{children:"Derive a new Uri from this Uri."}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-ts",children:"const foo = Uri.parse('http://foo');\nconst httpsFoo = foo.with({ scheme: 'https' });\n// httpsFoo is now 'https://foo'\n"})}),"\n",(0,d.jsx)(n.h4,{id:"parameters",children:"Parameters"}),"\n",(0,d.jsx)(n.h5,{id:"change",children:"change"}),"\n",(0,d.jsxs)(n.p,{children:["An object that describes a change to this Uri. To unset components use ",(0,d.jsx)(n.code,{children:"undefined"})," or\nthe empty string."]}),"\n",(0,d.jsx)(n.h6,{id:"authority-1",children:"authority"}),"\n",(0,d.jsx)(n.p,{children:(0,d.jsx)(n.code,{children:"string"})}),"\n",(0,d.jsx)(n.p,{children:"The new authority, defaults to this Uri's authority."}),"\n",(0,d.jsx)(n.h6,{id:"fragment-1",children:"fragment"}),"\n",(0,d.jsx)(n.p,{children:(0,d.jsx)(n.code,{children:"string"})}),"\n",(0,d.jsx)(n.p,{children:"The new fragment, defaults to this Uri's fragment."}),"\n",(0,d.jsx)(n.h6,{id:"path-1",children:"path"}),"\n",(0,d.jsx)(n.p,{children:(0,d.jsx)(n.code,{children:"string"})}),"\n",(0,d.jsx)(n.p,{children:"The new path, defaults to this Uri's path."}),"\n",(0,d.jsx)(n.h6,{id:"query-1",children:"query"}),"\n",(0,d.jsx)(n.p,{children:(0,d.jsx)(n.code,{children:"string"})}),"\n",(0,d.jsx)(n.p,{children:"The new query, defaults to this Uri's query."}),"\n",(0,d.jsx)(n.h6,{id:"scheme-1",children:"scheme"}),"\n",(0,d.jsx)(n.p,{children:(0,d.jsx)(n.code,{children:"string"})}),"\n",(0,d.jsx)(n.p,{children:"The new scheme, defaults to this Uri's scheme."}),"\n",(0,d.jsx)(n.h4,{id:"returns-1",children:"Returns"}),"\n",(0,d.jsx)(n.p,{children:(0,d.jsx)(n.a,{href:"/api/classes/Uri",children:(0,d.jsx)(n.code,{children:"Uri"})})}),"\n",(0,d.jsxs)(n.p,{children:["A new Uri that reflects the given change. Will return ",(0,d.jsx)(n.code,{children:"this"})," Uri if the change\nis not changing anything."]}),"\n",(0,d.jsx)(n.h4,{id:"defined-in-7",children:"Defined in"}),"\n",(0,d.jsx)(n.p,{children:(0,d.jsx)(n.a,{href:"https://github.com/podman-desktop/podman-desktop/blob/5a43945d1d92ad67b8b8b76f2cd096ae2a232ddc/packages/extension-api/src/extension-api.d.ts#L1868",children:"packages/extension-api/src/extension-api.d.ts:1868"})}),"\n",(0,d.jsx)(n.hr,{}),"\n",(0,d.jsx)(n.h3,{id:"file",children:"file()"}),"\n",(0,d.jsxs)(n.blockquote,{children:["\n",(0,d.jsxs)(n.p,{children:[(0,d.jsx)(n.code,{children:"static"})," ",(0,d.jsx)(n.strong,{children:"file"}),"(",(0,d.jsx)(n.code,{children:"path"}),"): ",(0,d.jsx)(n.a,{href:"/api/classes/Uri",children:(0,d.jsx)(n.code,{children:"Uri"})})]}),"\n"]}),"\n",(0,d.jsxs)(n.p,{children:["Create an URI from a file system path. The ",(0,d.jsx)(n.a,{href:"/api/classes/Uri#scheme",children:"scheme"}),"\nwill be ",(0,d.jsx)(n.code,{children:"file"}),"."]}),"\n",(0,d.jsx)(n.h4,{id:"parameters-1",children:"Parameters"}),"\n",(0,d.jsx)(n.h5,{id:"path-2",children:"path"}),"\n",(0,d.jsx)(n.p,{children:(0,d.jsx)(n.code,{children:"string"})}),"\n",(0,d.jsx)(n.h4,{id:"returns-2",children:"Returns"}),"\n",(0,d.jsx)(n.p,{children:(0,d.jsx)(n.a,{href:"/api/classes/Uri",children:(0,d.jsx)(n.code,{children:"Uri"})})}),"\n",(0,d.jsx)(n.h4,{id:"defined-in-8",children:"Defined in"}),"\n",(0,d.jsx)(n.p,{children:(0,d.jsx)(n.a,{href:"https://github.com/podman-desktop/podman-desktop/blob/5a43945d1d92ad67b8b8b76f2cd096ae2a232ddc/packages/extension-api/src/extension-api.d.ts#L1805",children:"packages/extension-api/src/extension-api.d.ts:1805"})}),"\n",(0,d.jsx)(n.hr,{}),"\n",(0,d.jsx)(n.h3,{id:"joinpath",children:"joinPath()"}),"\n",(0,d.jsxs)(n.blockquote,{children:["\n",(0,d.jsxs)(n.p,{children:[(0,d.jsx)(n.code,{children:"static"})," ",(0,d.jsx)(n.strong,{children:"joinPath"}),"(",(0,d.jsx)(n.code,{children:"base"}),", ...",(0,d.jsx)(n.code,{children:"pathSegments"}),"): ",(0,d.jsx)(n.a,{href:"/api/classes/Uri",children:(0,d.jsx)(n.code,{children:"Uri"})})]}),"\n"]}),"\n",(0,d.jsx)(n.p,{children:"Create a new uri which path is the result of joining\nthe path of the base uri with the provided path segments."}),"\n",(0,d.jsx)(n.h4,{id:"parameters-2",children:"Parameters"}),"\n",(0,d.jsx)(n.h5,{id:"base",children:"base"}),"\n",(0,d.jsx)(n.p,{children:(0,d.jsx)(n.a,{href:"/api/classes/Uri",children:(0,d.jsx)(n.code,{children:"Uri"})})}),"\n",(0,d.jsx)(n.p,{children:"An uri. Must have a path."}),"\n",(0,d.jsx)(n.h5,{id:"pathsegments",children:"pathSegments"}),"\n",(0,d.jsxs)(n.p,{children:["...",(0,d.jsx)(n.code,{children:"string"}),"[]"]}),"\n",(0,d.jsx)(n.p,{children:"One more more path fragments"}),"\n",(0,d.jsx)(n.h4,{id:"returns-3",children:"Returns"}),"\n",(0,d.jsx)(n.p,{children:(0,d.jsx)(n.a,{href:"/api/classes/Uri",children:(0,d.jsx)(n.code,{children:"Uri"})})}),"\n",(0,d.jsx)(n.p,{children:"A new uri which path is joined with the given fragments"}),"\n",(0,d.jsx)(n.h4,{id:"defined-in-9",children:"Defined in"}),"\n",(0,d.jsx)(n.p,{children:(0,d.jsx)(n.a,{href:"https://github.com/podman-desktop/podman-desktop/blob/5a43945d1d92ad67b8b8b76f2cd096ae2a232ddc/packages/extension-api/src/extension-api.d.ts#L1815",children:"packages/extension-api/src/extension-api.d.ts:1815"})}),"\n",(0,d.jsx)(n.hr,{}),"\n",(0,d.jsx)(n.h3,{id:"parse",children:"parse()"}),"\n",(0,d.jsxs)(n.blockquote,{children:["\n",(0,d.jsxs)(n.p,{children:[(0,d.jsx)(n.code,{children:"static"})," ",(0,d.jsx)(n.strong,{children:"parse"}),"(",(0,d.jsx)(n.code,{children:"value"}),", ",(0,d.jsx)(n.code,{children:"strict"}),"?): ",(0,d.jsx)(n.a,{href:"/api/classes/Uri",children:(0,d.jsx)(n.code,{children:"Uri"})})]}),"\n"]}),"\n",(0,d.jsxs)(n.p,{children:["Create an URI from a string, e.g. ",(0,d.jsx)(n.code,{children:"http://www.example.com/some/path"}),",\n",(0,d.jsx)(n.code,{children:"file:///usr/home"}),", or ",(0,d.jsx)(n.code,{children:"scheme:with/path"}),"."]}),"\n",(0,d.jsxs)(n.p,{children:[(0,d.jsx)(n.em,{children:"Note"})," that for a while uris without a ",(0,d.jsx)(n.code,{children:"scheme"})," were accepted. That is not correct\nas all uris should have a scheme. To avoid breakage of existing code the optional\n",(0,d.jsx)(n.code,{children:"strict"}),"-argument has been added. We ",(0,d.jsx)(n.em,{children:"strongly"})," advise to use it, e.g. ",(0,d.jsx)(n.code,{children:"Uri.parse('my:uri', true)"})]}),"\n",(0,d.jsx)(n.h4,{id:"parameters-3",children:"Parameters"}),"\n",(0,d.jsx)(n.h5,{id:"value",children:"value"}),"\n",(0,d.jsx)(n.p,{children:(0,d.jsx)(n.code,{children:"string"})}),"\n",(0,d.jsx)(n.p,{children:"The string value of an Uri."}),"\n",(0,d.jsx)(n.h5,{id:"strict",children:"strict?"}),"\n",(0,d.jsx)(n.p,{children:(0,d.jsx)(n.code,{children:"boolean"})}),"\n",(0,d.jsxs)(n.p,{children:["Throw an error when ",(0,d.jsx)(n.code,{children:"value"})," is empty or when no ",(0,d.jsx)(n.code,{children:"scheme"})," can be parsed."]}),"\n",(0,d.jsx)(n.h4,{id:"returns-4",children:"Returns"}),"\n",(0,d.jsx)(n.p,{children:(0,d.jsx)(n.a,{href:"/api/classes/Uri",children:(0,d.jsx)(n.code,{children:"Uri"})})}),"\n",(0,d.jsx)(n.p,{children:"A new Uri instance."}),"\n",(0,d.jsx)(n.h4,{id:"see",children:"See"}),"\n",(0,d.jsx)(n.p,{children:(0,d.jsx)(n.a,{href:"/api/classes/Uri#tostring",children:"Uri.toString"})}),"\n",(0,d.jsx)(n.h4,{id:"defined-in-10",children:"Defined in"}),"\n",(0,d.jsx)(n.p,{children:(0,d.jsx)(n.a,{href:"https://github.com/podman-desktop/podman-desktop/blob/5a43945d1d92ad67b8b8b76f2cd096ae2a232ddc/packages/extension-api/src/extension-api.d.ts#L1799",children:"packages/extension-api/src/extension-api.d.ts:1799"})})]})}function o(e={}){const{wrapper:n}={...(0,r.R)(),...e.components};return n?(0,d.jsx)(n,{...e,children:(0,d.jsx)(l,{...e})}):l(e)}},43023:(e,n,s)=>{s.d(n,{R:()=>t,x:()=>h});var i=s(63696);const d={},r=i.createContext(d);function t(e){const n=i.useContext(r);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function h(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(d):e.components||d:t(e.components),i.createElement(r.Provider,{value:n},e.children)}}}]);