let exceptionKeys = []; // empty by default

function convertCsvToJson() {
    exceptionKeys = document.getElementById('exceptionKeys').value.split(',').map(key => key.trim()); // update exceptionKeys

    let file = document.getElementById('csvFile').files[0];

    Papa.parse(file, {
        header: true,
        dynamicTyping: (field) => {
            return !exceptionKeys.includes(field);
        },
        complete: function (results) {
            let jsonData = results.data.map(item => {
                let obj = {};
                for (let k in item) {
                    let keys = k.split('.');
                    let lastKey = keys.pop();
                    let tempObj = obj;
                    for (let key of keys) {
                        tempObj[key] = tempObj[key] || {};
                        tempObj = tempObj[key];
                    }
                    tempObj[lastKey] = item[k];
                }
                return obj;
            });

            let json = JSON.stringify(jsonData, null, 2);
            document.getElementById('output').value = json;
        }
    });
}
