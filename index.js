const fs = require('fs');
const server = require('http').createServer()
const io = require('socket.io')(server)
const onlineUers = new Map();
const express = require('express')
const app = express()
io.on('connection', function (client) {

  console.log('client connect...', client.id);
  io.emit('mkl', "asd");


  client.on('setInCall', function  name(data) {
    //onlineUers[client.id] = data.userId;
    
    //console.log(onlineUers);
    io.emit("inCall",data.userId);
    // console.log(onlineUers);
  })

  client.on('saveMesage', function  name(data) {
    //onlineUers[client.id] = data.userId;
    var fileName = data.fileName;
    var message = data.message;
    save(fileName,message,io);
    
    
    console.log(data);
    
    // console.log(onlineUers);
  })


  client.on('saveMesageGroup', function  name(data) {
    //onlineUers[client.id] = data.userId;
    var fileName = data.fileName;
    var message = data.message;
    saveGrp(fileName,message,io);
    
    
    console.log(data);
    
    // console.log(onlineUers);
  })


  client.on('saveProfileData', function  name(data) {
    //onlineUers[client.id] = data.userId;
    var userId = data.uid;
    
    saveProfileData(userId,data,io);
    
    
   // console.log(data);
    
    // console.log(onlineUers);
  })





  client.on('addFriend', function  name(data) {
    //onlineUers[client.id] = data.userId;
 
    saveFriend(data.self,data.fnd);
  
    
    // console.log(onlineUers);
  })
//getUserProfile
  client.on('getMesage', function  name(data) {
    //onlineUers[client.id] = data.userId;
    var fileName = data.fileName;
    
    getMessage(fileName,io);
    
    
    console.log("get  last message");
    
    // console.log(onlineUers);
  })

  client.on('getMesageGroup', function  name(data) {
    //onlineUers[client.id] = data.userId;
    var fileName = data.fileName;
    
    getMessageGrp(fileName,io);
    
    
    console.log("get  last message");
    
    // console.log(onlineUers);
  })

  client.on('getAllUsers', function  name(data) {
    //onlineUers[client.id] = data.userId;
    //var fileName = data.fileName;
    
    //getAllUsers(data.uid,io);
    
    
    console.log("get  last message");
    
    // console.log(onlineUers);
  })




  client.on('getUserProfile', function  name(data) {
    //onlineUers[client.id] = data.userId;
    var fileName = data.uid;
    console.log("getUserProfile");
    
    //getUserProfile(fileName,io);
    
    
    
    
    // console.log(onlineUers);
  })

//getMyFnds


  client.on('getLastMesage', function  name(data) {
    //onlineUers[client.id] = data.userId;
    var fileName = data.id;
    
    getLastMessage(fileName,io);
    
    
    console.log("get getLastMesage");
    
    // console.log(onlineUers);
  })


  client.on('getMyFnds', function  name(data) {
    //onlineUers[client.id] = data.userId;
    var fileName = data.id;
    
   // getMyFnds(fileName,io);
    
    
    console.log("get getMyFnds");
    
    // console.log(onlineUers);
  })


  client.on('getIsFnd', function  name(data) {
    //onlineUers[client.id] = data.userId;
    
    
    checkIfFnd(data.self,data.fnd,io);
    
    
    console.log("check if fnd");
    
    // console.log(onlineUers);
  })





  client.on('calldial', function  name(data) {
    //onlineUers[client.id] = data.userId;
     
    //console.log(onlineUers);
    io.emit("callincome"+data.partner,data);
     console.log("callincome "+data.partner);
  })




  client.on('ringing', function  name(data) {
    //onlineUers[client.id] = data.userId;
     io.emit("any","any");
    //console.log(onlineUers);
    io.emit("ringing"+data.id,data.id);
     console.log("ringing "+data.id);
  })




  client.on('callerCandidates', function  name(data) {
    //onlineUers[client.id] = data.userId;
     io.emit("any","any");
    //console.log(onlineUers);
    io.emit("callerCandidates"+data.id,data.cand);
     console.log("callerCandidates "+data.id);
  })



  client.on('calleeCandidates', function  name(data) {
    //onlineUers[client.id] = data.userId;
     io.emit("any","any");
    //console.log(onlineUers);
    io.emit("calleeCandidates"+data.id,data.cand);
     console.log("calleeCandidates "+data.id);
  })

  client.on('offer', function  name(data) {
    //onlineUers[client.id] = data.userId;
     io.emit("any","offer");
    //console.log(onlineUers);
    io.emit("offer"+data.id,data.offer);
     console.log("offer "+data.offer);
  })

  client.on('answer', function  name(data) {
    //onlineUers[client.id] = data.userId;
     io.emit("any","any");
    //console.log(onlineUers);
    io.emit("answer"+data.id,data.answer);
     console.log("answer "+data.answer);
  })



  client.on('offerNneedAnswer', function  name(data) {
    //onlineUers[client.id] = data.userId;
     io.emit("any","offerNneedAnswer");
    //console.log(onlineUers);
    io.emit("offerNneedAnswer"+data.id,data.offer);
     console.log("offerNneedAnswer "+data.offer);
  })



  client.on('offerNasResponse', function  name(data) {
    //onlineUers[client.id] = data.userId;
     io.emit("any","offerNasResponse");
    //console.log(onlineUers);
    io.emit("offerNasResponse"+data.id,data.offer);
     console.log("offerNasResponse "+data.offer);
  })


  client.on('answerNasResponse', function  name(data) {
    //onlineUers[client.id] = data.userId;
     io.emit("any","answerNasResponse");
    //console.log(onlineUers);
    io.emit("answerNasResponse"+data.id,data.answer);
     console.log("answerNasResponse "+data.answer);
  })

  client.on('answerNeedOffer', function  name(data) {
    //onlineUers[client.id] = data.userId;
     io.emit("any","answerNeedOffer");
    //console.log(onlineUers);
    io.emit("answerNeedOffer"+data.id,data.answer);
     console.log("answerNeedOffer "+data.answer);
  })



  client.on('offerN', function  name(data) {
    //onlineUers[client.id] = data.userId;
     io.emit("any","offerN");
    //console.log(onlineUers);
    io.emit("offerN"+data.id,data.offer);
     console.log("offer N "+data.offer);
  })

  client.on('answerN', function  name(data) {
    //onlineUers[client.id] = data.userId;
     io.emit("any","answerN");
    //console.log(onlineUers);
    io.emit("answerN"+data.id,data.answer);
     console.log("answerN "+data.answer);
  })





  client.on('accept', function  name(data) {
    //onlineUers[client.id] = data.userId;
     io.emit("any","any");
    //console.log(onlineUers);
    io.emit("accept"+data.id,data.id);
     console.log("accept "+data.id);
  })

  client.on('reject', function  name(data) {
    //onlineUers[client.id] = data.userId;
     io.emit("any","any");
    //console.log(onlineUers);
    io.emit("reject"+data.id,data.id);
     console.log("reject "+data.id);
  })
  client.on('callEnd', function  name(data) {
    //onlineUers[client.id] = data.userId;
     io.emit("any","any");
    //console.log(onlineUers);
    io.emit("callEnd"+data.id,data.id);
     console.log("callEnd "+data.id);
  })
  client.on('callCanceled', function  name(data) {
    //onlineUers[client.id] = data.userId;
     io.emit("any","callCanceled");
    //console.log(onlineUers);
    io.emit("callCanceled"+data.id,data.id);
     console.log("callCanceled "+data.id);
  })

  client.on('connect', function () {
  })
  client.on('setOnline', function  name(data) {
    //onlineUers[client.id] = data.userId;
     onlineUers.set(client.id,data.userId);
    //console.log(onlineUers);
    io.emit("online",data.userId);
    // console.log(onlineUers);
  })



  client.on('setBusy', function  name(data) {
    //onlineUers[client.id] = data.userId;
     onlineUers.set(client.id,data.userId);
    console.log("busy pressed");
    io.emit("busy",data.userId);

    // console.log(onlineUers);
  })
  client.on('setAway', function  name(data) {
    //onlineUers[client.id] = data.userId;
     onlineUers.set(client.id,data.userId);
    //console.log(onlineUers);
    console.log("away pressed");
    io.emit("away",data.userId);
    // console.log(onlineUers);
  })

  // client.on('getOnline', function  name(data) {
  //   //onlineUers[client.id] = data.userId;
  //   onlineUers.set(client.id,data.userId);
  //   //console.log(onlineUers);
  //   io.emit('OS',onlineUers.has(data.userId));
  //    console.log(onlineUers);
  // })
  client.on('disconnect', function () {
    console.log('client disconnect...', client.id)
    // handleDisconnect()
   // delete onlineUers[client.id];
    onlineUers.delete(client.id);
  })

  client.on('error', function (err) {
    console.log('received error from client:', client.id)
    console.log(err)
  })
  client.on('checkOnline', function  name(data) {
    //onlineUers[client.id] = data.userId;
    //console.log(onlineUers);
    //onlineUers.has(data.userId)
    //io.emit('OS'+data.userId,true);
  })
})

