axios.defaults.baseURL="https://fotatrade.herokuapp.com/api/v1/"


let token = localStorage.getItem("adtoken")
let allUsers =document.getElementById("allUsers")
if (allUsers) {
    axios({
        url:"/admin/users",
        method:"get",
        headers:{
            authorization:`bearer ${token}`
        }
    })
    .then((res)=>{
        let users  = res.data.users
        let holder =``
        users.map((user,index)=>{
            let id = JSON.stringify(user._id)
            holder+=`<tr>
            <th>${index+1}</th>
            <td>${user.username}</td>
            <td>${user.email}</td>
            <td class="color-primary">$ ${user.balance}</td>
            <td>
                <button class="btn btn-success btn-sm" onclick='deposit(${id})'>
                     <i class="fa fa-plus"></i>  Deposit
                </button>
                <a href="./edit.html?id=${user._id}">
                    <button class="btn btn-warning btn-sm mt-2">
                        <i class="fa fa-eye"></i>  View
                    </button>
                </a>
                    <button class="btn btn-danger btn-sm mb-2 mt-2" onclick='deleteUser(${id})'>
                        <i class="fa fa-trash"></i>  Delete
                    </button>   
                
            </td>
        </tr>`
        })
        allUsers.innerHTML=holder
    })
    
}

function deleteUser(id) {
    console.log(id)
}

function deposit(id) {
    $("#depositModal").modal("show")
    let depositForm = document.getElementById("depositForm")
    depositForm.addEventListener("submit",(e)=>{
        e.preventDefault()
        let amount = depositForm.amount.value
        let interval = depositForm.interval.value

        axios({
            url:"/admin/verify/deposit",
            method:"post",
            data:{amount,interval},
            headers:{
                authorization:`bearer ${token}`
            }
        })
        .then((res)=>{
            Swal.fire({
                icon:"success",
                text:"successfully deposited"
            })
            .then(()=>{
                window.location.reload()
            })
        })
    })
}

let params =  new URLSearchParams(location.search)
let id = params.get("id")

if(id){
    axios({
        url:`/user/profile/${id}`,
        method:"get",
        headers:{
            authorization:`bearer ${token}`
        }
    })
    .then((res)=>{
        
        let user = res.data.user
        document.getElementById("balance").value=user.balance
        document.getElementById("percent").value=user.percentage
        document.getElementById("interval").value=user.intervalRun
        document.getElementById("income").value=user.income
        document.getElementById("refbalance").value=user.refbalance
        document.getElementById("totalPayout").value=user.totalPayout
        let details = document.getElementById("details")
        details.innerHTML=`<h6>Username</h6>
        <p>${user.username}</p>
        <!-- <br> -->
        <h6>Full Name</h6>
        <p>${user.firstName} ${user.lastName}</p>
        <!--  -->
        <h6>User Eamil</h6>
        <p>${user.email}</p>
        <!-- <br> -->   
        <!-- <> -->
        <h6>Investment</h6>
        <p>${user.balance}</p>
        `
    })
}


let formEdit = document.getElementById("formEdit")

if(formEdit){
    formEdit.addEventListener("submit",(e)=>{
        e.preventDefault()
        let interval = parseInt(document.getElementById("interval").value)
        let percent = parseInt(document.getElementById("percent").value)
        let balance = parseInt(document.getElementById("balance").value)
        let income =parseInt(document.getElementById("income").value)
        let refbalance =parseInt(document.getElementById("refbalance").value)
        let totalPayout =parseInt(document.getElementById("totalPayout").value)

        let data={
            interval,balance,percent,income,refbalance,totalPayout
        }
        console.log(data)
        axios({
            url:`/user/editStrongDetails/${id}`,
            method:"post",
            data,
            headers:{
                authorization:`bearer ${token}`
            }
        })
        .then(()=>{
            Swal.fire({
                icon:"success",
                text:"updated successfully"
            })
            .then(()=>{
                location.reload()
            })
        })

    })
}