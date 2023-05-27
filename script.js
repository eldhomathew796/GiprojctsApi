



$(document).ready(function () {
    list_notes()
});




function list_notes() {

    fetch("http://127.0.0.1:8000/note-details/")
        .then(response => response.json())
        .then(data => {
            //console.log(data);
            let output = '';
            for (let i = 0; i < data.length; i++) {
                const element = data[i];
                //console.log(element.id);
                output += `<tr>
              <td>${element.id}</td>
              <td><a href="#" onclick="mod('${element.id}')">${element.note_title}</a></td>
              <td>${element.note_desc}</td>
              <td><button onclick="deleteNote('${element.id}')">Delete</button> <button onclick="updateNote('${element.id}')">Edit</button></td>
              </tr>`;

                //console.log(element.note_desc);


            }
            //console.log(output)
            $("#tb").html(output);





        })
        .catch(error => {
            console.error(error);
        });


}


function mod(param) {
    var p = param;
    console.log(p);
    $('#myModal').modal('show');
    console.log("loaded mod_fnun");
    fetch("http://127.0.0.1:8000/note-details/" + p)
        .then(response => response.json())
        .then(data => {
            let output_modHead = '';
            let output_modBody = '';
            for (let j = 0; j < data.length; j++) {
                const element = data[j];
                console.log(element.id);
                output_modHead += `
                <h4  class="modal-title" >${element.note_title}</h4>
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                `;
                output_modBody += `
                <p>${element.note_desc}</p>
                `;
            }
            //  console.log(output_modHead);
            $("#mod_heading").html(output_modHead);
            $("#Mod_Body").html(output_modBody);
        });
}



function deleteNote(param) {
    var noteId = param;
    console.log(noteId + "###########")
    $.ajax({
        url: 'http://127.0.0.1:8000/note-details/' + noteId + '/',
        type: 'DELETE',
        success: function (response) {
            console.log('Note deleted successfully');
            list_notes()
        },
        error: function (xhr, status, error) {
            console.error('Error deleting note:', error);

        }
    });
}



function updateNote(params) {

    $.ajax({
        url: 'http://127.0.0.1:8000/note-details/' + params,
        type: 'GET',
        success: function (response) {

            var elements = response[response.length - 1];
            console.log(elements);
            var output_modHead = `<h5>Update</h5>`
            var updateButton = `
            <button type="button" class="btn btn-success" onclick="PatchUpdatedNote(${params})">Update</button>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            
            `
            var template = `
            
            <div>
            <form action="">
                   <label for="">Note Title:</label>
                   <input id="note-title" class="form-control" type="text" value="${elements.note_title}">

                   <label for="">Note Body:</label>
                   <input id="note-text" class="form-control"  type="text" value="${elements.note_desc}">
               </form>
             </div>`
            $("#Mod_Body").html(template);
            $("#mod_heading").html(output_modHead);
            $("#modal_footer").html(updateButton);

        },
        error: function (xhr, status, error) {
            console.error('Error updating note:', error);

        }
    });
    $('#myModal').modal('show');
}

function PatchUpdatedNote(params) {

    var noteId = params;
    var noteTitle = $('#note-title').val()
    var noteText = $('#note-text').val();

    console.log(noteId, noteText, noteTitle)

    var requestData = {
        "id": noteId,
        "note_title": noteTitle,
        "note_desc": noteText
    };

    $.ajax({
        url: 'http://127.0.0.1:8000/note-update/' + noteId,
        type: 'PATCH',
        data: requestData,
        success: function (response) {
            console.log('Note updated successfully');
            $('#myModal').modal('hide');
            list_notes()


        },
        error: function (xhr, status, error) {
            console.error('Error updating note:', error);
           
        }
    });

    $('#myModal').modal('show');


}


function NewNoteCreate(){
    
    var output_modHead = `<h5>Add New</h5>`
    var updateButton = `
    <button type="button" class="btn btn-success" onclick="AddNewNote()">Add</button>
    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
    
    `
    var template = `
    
    <div>
    <form action="">
           <label for="">Title:</label>
           <input id="note-title" class="form-control" type="text" >

           <label for="">Content:</label>
           <input id="note-text" class="form-control"  type="text" >
       </form>
     </div>`
    $("#Mod_Body").html(template);
    $("#mod_heading").html(output_modHead);
    $("#modal_footer").html(updateButton);

    $('#myModal').modal('show');

}

function AddNewNote() {

    var noteTitle = $('#note-title').val()
    var noteText = $('#note-text').val();

    console.log( noteText, noteTitle)

    var requestData = {
        
        "note_title": noteTitle,
        "note_desc": noteText

    };

    $.ajax({
        url: 'http://127.0.0.1:8000/note-details/',
        type: 'POST',
        data: requestData,
        success: function (response) {
            console.log('Note updated successfully');
            $('#myModal').modal('hide');
            list_notes()


        },
        
    });
}
