var file;

document.getElementById('file').addEventListener('change', function (e) {
    file = e.target.files[0];
});

const fileUpload = () => {
    if (Object.keys(file || {}).length > 0) {
        const formData = new FormData();
        formData.append('upload', file);
        fetch("/fileUpload", {
            method: 'post',
            body: formData,
        }).then((response) => {
            console.log("lkdnmvklkfmkllfkvmfkd", response);
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
                    html += `<tr>
                                <td>${element.policy_number}</td>
                                <td>${element.policy_start_date}</td>
                                <td>${element.policy_end_date}</td>
                                </tr>`
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
    fetch("/insertMessage", {
        method: 'post',
        body: JSON.stringify({time: "18:26", message: "Hi", day: "03/07/2024" }),
        headers: {
            "content-type": "application/json"
        }
    }).then(async (response) => {
        console.log("kjeffpoijkglofrekjlfofvkjgf", response);
    }).catch((error) => {
        console.log("error", error)
    })
}