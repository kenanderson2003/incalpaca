class MImageLayer extends HTMLElement{constructor(){super(),this.enableParallax=!1}connectedCallback(){this.enableParallax="true"===this.dataset.enableParallax,this.enableParallax&&(this.initElements(),MinimogTheme.Motion.inView(this,this.initAnimations.bind(this)))}initElements(){this.firstImage=this.querySelector(".m-image-with-text__image-first"),this.secondImage=this.querySelector(".m-image-with-text__image-second"),this.firstImage&&this.secondImage}initAnimations(){this.animateElement(this.secondImage,["translateY(30%)","translateX(0)"]),this.animateElement(this.firstImage,["translateY(-5%)","translateX(0)"])}animateElement(e,t){MinimogTheme.Motion.scroll(MinimogTheme.Motion.animate(e,{transform:t},{easing:"linear"}),{target:e,offset:["start end","end start"]})}}customElements.define("m-image-layer",MImageLayer);