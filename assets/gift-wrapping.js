class GiftWrappingComponent extends HTMLElement{constructor(){super(),this.cartDrawer=document.querySelector("m-cart-drawer"),this.giftWrapId=this.dataset.giftWrapId,this.giftWrapping=this.dataset.giftWrapping,this.cartItemsSize=parseInt(this.getAttribute("cart-items-size")),this.giftWrapsInCart=parseInt(this.getAttribute("gift-wraps-in-cart")),this.itemsInCart=parseInt(this.getAttribute("items-in-cart")),this.loadingIcon=this.querySelector(".m-gift-wrapping--loading"),this.cart=document.querySelector("m-cart-drawer"),this.querySelector('[name="attributes[gift-wrapping]"]').addEventListener("change",(t=>{t.target.checked?this.setGiftWrapping():this.removeGiftWrapping()})),this.cartDrawer||(1==this.cartItemsSize&&this.giftWrapsInCart>0?this.removeGiftWrapping():(this.giftWrapsInCart>0&this.giftWrapsInCart!=this.itemsInCart||this.giftWrapsInCart>0&&"false"===this.giftWrapping||0==this.giftWrapsInCart&&"true"===this.giftWrapping)&&this.setGiftWrapping())}setGiftWrapping(){this.loadingIcon.classList.add("show");const t={method:"POST",headers:new Headers({"Content-Type":"application/json",Accept:"application/json"}),body:JSON.stringify({updates:{[this.giftWrapId]:this.itemsInCart},attributes:{"gift-wrapping":!0}})};this.updateCart(t)}removeGiftWrapping(){this.loadingIcon.classList.add("show");const t={method:"POST",headers:new Headers({"Content-Type":"application/json",Accept:"application/json"}),body:JSON.stringify({updates:{[this.giftWrapId]:0},attributes:{"gift-wrapping":!1,"gift-note":""}})};this.updateCart(t)}updateCart(t){return fetch(`${MinimogSettings.routes.cart_update_url}`,t).then((t=>t.json())).then((t=>{this.loadingIcon.classList.remove("show"),document.body.classList.contains("template-cart")?window.location.href=MinimogSettings.routes.cart:this.cartDrawer&&(this.cart.onCartDrawerUpdate(),this.cartDrawer.classList.toggle("m-cart--empty",0===t.item_count),MinimogEvents.emit(MinimogTheme.pubSubEvents.cartUpdate,t))})).catch((t=>{}))}}customElements.define("m-gift-wrapping-component",GiftWrappingComponent);class GiftNoteComponent extends HTMLElement{constructor(){super(),this.addEventListener("change",debounce((t=>{let i={method:"POST",headers:new Headers({"Content-Type":"application/json",Accept:"application/json"}),body:JSON.stringify({attributes:{"gift-note":t.target.value}})};fetch(`${MinimogSettings.routes.cart_update_url}`,i)}),300))}}customElements.define("m-gift-note-component",GiftNoteComponent);class GiftWrappingQuantityInput extends MQuantityInput{constructor(){super()}init(){super.init(),this.giftWrapping=document.querySelector("m-gift-wrapping-component"),this.cartItemsSize=parseInt(this.getAttribute("cart-items-size")),this.giftWrapsInCart=parseInt(this.getAttribute("gift-wraps-in-cart")),this.itemsInCart=parseInt(this.getAttribute("items-in-cart")),1==this.cartItemsSize&&this.giftWrapsInCart>0?this.giftWrapping.removeGiftWrapping():(this.giftWrapsInCart>0&this.giftWrapsInCart!=this.itemsInCart||this.giftWrapsInCart>0&&0==this.giftWrapping.length||0==this.giftWrapsInCart&&this.giftWrapping.length>0)&&this.update()}update(){this.input.value=this.itemsInCart,this.input.dispatchEvent(this.changeEvent)}}customElements.define("m-gift-wrapping-input",GiftWrappingQuantityInput);