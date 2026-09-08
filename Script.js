const $ = id => document.getElementById(id);

const fields = {
  name: "cName",
  father: "cFather",
  union: "cUnion",
  memberId: "cId",
  blood: "cBlood"
};

function update() {
  Object.entries(fields).forEach(([a, b]) => {
    const source = $(a);
    const target = $(b);
    if (source && target) target.textContent = source.value || "—";
  });

  if ($("bName")) $("bName").textContent = $("name").value || "—";
  if ($("bVillage")) $("bVillage").textContent = $("village").value || "—";
  if ($("bPost")) $("bPost").textContent = $("post").value || "—";
  if ($("bDistrict")) $("bDistrict").textContent = $("district").value || "—";
  if ($("bMobile")) $("bMobile").textContent = $("mobile").value || "—";

  const qr = $("qrcode");

  if (qr && typeof QRCode !== "undefined") {
    qr.innerHTML = "";

    const url =
      location.href.split("#")[0] +
      "?member=" +
      encodeURIComponent($("memberId")?.value || "DEMO");

    new QRCode(qr, {
      text: url,
      width: 120,
      height: 120
    });
  }
}

const form = $("memberForm");

if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    update();

    const card = document.querySelector("#card");
    if (card) {
      card.scrollIntoView({
        behavior: "smooth"
      });
    }
  });
}

const printButton = $("print");

if (printButton) {
  printButton.onclick = function () {
    update();
    window.print();
  };
}

const demoButton = $("demo");

if (demoButton) {
  demoButton.onclick = function () {

    $("name").value = "Jahanara Begum";
    $("father").value = "ইনাম উদ্দিন";
    $("memberId").value = "2026-02-00100";

    $("union").value = "কর্মধা ইউনিয়ন";
    $("village").value = "রঙ্গীরকুল";
    $("post").value = "রঙ্গীরকুল-৩২৩০";
    $("upazila").value = "কুলাউড়া";
    $("district").value = "মৌলভীবাজার";

    $("blood").value = "B+";
    $("mobile").value = "+880 1711341176";

    update();
  };
}

const photo = $("photo");

if (photo) {
  photo.addEventListener("change", function (e) {

    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = function () {

      const cardPhoto = $("cardPhoto");

      if (cardPhoto) {
        cardPhoto.src = reader.result;
      }
    };

    reader.readAsDataURL(file);
  });
}

update();
