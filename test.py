import cloudscraper

#scraper = cloudscraper.create_scraper()  # returns a CloudScraper instance
scraper = cloudscraper.CloudScraper()  # CloudScraper inherits from requests.Session

headers = {

    "content-type": "application/json",
    "x-access-token": "plR53k6H7G08KA1KLQRS8XRr3dtxTKZ0GsvAER8e"
}

cookies = {
    'token_id': "s%3Aef6ded5e-26b7-4694-9678-b0d3556444b1.hLETMa5zTfwmoj5uWsmbShUsQBGqNhh1djoiOct4wcs",
    'session_token': "Sn9Sub4z31qJRYaq3On892SDBkSufnucsEBg0zNW"
}

data = {

"serializedTransaction":[226,242,211,98,169,228,83,175,240,253,0,0,0,0,1,0,0,0,0,0,234,48,85,0,0,63,42,27,166,162,74,1,0,0,0,210,112,192,235,116,0,0,0,0,168,237,50,50,49,0,0,0,210,112,192,235,116,0,0,0,210,112,192,235,116,0,0,0,0,0,0,0,0,8,87,65,88,0,0,0,0,0,228,11,84,2,0,0,0,8,87,65,88,0,0,0,0,0,0],
"website":"wallet.wax.io","description":"jwt is insecure","freeBandwidth":"true","feeFallback":"true"

}

#scraper.cookies = cookies
#scraper.cookies.set('session_token', "RKfT3ArwJILOosVvVdV51cI2jlsDL9m5h26dI9WG", domain=".wax.io")

#scraper.cookies.set('session_token', "RKfT3ArwJILOosVvVdV51cI2jlsDL9m5h26dI9WG", domain=".wax.io")
#print('---------scraper.cookies\n', scraper.cookies)



#resp1 = scraper.get("https://all-access.wax.io/api/session", headers=headers, cookies=cookies)
#print(resp1.text)
#print(resp1.cookies)

print(scraper.headers)
resp = scraper.post("https://public-wax-on.wax.io/wam/sign", headers=headers, json=data)
print(resp.text)
print(resp.cookies)
#print(scraper.post("https://api-idm.wax.io/v1/accounts/auto-accept/signing", headers=headers, json=data, cookies=cookies).cookies)  # => "<!DOCTYPE html><html><head>..."
