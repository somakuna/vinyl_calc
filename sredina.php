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
    		<form action="calc.php" method="post" name="kalkulacija2" id="kalkulacija2">
    		    <div class="row g-3">
                    <div class="col-md-12 mb-2">
                        <label for="naziv" class="form-label">Širina površine:</label>
                        <input type="number" step="any" name="sirina_povrsine" id="sirina_povrsine" class="form-control bg-muted" placeholder="...">
                    </div>
                    <div class="col-md-12 mb-2">
                        <label for="naziv" class="form-label">Širina segmenta:</label>
                        <input type="number" step="any" name="sirina_segmenta" id="sirina_segmenta" class="form-control bg-muted" placeholder="...">
                    </div>
                    <div class="col-md-12 mb-2">
                        <input type="submit" name="izvrsi2" value="Izračunaj" class="btn btn-primary">
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

  </body>
</html>
