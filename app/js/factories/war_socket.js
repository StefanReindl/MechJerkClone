app.factory('WarSocket', function (socketFactory){
  return socketFactory({
    ioSocket: io.connect('http://localhost:3000')
  });
});