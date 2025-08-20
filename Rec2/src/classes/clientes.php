<?php

class Cliente 
{
    public $nome;
    public $idade;
    public $endereco;
    public $telefone;
    public $preferencias;
    public $alergias;

    public function comprar()
    {
        echo " O cliente {$this->nome} realizou uma compra";
    }
    
    public function quantidade()
    {
        echo " O cliente {$this->nome} selecionou uma quantidade do produto";
    }
    
    public function alergias()

    {
        echo " O cliente {$this->nome} possui alergias";
    }
    
    public function preferencia()
    {
        echo " O cliente {$this->nome} tem preferencia";
    }
    
    public function avaliacao()
    {
        echo " O cliente {$this->nome} deixou uma avaliacao";
    }
    
}