var server_port = process.env.PORT || 3000;
server.listen(server_port, function (err) {
  if (err) throw err
  console.log('Listening on port %d', server_port);
});

function save(fileName,message,io) {
  fileNameFull ="chat/"+ fileName+".json";
  function write(){
    fs.readFile(fileNameFull, function (err, data) {
    var json = JSON.parse(data);
    json.push(message);
    
    var all = fileName.split("-");
    sendLast(all[0],message,all[1]);  
    sendLast(all[1],message,all[0]); 
    
    fs.writeFile(fileNameFull, JSON.stringify(json), function(err){
      if (err){
        console.log( "file not found");
      }
      fs.readFile(fileNameFull, function (err, data){
       // console.log(JSON.parse(data));
        
       io.emit(fileName,{"room":fileName,"data":JSON.parse(data)});
        //io.emit(fileName,JSON.parse(data));

      });
    });
})
}

  fs.exists(fileNameFull, function(exists) {
  if(exists) {
    // Create a file
    write();

  }
  else {
    // fs.writeFile(fileName,"[]");

fs.appendFile(fileNameFull, "[]", function (err) {
  if (err) throw err;
  console.log('file created!');
  write();

});
    
  }
});
}



function saveGrp(fileName,message,io) {
  fileNameFull ="groups/"+ fileName+".json";
  function write(){
    fs.readFile(fileNameFull, function (err, data) {
    var json = JSON.parse(data);
    json.push(message);
    
   

    
    fs.writeFile(fileNameFull, JSON.stringify(json), function(err){
      if (err){
        console.log( "file not found");
      }
      fs.readFile(fileNameFull, function (err, data){
       // console.log(JSON.parse(data));
        
       io.emit(fileName,{"room":fileName,"data":JSON.parse(data)});
        //io.emit(fileName,JSON.parse(data));

      });
    });
})
}

  fs.exists(fileNameFull, function(exists) {
  if(exists) {
    // Create a file
    write();

  }
  else {
    // fs.writeFile(fileName,"[]");

fs.appendFile(fileNameFull, "[]", function (err) {
  if (err) throw err;
  console.log('file created!');
  write();

});
    
  }
});
}



