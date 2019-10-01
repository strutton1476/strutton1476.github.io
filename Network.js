function Network(Input, HiddenX, HiddenY, Output, weights){
	var neurons = [];
	var count =0;
	var weightsCount = 0;
	this.weights;
	this.weights = weights;
	
	this.Inputs = [];
	this.Weights_ih = [];
	this.Hiddens = [];
	this.Weights_hh = [];
	this.Weights_ho = [];
	this.Outputs = [];
	
	for(var i=0; i<Input; i++){
		var neuron = new Neuron();
		neurons.push(neuron);
		this.Inputs.push(neuron);
	}
	
	for(var x=0; x<HiddenX; x++){
		for(var y=0; y<HiddenY; y++){
			var neuron = new Neuron();
			
			if(x==0){
				for(var i=0; i<Input; i++){
					var w =0;
					if(weights){
						w = weights[weightsCount];
						w++;
					}
					else{
						w = Math.random();
					}
					neuron.dendrites.push({weight: w, value: neurons[count]});
					this.Weights_ih.push(w);
					count++;
				}
				count =0;	
			}
			else{
				count = Input + (HiddenY*(x-1));
				for(var i=0; i<HiddenY; i++){
					var w =0;
					if(weights){
						w = weights[weightsCount];
						w++;
					}
					else{
						w = Math.random();
					}
					neuron.dendrites.push({weight: w, value: neurons[count]});
					this.Weights_hh.push(w);
					count++;
				}
			}
			neurons.push(neuron);
			this.Hiddens.push(neuron);
		}
	}
	
	
	for(var i=0; i<Output; i++){
		var neuron = new Neuron();
		count = Input + (HiddenY*(HiddenX-1));
		
		for(var y=0; y<HiddenY; y++){
			var w =0;
			if(weights){
				w = weights[weightsCount];
				w++;
			}
			else{
				w = Math.random();
			}
			neuron.dendrites.push({weight: w, value: neurons[count]});
			this.Outputs.push(w);
			count++;
		}
		
		neurons.push(neuron);
		this.Outputs.push(neuron);
	}
	
	this.feedForward = function(inputs){
		var outputs = [];
		
		if(inputs.length != Input){
			console.log("Number of inputs must match!!!");
			return 0;
		}
		
		for(var i=0; i<Input; i++){
			neurons[i].axonValue = inputs[i];
		}
		
		for(var i=0; i<neurons.length - Input; i++){
			neurons[i+Input].process();
		}
		
		for(var i=0;i<Output; i++){
			outputs.push(neurons[i+neurons.length-Output].axonValue);
		}
		
		return(outputs);
	}
	
	this.train = function(inputs, expected){
		var learning_rate = 0.1;
		var outputs = feedforward(inputs);
		
		var output_errors = [];
		var output_gradients = [];
		var deltaWeights_ho = [];
		
		for(var i=0; i<expected.length; i++){//train hidden to output
			output_errors.push(expected[i] - outputs[i]);
			
			output_gradients.push(dSigmoid(outputs[i]));
			output_gradients[i] *= output_errors;
			output_gradients[i] *= learning_rate;
			
			for(var v=0; v<this.Hiddens.length; v++){
				deltaWeights_ho.push(gradients[i]*this.Hiddens[v]);
			}
		}
		for(var i=0; i<this.Weights_ho; i++){
			this.weights_ho[i] += deltaWeights_ho[i];
		}
		
		var hidden_errors = [];
		var hidden_gradients = [];
		var deltaWeights_ih = [];
		
		for(var i=0; i<this.Hiddens; i++){
			
		}
		
	}
}

function Sigmoid(t) {
    return 1/(1+Math.pow(Math.E, -t));
}

function dSigmoid(t) {
    return sigmoid(t)*(1-sigmoid(t));
}