<?php

require_once "src/Classes/Clientes.php";

$cli = new Cliente;
$cli -> nome = "Esthella";
$cli -> idade = 16;
$cli -> endereco = "Rua A";
$cli -> telefone = "41-xxxx-xxxx";


$cli -> comprar();
echo "<br>";

$cli -> quantidade();
echo "<br>";

$cli -> alergias();
echo "<br>";

$cli -> preferencia();
echo "<br>";

$cli -> avaliacao();
echo "<br>";
