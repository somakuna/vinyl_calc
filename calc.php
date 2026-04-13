<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">
    <title>Kalkulacija</title>
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
	<section class="text-center">
        <div id="data" class="container">
			<?php
				if(isset($_POST['izvrsi']))
				{
					$number = count($_POST["id"]); 
					$naziv = $_POST['naziv'];
					$cijena_nabavna = $_POST['cijena_nabavna'];
					$cijena_izlazna = $_POST['cijena_izlazna'];
					$indeks = $_POST['indeks'];
					$totalm2 = 0;
					
					if(empty($cijena_nabavna) or empty($cijena_izlazna))
					{
						echo '<div class="bg-warning text-white">* Upozorenje: Nabavna ili izlazna cijena nije upisana!</div>';
					}
					
					echo '<div class="jumbotron">';
					echo ' <h3 class="display-4">' . $naziv . '</h3>';
					echo '<hr class="my-4">';
					echo '<p>Nabavna cijena po m2: <font color="#7D4E57">' . $cijena_nabavna . ' €</font></p>';
					echo '<p>Izlazna cijena po m2: <font color="#7D4E57">' . $cijena_izlazna . ' €</font>';
					
					if($number > 0)  
					{  
						for($i=0; $i<$number; $i++)  
						{  
							$xtemp = "x" . $i;
							$ytemp = "y" . $i;
							$ktemp = "k" . $i;
							$x = $_POST[$xtemp];
							$y = $_POST[$ytemp];
							$k = $_POST[$ktemp];
							$rowm2 = round((($x / $indeks) * ($y / $indeks)) * $k,	2); // m2 rowa
							$totalm2 += $rowm2; // dodavanje u totalni m2
							$rowprice = $rowm2 * $cijena_izlazna; // poj. cijena rowa
							echo "<p>" . $x . " x " . $y . "(x" . $k . ") = <font color='#D66853'>" . $rowm2 . " m2 </font>= <font color='#7D4E57'>" . $rowprice . " €</font></p>";
						}  
					}  
					else 
					{  
						echo '<br><p><div class="text-danger">** Nema vrijednosti! **</p></div>'; 
					}  
					$sum_nabavna = round($cijena_nabavna * $totalm2, 2);
					$sum_izlazna = round($cijena_izlazna * $totalm2, 2);
					$zarada = round($sum_izlazna - $sum_nabavna, 2);
					echo "<p>Ukupno m2: <font color='#1b3a4b'><strong>" . $totalm2 . " m2</strong></font></p>";
					echo '<hr class="my-2">';
					echo "<p>Ukupno nabavna: <font color='#7D4E57'>" . $sum_nabavna . " €</font></p>";
					echo "<p>Ukupno izlazna: <font color='#2176ff'>" . $sum_izlazna . " €</font></p>";
					echo '<hr class="my-2">';
					echo "<p>Zarada: <font color='#006466'>" . $zarada . " €</font></p>";
					echo '</div>';
				}
				
				if(isset($_POST['izvrsi_text_kalkulaciju']))
				{
					
					$naziv = $_POST['naziv'];
					$cijena_nabavna = $_POST['cijena_nabavna'];
					$cijena_izlazna = $_POST['cijena_izlazna'];
					$indeks = $_POST['indeks'];
					$tekst = $_POST['tekst'];
					
					preg_match_all('/(\d*)[x|X|*](\d*)/', $tekst, $filtered_array);
					$number = count($filtered_array[0]);
					$totalm2 = 0;
					
					if(empty($cijena_nabavna) or empty($cijena_izlazna))
					{
						echo '<div class="bg-warning text-white">* Upozorenje: Nabavna ili izlazna cijena nije upisana!</div>';
					}
					
					echo '<div class="jumbotron">';
					echo ' <h3 class="display-4">' . $naziv . '</h3>';
					echo '<hr class="my-4">';
					echo '<p>Nabavna cijena po m2: <font color="#7D4E57">' . $cijena_nabavna . ' €</font></p>';
					echo '<p>Izlazna cijena po m2: <font color="#7D4E57">' . $cijena_izlazna . ' €</font>';
					
					if($number > 0)  
					{  
						for($i=0; $i<$number; $i++)  
						{  
							$xtemp = "x" . $i;
							$ytemp = "y" . $i;
							$x = $filtered_array[1][$i];
							$y = $filtered_array[2][$i];
							$rowm2 = round((($x / $indeks) * ($y / $indeks)), 2); // m2 rowa
							$totalm2 += $rowm2; // dodavanje u totalni m2
							$rowprice = $rowm2 * $cijena_izlazna; // poj. cijena rowa
							echo "<p>" . $x . " x " . $y . " = <font color='#D66853'>" . $rowm2 . " m2 </font>= <font color='#7D4E57'>" . $rowprice . " €</font></p>";
						}  
					}  
					else 
					{  
						echo '<br><p><div class="text-danger">** Nema vrijednosti! **</p></div>'; 
					}  
					$sum_nabavna = round($cijena_nabavna * $totalm2, 2);
					$sum_izlazna = round($cijena_izlazna * $totalm2, 2);
					$zarada = round($sum_izlazna - $sum_nabavna, 2);
					echo "<p>Ukupno m2: <font color='#1b3a4b'><strong>" . $totalm2 . " m2</strong></font></p>";
					echo '<hr class="my-2">';
					echo "<p>Ukupno nabavna: <font color='#7D4E57'>" . $sum_nabavna . " €</font></p>";
					echo "<p>Ukupno izlazna: <font color='#2176ff'>" . $sum_izlazna . " €</font></p>";
					echo '<hr class="my-2">';
					echo "<p>Zarada: <font color='#006466'>" . $zarada . " €</font></p>";
					echo '</div>';
				}
				
				if(isset($_POST['izvrsi2']))
				{
					$sp = $_POST['sirina_povrsine'];
					$ss = $_POST['sirina_segmenta'];
					if($sp <= $ss)  
						echo '<br><div class="text-danger">** Širina segmenta je ista ili veća od površine! **</div>'; 
					$middle = ($sp-$ss)/ 2; // izračun sredine
					$ss_perc = $ss / $sp * 100; // sirina segmenta u postotku npr. 30.00%
					$middle_perc = (100 - $ss_perc) / 2; // sredina u postotku dakle ostatak od 100% - 30.00% = 70% / 2 = 35%
					$text_perc = $middle_perc / 2 - 2;
					$middle_end_point =  $ss_perc + $middle_perc;
    				echo '
                       		<svg width="100%" height="100%" viewBox="0 0 100 15">
                       		    
                       		    <text x="46" y="3.5" style="font: italic 2px sans-serif;" > '. $sp .'</text>
                       		    <line x1="0" y1="4" x2="100" y2="4" stroke="orange" stroke-width="0.2" stroke-dasharray="1,2"/>
                       		    
                                <rect x="0" y="5" style="fill:orange;" width="100" height="5"/>
                                <rect x="' .$middle_perc. '" y="5" style="fill: dodgerblue;" width="'. $ss_perc .'" height="5"/>
                                
                                <text x="'.$text_perc.'" y="7" style="font: italic 2px sans-serif;" > '. $middle .'</text>
                                <line x1="0" y1="7.5" x2="' .$middle_perc. '" y2="7.5" stroke="black" stroke-width="0.2" stroke-dasharray="1,2"/>
                                
                                <line x1="' .$middle_perc. '" y1="11" x2="'. $middle_end_point .'" y2="11" stroke="dodgerblue" stroke-width="0.2" stroke-dasharray="1,2"/>
                                <text x="46" y="13" style="font: italic 2px sans-serif;" > '. $ss .'</text>
                                
                            </svg>
                    ';
					
				}
                if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['duznimetar'])) {
                    function calculate_vinyl_usage($vinyl_width, $walls, $cut_orientation) {
                        if ($vinyl_width <= 0) {
                            throw new Exception("Širina role mora biti veća od 0!");
                        }
                
                        $total_vinyl_usage = 0;
                
                        foreach ($walls as $wall) {
                            list($wall_width, $wall_height, $quantity) = $wall;
                
                            if ($wall_width <= 0 || $wall_height <= 0) {
                                throw new Exception("Greska: {$wall_width}x{$wall_height}. mora biti više od 0!");
                            }
                
                            if ($cut_orientation == "vertical") {
                                $strips_needed = ceil($wall_width / $vinyl_width);
                                $vinyl_usage = $strips_needed * $wall_height;
                            } else {
                                $strips_needed = ceil($wall_height / $vinyl_width);
                                $vinyl_usage = $strips_needed * $wall_width;
                            }
                
                            $total_vinyl_usage += $vinyl_usage * $quantity;
                        }
                
                        return $total_vinyl_usage;
                    }
                
                    try {
                        $vinyl_width = isset($_POST["roll_width"]) ? (float) $_POST["roll_width"] : 0;
                        $cut_orientation = isset($_POST["cut_orientation"]) ? strtolower(trim($_POST["cut_orientation"])) : "vertical";
                        $text_input = isset($_POST["tekst"]) ? trim($_POST["tekst"]) : "";
                        $cijena_nabavna = isset($_POST["cijena_nabavna"]) ? (float) $_POST["cijena_nabavna"] : 0;
                        $cijena_izlazna = isset($_POST["cijena_izlazna"]) ? (float) $_POST["cijena_izlazna"] : 0;
                        $indeks = $_POST['indeks'];
                        $naziv = $_POST['naziv'];
                
                        if (!in_array($cut_orientation, ["vertical", "horizontal"])) {
                            throw new Exception("Orijentacija 'vertical' ili 'horizontal'!");
                        }
                
                        preg_match_all('/(\d+)\s*[xX*]\s*(\d+)(?:[@#?](\d+))?/', $text_input, $matches, PREG_SET_ORDER);
                        
                        if (empty($matches)) {
                            throw new Exception("Greska formata! Koristi 'Dužina x Širina' ili 'Dužina x Širina@Količina'.");
                        }
                
                        $walls = [];
                        foreach ($matches as $match) {
                            $wall_width = (int) $match[1];
                            $wall_height = (int) $match[2];
                            $quantity = isset($match[3]) ? (int) $match[3] : 1;
                            $walls[] = [$wall_width, $wall_height, $quantity];
                        }
                
                        $total_vinyl_usage_sum = calculate_vinyl_usage($vinyl_width, $walls, $cut_orientation);
                        $total_vinyl_usage_m = $total_vinyl_usage_sum / $indeks; // Convert to meters
                        echo '<h2>'. $naziv .'<h2>';
                		echo '<hr class="my-2">';
                		echo "<h3>" . number_format($total_vinyl_usage_m, 2) . " m role</h3>";
                        echo "Broj tileova: " . $strips_needed . "<br>";
                        echo "Orijetnacija: " . $cut_orientation . "<br>";
                        echo "<small>" . $text_input . "</small><br>";
                        echo "Nabavna cijena: " . number_format($total_vinyl_usage_m, 2) * $cijena_nabavna . " €<br>";
                        echo "Izlazna cijena: " . number_format($total_vinyl_usage_m, 2) * $cijena_izlazna . " €<br>";
                        echo "<p>Zarada: " . (number_format($total_vinyl_usage_m, 2) * $cijena_izlazna) -  (number_format($total_vinyl_usage_m, 2) * $cijena_nabavna). " €</p>";
                
                    } catch (Exception $e) {
                        echo "<p>Error: " . $e->getMessage() . "</p>";
                    }
                }

			?>
		</div>
		</br>
		<a href="#" class="btn border-primary" onclick="copyDivToClipboard()">Copy</a>
		<script>
			function copyDivToClipboard() {
				var range = document.createRange();
				range.selectNode(document.getElementById("data"));
				window.getSelection().removeAllRanges(); // clear current selection
				window.getSelection().addRange(range); // to select text
				document.execCommand("copy");
				window.getSelection().removeAllRanges();// to deselect
				alert("Copied to clipboard!");
			}
		</script>
						
    </section>
    <!-- Bootstrap core JavaScript -->
    <script src="vendor/jquery/jquery.min.js"></script>
    <script src="vendor/bootstrap/js/bootstrap.bundle.min.js"></script>

    <!-- Plugin JavaScript -->
    <script src="vendor/jquery-easing/jquery.easing.min.js"></script>

    <!-- Custom JavaScript for this theme -->
    <script src="js/scrolling-nav.js"></script>
  </body>
</html>
