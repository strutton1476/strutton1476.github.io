function GA(){
	this.population = [];
	
	this.TrainingData;
	
	this.Main = function(TrainingData, Expected){
		this.TrainingData = TrainingData;
		
		var max =1000;
		for(var i=0; i<max; i++){
			var ws = [];
			for(var t=0; t<10; t++){
				ws.push(Math.random(-1, 1));
			}
			
			var net = new Network(2, 2, 2, 1, ws);
			this.calculateFitness(net);
		}
		for(var i=0; i<1000; i++){
			this.breed();
		}
		for(var i=0; i<this.population.length; i++){
			console.log(this.population[i]);
		}
	}
	
	this.calculateFitness = function(net){
		var average = 0;
		for(var i=0; i<this.TrainingData.length; i++){
			var error = Math.pow(this.TrainingData[i].outputs - net.feedForward(this.TrainingData[i].inputs), 2);//Bookmark: Fix later, Make compatible with multiple outputs.
			average += error;
		}
		average /= this.TrainingData.length;
		
		var obj = {averageError: average, Network: net};
		
		this.population.push(obj);	
		
		//come up with better way of calculating fitness!!!
		// Lower the Error, Higher the fitness!!!
		
		if(this.best ==undefined || average < this.best){
			this.best = average;
			//this.population.push(obj);
		}
		
		
		
		return obj;
	}

	this.breed = function(){
		var Net1 = this.population[Math.round(Math.random(this.population.length))].Network;
		var Net2 = this.population[Math.round(Math.random(this.population.length))].Network;
		//console.log(this.population.length);
		var weights = [];
		for(var i=0; i<Net1.weights.length; i++){
			var ran = Math.round(Math.random(1));
			if(ran==0){
				weights.push(Net1.weights[i]);
			}
			else{
				weights.push(Net2.weights[i]);
			}
			
			ran = Math.round(Math.random(1));
			if(ran == 0 || ran == 1){//2% mutation rate
				weights.push(Math.random(1));
			}
		}
		var net = new Network(2, 2, 2, 1, weights);
		this.calculateFitness(net);
	}
}
