<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">
    <title>Unos mjera</title>
    <link href="vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">
    <link href="css/scrolling-nav.css" rel="stylesheet">
	<link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,400;0,500;0,700;1,400&display=swap" rel="stylesheet">
	<link href="/favicon.ico" rel="icon" type="image/x-icon" />
  </head>
  <body>
	<section>
		<?php include 'header.php'; ?>
	</section>
	<section>
	  <div class="container">
        
	    <form method="POST" action="calc.php">
	    <div class="row g-3">
          <div class="col-md-6">
            <label for="naziv" class="form-label">Naziv:</label>
            <input type="text" name="naziv" id="naziv" class="form-control bg-muted" placeholder="Naziv klijenta">
          </div>
          <div class="col-md-6">
            <label for="indeks" class="form-label">Jedinica mjere:</label>
            <select class="form-control" name="indeks">
              <option value="1000" selected>milimetar (mm)</option>
              <option value="100">centimetar (cm)</option>
              <option value="1">metar (m)</option>
            </select>
          </div>
          <div class="col-md-12">
            <label for="cijena_nabavna" class="form-label text-danger">Nabavna cijena:</label>
            <input type="number" step="any" name="cijena_nabavna" class="form-control" placeholder="€">
          </div>
          <div class="col-md-12">
            <label for="cijena_izlazna" class="form-label text-success">Naplatna cijena:</label>
            <input type="number" step="any" name="cijena_izlazna" class="form-control" placeholder="€">
          </div>
          <div id="dynamic_field"></div>
          <div class="mt-4">
            <button type="button" name="add" id="add" class="btn btn-success">Dodaj red</button>
            <input type="submit" name="izvrsi" value="Izračunaj" class="btn btn-primary">
          </div>
          </div>
        </form>
        
	  </div>
	</section>
    <!-- Bootstrap core JavaScript -->
    <script src="vendor/jquery/jquery.min.js"></script>
    <script src="vendor/bootstrap/js/bootstrap.bundle.min.js"></script>

    <!-- Plugin JavaScript -->
    <script src="vendor/jquery-easing/jquery.easing.min.js"></script>

    <!-- Custom JavaScript for this theme -->
    <script src="js/scrolling-nav.js"></script>
	 <script>  
	 $(document).ready(function(){  
		  var i=0;  
		  $('#add').click(function(){
		      $('#dynamic_field').append('<div class="m-2"><input type="hidden"name="id[]" readonly></div><div class="row g-2"><div class="col"><input type="number" step="any" name="x'+i+'" class="form-control" placeholder="0"></div><div class="col"><input type="number" step="any" name="y'+i+'" class="form-control" placeholder="0"></div><div class="col-auto"><input type="text" value="kol." size="4" class="form-control" disabled></div><div class="col"><input type="number" name="k'+i+'" class="form-control" value="1"></div></div>'); 
				i++;  
		  });   
	 });  
	</script>
  </body>
</html>
