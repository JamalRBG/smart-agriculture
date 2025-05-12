
function calculateCost() {
    // Get all checkboxes with name "values"
    var checkboxes = document.getElementsByName('values');

    // Initialize sum to 0
    var sum = 0;

    // Loop through checkboxes to find the selected ones
    for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            // Add the value of the selected checkbox to sum
            sum += parseInt(checkboxes[i].value);
            // Updating the cost in each of the respective table cell
            updateCostInTable(checkboxes[i].id, sum);
        }
    }

    // Get all radio buttons with name "participantType"
    var radioButtons = document.getElementsByName('participantType');

    // Initialize radioValue to 0
    var radioValue = 0;

    // Loop through radio buttons to find the selected one
    for (var j = 0; j < radioButtons.length; j++) {
        if (radioButtons[j].checked) {
            // Set radioValue to the value of the selected radio button
            radioValue = parseInt(radioButtons[j].value);
            break; // exit the loop once a radio button is found
        }
    }

    // Get the start and end dates
    var startDate = document.getElementsByName('startDate')[0].value;
    var endDate = document.getElementsByName('endDate')[0].value;

     // Check if all necessary inputs are selected before calculating cost
     if (startDate && endDate && radioValue) {
        // Calculate the number of days between start and end dates
        var numberOfDays = calculateNumberOfDays(startDate, endDate);


    // Calculate the total cost
    var totalCost = (radioValue + sum )* numberOfDays;

    // Apply discount if more than 2 sessions and total cost > 1000
    if (checkboxes.length > 2 && totalCost > 1000) {
        totalCost -= totalCost * 0.15; // 15% discount
    }

    // Display the result
    document.getElementById('result').innerHTML = 'Total Cost: €' + totalCost;
    window.confirm(`Do you accepts the calculated total cost for payment ?` + totalCost);
}else {
    // Display a message indicating that all required inputs need to be selected
    document.getElementById('result').innerHTML = 'Please select participant type, session type, and dates.';
}
}
// Function to calculate the number of days between two dates
function calculateNumberOfDays(startDate, endDate) {
    var start = new Date(startDate);
    var end = new Date(endDate);
    var timeDifference = end - start;
    var daysDifference = timeDifference / (1000 * 60 * 60 * 24);
    return daysDifference + 1; // add 1 to include both the start and end dates
}

function getSelectedParticipantType() {
    var radioButtons = document.getElementsByName('participantType');
    for (var j = 0; j < radioButtons.length; j++) {
        if (radioButtons[j].checked) {
            return parseInt(radioButtons[j].value);
        }
    }
    return 0;
}

function getSelectedSessionTypeValue(checkboxNumber) {
    var checkbox = document.getElementById('checkbox' + checkboxNumber);
    return parseInt(checkbox.value);
}

function updateTextbox(checkboxNumber) {
    var checkbox = document.getElementById('checkbox' + checkboxNumber);
    var textbox = document.getElementById('textbox' + checkboxNumber);

    //Get the selected participant type and session type value
    var selectedParticipantType = getSelectedParticipantType();
    var sessionTypeValue = getSelectedSessionTypeValue(checkboxNumber);


    // Get the selected number of days
    var startDate = document.getElementsByName('startDate')[0].value;
    var endDate = document.getElementsByName('endDate')[0].value;
    var numberOfDays = calculateNumberOfDays(startDate, endDate);

    // Check if all necessary inputs are selected before updating textbox
    if (startDate && endDate && selectedParticipantType && sessionTypeValue) {
    
        textbox.value = (selectedParticipantType +sessionTypeValue) *numberOfDays ;
    } else { 
    textbox.value = '';
}
}

function updateCostInTable(textboxId, cost) {
    // Extract the checkbox number from the textboxId
    var checkboxNumber = parseInt(textboxId.replace('textbox', ''));
    
    // Update the cost in the respective table cell
    var costCell = document.getElementById('costCell' + checkboxNumber);
    if (costCell) {
        costCell.innerHTML = cost + '€';
    }
}