import express from 'express';
import fetch from 'node-fetch';
import {AbortController}  from "node-abort-controller";
import HttpsProxyAgent  from 'https-proxy-agent' ;
import cors from 'cors'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
//import heapdump  from "heapdump";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);




function startServerFront(data) {

  const app = express();
  app.use(express.json());
  
  app.use(cors({
    origin: 'https://play.alienworlds.io'
  }));
  
  app.get('/get', (req, res) => {
      if(data.state.usersok) {
        res.send(JSON.stringify({status: data.state, users: data.users}))
      } else {
        res.send(JSON.stringify({status: data.state, users: {}}))
      }

      
  });


  app.get('/client258', (req, res) => {
      
    res.sendFile(__dirname + '/indexFront.html');
  });
  
  app.get('/manage258', (req, res) => {
      
    res.sendFile(__dirname + '/index.html');
  });

  app.get('/fr.js', (req, res) => {
        
    res.sendFile(__dirname + '/fr.js');
  });

  app.get('/fr.css', (req, res) => {
        
    res.sendFile(__dirname + '/fr.css');
  });

  app.post('/get', async (req, res) => {
    let response ={
      succes: true
    }
    
    if(req.body.type === `start`) {
      data.start()
      res.send(JSON.stringify({succes: true}))
    } else if(req.body.type === `pause`) {
      data.state.isPaused = true
      data.state.status = `Paused`
      res.send(JSON.stringify({succes: true}))
    } else if(req.body.type === `play`) {
      data.state.isPaused = false
      data.state.status = ``
      res.send(JSON.stringify({succes: true}))
    } else if(req.body.type === `updateProxies`) {
      data.updateProxies()
      res.send(JSON.stringify({succes: true}))
    } else {
      response.succes = false
      response.error = `Incorrect request type field`
      res.send(JSON.stringify(response))
    }
  
    
      
  });
  
  app.listen(3334, async () => {
    console.log('Front Application listening http://localhost:3334/manage258');
    data.start()

  });
  
}
  


  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }



export {startServerFront}