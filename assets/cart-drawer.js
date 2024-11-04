class MCartDrawer extends HTMLElement{constructor(){super(),this.cartDrawerInner=this.querySelector(".m-cart-drawer__inner"),this.cartDrawerCloseIcon=this.querySelector(".m-cart-drawer__close"),this.cartOverlay=this.querySelector(".m-cart__overlay"),this.rootUrl=window.Shopify.routes.root,this.setHeaderCartIconAccessibility(),this.cartDrawerCloseIcon.addEventListener("click",this.close.bind(this)),this.addEventListener("click",(e=>{e.target.closest(".m-cart-drawer__inner")!==this.cartDrawerInner&&this.close()}))}setHeaderCartIconAccessibility(){document.querySelectorAll(".m-cart-icon-bubble").forEach((e=>{e.setAttribute("role","button"),e.setAttribute("aria-haspopup","dialog"),e.addEventListener("click",(t=>{MinimogSettings.enable_cart_drawer&&(t.preventDefault(),this.open(e))}))}))}open(e){e&&this.setActiveElement(e),this.classList.add("m-cart-drawer--active"),requestAnimationFrame((()=>{this.style.setProperty("--m-bg-opacity","0.5"),this.cartDrawerInner.style.setProperty("--translate-x","0")})),window.MinimogEvents.emit(MinimogTheme.pubSubEvents.openCartDrawer),document.documentElement.classList.add("prevent-scroll")}close(){this.style.setProperty("--m-bg-opacity","0"),this.cartDrawerInner.style.setProperty("--translate-x","100%"),setTimeout((()=>{this.classList.remove("m-cart-drawer--active"),document.documentElement.classList.remove("prevent-scroll")}),300)}renderContents(e){this.classList.contains("m-cart--empty")&&this.classList.remove("m-cart--empty"),this.productId=e.id,this.getSectionsToRender().forEach((t=>{(t.selector?document.querySelector(t.selector):document.getElementById(t.id)).innerHTML=this.getSectionInnerHTML(e.sections[t.id],t.selector)})),setTimeout((()=>{this.open()}))}updateCartCount(e){document.querySelectorAll(".m-cart-count-bubble").forEach((t=>{e>0?(t.textContent=e,t.classList.remove("m:hidden")):t.classList.add("m:hidden")}))}getCart(){return fetchJSON(this.rootUrl+"cart.json")}onCartDrawerUpdate(e=!0){fetch(`${MinimogSettings.routes.cart}?section_id=cart-drawer`).then((e=>e.text())).then((t=>{this.getSectionsToRender().forEach((r=>{if("cart-items"===r.block){(r.selector?document.querySelector(r.selector):document.getElementById(r.id)).innerHTML=this.getSectionInnerHTML(t,r.selector)}else if(e){(r.selector?document.querySelector(r.selector):document.getElementById(r.id)).innerHTML=this.getSectionInnerHTML(t,r.selector)}}))})).catch((e=>{})),this.getCart().then((e=>{this.classList.toggle("m-cart--empty",0===e.item_count),this.updateCartCount(e.item_count)}))}getSectionInnerHTML(e,t=".shopify-section"){return(new DOMParser).parseFromString(e,"text/html").querySelector(t).innerHTML}getSectionsToRender(){return[{id:"cart-drawer",selector:"[data-minimog-cart-items]",block:"cart-items"},{id:"cart-drawer",selector:"[data-minimog-cart-discounts]",block:"cart-footer"},{id:"cart-drawer",selector:"[data-cart-subtotal]",block:"cart-footer"},{id:"cart-drawer",selector:"[data-minimog-gift-wrapping]",block:"cart-footer"}]}getSectionDOM(e,t=".shopify-section"){return(new DOMParser).parseFromString(e,"text/html").querySelector(t)}setActiveElement(e){this.activeElement=e}}customElements.define("m-cart-drawer",MCartDrawer);class MCartDrawerItems extends MCartTemplate{getSectionsToRender(){return[{id:"MinimogCartDrawer",section:"cart-drawer",selector:"[data-minimog-cart-items]"},{id:"MinimogCartDrawer",section:"cart-drawer",selector:"[data-minimog-cart-discounts]"},{id:"MinimogCartDrawer",section:"cart-drawer",selector:"[data-cart-subtotal]"},{id:"MinimogCartDrawer",section:"cart-drawer",selector:"[data-minimog-gift-wrapping]"}]}}customElements.define("m-cart-drawer-items",MCartDrawerItems);