function storeCustomerInfo() {
  const name = document.getElementById("name").value;
  const checkin = document.getElementById("checkin").value;
  const days = parseInt(document.getElementById("days").value);
  const persons = parseInt(document.getElementById("persons").value || 1);

  if (!name || !checkin || !days || !persons) {
    document.getElementById("error-message").style.display = "block";
    return;
  }

  localStorage.setItem("name", name);
  localStorage.setItem("checkin", checkin);
  localStorage.setItem("totalDays", days);
  localStorage.setItem("totalPersons", persons);

  document.getElementById("customerForm").classList.add("hidden");
  document.getElementById("roomForm").classList.remove("hidden");
}

function updateRoomImage() {
  const roomType = document.getElementById("roomType").value;
  const roomImage = document.getElementById("roomImage");

  if (roomType === "delux") {
    roomImage.src = "https://www.hotelkalki.com/assets/img/rooms/a-deluxe-2.jpg";
    roomImage.alt = "Delux Room";
  } else if (roomType === "suite") {
    roomImage.src = "https://www.area83.in/ElementImages/5bf8a789-2234-4321-921d-da46e0660d3b_rgallery.jpg";
    roomImage.alt = "Suite Room";
  }
}

function calculateRoomCost() {
  const roomType = document.getElementById("roomType").value;
  const ac = document.getElementById("ac").checked ? 1000 : 0;
  const locker = document.getElementById("locker").checked ? 300 : 0;

  let roomCost = roomType === "delux" ? 2000 : 3000;
  let totalCost = (roomCost + ac + locker) * parseInt(localStorage.getItem("totalDays"));

  let extraPersons = Math.max(0, parseInt(localStorage.getItem("totalPersons")) - 2) * 1000;
  totalCost += extraPersons;

  localStorage.setItem("totalCost", totalCost);

  document.getElementById("roomForm").classList.add("hidden");
  document.getElementById("paymentForm").classList.remove("hidden");

  document.getElementById("totalCost").innerText = "₹" + totalCost;
}

function calculateBalance() {
  const advance = parseFloat(document.getElementById("advance").value || 0);
  const totalCost = parseFloat(localStorage.getItem("totalCost"));

  const balance = totalCost - advance;

  document.getElementById("balance").innerText = "₹" + balance;
}

function confirmBooking() {
  alert("THANK YOU! Your booking is confirmed.");
  window.location.href = "thankyou.html"; 
}
