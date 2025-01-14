"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[29099],{614:(e,n,o)=>{o.r(n),o.d(n,{assets:()=>c,contentTitle:()=>d,default:()=>l,frontMatter:()=>a,metadata:()=>t,toc:()=>m});const t=JSON.parse('{"id":"extensions/developing/commands","title":"Commands","description":"Podman Desktop command reference","source":"@site/docs/extensions/developing/commands.md","sourceDirName":"extensions/developing","slug":"/extensions/developing/commands","permalink":"/docs/extensions/developing/commands","draft":false,"unlisted":false,"editUrl":"https://github.com/podman-desktop/podman-desktop/tree/main/website/docs/extensions/developing/commands.md","tags":[{"inline":true,"label":"podman-desktop","permalink":"/docs/tags/podman-desktop"},{"inline":true,"label":"extension","permalink":"/docs/tags/extension"}],"version":"current","frontMatter":{"title":"Commands","description":"Podman Desktop command reference","tags":["podman-desktop","extension"],"keywords":["podman desktop","extension"]},"sidebar":"mySidebar","previous":{"title":"Command palette","permalink":"/docs/extensions/developing/command-palette"},"next":{"title":"Configuration","permalink":"/docs/extensions/developing/config"}}');var s=o(62540),i=o(43023);const a={title:"Commands",description:"Podman Desktop command reference",tags:["podman-desktop","extension"],keywords:["podman desktop","extension"]},d="Commands",c={},m=[{value:"Configuration details",id:"configuration-details",level:2},{value:"<code>package.json</code> Example",id:"packagejson-example",level:3},{value:"JSON Schema",id:"json-schema",level:3},{value:"Additional Resources",id:"additional-resources",level:3},{value:"Verification",id:"verification",level:3}];function r(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",ol:"ol",p:"p",pre:"pre",...(0,i.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.header,{children:(0,s.jsx)(n.h1,{id:"commands",children:"Commands"})}),"\n",(0,s.jsx)(n.h2,{id:"configuration-details",children:"Configuration details"}),"\n",(0,s.jsx)(n.p,{children:"This section describes new commands added to the extension, which enable enhanced interaction and automation within the development environment. These commands can be used programmatically through the API."}),"\n",(0,s.jsxs)(n.h3,{id:"packagejson-example",children:[(0,s.jsx)(n.code,{children:"package.json"})," Example"]}),"\n",(0,s.jsxs)(n.p,{children:["This example shows how new commands are added to ",(0,s.jsx)(n.code,{children:"package.json"}),", enabling them for use within the extension. Each command is defined with a unique identifier and a descriptive title that appears in the command palette."]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-json",children:'{\n  "contributes": {\n    "commands": [\n      {\n        "command": "extension.exampleCommand",\n        "title": "Extension: Example Command"\n      },\n      {\n        "command": "extension.anotherCommand",\n        "title": "Extension: Another Command"\n      }\n    ]\n  }\n}\n'})}),"\n",(0,s.jsx)(n.p,{children:"And within the TypeScript code, you can use the commands like so:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-typescript",children:"const exampleCommand = extensionApi.commands.registerCommand('extension.exampleCommand', async () => {\n  // Implementation logic here\n  console.log('Executing Example Command');\n});\n\nconst anotherCommand = extensionApi.commands.registerCommand('extension.anotherCommand', () => {\n  // Synchronous logic can be used if async processing is not required\n  console.log('Another Command Executed');\n});\n"})}),"\n",(0,s.jsx)(n.h3,{id:"json-schema",children:"JSON Schema"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-json",children:'{\n  "contributes": {\n    "commands": [\n      {\n        "command": "string",\n        "title": "string",\n        "category": "string (optional cateogry for prefix title)",\n        "enablement": "myProperty === myValue"\n      }\n    ]\n  }\n}\n'})}),"\n",(0,s.jsx)(n.h3,{id:"additional-resources",children:"Additional Resources"}),"\n",(0,s.jsxs)(n.p,{children:["When you add the command, it will be listed on the command palette. See the ",(0,s.jsx)(n.a,{href:"/docs/extensions/developing/command-palette",children:"command palette"})," for more information."]}),"\n",(0,s.jsx)(n.h3,{id:"verification",children:"Verification"}),"\n",(0,s.jsx)(n.p,{children:"To verify that your commands are working as expected:"}),"\n",(0,s.jsxs)(n.ol,{children:["\n",(0,s.jsx)(n.li,{children:"Install the extension in your development environment."}),"\n",(0,s.jsxs)(n.li,{children:["Add a command to ",(0,s.jsx)(n.code,{children:"package.json"}),"."]}),"\n",(0,s.jsx)(n.li,{children:"Execute the commands and check for the expected outputs / logging."}),"\n"]})]})}function l(e={}){const{wrapper:n}={...(0,i.R)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(r,{...e})}):r(e)}},43023:(e,n,o)=>{o.d(n,{R:()=>a,x:()=>d});var t=o(63696);const s={},i=t.createContext(s);function a(e){const n=t.useContext(i);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function d(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:a(e.components),t.createElement(i.Provider,{value:n},e.children)}}}]);