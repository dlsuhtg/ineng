var showDates = [];
var boughtDates = [];
var ticketsSold = [];
function initSpreadSheet(){
	$('#srtms').empty();
	$('#srtms').sheetrock({
	  url: ticketmonitoringsheet,
	  reset: true,
	  callback: function(error){
	  	if(checkStatus(error)){
		  	assignTableData();
	  	}
	  }
	});
}

function assignTableData(error){
	//to access table headers, use tablename > thead > tr > th
	//to access table datas, use tablename > tbody > tr > td
	studentList = [];
	var count = 0;
	$('#srtms > tbody > tr').each(function(){
		var td = $(this).find('td');
		//make data dependent on the Date Bought column.
		//include only those who have Date Bought.
		if(td[2].innerHTML.length > 0){
			var student = new Student(td[0].innerHTML,td[1].innerHTML,td[2].innerHTML.trim(),td[3].innerHTML,td[4].innerHTML,
				td[5].innerHTML,td[6].innerHTML,td[7].innerHTML,td[8].innerHTML,td[9].innerHTML,td[10].innerHTML,
				td[11].innerHTML,td[12].innerHTML,td[13].innerHTML);
			studentList.push(student);
			count++;
			if($.inArray(td[2].innerHTML.trim(), boughtDates) == -1) boughtDates.push(td[2].innerHTML.trim());
		}
		if($.inArray(td[1].innerHTML, showDates) == -1) showDates.push(td[1].innerHTML);
	});
	boughtDates = removeBlankFromArray(boughtDates);
	boughtDates.sort();
	showDates = removeBlankFromArray(showDates);
	getDailySailes(boughtDates);
	$('#srtms > tbody').empty();
	loadHighChart(boughtDates);
}

function loadHighChart(boughtDates){
	$('#ticketSalesGraph').highcharts({
		chart: {
            type: 'line',
            zoomType: 'x'
        },
        title: {
            text: 'Ticket Sales Performance',
            x: -20 
        },
        xAxis: {
            categories: boughtDates
        },
        colors: ['#562E63'],
        credits: {
	    	enabled: false
	    },
        yAxis: {
            title: {
                text: 'Total Sales (Php)'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#562E63'
            }]
        },
        tooltip: {
            formatter: function() {
		        return this.x + '<br>Sales: <b>Php ' + this.y.formatMoney(2, '.', ',') + '</b><br>Tickets Sold: <b>'+ this.point.count +'</b>';
		    }
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        },
        series: [{
            name: studentList[0].show,
            data: ticketsSold
        }]
    });
}

function getDailySailes(boughtDates){
	for(var x = 0; x < boughtDates.length; x++){
		var count = 0;
		var sales = 0;
		for(var y = 0; y < studentList.length; y++){
			if(studentList[y].dateBought == boughtDates[x]){
				count++;
				sales += parseInt(studentList[y].priceType == ''?0:studentList[y].priceType);
			}
		}
		sales = parseInt(sales) || 0;
		ticketsSold.push({y: sales, count:count});
	}
}