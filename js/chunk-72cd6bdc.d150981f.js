(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-72cd6bdc"],{"041e":function(t,e,i){var n={"./logo-support-1-dark.png":"6625","./logo-support-1-light.png":"66af","./logo-support-2-dark.png":"f757","./logo-support-2-light.png":"c424"};function s(t){var e=r(t);return i(e)}function r(t){if(!i.o(n,t)){var e=new Error("Cannot find module '"+t+"'");throw e.code="MODULE_NOT_FOUND",e}return n[t]}s.keys=function(){return Object.keys(n)},s.resolve=r,t.exports=s,s.id="041e"},"166a":function(t,e,i){},"604c":function(t,e,i){"use strict";i.d(e,"a",(function(){return c}));i("4de4"),i("7db0"),i("c740"),i("4160"),i("caad"),i("c975"),i("fb6a"),i("a434"),i("a9e3"),i("2532"),i("159b");var n=i("5530"),s=(i("166a"),i("a452")),r=i("7560"),a=i("58df"),o=i("d9bd"),c=Object(a["a"])(s["a"],r["a"]).extend({name:"base-item-group",props:{activeClass:{type:String,default:"v-item--active"},mandatory:Boolean,max:{type:[Number,String],default:null},multiple:Boolean,tag:{type:String,default:"div"}},data:function(){return{internalLazyValue:void 0!==this.value?this.value:this.multiple?[]:void 0,items:[]}},computed:{classes:function(){return Object(n["a"])({"v-item-group":!0},this.themeClasses)},selectedIndex:function(){return this.selectedItem&&this.items.indexOf(this.selectedItem)||-1},selectedItem:function(){if(!this.multiple)return this.selectedItems[0]},selectedItems:function(){var t=this;return this.items.filter((function(e,i){return t.toggleMethod(t.getValue(e,i))}))},selectedValues:function(){return null==this.internalValue?[]:Array.isArray(this.internalValue)?this.internalValue:[this.internalValue]},toggleMethod:function(){var t=this;if(!this.multiple)return function(e){return t.internalValue===e};var e=this.internalValue;return Array.isArray(e)?function(t){return e.includes(t)}:function(){return!1}}},watch:{internalValue:"updateItemsState",items:"updateItemsState"},created:function(){this.multiple&&!Array.isArray(this.internalValue)&&Object(o["c"])("Model must be bound to an array if the multiple property is true.",this)},methods:{genData:function(){return{class:this.classes}},getValue:function(t,e){return null==t.value||""===t.value?e:t.value},onClick:function(t){this.updateInternalValue(this.getValue(t,this.items.indexOf(t)))},register:function(t){var e=this,i=this.items.push(t)-1;t.$on("change",(function(){return e.onClick(t)})),this.mandatory&&!this.selectedValues.length&&this.updateMandatory(),this.updateItem(t,i)},unregister:function(t){if(!this._isDestroyed){var e=this.items.indexOf(t),i=this.getValue(t,e);this.items.splice(e,1);var n=this.selectedValues.indexOf(i);if(!(n<0)){if(!this.mandatory)return this.updateInternalValue(i);this.multiple&&Array.isArray(this.internalValue)?this.internalValue=this.internalValue.filter((function(t){return t!==i})):this.internalValue=void 0,this.selectedItems.length||this.updateMandatory(!0)}}},updateItem:function(t,e){var i=this.getValue(t,e);t.isActive=this.toggleMethod(i)},updateItemsState:function(){var t=this;this.$nextTick((function(){if(t.mandatory&&!t.selectedItems.length)return t.updateMandatory();t.items.forEach(t.updateItem)}))},updateInternalValue:function(t){this.multiple?this.updateMultiple(t):this.updateSingle(t)},updateMandatory:function(t){if(this.items.length){var e=this.items.slice();t&&e.reverse();var i=e.find((function(t){return!t.disabled}));if(i){var n=this.items.indexOf(i);this.updateInternalValue(this.getValue(i,n))}}},updateMultiple:function(t){var e=Array.isArray(this.internalValue)?this.internalValue:[],i=e.slice(),n=i.findIndex((function(e){return e===t}));this.mandatory&&n>-1&&i.length-1<1||null!=this.max&&n<0&&i.length+1>this.max||(n>-1?i.splice(n,1):i.push(t),this.internalValue=i)},updateSingle:function(t){var e=t===this.internalValue;this.mandatory&&e||(this.internalValue=e?void 0:t)}},render:function(t){return t(this.tag,this.genData(),this.$slots.default)}});c.extend({name:"v-item-group",provide:function(){return{itemGroup:this}}})},"608c":function(t,e,i){},6625:function(t,e,i){t.exports=i.p+"img/logo-support-1-dark.02b5aa42.png"},"66af":function(t,e,i){t.exports=i.p+"img/logo-support-1-light.02b5aa42.png"},"7efd":function(t,e,i){"use strict";i.d(e,"a",(function(){return h}));i("99af"),i("caad"),i("fb6a");var n=i("5530"),s=(i("608c"),i("9d26")),r=i("0789"),a=i("604c"),o=i("e4cd"),c=i("dc22"),l=i("c3f0"),u=i("58df"),h=Object(u["a"])(a["a"],o["a"]).extend({name:"base-slide-group",directives:{Resize:c["a"],Touch:l["a"]},props:{activeClass:{type:String,default:"v-slide-item--active"},centerActive:Boolean,nextIcon:{type:String,default:"$next"},prevIcon:{type:String,default:"$prev"},showArrows:{type:[Boolean,String],validator:function(t){return"boolean"===typeof t||["always","desktop","mobile"].includes(t)}}},data:function(){return{internalItemsLength:0,isOverflowing:!1,resizeTimeout:0,startX:0,scrollOffset:0,widths:{content:0,wrapper:0}}},computed:{__cachedNext:function(){return this.genTransition("next")},__cachedPrev:function(){return this.genTransition("prev")},classes:function(){return Object(n["a"])(Object(n["a"])({},a["a"].options.computed.classes.call(this)),{},{"v-slide-group":!0,"v-slide-group--has-affixes":this.hasAffixes,"v-slide-group--is-overflowing":this.isOverflowing})},hasAffixes:function(){switch(this.showArrows){case"always":return!0;case"desktop":return!this.isMobile;case!0:return this.isOverflowing;case"mobile":return this.isMobile||this.isOverflowing;default:return!this.isMobile&&this.isOverflowing}},hasNext:function(){if(!this.hasAffixes)return!1;var t=this.widths,e=t.content,i=t.wrapper;return e>Math.abs(this.scrollOffset)+i},hasPrev:function(){return this.hasAffixes&&0!==this.scrollOffset}},watch:{internalValue:"setWidths",isOverflowing:"setWidths",scrollOffset:function(t){this.$refs.content.style.transform="translateX(".concat(-t,"px)")}},beforeUpdate:function(){this.internalItemsLength=(this.$children||[]).length},updated:function(){this.internalItemsLength!==(this.$children||[]).length&&this.setWidths()},methods:{genNext:function(){var t=this,e=this.$scopedSlots.next?this.$scopedSlots.next({}):this.$slots.next||this.__cachedNext;return this.$createElement("div",{staticClass:"v-slide-group__next",class:{"v-slide-group__next--disabled":!this.hasNext},on:{click:function(){return t.onAffixClick("next")}},key:"next"},[e])},genContent:function(){return this.$createElement("div",{staticClass:"v-slide-group__content",ref:"content"},this.$slots.default)},genData:function(){return{class:this.classes,directives:[{name:"resize",value:this.onResize}]}},genIcon:function(t){var e=t;this.$vuetify.rtl&&"prev"===t?e="next":this.$vuetify.rtl&&"next"===t&&(e="prev");var i="".concat(t[0].toUpperCase()).concat(t.slice(1)),n=this["has".concat(i)];return this.showArrows||n?this.$createElement(s["a"],{props:{disabled:!n}},this["".concat(e,"Icon")]):null},genPrev:function(){var t=this,e=this.$scopedSlots.prev?this.$scopedSlots.prev({}):this.$slots.prev||this.__cachedPrev;return this.$createElement("div",{staticClass:"v-slide-group__prev",class:{"v-slide-group__prev--disabled":!this.hasPrev},on:{click:function(){return t.onAffixClick("prev")}},key:"prev"},[e])},genTransition:function(t){return this.$createElement(r["b"],[this.genIcon(t)])},genWrapper:function(){var t=this;return this.$createElement("div",{staticClass:"v-slide-group__wrapper",directives:[{name:"touch",value:{start:function(e){return t.overflowCheck(e,t.onTouchStart)},move:function(e){return t.overflowCheck(e,t.onTouchMove)},end:function(e){return t.overflowCheck(e,t.onTouchEnd)}}}],ref:"wrapper"},[this.genContent()])},calculateNewOffset:function(t,e,i,n){var s=i?-1:1,r=s*n+("prev"===t?-1:1)*e.wrapper;return s*Math.max(Math.min(r,e.content-e.wrapper),0)},onAffixClick:function(t){this.$emit("click:".concat(t)),this.scrollTo(t)},onResize:function(){this._isDestroyed||this.setWidths()},onTouchStart:function(t){var e=this.$refs.content;this.startX=this.scrollOffset+t.touchstartX,e.style.setProperty("transition","none"),e.style.setProperty("willChange","transform")},onTouchMove:function(t){this.scrollOffset=this.startX-t.touchmoveX},onTouchEnd:function(){var t=this.$refs,e=t.content,i=t.wrapper,n=e.clientWidth-i.clientWidth;e.style.setProperty("transition",null),e.style.setProperty("willChange",null),this.$vuetify.rtl?this.scrollOffset>0||!this.isOverflowing?this.scrollOffset=0:this.scrollOffset<=-n&&(this.scrollOffset=-n):this.scrollOffset<0||!this.isOverflowing?this.scrollOffset=0:this.scrollOffset>=n&&(this.scrollOffset=n)},overflowCheck:function(t,e){t.stopPropagation(),this.isOverflowing&&e(t)},scrollIntoView:function(){this.selectedItem&&(0===this.selectedIndex||!this.centerActive&&!this.isOverflowing?this.scrollOffset=0:this.centerActive?this.scrollOffset=this.calculateCenteredOffset(this.selectedItem.$el,this.widths,this.$vuetify.rtl):this.isOverflowing&&(this.scrollOffset=this.calculateUpdatedOffset(this.selectedItem.$el,this.widths,this.$vuetify.rtl,this.scrollOffset)))},calculateUpdatedOffset:function(t,e,i,n){var s=t.clientWidth,r=i?e.content-t.offsetLeft-s:t.offsetLeft;i&&(n=-n);var a=e.wrapper+n,o=s+r,c=.4*s;return r<=n?n=Math.max(r-c,0):a<=o&&(n=Math.min(n-(a-o-c),e.content-e.wrapper)),i?-n:n},calculateCenteredOffset:function(t,e,i){var n=t.offsetLeft,s=t.clientWidth;if(i){var r=e.content-n-s/2-e.wrapper/2;return-Math.min(e.content-e.wrapper,Math.max(0,r))}var a=n+s/2-e.wrapper/2;return Math.min(e.content-e.wrapper,Math.max(0,a))},scrollTo:function(t){this.scrollOffset=this.calculateNewOffset(t,{content:this.$refs.content?this.$refs.content.clientWidth:0,wrapper:this.$refs.wrapper?this.$refs.wrapper.clientWidth:0},this.$vuetify.rtl,this.scrollOffset)},setWidths:function(){var t=this;window.requestAnimationFrame((function(){var e=t.$refs,i=e.content,n=e.wrapper;t.widths={content:i?i.clientWidth:0,wrapper:n?n.clientWidth:0},t.isOverflowing=t.widths.wrapper<t.widths.content,t.scrollIntoView()}))}},render:function(t){return t("div",this.genData(),[this.genPrev(),this.genWrapper(),this.genNext()])}});e["b"]=h.extend({name:"v-slide-group",provide:function(){return{slideGroup:this}}})},a434:function(t,e,i){"use strict";var n=i("23e7"),s=i("23cb"),r=i("a691"),a=i("50c4"),o=i("7b0b"),c=i("65f0"),l=i("8418"),u=i("1dde"),h=i("ae40"),f=u("splice"),d=h("splice",{ACCESSORS:!0,0:0,1:2}),p=Math.max,v=Math.min,g=9007199254740991,m="Maximum allowed length exceeded";n({target:"Array",proto:!0,forced:!f||!d},{splice:function(t,e){var i,n,u,h,f,d,b=o(this),w=a(b.length),y=s(t,w),O=arguments.length;if(0===O?i=n=0:1===O?(i=0,n=w-y):(i=O-2,n=v(p(r(e),0),w-y)),w+i-n>g)throw TypeError(m);for(u=c(b,n),h=0;h<n;h++)f=y+h,f in b&&l(u,h,b[f]);if(u.length=n,i<n){for(h=y;h<w-n;h++)f=h+n,d=h+i,f in b?b[d]=b[f]:delete b[d];for(h=w;h>w-n+i;h--)delete b[h-1]}else if(i>n)for(h=w-n;h>y;h--)f=h+n-1,d=h+i-1,f in b?b[d]=b[f]:delete b[d];for(h=0;h<i;h++)b[h+y]=arguments[h+2];return b.length=w-n+i,u}})},c3f0:function(t,e,i){"use strict";i("4160"),i("159b");var n=i("80d2"),s=function(t){var e=t.touchstartX,i=t.touchendX,n=t.touchstartY,s=t.touchendY,r=.5,a=16;t.offsetX=i-e,t.offsetY=s-n,Math.abs(t.offsetY)<r*Math.abs(t.offsetX)&&(t.left&&i<e-a&&t.left(t),t.right&&i>e+a&&t.right(t)),Math.abs(t.offsetX)<r*Math.abs(t.offsetY)&&(t.up&&s<n-a&&t.up(t),t.down&&s>n+a&&t.down(t))};function r(t,e){var i=t.changedTouches[0];e.touchstartX=i.clientX,e.touchstartY=i.clientY,e.start&&e.start(Object.assign(t,e))}function a(t,e){var i=t.changedTouches[0];e.touchendX=i.clientX,e.touchendY=i.clientY,e.end&&e.end(Object.assign(t,e)),s(e)}function o(t,e){var i=t.changedTouches[0];e.touchmoveX=i.clientX,e.touchmoveY=i.clientY,e.move&&e.move(Object.assign(t,e))}function c(t){var e={touchstartX:0,touchstartY:0,touchendX:0,touchendY:0,touchmoveX:0,touchmoveY:0,offsetX:0,offsetY:0,left:t.left,right:t.right,up:t.up,down:t.down,start:t.start,move:t.move,end:t.end};return{touchstart:function(t){return r(t,e)},touchend:function(t){return a(t,e)},touchmove:function(t){return o(t,e)}}}function l(t,e,i){var s=e.value,r=s.parent?t.parentElement:t,a=s.options||{passive:!0};if(r){var o=c(e.value);r._touchHandlers=Object(r._touchHandlers),r._touchHandlers[i.context._uid]=o,Object(n["q"])(o).forEach((function(t){r.addEventListener(t,o[t],a)}))}}function u(t,e,i){var s=e.value.parent?t.parentElement:t;if(s&&s._touchHandlers){var r=s._touchHandlers[i.context._uid];Object(n["q"])(r).forEach((function(t){s.removeEventListener(t,r[t])})),delete s._touchHandlers[i.context._uid]}}var h={inserted:l,unbind:u};e["a"]=h},c424:function(t,e,i){t.exports=i.p+"img/logo-support-2-light.c21af4d0.png"},c6d2:function(t,e,i){"use strict";i.r(e);var n=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("base-section",{attrs:{id:"affiliates",space:"36"}},[n("v-container",[n("base-section-heading",{attrs:{title:"Who support DAOSWAP?"}}),n("v-slide-group",[t._l(2,(function(e){return[n("v-slide-item",{key:e,staticClass:"align-self-center"},[n("base-img",{attrs:{src:i("041e")("./logo-support-"+e+"-"+(t.$vuetify.theme.isDark?"dark":"light")+".png"),color:"grey",contain:"",height:"40",width:"128"}})],1),e<2?n("v-responsive",{key:"divider-"+e,staticClass:"text-center",attrs:{height:"56",width:"48"}},[n("v-divider",{attrs:{vertical:""}})],1):t._e()]}))],2)],1)],1)},s=[],r={name:"SectionAffiliates"},a=r,o=i("2877"),c=i("6544"),l=i.n(c),u=i("a523"),h=i("ce7e"),f=i("6b53"),d=i("7efd"),p=i("ade3"),v=i("4e82"),g=i("58df"),m=i("d9bd"),b=i("2b0e"),w=b["a"].extend({props:{activeClass:String,value:{required:!1}},data:function(){return{isActive:!1}},methods:{toggle:function(){this.isActive=!this.isActive}},render:function(){return this.$scopedSlots.default?(this.$scopedSlots.default&&(t=this.$scopedSlots.default({active:this.isActive,toggle:this.toggle})),Array.isArray(t)&&1===t.length&&(t=t[0]),t&&!Array.isArray(t)&&t.tag?(t.data=this._b(t.data||{},t.tag,{class:Object(p["a"])({},this.activeClass,this.isActive)}),t):(Object(m["c"])("v-item should only contain a single element",this),t)):(Object(m["c"])("v-item is missing a default scopedSlot",this),null);var t}}),y=(Object(g["a"])(w,Object(v["a"])("itemGroup","v-item","v-item-group")).extend({name:"v-item"}),Object(g["a"])(w,Object(v["a"])("slideGroup")).extend({name:"v-slide-item"})),O=Object(o["a"])(a,n,s,!1,null,null,null);e["default"]=O.exports;l()(O,{VContainer:u["a"],VDivider:h["a"],VResponsive:f["a"],VSlideGroup:d["b"],VSlideItem:y})},c740:function(t,e,i){"use strict";var n=i("23e7"),s=i("b727").findIndex,r=i("44d2"),a=i("ae40"),o="findIndex",c=!0,l=a(o);o in[]&&Array(1)[o]((function(){c=!1})),n({target:"Array",proto:!0,forced:c||!l},{findIndex:function(t){return s(this,t,arguments.length>1?arguments[1]:void 0)}}),r(o)},e4cd:function(t,e,i){"use strict";i("caad"),i("b0c0"),i("a9e3");var n=i("d9bd"),s=i("2b0e");e["a"]=s["a"].extend({name:"mobile",props:{mobileBreakpoint:{type:[Number,String],default:function(){return this.$vuetify?this.$vuetify.breakpoint.mobileBreakpoint:void 0},validator:function(t){return!isNaN(Number(t))||["xs","sm","md","lg","xl"].includes(String(t))}}},computed:{isMobile:function(){var t=this.$vuetify.breakpoint,e=t.mobile,i=t.width,n=t.name,s=t.mobileBreakpoint;if(s===this.mobileBreakpoint)return e;var r=parseInt(this.mobileBreakpoint,10),a=!isNaN(r);return a?i<r:n===this.mobileBreakpoint}},created:function(){this.$attrs.hasOwnProperty("mobile-break-point")&&Object(n["d"])("mobile-break-point","mobile-breakpoint",this)}})},f757:function(t,e,i){t.exports=i.p+"img/logo-support-2-dark.c21af4d0.png"}}]);