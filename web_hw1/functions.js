$(document).ready(function(e) {

    current = $(location).attr('href');

    if(current=='http://localhost/web_hw1/Member_list.html'){
        refresh();
    }

    if(current=='http://localhost/web_hw1/File_manager.html'){
        refresh_file();
    }

    
    $("#btn_sign_in").click(function() {
        
        $.ajax({
            type: "POST",
            url: "signin.php",
            data: {
                username: $("#Input_username").val(),
                password: $("#Input_password").val(),
                email: $("#Input_email").val(),
                gender: $("input[type=radio][name=gender]:checked").val(),
                color: $("#colorpicker").val()
            },
            error: function(xhr, ajaxOptions, thrownError) {
                console.log(xhr.status);
                console.log(thrownError);

            },
            success: function(output) {

                
                //console.log(output);
                if(output=="1"){
                    alert("sign-up success! redirect to login page");
                    window.location.href='http://localhost/web_hw1/Login.html';
                }
                else{
                    alert("sign-up failed!");
                }
            }
        });
        
    });  

    $("#btn_login").click(function() {
        
        $.ajax({
            type: "POST",
            url: "login.php",
            data: {
                username: $("#Input_username").val(),
                password: $("#Input_password").val()
            },
            error: function(xhr, ajaxOptions, thrownError) {
                console.log(xhr.status);
                console.log(thrownError);

            },
            success: function(output) {
                //console.log(output);
                if (output=="1"){
                    alert("Welcome!!");
                    window.location.href='http://localhost/web_hw1/Member_list.html';
                }
                else{
                    alert("Login failed!");
                }
                
            }
        });
        
    });

    $("#btn_mod").click(function() {
        
        $.ajax({
            type: "POST",
            url: "mod.php",
            data: {
                username: $("#mod_name").val(),
                password: $("#mod_password").val(),
                email: $("#mod_email").val(),
                gender: $("input[type=radio][name=mod_gender]:checked").val(),
                color: $("#mod_color").val()
            },
            error: function(xhr, ajaxOptions, thrownError) {
                console.log(xhr.status);
                console.log(thrownError);

            },
            success: function(output) {
                //console.log(output);
                if(output=="1"){
                    alert("Modified!");
                }
                else{
                    alert("user existed, cannot modify");
                }

            }
        });
        
    });

    $("#btn_logout").click(function() {
        
        $.ajax({
            url: "logout.php",
            error: function(xhr, ajaxOptions, thrownError) {
                console.log(xhr.status);
                console.log(thrownError);

            },
            success: function(output) {
                //console.log(output);
                
                alert("logout success!!");
                window.location.href='http://localhost/web_hw1/Login.html';
                
                
            }
        });
        
    });

    $("#btn_upload").click(function() {

       

        var file_data = $('#file').prop('files')[0];   //取得上傳檔案屬性
        var form_data = new FormData();  //建構new FormData()
        form_data.append('file', file_data);  //吧物件加到file後面


        $.ajax({
            cache: false, 
            contentType: false, 
            processData: false,
            type: "POST",
            url: "upload.php",
            data:form_data,
            error: function(xhr, ajaxOptions, thrownError) {
                console.log(xhr.status);
                console.log(thrownError);

            },
            success: function(output) {
                //console.log(output);
                
                alert(output);
                refresh_file();
                
                
            }
        });
        
    });
/*
    var $old_fname;
    $("#btn_edit").click(function() {

        $old_fname = $(this).val();
        alert('$old_fname');
          
    });
*/

    $("#btn_rename").click(function() {
        $.ajax({
            type: "POST",
            url: "rename_file.php",
            data: {
                old_fname: $("#btn_edit").val(),
                new_fname: $("#new_fname").val()
                
            },
            error: function(xhr, ajaxOptions, thrownError) {
                console.log(xhr.status);
                console.log(thrownError);

            },
            success: function(output) {
            

            }
        })
    });





    $('table tbody').on('click', '#delete', function() {

        var $fname = $(this).closest('tr').find('#fname').text()

        
        $.ajax({
            type: "POST",
            url: "delete.php",
            data: {
                fname: $fname
            },
            error: function(xhr, ajaxOptions, thrownError) {
                console.log(xhr.status);
                console.log(thrownError);

            },
            success: function(output) {
                //console.log(output);
                alert("Deleted!");
                refresh_file();

            }
        });

    });



    

});


    




function refresh() {
    $.ajax({
        type: "POST",
        url: "showList.php",
        error: function(xhr, ajaxOptions, thrownError) {
            console.log(xhr.status);
            console.log(thrownError);
        },
        success: function(output) {
            output = $.parseJSON(output);
            console.log(output);
            var table = "";
            for (var num = 0; num < output.length; num++) {
                table += "<tr><td>" + output[num][1] + "</td>";
                table += "<td>" + output[num][3] + "</td>";
                table += "<td>" + output[num][4] + "</td>";
                table += "<td>" + output[num][5] + "</td></tr>";
            }

            $("#message_table").html(table);
        }
    });
}

function refresh_file() {
    $.ajax({
        type: "POST",
        url: "showFile.php",
        error: function(xhr, ajaxOptions, thrownError) {
            console.log(xhr.status);
            console.log(thrownError);
        },
        success: function(output) {
            output = $.parseJSON(output);
            console.log(output);
            var table = "";
            for (var num = 0; num < output.length; num++) {
                //var tmp = output[num][2];
                table += "<tr><td id='fname'>" + output[num][2] + "</td>";
                table += "<td>" + output[num][3] + "</td>";
                table += "<td>" + output[num][4] + "</td>";
                //table += "<td>" + "<input type='text'  id='mod_passwvdord'>" + "</td>" + "</tr>";
                table += "<td>" + "<button type = 'button' id='btn_edit' value='" + output[num][2] + "' class = 'btn btn-outline-primary' data-bs-toggle='modal' data-bs-target='#exampleModal'>edit</button> " +
                         "<a href='download2.php?file=" + output[num][2] + "' type = button id='download2' class = 'btn btn-outline-primary'> download</a>" +
                         "<button type = 'button' id='delete' class = 'btn btn-outline-primary' >delete</button> " + "<td>" + "</tr>";

            }

            $("#message_table").html(table);
        }
    });
}

