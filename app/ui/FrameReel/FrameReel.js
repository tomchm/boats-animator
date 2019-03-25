var frameReelArea = document.querySelector("#area-frame-reel");
var frameReelMsg = document.querySelector("#area-frame-reel > p");
var frameReelRow = document.querySelector("#area-frame-reel #reel-captured-imgs");
var frameReelTable = document.querySelector("#area-frame-reel table");

var btnLiveView = document.querySelector("#btn-live-view");
var liveViewFrameNo = document.querySelector("#live-view-frame-no");

// todo
class FrameReel {
  constructor() {
    // The id of the currently selected frame
    this.curSelectedFrame = null;
    // Total number of frames in the frame reel
    this.totalFrames = 0;
    // Whether the live view button is selected or not
    this.liveViewButtonSelected = false;
  }

  /**
   * Adds a frame to the frame reel.
   * @param {integer} id The id of the frame to add (note ids should start at 1).
   * @param {blob} imageSrc The imageSrc of the frame.
   */
  addFrame(id, imageSrc) {
    // Deselect the currently selected frame
    this._deselectFrame();

    // Insert the new frame into the reel
    frameReelRow.insertAdjacentHTML("beforeend", `<td><div class="frame-reel-preview">
    <div class="frame-reel-no" id="no-${id}" title="Frame ${id}">${id}</div>
    <img class="frame-reel-img" id="img-${id}" title="Frame ${id}" width="67" height="50" src="${imageSrc}">
    </div></td>`);
    this.totalFrames++;

    // Update the last frame number above the live view button
    liveViewFrameNo.innerText = this.totalFrames + 1;
  }

  /**
   * Removes a frame from the frame reel.
   * @param {integer} id The id of the frame to remove (note ids should start at 1).
   */
  removeFrame(id) {
    frameReelRow.removeChild(frameReelRow.children[id - 1]);
    this.totalFrames--;
  }

  /**
   * Highlights and scrolls to a given frame on the frame reel.
   * @param {integer} id The id of the frame to highlight and scroll to (note ids should start at 1).
   */
  selectFrame(id) {
    // Deselect the currently selected frame
    this._deselectFrame();
    this.selectLiveViewButton(false);
    // Highlight the chosen frame
    document.querySelector(`.frame-reel-img#img-${id}`).classList.add("selected");
    this.curSelectedFrame = id;
  }

  /**
   * Deselects the currently frame on the frame reel.
   */
  _deselectFrame() {
    var selectedFrame = document.querySelector(".frame-reel-img.selected");
    if (selectedFrame) {
      selectedFrame.classList.remove("selected");
      this.curSelectedFrame = null;
      return true;
    }
    return false;
  }
  
  _scrollTo() {

  }

  /**
   * Indicates whether the "No frames captured" message should be displayed or not.
   * @param {boolean} show True to show the message, false to hide it (default true)
   */
  showNoFramesMessage(show = true) {
    if (show) {
      frameReelMsg.classList.remove("hidden");
      frameReelTable.classList.add("hidden");
    } else {
      frameReelMsg.classList.add("hidden");
      frameReelTable.classList.remove("hidden");
    }
  }
  
  /**
   * Chooses whether an outline should be displayed around the live view button.
   * @param {boolean} select Set to true to select the live view button,
   *                         false to deselect it.
   */
  selectLiveViewButton(select = true) {
    if (select) {
      this._deselectFrame();
    }

    this.liveViewButtonSelected = select;
    btnLiveView.classList.toggle("selected", select);
    console.log("Live view buton set to"+select);
  }
}

module.exports = FrameReel;