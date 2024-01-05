<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="currentparticipantform.css" rel="stylesheet" type="text/css" />
  <link href="home.css" rel="stylesheet" type="text/css" />
  <title>Submissions</title>
  <script type="module" src="garments.js"></script>
  <script type="module">
    import { passCheck } from './garments.js';
    window.passCheck = passCheck;
  </script>
</head>
  
<body onload="passCheck()">

  <script type="module" src="sketchform.js">  </script>
  <script type="module" src="25form.js">  </script>
  <script type="module" src="50form.js">  </script>
  <script type="module" src="75form.js">  </script>
  <script type="module" src="finalForm.js">  </script>
  <script type="module" src="catwalkForm.js">  </script>
  <script type="module" src="currentparticipantform.js">  </script>


<!-- creates navbar -->
  <nav>
      <div class="navbar">
        <div class="logo">St. Anne's-Belfield School</div>
          <ul class="menu">
            <li><a href="index.html">Home</a></li>
            <li><a href="garments.html">All Garments</a></li>
            <li class="navbar_specific"><a href="participant.html">Submissions</a></li>
          </ul>
        </div>
  </nav>
  
  <!-- This creates a form with different inputs -->

  
<form id = "sketchForm">
  <h1>Submit Sketch Photo</h1>
  <!-- Creates a text input for first name -->
        <p>
            <label for="fname">First Name:</label><br>
            <input class="form" type="text" id="firstNameS" required name="firstNameS"> 
        </p>
  <!-- Creates a text input for last name -->
        <p>
            <label for="fname">Last Name:</label><br>
            <input class="form" type="text" id="lastNameS" required name="lastNameS">
        </p>
  <!-- Creates a text input for email -->
  <p>
      <label for="fname">Email:</label><br>
      <input class="form" type="text" id="emailS" required name="emailS">
  </p>
  <!-- Creates an image input for their sketch -->
<p>Sketch:
  <br>
    <input type="file" class = "photo" accept="image/*" name="image" id="sketch"  style="display: none;">
  <label id = "UploadImage" for="sketch" >Upload Image</label>
  <br>
  <br>
  <img id="sketchimg" alt="your image" width ="200" />
</p>
<br>
  <button id = "submitSketch" type = "submit">SUBMIT SKETCH</button>
</form>
    <!-- Creates an image input for their 25% complete garment -->


<form id = "25form">
  <h1>Submit 25% Deadline Photo</h1>
  <!-- Creates a text input for first name -->
        <p>
            <label for="fname">First Name:</label><br>
            <input class="form" type="text" id="firstName25" required name="firstName25"> 
        </p>
  <!-- Creates a text input for last name -->
        <p>
            <label for="fname">Last Name:</label><br>
            <input class="form" type="text" id="lastName25" required name="lastName25">
        </p>
  <!-- Creates a text input for email -->
  <p>
      <label for="fname">Email:</label><br>
      <input class="form" type="text" id="email25" required name="email25">
  </p>
  <p>25% Picture:
    <br>
    <input type="file" class = "photo" accept="image/*" name="image" id="photo25"   style="display: none;">
  <label id = "UploadImage" for="photo25" >Upload Image</label>
  <br>
  <br>
  <img id="img25" alt="your image" width ="200" />
</p>
<br>
  <button id = "submit25" type = "submit">SUBMIT FORM</button>
</form>
    <!-- Creates an image input for their 50% complete garment -->


<form id = "50form">
  <h1>Submit 50% Deadline Photo</h1>

  <!-- Creates a text input for first name -->
        <p>
            <label for="fname">First Name:</label><br>
            <input class="form" type="text" id="firstName50" required name="firstName50"> 
        </p>
  <!-- Creates a text input for last name -->
        <p>
            <label for="fname">Last Name:</label><br>
            <input class="form" type="text" id="lastName50" required name="lastName50">
        </p>
  <!-- Creates a text input for email -->
  <p>
      <label for="fname">Email:</label><br>
      <input class="form" type="text" id="email50" required name="email50">
  </p>
  <p>50% Picture:
    <input type="file" class = "photo" accept="image/*" name="image" id="photo50"   style="display: none;">
  <br>
  <label id = "UploadImage" for="photo50" >Upload Image</label>
</p>
<br>
<button id = "submit50" type = "submit">SUBMIT FORM</button>
</form>
    <!-- Creates an image input for their 75% complete garment -->


<form id = "75form">
  <h1>Submit 75% Deadline Photo</h1>

  <!-- Creates a text input for first name -->
        <p>
            <label for="fname">First Name:</label><br>
            <input class="form" type="text" id="firstName75" required name="firstName75"> 
        </p>
  <!-- Creates a text input for last name -->
        <p>
            <label for="fname">Last Name:</label><br>
            <input class="form" type="text" id="lastName75" required name="lastName75">
        </p>
  <!-- Creates a text input for email -->
  <p>
      <label for="fname">Email:</label><br>
      <input class="form" type="text" id="email75" required name="email75">
  </p>

  <p>75% Picture:
    <input type="file" class = "photo" accept="image/*" name="image" id="photo75"   style="display: none;">
  <br>
  <label id = "UploadImage" for="photo75" >Upload Image</label>
</p>
<br>
<button id = "submit75" type = "submit">SUBMIT FORM</button>
</form>
    <!-- Creates an image input for their final garment -->


<form id = "finalForm">
  <h1>Submit Final Runway Photo</h1>

  <!-- Creates a text input for first name -->
        <p>
            <label for="fname">First Name:</label><br>
            <input class="form" type="text" id="firstNameF" required name="firstNameF"> 
        </p>
  <!-- Creates a text input for last name -->
        <p>
            <label for="fname">Last Name:</label><br>
            <input class="form" type="text" id="lastNameF" required name="lastNameF">
        </p>
  <p>
      <label for="fname">Email:</label><br>
      <input class="form" type="text" id="emailF" required name="emailF">
  </p>

  <p>Final Picture:
    <input type="file" class = "photo" accept="image/*" name="image" id="finalPhoto"   style="display: none;">
  <br>
  <label id = "UploadImage" for="finalPhoto" >Upload Image</label>
</p>
<br>
  <button id = "submitFinal" type = "submit">SUBMIT FORM</button>
</form>
    <!-- Creates a text input for their catwalk song -->


  <form id = "catwalkForm">
  <h1>Submit Catwalk Song</h1>

  <!-- Creates a text input for first name -->
        <p>
            <label for="fname">First Name:</label><br>
            <input class="form" type="text" id="firstNameC" required name="firstNameC"> 
        </p>
  <!-- Creates a text input for last name -->
        <p>
            <label for="fname">Last Name:</label><br>
            <input class="form" type="text" id="lastNameC" required name="lastNameC">
        </p>
    <p>
        <label for="fname">Email:</label><br>
        <input class="form" type="text" id="emailC" required name="emailC">
    </p>

  <p>
    <label for="fname">Catwalk Song:</label><br>
    <input class="form" type="text" id="catwalk" required name="lastName">
        </p>

  <!-- Creates a submit button -->
  <br>
  <button id = "submitCatwalk" type = "submit">SUBMIT FORM</button>

</form>

  <!-- </div> -->

  <br>

                                                    
</body>
</html>
