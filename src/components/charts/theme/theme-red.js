const colorPalette = ['#eb5541', '#fe954f', '#fecc32', '#cdcfd3', '#b08f8a', '#ff7200'];
const themeRed = {
	color: colorPalette,
	title: {
		textStyle: {
			fontWeight: 'normal',
			color: '#008acd'
		}
	},

	visualMap: {
		itemWidth: 15,
		color: ['#eb5541', '#fe954f']
	},

	toolbox: {
		iconStyle: {
			normal: {
				borderColor: colorPalette[0]
			}
		}
	},

	tooltip: {
		backgroundColor: 'rgba(50,50,50,0.5)',
		axisPointer: {
			type: 'line',
			lineStyle: {
				color: '#008acd'
			},
			crossStyle: {
				color: '#9f9f9f'
			},
			shadowStyle: {
				color: 'rgba(200,200,200,0.2)'
			}
		}
	},

	dataZoom: {
		dataBackgroundColor: '#efefff',
		fillerColor: 'rgba(182,162,222,0.2)',
		handleColor: '#008acd'
	},

	grid: {
		borderColor: '#eee'
	},

	categoryAxis: {
		axisLine: {
			lineStyle: {
				color: '#9f9f9f'
			}
		},
		splitLine: {
			show: true,
			lineStyle: {
				color: ['#e3e3e3']
			}
		}
	},

	valueAxis: {
		axisLine: {
			show: false,
			lineStyle: {
				color: '#008acd'
			}
		},
		splitLine: {
			show: true,
			lineStyle: {
				color: ['#e3e3e3']
			}
		}
	},

	timeline: {
		lineStyle: {
			color: '#008acd'
		},
		controlStyle: {
			normal: {
				color: '#008acd'
			},
			emphasis: {
				color: '#008acd'
			}
		},
		symbol: 'emptyCircle',
		symbolSize: 3
	},

	line: {
		smooth: true,
		symbol: 'emptyCircle',
		symbolSize: 3
	},

	candlestick: {
		itemStyle: {
			normal: {
				color: '#d87a80',
				color0: '#2ec7c9',
				lineStyle: {
					color: '#d87a80',
					color0: '#2ec7c9'
				}
			}
		}
	},
	scatter: {
		symbol: 'circle',
		symbolSize: 4
	},

	map: {
		label: {
			normal: {
				textStyle: {
					color: '#d87a80'
				}
			}
		},
		itemStyle: {
			normal: {
				borderColor: '#eee',
				areaColor: '#ddd'
			},
			emphasis: {
				areaColor: '#cdcfd3'
			}
		}
	},

	graph: {
		color: colorPalette
	},

	gauge: {
		axisLine: {
			lineStyle: {
				color: [
					[
						0.2, '#2ec7c9'
					],
					[
						0.8, '#5ab1ef'
					],
					[1, '#d87a80']
				],
				width: 10
			}
		},
		axisTick: {
			splitNumber: 10,
			length: 15,
			lineStyle: {
				color: 'auto'
			}
		},
		splitLine: {
			length: 22,
			lineStyle: {
				color: 'auto'
			}
		},
		pointer: {
			width: 5
		}
	}
};
export default themeRed