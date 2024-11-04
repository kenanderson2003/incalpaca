class MStlCard extends HTMLElement{constructor(){super(),this.selectors={cardBtn:".m-stl-card__btn",popup:".m-stl-popup",overlayCard:".m-stl-card__overlay",closePopupBtn:".m-stl-popup__close-btn"},this.domNodes=queryDomNodes(this.selectors,this),this.domNodes.cardBtn&&this.domNodes.cardBtn.addEventListener("click",this.showPopup.bind(this)),this.domNodes.closePopupBtn&&this.domNodes.closePopupBtn.addEventListener("click",this.hidePopup.bind(this)),this.domNodes.overlayCard&&this.domNodes.overlayCard.addEventListener("click",this.hidePopup.bind(this))}showPopup(){if(!this.domNodes.popup)return;const{cardBtn:s,popup:o,overlayCard:t}=this.domNodes;s?.classList.add("is-hide"),o.classList.add("is-show"),t.classList.add("is-show"),document.querySelector("html")?.classList.add("no-scroll")}hidePopup(){if(!this.domNodes.popup)return;const{popup:s,overlayCard:o,cardBtn:t}=this.domNodes;s?.classList.remove("is-show"),o.classList.remove("is-show"),document.querySelector("html")?.classList.remove("no-scroll"),t?.classList.remove("is-hide")}}customElements.define("m-stl-card",MStlCard);