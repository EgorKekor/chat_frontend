import { View } from "./view.js";
import RoomContainnerE from "../element/roomContainerE.js";

class RoomsV extends View {}

export default new RoomsV(
    document.getElementById("application"),
    RoomContainnerE
);