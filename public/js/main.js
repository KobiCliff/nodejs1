function myfunction() {
    var x = document.getElementById("cpassword");
        if (x.type === "password") {
            x.type = "text";
        } else {
            x.type = "password";
        }
}