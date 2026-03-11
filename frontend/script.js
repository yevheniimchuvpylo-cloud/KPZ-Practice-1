let localSquares = [];


async function fetchSquares() {
	const res = await fetch('/api/squares');
	localSquares = await res.json();
	render();
}


function render() {
	const grid = document.getElementById('visualGrid');
	const inputs = document.getElementById('inputsContainer');

	grid.innerHTML = '';
	inputs.innerHTML = '';

	localSquares.forEach((sq, index) => {

		grid.innerHTML += `
                <div class="col square-container">
                    <div class="square bg-${sq.color}" style="width: ${sq.size}%">
                        ${index + 1}
                    </div>
                </div>
            `;

		inputs.innerHTML += `
                <div class="border p-2 mb-2 rounded bg-white">
                    <h6>Квадрат #${index + 1}</h6>
                    <div class="row g-2">
                        <div class="col-6">
                            <select class="form-select form-select-sm" onchange="updateLocal(${index}, 'color', this.value)">
                                <option value="primary" ${sq.color === 'primary' ? 'selected' : ''}>Синій</option>
                                <option value="success" ${sq.color === 'success' ? 'selected' : ''}>Зелений</option>
                                <option value="danger" ${sq.color === 'danger' ? 'selected' : ''}>Червоний</option>
                                <option value="warning" ${sq.color === 'warning' ? 'selected' : ''}>Жовтий</option>
                                <option value="dark" ${sq.color === 'dark' ? 'selected' : ''}>Чорний</option>
                            </select>
                        </div>
                        <div class="col-6">
                            <input type="number" class="form-control form-select-sm" value="${sq.size}" 
                                   oninput="updateLocal(${index}, 'size', this.value)" placeholder="Розмір %">
                        </div>
                    </div>
                </div>
            `;
	});
}


function updateLocal(index, field, value) {
	localSquares[index][field] = value;
	render(); 
}

function addSquare() {
	localSquares.push({ color: 'primary', size: '100' });
	render();
}

function removeSquare() {
	localSquares.pop();
	render();
}


document.getElementById('squaresForm').onsubmit = async (e) => {
	e.preventDefault();
	const response = await fetch('/api/squares', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(localSquares)
	});
	const result = await response.json();
	alert(result.message);
};


fetchSquares();