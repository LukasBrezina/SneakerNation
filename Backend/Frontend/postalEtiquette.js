// Get the form and output elements
const form = document.getElementById('myForm');
const output = document.getElementById('output');
const surnameField = document.getElementById('surname');
const nameField = document.getElementById('name');
const addressField = document.getElementById('address');

// Add event listeners to all input fields
const fields = form.querySelectorAll('input');
fields.forEach(field => {
  field.addEventListener('input', updateOutput);
});

// Event listener for form submission
form.addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent form submission

  // Get the field values
  var surnameValue = surnameField.value;
  var nameValue = nameField.value;
  var addressValue = addressField.value;

  // Create a new entry object with the field values
  var entry = {
    surname: surnameValue,
    name: nameValue,
    address: addressValue
  };

  // Add the new entry to the entries array
  entries.push(entry);

  // Update the textarea with all entries
  updateOutput();
 
});

// Function to update the output textarea
function updateOutput() {
  // Get the values from the form fields
  const surname = surnameField.value;
  const name = nameField.value;
  const address = addressField.value;

  // Construct the output text
  const outputText = `Surname:   ${surname}\nName:   ${name}\nAddress:   ${address}`;

  // Update the output textarea with the constructed text
  output.value = outputText;
}


// from the html:
document.getElementById("submitButton").addEventListener("click", function() {
    var surname = document.getElementById("surname").value;
    var name = document.getElementById("name").value;
    var address = document.getElementById("address").value;

    var output = document.getElementById("output");
    output.value = "Surname:   " + surname + "\n";

    output.value += "Name:   " + name + "\n";
    output.value += "Address:   " + address + "\n\n";


    var customFields = document.getElementsByName("customField");
    for (var i = 0; i < customFields.length; i++) {
      var fieldName = customFields[i].value;
      var fieldValueInput = document.getElementsByName(fieldName)[0];
      output.value += fieldName + ": " + fieldValueInput.value + "\n";
    }

    document.getElementById("myForm").reset();
    output.scrollTop = output.scrollHeight;
    alert("Your Package will be delivered in the next few days. Thank you for your purchase at SneakerNation.");
    window.top.location.href = 'index.html';
  });

  document.getElementById("addFieldButton").addEventListener("click", function() {
    var form = document.getElementById("myForm");
    var input = document.createElement("input");
    input.type = "text";
    input.name = "customField";
    input.placeholder = "Field Name";
    input.addEventListener("keyup", function(event) {
      if (event.key === "Enter") {
        var fieldName = event.target.value;
        var fieldValueInput = document.createElement("input");
        fieldValueInput.type = "text";
        fieldValueInput.name = fieldName;
        fieldValueInput.placeholder = fieldName +"   "+ " Value";
        fieldValueInput.addEventListener("keyup", function() {
          var output = document.getElementById("output");
          output.value = ""; // Clear the textarea
          output.value += "Surname:   " + document.getElementById("surname").value + "\n";
          output.value += "Name:   " + document.getElementById("name").value + "\n";
          output.value += "Address:   " + document.getElementById("address").value + "\n\n";

          var customFields = document.getElementsByName("customField");
          for (var i = 0; i < customFields.length; i++) {
            var fieldName = customFields[i].value;
            var fieldValueInput = document.getElementsByName(fieldName)[0];
            output.value += fieldName + ":   " + fieldValueInput.value + "\n";
          }
        });
        form.appendChild(fieldValueInput);
        event.target.disabled = true;
        event.target.placeholder = fieldName + " added";
      }
    });
    form.appendChild(input);
  });