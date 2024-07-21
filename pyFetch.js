
import {PythonShell} from 'python-shell';


class PyFetch {
  cookies(code, token, proxy, mail) {
    return new Promise((res) => {
      try {
        
        /* captchaSolution = "03ANYolqv3bNGP3q2ZjlolR-w3jRt-UecyOPx6YIo3HpOTjQ7CuckaiL2p9Os_59olaPljnRHp5KvTZe1SbFKCDevamP-AV0Omsw9TzSBshVepV0In4idM0r-_10Nuex0vECrIesvvv9mP_Dx-AbSorrzoVND0Z3b9eN-mLL_Qf9odprQpF4RIu_GnF7Z_9RgeKslMxz5AcIY2fYcU6tMebd4BZnpTfk9Q0WgQnXOhupR4krI0wdS_w57dH7H04NoOFnuGUpWIoLmixoYC_CCOIo0TUZGwfaIvvazlckZX84S_c3Gul6gQ1dqKM2gD8jhatcvbiu8buSJL5dHoEk4UVStH4Uq-nU9Apk7Vk4AqTBQDTGHwV4HvTb8l2V-unZzht0VpAOnx8QVW6KY5QakRZGpcxwANioIUVPxUlGgzzPM9Cr906V6PBvmZUXsE9vDNUIYeQ4pNzEnaorPNxla-WWVjhU2LumJ0HGFLj_IJ9CwDVtx4OW6I14WnxBfxci5briqDBu5Df6FTOOyElbwtQHC_AawTfLlqEhDlm-5Z1qo-WRKLmF4qGUU0OAxnrvOD5srQT7DaGJVD_VN8SCURnlVqVXTJAqd5afZAdpfnV3jG2pTfBZoR2M5Ub8ZS9vv1vyPhleX_VWPjNg2tl9XGeN_nQ2OUd9rm_imzizqsUOhxStIhei3Wb8scR0EvOoqEG0F_EYPyu05big5GEQPcc9h6F5vCQ7aSWf8aHVOhuDcfxQhkfHQJJKYLjDbva941CZY2w7wgvcFr_v3AY5PS-Z9zOBTiodabZVb5PWrQgCd0bg1uQAI1QE35TVl9ipPBSRrfBQg_pRNb6xCVRUoo54S6vtCo12lQfY6HNwYlRj-vgGjGtzt9A160T0CEMDMXCENq8e8y9R9op75xxFnHkkFYpD-x0yBpkRyE3oSNgQK40Y8QIA7O6b1bPsdaRrQJfJLOwUU-xFBxp3hJ_Rwxlzl2Qn87kBheL2dtEDi-dq6LyxmZiePYSGcGnTvCIM4xp4lfyXUzrvh4PrJGfRDBLqUvKbcaxwtIE4o5AWPOCw2rAkVAJB1T57-A9bYx1gmF_QP8X8XRDBQLy6YShWbowFtMCozfrHelmPWri3WE2mrBKSkU4bXW8UNW1l0fyXD5g-SdKhOuKleFTlYx12hyLbXafFhGCm-iCrcp5-jcRS5Lzvy43oTRQ3O4UcIHdpMyXZRjjU7OFaeuA4JbWvDkO5eQTy_ZjU-9TuWFGzc942-bnUFu-vkNI0agels_jbZkjiOIoYrJrz19I7bjozGrgsddNJcBSVwNU0hKoHFo0TJwd2Y-fOiA6k_VlsY6G7W5k87ASH-2UbcKFva6iHB9pJn4yrpat6JXGZBj6g2dSii4AB_yQtiyGyA4c5tQ4emQPLb9iOWGgpLl0nzqO9vA5rvuqdVOZT8x3lbqMy407wRDDkp-Eqx12Q7VvnRy-q0J-6KdcpQMV62G14oC3AUE5bQmqoNGtKR9WwpkbuqiVOUY5ItdVIPBAQpuRGr0cjsHcXaA4XXA09b3_QCa3lyDhCbe9I0JkY6Azdb1o_685v691imqajzkS6_lrQodjFgn7uGBVAtTdk5N-VrdcnPfSbDc8NtKQPjMaMghJwTdj3pYgji9QCMjLi-xyu7ScD_eLarnZkkDqH-85B5E3yi3jDq_rvNhNvelj8gREFviYhVs4qD5CAa614Y"
      mail = `veltus3433@gmail.com`
      proxy = `PH7swt:qZ2cox@45.145.57.228:10403` */

      let data = JSON.stringify({
        "code": code,
        "token2fa": token
      })


      let options = {
        mode: 'json',
        // pythonPath: 'path/to/python',
        pythonOptions: ['-u'], // get print results in real-time
        // scriptPath: 'path/to/my/scripts',
        args: [ `COOKIES`, data, proxy/* , data2 */]
      };
      
      
      let pyshell = new PythonShell('pyFetch.py', options);
      pyshell.send('hello');
      
      pyshell.on('message', function (message) {
        // received a message sent from the Python script (a simple "print" statement)
        console.log(`----- pyFetch resive`, message);
        //let msg = JSON.parse(message)
        //console.log(message.status)
        //console.log(message.response)
        //console.log(message.response === 'Created')
        res(message)
      });
      
      pyshell.end(function (err,code,signal) {
        if (err) {
            console.log(err)
            res(false)
        }
        //console.log('The exit code was: ' + code);
        //console.log('The exit signal was: ' + signal);
        //console.log('finished');
      });
      } catch (error) {
        console.log(`error`)
        console.log(error)
      }
    })
      

  }

