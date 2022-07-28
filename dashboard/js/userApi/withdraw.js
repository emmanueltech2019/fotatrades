axios.defaults.baseURL="https://fotaapis.herokuapp.com/api/v1/"


let withdrawalForm = document.getElementById("withdrawalForm")
let currenciesLst =[]
if (withdrawalForm) {
    let currenciesHTML = document.getElementById("currencies")
    axios({
        url:"/wallet/all",
        method:'get'
    })
    .then((res)=>{
        let holder =`<option value="">-- Select Wallet Type --</option>`
        res.data.wallets.map((wall)=>{
            currenciesLst.push(wall)
            holder+=`<option value='${wall.abbreviation}'>${wall.abbreviation}</option>`
        })
        currenciesHTML.innerHTML=holder
    })
    withdrawalForm.addEventListener("submit",(e)=>{
        e.preventDefault()
        let amount = withdrawalForm.amount.value
        let currency = withdrawalForm.currencies.value
        let wallet = withdrawalForm.wallet.value
        let data = {amount,currency,wallet}
        let token = localStorage.getItem("token")
        axios({
            url:"/user/withdraw",
            method:"post",
            data,
            headers:{
                authorization:`bearer ${token}`
            }
        })
        .then((res)=>{
            Swal.fire({
                icon:"success",
                text:`${res.data.message}`
            })
            .then(()=>{
                window.location.replace("./history.html")
            })
        })
    })
}