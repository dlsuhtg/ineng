function makeTableSortable(tableid){
    var table = document.getElementById(tableid)
        ,tableHead = table.querySelector('thead')
        ,tableHeaders = tableHead.querySelectorAll('th')
        ,tableBody = table.querySelector('tbody')
    ;
    tableHead.addEventListener('click',function(e){
        var tableHeader = e.target
            ,textContent = tableHeader.textContent
            ,tableHeaderIndex,isAscending,order
        ;
        if (textContent!=='add row') {
            while (tableHeader.nodeName!=='TH') {
                tableHeader = tableHeader.parentNode;
            }
            tableHeaderIndex = Array.prototype.indexOf.call(tableHeaders,tableHeader);
            isAscending = tableHeader.getAttribute('data-order')==='asc';
            order = isAscending?'desc':'asc';
            tableHeader.setAttribute('data-order',order);
            tinysort(
                tableBody.querySelectorAll('tr')
                ,{
                    selector:'td:nth-child('+(tableHeaderIndex+1)+')'
                    ,order: order
                }
            );
        }
    });
}

function removeBlankFromArray(arr){
    for(var x = 0; x < arr.length; x++){
        if(arr[x].length == 0)
            arr.splice(x,1);
    }
    return arr;
}

function getProperties(prop){
    var arr = [];
    for(var name in prop){
        arr.push(name);
    }
    console.log(arr);
}

function checkStatus(error){
    if(error != null && error == "Error: Request failed."){
        sweetAlert("Oops...", "Something went wrong with the Google Spreadsheet." , "error");
        console.log(error);
        return false;       
    }
    return true;
}

function loadingSearchButton(bool,source,text){
    if(bool){
        $('#' +source).html('<span class="glyphicon glyphicon-refresh glyphicon-refresh-animate"></span>');
        $('#' +source).prop('disabled', true);
    }else{
        $('#' +source).text(text);
        $('#' +source).prop('disabled', false);
    }
}

Number.prototype.formatMoney = function(c, d, t){
var n = this, 
    c = isNaN(c = Math.abs(c)) ? 2 : c, 
    d = d == undefined ? "." : d, 
    t = t == undefined ? "," : t, 
    s = n < 0 ? "-" : "", 
    i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", 
    j = (j = i.length) > 3 ? j % 3 : 0;
   return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
 };