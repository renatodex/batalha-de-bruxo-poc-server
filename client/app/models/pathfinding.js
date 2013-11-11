var Pathfinding = function(grid_width, grid_height) {
	/*var matrix = [
	    [0, 0, 0, 1, 0],
	    [0, 1, 0, 1, 0],
	    [0, 1, 0, 0, 0],
	];*/
	
	var _grid_width = grid_width;
	var _grid_height = grid_height;
	
	var _defineDirection = function(anterior, atual) {
	    if(!_isDirectionChanged(atual, anterior)) {
	       return 0;
	    } else {
	       return 1;
	    }
	}
	
	var _isDirectionChanged = function(n1, n2, k) {
	    var key = k || 0;
	    if(n1[key]-n2[key] == 0) {
	        return false;
	    } else {
	        return true;
	    }
	}
	
	var _getLastNode = function(arr) {
	    if(arr.length-1 < 0) {
	        return arr[0];
	    } else {
	        return arr[arr.length-1];
	    }
	}
	
	var _calculateMove = function(point_a, point_b) {
		var grid = new PF.Grid(_grid_width, _grid_height)
		
		var finder = new PF.AStarFinder({
		    allowDiagonal: false
		});
		var path = finder.findPath(point_a[0], point_a[1], point_b[0], point_b[1], grid);
		
		return path;
	}
	
	return {
		calculateMove:_calculateMove
	}
}