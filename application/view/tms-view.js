$(document).ready(function(){
	if(!isLocked("page-wrapper","page-header",lockticketmonitoringsheet)){
		initDateFilters();
		initChosenDDL();
		initSpreadSheet();
		$("#searchButton").click(function(){
	        initSpreadSheet();
	    }); 
	    $('#filterToggle').click(function(){
	        $child=$(this).children('div').children('h4').children('i');
	        $child.toggleClass("fa-arrow-down").toggleClass("fa-arrow-up");
	    });
	}
});

