import {Worker} from 'node:worker_threads';
import fs from "fs/promises"
import MongoClient1 from 'mongodb';
import fetch from 'node-fetch';
import WebSocket from 'websocket'

import { startServerFront } from "./server.js";
import {AbortController}  from "node-abort-controller";
import HttpsProxyAgent  from 'https-proxy-agent' ;
import { start } from "repl";
import { EventEmitter } from 'node:events';
import {miningOrderList} from "./miningOrderList.js"
import dotenv from 'dotenv';
import { ProxyManage } from './manageProxy.js';

//db.collection.count({/* criteria */}, { limit: 1 })
/* global.console.log = (...arg) => {
  
} */
dotenv.config()


process.on("uncaughtException", function (err) {
  console.error(err.stack);
  console.log("GLOBAL CATCH ERROR...");
});

const proxyManage = new ProxyManage(process.env.MONGO_URL);
await proxyManage.init();
class App {

  constructor() {
    this.state = {
      appData: {},
      checkProxy: {},
      status: ` `,
      usersok: false,
      isStarted: false,
      isPaused: false,
      fetchLastMineTime : 0,
      fetchBag: false,
      fetchLand: false,
      defDelay: 1,
      minMiningDelay: 12,
      maxMiningDelay: 20
    }
    this.workList = {}
    this.usersList = []
    this.users = {}
    this.dataApi = `https://wax.pink.gg`;
    this.userWorker = null;
    this.eventEmitter = new EventEmitter();
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async startSocket() {
    let ws = new WebSocket.client();
    
    ws.on('connectFailed', async (error) => {
      console.log('Connect Error: connectFailed' + error.toString());
      await this.sleep(5000)
      this.socket = startSocket();
    });
  
    ws.on('connect', (connection) => {
      
      connection.send("getTotalCount");

      setInterval(() => {
        connection.send("getTotalCount");
      }, 30000)
  
      connection.on('close', async () => {
          console.log('echo-protocol Connection Closed');
          await this.sleep(5000)
          this.socket = startSocket();
      });
  
      connection.on('message', (message) => {
        try {
         
          if(message.utf8Data.includes(`inform`)) {
            let [, workers, threads] = message.utf8Data.split(` `);
            
            this.state.appData.serverData = `workers: ${workers} | threads: ${threads}`
            //console.log(`{[, workers, threads]`, workers, threads)

          }
        } catch(e) {
          console.log(`ws.onmessage ERROR`, e)
        }
  
  
      });
      
  
      
  });
  
  
  
  
  
  
    
  
  
    ws.connect(process.env.WEBSOCKET_URL, 'echo-protocol');
  
    return ws
  }
  async getProxies() {




    for (const user of this.usersList) {
      let proxyData = await proxyManage.getUserProxy(user)
     
      if(!proxyData.mainProxy || !proxyData.additionalProxy) {
        throw new Error(`getMinersAndProxiesNew error Empty proxy`)
        return
      }

      this.users[user].mainProxy = proxyData.mainProxy;
      this.users[user].additionalProxy = proxyData.additionalProxy;

    }
  }

  async updateProxies() {
    console.log(`updating proxies`)
    try {
      
    let res = await proxyManage.checkReplaces()
    
    res && await this.getProxies()

    
    let checkProxy = this.checkProxyCount();
    console.log(checkProxy)
    
    this.state.checkProxy = checkProxy
    this.state.appData.checkProxy = `${Object.entries(checkProxy).map(i => `${i.join(' ')}`).join(`|`)}`
    console.log(this.state.appData)
    if(this.state.checkProxy.max > 10) {
      this.state.isPaused = true;
      this.state.appData[`ERROR`] = `Error: proxy limit reached`
      console.log(`Error: proxy limit reached`)
      return
    }
    } catch (error) {

      console.log(`updateProxies Error`, error)
    }

  }

  checkProxyCount() {
    let obj = {
      totalProxies: 0,
      totalUsers: 0,
      min: Infinity,
      max: 0
    }
    let currentProxies = Array.from(new Set(
      Object.values(this.users).map(user => user.mainProxy)
    ))//await this.col.distinct('mainProxy.proxy');
    console.log(`currentProxies`, currentProxies.length)
    obj.totalProxies = currentProxies.length
    for (const proxy of currentProxies) {
      let proxies = Object.values(this.users).filter(user => user.mainProxy === proxy)//await this.col.find({'mainProxy.proxy': proxy}).toArray();
      obj.totalUsers = obj.totalUsers + proxies.length;
      obj.min = Math.min(obj.min, proxies.length);
      obj.max = Math.max(obj.max, proxies.length);
    }
 
    return obj
  }

  async start() {
    if(!this.state.isStarted) {

      this.state.isStarted = true
      this.startSocket()
      //console.log(`after`, this.users)
      await this.getMinersAndProxiesNew();
      //console.log(`after getMinersAndProxiesNew`, this.users)
      await this.getMineDataNew();
      //console.log(`after getMineDataNew`, this.users)
      console.log(`checking proxy`)
      let checkProxy = this.checkProxyCount();
      console.log(checkProxy)
      
      this.state.checkProxy = checkProxy
      this.state.appData.checkProxy = `${Object.entries(checkProxy).map(i => `${i.join(' ')}`).join(`|`)}`
      console.log(this.state.appData)
      if(this.state.checkProxy.max > 10) {
        this.state.isPaused = true;
        this.state.appData[`ERROR`] = `Error: proxy limit reached`
        console.log(`Error: proxy limit reached`)
        return
      }
      
      //return




      this.state.usersok = true;


      console.log(`start`)
      //console.log(`after start`, this.users)
      this.usersList.forEach((item) => {
        this.workList[item] = this.work(item, this);

        this.users[item].miningOrder = 
        miningOrderList[item] ? 
        miningOrderList[item] :
        Math.ceil( 24 * Math.random())

        if(!miningOrderList[item]) {
          console.log(`---USER WITHOUT MINING ORDER`, item, this.users[item].miningOrder)
        }


      })

      

      setInterval(() => {
        if(this.state.isPaused) {
          return
        }

        if(this.state.checkProxy.max > 10) {
          this.state.isPaused = true;
          this.state.appData[`ERROR`] = `Error: proxy limit reached`
          console.log(`Error: proxy limit reached`)
          return
        }

        let countUsers = 0;
        let waitingUsers = 0;
        let date = new Date();
        let hours = date.getHours()
        //console.log(`--ssss`, this.usersList)
        this.usersList.forEach((item) => {
          /* let miningOrderData = this.isOrderToMine(this.users[item].miningOrder, hours)
          this.users[item].status = miningOrderData.text */
          //console.log(`--ssss`, this.users[item].nextMine, Date.now() > this.users[item].nextMine)
          //console.log(`this.users[item]`, this.users[item])
          if(Date.now() > this.users[item].nextMine /* && !this.users[item].status.includes(`Nothing to be mined`) */) {
            //let oursToMine = this.users[item].miningOrder < 2 ? 6 : this.users[item].miningOrder < 5 ? 8 : 10;
            //let oursToMine = this.users[item].miningOrder < 2 ? 12 : this.users[item].miningOrder < 3 ? 11 : 12;
            let miningOrderData = this.isOrderToMine(this.users[item].miningOrder, hours/* , oursToMine */);
            

            if(!miningOrderData.isTime) {
              //console.log(`!miningOrderData.isTime`, !miningOrderData.isTime)
              waitingUsers++
              this.users[item].status = miningOrderData.text
            } else {
              if(this.users[item].status.includes(`User order`)) {
                this.users[item].status = ``;

                this.users[item].nextMine = Date.now() + Math.round(Math.random() * 1000 * 60 *25);
                return
              }

               countUsers++
              
              if(countUsers < 80 ) { // 100 = 25min
                //console.log(`dddd`)
                this.workList[item]()
              }
            }
          }
        })
        console.log(`---countUsers ${countUsers} | waitingUsers ${waitingUsers}`)
      }, 30000)


      /* setInterval(async () => {
        for (let user of this.usersList) {
          if(this.users[user].cosign_ratelimit_txs && this.users[user].cosign_remaining_txs) {
            await this.collection.updateOne({name: this.users[user].name}, 
              { 
                $set: {
                  cosign_ratelimit_txs: this.users[user].cosign_ratelimit_txs, 
                  cosign_remaining_txs: this.users[user].cosign_remaining_txs
                }
              })
          }
          
        }
      }, 1000 * 60 * 20) */

      //console.log(this)


    } else {
      console.log(`already started`)
    
    }

  }

  isOrderToMine(userOrder, currentHours, totalHoursToMine = 12) {
    let minTime = userOrder;
    let maxTime =
      userOrder + totalHoursToMine > 24
        ? userOrder + totalHoursToMine - 24
        : userOrder + totalHoursToMine;
  
    let obj = {};
  
    if (maxTime > minTime) {
      obj.isTime = currentHours + 1 > minTime && currentHours + 1 <= maxTime;
    } else {
      obj.isTime = currentHours + 1 > minTime || currentHours + 1 <= maxTime;
    }
  
    obj.text = `User order ${userOrder}, Mine from ${minTime} to ${maxTime}`;
    return obj;
  }

  work(user_) {
    let user;
    if(user_) {
      user = user_
    }
    let isMining = false
    
    function forbind() {
      if(isMining) {
        //console.log(`alredy mining`)
        return
      }
      return new Promise((res) => {
        try{
          isMining = true
          if(!this.userWorker) {
            this.userWorker = new Worker(`./user.js`);
            this.userWorker.on('message', (msg) => {
              //console.log(`main msg`, msg)
              this.users[msg.data.name] = msg.data
              if(msg.type === `finish`) {
                //console.log(`--------finish`)
                //isMining = false
                this.eventEmitter.emit(msg.data.name)
                //res()
              }
            })
  
            this.userWorker.on('error', (msg) => {
              console.log(`userWorker error`, msg);
              //isMining = false
              this.userWorker = null
              //res()
            })


          }
          let timeOut = setTimeout(() => {
            isMining = false
            res()
          }, 1000 * 60 * 5)

          this.eventEmitter.once(user, (stream) => {
            clearTimeout(timeOut)
            isMining = false
            res()
          });


          this.userWorker.postMessage({
            data: this.users[user]
          })
        } finally {
          //console.log(`--------finally`)
        }
      })

    }
    return forbind.bind(this)
  }

  async getMinersAndProxiesNew() {
    console.log(`getMinersAndProxiesNew`)
    let data = await fs.readFile(`./data/users.txt`, { encoding: 'utf8' });
    data = data.split(`\n`);
    data = data.map((item) => item.trim());
    this.usersList = data.filter((item) => !!item);
    console.log(`this.usersList`, this.usersList)
   

    this.updateProxies()
    

    for (const user of this.usersList) {
      let proxyData = await proxyManage.getUserProxy(user)
      //console.log(proxyData)
      if(!proxyData.mainProxy || !proxyData.additionalProxy) {
        throw new Error(`getMinersAndProxiesNew error Empty proxy`)
        return
      }
      let userData = {
        "name": user,
        "status": "",
        "lastMineTime": 0,
        "delay": 0,
        "nextMine": 0,
        "numberOfMines": 0,
        "mainProxy": proxyData.mainProxy,
        "additionalProxy": proxyData.additionalProxy,
        "bagMiningParams": {
            "delay": 160,
            "difficulty": 0,
            "ease": 3
        },
        "landMiningParams": {
            "delay": 50,
            "difficulty": 0,
            "ease": 25
        }
      }
      //console.log(`userData`, userData)
      this.users[user] = userData
    }
  }

  async getMineDataNew() {
      console.log(`getMineDataNew`)
  
      for (const user of this.usersList) {
        this.state.status = (`Set next mine time... ${user} [${this.usersList.indexOf(user) + 1}/${this.usersList.length}]`);
        if(Date.now() > this.users[user].lastMineTime) {
          //console.log(`this.users[user].lastMineTime`, this.users[user].lastMineTime, Date.now() > this.users[user].lastMineTime)
          //this.users[user].nextMine = Date.now()
          this.users[user].nextMine = Date.now() + Math.round(Math.random() * 1000 * 60 * 15) //////---------------------10
          //this.users[user].nextMine = Date.now() +  1000
        } else {
          this.users[user].nextMine = this.users[user].lastMineTime + this.users[user].delay * 1000 + 1000 * 60 * this.minMiningDelay + Math.round(Math.random() * 1000 * 60 * Math.abs(this.maxMiningDelay - this.minMiningDelay));
        }
      }
      this.state.status = ''
  }

  
 
}




export {App}

( async () => {
  let app = new App()
  startServerFront(app)
  
  /* await app.start()
  console.log(`---------------------------111`, app.users) */
}
)()


