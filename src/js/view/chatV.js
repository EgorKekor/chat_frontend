import { View } from "./view.js";
import ChatE from "../element/chatE.js";

class ChatV extends View {}

export default new ChatV(
    document.getElementById("application"),
    ChatE
);