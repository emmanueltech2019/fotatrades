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


let token  = localStorage.getItem("token")
let profileForm = document.getElementById("profileForm")
function getProfile() {
    axios({
        url:"/profile",
        method:"get",
        headers:{
            authorization:`bearer ${token}`
        }
    })
    .then((res)=>{
        let user =res.data.user
        document.getElementById("ppics").src=user.profile
        profileForm.innerHTML=`<div class="form-group">
        <label>First Name</label>
        <input type="text" class="form-control input-default " name="firstName" required value="${user.firstName?user.firstName:""}">
    </div>
    <div class="form-group">
        <label>Last Name</label>
        <input type="text" class="form-control input-default " name="lastName" required value="${user.lastName?user.lastName:""}">
    </div>
    <div class="form-group">
        <label>Date of Birth</label>
        <input type="date" class="form-control input-default " name="DOB" value="${user.DOB?user.DOB:""}" required>
    </div>
    <div class="form-group">
        <label>UserName</label>
        <input type="text" class="form-control input-default " name="username" disabled value='${user.username}' required>
    </div>
    <div class="form-group">
        <label>Profile Picture</label>
        <input type="file" class="form-control input-default " id="file" required >
    </div>
    <div class="form-group">
        <label>Email</label>
        <input type="email" class="form-control input-default disabled" name="email" value='${user.email}' disabled required>
    </div>
    <fieldset class="form-group">
        <div class="row">
            <label class="col-form-label col-sm-2 pt-0">Gender</label>
            <div class="col-sm-10">
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="gender" value="male" ${user.gender=="male"?"checked":""}>
                    <label class="form-check-label">
                        Male
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="gender" value="female" ${user.gender=="female"?"checked":""}>
                    <label class="form-check-label">
                        Female
                    </label>
                </div>
            </div>
        </div>
    </fieldset>
    
    
    <button type="submit" class="btn btn-primary col-12 col-md-4">Update</button>`
    })
}
getProfile()

profileForm.addEventListener("submit",(e)=>{
    e.preventDefault()
    let firstName = profileForm.firstName.value
    let lastName = profileForm.lastName.value
    let DOB = profileForm.DOB.value
    let email=profileForm.email.value
    let username=profileForm.username.value
    let gender =profileForm.gender.value
    let file=document.getElementById("file").files[0]

    let formData = new FormData()
    formData.append("firstName",firstName)
    formData.append("lastName",lastName)
    formData.append("DOB",DOB)
    formData.append("email",email)
    formData.append("username",username)
    formData.append("gender",gender)

    formData.append("file",file)

    // let data={
    //     firstName,lastName,DOB,email,username,gender
    // }
    axios({
        method:"patch",
        url:"/update",
        data:formData,
        headers:{
            authorization:`bearer ${token}`
        }
    })
    .then(()=>{
        Toast.fire({
            icon:"success",
            text:"successfully updated"
        }).then(()=>{
            getProfile()
        })
    })
    .catch((err)=>{
        console.log(err)
    })
})