
var valid_email=true;
var valid_phone=true;
function checkMailStatus(){
    console.log("chcekc w22");
    var email=$('#emailid').val();
    $.ajax({
        type:'post',
        url:'http://localhost:3100/api/checkMail',
        data:{email:email},
        success:function(msg){
            document.getElementById("emailwarning").innerHTML="  Error : "+msg;
            $('#submit').prop({disabled:true});
            valid_email=false;
        }
    })
}
function checkPhoneStatus(){
    var phoneno=$('#phoneno').val();
    $.ajax({
        type:'post',
        url:'http://localhost:3100/api/checkPhone',
        data:{phoneno:phoneno},
        success:function(msg){
            document.getElementById('phonewarning').innerHTML="  Error: "+msg;
            $('#submit').prop({disabled:true});
            valid_phone=false;
        }
    })
}
function resetPhoneValue(){
    document.getElementById('phonewarning').innerHTML="";
    valid_phone=true;
    if(valid_email){
        $('#submit').prop({disabled:false});
    }
}
function resetEmailValue(){
    document.getElementById('emailwarning').innerHTML="";
    valid_email=true;
    if(valid_phone){
        $('#submit').prop({disabled:false});        
    }
}