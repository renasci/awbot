





(async () => {

  document.addEventListener(`click`, async (event) => {
    //console.log(event);

    


    
      if(event.target.dataset.action == `start`) {
        let resp = await fetch("http://localhost:3334/get", {
          "headers": {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },

          "body": JSON.stringify({type: "start"}),
          "method": "POST",

        });
      }
      if(event.target.dataset.action == `pause`) {
        let resp = await fetch("http://localhost:3334/get", {
          "headers": {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },

          "body": JSON.stringify({type: "pause"}),
          "method": "POST",

        });
      }
      if(event.target.dataset.action == `play`) {
        let resp = await fetch("http://localhost:3334/get", {
          "headers": {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },

          "body": JSON.stringify({type: "play"}),
          "method": "POST",

        });
      }
    
      if(event.target.dataset.action == `updateProxies`) {
        let resp = await fetch("http://localhost:3334/get", {
          "headers": {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },

          "body": JSON.stringify({type: "updateProxies"}),
          "method": "POST",

        });
      } 
    
    });

    let lastUsers = null
    setInterval(async () => {
      let data = await getData()
      let users = Object.values(data.users)
      if(!lastUsers && Object.keys(data.users).length) {
        lastUsers = data.users
      }
      //console.log(data);
      //console.log(`lastUsers`, lastUsers)
      document.getElementById(`status`).innerHTML = data.status.status;
      document.getElementById(`app_data`).innerHTML = Object.entries(data.status.appData).map(i => `${i.join(": ")}`).join("<br>");
      
      if(Object.keys(data.users).length) {
        renderData(lastUsers, users);
        lastUsers = data.users
      }
    }, 2000)


})()



async function getData() {
  let data = await fetch("http://localhost:3334/get", {
    "headers": {
        "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "accept-language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7,uk;q=0.6",
        "cache-control": "max-age=0",
        "if-none-match": "W/\"95-9CBPqPBLXmziB385Xns9mobFGgA\"",
        "sec-ch-ua": "\"Chromium\";v=\"104\", \" Not A;Brand\";v=\"99\", \"Google Chrome\";v=\"104\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-fetch-dest": "document",
        "sec-fetch-mode": "navigate",
        "sec-fetch-site": "none",
        "sec-fetch-user": "?1",
        "upgrade-insecure-requests": "1"
    },
    "referrerPolicy": "strict-origin-when-cross-origin",
    "body": null,
    "method": "GET",
    "mode": "no-cors",
    "credentials": "omit"
    });
//console.log(data)
data = await data.json()
return data
}

function renderData(lastUsers, users) {
  if(!document.getElementById(`main-table`)) {
    renderTable(users)
  }
  let table = document.getElementById(`main-table`)
  let columns = {
    status: "status",
    lastMineTime: "lmt", 
    nextMine: `nmt`,
    delay: "delay",
    numberOfMines: "count"
  }

  for (const user of users) {
    for (const col in columns) {
      //console.log(`lastUsers`, lastUsers)
      if(lastUsers[user.name][col] != user[col]) {
        console.log(`[data-column = "${columns[col]}"][data-username = "${user.name}"]`)
        let t = document.querySelector(`[data-column = "${columns[col]}"][data-username = "${user.name}"]`)
        console.log(t)
        t.innerHTML = columns[col] == "lmt" || columns[col] == "nmt" ? formatDate(user[col]) : user[col]
      }
    }
  }

  let total = getTotal(`count`)
  document.querySelector(`[data-column = countTotal]`).innerHTML = total

}

function renderTable(users) {
  
    let table = document.createElement(`table`)
    table.id = `main-table`
    let tableHeader = document.createElement(`thead`)
    tableHeader.id = `main_table_head`
    let tableBody = document.createElement(`tbody`)
    tableBody.id = `main_table_body`
    let tableFooter = document.createElement(`tfoot`)
    tableFooter.id = `main_table_footer`



    tableHeader.innerHTML = `
    <th>Miner</th>
    <th>Status</th>
    <th>LMT</th>
    <th>NMT</th>
    <th>Delay</th>
    <th>Count</th>
    `

    tableFooter.innerHTML = `
    <td colspan="5">Total:</td>
    <td data-column="countTotal"></td>
    `
    
    
    table.append(tableHeader, tableBody, tableFooter)


    for (const user of users) {
      let tr = document.createElement(`tr`);

      tr.innerHTML = `
      <td data-username="${user.name}" data-column="user">${user.name}</td>
      <td data-username="${user.name}" data-column="status">${user.status}</td>
      <td data-username="${user.name}" data-column="lmt">${user.lastMineTime == 0 ? "--" : formatDate(user.lastMineTime)}</td>
      <td data-username="${user.name}" data-column="nmt">${formatDate(user.nextMine)}</td>
      <td data-username="${user.name}" data-column="delay">${user.delay}</td>
      <td data-username="${user.name}" data-column="count">${user.numberOfMines}</td>
      `
      tableBody.append(tr)
    }
    
    
    document.getElementById(`table_container`).append(table); 

}


function formatDate(data) {
  if(data == `--`) {
    return `--`
  }
  console.log(`let date = new Date(data)`, data)
  let date = new Date(data)
  console.log(date)
  return `${date.getMonth()}.${date.getDate()}_${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
}

function getTotal(col) {
  let cells = [...document.querySelectorAll(`[data-column = ${col}]`)];
  let total = cells.reduce((prev, item, index, arr) => {
    if(isNumber(+item.innerHTML)) {
      return prev += +item.innerHTML;
    } else {
      return prev;
    }
    
  }, 0);
  return total
}

function isNumber(value) {
  return typeof value === 'number' && isFinite(value);
}