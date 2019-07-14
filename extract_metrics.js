const { Freebox } = require("freebox")
const api_config = require("./freebox_auth.json")
const fs = require('fs')

const open = async (...args) => new Promise((ok, nope) => fs.open(...[...args, (err, fd) => err ? nope(err) : ok(fd)]))
const write = async (...args) => new Promise((ok, nope) => fs.write(...[...args, (err, written, buffer) => err ? nope(err, written, buffer) : ok(written, buffer)]))



const measure = async (freebox, fmetrics) => {
  await freebox.login()

  const response = await freebox.request({
    method: "GET",
    url: "connection/lte/config",
  })
  if (!response.data.success) {
    console.error(response)
    return;
  }

  const ts = new Date().toISOString()
  
  const tunnel_keys = [
    'connected', 
    'rx_flows_rate', 
    'tx_flows_rate', 
    'rx_used_rate', 
    'tx_used_rate', 
    'rx_max_rate', 
    'tx_max_rate']

  const radio_keys = [
    'enabled',
    'bandwidth',
    'rsrq',
    'rsrp',
    'rssi',
    'band',
    'pci'
  ]

  const metrics_to_track = [
    ['lte', 'tunnel', tunnel_keys, response.data.result.tunnel.lte], 
    ['xdsl', 'tunnel', tunnel_keys, response.data.result.tunnel.xdsl],
    ['canal 0', 'radio', radio_keys, response.data.result.radio.bands[0]], 
    ['canal 1', 'radio', radio_keys, response.data.result.radio.bands[1]]
  ]

  await metrics_to_track.forEach(async ([n, t, ks, d]) =>
    await ks.forEach(async k =>
      await write(fmetrics, `${ts},${t},${n},${k},${d[k]}\n`)))

  console.log(`${ts} - metrics written`)
  await freebox.logout()
}

const main = async () => {
  const freebox = new Freebox(api_config)
  const fmetrics = await open('metrics.csv', 'a')

  await measure(freebox, fmetrics)
  setInterval(async () => await measure(freebox, fmetrics), 1000 * 60)

}

main().catch(err => console.error(err))