function getMessage(fileName,io) {
  var fileNameFull ="chat/"+ fileName+".json";
  fs.exists(fileNameFull, function(exists) {
  if(exists) {
    // Create a file
    //read
     fs.readFile(fileNameFull, function (err, data){
        
       
        io.emit(fileName,{"room":fileName,"data":JSON.parse(data)});

      });


  }
  else {
    //emit empty
  //  io.emit(fileName,JSON.parse("[]"));
    io.emit(fileName,{"room":fileName,"data":JSON.parse("[]")});
    
  }
});

  
}



function getMessageGrp(fileName,io) {
  var fileNameFull ="groups/"+ fileName+".json";
  fs.exists(fileNameFull, function(exists) {
  if(exists) {
    // Create a file
    //read
     fs.readFile(fileNameFull, function (err, data){
        
       
        io.emit(fileName,{"room":fileName,"data":JSON.parse(data)});

      });


  }
  else {
    //emit empty
  //  io.emit(fileName,JSON.parse("[]"));
    io.emit(fileName,{"room":fileName,"data":JSON.parse("[]")});
    
  }
});

  
}



function getLastMessage(fileName,io) {
  console.log("get last mesahe");
  var fileNameFull ="lastChat/"+ fileName+".json";
  console.log(fileNameFull);
  fs.exists(fileNameFull, function(exists) {
  if(exists) {
    // Create a file
    //read
     fs.readFile(fileNameFull, function (err, data){
        
       
        io.emit(fileName,JSON.parse(data));
        console.log(JSON.parse(data));

      });


  }
  else {
    //emit empty
    io.emit(fileName,"{}");
    console.log("{}");
    
  }
});

  
}




