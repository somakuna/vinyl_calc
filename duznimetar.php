<!DOCTYPE html>
<html lang="en">

  <head>

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>Unos mjera</title>

    <!-- Bootstrap core CSS -->
    <link href="vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">
	

    <!-- Custom styles for this template -->
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
          <div class="col-md-9">
            <label for="naziv" class="form-label">Naziv:</label>
            <input type="text" name="naziv" id="naziv" class="form-control bg-muted" placeholder="Naziv klijenta">
          </div>
          <div class="col-md-3">
            <label for="indeks" class="form-label">Jedinica mjere:</label>
            <select class="form-control bg-light" name="indeks">
              <option value="1000">mm</option>
              <option value="100" selected>cm</option>
              <option value="1">m</option>
            </select>
          </div>
          <div class="col-md-3">
            <label for="cijena_nabavna" class="form-label text-danger">Nabavna cijena:</label>
            <input type="number" step="any" name="cijena_nabavna" class="form-control" placeholder="€">
          </div>
          <div class="col-md-3">
            <label for="cijena_izlazna" class="form-label text-success">Naplatna cijena:</label>
            <input type="number" step="any" name="cijena_izlazna" class="form-control" placeholder="€">
          </div>
          <div class="col-md-3">
            <label for="roll_width" class="form-label">Širina role:</label>
            <input type="number" step="any" name="roll_width" class="form-control" placeholder="Unesite širinu role">
          </div>
          <div class="col-md-3">
            <label for="cut_orientation" class="form-label">Orijentacija rezanja/lomljenja:</label>
            <select class="form-control" name="cut_orientation">
              <option value="vertical" selected>Vertikalno</option>
              <option value="horizontal">Horizontalno</option>
            </select>
          </div>
          <div class="col-md-12">
                <label for="tekst" class="form-label">Dimenzije:</label>
				<textarea name="tekst" id="tekst" class="form-control" rows="7" placeholder="Tekst mora sadržavati 2 broja te između njih znak x ili X ili * (npr. 500x200) ako ima više istih elemenata onda se može dodati znak @ ili # ili ? te nakon toga količina (npr. 500x200@5). Svaki novi elemnt ide u novi red!"></textarea>
		  </div>
          <div id="dynamic_field"></div>
          <div class="mt-4">
            <input type="submit" name="duznimetar" value="Izračunaj" class="btn btn-primary">
          </div>
           </div>
        </form>
	  </div>
    </section>
    <!-- Bootstrap core JavaScript -->
    <script src="vendor/jquery/jquery.min.js"></script>
    <script src="vendor/bootstrap/js/bootstrap.bundle.min.js"></script>

    <!-- Custom JavaScript for this theme -->
    <script src="js/scrolling-nav.js"></script>
  </body>
</html>
