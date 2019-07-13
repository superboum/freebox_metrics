Freebox Metrics
===============

Fetch xdsl/4g aggregation metrics every minutes from the freebox server to better understand how aggregation works and mainly why it doesn't work as intended...

Install
-------

```
npm install
node ./request_access.js
```

Authorize app on your freebox.  
Copy/Paste the displayed JSON to `freebox_auth.json`

```
echo "date,type,name,metric,value" > metrics.csv
node ./extract_metrics.js
cat metrics.csv
```

Extracted
---------

Data are extracted in a format that can be easily handled by [tidyverse libraries](https://www.tidyverse.org/).
metric name is the oen from the API. Currently, I suppose that:

  * `{tx,rx}_flows_rate` might refer to a number of packet/sec
  * `{tx,rx}_used_rate` may refer to the bandwidth currently used
  * `{tx,rx}_max_rate` may refer to the negotiated link bandwisth

```
date,type,name,metric,value
2019-07-13T15:59:28.589Z,tunnel,lte,connected,true
2019-07-13T15:59:28.589Z,tunnel,lte,rx_flows_rate,0
2019-07-13T15:59:28.589Z,tunnel,lte,tx_flows_rate,0
2019-07-13T15:59:28.589Z,tunnel,lte,rx_used_rate,0
2019-07-13T15:59:28.589Z,tunnel,lte,tx_used_rate,0
2019-07-13T15:59:28.589Z,tunnel,lte,rx_max_rate,0
2019-07-13T15:59:28.589Z,tunnel,lte,tx_max_rate,0
2019-07-13T15:59:28.589Z,tunnel,xdsl,connected,true
2019-07-13T15:59:28.589Z,tunnel,xdsl,rx_flows_rate,577
2019-07-13T15:59:28.589Z,tunnel,xdsl,tx_flows_rate,157
2019-07-13T15:59:28.589Z,tunnel,xdsl,rx_used_rate,977
2019-07-13T15:59:28.589Z,tunnel,xdsl,tx_used_rate,457
2019-07-13T15:59:28.589Z,tunnel,xdsl,rx_max_rate,2036500
2019-07-13T15:59:28.589Z,tunnel,xdsl,tx_max_rate,130625
2019-07-13T15:59:28.589Z,radio,canal 0,enabled,true
2019-07-13T15:59:28.589Z,radio,canal 0,bandwidth,15
2019-07-13T15:59:28.589Z,radio,canal 0,rsrq,-7
2019-07-13T15:59:28.589Z,radio,canal 0,rsrp,-107
2019-07-13T15:59:28.589Z,radio,canal 0,rssi,-81
2019-07-13T15:59:28.589Z,radio,canal 0,band,3
2019-07-13T15:59:28.589Z,radio,canal 0,pci,80
2019-07-13T15:59:28.589Z,radio,canal 1,enabled,false
2019-07-13T15:59:28.589Z,radio,canal 1,bandwidth,0
2019-07-13T15:59:28.589Z,radio,canal 1,rsrp,0
2019-07-13T15:59:28.589Z,radio,canal 1,rsrq,0
2019-07-13T15:59:28.589Z,radio,canal 1,rssi,0
2019-07-13T15:59:28.589Z,radio,canal 1,band,0
2019-07-13T15:59:28.589Z,radio,canal 1,pci,0
```

Analyze
-------

*To be done. Come back later, I will probably use*
