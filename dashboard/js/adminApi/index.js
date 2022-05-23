axios.defaults.baseURL="https://fotatrade.herokuapp.com/api/v1/"

let token = localStorage.getItem("adtoken")
axios({
    url:"/admin/users",
    method:"get",
    headers:{
        authorization:`bearer ${token}`
    }
})
.then((res)=>{
    document.getElementById('userLength').innerHTML=res.data.users.length
})


axios({
    url:"/admin/profile",
    method:"get",
    headers:{
        authorization:`bearer ${token}`
    }
})
.then((res)=>{
    console.log(res.data.admin)
    document.getElementById('pname').innerHTML=res.data.admin.username
})

axios({
    url:"/deposit/all",
    method:"get",
    headers:{
        authorization:`bearer ${token}`
    }
})
.then((res)=>{
    let data = res.data.wallets
    let val=0
    data.map((item)=>{
        console.log(item)
        if (item.status==="approved") {
            val+=parseInt(item.amount)
        }
    })
    document.getElementById('totalIncome').innerHTML=val
})