
import fetch from 'node-fetch';



(async () => {
  let resp = await fetch("https://aw-guard.yeomen.ai/v1/chain/push_transaction", {
    "headers": {
      "accept": "*/*",
      "accept-language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
      "content-type": "text/plain;charset=UTF-8",
      "sec-ch-ua": "\"Chromium\";v=\"104\", \" Not A;Brand\";v=\"99\", \"Google Chrome\";v=\"104\"",
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": "\"Windows\"",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "cross-site",
      "Referer": "https://play.alienworlds.io/",
      "Referrer-Policy": "strict-origin",
      "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36",
    },
    "body": "{\"signatures\":[\"SIG_K1_JwWSVWG3UGLhCFP6e2dcS7DqNMR1hzsUDsCB3esqY8iUEJY3J5Rpyorz6VtgEqKShND7LHm1P6Rc4U4zTM7seApj7sDsMh\",\"SIG_K1_KYXsd2b34bAozoH5EuVB6HY2BmJ2kXX5P4bbpHedfaSKVi6KHtnEukP9aFXrGwVuEab8bToxqfXxbdsb5sP2BoiLbtzJje\"],\"compression\":0,\"packed_context_free_data\":\"\",\"packed_trx\":\"4b45fd625179ad73048900000100027055ba864f25a9f2000000005c95aee1017055ba864f25a9f20000000080748d66100f3162707338707a6c36787974796f7630a9cbe6aaa416900000000000a0a6930100a4e100010e18d400000000a8ed32321100a4e100010e18d40884903dea40d3ae0700\"}",
    "method": "POST"
  });

  console.log(resp)
  resp = await resp.json()
  console.log(resp)
})()

