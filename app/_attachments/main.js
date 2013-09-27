// --------  JavaScript Document  -------- //
//Name: Nathan Byarley
//Project: Week 3
//Term: 1309
//Class: ASD

//Added sections for each page. these are just the basics as they will change as needed through the remaining weeks.

$(document).on('pageinit', '#homepg', function() {

});

//Add item page, and verify required fields are filled
$(document).on('pageinit', '#addItem', function() {

		var myForm = $('#equipmentForm');
			myForm.validate({
				invalidHandler: function(form, validator) {},
				submitHandler: function() {
				var sData = myForm.serializeArray();
				saveData(sData);//data
				}
			});

			//save data to localstorage
		function saveData(sData){
			//get form information and store within an object
			var sData = {};
				sData.name 	= $('#ename').val();
				sData.slot    = $('#itemList').val();
				sData.level   = $('#islide').val();
				sData.note    = $('#note').val();
				console.log(sData);

				//Save into couch
			    $.couch.db("equipmentapp").saveDoc({
			    	"_id": "name:" + sData.name,
			    	"name": sData.name,
			    	"slot": sData.slot,
			    	"level": sData.level,
			    	"note": sData.note
			    },{
			    	success: function(sData) {
			    		console.log(sData);
			    		alert('Equipment has been saved');
			        	$.mobile.changePage($('#equipmentNameSearch'));
			    	}
			    });
			  $('#addItem').listview('refresh');
		}
			var save = $('submit');
			$('#submit').on('click', saveData);

}); //end addItem function

$(document).on('pageinit', '#equipmentNameSearch', function(){
	$.couch.db("equipmentapp").view("app/equipbyname", {
		success: function(sData){
			console.log(sData);
			$('#equipmentList').empty();
			$.each(sData.rows, function(index, eData){
				var name = eData.value.name;
				var slot = eData.value.slot;
				var level = eData.value.level;
				var note = eData.value.note;
				var id = eData.id;
				var rev = eData.value.rev;
				$(''+
					'<li>' +
					        '<h3>' + name +'</h3>' +
					        '<p>' + 'Slot: ' + slot + '</p>' +
					        '<p>' + 'Level: ' + level + '</p>' +
							'<hr />' +
				    '</li>'
				).appendTo('#equipmentList');

				//edit link
				var editLink = $('<a>');
				editLink.attr("href", "#");
				var editText = "Edit Equipment";
				editLink.on("click", editItem);
				editLink.text(editText);
				editLink.appendTo(equipmentList);

				//break between edit and delete
				var breakTag = document.createElement('br');
				editLink.append(breakTag);

				//delete link
				var deleteLink = $('<a>');
				deleteLink.attr("href", "#");
				var deleteText = "Delete Equipment";
				deleteLink.on("click", deleteItem);
				deleteLink.text(deleteText);
				deleteLink.appendTo(equipmentList);
				

				//reconstructed my delete button
				//will delete the selected item from the couch db	
				function deleteItem() {
				console.log(rev);
					var verifyDelete = confirm("Are your sure you want to delete the Equipment?");
					if (verifyDelete) {
						var doc = {
							_id: id,
							_rev: rev
							};
							$.couch.db("equipmentapp").removeDoc(doc, {
								success: function(data) {
									console.log(data);
									alert("The Equipment has been deleted!");
									window.location.reload();
								}
							});
					} else {
						alert("Equipment was NOT deleted.");
					}
				}
			
				function editItem(sData) {

				var sData = {};
					$('#ename').val(name);
					$('#itemList').val(slot);
					$('#level').val(level);
					$('#note').val(note);

					//Save into couch
			        $.couch.db("equipmentapp").saveDoc(sData, {

			        	success: function(sData) {
			        		console.log(sData);
			        		$.mobile.changePage($('#addItem'));
			        	},
			        	error: function(sData) {
			        		console.log(status);
			        	}
		        	});
					$.mobile.changePage($('#addItem'));
								
				}
			});
			$('#equipmentList').listview('refresh');
		}
	});
});	

$('#slotSearch').on('pageinit', function(){
});

$('#levelSearch').on('pageinit', function(){
});

$('#dataSearch').on('pageinit', function(){
});

//Thsi will clear the localstorage
$("#clearLocalStorage").on('click', function() {
	//if statement based on length of localstorage
	if(localStorage.length === 0){
		alert("There is nothing to delete");
	}else {
    	var verify = confirm("Are you sure you want to clear the localStorage?");
	};
	//if you confirm you wish to delete, then storage will be cleared.
    if (verify) {
        localStorage.clear(); //clears localstorage
    }
});

$('#about').on('pageinit', function(){
	<!---- Tab function on about page ---->
	$('#about').delegate('.ui-navbar a', 'click', function () {
    	$(this).addClass('ui-btn-active');
    	$('.content_div').hide();
    	$('#' + $(this).attr('data-href')).show();
	});
});


