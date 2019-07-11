import Vue from 'vue'
import { Bar } from 'vue-chartjs'

/*
Vue.component('my-line', {
  extends: Bar,
  created() {
  	this.$axios.get('/track').then(res => {
  		this.label = res.data.map((item) => {
  			return item.day;
  		});

  		this.rows = res.data.map((item) => {
  			return item.data;
  		});

  		this.setGraph();
  	})
  },
  data() {
  	return {
  		labels: {},
  		rows: {},
  	}
  },
  methods: {
  	setGraph() {
	    this.renderChart({
	    	//labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
	    	labels: this.labels,
	    	datasets: [
	    		{ 
	    			data: this.rows,
	    			backgroundColor: [
	                	'#0059DE',
	                	'#0059DE',
	                	'#0059DE',
	                	'#0059DE',
	                	'#0059DE',
	                	'#0059DE',
	                	'#0059DE',
	            	],
	    		},
	    	]
	    }, {
	    	backgroundColor: '#cf000f', 
	    	legend: { display: false, }, 
	    	responsive: true, 
	    	maintainAspectRatio: false,

	    	// yAxes change format
	    	scales: {
	    		yAxes: [
	    			{
	    				ticks: {
	    					callback: function(label, index, labels) {
                	if (label < 3600) {
                  	let remainder = label % 3600;
                  	return (remainder / 60).toFixed(0)+"m";
                	}

                	if (label > 3600) {
                		let hours = (label / 3600).toFixed(0);
                		let remainder = label % 3600;
                		let minutes = (remainder / 60).toFixed(0);
                		return `${hours}h ${minutes}m`;
                	}
                }
	    				}
	    			}
	    		],
	    	},

	    	// Tooltips
	    	tooltips: {
		      callbacks: {
		        label: function(tooltipItem, data) {
		        	let totalTime = tooltipItem.value;
		        	let hours = (totalTime / 3600).toFixed(0);
		        	let remainder = totalTime % 3600;
		        	let minutes = (remainder / 60).toFixed(0);
		        	let seconds = (remainder % 60).toFixed(0);

		        	return `${hours > 9 ? hours : "0"+hours}:${minutes > 9 ? minutes : "0"+minutes}:${seconds > 9 ? seconds : "0"+seconds}`;
		        }
		      }
		    }
	    });
  	}
  },
});
*/

Vue.component('my-line', {
  extends: Bar,
  data() {
  	return {
  		labels: {},
  		rows: {},
  	}
  },
  mounted() {
  	this.$axios.get('/track/chart-data').then(res => {
  		this.labels = res.data.map((item) => {
  			return item.day;
  		});

  		this.labels[7] = this.labels[0];
  		this.labels.splice(0, 1);

  		this.rows = res.data.map((item) => {
  			return item.total;
  		});

  		this.rows[7] = this.rows[0];
  		this.rows.splice(0, 1);

  		this.renderChart({
  			labels: this.labels,
  			datasets: [
  				{ backgroundColor: '#0059DE', data: this.rows }
  			],
  		}, {
  			legend: { display: false, }, 
				responsive: true, 
				maintainAspectRatio: false,

				// yAxes change format
				scales: {
					yAxes: [
						{
							ticks: {
								callback: function(label, index, labels) {
			          	if (label < 3600) {
			            	let remainder = label % 3600;
			            	if (remainder) {
			            		return (remainder / 60).toFixed(0)+"m " + (remainder / 60).toFixed(2) + "s";
			            	} else {
			            		return (remainder / 60).toFixed(0)+"m";
			          		}
			          	}

			          	if (label > 3600) {
			          		let hours = (label / 3600).toFixed(0);
			          		let remainder = label % 3600;
			          		let minutes = (remainder / 60).toFixed(0);
			          		return `${hours}h ${minutes}m`;
			          	}
			          }
							}
						}
					],
				},

				tooltips: {
				  callbacks: {
				    label: function(tooltipItem, data) {
				    	let totalTime = tooltipItem.value;
							
							if (totalTime < 3600) {
            		let remainder = totalTime % 3600;
	            	return (remainder / 60).toFixed(0)+"m";
	          	}

	          	if (totalTime > 3600) {
	          		let hours = (totalTime / 3600).toFixed(0);
	          		let remainder = totalTime % 3600;
	          		let minutes = (remainder / 60).toFixed(0);
	          		return `${hours}h ${minutes}m`;
          		}

	          	/*
				    	let hours = (totalTime / 3600).toFixed(0);
				    	let remainder = totalTime % 3600;
				    	let minutes = (remainder / 60).toFixed(0);
				    	let seconds = (remainder % 60).toFixed(0);
				    	return `${hours > 9 ? hours : "0"+hours}:${minutes > 9 ? minutes : "0"+minutes}:${seconds > 9 ? seconds : "0"+seconds}`;
				    	*/
				    }
			  },
			},
		});
  	});
	}
});