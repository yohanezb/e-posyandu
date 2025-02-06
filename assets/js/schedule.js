function addRow() {
    let table = document.getElementById("myTable");
    let row = table.insertRow(-1);
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3= row.insertCell(1);
    let cell4= row.insertCell(1);
    cell1.innerHTML = `<input type="text">`;
    cell2.innerHTML = `<input type="text">`;
    cell3.innerHTML = `<input type="text">`;
    cell4.innerHTML = `<input type="text">`;
  }

function deleteRow() {
    document.getElementById("myTable").deleteRow(-1);
}
