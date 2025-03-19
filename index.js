import{S as L,a as w,i as p}from"./assets/vendor-PV3DRL1W.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))a(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&a(n)}).observe(document,{childList:!0,subtree:!0});function l(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(t){if(t.ep)return;t.ep=!0;const r=l(t);fetch(t.href,r)}})();const m=e=>`
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
    `,f=()=>{new L(".gallery a",{captionsData:"alt",captionDelay:250}).refresh()},h=async(e,o,l)=>{try{return(await w.get(`https://pixabay.com/api/?key=49376861-d933ee90ccf66fe84851db78b&q=${e}&image_type=photo&orientation=horizontal&safesearch=true&page=${o}&per_page=${l}`)).data}catch(a){throw console.error(a),a}},s={form:document.querySelector("form"),gallery:document.querySelector(".gallery"),loader:document.querySelector(".loader"),loadMore:document.querySelector(".load_btn")};let i=1,c="",d=0;const g=()=>{s.loader.style.display="block"},y=()=>{s.loader.style.display="none"},M=e=>{if(e.preventDefault(),c=e.currentTarget.elements["search-text"].value.trim(),i=1,c===""){p.warning({title:"Warning",message:"Input must contain letters!",position:"topRight"});return}s.gallery.innerHTML="",s.loadMore.classList.add("is-hidden"),g(),h(c,i,10).then(({hits:o,totalHits:l})=>{if(o.length===0){p.info({title:"Info",message:"We are sorry, but you have reached the end of search results!",position:"topRight",timeout:5e3}),s.form.reset(),s.gallery.innerHTML="";return}d=Math.ceil(l/10);const a=o.map(t=>m(t)).join("");s.gallery.innerHTML=a,f(),i<d&&s.loadMore.classList.remove("is-hidden")}).catch(o=>{console.log(o)}).finally(()=>{y()})},S=()=>{i+=1,g(),h(c,i,10).then(({hits:e})=>{const o=e.map(a=>m(a)).join("");s.gallery.insertAdjacentHTML("beforeend",o);const l=s.gallery.children[0].getBoundingClientRect().height;$(l*2,1e3),f(),i>=d&&s.loadMore.classList.add("is-hidden")}).catch(e=>console.log(e)).finally(()=>y())},$=(e,o)=>{const l=window.scrollY,a=performance.now(),t=r=>{const n=r-a,u=Math.min(n/o,1),b=l+e*(v=>1-Math.pow(1-v,3))(u);window.scrollTo(0,b),u<1&&requestAnimationFrame(t)};requestAnimationFrame(t)};s.form.addEventListener("submit",M);s.loadMore.addEventListener("click",S);
//# sourceMappingURL=index.js.map
