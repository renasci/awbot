import WebSocket from 'websocket'
import {Worker, parentPort, workerData} from 'node:worker_threads';
import dotenv from 'dotenv';
dotenv.config()
let socket = startSocket();

function startSocket() {
  let ws = new WebSocket.client();
  
  ws.on('connectFailed', async function(error) {
    console.log('Connect Error: connectFailed' + error.toString());
    await sleep(5000)
    socket = startSocket();
  });

  ws.on('connect', function(connection) {
    connection.send("setCount 20");
    connection.send("startMining");

    connection.on('close', function() {
        console.log('echo-protocol Connection Closed');
        socket = startSocket();
    });

    connection.on('message', function(message) {
      try {
        //console.log(`[message] Данные получены с сервера: ${message.utf8Data}`);
        if(message.utf8Data.includes(`calculateHash`)) {
          let [, account, difficulty, transaction] = message.utf8Data.split(` `);
          console.log(`{account, difficulty, transaction}`, {account, difficulty, transaction})
          doWorkWorker({account: account, difficulty: difficulty, transaction: transaction}).then(
            (mine_work) => {
              //console.log(`end wo work`, mine_work)
              connection.send(`solution ${mine_work.solution} ${transaction}`);
            }, (e) => console.log(`doWorkWorker Error`, e)
          );
        }
      } catch(e) {
        console.log(`ws.onmessage ERROR`, e)
      }


    });
    

    
});






  


  ws.connect(process.env.WEBSOCKET_URL, 'echo-protocol');

  return ws
}



function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


function doWorkWorker(t) {
  console.log(`start doWorkWorker`)
  
  var {workers: e, limit: r=Number.MAX_SAFE_INTEGER} = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
  e || (e = h()),
  console.log("Working locally with ".concat(e, " threads"));
  var n = []
    , o = 1e5
    , a = 0
    , s = 0;
  function u(e) {
      e.postMessage({
          target: "hash-solver",
          payload: i(i({}, t), {}, {
              seed: null,
              length: o
          })
      })
  }
  return new Promise(((t,l)=>{
      for (var f = function(c) {
          var f = c;
          //console.log(`-----c`, c);
          f.error && l(new Error(f.error)),
          s++,
          f.solution ? (a += f.iterations * e,
          n.forEach((t=>t.terminate())),
          t(i(i({}, f), {}, {
              iterations: a
          }))) : (a += o,
          s >= r ? (c.target.terminate(),
          (n = n.filter((t=>t === c.target))).length || t({
              iterations: a
          })) : u(p))
      }, h = 0; h < e; h++) {
        
          var p = new Worker(`./awworker.js`);
          
          p.on('message', f)
          p.on('error', l)
          //p.onmessage = f,
          //p.onerror = l,
          n.push(p),
          u(p)
      }
  }
  ))
}

function n(t, e) {
  var r = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
      var n = Object.getOwnPropertySymbols(t);
      e && (n = n.filter((function(e) {
          return Object.getOwnPropertyDescriptor(t, e).enumerable
      }
      ))),
      r.push.apply(r, n)
  }
  return r
}

function o(t, e, r) {
  return e in t ? Object.defineProperty(t, e, {
      value: r,
      enumerable: !0,
      configurable: !0,
      writable: !0
  }) : t[e] = r,
  t
}

function i(t) {
  for (var e = 1; e < arguments.length; e++) {
      var r = null != arguments[e] ? arguments[e] : {};
      e % 2 ? n(Object(r), !0).forEach((function(e) {
          o(t, e, r[e])
      }
      )) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : n(Object(r)).forEach((function(e) {
          Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(r, e))
      }
      ))
  }
  return t
}

function h() {
  var t = 2;
  return "undefined" != typeof navigator && (t = navigator.hardwareConcurrency || 2),
  t
}