  session(mail, captchaSolution, proxy) {
    return new Promise((res) => {
      try {
        
        /* captchaSolution = "03ANYolqv3bNGP3q2ZjlolR-w3jRt-UecyOPx6YIo3HpOTjQ7CuckaiL2p9Os_59olaPljnRHp5KvTZe1SbFKCDevamP-AV0Omsw9TzSBshVepV0In4idM0r-_10Nuex0vECrIesvvv9mP_Dx-AbSorrzoVND0Z3b9eN-mLL_Qf9odprQpF4RIu_GnF7Z_9RgeKslMxz5AcIY2fYcU6tMebd4BZnpTfk9Q0WgQnXOhupR4krI0wdS_w57dH7H04NoOFnuGUpWIoLmixoYC_CCOIo0TUZGwfaIvvazlckZX84S_c3Gul6gQ1dqKM2gD8jhatcvbiu8buSJL5dHoEk4UVStH4Uq-nU9Apk7Vk4AqTBQDTGHwV4HvTb8l2V-unZzht0VpAOnx8QVW6KY5QakRZGpcxwANioIUVPxUlGgzzPM9Cr906V6PBvmZUXsE9vDNUIYeQ4pNzEnaorPNxla-WWVjhU2LumJ0HGFLj_IJ9CwDVtx4OW6I14WnxBfxci5briqDBu5Df6FTOOyElbwtQHC_AawTfLlqEhDlm-5Z1qo-WRKLmF4qGUU0OAxnrvOD5srQT7DaGJVD_VN8SCURnlVqVXTJAqd5afZAdpfnV3jG2pTfBZoR2M5Ub8ZS9vv1vyPhleX_VWPjNg2tl9XGeN_nQ2OUd9rm_imzizqsUOhxStIhei3Wb8scR0EvOoqEG0F_EYPyu05big5GEQPcc9h6F5vCQ7aSWf8aHVOhuDcfxQhkfHQJJKYLjDbva941CZY2w7wgvcFr_v3AY5PS-Z9zOBTiodabZVb5PWrQgCd0bg1uQAI1QE35TVl9ipPBSRrfBQg_pRNb6xCVRUoo54S6vtCo12lQfY6HNwYlRj-vgGjGtzt9A160T0CEMDMXCENq8e8y9R9op75xxFnHkkFYpD-x0yBpkRyE3oSNgQK40Y8QIA7O6b1bPsdaRrQJfJLOwUU-xFBxp3hJ_Rwxlzl2Qn87kBheL2dtEDi-dq6LyxmZiePYSGcGnTvCIM4xp4lfyXUzrvh4PrJGfRDBLqUvKbcaxwtIE4o5AWPOCw2rAkVAJB1T57-A9bYx1gmF_QP8X8XRDBQLy6YShWbowFtMCozfrHelmPWri3WE2mrBKSkU4bXW8UNW1l0fyXD5g-SdKhOuKleFTlYx12hyLbXafFhGCm-iCrcp5-jcRS5Lzvy43oTRQ3O4UcIHdpMyXZRjjU7OFaeuA4JbWvDkO5eQTy_ZjU-9TuWFGzc942-bnUFu-vkNI0agels_jbZkjiOIoYrJrz19I7bjozGrgsddNJcBSVwNU0hKoHFo0TJwd2Y-fOiA6k_VlsY6G7W5k87ASH-2UbcKFva6iHB9pJn4yrpat6JXGZBj6g2dSii4AB_yQtiyGyA4c5tQ4emQPLb9iOWGgpLl0nzqO9vA5rvuqdVOZT8x3lbqMy407wRDDkp-Eqx12Q7VvnRy-q0J-6KdcpQMV62G14oC3AUE5bQmqoNGtKR9WwpkbuqiVOUY5ItdVIPBAQpuRGr0cjsHcXaA4XXA09b3_QCa3lyDhCbe9I0JkY6Azdb1o_685v691imqajzkS6_lrQodjFgn7uGBVAtTdk5N-VrdcnPfSbDc8NtKQPjMaMghJwTdj3pYgji9QCMjLi-xyu7ScD_eLarnZkkDqH-85B5E3yi3jDq_rvNhNvelj8gREFviYhVs4qD5CAa614Y"
      mail = `veltus3433@gmail.com`
      proxy = `PH7swt:qZ2cox@45.145.57.228:10403` */

      let data = JSON.stringify({
        "password":"!QAZxsw2@",
        "username":mail,
        "redirectTo":"",
        "captcha": captchaSolution
      })


      let options = {
        mode: 'json',
        // pythonPath: 'path/to/python',
        pythonOptions: ['-u'], // get print results in real-time
        // scriptPath: 'path/to/my/scripts',
        args: [ `SESSION`, data, proxy]
      };
      
      
      let pyshell = new PythonShell('pyFetch.py', options);
      pyshell.send('hello');
      
      pyshell.on('message', function (message) {
        // received a message sent from the Python script (a simple "print" statement)
        console.log(`----- pyFetch resive`, message);
        //let msg = JSON.parse(message)
        //console.log(message.status)
        //console.log(message.response)
        //console.log(message.response === 'Created')
        res(message)
      });
      
      pyshell.end(function (err,code,signal) {
        if (err) {
            console.log(err)
            res(false)
        }
        //console.log('The exit code was: ' + code);
        //console.log('The exit signal was: ' + signal);
        //console.log('finished');
      });
      } catch (error) {
        console.log(`error`)
      }
    })
      

  }


