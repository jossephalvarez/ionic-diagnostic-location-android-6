  ionViewWillEnter() { 
 if (this.platform.is('android')) {              
        let permission = this.diagnostic.permission;
        let permissionStatus = this.diagnostic.permissionStatus;
        this.diagnostic.requestRuntimePermission(permission.ACCESS_FINE_LOCATION).then(statuses => {
          for (var permission in statuses) {
            switch (statuses[permission]) {
              case permissionStatus.GRANTED:
                alert("Permission granted to use " + permission);
                this.getLocation();
                break;
              case permissionStatus.NOT_REQUESTED:
                alert("Permission to use " + permission + " has not been requested yet");
                break;
              case permissionStatus.DENIED:
                alert("Permission denied to use " + permission + " - ask again?");
                break;
              case permissionStatus.DENIED_ALWAYS:
                alert("Permission permanently denied to use " + permission + " - guess we won't be using it then!");
                break;
            }
          }
        })
          .catch(error => alert("ERROR" + JSON.stringify(error)))
      }
      
      }
      
      getLocation() {   
    this.diagnostic.isLocationEnabled().then(enabled => {     
      if (enabled) {       
        let options = {enableHighAccuracy: true}
        this.geolocation.getCurrentPosition(options)
          .then(res => {
            alert(JSON.stringify(res))
          }, error => alert("ERROR" + JSON.stringify(error)))
          .catch(error => alert("CACTH" + error))
      } else {
        this.activateGPS()
      }
    })
  }
  activateGPS() {
    let title, message;

    title = `Activa tu GPS`;
    message = `Necesitamos que actives tu GPS para ver la siguiente pantalla`;


    let confirm = this.alertCtrl.create({
      title: title,
      message: message,
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            this.navCtrl.pop();
          }
        },
        {
          text: 'Aceptar',
          handler: () => {
            this.navCtrl.pop().then(() => this.diagnostic.switchToLocationSettings())
          }
        }
      ]
    });
    confirm.present();
  }
  
  }
