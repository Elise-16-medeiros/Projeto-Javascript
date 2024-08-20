let parkingList = [];

function addParking() {
	const licensePlate = document.getElementById("license-plate").value;
	const hours = parseInt(document.getElementById("hours").value);
	const minutes = parseInt(document.getElementById("minutes").value);

	if (licensePlate && !isNaN(hours) && !isNaN(minutes)) {
		const cost = calculateCost(hours, minutes);
		parkingList.push({ licensePlate, hours, minutes, cost });
		updateParkingList();
		document.getElementById("parking-form").reset();
	}
}

function calculateCost(hours, minutes) {
	let cost = 4.0 * hours;

	if (hours >= 1) {
		const extraMinutes = minutes > 0 ? Math.ceil(minutes / 15) : 0;
		cost += extraMinutes * 2.0;
	}

	return cost.toFixed(2);
}

function updateParkingList() {
	const listElement = document.getElementById("parking-list");
	listElement.innerHTML = "";

	let totalCost = 0;

	parkingList.forEach((entry, index) => {
		totalCost += parseFloat(entry.cost);
		const listItem = document.createElement("li");
		listItem.innerHTML = `
            ${entry.licensePlate} - ${entry.hours}h ${entry.minutes}min - R$ ${entry.cost} 
            <button onclick="removeParking(${index})">Remover</button>
        `;
		listElement.appendChild(listItem);
	});

	document.getElementById(
		"total-cost"
	).innerText = `Custo Total: R$ ${totalCost.toFixed(2)}`;
}

function removeParking(index) {
	parkingList.splice(index, 1);
	updateParkingList();
}