    tos(token, captchaSolution) {
      return new Promise((res) => {
        try {
        
        let data = JSON.stringify({
          "tos_id": 35,
          "tos_accepted": true,
          "age_accepted": true,
          "singleUseToken": token,
          "captcha": captchaSolution
        })


        let options = {
          mode: 'json',
         
          pythonOptions: ['-u'], 
        
          args: [ `TOS`, data]
        };
        

        
        let pyshell = new PythonShell('pyFetch.py', options);
        pyshell.send('hello');
        pyshell.on('message', function (message) {
          // received a message sent from the Python script (a simple "print" statement)
          console.log(`----- pyFetch resive`, message);

          res(message)
        });
        
        pyshell.end(function (err,code,signal) {
          if (err) {
              console.log(err)
              res(false)
          }

        });
        } catch (error) {
          console.log(`error`)
        }
      })
        

    }

    payWall(token) {
      return new Promise((res) => {
        try {
          /* captchaSolution = "03ANYolqv3bNGP3q2ZjlolR-w3jRt-UecyOPx6YIo3HpOTjQ7CuckaiL2p9Os_59olaPljnRHp5KvTZe1SbFKCDevamP-AV0Omsw9TzSBshVepV0In4idM0r-_10Nuex0vECrIesvvv9mP_Dx-AbSorrzoVND0Z3b9eN-mLL_Qf9odprQpF4RIu_GnF7Z_9RgeKslMxz5AcIY2fYcU6tMebd4BZnpTfk9Q0WgQnXOhupR4krI0wdS_w57dH7H04NoOFnuGUpWIoLmixoYC_CCOIo0TUZGwfaIvvazlckZX84S_c3Gul6gQ1dqKM2gD8jhatcvbiu8buSJL5dHoEk4UVStH4Uq-nU9Apk7Vk4AqTBQDTGHwV4HvTb8l2V-unZzht0VpAOnx8QVW6KY5QakRZGpcxwANioIUVPxUlGgzzPM9Cr906V6PBvmZUXsE9vDNUIYeQ4pNzEnaorPNxla-WWVjhU2LumJ0HGFLj_IJ9CwDVtx4OW6I14WnxBfxci5briqDBu5Df6FTOOyElbwtQHC_AawTfLlqEhDlm-5Z1qo-WRKLmF4qGUU0OAxnrvOD5srQT7DaGJVD_VN8SCURnlVqVXTJAqd5afZAdpfnV3jG2pTfBZoR2M5Ub8ZS9vv1vyPhleX_VWPjNg2tl9XGeN_nQ2OUd9rm_imzizqsUOhxStIhei3Wb8scR0EvOoqEG0F_EYPyu05big5GEQPcc9h6F5vCQ7aSWf8aHVOhuDcfxQhkfHQJJKYLjDbva941CZY2w7wgvcFr_v3AY5PS-Z9zOBTiodabZVb5PWrQgCd0bg1uQAI1QE35TVl9ipPBSRrfBQg_pRNb6xCVRUoo54S6vtCo12lQfY6HNwYlRj-vgGjGtzt9A160T0CEMDMXCENq8e8y9R9op75xxFnHkkFYpD-x0yBpkRyE3oSNgQK40Y8QIA7O6b1bPsdaRrQJfJLOwUU-xFBxp3hJ_Rwxlzl2Qn87kBheL2dtEDi-dq6LyxmZiePYSGcGnTvCIM4xp4lfyXUzrvh4PrJGfRDBLqUvKbcaxwtIE4o5AWPOCw2rAkVAJB1T57-A9bYx1gmF_QP8X8XRDBQLy6YShWbowFtMCozfrHelmPWri3WE2mrBKSkU4bXW8UNW1l0fyXD5g-SdKhOuKleFTlYx12hyLbXafFhGCm-iCrcp5-jcRS5Lzvy43oTRQ3O4UcIHdpMyXZRjjU7OFaeuA4JbWvDkO5eQTy_ZjU-9TuWFGzc942-bnUFu-vkNI0agels_jbZkjiOIoYrJrz19I7bjozGrgsddNJcBSVwNU0hKoHFo0TJwd2Y-fOiA6k_VlsY6G7W5k87ASH-2UbcKFva6iHB9pJn4yrpat6JXGZBj6g2dSii4AB_yQtiyGyA4c5tQ4emQPLb9iOWGgpLl0nzqO9vA5rvuqdVOZT8x3lbqMy407wRDDkp-Eqx12Q7VvnRy-q0J-6KdcpQMV62G14oC3AUE5bQmqoNGtKR9WwpkbuqiVOUY5ItdVIPBAQpuRGr0cjsHcXaA4XXA09b3_QCa3lyDhCbe9I0JkY6Azdb1o_685v691imqajzkS6_lrQodjFgn7uGBVAtTdk5N-VrdcnPfSbDc8NtKQPjMaMghJwTdj3pYgji9QCMjLi-xyu7ScD_eLarnZkkDqH-85B5E3yi3jDq_rvNhNvelj8gREFviYhVs4qD5CAa614Y"
        mail = `veltus3433@gmail.com`
        proxy = `PH7swt:qZ2cox@45.145.57.228:10403` */


        let options = {
          mode: 'json',
          // pythonPath: 'path/to/python',
          pythonOptions: ['-u'], // get print results in real-time
          // scriptPath: 'path/to/my/scripts',
          args: [ `PAYWALL`, token]
        };
        
        
        let pyshell = new PythonShell('pyFetch.py', options);
        pyshell.send('hello');
        pyshell.on('message', function (message) {
          // received a message sent from the Python script (a simple "print" statement)
          console.log(`----- pyFetch resive`, message);
          //let msg = JSON.parse(message)
          //console.log(message.status)
          //console.log(message.response)
          //console.log(message.response === 'Created')
          res(message)
        });
        
        pyshell.end(function (err,code,signal) {
          if (err) {
              console.log(err)
              res(false)
          }
          //console.log('The exit code was: ' + code);
          //console.log('The exit signal was: ' + signal);
          //console.log('finished');
        });
        } catch (error) {
          console.log(`error`)
        }
      })
        

    }

