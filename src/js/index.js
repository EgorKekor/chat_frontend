import "../css/style.scss";
import { Router } from "./router.js";
import { ROOT, ROOM } from "./paths.js";

import RoomsV from "./view/roomsV.js";
import ChatV from "./view/chatV.js";

const router = new Router;

router.register(ROOT, RoomsV);
router.register(ROOM, ChatV);
router.start();