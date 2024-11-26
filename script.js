$(document).ready(function () {
    const cargoList = JSON.parse(localStorage.getItem('cargoList')) || [
        {
            id: "CARGO001",
            name: "Строительные материалы",
            status: "В пути",
            origin: "Москва",
            destination: "Казань",
            departureDate: "2024-11-24",
        },
        {
            id: "CARGO002",
            name: "Хрупкий груз",
            status: "Ожидает отправки",
            origin: "Санкт-Петербург",
            destination: "Самара",
            departureDate: "2024-11-26",
        },
        {
            id: "CARGO003",
            name: "Электроника",
            status: "Доставлен",
            origin: "Новосибирск",
            destination: "Ростов-на-Дону",
            departureDate: "2024-11-22",
        },
        {
            id: "CARGO004",
            name: "Одежда",
            status: "Ожидает отправки",
            origin: "Екатеринбург",
            destination: "Уфа",
            departureDate: "2024-11-28",
        },
        {
            id: "CARGO005",
            name: "Продукты питания",
            status: "В пути",
            origin: "Нижний Новгород",
            destination: "Челябинск",
            departureDate: "2024-11-25",
        },
    ];
    

    function renderTable() {
        const tableBody = $("#cargo-list");
        tableBody.empty();

        cargoList.forEach((cargo) => {
            const statusClass = cargo.status === "Ожидает отправки" ? "bg-warning" :
                                cargo.status === "В пути" ? "bg-primary" : "bg-success";
            const row = `
                <tr>
                    <td>${cargo.id}</td>
                    <td>${cargo.name}</td>
                    <td class="${statusClass} text-white">${cargo.status}</td>
                    <td>${cargo.origin}</td>
                    <td>${cargo.destination}</td>
                    <td>${cargo.departureDate}</td>
                    <td>
                        <select class="form-select update-status">
                            <option value="Ожидает отправки" ${cargo.status === "Ожидает отправки" ? "selected" : ""}>Ожидает отправки</option>
                            <option value="В пути" ${cargo.status === "В пути" ? "selected" : ""}>В пути</option>
                            <option value="Доставлен" ${cargo.status === "Доставлен" ? "selected" : ""}>Доставлен</option>
                        </select>
                    </td>
                </tr>
            `;
            tableBody.append(row);
        });
    }

    renderTable();

    $("#cargo-form").submit(function (event) {
        event.preventDefault();
        const name = $("#cargo-name").val();
        const origin = $("#cargo-origin").val();
        const destination = $("#cargo-destination").val();
        const departureDate = $("#cargo-date").val();

        if (!name || !origin || !destination || !departureDate) {
            alert("Заполните все поля!");
            return;
        }

        const newCargo = {
            id: `CARGO${String(cargoList.length + 1).padStart(3, "0")}`,
            name,
            status: "Ожидает отправки",
            origin,
            destination,
            departureDate,
        };

        cargoList.push(newCargo);
        localStorage.setItem('cargoList', JSON.stringify(cargoList));
        renderTable();

        this.reset();
    });

    $(document).on("change", ".update-status", function () {
        const rowIndex = $(this).closest("tr").index();
        const newStatus = $(this).val();
        const cargo = cargoList[rowIndex];

        if (newStatus === "Доставлен" && new Date(cargo.departureDate) > new Date()) {
            alert("Нельзя устанавливать статус 'Доставлен' для груза с будущей датой отправления!");
            $(this).val(cargo.status);
            return;
        }

        cargo.status = newStatus;
        localStorage.setItem('cargoList', JSON.stringify(cargoList));
        renderTable();
    });
});
