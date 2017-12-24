console.log("conected");

// const banList = ["FLAP", "JPC", "CRB", "MC", "ERB", "EBZ", "MTLM3", "SNS", "DRS", "EMIGR", "BamitCoin", "TAT", "ACT", "OLV", "INF8", "UAEC", "SYC", "ICOO", "DTCT", "ZNA", "PZM", "ECC", "MIV", "EQB", "MOBI", "LTA", "TMT", "OPP", "ECHT", "REBL", "CRDS", "NTK", "MDL", "RBTC", "COFI", "KEX", "CVCOIN", "KCN", "NVST", "PRP", "GUESS", "CPAY", "AXT", "WSH", "MAG", "BOXY", "EARTH", "ILCT", "GAT", "GLA", "AERM", "ZEPH", "WHL", "TRIP", "SENSE", "AUT", "UTK", "MAT", "X8X", "NRO"< "FOOD", "RNDR", "LCASH", "ARBI", "NRN", "BMXT", "OROC", "BOG", "SQP", "WEB", "CJT", "MUT", "NRO", "VZT", "MSR", "XRED", "RUSTBITS", "FIL", "WAN", "DMT", "DLR", "ANTC", "BOTS", "DIM", "BULLS", "SPHTX", "SHP", "ABT", "ZAB", "C20", "MTN", "SMNX", "TTT", "XCJ", "FND", "CLOUT", "AID", "ADB", "CSTL", "XSB", "XCS", "EZM", "AMMO", "VNT", "ANCP", "SRT", "ATFS", "UTN", "STEX", "BDR", "MNZ", "MTK", "BT", "JDC", "SNK", "MASS", "BLOCKPAY", "KLK", "UP", "AUTH", "FOOD", "DUTCH", "ROCK", "TRIBE", "CABS", "SCOR", "DBR", "PYP", "EXY", "VOT", "WSC", "WYR", "EON", "CIX", "ZNT", "MNT", "AC3", "BTCL", "XUN", "xGOx", "JCR", "BITSD", "BOU", "MBT", "DRC", "RFL", "PCN", "TNB", "BNK", "JBY", "DFBT", "AMT", "3DES", "WPR", "GREA", "ICC", "JVY", "PYN", "AVA", "GEA", "ALQO", "AMIS"]
// // just a list of coins hat cause the next part - fetchData to crap out. cxorrect as of 24/12/2017
//
// const currencies = []
const data = []
// let BTCUSD = 0
//
// const compare = function (a, b) {
//   // Use toUpperCase() to ignore character casing
//   const mkcapA = parseInt(a.mkcap);
//   const mkcapB = parseInt(b.mkcap);
//
//   let comparison = 0;
//   if (mkcapA > mkcapB) {
//     comparison = 1;
//   } else if (mkcapA < mkcapB) {
//     comparison = -1;
//   }
//   return comparison;
// }
//

// //
//
// const fetchCurrencies = function () {
//   const baseURL = "https://min-api.cryptocompare.com/data/all/coinlist";
//   const infoURL = "https://www.cryptocompare.com";
//
//   $.getJSON(baseURL).done(function (info) {
//     _(info.Data).each(function (v,k) {
//       let c_obj = {
//         Symbol: v.Symbol,
//         CoinName: v.CoinName,
//         ImageUrl: infoURL + v.ImageUrl,
//         Url: infoURL + v.Url,
//         SortOrder: v.SortOrder
//       };
//       // debugger;
//
//       if (v.Symbol.indexOf("*") !== -1 ) {
//         console.log("do nothing for now with *");
//       } else if (v.Symbol.indexOf(".") !== -1 ) {
//         console.log("do nothing for now with .");
//       } else if ( banList.indexOf(v.Symbol) === -1) {
//         console.log("adding currency");
//         currencies.push(c_obj)
//       } else {
//         //
//       }
//
//
//
//     });
//     // if send too may symbols at once to get data, we get the following:
//     // "fsyms param is invalid. (fsyms length is higher than maxlength: 300)"
//     // hence we tavkle this in bites of 50.
//     $('#data').text(`loading data for ${currencies.length} currencies`)
//     let i = 0
//     let j = 49
//     // console.log("i :", i);
//     // console.log("j :", j);
//     fetchData(i,j)
//     // console.log("curr length: ",currencies.length);
//
//     while (j < currencies.length) {
//       fetchData(i,j)
//       i = i + 50
//       j = j + 50
//     }
//     // console.log("i :", i);
//     // console.log("j :", j);
//
//
//   }).fail(function () {
//     alert('Something bad happened');
//   });
// }
// //


const fetchData = function () {

  const baseURL = "https://api.coinmarketcap.com/v1/ticker/?limit=100"


  $.getJSON(baseURL).done(function (info) {
    // console.log("info is returned");
    // console.log(info);
    _(info).each(function (c) {
      console.log(c);
      // debugger;
      let c_obj = {
      symbol: c.symbol,
      price: c.price_usd,
      change24hour: c.percent_change_24h,
      supply: c.available_supply,
      totalvolume24h: c['24h_volume_usd'],
      mkcap: c.market_cap_usd
      // mkcap: info.RAW[c.Symbol].USD.MKTCAP
      }
      if (c_obj.mkcap < 1000000) {
        console.log("dont add smallest fish");
      } else if (c_obj.price < 0.1) {
        console.log("more small fish not added");
      } else {
        data.push(c_obj)
        // data.sort(compare);
      }


    });

    displayData(data)
  }).fail(function () {
    alert('Something bad happened');
  });

}; // end o fetchData


const displayData = function(data) {

    // data = data.sort(compare).slice().reverse();

    let title = []
    title.push(`<div class="row">`)
    title.push(`<div class="col-2">Symbol</div>`)
    title.push(`<div class="col-2">Price</div>`)
    title.push(`<div class="col-2">24 Hour Change</div>`)
    title.push(`<div class="col-2">Available Supply (Millions USD)</div>`)
    title.push(`<div class="col-2">Volume (Millions USD)</div>`)
    title.push(`<div class="col-2">Market Cap (Millions USD)</div>`)
    title.push(`</div>`)

    $('#data').html(title.join(''))

  _(data).each(function (c_obj) {
    row = [
      `<div class="row">`,
      `<div class="col-2">${c_obj.symbol}</div>`,
      `<div class="col-2">${accounting.formatMoney(c_obj.price)}</div>`,
      `<div class="col-2">${c_obj.change24hour}%</div>`,
      `<div class="col-2">${accounting.formatMoney(c_obj.supply/1000000)}</div>`,
      `<div class="col-2">${accounting.formatMoney(c_obj.totalvolume24h/1000000)}</div>`,
      `<div class="col-2">${accounting.formatMoney(c_obj.mkcap/1000000)}</div>`,
      `</div>`
    ]
    $('#data').append(row.join(''))
  })

}



$(document).ready(function() {
  console.log("document ready");

  $('#data').text(`loading data...`)

  fetchData()


})
