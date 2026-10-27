"use strict";
const test=require("node:test"),assert=require("node:assert/strict"),fs=require("node:fs"),path=require("node:path"),vm=require("node:vm");
const root=process.env.BNN_TEST_SOURCE||path.resolve(__dirname,"..");
const items=[
  {title:"Creekside park expansion",url:"/news/creekside/",category:"Local",summary:"Breaking ground",reporter:"Clyde",tags:["creekside"],date:"Aug 13",image:"/images/creekside.webp",image_alt:"A ceremonial shovel"},
  {title:"Council approves park",url:"/news/council/",category:"Politics",summary:"Creekside park vote",reporter:"Patty",tags:["parks"],date:"Aug 12",image:"/images/council.webp",image_alt:"A council chamber"},
  {title:"The bench was never about the bench",url:"/opinion/bench/",category:"Opinion",summary:"A council dispatch",reporter:"Patty",tags:["creekside"],date:"Aug 12",image:"",image_alt:""}
];
async function boot(data=items,initial=""){
  const timers=new Map();let next=1;
  function element(tag){
    let html="";const events={};
    return {tagName:tag.toUpperCase(),children:[],dataset:{},className:"",textContent:"",value:"",
      set innerHTML(value){html=value;this.children=[];this.plate=value.includes('class="media-plate ')?element("div"):null;},get innerHTML(){return html;},
      addEventListener(name,fn){events[name]=fn;},dispatch(name){events[name]?.();},appendChild(child){this.children.push(child);return child;},querySelector(selector){return selector===".media-plate"?this.plate:null;}};
  }
  const input=element("input"),results=element("div"),status=element("p");results.dataset={indexUrl:"/index.json",categoryBase:"/categories/"};
  const context={document:{querySelector:selector=>({"[data-search-input]":input,"[data-search-results]":results,"[data-search-status]":status})[selector],createElement:element},URLSearchParams,location:{search:initial},setTimeout(fn){const id=next++;timers.set(id,fn);return id;},clearTimeout(id){timers.delete(id);},fetch:async url=>{assert.equal(url,"/index.json");return {json:async()=>data};}};
  context.window=context;vm.createContext(context);vm.runInContext(fs.readFileSync(path.join(root,"assets/js/search.js"),"utf8"),context);
  for(let i=0;i<8;i++)await Promise.resolve();
  function runTimers(){for(const[id,fn]of [...timers]){timers.delete(id);fn();}}
  return {results,status,input,runTimers,search(query){input.value=query;input.dispatch("input");runTimers();},images(){return results.children.flatMap(card=>card.plate?.children.filter(child=>child.tagName==="IMG")||[]);},labels(){return results.children.flatMap(card=>card.plate?.children.filter(child=>child.tagName==="SPAN")||[]);}};
}
test("text matching keeps three Creekside results and renders the two supplied images",async()=>{
  const app=await boot();app.search("creekside");assert.equal(app.results.children.length,3);assert.match(app.status.textContent,/3 results/);assert.equal(app.images().length,2);
});
test("result images use existing card styling, native lazy loading and declared alt text",async()=>{
  const app=await boot();app.search("expansion");const image=app.images()[0];assert.ok(image);assert.equal(image.src,items[0].image);assert.equal(image.alt,items[0].image_alt);assert.equal(image.className,"media-plate__image");assert.equal(image.loading,"lazy");assert.equal(image.decoding,"async");assert.equal(image.width,1920);assert.equal(image.height,1080);
});
test("missing artwork has a labelled fallback and never an empty image request",async()=>{
  const app=await boot();app.search("opinion");assert.equal(app.results.children.length,1);assert.equal(app.images().length,0);assert.equal(app.labels()[0]?.textContent,"No image supplied");assert.equal(app.labels()[0]?.className,"media-plate__label");
});
test("clearing and replacing the query remove old images without changing matching",async()=>{
  const app=await boot();app.search("creekside");app.search("Politics");assert.equal(app.images().length,1);assert.equal(app.images()[0].src,items[1].image);app.search("");assert.equal(app.results.children.length,0);assert.equal(app.status.textContent,"");
});
test("a prefilled query renders images after the index resolves",async()=>{
  const app=await boot(items,"?q=creekside");app.runTimers();assert.equal(app.results.children.length,3);assert.equal(app.images().length,2);
});
test("a subpath image URL remains rooted at the configured site mount",async()=>{
  const app=await boot([{...items[0],image:"/preview/images/creekside.webp"}]);app.search("creekside");assert.equal(app.images()[0].src,"/preview/images/creekside.webp");
});
test("image alt text is assigned as a literal DOM property",async()=>{
  const alt='A "quoted" <description> & details';const app=await boot([{...items[0],image_alt:alt}]);app.search("creekside");assert.equal(app.images()[0].alt,alt);assert.equal(app.images().length,1);
});
test("built search index carries two Creekside images and an honest missing-image entry",{skip:!process.env.BNN_TEST_SITE},()=>{
  const index=JSON.parse(fs.readFileSync(path.join(process.env.BNN_TEST_SITE,"index.json"),"utf8"));
  const matches=index.filter(item=>JSON.stringify([item.title,item.category,item.summary,item.tags]).toLowerCase().includes("creekside"));
  assert.equal(matches.length,3);assert.equal(matches.filter(item=>item.image).length,2);assert.equal(matches.find(item=>item.url.includes("the-bench-was-never-about-the-bench")).image,"");
  assert.ok(matches.filter(item=>item.image).every(item=>typeof item.image_alt==="string"&&item.image_alt.length>0));
});
test("every declared built-index image resolves to an existing file under its mount",{skip:!process.env.BNN_TEST_SITE},()=>{
  const prefix=process.env.BNN_TEST_BASE_PATH||"/";const index=JSON.parse(fs.readFileSync(path.join(process.env.BNN_TEST_SITE,"index.json"),"utf8"));let checked=0;
  for(const item of index){if(!item.image)continue;assert.ok(item.image.startsWith(prefix),item.image);const local=decodeURIComponent(item.image.slice(prefix.length));assert.ok(fs.statSync(path.join(process.env.BNN_TEST_SITE,local)).isFile(),local);checked++;}
  assert.ok(checked>=2);
});
test("existing text filtering, result counts and empty-query behavior are unchanged",async()=>{
  const app=await boot();app.search("CREEKSIDE");assert.equal(app.results.children.length,3);assert.match(app.status.textContent,/3 results/);app.search("Politics");assert.equal(app.results.children.length,1);app.search("");assert.equal(app.results.children.length,0);assert.equal(app.status.textContent,"");
});
