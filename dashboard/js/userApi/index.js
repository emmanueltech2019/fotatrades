axios.defaults.baseURL="https://fotatrade.herokuapp.com/api/v1/user"

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
            window.location.replace("/dashboard/user-login.html"
          )})
        } else if (result.isDenied) {
          Swal.fire('Welcome Back', '', 'info')
        }
      })
    
}




let pagename = document.getElementById("pagename")
if (pagename) {
    let token = localStorage.getItem("token")
    axios({
        url:`/profile`,
        method:"get",
        headers:{
            authorization:`bearer ${token}`
        }
    })
    .then((res)=>{
      let {username,balance,totalPayout,refcode,refbalance,investRecord,emailVerified} =res.data.user
      if(emailVerified==true){
        if(investRecord==false){
          $('#firstDepositModal').modal("show")
        }else{
          document.getElementById("myrefearn").innerHTML=refbalance
    
          if(!res.data.user.myrefferal && res.data.user.wantReferal == true){
            setTimeout(() => {
              $("#refmodel").modal("show")
            }, 2000);
          }
          let totalInvestment =document.getElementById("totalInvestment")
          totalInvestment.innerHTML=balance
            pagename.innerHTML=username
            document.getElementById("refid").value=`${refcode}`
            document.getElementById("reflink").value=`${refcode}`
            document.getElementById("totalprofit").innerHTML=totalPayout
            document.getElementById("mincome").innerHTML=(50 / 100) * parseInt(balance)
        }
      }else{
        $("#emailVerification").modal("show")
        axios({
          url:"/getverified",
          method:"post",
          headers:{
            authorization:`bearer ${token}`
          }
        })
        .then((result) => {
          console.log(result)
          let verifyForm = document.getElementById("verifyForm")
          verifyForm.addEventListener("submit",(e)=>{
            e.preventDefault()
            let code = verifyForm.code.value
            axios({
              url:"/verify",
              method:"post",
              data:{code},
              headers:{
                authorization:`bearer ${token}`
              }
            })
            .then((result) => {
              Swal.fire({
                icon:"info",
                title:`${result.data.message}`
              })
              .then(()=>{location.reload()})
            }).catch((err) => {
              
            });
          })
        }).catch((err) => {
          
        });
      }
    })
}

let spotbalance = document.getElementById("spotbalance")

if(spotbalance){
  axios({
    url:"https://fotatrade.herokuapp.com/api/v1/deposit/findDepositByCurrency",
    method:"get",
    headers:{
        authorization:`bearer ${localStorage.getItem("token")}`
    }
})
.then((res)=>{
    let data =res.data.list
  let holder =``
    Object.entries(data).map(([k,v]) =>{
      // <div class="icon col-3">
      //     <img src="../images/btc.png" width="20" alt=""> 
      // </div>
      holder+=`<div class="row crypto-bal  mt-2">
      <div class="col-5 pt-3">
          <div class="row">
              <div class="name col-8">
                  <p>${k}</p>
              </div>
          </div>
      </div>
      <div class="col-7 text-right">
          <span class="p-0 m-0 crypto-value">$<span>${v}</span></span> 
      </div>
  </div>`
    });
    spotbalance.innerHTML=holder
})
}


let submitRef =document.getElementById("submitRef")

if(submitRef){
  submitRef.addEventListener("submit",(e)=>{
    e.preventDefault()
    let ref = submitRef.refcode.value
    axios({
      url:`/addref`,
      method:"post",
      data:{ref},
      headers:{
        authorization:`bearer ${localStorage.getItem("token")}`
      }
    }).then(()=>{
      Swal.fire({
        icon:"success",
        text:"referral added"
      })
      .then(()=>{
        $("#refmodel").modal("hide")
      })
    })
  })
}
let idont =document.getElementById("idont")
if (idont) {
  idont.addEventListener("click",()=>{
    axios({
      url:`/idontwantref`,
      method:"post",
      headers:{
        authorization:`bearer ${localStorage.getItem("token")}`
      }
    }).then(()=>{
      Toast.fire({
        icon:"success",
        text:"you will not be prompted again"
      })
      .then(()=>{
        $("#refmodel").modal("hide")
      })
    })
  })
}

axios({
      url:`/myrefers`,
      method:"get",
      headers:{
        authorization:`bearer ${localStorage.getItem("token")}`
      }
})
.then(res=>{
  document.getElementById("myrefers").innerHTML=`${res.data.ref}`
})