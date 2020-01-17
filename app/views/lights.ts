import document from "document";

let views;

/**
 * When this view is mounted, setup elements and events.
 */
function onMount() {
  console.log('onmount');
  var VTList:any = document.getElementById('my-tile-list');

  var data = [
    'dit',
    'is',
    'dynamic'
  ];
  
  /****************************************************************************************************
  * The delegate object is what allows for us to customize tiles in the virtual list.
  * - .getTileInfo should return an object which contains a "type" field, specifying the id
  * of the pool to get the tile from. Other than that, you can put any free-form data
  * you want in there, and it will be passed in to configureTils.
  * - .configureTile takes in the actual VirtualTileListItem, and the info returned from .getTileInfo.
  * This is where you can custom-style the element. Make sure you are styling it correctly
  * for the pool specified in the type field.
  ***************************************************************************************************/
  VTList.delegate = {
    getTileInfo : function(index) {
      console.log('getTileInfo');
      return { type: "lights-pool", value: "Tile Content " + index, index: index };
    },
    configureTile : function(tile, info) {
      console.log(tile);
      console.log(info);
      tile.getElementById('title-text').text = data[info.index];
    },
  };
  
  // KNOWN ISSUE: It is currently required that VTList.length be set AFTER VTList.delegate
  VTList.length = data.length;
}

/**
 * Sample button click with navigation.
 */
function clickHandler(_evt) {
  console.log("view-1 Button Clicked!");
  /* Navigate to another screen */
  views.navigate("view-2");
}

export function init(_views) {
  views = _views;
  console.log("lights init()");
  onMount();
}