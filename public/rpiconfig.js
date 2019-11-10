$(function() {
  $.getJSON('api', updateFeedback);

  $('.feedback-form').submit(function(e) {
    e.preventDefault();
    $.post('api', {
      name: $('#feedback-form-name').val(),
      gpio: $('#feedback-form-gpio').val(),
      value: $('#feedback-form-value').val()
    }, updateFeedback);
  });

  $('.feedback-messages').on('click', function(e) {
      if (e.target.className == 'glyphicon glyphicon-remove') {
        $.ajax({
          url: 'api/' + e.target.id,
	  dataType: "json",
          type: 'DELETE',
            success: updateFeedback
          }); //ajax
        } // the target is a delete button
    }); //feedback messages

  $('.feedback-messages').on('click', function(e) {
        if (e.target.className == 'btn btn-success btn-just-icon') {
          $.ajax({
            url: 'api/on/' + e.target.id,
	    dataType: "json",
            type: 'POST',
            success: updateFeedback
            }); //ajax
          } // the target is a delete button
      }); //feedback messages

  $('.feedback-messages').on('click', function(e) {
            if (e.target.className == 'btn btn-danger btn-just-icon') {
              $.ajax({
                url: 'api/off/' + e.target.id,
                dataType: "json",
                type: 'POST',
                success: updateFeedback
                }); //ajax
              } // the target is a delete button
          }); //feedback messages

  function updateFeedback(data) {
	console.log(data);
   var output = '';

   $.each(data,function(key, item) {
	console.log(key);
     output += '     <div class="feedback-item item-list media-list">';
     output += '       <div class="feedback-item media">';
     output += '       <div class="media-left"><button class="feedback-delete btn btn-xs btn-danger"><span id="' + key + '" class="glyphicon glyphicon-remove"></span></button></div>';
     output += '         <div class="feedback-info media-body">';
     output += '           <div class="feedback-head">';
     output += '             <div class="feedback-title">' + item.gpio + ' <small class="feedback-name label label-info">' + item.name + '</small></div>';
     output += '           </div>';
     output+= '<table>'
     output+= '<tr>'
     output+= '<div><button class="btn btn-success btn-just-icon" id="' + key + '"  >On</button></div>'
     output+= '<div><button class="btn btn-danger btn-just-icon" id="' + key + '"  >Off</button></div>'
     output+= '</tr>'
     output+= '</table>'
     output += '         </div>';
     output += '       </div>';
     output += '     </div>';
   });
   $('.feedback-messages').html(output);
  }
});
