var express = require('express'),
http = require('http')
var bodyParser = require("body-parser");
var app = express(),
server = http.createServer(app),
io = require('socket.io').listen(server);
var bcrypt = require('bcryptjs');
var multer = require('multer')
var path = require("path")
const fs = require('fs');

io.on("connection", socket => {
  console.log("New client connected");

  //Here we listen on a new namespace called "incoming data"
  

  //A special namespace "disconnect" for when a client disconnects
  socket.on("disconnect", () => console.log("Client disconnected"));
});







const storage = multer.diskStorage({
  destination: "./public/uploads/",
  filename: function(req, file, cb){
     cb(null,"IMAGE-" + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits:{fileSize: 5000000},
}).single("myImage");

var mysql = require('mysql');
const conn = mysql.createConnection({
  host:"localhost",
  user:"root",
  password:"4510",
  database:"clinic"
});

app.use(function (req,res,next){
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Method','GET,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers','*');
   next();
});
app.use('/', express.static(__dirname + '/'));

io.on('connection', socket => {
  console.log("Hello")
});



// function getToken(json){
//   return token = jwt.sign(json,secretKey,{
//       expiresIn:8640000
//   })
// }
// function vertifyToken(req,res,next){
//  console.log("Vertify Token"+JSON.stringify(req.header));
//  token = req.headers['x-access-token'];
//  if(!token)
//    return res.status(403).send({auth:false,message:'No token'});
//    jwt.verify(token,secretKey,function(err,decoded){
//       if(err)
//       return res.status(500).send({auth:false,message:'Failed to auth token'});
//       req.userId = decoded.id;
//       next();
//    })
// }

// function Calculatetextforbot(text){
//   switch(true){
//     case ( (text === "สวัสดีค่ะ") || (text === "สวัสดี" )|| (text === "ดี") || (text === "สวัสดีครับ") || (text ==="ดีครับ") || (text === "ดีคับ") || (text === "Hello") || (text === "Hi")):
//       return "สวัสดีค่ะ คลินิกความงามและผิวพรรณหมอเพื่อน ยินดีให้บริการและให้คำปรึกษาโดยไม่คิดค่าใช้จ่ายค่ะ"
//       break;
//       case ((text === "วันนี้ร้านเปิดมั้ยคะ") || (text === "ร้านเปิดกี่โมงคะ") || (text === "ร้านเปิดกี่โมง") || (text === "เปิดกี่โมง") || (text === "วันนี้ร้านเปิดมั้ย")) :
//       return "ร้านเปิดทุกวันจันทร์ - อาทิตย์ เวลา 12:30 - 20:30 น."
//       break;
//       case ((text === "มีโปรโมชันอะไรแนะนำบ้าง" || (text === "โปรโมชัน")) || (text === "โปรโมชั่น") || (text === "โปรเดือนนี้")) :
//         return `โปรโมชั่นเดือน ตุลาคม 2562
//         - Botox กราม + Fat แก้มเหนียง 9,500
//         - Botox ลิฟท์หน้า + Fat แก้ม 9,500
//         - Botox ริ้วรอย + Filler ร่องแก้ม 12,900
//         - ร้อยไหมลดโหนก + Botox กราม 12,500
//         - Botox ริ้วรอย + Filler ใต้ตา 20,900
//         พิเศษ ซื้อ 1 โปร Share & Check-in รับฟรี!! ฉายแสง หน้าใส Proton Beam 1 ครั้ง`
//         break;
//         case ((text === "หน้าเป็นสิว" )|| (text ==="อยากรักษาสิว")):
//           return `Treatment. Acne + White aura 
//           สำหรับใครที่เป็นสิว หน้าหมองคล้ำ ผิวหน้าอ่อนล้า พักผ่อนน้อย ผิวไม่ได้รับการบำรุง หน้าแห้ง ขาดความชุ่มชื่น ต้องมาบำรุงผิว 5 ขั้นตอนกับโปรแกรม Acne + White aura 
//           - ไอร้อน ช่วยเปิดรูขุมขน 
//           - สกิดเมโสหน้าใส ขาวสว่าง กระจ่างใสออร่า
//           - cryo ทำให้ผิวรู้สึกสบาย ผิวได้รับการพักผ่อน ผลักวิตามิน ช่วยลดสิว ลดผดผื่น ให้ผิวชุ่มชื่น อิ่มน้ำ 
//           - มาร์คสิว ลดรอยสิว ช่วยยับยั้งการเกิดสิว
//           - ไอเย็น ทำให้ผิวตื่น เย็นสบาย ปิดรูขุมขน`
//           break;
//           default:
//             return "ขออถัยบอทยังไม่รู้จักคำที่คุณถามเข้ามาค่ะ"
//   }
// }

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.post('/upload',async function (req, res) {
  upload(req, res, async function (err) {
       let file = await req.file.destination + req.file.filename;
       let path = await file.substring(1);
       var debug = conn.query(`Update course set img = '${path}' where idcourse = ${req.body.id}`,function (error,results) {
        if(error){
          res.json(error);
        }else{
         if(req.body.edit == true){
          fs.unlinkSync(__dirname + req.body.file)
         }
         res.json(results);
        }
     });
  })
})

app.get('/', function (req, res) {
  conn.query('SELECT * FROM users',function (error,results) {
     if(error){
       res.json(error);
     }else{
      res.json(results);
     }
  });
});

app.post('/login', (req, res) => {
  console.log(req.body);
  const obj = req.body;
  var sql = `select * from users inner join user_detail on users.id = user_detail.id_user where email = '${req.body.mail}'`;
  conn.query(sql, function (err, result) {
    if (err) {
      res.json(err);
    } else {
      if (result.length > 0) {
        const passwordIsValid = bcrypt.compareSync(req.body.password, result[0].password);
        if (!passwordIsValid) return res.json("Failed");
        console.log(req.body.email);
        var id = result[0].id;
        // var token = getToken({id:result[0].id,email:result[0].email});
        const finalResult = {
             status:"Success",firstname:result[0].firstname,status_:result[0].status,lastname:result[0].lastname,address:result[0].address,sex:result[0].sex,tel:result[0].tel,mail:result[0].email,id:id
        };
        console.log(JSON.stringify(finalResult));
        res.json(finalResult);
      } else {
        const finalResult = {
          status: "Failed",
          data: ""
        };
        console.log(JSON.stringify(finalResult));
        res.json(finalResult);
      }
    }
  });
});


app.post('/reg', (req, res) => {
  console.log(req.body);
  const obj = req.body;
  var hashedPassword = bcrypt.hashSync(req.body.password, 8);
  req.body.password = hashedPassword;

  var values = [
    [req.body.email,hashedPassword]
  ];
  var sql = `INSERT INTO users (email, password) VALUES ?`;
  conn.query(sql, [values], function (err, result) {
    if (err) {
      console.log(err)
    } else {
      var detail = [
        [req.body.firstname,req.body.lastname,req.body.sex,req.body.tel,req.body.address,"user"]
      ];
      var sql_ = `INSERT INTO user_detail(firstname,lastname,sex,tel,address,status) VALUES ?`;
      conn.query(sql_, [detail], function (err, result) {
        if (err) {
          console.log(err);
        } else {
          const finalResult = {
            result: "success",
            data: ""
          };
          res.json(finalResult);
          console.log("1 record inserted");
        }
    });
  }
});
});
app.get('/LoadMember',function(req,res){
  var sql = `select * from user_detail where id_user = '${req.body.id}' `;
  conn.query(sql,function (error,results) {
  if(error){
    res.json(error);
  }else{
   res.json(results);
  }
   })
})
app.post('/LoadReser',function(req,res){
  var sql = `select * from reservation a inner join user_detail b on a.id_user = b.id_user LEFT join course c on a.course = c.idcourse where a.id_user = '${req.body.id}' and a.statusbooking = "รอดำเนินการ" order by a.date desc, a.time desc  `;
  conn.query(sql,function (error,results) {
  if(error){
    res.json(error);
  }else{
   res.json(results);
  }
   })
})
app.post('/LoadReserComfirm',function(req,res){
  var sql = `select * from reservation a inner join user_detail b on a.id_user = b.id_user LEFT join course c on a.course = c.idcourse where a.id_user = '${req.body.id}' and a.statusbooking = "อนุมัติ" order by a.date desc, a.time desc  `;
  conn.query(sql,function (error,results) {
  if(error){
    res.json(error);
  }else{
   res.json(results);
  }
   })
})

app.post('/LoadReserUnapprove',function(req,res){
  var sql = `select * from reservation a inner join user_detail b on a.id_user = b.id_user LEFT join course c on a.course = c.idcourse where a.id_user = '${req.body.id}' and a.statusbooking = "ไม่อนุมัติ" order by a.date desc, a.time desc  `;
  conn.query(sql,function (error,results) {
  if(error){
    res.json(error);
  }else{
   res.json(results);
  }
   })
})

app.post('/totalcourse',function(req,res){
  var sql = `select * from course where 1` ;
  conn.query(sql , function(error,results){
    if(error){
      res.json(error);
    }else{
     res.json(results);
    }
     })
  })
  app.post('/totalcourseUser',function(req,res){
    var sql = `select * from course where 1` ;
    conn.query(sql , function(error,results){
      if(error){
        res.json(error);
      }else{
       res.json(results);
      }
       })
    })

app.post('/book',(req, res)=>{
  console.log(req.body)
  var sql2 = `select course_name,time_course from course where idcourse = ${req.body.course}`;
  conn.query(sql2,function(err,result){
    if(err){
      console.log(err)
    }else{
      var time = req.body.time
      var time2 = time.split(".")
      var endtime = parseInt(time2[0])+parseInt(result[0].time_course) +"."+time2[1]
      var values = [
        [req.body.course,req.body.date,req.body.time,endtime,req.body.description,req.body.id,"รอดำเนินการ"]
      ];
      var sql = `INSERT INTO reservation (Course, date,time,time_end,description,id_user,statusbooking) VALUES ?`;
  conn.query(sql, [values], function (err, result1) {
    if (err) {
      console.log(err);
    } else {
      io.emit("admin",{name:"มีรายการจองเข้ามาใหม่",detail:`คอร์ส ${result[0].course_name} วันที่จอง ${req.body.date} เวลา ${req.body.time}`})
      res.status(200).json("Success");
    }
  });
    }
  })
});

app.post('/sendMsgContact',(req, res)=>{
  console.log("firstnameCon:",req.body.firstnCon,"lastnameCon:",req.body.lastnCon,"emailCon:",req.body.emailCon,"MessageContact:",req.body.msgCon)
  var values = [
    [req.body.firstnCon,req.body.lastnCon,req.body.emailCon,req.body.msgCon]
  ];
  var sql = `INSERT INTO contact (firstnameCon,lastnameCon,emailCon,msgCon) VALUES ?`;
  conn.query(sql, [values], function (err, result) {
    if (err) {
      console.log(err);
    } else {
      res.json(result.insertId);
    }
  });
});
app.get('/getMessage',function(req,res){
  var sql = `select * from contact where 1` ;
  conn.query(sql , function(error,results){
    if(error){
      res.json(error);
    }else{
     res.json(results);
    }
     })
  })

app.post('/updatecourses',(req, res)=>{
  console.log("Time",req.body.timecourse)
  var values = [
    [req.body.coursename,req.body.descriptions,req.body.price,req.body.timecourse]
  ];
  var sql = `INSERT INTO course (course_name,descriptionCourse,price,time_course) VALUES ?`;
  conn.query(sql, [values], function (err, result) {
    if (err) {
      console.log(err);
    } else {
      res.json(result.insertId);
    }
  });
});




app.get('/loaduserreser',(req,res)=>{
  conn.query('select * from reservation a inner join user_detail b on a.id_user = b.id_user LEFT join course c on a.course = c.idcourse where a.id_user and a.statusbooking = "รอดำเนินการ" order by a.date desc, a.time desc ',function (err,result){
    if(err){
      console.log(err);
    }else{
      res.json(result);
    }
  })
})

app.get('/loaduserreserConfirm',(req,res)=>{
  conn.query('select * from reservation a inner join user_detail b on a.id_user = b.id_user LEFT join course c on a.course = c.idcourse where a.id_user and a.statusbooking = "อนุมัติ" order by a.date desc, a.time desc ',function (err,result){
    if(err){
      console.log(err);
    }else{
      res.json(result);
    }
  })
})
app.get('/loaduserreserUnapprove',(req,res)=>{
  conn.query('select * from reservation a inner join user_detail b on a.id_user = b.id_user LEFT join course c on a.course = c.idcourse where a.id_user and a.statusbooking = "ไม่อนุมัติ" order by a.date desc, a.time desc ',function (err,result){
    if(err){
      console.log(err);
    }else{
      res.json(result);
    }
  })
})

app.post('/EditProfile',(req,res)=>{
  conn.query(`Update user_detail set firstname = '${req.body.firstname}', lastname = '${req.body.lastname}' , address = '${req.body.address}' , tel = '${req.body.tel}' where id_user = '${req.body.id}'`,function (err,result){
    if(err){
      console.log("update success");
    }else{
      res.json("Success");
    }
  })
})
app.post('/EditCousre',(req,res)=>{
  conn.query(`Update course set course_name = '${req.body.coursename}', descriptionCourse = '${req.body.descriptions}' , price = '${req.body.price}' , img = '${req.body.file}' , time_course = '${req.body.timecousre}' where idcourse = '${req.body.id}'`,function (err,result){
    if(err){
      console.log(err);
    }else{
      res.json(req.body.id);
    }
  })
})

app.post('/update',(req,res)=>{
  conn.query(`Update reservation set statusbooking = '${req.body.status}' where id_reser = '${req.body.id}'`,function (err,result){
    if(err){
      console.log(err);
    }else{
      conn.query(`select id_user,course.course_name,reservation.date,reservation.time  from reservation inner join course on reservation.course = course.idcourse where id_reser = ${req.body.id}`,function(err,result2){
        if(err){
          console.log(err)
          return res.sendStatus(400)
        }
        if(req.body.status == "อนุมัติ"){
          io.emit(result2[0].id_user,{name:"รายการจองของคุณยืนยันแล้ว",detail:`คอร์ส ${result2[0].course_name} วันที่จอง ${result2[0].date} เวลา ${result2[0].time}`,type:1})
        }else{
          io.emit(result2[0].id_user,{name:"ขออภัยเป็นอย่างสูง รายการจองของคุณถูกยกเลิก",detail:`คอร์ส ${result2[0].course_name} วันที่จอง ${result2[0].date} เวลา ${result2[0].time}`,type:2})
        }
        
      })
      res.json("Success");
    }
  })
})
app.post('/deleteCourse',(req,res)=>{
  conn.query(`Delete from course where idcourse = '${req.body.id}'`,function (err,result){
    if(err){
      console.log(err);
    }else{
      res.json("Success");
    }
  })
})
app.post('/deleteMsgCon',(req,res)=>{
  conn.query(`Delete from contact where idcontact = '${req.body.id}'`,function (err,result){
    if(err){
      console.log(err);
    }else{
      res.json("Success");
    }
  })
})
app.post('/canclereser',(req,res)=>{
  conn.query(`Delete from reservation where id_reser = '${req.body.id}'`,function (err,result){
    if(err){
      console.log(err);
    }else{
      res.json("Success");
    }
  })
})

app.post('/getreservation',(req,res)=>{

  conn.query(`select (select a.course_name from course a where idcourse = b.course  ) as title,id_reser as id,time as start,time_end as end,date from reservation b inner join user_detail c on b.id_user = c.id_user where c.id_user = ${req.body.id}`,function(err,result){
    if(err){
      console.log(err);
    }else{
      
      for(let i = 0;i<result.length;i++){
        var startyear = (result[i].date).split("-")
        var date = (startyear[2]-543)+ "-"+startyear[1]+ "-"+startyear[0]
        var timestart = (result[i].start).replace(".",":")
        var endstart = (result[i].end).replace(".",":")
        result[i].start = date + " " + timestart
        result[i].end = date + " " + endstart
      }
      res.json(result)
    }
  })
})

app.get('/Adminreservation',(req,res)=>{

  conn.query(`select (select a.course_name from course a where idcourse = b.course  ) as title,id_reser as id,time as start,time_end as end,date from reservation b inner join user_detail c on b.id_user = c.id_user `,function(err,result){
    if(err){
      console.log(err);
    }else{
      
      for(let i = 0;i<result.length;i++){
        var startyear = (result[i].date).split("-")
        var date = (startyear[2]-543)+ "-"+startyear[1]+ "-"+startyear[0]
        var timestart = (result[i].start).replace(".",":")
        var endstart = (result[i].end).replace(".",":")
        result[i].start = date + " " + timestart
        result[i].end = date + " " + endstart
      }
      res.json(result)
    }
  })
})

app.post('/checktimecourse',(req,res)=>{
  var arr = ["12.00","12.30","13.00","13.30","14.00","14.30","15.00","15.30","16.00","16.30","17.00","17.30","18.00","18.30","19.00","19.30","20.00"]
  var arr2 = new Array();
   var sql = `select time,time_end from reservation where date = '${req.body.date}'`;
   conn.query(sql,function (err,result){
    if(err){
      console.log(err);
    }else{
      for(let i = 0;i<arr.length;i++){
        var spiltTime = (arr[i]).split(".")
        var timeTotal = parseInt(spiltTime[0])*3600 + parseInt(spiltTime[1]*60)
        for(let k = 0;k<result.length;k++){
          var timeStart = (result[k].time).split(".")
          var timeEnd = (result[k].time_end).split(".")
          var timeStartCal = (parseInt(timeStart[0]*3600)+parseInt(timeStart[1]*60))
          var timeEndCal = (parseInt(timeEnd[0]*3600)+parseInt(timeEnd[1]*60))
          if(timeTotal >= timeStartCal && timeTotal < timeEndCal){
            console.log("remove")
            console.log(arr[i])
            arr2.push(arr[i])
          }
        }   
      }
      arr2.map(item =>{
        console.log("item"+item)
         var index = arr.indexOf(item)
         if(index > -1){
          console.log(index)
           arr.splice(index,1)
         }
      })
      res.json(arr)
    }
  })
})

// app.post('/loadchatbot',(req,res)=>{
//    var sql = `select * from chat where idroom = ${req.body.id}`
//    conn.query(sql,function(err,result){
//      if(err){
//        console.log(err)
//      }else{
//        res.json(result)
//      }
//    })
// })

app.post('/checkcourse',(req,res)=>{
  console.log(req.body)
  let zzz = 10
  var Check = false
  var sql = `select time,time_end from reservation where date = '${req.body.date}'`;
  conn.query(sql,function(err,result){
    if(err){
      console.log(err);
    }else{
       var sql2 = `select time_course from course where idcourse = '${req.body.id}'`;
       conn.query(sql2,async function(err,result2){
        var RealCheck = false
        for(let k = 0;k<result.length;k++){
        var timeStart = (result[k].time).split(".")
        var timeEnd = (result[k].time_end).split(".")
        var timeStartCal = (parseInt(timeStart[0]*3600)+parseInt(timeStart[1]*60))
        var timeEndCal = (parseInt(timeEnd[0]*3600)+parseInt(timeEnd[1]*60))
        var Spilttimeformuserregister = (req.body.time).split(":");
        var StartPeriodtimeofuser = parseInt(Spilttimeformuserregister[0])*3600 + parseInt(Spilttimeformuserregister[1])*60
        for(let i =1;i<=4;i++){
          var j = i*1800
          // var StartPeriodtimeofuser = (parseInt(Spilttimeformuserregister[0])*3600 + parseInt(Spilttimeformuserregister[1])*60)+j
           var StartPeriodtimeofuser = (parseInt(Spilttimeformuserregister[0])*3600 + parseInt(Spilttimeformuserregister[1])*60)
          var EndPeriodtimeofuser = (parseInt(Spilttimeformuserregister[0])*3600 + parseInt(Spilttimeformuserregister[1])*60) + parseInt(result2[0].time_course)*3600
          var Ends = EndPeriodtimeofuser - j 
          if(i == 4){
            var Ends = EndPeriodtimeofuser + j 
          }
          if(req.body.time === "12:00" || req.body.time === "12:30" || req.body.time === "13:00" || req.body.time === "13:30"){
            var StartPeriodtimeofuser = (parseInt(Spilttimeformuserregister[0])*3600 + parseInt(Spilttimeformuserregister[1])*60)+j
          }else{
            var StartPeriodtimeofuser = (parseInt(Spilttimeformuserregister[0])*3600 + parseInt(Spilttimeformuserregister[1])*60)
          }
          if(StartPeriodtimeofuser >= timeStartCal && Ends <= timeEndCal){
             Check = true
             zzz = 15
             await res.status(400).json({ msg: 'failed' });
             return
             }
          }
        }
        res.status(200).json({ msg: 'success' });
      })
     //console.log(zzz)
    }
  })
  
})



app.post(`/checkvalid`,(req,res)=>{
  var timeSet = ["12.00","12.30","13.00","13.30","14.00","14.30","15.00","15.30","16.00","16.30","17.00","17.30","18.00","18.30","19.00","19.30","20.00","20.30","21.00","21.30","22.00"]
  var timeOut = []
  var timeSucces = []
  var awaitTime = []
  var sql = `select time,time_end from reservation where date = '${req.body.date}'`;
  conn.query(sql,function(err,result){
    if(err){
      console.log(err)
    }else{
      for(var i  = 0;i<result.length;i++){
        var Time = {}
        for(var k =0;k< timeSet.length;k++){
          if(result[i].time == timeSet[k]){
            Time.timestar = k
          }
          if(result[i].time_end == timeSet[k]){
            Time.timeend = k
          }
        }
        timeOut.push(Time)
      }
      for(var b = 0;b<timeOut.length;b++){
        for(var x = timeOut[b].timestar;x<timeOut[b].timeend;x++){
          console.log(timeOut)
          if(x == 2){
             awaitTime.unshift(0,1)
          }
          if(x == 4){
            awaitTime.unshift(0,1,2,3)
          }
          if(x == 3){
            awaitTime.unshift(0,1,2)
          }
          if(x == 1){
            awaitTime.unshift(0)
          }
          if(x == 13){
            awaitTime.unshift(14,15,16)
          }
          if(x == 14){
            awaitTime.unshift(16,15,14,13)
          }
          if(x == 15){
            awaitTime.unshift(16,15,14,13)
          }
          
          
             awaitTime.push(x)
        }
      }
    }
    console.log(awaitTime)
    res.json(awaitTime)
  })
})



app.get("/test",(req,res)=>{
  io.emit("3",{name:"test"})
})

// app.post('/sendchat',async (req,res)=>{
//   console.log(req.body.text)
//   var text = await Calculatetextforbot(req.body.text)
//   var values = [
//     [req.body.text,req.body.id,"user",req.body.id]
//   ]
//   var sql = `INSERT INTO chat (text, iduser,type,idroom) VALUES ?`;
//   conn.query(sql,[values],function(err,result){
//     if(err){
//       console.log(err)
//     }else{
//       var sql2 = `INSERT INTO chat (text, iduser,type,idroom) VALUES ?`;
//       var values2 = [
//         [text,0,"bot",req.body.id]
//       ]
//       conn.query(sql2,[values2],function(err,result){
//         if(err){
//           console.log(err)
//         }else{
//           res.json("success")
//         }
//       })
//     }
//   })
// }) 


// var server = app.listen(process.env.PORT || 5000, function () {
//   var port = server.address().port;
//   console.log("Express is working on port " + port);
// });
server.listen(5000,()=>{

  console.log('Node app is running on port 5000')
  
  })

// module.exports = app;

