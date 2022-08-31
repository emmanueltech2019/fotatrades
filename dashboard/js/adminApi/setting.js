axios.defaults.baseURL="https://fotaapi.devemmy.tech/api/v1/"


let createWallet =document.getElementById("createWallet")


if (createWallet) {
    createWallet.addEventListener("submit",(e)=>{
        e.preventDefault()
        let name = createWallet.name.value
        let address = createWallet.address.value
        let qrp = document.getElementById("file").files[0]   
        let abbreviation= createWallet.abbreviation.value
        let formData = new FormData()
        formData.append("name",name)
        formData.append("address",address)
        formData.append("abbreviation",abbreviation)
        formData.append("file",qrp)
        let token = localStorage.getItem("adtoken")
        axios({
            url:`/wallet/create`,
            method:"post",
            data:formData,
            headers:{
                authorization:`bearer ${token}`
            }
        })
        .then((res)=>{
            Swal.fire({
                icon:"success",
                text:"created successfully"
            })
            .then(()=>{
                window.location.reload()
            })
        })

    })
}

let allWallets =document.getElementById("allWallets")

if(allWallets){
    axios({
        url:'/wallet/all',
        method:"get"
    })
    .then((res)=>{
        let holder=``
        res.data.wallets.map((item,index)=>{
            let id = JSON.stringify(item._id)
            holder+=` <tr>
            <th>${index+1}</th>
            <td>${item.name}</td>
            <td>${item.abbreviation}</td>
            <td>${item.address}</td>
            <td><i class="fa fa-trash" onclick='deleteItem(${id})'></i></td>
        </tr>`
        })
        allWallets.innerHTML=holder
    })
}

function deleteItem(id) {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
            axios({
                url:`/wallet/deleteWallet/${id}`,
                method:"delete"
            })
            .then(()=>{
                swal.fire({
                    icon:"success",
                    text:"deleted successfully"
                })
                .then(()=>{
                    window.location.reload()
                })
            })
        }
      })
    
}