const { FreeboxRegister } = require("freebox")
 
async function main() {
  const freeboxRegister = new FreeboxRegister({
    app_id: "io.dufour.quentin.lte_monitoring",
    app_name: "LTE Monitoring",
    app_version: "1.0.0",
    device_name: "Watcher",
  });
 
  const access = await freeboxRegister.register();
}
 
main().catch(err => console.error(err));
