/**
 * CotController
 *
 * @description :: Server-side logic for managing cots
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */


//
// setup the MQ server connect service
//

var net = require('net');
var _ = require('lodash');

var vendor = '__YOUR_COT_VENDER_ID__';
var device = '__YOUR_COT_DEVICE_ID__';
var uuid  = '__YOUR_COT_HOST_UUID__'; //your UUID
var auth_token = '__YOUR_COT_TOKEN__';

var owner  = '__YOUR_COT_OWENER_ID__';
var group  = '__YOUR_COT_GROUP_ID__';

var remote_ip = '__YOUR_COT_SMQ_SERVER_IP__';
var remote_port = __YOUR_COT_SMQ_SERVER_PORT__;

var client = new net.Socket();
var client_active = false;
var curr_cid = 0;

function socket_log (  type , msg ) {

  sails.log.info( "["+type+"] "+ msg );
}


function new_connect () {
  client = new net.Socket();
  var my_cid = curr_cid++;

  function connect_do() {
    client_active = true ;
    socket_log( 'INFO' , 'Connected with CID = '+ my_cid );

    client.setEncoding('utf8');

    client.write(JSON.stringify({
      vendor: vendor,
      device: device,
      uuid:   uuid, //your UUID
      token:  auth_token,
      action: 'update'
    }));

  }

  client.connect( remote_port , remote_ip, connect_do );

  try{
    client.on('data', function(data) {
      //sails.log.info( now.toString() + ' : Got data from : ' +client.remoteAddress +"\tpost : "+client.remotePort +"\t read Byte : "+ data.length );
      socket_log( 'INFO' , 'Got data from : ' +client.remoteAddress +"\tpost : "+client.remotePort +"\t read Byte : "+ data.length );
    });

    client.on('close', function() {
      socket_log( 'INFO' , 'CID = '+ my_cid+' Connection closed');
      client.destroy();
      // reconnect loop
      if(client_active){
        client_active = false;
        socket_log( 'INFO' , 'CID = '+my_cid+' remote close , re connecting...');
        setTimeout(() => {
          client.destroy();
          new_connect();
        }, 1000);
      }
    });
  } catch (e){
    socket_log( 'ERROR' , e );
    //sails.log.error(e);
  }

  client.on('error', function  (e) {
    client_active = false;
    socket_log( 'ERROR' , e );
    switch(e.code){
      case 'ECONNREFUSED' :
        socket_log( 'ERROR' , 'CID = '+my_cid+' Address in use, retrying...');
        setTimeout(() => {
          client.destroy();
          new_connect();
        }, 1000);
      break;
      default:
        //EADDRNOTAVAIL
        socket_log( 'ERROR' , 'CID = '+my_cid+' Address in use, retrying...');
        setTimeout(() => {
          client.destroy();
          new_connect();
        }, 1000);
        break;
    }

  });
}
new_connect();


module.exports = {

  index : function  ( req , res) {
    return res.view( 'empty', {
      layout: 'layout_empty',
    } );
  },

  demo: function  ( req , res) {
    return res.view( 'demo', {
      layout: 'layout',
    } );
  },


  auth : function(req, res) {
    // Make sure this is a socket request (not traditional HTTP)
    if (!req.isSocket) {return res.badRequest();}
    // Have the socket which made the request join the "funSockets" room

    sails.log.info('auth', req.body);
    var data = req.body;

    sails.sockets.join(req, 'cotSockets');
    // Broadcast a "hello" message to all the cot sockets.
    // This message will be sent to all sockets in the "cotSockets" room,
    // but will be ignored by any client sockets that are not listening-- i.e. that didn't call `io.socket.on('hello', ...)`
    // The data of the message ({} object) is the "data" in io.socket.on('hello', cotction gotHelloMessage (data)
    //sails.sockets.broadcast('cotSockets', 'hello', {id: 'my id'}, req);
    // Respond to the request with an a-ok message
    // The object returned here is "body" in io.socket.get('/say/hello', function gotResponse(body, response)
    return res.ok({
      message: "OK"
    });
  },

  emit: function(req, res) {
    // Make sure this is a socket request (not traditional HTTP)
    //if (!req.isSocket) {return res.badRequest();}
    // Have the socket which made the request join the "funSockets" room

    sails.log.info('emit',req.body);

    var data = req.body;

    sails.sockets.join(req, 'cotSockets');
    // Broadcast a "hello" message to all the cot sockets.
    // This message will be sent to all sockets in the "cotSockets" room,
    // but will be ignored by any client sockets that are not listening-- i.e. that didn't call `io.socket.on('hello', ...)`
    // The data of the message ({} object) is the "data" in io.socket.on('hello', cotction gotHelloMessage (data)
    sails.sockets.broadcast('cotSockets', 'device_do', {
      group: data.to_group,
      owner: data.to_owner,
      action: data.action
    }, req);


    var emit_data = {};
    switch( data.action ){
      case 'on':
        emit_data = {
        0: true,
        1: true,
        2: true,
        3: true,
        4: true,
        5: true,
        6: true,
        7: true,
        8: true,
        9: true,
        10: true,
        }
        break;
      default:
        emit_data = {
        0: false,
        1: false,
        2: false,
        3: false,
        4: false,
        5: false,
        6: false,
        7: false,
        8: false,
        9: false,
        10: false,
        }
      break;
    }


    var prepare_data = JSON.stringify({
      vendor: vendor,
      device: device,
      uuid:   uuid, //your UUID
      token:  auth_token,
      action: 'emit',
      data: emit_data
    });

    //sails.log.info(prepare_data);
    console.log( prepare_data);

    try{
      client.write( prepare_data );
    } catch (e){
      sails.log.error(e);
      //console.log(e);
    }

    // Respond to the request with an a-ok message
    // The object returned here is "body" in io.socket.get('/say/hello', function gotResponse(body, response)
    return res.ok({
      message: "OK"
    });
  },

  core : function  ( req , res ) {
    if (req.isSocket){
      // You're a socket.  Do cool socket stuff.
    }
    else {
      // Just another HTTP request.
      return res.view( 'empty', {
        layout: 'layout_empty',
      } );
    }
  }

};

