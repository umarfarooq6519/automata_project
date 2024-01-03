var canvas = document.getElementById("myCanvas");

const binaryForm = document.getElementById('binaryForm');
const binaryInput = document.getElementById('binaryInput');
const submitButton = document.getElementById('submitButton');  



var ctx = canvas.getContext("2d");
  var currentCircle = null;

  var circles = []; // Array to hold multiple circles
  var isDragging = false;
  var selectedCircle = null;
  var selectedCircles = []; // Array to hold selected circles for drawing an arc
  var offsetX, offsetY;

  function drawCircle(circle, index) {
    ctx.beginPath();
    ctx.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI);
    ctx.fillStyle = circle.color;
    ctx.fill();
    ctx.closePath();

    // Display circle number as text
    ctx.font = '12px Arial';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.fillText(index, circle.x, circle.y + 15); // Offset text slightly for better visibility
    
    circle.number = index; 
  }

  function addCircle() {
    
    var newCircle = {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: 50,
      number: 0,
      color: 'blue',
      input0: newCircle,
      input1: newCircle
    };

    circles.push(newCircle);
    drawCircle(newCircle, circles.length - 1); // Pass the index of the newly added circle
  }

  function selectCircles() {
    if (selectedCircles.length < 2) {
      alert("Please select 2 circles.");
      return;
    }

    drawArcBetweenCircles(selectedCircles[0], selectedCircles[1]);
    selectedCircles = []; // Clear selected circles
  }

  function drawArcBetweenCircles(circle1, circle2, cond ) {
    if( cond === 0 ){
      var angle = Math.atan2(circle2.y - circle1.y, circle2.x - circle1.x);
    
      ctx.beginPath();
      ctx.moveTo(circle1.x + circle1.radius * Math.cos(angle), circle1.y + circle1.radius * Math.sin(angle));
      ctx.lineTo(circle2.x - circle2.radius * Math.cos(angle), circle2.y - circle2.radius * Math.sin(angle));
      ctx.strokeStyle = 'green';
      ctx.lineWidth = 3;
      ctx.stroke();
      ctx.closePath();
  
      // Draw arrowhead
      var arrowSize = 10;
      ctx.save();
      ctx.beginPath();
      ctx.translate(circle2.x - (circle2.radius + 5) * Math.cos(angle), circle2.y - (circle2.radius + 5) * Math.sin(angle));
      ctx.rotate(angle);
      ctx.moveTo(-arrowSize, arrowSize);
      ctx.lineTo(0, 0);
      ctx.lineTo(-arrowSize, -arrowSize);
      ctx.stroke();
      ctx.restore();
    }
    else
      {
      var angle = Math.atan2(circle2.y - circle1.y, circle2.x - circle1.x);
    
    ctx.beginPath();
    ctx.moveTo(circle1.x + circle1.radius * Math.cos(angle), circle1.y + circle1.radius * Math.sin(angle));
    ctx.lineTo(circle2.x - circle2.radius * Math.cos(angle), circle2.y - circle2.radius * Math.sin(angle));
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.closePath();

    // Draw arrowhead
    var arrowSize = 10;
    ctx.save();
    ctx.beginPath();
    ctx.translate(circle2.x - (circle2.radius + 5) * Math.cos(angle), circle2.y - (circle2.radius + 5) * Math.sin(angle));
    ctx.rotate(angle);
    ctx.moveTo(-arrowSize, arrowSize);
    ctx.lineTo(0, 0);
    ctx.lineTo(-arrowSize, -arrowSize);
    ctx.stroke();
    ctx.restore();
    }
    
    
  }

  
  
  function readNumbersInCircles() {
    const numbers = circles.map(circle => circle.number);
    console.log("Numbers in circles:", numbers);
  }

  function selectAndOpenPopup() {
    if (selectedCircles.length < 1) {
      alert("Please select a circle.");
    }


    currentCircle = selectedCircles[0];    
    
    // Show the popup form
    document.getElementById("popupForm").style.display = "block";
    selectedCircles = []; // Clear selected circles
  }

  function updateInputsAndClosePopup() {
    
    var inputAIndex = parseInt(document.getElementById("inputFieldA").value);
    var inputBIndex = parseInt(document.getElementById("inputFieldB").value);
    

    currentCircle.input0 = circles[inputAIndex];
    currentCircle.input1 = circles[inputBIndex];
    

    drawArcBetweenCircles(currentCircle,circles[inputAIndex],0);
    drawArcBetweenCircles(currentCircle,circles[inputBIndex],1);
    
    console.log("update");
    
    for(let a in circles){
      console.log(circles[a]);
    }
    document.getElementById("popupForm").style.display = "none";
    
  }


  function handleMouseDown(e) {
    var mouseX = e.clientX - canvas.getBoundingClientRect().left;
    var mouseY = e.clientY - canvas.getBoundingClientRect().top;

    // Check if any existing circle is clicked
    for (var i = circles.length - 1; i >= 0; i--) {
      var circle = circles[i];
      if (Math.pow(mouseX - circle.x, 2) + Math.pow(mouseY - circle.y, 2) < Math.pow(circle.radius, 2)) {
        isDragging = true;
        offsetX = mouseX - circle.x;
        offsetY = mouseY - circle.y;
        selectedCircle = circle;
        selectedCircles.push(circle); // Add selected circle to the array
        if (selectedCircles.length > 2) {
          selectedCircles.shift(); // Keep only the last 2 selected circles
        }
        break;
      }
    }
  }

  function handleMouseUp() {
    isDragging = false;
    selectedCircle = null;
  }

  function handleMouseMove(e) {
    if (isDragging && selectedCircle) {
      selectedCircle.x = e.clientX - canvas.getBoundingClientRect().left - offsetX;
      selectedCircle.y = e.clientY - canvas.getBoundingClientRect().top - offsetY;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      circles.forEach(drawCircle);
    }
  }




  submitButton.addEventListener('click', function() {
    const inputText = binaryInput.value;
    const isValid = /^[01]*$/.test(inputText);
  
    if (!isValid) {
      alert('Please enter only 0s and 1s');
    } else {
      // Perform any actions you want when the input is valid
      console.log('Binary input is valid:', inputText);
      
      transection(inputText);
      
    }
  });

  function transection(inputText){
    var a=0;
    for (let i = 0 ; i < inputText.length ; i++) {
      if( inputText[i] == 0 ){
        circles[a].input0.color = 'red';
        console.log(circles[a].input0);
        a++;
      }else{
        circles[a].input1.color = 'red';
        console.log(circles[a].input1);
        a++;
      }
      if (a >= circles.length) {
        break;
      }
    }
    console.clear();
    for(let a in circles){
      console.log(circles[a]);
    }
  }

/*   function handleNumber() {
    const inputElement = document.getElementById('numberInput');
    const number = parseInt(inputElement.value);
  
    for(let a in circles){
      console.log(circles[a]);
    }

    
    if (number >= 0 && number < circles.length) {
      // Swapping elements
      var circlea = {
        x: null,
        y: null,
        radius: 50,
        color: 'blue',
        input0: circlea,
        input1: circlea
      };
      
      circlea.x = circles[number].x;
      circlea.y = circles[number].y;
      circlea.input0 = circles[number].input0;
      circlea.input1 = circles[number].input1;

      circles[number].x = circles[0].x;
      circles[number].y = circles[0].y;
      circles[number].input0 = circles[0].input0;
      circles[number].input1 = circles[0].input1;

      
      circles[0].x = circlea.x;
      circles[0].y = circlea.y;
      circles[0].input0 = circlea.input0;
      circles[0].input1 = circlea.input1;
     
    }
    for(let a in circles){
      console.log(circles[a]);
    }
  }
  */


  canvas.addEventListener('mousedown', handleMouseDown);
  canvas.addEventListener('mouseup', handleMouseUp);
  canvas.addEventListener('mousemove', handleMouseMove);