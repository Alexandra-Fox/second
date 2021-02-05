'use strict'

let arr = [
    {
        name: "name1",
        value: "value1,value2,value3"
    },
    {
        name: "name2",
        value: "fghjk, jhgf, gfd"
    }
];

var elem = document.querySelector('#elem');
var text = document.querySelector('#text');
var newrow = document.querySelector('#newrow');

function createTable(parent, tableElem) {
    let tableInHtml = elem.querySelector('table');

    if (tableInHtml != null) {
        elem.querySelector('table').remove();
    }

    var table = document.createElement('table');

    tableElem.forEach(function (elem) {
        var tr = document.createElement('tr');

        Object.values(elem).forEach(function (column, i) {
            if (i == 0) {
                var td = document.createElement('td');
                td.innerHTML = '<div class="delete">&#10008;</div>' + elem['name'];
                tr.appendChild(td);

            } else {
                var tableValue = column.split(',');

                tableValue.forEach(function (value) {
                    var td = document.createElement('td');
                    td.innerHTML = value;
                    tr.appendChild(td);
                });
            }
        });

        table.appendChild(tr);
    });

    parent.appendChild(table);

    table.onclick = function (event) {
        let target = event.target;
        let querysel = target.parentElement.querySelectorAll('td');
        let textsplise = [];

        querysel.forEach(function (td) {
            textsplise.push(td.textContent);
        });
        text.innerHTML = textsplise.join(' ');
    }

    let deleteButton = document.querySelectorAll('.delete');

    deleteButton.forEach(function (btn) {
        btn.addEventListener('click', function () {
            let indexElement = indexInParent(this.closest('tr'));
            arr.splice(indexElement, 1);
            this.closest('tr').remove();
        });
    });
}

newrow.addEventListener('click', function () {
    let newElementArr = prompt('Введите данные для поля. Пример: "name,value,value2,value3"', 'name,value,value2,value3');
    
    if (newElementArr != null) {
        let splitArr = newElementArr.split(','),
            newElementArrName = splitArr[0],
            newElementArrValue = splitArr.splice(1).join(',');

        arr.push({
            name: newElementArrName,
            value: newElementArrValue
        });
        createTable(elem, arr);
    }
    console.log(arr);
});

function indexInParent(node) {
    var children = node.closest('table').childNodes;
    var num = 0;

    for (var i = 0; i < children.length; i++) {
        if (children[i] == node) return num;
        if (children[i].nodeType == 1) num++;
    }
    return -1;
}

createTable(elem, arr);
