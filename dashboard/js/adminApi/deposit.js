axios.defaults.baseURL=`https://fotaapis.herokuapp.com/api/v1`

let token = localStorage.getItem("adtoken")
let depositList = document.getElementById("depositList")
let withdrawalList = document.getElementById("withdrawalList")





if (depositList) {
    axios({
        url:`/deposit/all`,
        method:"get",
        headers:{
            authorization:`bearer ${token}`
        }
    })
    .then((res)=>{
        let data= res.data.wallets
        console.log(data)
        let holder =``
        data.map((item,index)=>{
            let id = JSON.stringify(item._id)
            holder+=`<tr>
                <th>${index+1}</th>
                <td>${item.date.split("T")[0]}</td>
                <td>deposit</td>
                <td class="color-primary">${item.amount}</td>
                <td><span class="badge badge-primary">${item.status}</span>
                ${item.status=="pending"?`<button class='btn btn-success btn-sm' onclick='approve(${id})'>approve</button>`:''}
                </td>
            </tr>`
        })
        depositList.innerHTML=holder
    })
    
}

function approve(id) {
    axios({
        url:`/deposit/verify/${id}`,
        method:'post',
        headers:{
            authorization:`bearer ${token}`
        }
    })
    .then(()=>{
        Swal.fire({
            icon:"success",
            text:"Deposited successfully"
        }).then(()=>{
            window.location.reload()
        })
    })
}

if (withdrawalList) {
    axios({
        url:`/admin/withdrawals`,
        method:"get",
        headers:{
            authorization:`bearer ${token}`
        }
    })
    .then((res)=>{
        let data= res.data.wallets
        console.log(data)
        let holder =``
        data.map((item,index)=>{
            let id = JSON.stringify(item._id)
            holder+=`<tr>
                <th>${index+1}</th>
                <td>${item.date.split("T")[0]}</td>
                <td>deposit</td>
                <td class="color-primary">${item.amount}</td>
                <td><span class="badge badge-primary">${item.status}</span>
                ${item.status=="pending"?`<button class='btn btn-success btn-sm' onclick='approveWithdraw(${id})'>approve</button>`:''}
                </td>
            </tr>`
        })
        withdrawalList.innerHTML=holder
    })
    
}

function approveWithdraw(id) {
    axios({
        url:`/admin/verify/withdraw/${id}`,
        method:'post',
        headers:{
            authorization:`bearer ${token}`
        }
    })
    .then(()=>{
        Swal.fire({
            icon:"success",
            text:"Withdraw successful"
        }).then(()=>{
            window.location.reload()
        })
    })
}