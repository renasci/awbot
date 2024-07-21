import axios from "axios";
import { webShareToken as token } from "./token.js";
import { MongoClient } from "mongodb";

export class ProxyManage {
  constructor(url = "mongodb://127.0.0.1:27017/") {
    this.url = url;
    this.mongoClient = new MongoClient(this.url);
    this.db = this.mongoClient.db("proxyList");
    this.col = this.db.collection("proxyList");
  }
  
  async init() {
    
    
    await this.mongoClient.connect();
  }

  //+

  async getWebShareProxyList() {
    let mainProxy = await this.col.distinct('mainProxy.proxy', {'mainProxy.provider': "webshare"});
    return mainProxy
  }

  async getUserProxy(user) {
    try {
      let proxy = await this.col.find({user: user}).toArray();
      let  [{additionalProxy:{proxy:additionalProxy}, mainProxy:{proxy:mainProxy}}] = proxy
      //console.log({additionalProxy, mainProxy})

      return {additionalProxy, mainProxy}
    } catch(e) {
      console.log(`-----Getting proxy Error`, e)
      return {
        additionalProxy: null,
        mainProxy: null
      }
    }

  }

//+
  async  getWebshareReplacedProxy() {
    try {
      let gettedProxy = [];
      let page = 1;
      let condition = true;
      do {
        let resp = await axios.get(
          `https://proxy.webshare.io/api/v2/proxy/list/replaced/?page=${page}&page_size=100`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        console.log(`page: ${page} len: ${resp.data.results.length}`);
        page++;
        condition = resp.data.results.length;
        resp.data.results.forEach((item) => {
          gettedProxy.push(item);
        });
      } while (condition);
  
      for (let i = 0; i < gettedProxy.length; i++) {
        const proxy = gettedProxy[i];
        proxy.order = i + 1;
      }
  
      return gettedProxy;
    } catch (e) {
      console.log(e);
      return [];
    }
  }

  //+
  async checkReplaces() {
    let toUpdateProxies = {

    }
    
    let replcedProxies = await this.getWebshareReplacedProxy()
    
    
    let newProxylist = await this.getProxyList()

    let additionalProxy = await this.col.distinct('additionalProxy.proxy', {'additionalProxy.provider': "webshare"});
    let mainProxy = await this.col.distinct('mainProxy.proxy', {'mainProxy.provider': "webshare"});
    //console.log(mainProxy)
    
    let currentProxies = Array.from(new Set([...additionalProxy, ...mainProxy]))

    //console.log(currentProxies)
    
    if(!newProxylist.length || !currentProxies.length) {
      console.log(`proxyError`, )
      return
    }

    /* replcedProxies = replcedProxies.filter(replcedProxy => {
      return currentProxies.some(currentProxy => currentProxy.includes(replcedProxy))
    }) */

    /* for (let proxy of replcedProxies) {
      //console.log(proxy)
      if(currentProxies.some(item => item.includes(proxy.proxy))) {
        console.log(proxy)
      }
    }  */
    //currentProxies.push(`tthvfccd:i6lf335egpfo@173.0.10.40:0000`)
    for (let proxy of currentProxies) {
      let [,, ip] = proxy.split(/[:,@]/)
      //console.log(ip)
      let isInclude = newProxylist.some(item => item.proxy_address === ip)
      
      if(!isInclude) {
        //console.log(isInclude)
        let replacement = replcedProxies.filter(item => item.proxy === ip)
        //console.log(`replacement`, replacement)
        if(!replacement.length) {
          console.log(`replacement isn't found`);
          continue
        }
        toUpdateProxies[proxy] = `${replacement[0].replaced_with}:${replacement[0].replaced_with_port}`
        
      }
      
    } 

    

    console.log(`toUpdateProxies`, toUpdateProxies)



    
    for(const proxy in toUpdateProxies) {
      //let data = await this.col.find({proxy: proxy, provider: "webshare" }).toArray();
      let data = await this.col.updateMany(
        {'additionalProxy.proxy': proxy, 'additionalProxy.provider': "webshare" }, 
        { $set: { 'additionalProxy.proxy': `tthvfccd:i6lf335egpfo@${toUpdateProxies[proxy]}`}});
      console.log(data)

      let data1 = await this.col.updateMany(
        {'mainProxy.proxy': proxy, 'mainProxy.provider': "webshare" }, 
        { $set: { 'mainProxy.proxy': `tthvfccd:i6lf335egpfo@${toUpdateProxies[proxy]}`}});
      console.log(data1)
    }


    if(toUpdateProxies.length) {
      return true
    }

  }

  //+
  async getProxyList() {
    try {
      let gettedProxy = [];
      let page = 1;
      let condition = true;
      do {
        let resp = await axios.get(
          `https://proxy.webshare.io/api/v2/proxy/list/?mode=direct&page=${page}&page_size=100`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        console.log(`page: ${page} len: ${resp.data.results.length}`);
        page++;
        condition = resp.data.results.length;
        resp.data.results.forEach((item) => {
          gettedProxy.push(item);
        });
      } while (condition);

      for (let i = 0; i < gettedProxy.length; i++) {
        const proxy = gettedProxy[i];
        proxy.order = i + 1;
      }

      return gettedProxy;
    } catch (e) {
      console.log(e);
      return [];
    }
  }

  async checkProxyCount() {
    let obj = {
      totalProxies: 0,
      totalUsers: 0,
      min: Infinity,
      max: 0
    }
    let currentProxies = await this.col.distinct('mainProxy.proxy');
    obj.totalProxies = currentProxies.length
    for (const proxy of currentProxies) {
      let proxies = await this.col.find({'mainProxy.proxy': proxy}).toArray();
      obj.totalUsers = obj.totalUsers + proxies.length;
      obj.min = Math.min(obj.min, proxies.length);
      obj.max = Math.max(obj.max, proxies.length);
    }
 
    return obj
  }
}
