function Neuron(){
	this.dendrites = [];
	this.axonValue = 0;
	
	this.process = function(){
		var val =0;
		
		for(var i=0; i<this.dendrites.length; i++){
			val+= this.dendrites[i].weight * this.dendrites[i].value.axonValue;
		}
		
		this.axonValue = Sigmoid(val);
	}
}

