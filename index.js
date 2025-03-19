import{S as L,a as w,i as d}from"./assets/vendor-BrUChrUH.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))l(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&l(i)}).observe(document,{childList:!0,subtree:!0});function a(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerPolicy&&(r.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?r.credentials="include":o.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function l(o){if(o.ep)return;o.ep=!0;const r=a(o);fetch(o.href,r)}})();const M=e=>`
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
    `,S=new L(".gallery a",{captionsData:"alt",captionDelay:250}),m=()=>{S.refresh()},f=(e,t)=>{const a=t.map(l=>M(l)).join("");e.insertAdjacentHTML("beforeend",a),m()},h=async e=>{try{return(await w.get(`https://pixabay.com/api/?key=49376861-d933ee90ccf66fe84851db78b&q=${e}&image_type=photo&orientation=horizontal&safesearch=true&page=1&per_page=10`)).data}catch(t){throw console.error(t),t}},s={form:document.querySelector("form"),gallery:document.querySelector(".gallery"),loader:document.querySelector(".loader"),loadMore:document.querySelector(".load_btn")};let c=1,n="",u=0;const g=()=>{s.loader.style.display="block"},y=()=>{s.loader.style.display="none"},q=e=>{if(e.preventDefault(),n=e.currentTarget.elements["search-text"].value.trim(),c=1,n===""){d.warning({title:"Warning",message:"Input must contain letters!",position:"topRight"});return}s.gallery.innerHTML="",s.loadMore.classList.add("is-hidden"),g(),h(n).then(({hits:t,totalHits:a})=>{if(t.length===0){d.info({title:"Info",message:"No images found!",position:"topRight",timeout:5e3}),s.form.reset();return}u=Math.ceil(a/10),f(s.gallery,t),m(),c<u&&s.loadMore.classList.remove("is-hidden")}).catch(t=>{console.log(t)}).finally(()=>{y()})},O=()=>{c+=1,s.loadMore.classList.add("is-hidden"),g(),h(n).then(({hits:e})=>{f(s.gallery,e);const t=s.gallery.children[0].getBoundingClientRect().height;$(t*2,1e3),c>=u?(d.info({title:"End of Results",message:"We are sorry, but you have reached the end of search results",position:"topRight",timeout:5e3}),s.loadMore.classList.add("is-hidden")):s.loadMore.classList.remove("is-hidden")}).catch(e=>console.log(e)).finally(()=>y())},$=(e,t)=>{const a=window.scrollY,l=performance.now(),o=r=>{const i=r-l,p=Math.min(i/t,1),v=a+e*(b=>1-Math.pow(1-b,3))(p);window.scrollTo(0,v),p<1&&requestAnimationFrame(o)};requestAnimationFrame(o)};s.form.addEventListener("submit",q);s.loadMore.addEventListener("click",O);
//# sourceMappingURL=index.js.map
