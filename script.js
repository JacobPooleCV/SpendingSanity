// Function to handle class selection
function selectClass(event) {

    var selectedClass = event.target;
    var sanityCost = parseInt(selectedClass.dataset.sanityCost);

    // Check if the button is currently selected
    var isSelected = selectedClass.classList.contains("selected");

    // Toggle the "selected" class
    selectedClass.classList.toggle("selected", !isSelected);

    // Update the list of selected classes
    updateSelectedClasses();

    // Update sanity based on the selection status
    if (isSelected) {
        // If selected, add the sanity cost back
        sanityPercentage += sanityCost;
    } else {
        // If unselected, deduct the sanity cost
        sanityPercentage -= sanityCost;
    }

    // Update sanity display
    document.getElementById("sanity-percentage").textContent = `${sanityPercentage}%`;

    // Update final sanity display
    document.getElementById("final-sanity").textContent = 100 - sanityPercentage;

    // Check if sanity is depleted
    if (sanityPercentage <= 0) {
        document.getElementById("class-selection").style.display = "none";
        document.getElementById("results").style.display = "block";
    }
}

// Function to update the list of selected classes
function updateSelectedClasses() {

    var selectedClassesList = document.getElementById("selected-classes");
    selectedClassesList.innerHTML = ""; // Clear the existing list

    // Get all buttons with the "selected" class
    var selectedButtons = document.querySelectorAll(".class-button.selected");

    // Iterate over selected buttons and add their text content to the list
    selectedButtons.forEach(function(button) {
        var listItem = document.createElement("li");
        listItem.textContent = button.textContent;
        selectedClassesList.appendChild(listItem);
    });
}

// Function to add selected class to the list
function addClassToList(className) {
    var selectedClassesList = document.getElementById("selected-classes");
    var listItem = document.createElement("li");
    listItem.textContent = className;
    selectedClassesList.appendChild(listItem);
}

// Function to remove unselected class from the list
function removeClassFromList(className) {
    var selectedClassesList = document.getElementById("selected-classes");
    var listItems = selectedClassesList.getElementsByTagName("li");
    for (var i = 0; i < listItems.length; i++) {
        if (listItems[i].textContent === className) {
            selectedClassesList.removeChild(listItems[i]);
            break;
        }
    }
}
// Function to confirm class selection
function confirmSelection() {
    document.getElementById("class-selection").style.display = "none";
    document.getElementById("confirmation").style.display = "none";
    document.getElementById("results").style.display = "block";
}

// Function to go back to class selection from confirmation
function goBack() {
    document.getElementById("class-selection").style.display = "block";
    document.getElementById("confirmation").style.display = "none";
}

// Function to update class options and reset selections based on the selected year
function updateClassOptions() {
    // Reset sanity and class selections
    resetSanity();
    resetClassSelections();

    var year = document.getElementById("year-of-study").value;
    var classGrid = document.getElementById("class-grid");
    var classes = [];

    // Clear previous classes
    classGrid.innerHTML = "";

    // Populate classes based on the selected year
    switch(year) {
        case "1":
            classes = [
                { name: "Math", sanityCost: 10 },
                { name: "English", sanityCost: 15 },
                { name: "Human Geography", sanityCost: 10 },
                { name: "AP Human Geography", sanityCost: 20 },
                { name: "PE", sanityCost: 5 },
                { name: "Living Earth", sanityCost: 20 },
                { name: "American History", sanityCost: 15 }
            ];
            break;
        case "2":
            classes = [
                { name: "World History", sanityCost: 10},
                { name: "Chemistry", sanityCost: 15 },
                { name: "Math", sanityCost: 20 },
                { name: "Applied Computer Programming", sanityCost: 10 },
                { name: "AP Computer Science", sanityCost: 15 },
                { name: "PE", sanityCost: 5 },
                { name: "Art 1-2", sanityCost: 5 },
                { name: "Cinematography 1-2", sanityCost: 10 },
                { name: "Entertainment and Live Technology 1-2", sanityCost: 10 },
                { name: "Graphic Design 1-2", sanityCost: 10 }

            ];
            break;
        case "3":
            classes = [
                { name: "Physics", sanityCost: 6 },
                { name: "Chemistry", sanityCost: 5 },
                { name: "Biology", sanityCost: 4 },
                { name: "Computer Science", sanityCost: 7 },
                { name: "Applied Computer Programming", sanityCost: 10 },
                { name: "AP Computer Science", sanityCost: 15 },
                { name: "PE", sanityCost: 5 },
                { name: "Art 1-2", sanityCost: 5 },
                { name: "Cinematography 1-2", sanityCost: 10 },
                { name: "Entertainment and Live Technology 1-2", sanityCost: 10 },
                { name: "Graphic Design 1-2", sanityCost: 10 }
            ];
            break;
        case "4":
            classes = [
                { name: "Physics", sanityCost: 6 },
                { name: "Chemistry", sanityCost: 5 },
                { name: "Biology", sanityCost: 4 },
                { name: "Computer Science", sanityCost: 7 },
                { name: "Applied Computer Programming", sanityCost: 10 },
                { name: "AP Computer Science", sanityCost: 15 },
                { name: "PE", sanityCost: 5 },
                { name: "Art 1-2", sanityCost: 5 },
                { name: "Cinematography 1-2", sanityCost: 10 },
                { name: "Entertainment and Live Technology 1-2", sanityCost: 10 },
                { name: "Graphic Design 1-2", sanityCost: 10 }
            ];
            break;
        // Add cases for subsequent years as needed
        default:
            classes = [];
    }

    // Create buttons for each class
    classes.forEach(function(classInfo) {
        var button = document.createElement("button");
        button.classList.add("class-button");
        button.dataset.sanityCost = classInfo.sanityCost; // Set the sanity cost
        button.textContent = `${classInfo.name} (${classInfo.sanityCost}%)`;
        button.addEventListener("click", selectClass);
        classGrid.appendChild(button);
    });
}

// Function to reset sanity to 100%
function resetSanity() {
    sanityPercentage = 100;
    document.getElementById("sanity-percentage").textContent = `${sanityPercentage}%`;
    document.getElementById("final-sanity").textContent = 100;
}

// Function to reset class selections
function resetClassSelections() {
    var selectedClassesList = document.getElementById("selected-classes");
    selectedClassesList.innerHTML = "";

    var classButtons = document.querySelectorAll(".class-button");
    classButtons.forEach(function(button) {
        button.classList.remove("selected"); // Remove the "selected" class
        button.disabled = false;
    });
}

// Initialize class options on page load
window.onload = function() {
    updateClassOptions();
};