function getMyFnds(fileName,io) {
  var fileNameFull ="fndList"+ fileName+"_fnds.json";
  console.log(fileNameFull);
  fs.exists(fileNameFull, function(exists) {
  if(exists) {
    // Create a file
    //read
      var responseArray = [];
     fs.readFile(fileNameFull, function (err, data){
    

      var allFndId = JSON.parse(data);
      console.log(JSON.parse(data));
      var allFiles = [];

 for (const property in allFndId) {
  //console.log(`${property}: ${allFndId[property]}`);
   //responseArray.push("fnd id "+property);
    var  fileNameForUser ="profiles/"+ property+".json";
  allFiles.push(fileNameForUser);


}
for (var i = allFiles.length - 1; i >= 0; i--) {
  //allFiles[i]
  // console.log("exists" +allFiles[i]);
  var path = allFiles[i];
     fs.exists(path, function(exists) {
   if(exists) {
    console.log("exists" +path);
    // Create a file
    //read
     fs.readFileSync(path, function (err, data){
        
       responseArray.push(JSON.parse(data));
       console.log("data");
      // console.log(fileNameForUser);

       // io.emit(fileName+"_profile",JSON.parse(data));

      });


  }
})
}
        
       
        io.emit(fileName+"_fnds",JSON.parse(data));
        console.log("now res");
        console.log(JSON.stringify(responseArray));

      });


  }
  else {
    //emit empty
    io.emit(fileName+"_fnds",JSON.parse("[]"));
    console.log("[]");
    
  }
});

  
}



function getUserProfile(fileName,io) {
 var  fileNameFullForLast ="profiles/"+ fileName+".json";
  
  fs.exists(fileNameFullForLast, function(exists) {
  if(exists) {
    // Create a file
    //read
     fs.readFile(fileNameFullForLast, function (err, data){
        
       

        io.emit(fileName+"_profile",JSON.parse(data));

      });


  }
  else {
    //emit empty
    
    console.log("{}");
    io.emit(fileName+"_profile",JSON.parse("{}"));
    
  }
});

  
}





function checkIfFnd(self,fnd,io) {
  var fileNameFull ="friends/"+"fndList"+ self+"_fnds"+".json";
  console.log(fileNameFull);
  fs.exists(fileNameFull, function(exists) {
  if(exists) {
    // Create a file
    //read
     fs.readFile(fileNameFull, function (err, data){
      var j = JSON.parse(data);
      //hasOwnProperty


        
       
        io.emit(self+"fnd"+fnd, {"status":j.hasOwnProperty(fnd)});
        console.log( {"status":j.hasOwnProperty(fnd)});

      });


  }
  else {
    //emit empty
    io.emit(self+"fnd"+fnd, {"status":false});
        console.log( {"status":false});
    
  }
});
}

