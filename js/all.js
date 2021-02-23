/** 地圖起始位置 **/
const map = L.map('map').setView([22.6556027,120.3238883],12);

/** 載入圖層樣式 **/
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);


let xhr = new XMLHttpRequest();
xhr.open("GET","https://api.kcg.gov.tw/api/service/get/9c8e1450-e833-499c-8320-29b36b7ace5c");
xhr.send(null);
xhr.onload = function(){
    let data = JSON.parse(xhr.responseText).data.XML_Head.Infos.Info;
    /** 建立圖層 **/
    const markers = new L.MarkerClusterGroup().addTo(map);
    for(let i=0 ; i<data.length ; i++){
        let name = data[i].Name;
        //名稱
        let url = data[i].Picture1;
        //圖片網址
        let open = data[i].Opentime;
        //營業時間
        let content = data[i].Description;
        //描述
        let add = data[i].Add;
        //地址
        let tel = data[i].Tel;
        //電話原始格式
        let num = data[i].Tel.slice(4);
        //擷取電話格式
        let x = Number(data[i].Px);
        //x軸座標
        let y = Number(data[i].Py);
        //y軸座標
        
        markers
        .addLayer(L.marker([y,x],{icon: violetIcon})
        //marker樣式
        .bindPopup(
        //彈跳視窗
            `
            <h1 style="font-weight:bold;font-size:24px;padding:10px 10px 10px 0px">${name}</h1>
            <img src="${url}" width="500px">
            <p style="margin: 5px 0px 5px 0px">營業時間 : <span class="text-success">${open}</span></p>
            <p style="margin: 5px 0px 5px 0px">地址 : <span>${add}</span></p>
            <p style="margin: 5px 0px 5px 0px">電話 : <a href="tel:${tel}">${`0${num}`}</a></p>
            <hr style="margin: 5px 0px 5px 0px">
            <p class="text-secondary" style="font-size:14px;margin: 5px 0px 5px 0px">${content}</p>
            `
        ));
    }
    map.addLayer(markers);
}

/** 載入marker樣式 **/
const violetIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png',
  //marker網址
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',

  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

