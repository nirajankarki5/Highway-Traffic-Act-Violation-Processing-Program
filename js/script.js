const reasons = {
  0: {
    section: "128",
    name: "Speeding",
    community: {
      0: {
        min: 6,
        max: 19,
        fine: 2.5,
      },
      1: {
        min: 20,
        max: 29,
        fine: 7.5,
      },
      2: {
        min: 30,
        max: 49,
        fine: 12,
      },
      3: {
        min: 1,
        max: 5,
        fine: 0,
        isWarning: true,
      },
    },
  },
  1: {
    section: "62(1)",
    name: "Drive without proper headlights‑ motor vehicle",
    fine: 85,
  },
  2: {
    section: "7(1)(b)(i)",
    name: "Drive motor vehicle, no plates",
    fine: 85,
  },
};

const offences = [
  {
    name: "Drive motor vehicle, no currently validated permit",
    section: "7(1)(a)",
    fine: "85",
  },
  {
    name: "Drive motor vehicle — improper licence",
    section: "32(1)",
    fine: "260",
  },
  {
    name: "Operate commercial motor vehicle — improper insurance	",
    section: "23(1)",
    fine: "N.S.F.",
  },
  {
    name: "Drive with seat belt removed",
    section: "106(1)",
    fine: "200",
  },
];

function validatePermit() {
  let isValidPermit = generateRandomNum();
  if (!isValidPermit) {
    return offences[0];
  }
  return false;
}

function validateInsurance() {
  let isValidPermit = generateRandomNum();
  if (!isValidPermit) {
    return offences[2];
  }
  return false;
}

function validateLicense() {
  let isValidPermit = generateRandomNum();
  if (!isValidPermit) {
    return offences[1];
  }
  return false;
}

function validateSeatBelt() {
  let isValidPermit = generateRandomNum();
  if (!isValidPermit) {
    return offences[3];
  }
  return false;
}

function generateRandomNum() {
  return Math.floor(Math.random() * 2);
}

function $(id) {
  return document.getElementById(id);
}

const userOffence = [];
// reasons for stopping and its section and fine
const randomNumberForReason = Math.floor(Math.random() * 3);
let fineForVoliation = 0;
let reasonNameForVoliation = reasons[randomNumberForReason].name;
let sectionForVoliation = reasons[randomNumberForReason].section;

// check if court appearance is required
let courtAppearance = false;
let isWarning = false;

let totalFine = 0;
function onSubmit() {
  const name = $("name");
  const licenseNumber = $("licenseNumber");
  if (name.value == "") {
    name.style.border = "2px solid red";
    return;
  }
  if (licenseNumber.value == "") {
    licenseNumber.style.border = "2px solid red";
    return;
  }

  const permitOffence = validatePermit();
  const insuranceOffence = validateInsurance();
  const licenseOffence = validateLicense();
  const seatBelt = validateSeatBelt();

  if (permitOffence) {
    userOffence.push(permitOffence);
  }
  if (insuranceOffence) {
    userOffence.push(insuranceOffence);
  }
  if (licenseOffence) {
    userOffence.push(licenseOffence);
  }
  if (seatBelt) {
    userOffence.push(seatBelt);
  }

  if (
    isWarning &&
    !permitOffence &&
    !insuranceOffence &&
    !licenseOffence &&
    !seatBelt
  ) {
    $("warning-message").innerHTML = "Warning! Be careful next time";
    return;
  }
  displayOffences();
}

function displayOffences() {
  event.preventDefault();

  // Display
  const name = $("name").value;
  const licenseNumber = $("licenseNumber").value;
  const date = new Date();

  document.getElementById("details").style.display = "block";
  $("display-date").innerHTML = date.toUTCString();
  $("display-ticket").innerHTML = "T" + Date.now();
  $("display-name").innerHTML = name;
  $("display-license-number").innerHTML = licenseNumber;

  const offenceListDisplay = $("display-offence-list");

  offenceListDisplay.innerHTML = "";

  userOffence.forEach((offence) => {
    const listItem = document.createElement("li");
    // listItem.textContent = `Name: ${offence.name} - Section: ${offence.section} - Fine: $${offence.fine}`;
    listItem.innerHTML = `
    <p>${offence.name}</p>
    <p>${offence.section}</p>
    <p>${offence.fine}</p>
    `;
    offenceListDisplay.appendChild(listItem);

    if (offence.fine === "N.S.F.") {
      courtAppearance = true;
    } else {
      totalFine += +offence.fine;
    }
  });

  // display reasons for speeding along with fine
  const listItem = document.createElement("li");
  listItem.innerHTML = `<p>${reasonNameForVoliation}</p>
  <p>${sectionForVoliation}</p>
  <p>$${fineForVoliation}</p>`;

  totalFine += fineForVoliation;
  offenceListDisplay.appendChild(listItem);

  $("total-fine").innerHTML = "$" + totalFine;

  if (courtAppearance) {
    $("court-appearance").innerHTML = "Court Appearance Required";
  }
}
