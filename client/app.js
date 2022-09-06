
let host = "http://localhost:3000/api/";

//get employees with fetch api
async function getAllEmployees() {
    const url = `${host}employees`;
    const response = await fetch(url, {
        method: 'GET',
        mode: 'cors'
    });
  return response.json();
}


getAllEmployees().then(response => {
    console.log(response);
    fillEmployeesTable(response.data);
});



//Load employees
const fillEmployeesTable = (employees) => {

    if (!employees) return;
    
    let $table = document.querySelector("#employees");
    let headers = ["id", "Name", "Email"];
    let $tableHeader = $table.querySelector("thead");
    let $headerRow = $tableHeader.insertRow();
    headers.forEach(h => $headerRow.insertCell().append(h));

    let $tableBody = $table.querySelector("tbody");

    for (let i=0; i < employees.length; i++) {

        let {employee_id, first_name, last_name, email} = employees[i];
        let $row = $tableBody.insertRow();
        $row.insertCell().append(employee_id);
        $row.insertCell().append(`${first_name} ${last_name}`);
        $row.insertCell().append(email);
    }

    $table = new DataTable("#employees", {responsive: true});


}