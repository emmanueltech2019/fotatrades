// axios.defaults.baseURL="https://fotatrade.herokuapp.com/api/v1/"



let currenciesLst =[]
let depositForm = document.getElementById("depositForm")
let currenciesHTML = document.getElementById("currencies")
if (depositForm) {
    axios({
        url:"https://fotatrade.herokuapp.com/api/v1/wallet/all",
        method:'get'
    })
    .then((res)=>{
        let holder =`<option value="">-- Select Currency --</option>`
        res.data.wallets.map((wall)=>{
            currenciesLst.push(wall)
            holder+=`<option value='${wall._id}'>${wall.abbreviation}</option>`
        })
        currenciesHTML.innerHTML=holder
    })
    depositForm.addEventListener("submit",(e)=>{
        e.preventDefault()
        let package=depositForm.package.value
        let currencies = document.getElementById("currencies").value
        let amount =depositForm.amount.value
        let data ={
            package,currency:currencies,amount
        }
        let token = localStorage.getItem("token")
        axios({
            url:"https://fotatrade.herokuapp.com/api/v1/deposit",
            method:"post",
            data,
            headers:{
                authorization:`bearer ${token}`
            }
        })
        .then((res)=>{
            console.log(res)
            var path = window.location.pathname;
            var page = path.split("/").pop();
            if(page=="index.html"){
                $('#firstDepositModal').modal("hide")
                openQRCode(res.data.qr,res.data.address,res.data.name)
            }else{
                openQRCode(res.data.qr,res.data.address,res.data.name)
            }
        })
    })
}

function openQRCode(qrp,address,name) {
    console.log(qrp)
    $("#WalletModal2").modal("show")
    document.getElementById("modalDepositBody").innerHTML=`<div class="col-12">
    <div class="box text-center">
        <img src='${qrp}' width="200" height="200"/>
    </div>
</div>
<div class="form-group">
    <div class="row">
        <div class="col-9">
            <label style="border-bottom: 1px solid #fff; padding-bottom: 5px; display: block">Wallet Address</label>
            <input 
            class="form-control" 
            id="walletAddressDis" 
            type="text" 
            value="${address}" 
            readonly
            style="background-color: inherit; border: none;"
            >
        </div>
        <div class="col-3">
            <div class="">
                <button 
                onclick="copy()" 
                class="btn mt-4"
                style="border: 1px solid #fff"
                >copy</button>
                <p class="tooltiptext">Copied</p>
            </div>
            
        </div>
    </div>
    </div>`
    
}

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

function copy() {
    var copyText = document.getElementById("walletAddressDis");
  
    /* Select the text field */
    copyText.select();
    copyText.setSelectionRange(0, 99999); /* For mobile devices */
  
     /* Copy the text inside the text field */
    navigator.clipboard.writeText(copyText.value);
  
    /* Alert the copied text */
    Toast.fire({
        icon:"success",
        text:"Copied",
    })
  }
  
