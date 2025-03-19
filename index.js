import{S as b,a as w,i as u}from"./assets/vendor-BrUChrUH.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))a(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&a(n)}).observe(document,{childList:!0,subtree:!0});function i(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(t){if(t.ep)return;t.ep=!0;const r=i(t);fetch(t.href,r)}})();const M=e=>`
    <li class="gallery_card">
        <a class="gallery-link" href="${e.largeImageURL}">
            <img class="gallery_img" src="${e.webformatURL}" alt="${e.tags}"/>
        </a>
        <div class="img_info">
                <div class="info-item">
                    <p class="label">Likes</p>
                    <p class="value">${e.likes}</p>
                </div>
                <div class="info-item">
                    <p class="label">Views</p>
                    <p class="value">${e.views}</p>
                </div>
                <div class="info-item">
                    <p class="label">Comments</p>
                    <p class="value">${e.comments}</p>
                </div>
                <div class="info-item">
                    <p class="label">Downloads</p>
                    <p class="value">${e.downloads}</p>
                </div>
        </div>
    </li>
    `,S=new b(".gallery a",{captionsData:"alt",captionDelay:250}),m=()=>{S.refresh()},h=(e,s)=>{const i=s.map(a=>M(a)).join("");e.insertAdjacentHTML("beforeend",i),m()},q="49376861-d933ee90ccf66fe84851db78b",O="https://pixabay.com/api/",y=async(e,s=1,i=10)=>{try{return(await w.get(O,{params:{key:q,q:e,image_type:"photo",orientation:"horizontal",safesearch:!0,page:s,per_page:i}})).data}catch(a){throw console.error(a),a}},o={form:document.querySelector("form"),gallery:document.querySelector(".gallery"),loader:document.querySelector(".loader"),loadMore:document.querySelector(".load_btn")};let l=1,c="",p=0;const g=()=>{o.loader.style.display="block"},d=()=>{o.loader.style.display="none"},P=async e=>{if(e.preventDefault(),c=e.currentTarget.elements["search-text"].value.trim(),l=1,c===""){u.warning({title:"Warning",message:"Input must contain letters!",position:"topRight"});return}o.gallery.innerHTML="",o.loadMore.classList.add("is-hidden"),g();try{const{hits:s,totalHits:i}=await y(c,l);if(d(),s.length===0){u.info({title:"Info",message:"No images found!",position:"topRight",timeout:5e3}),o.form.reset();return}p=Math.ceil(i/10),h(o.gallery,s),m(),l<p&&o.loadMore.classList.remove("is-hidden")}catch(s){console.error(s),d()}},R=async()=>{l+=1,o.loadMore.classList.add("is-hidden"),g();try{const{hits:e}=await y(c,l);d(),h(o.gallery,e),m();const s=o.gallery.children[0].getBoundingClientRect().height;_(s*2,1e3),l>=p?(u.info({title:"End of Results",message:"We are sorry, but you have reached the end of search results",position:"topRight",timeout:5e3}),o.loadMore.classList.add("is-hidden")):o.loadMore.classList.remove("is-hidden")}catch(e){console.error(e),d()}},_=(e,s)=>{const i=window.scrollY,a=performance.now(),t=r=>{const n=r-a,f=Math.min(n/s,1),v=i+e*(L=>1-Math.pow(1-L,3))(f);window.scrollTo(0,v),f<1&&requestAnimationFrame(t)};requestAnimationFrame(t)};o.form.addEventListener("submit",P);o.loadMore.addEventListener("click",R);
//# sourceMappingURL=index.js.map
