"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[79048],{16789:(e,t,n)=>{n.r(t),n.d(t,{default:()=>B});var a=n(63696),o=n(11750),i=n(38774),s=n(26881),l=n(93938),r=n(6652),c=n(41287),d=n(95162),u=n(27452);const m={backToTopButton:"backToTopButton_iEvu",backToTopButtonShow:"backToTopButtonShow_DO8w"};var b=n(62540);function h(){const{shown:e,scrollToTop:t}=function(e){let{threshold:t}=e;const[n,o]=(0,a.useState)(!1),i=(0,a.useRef)(!1),{startScroll:s,cancelScroll:l}=(0,d.gk)();return(0,d.Mq)(((e,n)=>{let{scrollY:a}=e;const s=n?.scrollY;s&&(i.current?i.current=!1:a>=s?(l(),o(!1)):a<t?o(!1):a+window.innerHeight<document.documentElement.scrollHeight&&o(!0))})),(0,u.$)((e=>{e.location.hash&&(i.current=!0,o(!1))})),{shown:n,scrollToTop:()=>s(0)}}({threshold:300});return(0,b.jsx)("button",{"aria-label":(0,c.T)({id:"theme.BackToTopButton.buttonAriaLabel",message:"Scroll back to top",description:"The ARIA label for the back to top button"}),className:(0,o.A)("clean-btn",s.G.common.backToTopButton,m.backToTopButton,e&&m.backToTopButtonShow),type:"button",onClick:t})}var p=n(21367),x=n(49940),f=n(1771),j=n(22015);const v={expandButton:"expandButton_pLDq",expandButtonIcon:"expandButtonIcon_X5ff"};function A(e){let{toggleSidebar:t}=e;return(0,b.jsx)("div",{className:v.expandButton,title:(0,c.T)({id:"theme.docs.sidebar.expandButtonTitle",message:"Expand sidebar",description:"The ARIA label and title attribute for expand button of doc sidebar"}),"aria-label":(0,c.T)({id:"theme.docs.sidebar.expandButtonAriaLabel",message:"Expand sidebar",description:"The ARIA label and title attribute for expand button of doc sidebar"}),tabIndex:0,role:"button",onKeyDown:t,onClick:t,children:(0,b.jsx)(j.A,{className:v.expandButtonIcon})})}const _={docSidebarContainer:"docSidebarContainer_c7NB",docSidebarContainerHidden:"docSidebarContainerHidden_P3S_",sidebarViewport:"sidebarViewport_KYo0"};function g(e){let{children:t}=e;const n=(0,r.t)();return(0,b.jsx)(a.Fragment,{children:t},n?.name??"noSidebar")}function C(e){let{sidebar:t,hiddenSidebarContainer:n,setHiddenSidebarContainer:i}=e;const{pathname:l}=(0,x.zy)(),[r,c]=(0,a.useState)(!1),d=(0,a.useCallback)((()=>{r&&c(!1),!r&&(0,p.O)()&&c(!0),i((e=>!e))}),[i,r]);return(0,b.jsx)("aside",{className:(0,o.A)(s.G.docs.docSidebarContainer,_.docSidebarContainer,n&&_.docSidebarContainerHidden),onTransitionEnd:e=>{e.currentTarget.classList.contains(_.docSidebarContainer)&&n&&c(!0)},children:(0,b.jsx)(g,{children:(0,b.jsxs)("div",{className:(0,o.A)(_.sidebarViewport,r&&_.sidebarViewportHidden),children:[(0,b.jsx)(f.A,{sidebar:t,path:l,onCollapse:d,isHidden:r}),r&&(0,b.jsx)(A,{toggleSidebar:d})]})})})}const k={docMainContainer:"docMainContainer_a9sJ",docMainContainerEnhanced:"docMainContainerEnhanced_grEJ",docItemWrapperEnhanced:"docItemWrapperEnhanced_VqDq"};function S(e){let{hiddenSidebarContainer:t,children:n}=e;const a=(0,r.t)();return(0,b.jsx)("main",{className:(0,o.A)(k.docMainContainer,(t||!a)&&k.docMainContainerEnhanced),children:(0,b.jsx)("div",{className:(0,o.A)("container padding-top--md padding-bottom--lg",k.docItemWrapper,t&&k.docItemWrapperEnhanced),children:n})})}const T={docRoot:"docRoot_DfVB",docsWrapper:"docsWrapper__sE8"};function N(e){let{children:t}=e;const n=(0,r.t)(),[o,i]=(0,a.useState)(!1);return(0,b.jsxs)("div",{className:T.docsWrapper,children:[(0,b.jsx)(h,{}),(0,b.jsxs)("div",{className:T.docRoot,children:[n&&(0,b.jsx)(C,{sidebar:n.items,hiddenSidebarContainer:o,setHiddenSidebarContainer:i}),(0,b.jsx)(S,{hiddenSidebarContainer:o,children:t})]})]})}var I=n(75381);function B(e){const t=(0,l.B5)(e);if(!t)return(0,b.jsx)(I.A,{});const{docElement:n,sidebarName:a,sidebarItems:c}=t;return(0,b.jsx)(i.e3,{className:(0,o.A)(s.G.page.docsDocPage),children:(0,b.jsx)(r.V,{name:a,items:c,children:(0,b.jsx)(N,{children:n})})})}},1771:(e,t,n)=>{n.d(t,{A:()=>X});var a=n(63696),o=n(64115),i=n(11750),s=n(73432),l=n(61087),r=n(41287),c=n(22015);const d={collapseSidebarButton:"collapseSidebarButton_oTwn",collapseSidebarButtonIcon:"collapseSidebarButtonIcon_pMEX"};var u=n(62540);function m(e){let{onClick:t}=e;return(0,u.jsx)("button",{type:"button",title:(0,r.T)({id:"theme.docs.sidebar.collapseButtonTitle",message:"Collapse sidebar",description:"The title attribute for collapse button of doc sidebar"}),"aria-label":(0,r.T)({id:"theme.docs.sidebar.collapseButtonAriaLabel",message:"Collapse sidebar",description:"The title attribute for collapse button of doc sidebar"}),className:(0,i.A)("button button--secondary button--outline",d.collapseSidebarButton),onClick:t,children:(0,u.jsx)(c.A,{className:d.collapseSidebarButtonIcon})})}var b=n(26881),h=n(9831),p=n(95162),x=n(93938),f=n(62666);const j=Symbol("EmptyContext"),v=a.createContext(j);function A(e){let{children:t}=e;const[n,o]=(0,a.useState)(null),i=(0,a.useMemo)((()=>({expandedItem:n,setExpandedItem:o})),[n]);return(0,u.jsx)(v.Provider,{value:i,children:t})}var _=n(34972),g=n(47679),C=n(2660),k=n(11173);function S(e){let{collapsed:t,categoryLabel:n,onClick:a}=e;return(0,u.jsx)("button",{"aria-label":t?(0,r.T)({id:"theme.DocSidebarItem.expandCategoryAriaLabel",message:"Expand sidebar category '{label}'",description:"The ARIA label to expand the sidebar category"},{label:n}):(0,r.T)({id:"theme.DocSidebarItem.collapseCategoryAriaLabel",message:"Collapse sidebar category '{label}'",description:"The ARIA label to collapse the sidebar category"},{label:n}),"aria-expanded":!t,type:"button",className:"clean-btn menu__caret",onClick:a})}function T(e){let{item:t,onItemClick:n,activePath:o,level:l,index:r,...c}=e;const{items:d,label:m,collapsible:h,className:p,href:A}=t,{docs:{sidebar:{autoCollapseCategories:T}}}=(0,s.p)(),N=function(e){const t=(0,k.A)();return(0,a.useMemo)((()=>e.href&&!e.linkUnlisted?e.href:!t&&e.collapsible?(0,x.Nr)(e):void 0),[e,t])}(t),I=(0,x.w8)(t,o),B=(0,g.ys)(A,o),{collapsed:y,setCollapsed:w}=(0,_.u)({initialState:()=>!!h&&(!I&&t.collapsed)}),{expandedItem:E,setExpandedItem:L}=function(){const e=(0,a.useContext)(v);if(e===j)throw new f.dV("DocSidebarItemsExpandedStateProvider");return e}(),M=function(e){void 0===e&&(e=!y),L(e?null:r),w(e)};return function(e){let{isActive:t,collapsed:n,updateCollapsed:o}=e;const i=(0,f.ZC)(t);(0,a.useEffect)((()=>{t&&!i&&n&&o(!1)}),[t,i,n,o])}({isActive:I,collapsed:y,updateCollapsed:M}),(0,a.useEffect)((()=>{h&&null!=E&&E!==r&&T&&w(!0)}),[h,E,r,w,T]),(0,u.jsxs)("li",{className:(0,i.A)(b.G.docs.docSidebarItemCategory,b.G.docs.docSidebarItemCategoryLevel(l),"menu__list-item",{"menu__list-item--collapsed":y},p),children:[(0,u.jsxs)("div",{className:(0,i.A)("menu__list-item-collapsible",{"menu__list-item-collapsible--active":B}),children:[(0,u.jsx)(C.A,{className:(0,i.A)("menu__link",{"menu__link--sublist":h,"menu__link--sublist-caret":!A&&h,"menu__link--active":I}),onClick:h?e=>{n?.(t),A?M(!1):(e.preventDefault(),M())}:()=>{n?.(t)},"aria-current":B?"page":void 0,role:h&&!A?"button":void 0,"aria-expanded":h&&!A?!y:void 0,href:h?N??"#":N,...c,children:m}),A&&h&&(0,u.jsx)(S,{collapsed:y,categoryLabel:m,onClick:e=>{e.preventDefault(),M()}})]}),(0,u.jsx)(_.N,{lazy:!0,as:"ul",className:"menu__list",collapsed:y,children:(0,u.jsx)(H,{items:d,tabIndex:y?-1:0,onItemClick:n,activePath:o,level:l+1})})]})}var N=n(71468),I=n(39593);const B={menuExternalLink:"menuExternalLink_BiEj"};function y(e){let{item:t,onItemClick:n,activePath:a,level:o,index:s,...l}=e;const{href:r,label:c,className:d,autoAddBaseUrl:m}=t,h=(0,x.w8)(t,a),p=(0,N.A)(r);return(0,u.jsx)("li",{className:(0,i.A)(b.G.docs.docSidebarItemLink,b.G.docs.docSidebarItemLinkLevel(o),"menu__list-item",d),children:(0,u.jsxs)(C.A,{className:(0,i.A)("menu__link",!p&&B.menuExternalLink,{"menu__link--active":h}),autoAddBaseUrl:m,"aria-current":h?"page":void 0,to:r,...p&&{onClick:n?()=>n(t):void 0},...l,children:[c,!p&&(0,u.jsx)(I.A,{})]})},c)}const w={menuHtmlItem:"menuHtmlItem_OniL"};function E(e){let{item:t,level:n,index:a}=e;const{value:o,defaultStyle:s,className:l}=t;return(0,u.jsx)("li",{className:(0,i.A)(b.G.docs.docSidebarItemLink,b.G.docs.docSidebarItemLinkLevel(n),s&&[w.menuHtmlItem,"menu__list-item"],l),dangerouslySetInnerHTML:{__html:o}},a)}function L(e){let{item:t,...n}=e;switch(t.type){case"category":return(0,u.jsx)(T,{item:t,...n});case"html":return(0,u.jsx)(E,{item:t,...n});default:return(0,u.jsx)(y,{item:t,...n})}}function M(e){let{items:t,...n}=e;const a=(0,x.Y)(t,n.activePath);return(0,u.jsx)(A,{children:a.map(((e,t)=>(0,u.jsx)(L,{item:e,index:t,...n},t)))})}const H=(0,a.memo)(M),D={menu:"menu_jmj1",menuWithAnnouncementBar:"menuWithAnnouncementBar_YufC"};function G(e){let{path:t,sidebar:n,className:o}=e;const s=function(){const{isActive:e}=(0,h.M)(),[t,n]=(0,a.useState)(e);return(0,p.Mq)((t=>{let{scrollY:a}=t;e&&n(0===a)}),[e]),e&&t}();return(0,u.jsx)("nav",{"aria-label":(0,r.T)({id:"theme.docs.sidebar.navAriaLabel",message:"Docs sidebar",description:"The ARIA label for the sidebar navigation"}),className:(0,i.A)("menu thin-scrollbar",D.menu,s&&D.menuWithAnnouncementBar,o),children:(0,u.jsx)("ul",{className:(0,i.A)(b.G.docs.docSidebarMenu,"menu__list"),children:(0,u.jsx)(H,{items:n,activePath:t,level:1})})})}const P="sidebar_CUen",W="sidebarWithHideableNavbar_w4KB",R="sidebarHidden_k6VE",V="sidebarLogo_CYvI";function Y(e){let{path:t,sidebar:n,onCollapse:a,isHidden:o}=e;const{navbar:{hideOnScroll:r},docs:{sidebar:{hideable:c}}}=(0,s.p)();return(0,u.jsxs)("div",{className:(0,i.A)(P,r&&W,o&&R),children:[r&&(0,u.jsx)(l.A,{tabIndex:-1,className:V}),(0,u.jsx)(G,{path:t,sidebar:n}),c&&(0,u.jsx)(m,{onClick:a})]})}const F=a.memo(Y);var q=n(4074),U=n(4327);const z=e=>{let{sidebar:t,path:n}=e;const a=(0,U.M)();return(0,u.jsx)("ul",{className:(0,i.A)(b.G.docs.docSidebarMenu,"menu__list"),children:(0,u.jsx)(H,{items:t,activePath:n,onItemClick:e=>{"category"===e.type&&e.href&&a.toggle(),"link"===e.type&&a.toggle()},level:1})})};function O(e){return(0,u.jsx)(q.GX,{component:z,props:e})}const K=a.memo(O);function X(e){const t=(0,o.l)(),n="desktop"===t||"ssr"===t,a="mobile"===t;return(0,u.jsxs)(u.Fragment,{children:[n&&(0,u.jsx)(F,{...e}),a&&(0,u.jsx)(K,{...e})]})}},22015:(e,t,n)=>{n.d(t,{A:()=>o});n(63696);var a=n(62540);function o(e){return(0,a.jsx)("svg",{width:"20",height:"20","aria-hidden":"true",...e,children:(0,a.jsxs)("g",{fill:"#7a7a7a",children:[(0,a.jsx)("path",{d:"M9.992 10.023c0 .2-.062.399-.172.547l-4.996 7.492a.982.982 0 01-.828.454H1c-.55 0-1-.453-1-1 0-.2.059-.403.168-.551l4.629-6.942L.168 3.078A.939.939 0 010 2.528c0-.548.45-.997 1-.997h2.996c.352 0 .649.18.828.45L9.82 9.472c.11.148.172.347.172.55zm0 0"}),(0,a.jsx)("path",{d:"M19.98 10.023c0 .2-.058.399-.168.547l-4.996 7.492a.987.987 0 01-.828.454h-3c-.547 0-.996-.453-.996-1 0-.2.059-.403.168-.551l4.625-6.942-4.625-6.945a.939.939 0 01-.168-.55 1 1 0 01.996-.997h3c.348 0 .649.18.828.45l4.996 7.492c.11.148.168.347.168.55zm0 0"})]})})}},75381:(e,t,n)=>{n.d(t,{A:()=>l});n(63696);var a=n(11750),o=n(41287),i=n(31787),s=n(62540);function l(e){let{className:t}=e;return(0,s.jsx)("main",{className:(0,a.A)("container margin-vert--xl",t),children:(0,s.jsx)("div",{className:"row",children:(0,s.jsxs)("div",{className:"col col--6 col--offset-3",children:[(0,s.jsx)(i.A,{as:"h1",className:"hero__title",children:(0,s.jsx)(o.A,{id:"theme.NotFound.title",description:"The title of the 404 page",children:"Page Not Found"})}),(0,s.jsx)("p",{children:(0,s.jsx)(o.A,{id:"theme.NotFound.p1",description:"The first paragraph of the 404 page",children:"We could not find what you were looking for."})}),(0,s.jsx)("p",{children:(0,s.jsx)(o.A,{id:"theme.NotFound.p2",description:"The 2nd paragraph of the 404 page",children:"Please contact the owner of the site that linked you to the original URL and let them know their link is broken."})})]})})})}}}]);