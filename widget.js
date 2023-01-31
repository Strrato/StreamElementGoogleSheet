const SHEET_ID = "";
const ACCESS_TOKEN = "";
const DELAY = 2000;
const RANGE = "A2:B4";
const COL_INDEX_NAMES = 0;
const COL_INDEX_VALUES = 1;

let checkInterval = null,
    request = null,
    requestData = null;

window.addEventListener('onWidgetLoad', function (obj) {
    if(checkInterval === null){
        checkInterval = setInterval(() => {
            fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${RANGE}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${ACCESS_TOKEN}`  
                }
            })
            .then(response => response.json())
            .then(data => setList(data));
        }, DELAY);
    }
});


function setList(data) {
    if (typeof data.values !== typeof void(0)){
        let html = "";
        let table = [];

        // sort score
        for(let val of data.values){
            let name = val[COL_INDEX_NAMES];
            let value = val[COL_INDEX_VALUES];
            table.push([name, value]);
        }
        table.sort((a,b) => {
            return b[1] - a[1];
        });

        // display
        for(let input of table){
            let name = input[0];
            let score = input[1];
            html += `<li class="item">${name} <span class="score">${score}</span></li>`;
        }
        document.getElementById('list').innerHTML = html;
    }
}