    login(mail, captchaSolution) {
      return new Promise((res) => {
        try {
          
          /* captchaSolution = "03ANYolqv3bNGP3q2ZjlolR-w3jRt-UecyOPx6YIo3HpOTjQ7CuckaiL2p9Os_59olaPljnRHp5KvTZe1SbFKCDevamP-AV0Omsw9TzSBshVepV0In4idM0r-_10Nuex0vECrIesvvv9mP_Dx-AbSorrzoVND0Z3b9eN-mLL_Qf9odprQpF4RIu_GnF7Z_9RgeKslMxz5AcIY2fYcU6tMebd4BZnpTfk9Q0WgQnXOhupR4krI0wdS_w57dH7H04NoOFnuGUpWIoLmixoYC_CCOIo0TUZGwfaIvvazlckZX84S_c3Gul6gQ1dqKM2gD8jhatcvbiu8buSJL5dHoEk4UVStH4Uq-nU9Apk7Vk4AqTBQDTGHwV4HvTb8l2V-unZzht0VpAOnx8QVW6KY5QakRZGpcxwANioIUVPxUlGgzzPM9Cr906V6PBvmZUXsE9vDNUIYeQ4pNzEnaorPNxla-WWVjhU2LumJ0HGFLj_IJ9CwDVtx4OW6I14WnxBfxci5briqDBu5Df6FTOOyElbwtQHC_AawTfLlqEhDlm-5Z1qo-WRKLmF4qGUU0OAxnrvOD5srQT7DaGJVD_VN8SCURnlVqVXTJAqd5afZAdpfnV3jG2pTfBZoR2M5Ub8ZS9vv1vyPhleX_VWPjNg2tl9XGeN_nQ2OUd9rm_imzizqsUOhxStIhei3Wb8scR0EvOoqEG0F_EYPyu05big5GEQPcc9h6F5vCQ7aSWf8aHVOhuDcfxQhkfHQJJKYLjDbva941CZY2w7wgvcFr_v3AY5PS-Z9zOBTiodabZVb5PWrQgCd0bg1uQAI1QE35TVl9ipPBSRrfBQg_pRNb6xCVRUoo54S6vtCo12lQfY6HNwYlRj-vgGjGtzt9A160T0CEMDMXCENq8e8y9R9op75xxFnHkkFYpD-x0yBpkRyE3oSNgQK40Y8QIA7O6b1bPsdaRrQJfJLOwUU-xFBxp3hJ_Rwxlzl2Qn87kBheL2dtEDi-dq6LyxmZiePYSGcGnTvCIM4xp4lfyXUzrvh4PrJGfRDBLqUvKbcaxwtIE4o5AWPOCw2rAkVAJB1T57-A9bYx1gmF_QP8X8XRDBQLy6YShWbowFtMCozfrHelmPWri3WE2mrBKSkU4bXW8UNW1l0fyXD5g-SdKhOuKleFTlYx12hyLbXafFhGCm-iCrcp5-jcRS5Lzvy43oTRQ3O4UcIHdpMyXZRjjU7OFaeuA4JbWvDkO5eQTy_ZjU-9TuWFGzc942-bnUFu-vkNI0agels_jbZkjiOIoYrJrz19I7bjozGrgsddNJcBSVwNU0hKoHFo0TJwd2Y-fOiA6k_VlsY6G7W5k87ASH-2UbcKFva6iHB9pJn4yrpat6JXGZBj6g2dSii4AB_yQtiyGyA4c5tQ4emQPLb9iOWGgpLl0nzqO9vA5rvuqdVOZT8x3lbqMy407wRDDkp-Eqx12Q7VvnRy-q0J-6KdcpQMV62G14oC3AUE5bQmqoNGtKR9WwpkbuqiVOUY5ItdVIPBAQpuRGr0cjsHcXaA4XXA09b3_QCa3lyDhCbe9I0JkY6Azdb1o_685v691imqajzkS6_lrQodjFgn7uGBVAtTdk5N-VrdcnPfSbDc8NtKQPjMaMghJwTdj3pYgji9QCMjLi-xyu7ScD_eLarnZkkDqH-85B5E3yi3jDq_rvNhNvelj8gREFviYhVs4qD5CAa614Y"
        mail = `veltus3433@gmail.com`
        proxy = `PH7swt:qZ2cox@45.145.57.228:10403` */

        let data = JSON.stringify({
          "password":"!QAZxsw2@",
          "username":mail,
          "redirectTo":"",
          "captcha": captchaSolution
        })


        let options = {
          mode: 'json',
          // pythonPath: 'path/to/python',
          pythonOptions: ['-u'], // get print results in real-time
          // scriptPath: 'path/to/my/scripts',
          args: [ `LOGIN`, data]
        };
        
        
        let pyshell = new PythonShell('pyFetch.py', options);
        pyshell.send('hello');
        
        pyshell.on('message', function (message) {
          // received a message sent from the Python script (a simple "print" statement)
          console.log(`----- pyFetch resive`, message);
          //let msg = JSON.parse(message)
          //console.log(message.status)
          //console.log(message.response)
          //console.log(message.response === 'Created')
          res(message)
        });
        
        pyshell.end(function (err,code,signal) {
          if (err) {
              console.log(err)
              res(false)
          }
          //console.log('The exit code was: ' + code);
          //console.log('The exit signal was: ' + signal);
          //console.log('finished');
        });
        } catch (error) {
          console.log(`error`)
        }
      })
        

    }



