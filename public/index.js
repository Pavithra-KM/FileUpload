var file;
function openTab(e, tabName, btnId) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tabcontent.length; i++) {
        tablinks[i].classList.remove("active");
        tabcontent[i].style.display = "none";
    }
    document.getElementById(btnId).classList.add("active");
    document.getElementById(tabName).style.display = "block";
}

document.getElementById('file').addEventListener('change', function (e) {
    file = e.target.files;
});

const fileUpload = () => {
    if (file && file.length > 0) {
        const formData = new FormData();
        formData.append('upload', file[0]);
        fetch("/fileUpload", {
            method: 'post',
            body: formData,
        }).then((response) => {
            document.getElementById("attachFileError").innerHTML = ""
        }).catch((error) => {
            console.log("error", error)
        })
    } else {
        document.getElementById("attachFileError").innerHTML = "Please attach a file"
    }
}

const findPolicyInfo = () => {
    fetch("/findPolicyInfo", {
        method: 'get',
        headers: {
            "content-type": "application/json"
        }
    }).then(async (response) => {
        let policyDetails = await response.json()
        let html = ""
        if (policyDetails.result.result?.length > 0) {
            html += `<h3>Policy information with users table</h3>`
            html += `<div>`
            html += `<table>
                            <tr>
                                <th>User name</th>
                                <th>Number</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                            </tr>`
            policyDetails.result.result.forEach(element => {
                element.policyInfo.forEach((info) => {
                    html += `<tr>
                                <td>${info.user_name}</td>
                                <td>${info.policy_number}</td>
                                <td>${info.policy_start_date}</td>
                                <td>${info.policy_end_date}</td>
                                </tr>`

                })
            });
            html += `</table >`
            html += `</div >`
            document.getElementById("policyDetails").innerHTML = html;
        }
    }).catch((error) => {
        console.log("error", error)
    })
}

const searchPolicyInfoWithName = () => {
    if (document.getElementById("userNameInput").value) {
        document.getElementById("policyDetailsTable").innerHTML = ""
        fetch("/searchPolicyInfoWithUsername", {
            method: 'post',
            body: JSON.stringify({ name: document.getElementById("userNameInput").value }),
            headers: {
                "content-type": "application/json"
            }
        }).then(async (response) => {
            document.getElementById("userNameInput").value = ""
            document.getElementById("emptyValueError").innerHTML = ""
            let policyDetailsWithSpecificUser = await response.json()
            let html = ""

            if (policyDetailsWithSpecificUser.result.result?.length > 0) {
                html += `<h3>Policy information with searched user table</h3>`
                html += `<div>`
                html += `<table>
                            <tr>
                                <th>Number</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                            </tr>`
                policyDetailsWithSpecificUser.result.result.forEach(element => {
                    element.policy_details.forEach(info => {
                        html += `<tr>
                                    <td>${info.policy_number}</td>
                                    <td>${info.policy_start_date}</td>
                                    <td>${info.policy_end_date}</td>
                                    </tr>`
                        })
                });
                html += `</table >`
                html += `</div >`
                document.getElementById("policyDetailsTable").innerHTML = html;
            } else {
                document.getElementById("emptyValueError").style.color = "Black"
                document.getElementById("emptyValueError").innerHTML = "No Data Found"
            }
        }).catch((error) => {
            console.log("error", error)
        })
    } else {
        document.getElementById("emptyValueError").style.color = "Red"
        document.getElementById("emptyValueError").innerHTML = "Name should not be empty";
    }
}

const sendMessage = () => {
    if(document.getElementById("timeInp").value && document.getElementById("message").value && document.getElementById("dateInp").value){
        fetch("/insertMessage", {
            method: 'post',
            body: JSON.stringify({time: document.getElementById("timeInp").value, message: document.getElementById("message").value, day: document.getElementById("dateInp").value }),
            headers: {
                "content-type": "application/json"
            }
        }).then((response) => {
            document.getElementById("emptyValuesErrorMsg").innerHTML = ""
        }).catch((error) => {
            console.log("error", error)
        })
    } else {
        document.getElementById("emptyValuesErrorMsg").style.color = "red"
        document.getElementById("emptyValuesErrorMsg").innerHTML = "Fields should not be empty";
    }
}