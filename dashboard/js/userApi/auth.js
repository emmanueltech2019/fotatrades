axios.defaults.baseURL="https://fotaapis.herokuapp.com/api/v1/user"

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})
  
  

let registerForm = document.getElementById("registerForm")

if (registerForm) {
    registerForm.addEventListener("submit",(e)=>{
        e.preventDefault()

        let email = registerForm.email.value
        let username = registerForm.username.value
        let password = registerForm.password.value
        let cpassword = registerForm.cpassword.value
        let firstName = registerForm.firstname.value
        let lastName = registerForm.lastname.value
        if(password!=cpassword){
            Swal.fire({
                icon:"warning",
                title:"password did not match"
            })
        }else{
            let data={email,password,username,firstName,lastName}
            console.log(data)
                axios({
                    url:"/register",
                    data:data,
                    method:"post"
                })
                .then((res)=>{
                    localStorage.setItem("token",res.data.token)
                    Toast.fire({
                        icon: 'success',
                        title: 'Account Created successfully'
                    })
                    .then(()=>{
                        window.location.replace("./user/index.html")
                    })
                })
                .catch((err)=>{
                    Swal.fire({
                        icon:"error",
                        text:`${err.response.data.message}`,
                        title:`Error ${err.response.status}`
                    }).then(()=>{
                        location.reload()
                    })
                })
        }
    })
}


let loginForm = document.getElementById("loginForm")

if(loginForm){
    loginForm.addEventListener("submit",(e)=>{
        e.preventDefault()
        let email = loginForm.email.value
        let password =loginForm.password.value
        let data ={email,password}

        axios({
            url:"/login",
            data:data,
            method:"post"
        })
        .then((res)=>{
            localStorage.setItem("token",res.data.token)
            Toast.fire({
                icon: 'success',
                title: 'Login successfully'
            })
            .then(()=>{
                window.location.replace("./user/index.html")
            })
        })
        .catch((err)=>{
            Swal.fire({
                icon:"error",
                text:`${err.response.data.message}`,
                title:`Error ${err.response.status}`
            }).then(()=>{
                
            })
        })
    })
}