    pushAuthReq(mail, captchaSolution, proxy) {
      return new Promise((res) => {
        


        try {
          /* captchaSolution = "03ANYolqv3bNGP3q2ZjlolR-w3jRt-UecyOPx6YIo3HpOTjQ7CuckaiL2p9Os_59olaPljnRHp5KvTZe1SbFKCDevamP-AV0Omsw9TzSBshVepV0In4idM0r-_10Nuex0vECrIesvvv9mP_Dx-AbSorrzoVND0Z3b9eN-mLL_Qf9odprQpF4RIu_GnF7Z_9RgeKslMxz5AcIY2fYcU6tMebd4BZnpTfk9Q0WgQnXOhupR4krI0wdS_w57dH7H04NoOFnuGUpWIoLmixoYC_CCOIo0TUZGwfaIvvazlckZX84S_c3Gul6gQ1dqKM2gD8jhatcvbiu8buSJL5dHoEk4UVStH4Uq-nU9Apk7Vk4AqTBQDTGHwV4HvTb8l2V-unZzht0VpAOnx8QVW6KY5QakRZGpcxwANioIUVPxUlGgzzPM9Cr906V6PBvmZUXsE9vDNUIYeQ4pNzEnaorPNxla-WWVjhU2LumJ0HGFLj_IJ9CwDVtx4OW6I14WnxBfxci5briqDBu5Df6FTOOyElbwtQHC_AawTfLlqEhDlm-5Z1qo-WRKLmF4qGUU0OAxnrvOD5srQT7DaGJVD_VN8SCURnlVqVXTJAqd5afZAdpfnV3jG2pTfBZoR2M5Ub8ZS9vv1vyPhleX_VWPjNg2tl9XGeN_nQ2OUd9rm_imzizqsUOhxStIhei3Wb8scR0EvOoqEG0F_EYPyu05big5GEQPcc9h6F5vCQ7aSWf8aHVOhuDcfxQhkfHQJJKYLjDbva941CZY2w7wgvcFr_v3AY5PS-Z9zOBTiodabZVb5PWrQgCd0bg1uQAI1QE35TVl9ipPBSRrfBQg_pRNb6xCVRUoo54S6vtCo12lQfY6HNwYlRj-vgGjGtzt9A160T0CEMDMXCENq8e8y9R9op75xxFnHkkFYpD-x0yBpkRyE3oSNgQK40Y8QIA7O6b1bPsdaRrQJfJLOwUU-xFBxp3hJ_Rwxlzl2Qn87kBheL2dtEDi-dq6LyxmZiePYSGcGnTvCIM4xp4lfyXUzrvh4PrJGfRDBLqUvKbcaxwtIE4o5AWPOCw2rAkVAJB1T57-A9bYx1gmF_QP8X8XRDBQLy6YShWbowFtMCozfrHelmPWri3WE2mrBKSkU4bXW8UNW1l0fyXD5g-SdKhOuKleFTlYx12hyLbXafFhGCm-iCrcp5-jcRS5Lzvy43oTRQ3O4UcIHdpMyXZRjjU7OFaeuA4JbWvDkO5eQTy_ZjU-9TuWFGzc942-bnUFu-vkNI0agels_jbZkjiOIoYrJrz19I7bjozGrgsddNJcBSVwNU0hKoHFo0TJwd2Y-fOiA6k_VlsY6G7W5k87ASH-2UbcKFva6iHB9pJn4yrpat6JXGZBj6g2dSii4AB_yQtiyGyA4c5tQ4emQPLb9iOWGgpLl0nzqO9vA5rvuqdVOZT8x3lbqMy407wRDDkp-Eqx12Q7VvnRy-q0J-6KdcpQMV62G14oC3AUE5bQmqoNGtKR9WwpkbuqiVOUY5ItdVIPBAQpuRGr0cjsHcXaA4XXA09b3_QCa3lyDhCbe9I0JkY6Azdb1o_685v691imqajzkS6_lrQodjFgn7uGBVAtTdk5N-VrdcnPfSbDc8NtKQPjMaMghJwTdj3pYgji9QCMjLi-xyu7ScD_eLarnZkkDqH-85B5E3yi3jDq_rvNhNvelj8gREFviYhVs4qD5CAa614Y"
        mail = `veltus3433@gmail.com`
        proxy = `PH7swt:qZ2cox@45.145.57.228:10403` */

        let data = JSON.stringify({
          email:mail,
          password:"!QAZxsw2@",
          repassword:"!QAZxsw2@",
          rhash:"",
          captcha: captchaSolution,
          redirect_to:""})


        let options = {
          mode: 'json',
          // pythonPath: 'path/to/python',
          pythonOptions: ['-u'], // get print results in real-time
          // scriptPath: 'path/to/my/scripts',
          args: [ `POST`, data, proxy]
        };
        
        
        let pyshell = new PythonShell('pyFetch.py', options);
        pyshell.send('hello');
        pyshell.on('message', function (message) {
          // received a message sent from the Python script (a simple "print" statement)
          console.log(`----- pyFetch resive`, message);
          //let msg = JSON.parse(message)
          //console.log(message.status)
          //console.log(message.response)
          console.log(message.response === 'Created')
          res(message)
        });
        
        pyshell.end(function (err,code,signal) {
          if (err) {
              console.log(err)
              res(false)
          }
          //console.log('The exit code was: ' + code);
          //console.log('The exit signal was: ' + signal);
          //console.log('finished');
        });
        } catch (error) {
          console.log(`error`)
        }
      })
        

    }

