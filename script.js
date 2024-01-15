
let itemNumber = 0;

function printHelper() {

  var popOut = window.open('', 'INSEM Lightbox Quote', 'width=1080px,height=2160');
  var doc = popOut.document;
  doc.open();
  doc.write("<link href=\"style.css\" rel=\"stylesheet\" type=\"text/css\" />");
  //addEventListener("load", () => { print(); popOut.onafterprint = function() { popOut.close(); } })


  popOut.onload = function() {
    popOut.print();
  }
  popOut.onafterprint = function() {
    popOut.close();
  }

  doc.write(document.getElementById("page").outerHTML);

  doc.title = "INSEM Label";

  doc.close();
}


function printHelp(quantity, nameText, boldText, normalText) {

  for (let k = 0; k < document.getElementById("startIndex").value; k++) {
    let skip = document.createElement("DIV");
    skip.setAttribute("id", "skipLine");

    let column = parseInt((itemNumber / 10) + 1);
    if (document.getElementById("orientation").value == "Left-Right") {
      column = (itemNumber % 3) + 1;
    }
    itemNumber++;
    let baseName = "Column";
    baseName += column;
    document.getElementById(baseName).appendChild(skip);
  }
  document.getElementById("startIndex").value = 0;
  for (let i = 0; i < quantity; i++) {
    if (itemNumber == 30) {

      let break1 = document.createElement("DIV");
      break1.setAttribute("id", "pagebreak");
      document.getElementById("Column1").appendChild(break1);
      let break2 = document.createElement("DIV");
      break2.setAttribute("id", "pagebreak");
      document.getElementById("Column2").appendChild(break2);
      let break3 = document.createElement("DIV");
      break3.setAttribute("id", "pagebreak");
      document.getElementById("Column3").appendChild(break3);

      itemNumber = 0;
    }

    let column = parseInt((itemNumber / 10) + 1);
    let baseName = "Column";
    if (document.getElementById("orientation").value == "Top-Down") {
      itemNumber++;
      baseName += column;
    }
    else {
      column = (itemNumber % 3) + 1;
      itemNumber++;
      baseName += column;

    }

    var boxed = document.createElement("DIV");
    boxed.setAttribute("id", "boxed");
    document.getElementById(baseName).appendChild(boxed);

    var blacked = document.createElement("DIV");
    blacked.setAttribute("id", "Blacked");  
    boxed.appendChild(blacked);

    var left = document.createElement("DIV");
    left.setAttribute("id", "Left");
    blacked.appendChild(left);

    var image = document.createElement("IMG");
    image.setAttribute("src", "https://i.ibb.co/tC4xvh1/Insem-Logo-removebg-preview.png");
    image.setAttribute("width", "90");
    image.setAttribute("height", "30");
    left.appendChild(image);

    var right = document.createElement("DIV");
    right.setAttribute("id", "Right");
    right.innerHTML = nameText;
    editText(right);
    blacked.appendChild(right);

    var line = document.createElement("BDI");
    line.setAttribute("id", "redLine");
    boxed.appendChild(line);

    var bold = document.createElement("DIV");
    bold.setAttribute("id", "CenteredBold");
    if (normalText == "") {
      bold.style.fontSize = "24px";
      console.log("Dog");
    }
    bold.innerHTML = boldText;
    editText(bold);
    boxed.appendChild(bold);

    var normal = document.createElement("DIV");
    normal.setAttribute("id", "CenteredNormal");
    normal.innerHTML = normalText;
    editText(normal);
    boxed.appendChild(normal);

  }


}

function onDocLoad() {
  
  document.getElementById("Column2").style.marginLeft = "0.3556cm";
  document.getElementById("Column3").style.marginLeft = "0.3556cm";
  
  document.getElementsByTagName('select')[0].onchange = function() {
    deleteTable();
  }
}

function deleteTable() {
  document.getElementById("Column1").innerHTML = "";

  document.getElementById("Column2").innerHTML = "";

  document.getElementById("Column3").innerHTML = "";

  itemNumber = 0;
}

function editText(text) {
  text.addEventListener("click", function() {
    if (text.className != "Clicked") {
      console.log(text.className);
      text.className = "Clicked";
      var textBox = document.createElement("INPUT");
      textBox.setAttribute("type", text);
      textBox.setAttribute("value", text.innerHTML);
      this.innerHTML = "";
      textBox.addEventListener("focusout", function() {
        text.innerHTML = this.value;
        text.className = "";
        if (this.value == "") {
          text.innerHTML = " ";
        }
        this.remove();
      });
      textBox.style.width = "3cm";
      textBox.style.textAlign = "center";
      textBox.addEventListener("keypress", function(e) {
        var keyCode = e.keyCode;

        if (keyCode == 13) {
          this.blur();
        }
      });
      this.appendChild(textBox);
      textBox.focus();
    }
  });
}

function addEstimate() {

  let obj = document.getElementById("quantityInput");
  let quantity = obj.value;
  obj = document.getElementById("labelInput");
  let name = obj.value;
  obj = document.getElementById("boldInput");
  let bold = obj.value;
  obj = document.getElementById("normalInput");
  let normal = obj.value;

  //Checking if the inputs exist
  let error = "";
  if (quantity < 1 || quantity % 1 != 0) {
    error += "Quantity must be at least 1, and a whole number"
  }

  if (error != "") {
    document.getElementById("errors").innerHTML = error;
    return;
  }

  printHelp(quantity, name, bold, normal);
}