function sendLast(id,body,partner) {
  var par = partner;

 var  fileNameFullForLast ="lastChat/"+ id+".json";
   

  function write(){
    fs.readFile(fileNameFullForLast, function (err, data) {
    var json = JSON.parse(data);
    //console.log(data);
    json[par]=body;
    console.log(json);
   // json.push(JSON.stringify({par:body}));
    

    
    fs.writeFile(fileNameFullForLast, JSON.stringify(json), function(err){
      if (err){
        console.log( "file not found");
      }
      fs.readFile(fileNameFullForLast, function (err, data){
        console.log(JSON.parse(data));
        io.emit(id,JSON.parse(data));
       
       

      });
    });
})
}

  fs.exists(fileNameFullForLast, function(exists) {
  if(exists) {
    // Create a file
    write();
console.log('file exists! for last');
  }
  else {
    // fs.writeFile(fileName,"[]");

fs.appendFile(fileNameFullForLast, "{}", function (err) {
  if (err) throw err;
  console.log('file created! for last');
  write();

});
    
  }
});

}


function saveProfileData(id,body,io) {
  // body...
  var  fileNameFullForLast ="profiles/"+ id+".json";
  var  mastarprofile ="profiles/"+ "mastar"+".json";

   fs.readFile(mastarprofile, function (err, data) {
    var json = JSON.parse(data);
    //console.log("real file of master")
  //  console.log(json);
  //  json.push(body)
   // fs.writeFile(mastarprofile, JSON.stringify(json), function(err){});

  });

   

  function write(){
    fs.readFile(fileNameFullForLast, function (err, data) {
  
    

    
    fs.writeFile(fileNameFullForLast, JSON.stringify(body), function(err){
      if (err){
        console.log( "file not found");
      }
      fs.readFile(fileNameFullForLast, function (err, data){
        console.log(JSON.parse(data));
        io.emit(body+"_profile",JSON.parse(data));
        
       
       

      });
    });
})
}






    fs.exists(fileNameFullForLast, function(exists) {
    if(exists) {
    // Create a file
    write();
    console.log('file exists! t');
   }
  else {
    // fs.writeFile(fileName,"[]");

  fs.appendFile(fileNameFullForLast, "{}", function (err) {
  if (err) throw err;
    console.log('file created!');
    write();

});
    
  }
});
}

function saveFriend(self,fnd) {
   var  fileNameFullForLast ="friends/"+"fndList"+ self+"_fnds"+".json";
  function write(){
    fs.readFile(fileNameFullForLast, function (err, data) {
    var json = JSON.parse(data);
    console.log(json);
    json[fnd]=fnd;
    console.log(json);
   // json.push(JSON.stringify({par:body}));
    

    
    fs.writeFile(fileNameFullForLast, JSON.stringify(json), function(err){
      if (err){
        console.log( "file not found");
      }
      fs.readFile(fileNameFullForLast, function (err, data){
        var json = JSON.parse(data);


         io.emit(self+"fnd"+fnd, {"status":json.hasOwnProperty(fnd)});
         console.log( {"status":json.hasOwnProperty(fnd)});
       
        
       
       

      });
    });
})
}
    
    fs.exists(fileNameFullForLast, function(exists) {
    if(exists) {
    // Create a file
    write();
    console.log('file exists! t');
   }
  else {
    // fs.writeFile(fileName,"[]");

  fs.appendFile(fileNameFullForLast, "{}", function (err) {
  if (err) throw err;
    console.log('file created!');
    write();

});
    
  }
});

}
function getAllUsers(caller,io) {
    var  mastarprofile ="profiles/"+ "mastar"+".json";

   fs.readFile(mastarprofile, function (err, data) {
    var json = JSON.parse(data);
    io.emit("all_users"+caller,json);
    console.log(json);

  });
  // body...
}