    pushMailLink(link, proxy) {
      return new Promise((res) => {
        /* link = `https://api-login.wax.io/v1/register/verify?token=75e2c0acb1d8a2f7896880b00a9094943a9c10a1313c8834d605b75928cecade`
        
        proxy = `HoWt6a:G7NSUr@138.59.205.140:9053` */

        let options = {
          mode: 'json',
          // pythonPath: 'path/to/python',
          pythonOptions: ['-u'], // get print results in real-time
          // scriptPath: 'path/to/my/scripts',
          args: [ `GET`, link, proxy]
        };
        
        
        let pyshell = new PythonShell('pyFetch.py', options);
        pyshell.send('hello');
        pyshell.on('message', function (message) {
          // received a message sent from the Python script (a simple "print" statement)
          console.log(`----- pyFetch resive`, message);
          //let msg = JSON.parse(message)
          //console.log(message.status)
          //console.log(message.response)
          console.log(message.url.includes(`show_verification_message=1`))
          res(message)
        });
        
        pyshell.end(function (err,code,signal) {
          if (err) {
              console.log(err)
              res(false)
          }
          //console.log('The exit code was: ' + code);
          //console.log('The exit signal was: ' + signal);
          //console.log('finished');
        });
      })



    }


    getIP(proxy) {
      return new Promise((res) => {
        /* link = `https://api-login.wax.io/v1/register/verify?token=75e2c0acb1d8a2f7896880b00a9094943a9c10a1313c8834d605b75928cecade`
        
        proxy = `HoWt6a:G7NSUr@138.59.205.140:9053` */

        let options = {
          mode: 'json',
          // pythonPath: 'path/to/python',
          pythonOptions: ['-u'], // get print results in real-time
          // scriptPath: 'path/to/my/scripts',
          args: [ `IP`, proxy]
        };
        
        
        let pyshell = new PythonShell('pyFetch.py', options);
        pyshell.send('hello');
        pyshell.on('message', function (message) {
          // received a message sent from the Python script (a simple "print" statement)
          console.log(`----- pyFetch resive`, message);
        
          res(message)
        });
        
        pyshell.end(function (err,code,signal) {
          if (err) {
              console.log(err)
              res(false)
          }
          //console.log('The exit code was: ' + code);
          //console.log('The exit signal was: ' + signal);
          //console.log('finished');
        });
      })



    }
}

/* let pyFetch = new PyFetch()
pyFetch.pushMailLink() */



export {PyFetch}