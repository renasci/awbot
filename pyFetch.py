
import sys
import json
import cloudscraper


method = sys.argv[1]






if(method == "sign"):
  req_data = json.loads(sys.argv[2])
  token = sys.argv[3]
  proxies = {
    "http":f"http://{sys.argv[4]}/",
    "https": f"http://{sys.argv[4]}/",
  }
  headers = {"content-type": "application/json;charset=UTF-8",
  "x-access-token": token}



  scraper = cloudscraper.CloudScraper() 
  #"https://public-wax-on.wax.io/wam/sign"
  resp = scraper.post("https://wax-on-api.mycloudwallet.com/wam/sign", headers=headers, json=req_data, proxies=proxies)
  print(json.dumps({'response': resp.text, 'status': resp.status_code}))





sys.stdout.flush()


