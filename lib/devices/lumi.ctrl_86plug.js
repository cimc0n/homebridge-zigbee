const HomeKitDevice = require('../HomeKitDevice')

class AqaraSocket extends HomeKitDevice {
  static get description() {
    return {
      model: 'lumi.ctrl_86plug',
      manufacturer: 'LUMI',
      name: 'Aqara Socket',
    }
  }

  getAvailbleServices() {
    return [{
      name: 'Outlet',
      type: 'Outlet',
    }]
  }

  onDeviceReady() {
    this.zigbee.update({ status: 'online', joinTime: Math.floor(Date.now() / 1000) })
    this.mountServiceCharacteristic({
      endpoint: 1,
      cluster: 'genOnOff',
      service: 'Outlet',
      characteristic: 'On',
      reportMinInt: 1,
      reportMaxInt: 300,
      reportChange: 1,
      parser: 'onOff',
      setWaitResponse: true,
    })
    this.mountServiceCharacteristic({
      endpoint: 2,
      cluster: 'genAnalogInput',
      service: 'Outlet',
      characteristic: 'OutletInUse',
      reportMinInt: 1,
      reportMaxInt: 300,
      reportChange: 1,
      report: 'presentValue',
      reportParser: data => data > 0,
    })
  }
}

module.exports = AqaraSocket
