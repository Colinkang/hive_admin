let beeFarmerSortList  = []; 
let sortStatus = true;
export function sortBy(property,statusListArray,allStatus,idArray,beeFarmerLists,firstSortStatus){
	allStatus = false;
	for(let i =0;i<statusListArray.length;i++){
		statusListArray[i] = false;
	}
	// console.log(beeFarmerLists);
	let t = {};
	function sortMax(array){
		for(let i =0;i<array.length;i++){
			for(let j =0;j<array.length;j++){
				if(array[i][property] >= array[j][property]){
					t = array[i];
					array[i] = array[j];
					array[j] = t;
				}
			}
		}
		return array;
	}
	function sortMin(array){
		for(let i =0;i<array.length;i++){
			for(let j =0;j<array.length;j++){
				if(array[i][property] <= array[j][property]){
					t = array[i];
					array[i] = array[j];
					array[j] = t;
				}
			}
		}
		return array;
	}
	if(sortStatus){
		beeFarmerLists = sortMax(beeFarmerLists);
		sortStatus = false;
	}else{
		beeFarmerLists = sortMin(beeFarmerLists);
		sortStatus = true;
	}
	console.log(beeFarmerLists);
	// beeFarmerLists = beeFarmerSortList
	return beeFarmerLists;
}
function sortMinNumber(a,b){
	return a - b ;
}
function sortMaxNumber(a,b){
	return b - a ;
}