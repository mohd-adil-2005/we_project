// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
  
        form.classList.add('was-validated')
      }, false)
    })
  })()



  // for taxSwitch 

  
document.querySelectorAll(".filter").forEach(filter => {
  filter.addEventListener("click", async () => {
    const category = filter.getAttribute("data-category");

    const response = await fetch("/send-category", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ category })
    });

    const html = await response.text();
    console.log(html)
    if(response.status!==200){
      req.flash("error","this type of listings not found !");
      res.redirect("/listings");
    }

   document.open();
   document.write(html);
   document.close();
   
  });
});











