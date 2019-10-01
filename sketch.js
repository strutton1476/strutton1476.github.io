var net = new Network(2, 2, 2, 1);
console.log(net.feedForward([1,1]));

var data =[
	{inputs:[0, 0],outputs:[0]},
	{inputs:[0, 1],outputs:[1]},
	{inputs:[1, 0],outputs:[1]},
	{inputs:[1, 1],outputs:[0]}
];

