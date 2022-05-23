function logout(params) {
    Swal.fire({
        title: 'Are You Sure You Want To logout?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Yes',
        denyButtonText: `No`,
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
              title:'Logout Successful',
              icon:'success',
              timer:3500
          })
          .then(()=>{
            localStorage.clear()
            window.location.replace("/dashboard/admin/login.html")
        })
        } else if (result.isDenied) {
          Swal.fire('Welcome Back', '', 'info')
        }
      })
    
}