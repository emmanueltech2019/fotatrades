axios.defaults.baseURL="https://fotatrade.herokuapp.com/api/v1/user"


let transactionList = document.getElementById("transactionList")

if (transactionList) {
    let token = localStorage.getItem("token")
    axios({
        url:'/transactions',
        method:"get",
        headers:{
            authorization:`bearer ${token}`
        }
    })
    .then((res)=>{
        let data = res.data.transactions
        console.log(data)
        let holder =``
        data.map((item,index)=>{
            console.log(item)
            holder+=`<tr>
            <th>${index+1}</th>
            <td>${item._doc.date.split("T")[0]}</td>
            <td>${item.name}</td>
            <td class="color-primary">$${item._doc.amount}</td>
            <td><span class="badge badge-${item._doc.status=="declined"?"danger":item._doc.status=="approved"?"success":"primary"}">${item._doc.status=="failed"?"Failed":item._doc.status}</span>
            </td>
        </tr>`
        })
        transactionList.innerHTML=holder
    })
    .catch((err)=>{
        console.log(err)
    })
}

