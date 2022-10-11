const image_input = document.querySelector("#image_upload");
let a = document.getElementById("display_image");

let uploaded_image = "";
image_input.addEventListener("change", function () {
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    const uploaded_image = reader.result;
    document.querySelector("#display_image").src = `${uploaded_image}`;
    document.querySelector("#display_image").classList.add("display");
  });
  reader.readAsDataURL(this.files[0]);
});

document.querySelector("#display_image").addEventListener("click", open_EyeDropper);
document.querySelector(".btn").addEventListener("click", open_EyeDropper);


function open_EyeDropper() {
  if (document.querySelector("#display_image").classList.contains("display")) {
    const eyedropper = new EyeDropper();

    eyedropper.open().then((res) => {
      document.querySelector(".result").innerHTML = `Hex : ${res.sRGBHex}`;
      document.querySelector(".color-fill").style.background = `${res.sRGBHex}`;
      document.querySelectorAll(".color-fill")[1].style.background = `${res.sRGBHex}`;
      let ans = res.sRGBHex;
      let Rgb = ans.substring(1);
      hexToRgbNew(Rgb);
    });
  }
}
var copytext = document.querySelector(".result");
let copybtn = document.querySelectorAll(".fa-clone");

for (let i = 0; i < copybtn.length; i++) {
  copybtn[i].addEventListener("click", () => {
    copybtn[i].classList.add("fa-check");
    copybtn[i].classList.remove("fa-clone");
    let input = copytext.innerHTML;
    input = input.replace("Hex :", "");
    navigator.clipboard.writeText(input);

    setTimeout(() => {
      copybtn[i].classList.remove("fa-check");
      copybtn[i].classList.add("fa-clone");
    }, 500);
  });
}

function hexToRgbNew(hex) {
  var arrBuff = new ArrayBuffer(4);
  var vw = new DataView(arrBuff);
  vw.setUint32(0, parseInt(hex, 16), false);
  var arrByte = new Uint8Array(arrBuff);

  document.querySelector(
    ".getRgb"
  ).innerHTML = `rgb(${arrByte[1]}, ${arrByte[2]}, ${arrByte[3]})`;


  return arrByte[1] + "," + arrByte[2] + "," + arrByte[3];
}
