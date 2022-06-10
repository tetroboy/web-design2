function fnccopytext()
{
   document.getElementById('cp').innerHTML  = fullname.value;
   document.getElementById('unq').style.color = 'crimson';   
}
function fnccopytext1()
{
   document.getElementById('unq1').style.color = 'crimson';   
}
function fnccopytext2()
{
   document.getElementById('unq2').style.color = 'crimson';   
}
function fnccopytext3()
{
   document.getElementById('unq3').style.color = 'crimson';   
}
function fnccopytext4()
{
   document.getElementById('unq4').style.color = 'crimson'; 
}

window.onload = function(){
    var quickAddBtn = document.getElementById('QuickAdd');
    var quickAddFormDiv = document.querySelector('.quickaddForm')
    var cancelBtn = document.getElementById('Cancel');
    var AddBtn = document.getElementById('Add');
    var fullname = document.getElementById('fullname');
    var phone = document.getElementById('phone');
    var address = document.getElementById('address');
    var city = document.getElementById('city');
    var email = document.getElementById('email');
    var addBookDiv = document.querySelector('.addbook');

    quickAddBtn.addEventListener("click", function(){

        quickAddFormDiv.style.display = "block";
       QuickAdd.style.display = "none";
    });

    cancelBtn.addEventListener("click", function(){
        quickAddFormDiv.style.display = "none";
       QuickAdd.style.display = "block";
    });

    AddBtn.addEventListener("click", addToBook);

    addBookDiv.addEventListener("click", removeEntry);


    var addressBook = [];

    function jsonStructure(fullname,phone,address,city,email){
        this.fullname = fullname;
        this.phone = phone;
        this.address = address;
        this.city = city;
        this.email = email;
    }

    function addToBook(){
        var isNull = fullname.value!='' && phone.value!='' && address.value!='' && city.value!='' && email.value!='';
        if(isNull){
            var obj = new jsonStructure(fullname.value,phone.value,address.value,city.value,email.value);
            addressBook.push(obj);
            localStorage['addbook'] = JSON.stringify(addressBook);
            quickAddFormDiv.style.display = "none";
            clearForm();
            showAddressBook();
        }
    }

    function removeEntry(e){
        if(e.target.classList.contains('delbutton')){
            var remID = e.target.getAttribute('data-id');
            addressBook.splice(remID,1);
            localStorage['addbook'] = JSON.stringify(addressBook);
            showAddressBook();
        }
    }

    function clearForm(){
        var formFields = document.querySelectorAll('.formFields');
        for(var i in formFields){
            formFields[i].value = '';
        }
    }

    function showAddressBook(){
        if(localStorage['addbook'] === undefined){
            localStorage['addbook'] = '';
        } else {
            addressBook = JSON.parse(localStorage['addbook']);
            addBookDiv.innerHTML = '';
            for(var n in addressBook){
                var str = '<div class="entry">';
                    str += '<div class="name"><p>' + addressBook[n].fullname + '</p></div>';
                    str += '<div class="email"><p>' + addressBook[n].email + '</p></div>';
                    str += '<div class="phone"><p>' + addressBook[n].phone + '</p></div>';
                    str += '<div class="address"><p>' + addressBook[n].address + '</p></div>';
                    str += '<div class="city"><p>' + addressBook[n].city + '</p></div>';
                    str += '<div class="del"><a href="#" class="delbutton" data-id="' + n + '">Delete</a></div>';
                    str += '</div>';
                addBookDiv.innerHTML += str;
            }
        }
    }

    showAddressBook();

}