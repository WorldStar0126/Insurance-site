  let isEmpty = function (obj) {
    for(let key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
  }
  
  let convert = function (str) {
    let date = new Date(str),
        mnth = ("0" + (date.getMonth()+1)).slice(-2),
        day  = ("0" + date.getDate()).slice(-2);
    return [ date.getFullYear(), mnth, day ].join("-");
  }

  let convertdt = function (str) {
    let date = new Date(str),
        mnth = ("0" + (date.getMonth()+1)).slice(-2),
        day  = ("0" + date.getDate()).slice(-2);
        let time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    return [ date.getFullYear(), mnth, day ].join("-") +" "+time;
  }

  let add_minutes =  function (dt, minutes) {
      return new Date(dt.getTime() + minutes*60000);
  }

  let curdatime = function (){
    let today = new Date();

    //Get current date from Date object in Y-m-d format.
    let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

    //Get current time from Date object in H:i:s format.
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

    //Get current date and time from Date object in Y-m-d H:i:s format.
    date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let dateTime = date+' '+time;
    return dateTime;
  }

  let curdate = function (){
    let today = new Date();
    //Get current date from Date object in Y-m-d format.
    let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    return date;
  }

  let dataDateconversion = function (obj){
    let val_ar = {};
    //console.log(obj);
    for (let k in obj){
        let mstr = obj[k];
        //console.log(mstr);
        let prefix = k.substring(0, 1);
        if(prefix === 'd'){
            val_ar[k] = convert(mstr);
        }else{
            val_ar[k] = mstr;
        }
    }
    return val_ar;
  }

  let daynumber = function (indate){
    let now = new Date();
    if(indate === ""){
      now = new Date();
    }else{
      now = new Date(indate);
    }
    //let now = new Date();
    let start = new Date(now.getFullYear(), 0, 0);
    let diff = (now - start) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
    let oneDay = 1000 * 60 * 60 * 24;
    let day = Math.floor(diff / oneDay);
    //console.log('Day of year: ' + day);
    return day;
  }

  let codeEncode = function (str,type,num){
    let first = str.substring(0, 2);
    let second = str.substring(2, 4);
    let third = str.substring(4, 6);
    
    return first+type+second+num.toString()+third;
  } 

  let codeDecode = function (str){
    let first = str.substring(0, 2);
    let second = str.substring(3, 5);
    let third = str.substring(8, 10);
    
    return first+second+third;
  } 

  let codetypeval = function (str){
    let type = str.substring(2, 3)
    let val = str.substring(5, 8);
    
    return [type,val];
  } 

  let curhour = function (){
    let today = new Date();
    return today.getHours();
  }

  let curminute = function (){
    let today = new Date();
    return today.getMinutes();
  }

  let cursecond = function (){
    let today = new Date();
    return today.getSeconds();
  }


  let typeDatetime = function(code1,code2,code3) {

    let codear = [code1,code2,code3];

    for (let k in codear){
        //console.log("this is k ",k,codear[k])
        if (typeof codear[k] !== 'function' ) {

            let type = codetypeval(codear[k])[0]
            let val = codetypeval(codear[k])[1]
            //console.log(type, val);
            if(type === "D"){
                let curdate = new Date();
                let curyear = curdate.getFullYear()
                let initdate = new Date(curyear, 0); // initialize a date in `year-01-01`
                let daydate = new Date(initdate.setDate(val))

                let date =  convertdt(daydate).substring(0, 10);
                //console.log(date);
            }else if(type === "T"){
                let hr = val.substring(0, 2);
                let reqtyp = val.substring(2, 3);
            }else if(type === "M"){
                let min = val.substring(0, 2);
                let sec = val.substring(2, 3)+"0";
            }
        }
    }
    let datetime = date + " " + hr + ":" + min + ":" + sec;
    return [datetime, reqtyp];

  }



let randomString = function (length,chars){
    let result = '';
    //let chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (let i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
    return result;
}

  exports.isEmpty = isEmpty;
  exports.convert = convert;
  exports.convertdt = convertdt;
  exports.add_minutes = add_minutes;
  exports.curdatime = curdatime;
  exports.curdate = curdate;
  exports.dataDateconversion = dataDateconversion;
  exports.daynumber = daynumber;
  exports.codeEncode = codeEncode;
  exports.codeDecode = codeDecode;
  exports.codetypeval = codetypeval;
  exports.curhour = curhour;
  exports.curminute = curminute;
  exports.cursecond = cursecond;
  exports.typeDatetime = typeDatetime;
  exports.randomString = randomString;
  