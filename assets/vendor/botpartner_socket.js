  //The automatically-created socket is exposed as io.socket.
  // Use .on() to subscribe to the 'device_do' event on the client
  //

  function demo_toggle ( action ) {
    var $this = $('#cot_app_demo');
    $this.toggleClass('btn-success');
    $this.toggleClass('btn-default');
    if( action == 'on'){
      $this.data('action', 'off');
      $this.text('turn off');
    }else{
      $this.data('action', 'on');
      $this.text('turn on');
    }
  };

$(function  () {
  'use strict';

  io.socket.on('device_do', function gotHelloMessage (data) {
    // formate:
    // {
    //   group: data.to_group,
    //    owner: data.to_owner,
    //    action: data.action    // on , off
    // }
    console.log(data);

    // do some thing
    demo_toggle( data.action );
  });

  // init socket and registration device
  io.socket.post('/cot/auth', {
    vendor: 'botpartner',
    device: 'controller',
    owner: 'botpartner',
    group: 'demo',
    uuid: '__YOUR_COT_DEVICE_UUID__' //your UUID
  }, function (body, response) {
    $('#cot_app_demo').show();
    console.log('Server responded with status code ' + response.statusCode + ' and data: ', body);
  });

  /*
  // open the lamp
  io.socket.post('/cot/emit', {
    to_owner: 'botpartner',
    to_group: 'demo',
    action: 'on'
  }, function  ( body , response ) {
    console.log('Server responded with status code ' + response.statusCode + ' and data: ', body);
  });

  // close the lamp
  io.socket.post('/cot/emit', {
    to_owner: 'botpartner',
    to_group: 'demo',
    action: 'off'
  }, function  ( body , response ) {
    console.log('Server responded with status code ' + response.statusCode + ' and data: ', body);
  });
  */

  $('#cot_app_demo').click(function () {
    var action = $(this).data('action');
    demo_toggle(action);

    io.socket.post('/cot/emit', {
      to_owner: 'botpartner',
      to_group: 'demo',
      action: action
    }, function  ( body , response ) {
      console.log('Server responded with status code ' + response.statusCode + ' and data: ', body);
    });

  });
});
