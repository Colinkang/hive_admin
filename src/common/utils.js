let beeFarmerSortList  = []; 
let sortStatus = true;
export function sortBy(property,statusListArray,allStatus,idArray,beeFarmerLists,firstSortStatus){
	console.log(idArray);
	allStatus = false;
	for(let i =0;i<statusListArray.length;i++){
		statusListArray[i] = false;
	}
	console.log(beeFarmerLists);
	if(firstSortStatus){
		beeFarmerLists.forEach((item,index)=>{
			idArray.push(item[property]);
		});
		firstSortStatus = false;
	}
	sortStatus ? idArray.sort(sortMaxNumber) : idArray.sort(sortMinNumber);
	sortStatus = !sortStatus;
	console.log(idArray);
	beeFarmerSortList = [];
	for(let i =0;i<idArray.length;i++){
		beeFarmerLists.forEach((item,index)=>{
			console.log(item[property]);
			if(idArray[i] == item[property]){
				beeFarmerSortList[i] = item;
			}
		});
	}
	beeFarmerLists = beeFarmerSortList;
	return beeFarmerLists;
	console.log(beeFarmerLists);
}
function sortMinNumber(a,b){
	return a - b ;
}
function sortMaxNumber(a,b){
	return b - a ;
}