// Az ES6 osztály szintaxisát használjuk a Cinema osztály létrehozásához.
class Cinema {
    // A konstruktorban átadjuk a szükséges paramétereket, beleértve a jegyárakat is.
    constructor(
        container,
        seats,
        count,
        total,
        movieSelect,
        bookButton,
        selectedSeatsElement
    ) {
        // Kiválasztjuk a szükséges HTML elemeket a `querySelector` és `querySelectorAll` metódusokkal.
        this.container = document.querySelector(container);
        this.seats = document.querySelectorAll(seats);
        this.count = document.getElementById(count);
        this.total = document.getElementById(total);
        this.movieSelect = document.getElementById(movieSelect);
        this.bookButton = document.getElementById(bookButton);
        this.selectedSeatsElement =
            document.getElementById(selectedSeatsElement);
        // Beállítjuk a jegy árát a `movieSelect` értékéből.
        this.ticketPrice = +this.movieSelect.value;
        // Inicializáljuk a kiválasztott helyek számát és a teljes jegyárakat.
        this.selectedSeatsCount = 0;
        this.totalTicketPrice = 0;
    }

    // Frissítjük a kiválasztott helyek számát és a teljes jegyárakat.
    updateCountAndTotal() {
        // Kiválasztjuk a kiválasztott helyeket.
        const selectedSeats = this.container.querySelectorAll(
            ".row .seat.selected"
        );
        // Frissítjük a kiválasztott helyek számát és a teljes jegyárakat.
        this.selectedSeatsCount = selectedSeats.length;
        this.count.innerText = this.selectedSeatsCount;
        this.total.innerText = this.selectedSeatsCount * this.ticketPrice;

        // Kiírjuk a kiválasztott helyeket a weboldalra.
        const selectedSeatsNumbers = Array.from(selectedSeats).map(
            (seat) => seat.textContent
        );
        this.selectedSeatsElement.innerText =
            selectedSeatsNumbers.join(", ");
    }

    // Hozzáadjuk az eseménykezelőket a film és a helyek kiválasztásához.
    addEventListeners() {
        // Ha a felhasználó megváltoztatja a kiválasztott filmet, frissítjük a jegy árát és a teljes jegyárakat.
        this.movieSelect.addEventListener("change", (e) => {
            this.ticketPrice = +e.target.value;
            this.updateCountAndTotal();
        });

        // Ha a felhasználó rákattint egy helyre, akkor kiválasztjuk vagy eltávolítjuk a kiválasztást, és frissítjük a teljes jegyárakat.
        this.container.addEventListener("click", (e) => {
            if (
                e.target.classList.contains("seat") &&
                !e.target.classList.contains("occupied")
            ) {
                e.target.classList.toggle("selected");
                this.updateCountAndTotal();
            }
        });

        // Ha a felhasználó rákattint a "Foglalás" gombra, akkor a kiválasztott helyeket "foglalt"-ként jelöljük meg.
        this.bookButton.addEventListener("click", () => {
            const selectedSeats = this.container.querySelectorAll(
                ".row .seat.selected"
            );
            selectedSeats.forEach((seat) => {
                seat.classList.remove("selected");
                seat.classList.add("occupied");
            });
            this.updateCountAndTotal();
        });
    }

    // Hozzáadjuk a sorokat és székeket a mozihoz.
    addRowsAndSeats() {
        const rows = ["A", "B", "C", "D", "E", "F", "G"];
        const seatsPerRow = 20;
        let cinemaHTML = "";

        rows.forEach((row) => {
            let rowHTML = `<div class="row">`;
            for (let i = 1; i <= seatsPerRow; i++) {
                rowHTML += `<div class="seat">${row}${i}</div>`;
            }
            rowHTML += `</div>`;
            cinemaHTML += rowHTML;
        });

        this.container.innerHTML = cinemaHTML;
    }
}

// Létrehozunk egy Cinema objektumot és hozzáadjuk az eseménykezelőket.
const cinema = new Cinema(
    ".container",
    ".row .seat:not(.occupied)",
    "count",
    "total",
    "movie",
    "book",
    "selected-seats"
);
cinema.addRowsAndSeats();
cinema.addEventListeners();

// Teszteljük a Cinema osztályt.
console.assert(cinema.ticketPrice === 10, "A jegyár nem megfelelő."); // A jegyár a HTML-ben megadott értékkel egyezik meg.
console.assert(cinema.selectedSeatsCount === 0,"A kiválasztott helyek száma nem megfelelő.");
console.assert(cinema.totalTicketPrice === 0, "A teljes jegyár nem megfelelő.");
