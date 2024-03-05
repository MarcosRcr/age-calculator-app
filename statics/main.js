document.addEventListener("DOMContentLoaded", function () {
    // Obtener referencias a los elementos del formulario y los spans de resultado
    const form = document.querySelector("form");
    const dayInput = document.getElementById("day");
    const monthInput = document.getElementById("month");
    const yearInput = document.getElementById("year");
    const dayLabel = document.querySelector('label[for="day"]');
    const monthLabel = document.querySelector('label[for="month"]');
    const yearLabel = document.querySelector('label[for="year"]');
    const totalYearSpan = document.getElementById("total-year");
    const totalMonthsSpan = document.getElementById("total-months");
    const totalDaysSpan = document.getElementById("total-days");

    // Agregar un evento de escucha para el envío del formulario
    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Evitar el comportamiento predeterminado del formulario

        // Reiniciar estilos a valores predeterminados
        resetStyles();

        // Obtener los valores de los inputs
        const day = parseInt(dayInput.value);
        const month = parseInt(monthInput.value);
        const year = parseInt(yearInput.value);

        // Validar si los campos están vacíos
        if (isNaN(day) || isNaN(month) || isNaN(year)) {
            setInvalidStyles();
            return; // Detener la ejecución si hay campos vacíos
        }

        // Obtener la fecha actual
        const currentDate = new Date();

        // Validar si el año, mes o día son inválidos
        if (year > currentDate.getFullYear() || month > 12 || day > 31) {
            setInvalidStyles();
            return;
        }

        // Validar febrero en función del año (considerando bisiestos)
        if (
            month === 2 &&
            (day > 29 || (day > 28 && !isLeapYear(year)))
        ) {
            setInvalidStyles();
            return;
        }

        // Calcular la edad
        const ageInMilliseconds = currentDate - new Date(year, month - 1, day);
        const ageDate = new Date(ageInMilliseconds);

        // Obtener los componentes de la edad
        const ageYears = ageDate.getUTCFullYear() - 1970;
        const ageMonths = ageDate.getUTCMonth();
        const ageDays = ageDate.getUTCDate() - 1;

        // Mostrar el resultado en los spans correspondientes
        totalYearSpan.textContent = ageYears;
        totalMonthsSpan.textContent = ageMonths;
        totalDaysSpan.textContent = ageDays;
    });

    function isLeapYear(year) {
        // Función para determinar si un año es bisiesto
        return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    }

    function resetStyles() {
        // Restablecer estilos a valores predeterminados
        dayInput.style.borderColor = "";
        monthInput.style.borderColor = "";
        yearInput.style.borderColor = "";
        dayLabel.style.color = "";
        monthLabel.style.color = "";
        yearLabel.style.color = "";
    }

    function setInvalidStyles() {
        // Establecer estilos de borde y color de label con color HSL rojo
        const hslRed = "hsl(0, 100%, 67%)";
        dayInput.style.borderColor = hslRed;
        monthInput.style.borderColor = hslRed;
        yearInput.style.borderColor = hslRed;
        dayLabel.style.color = hslRed;
        monthLabel.style.color = hslRed;
        yearLabel.style.color = hslRed;
    }
});
