import{S as L,a as w,i as d}from"./assets/vendor-BrUChrUH.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))l(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&l(n)}).observe(document,{childList:!0,subtree:!0});function a(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function l(t){if(t.ep)return;t.ep=!0;const r=a(t);fetch(t.href,r)}})();const M=e=>`
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
    `,S=new L(".gallery a",{captionsData:"alt",captionDelay:250}),m=()=>{S.refresh()},f=(e,o)=>{const a=o.map(l=>M(l)).join("");e.insertAdjacentHTML("beforeend",a),m()},h=async(e,o)=>{try{return(await w.get(`https://pixabay.com/api/?key=49376861-d933ee90ccf66fe84851db78b&q=${e}&image_type=photo&orientation=horizontal&safesearch=true&page=${o}&per_page=10`)).data}catch(a){throw console.error(a),a}},s={form:document.querySelector("form"),gallery:document.querySelector(".gallery"),loader:document.querySelector(".loader"),loadMore:document.querySelector(".load_btn")};let i=1,c="",u=0;const g=()=>{s.loader.style.display="block"},y=()=>{s.loader.style.display="none"},$=e=>{if(e.preventDefault(),c=e.currentTarget.elements["search-text"].value.trim(),i=1,c===""){d.warning({title:"Warning",message:"Input must contain letters!",position:"topRight"});return}s.gallery.innerHTML="",s.loadMore.classList.add("is-hidden"),g(),h(c,i).then(({hits:o,totalHits:a})=>{if(o.length===0){d.info({title:"Info",message:"No images found!",position:"topRight",timeout:5e3}),s.form.reset();return}u=Math.ceil(a/10),f(s.gallery,o),m(),i<u&&s.loadMore.classList.remove("is-hidden")}).catch(o=>{console.log(o)}).finally(()=>{y()})},q=()=>{i+=1,s.loadMore.classList.add("is-hidden"),g(),h(c,i).then(({hits:e})=>{f(s.gallery,e);const o=s.gallery.children[0].getBoundingClientRect().height;O(o*2,1e3),i>=u?(d.info({title:"End of Results",message:"We are sorry, but you have reached the end of search results",position:"topRight",timeout:5e3}),s.loadMore.classList.add("is-hidden")):s.loadMore.classList.remove("is-hidden")}).catch(e=>console.log(e)).finally(()=>y())},O=(e,o)=>{const a=window.scrollY,l=performance.now(),t=r=>{const n=r-l,p=Math.min(n/o,1),v=a+e*(b=>1-Math.pow(1-b,3))(p);window.scrollTo(0,v),p<1&&requestAnimationFrame(t)};requestAnimationFrame(t)};s.form.addEventListener("submit",$);s.loadMore.addEventListener("click",q);
//# sourceMappingURL=index.js.map
